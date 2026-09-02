import fs from 'node:fs';
import path from 'node:path';

const DOCS_DIR = path.resolve('./src/content/docs');
const GROUPS_DIR = path.join(DOCS_DIR, 'groups');
const CONTEXT_USES_DIR = path.join(DOCS_DIR, 'context-uses');

/**
 * Robust frontmatter YAML parser that enforces type safety.
 */
function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const yamlBlock = match[1];
  const result = {};

  let inParams = false;
  let inOntology = false;
  let inUses = false;
  let inExampleValues = false;
  let inAllowedValues = false;

  for (const rawLine of yamlBlock.split('\n')) {
    const line = rawLine.trimEnd();
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const indent = line.search(/\S/);

    if (indent === 0) {
      inParams = false;
      inOntology = false;
      inUses = false;
      inExampleValues = false;
      inAllowedValues = false;
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        const val = line.slice(colonIdx + 1).trim();
        if (key === 'params') {
          inParams = true;
          result.params = {};
        } else {
          result[key] = val.replace(/^['"](.*)['"]$/, '$1');
        }
      }
    } else if (inParams && indent === 2) {
      inOntology = false;
      inUses = false;
      inExampleValues = false;
      inAllowedValues = false;
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        const val = line.slice(colonIdx + 1).trim();
        if (key === 'ontology') {
          inOntology = true;
          result.params.ontology = {};
        } else {
          result.params[key] = val.replace(/^['"](.*)['"]$/, '$1');
        }
      }
    } else if (inOntology && indent === 4) {
      inUses = false;
      inExampleValues = false;
      inAllowedValues = false;
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        const val = line.slice(colonIdx + 1).trim();
        if (key === 'uses') {
          inUses = true;
          result.params.ontology.uses = {};
        } else if (key === 'exampleValues' || key === 'exampleSnippets') {
          inExampleValues = true;
          result.params.ontology[key] = [];
        } else if (key === 'allowedValues') {
          inAllowedValues = true;
          result.params.ontology[key] = [];
        } else {
          result.params.ontology[key] = val.replace(/^['"](.*)['"]$/, '$1');
        }
      }
    } else if (inUses && indent >= 6) {
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        const rawVal = line.slice(colonIdx + 1).trim();
        if (rawVal === 'true') {
          result.params.ontology.uses[key] = true;
        } else if (rawVal === 'false') {
          result.params.ontology.uses[key] = false;
        } else {
          // Record raw non-boolean type for strict type validation
          result.params.ontology.uses[key] = rawVal;
        }
      }
    } else if (inExampleValues && indent >= 6 && line.trim().startsWith('-')) {
      const item = line.trim().slice(1).trim().replace(/^['"](.*)['"]$/, '$1');
      const listKey = result.params.ontology.exampleValues ? 'exampleValues' : 'exampleSnippets';
      result.params.ontology[listKey].push(item);
    } else if (inAllowedValues && indent >= 6 && line.trim().startsWith('-')) {
      const item = line.trim().slice(1).trim().replace(/^['"](.*)['"]$/, '$1');
      result.params.ontology.allowedValues.push(item);
    }
  }

  return result;
}

/**
 * Validates the entire native.cloud ontology dataset against strict integrity constraints.
 */
export function validateOntology() {
  const errors = [];
  let domainCount = 0;
  let keyCount = 0;
  let contextUseCount = 0;

  if (!fs.existsSync(GROUPS_DIR)) {
    errors.push(`Directory not found: ${GROUPS_DIR}`);
    return { passed: false, errors, stats: { domainCount, keyCount, contextUseCount } };
  }

  // 1. Collect valid context uses from context-uses directory
  const validContextUses = [];
  const validContextUsesLower = [];

  if (fs.existsSync(CONTEXT_USES_DIR)) {
    const contextFiles = fs.readdirSync(CONTEXT_USES_DIR);
    for (const file of contextFiles) {
      if (file.startsWith('_') || file === 'index.md' || file === 'index.mdx') continue;
      const baseName = path.parse(file).name;
      validContextUses.push(baseName);
      validContextUsesLower.push(baseName.toLowerCase());
      contextUseCount++;
    }
  } else {
    errors.push(`Context uses directory not found: ${CONTEXT_USES_DIR}`);
  }

  // 2. Validate all ontology domains and keys
  const domainDirs = fs.readdirSync(GROUPS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const domain of domainDirs) {
    domainCount++;
    const domainPath = path.join(GROUPS_DIR, domain);
    const expectedDomainName = `${domain}.native.cloud`;

    // A. Validate Domain Group Index
    const indexFiles = ['index.mdx', 'index.md', '_index.md'];
    const foundIndex = indexFiles.find((f) => fs.existsSync(path.join(domainPath, f)));

    if (!foundIndex) {
      errors.push(`Domain '${domain}' is missing an index page (index.mdx or index.md).`);
    } else {
      const indexPath = path.join(domainPath, foundIndex);
      const indexData = parseFrontmatter(indexPath);
      const title = indexData.title || '';
      const groupParam = indexData.params?.group || '';

      if (groupParam && groupParam !== expectedDomainName) {
        errors.push(`Group param mismatch in '${indexPath}': params.group is '${groupParam}' but expected '${expectedDomainName}'`);
      }
      if (title && title !== expectedDomainName && !title.toLowerCase().includes(domain.toLowerCase())) {
        errors.push(`Group title mismatch in '${indexPath}': title is '${title}' but expected domain '${expectedDomainName}'`);
      }
    }

    // B. Validate all Key files in this domain
    const keyFiles = fs.readdirSync(domainPath)
      .filter((f) => !f.startsWith('_') && !f.startsWith('index.') && (f.endsWith('.mdx') || f.endsWith('.md')));

    for (const keyFile of keyFiles) {
      keyCount++;
      const keyFilePath = path.join(domainPath, keyFile);
      const baseName = path.parse(keyFile).name;
      const keyData = parseFrontmatter(keyFilePath);
      const ontology = keyData.params?.ontology;

      if (!ontology) {
        errors.push(`Key file '${keyFilePath}' is missing params.ontology definition.`);
        continue;
      }

      const actualKey = ontology.key;
      const actualOciAnnotation = ontology.ociAnnotation;
      const identifier = actualKey || actualOciAnnotation || baseName;

      // 1. Key matches path validation (case-sensitive, strict format)
      if (actualKey && !actualOciAnnotation) {
        const expectedKey = `${expectedDomainName}/${baseName}`;
        if (actualKey !== expectedKey) {
          errors.push(`Key mismatch in file '${keyFilePath}': expected '${expectedKey}' but found '${actualKey}'`);
        }

        // Security check: no whitespace, path traversal, or multiple slashes
        if (actualKey.includes('..') || actualKey.includes('//') || actualKey.trim() !== actualKey) {
          errors.push(`Invalid key name format in file '${keyFilePath}': '${actualKey}' contains invalid characters or whitespace.`);
        }
      }

      // 2. OCI Annotation matches reversed domain path (case-sensitive)
      if (actualOciAnnotation) {
        const domainParts = expectedDomainName.split('.');
        const reversedPrefix = domainParts.reverse().join('.');
        const expectedAnnotation = `${reversedPrefix}.${baseName}`;
        if (actualOciAnnotation !== expectedAnnotation) {
          errors.push(`Annotation mismatch in file '${keyFilePath}': expected '${expectedAnnotation}' but found '${actualOciAnnotation}'`);
        }

        if (actualOciAnnotation.includes('..') || actualOciAnnotation.includes('/') || actualOciAnnotation.trim() !== actualOciAnnotation) {
          errors.push(`Invalid OCI annotation format in file '${keyFilePath}': '${actualOciAnnotation}' contains invalid characters.`);
        }
      }

      // 3. Context uses validation
      const uses = ontology.uses;
      if (!uses || typeof uses !== 'object' || Object.keys(uses).length === 0) {
        errors.push(`Key '${identifier}' in '${keyFilePath}' has no uses defined. Each key must have a uses section.`);
      } else {
        let hasAtLeastOneUse = false;
        for (const [useName, useValue] of Object.entries(uses)) {
          const useNameLower = useName.toLowerCase();
          if (!validContextUsesLower.includes(useNameLower)) {
            errors.push(`Key '${identifier}' in '${keyFilePath}' has unrecognised use '${useName}'. Valid context-uses are: ${validContextUses.join(', ')}`);
          }

          // Strict boolean type check (cannot be string "true" or number 1)
          if (typeof useValue !== 'boolean') {
            errors.push(`Key '${identifier}' in '${keyFilePath}' has invalid non-boolean value for use '${useName}': ${JSON.stringify(useValue)} (must be true or false).`);
          }

          if (useValue === true) {
            hasAtLeastOneUse = true;
          }
        }

        if (!hasAtLeastOneUse) {
          errors.push(`Key '${identifier}' in '${keyFilePath}' has no uses set to true. At least one use must be enabled.`);
        }
      }
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    stats: { domainCount, keyCount, contextUseCount },
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🔍 Validating Cloud Native Ontology Data & Integrity Constraints...');
  const result = validateOntology();

  if (!result.passed) {
    console.error(`\n❌ Found ${result.errors.length} validation errors:`);
    for (const err of result.errors) {
      console.error(`  • ${err}`);
    }
    process.exit(1);
  }

  console.log(`\n✅ Validation Passed Successfully!`);
  console.log(`   Domains checked: ${result.stats.domainCount}`);
  console.log(`   Keys validated: ${result.stats.keyCount}`);
  console.log(`   Context uses checked: ${result.stats.contextUseCount}`);
  console.log(`   All paths, reverse domains, context uses, and schemas are 100% valid.`);
}
