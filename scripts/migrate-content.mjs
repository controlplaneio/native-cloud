import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const SRC_SITE = './site/en-US';
const SRC_ONTOLOGY = './ontology/en-US';
const DEST_DOCS = './src/content/docs';

// Clean and recreate docs dir
fs.rmSync(DEST_DOCS, { recursive: true, force: true });
fs.mkdirSync(DEST_DOCS, { recursive: true });

function parseFrontmatterAndBody(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: fileContent };
  try {
    const data = yaml.load(match[1]) || {};
    return { data, body: match[2] };
  } catch (err) {
    console.error('YAML parse error:', err);
    return { data: {}, body: fileContent };
  }
}

function cleanMarkdown(body) {
  return body
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\{\{% ontology-validation %\}\}([\s\S]*?)\{\{% \/ontology-validation %\}\}/g, ':::note[Validation Constraint]\n$1\n:::')
    .replace(/\{\{% ontology-validation-automatic %\}\}/g, ':::tip[Automatic Validation]\nValues for this key must conform to the allowed values specified above.\n:::')
    .replace(/\{\{% allowed-ontology-values %\}\}/g, '')
    .replace(/\{\{[%<].*?[%>]\}\}/g, '')
    .replace(/\{[.#][^}]+\}/g, '')
    .replace(/\[contexts\]\(\)/g, '[contexts](/context-uses/)')
    .replace(/\[Annotations\]\(\)/g, '[Annotations](/context-uses/kubernetesannotation/)')
    .replace(/\[Labels\]\(\)/g, '[Labels](/context-uses/kuberneteslabel/)')
    .replace(/\[Taints\]\(\)/g, '[Taints](/context-uses/kubernetestaint/)')
    .replace(/cloud-native/gi, (match) => match.replace('-', ' '))
    .trim();
}

function cleanFrontmatter(data, defaultTitle, defaultDesc) {
  const clean = { ...data };
  delete clean.layout;
  delete clean.pageType;
  delete clean.menus;
  delete clean.build;
  delete clean.cascade;
  delete clean.draft;
  delete clean.linkTitle;
  delete clean.linktitle;
  delete clean.weight;
  delete clean.sitemap;

  if (!clean.title && defaultTitle) {
    clean.title = defaultTitle;
  }
  if (!clean.description && defaultDesc) {
    clean.description = defaultDesc;
  }
  return clean;
}

// 1. Home Page
const homeMdx = `---
title: Cloud Native Infrastructure Metadata Ontology
description: Shared names for common ideas in cloud native infrastructure metadata.
template: splash
hero:
  tagline: Shared names for common ideas. Vendor-neutral, public, and free to use with Kubernetes and cloud native ecosystems.
  image:
    html: '<svg width="360" height="360" viewBox="0 0 600 600" id="hero-logo-svg" class="hero-logo-svg" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-61.506432,-31.777008)"><path fill="#ffffff" style="fill:#ffffff !important;stroke:#ffffff !important;stroke-width:1" d="m 567.85577,534.08621 -43.69079,-31.16107 -47.69425,-36.04536 -50.11952,-3.4657 -126.17439,1.69276 -50.00848,4.80905 -46.7101,37.3119 -42.8391,32.3219 -40.82216,-49.80383 40.10189,-35.66136 45.75459,-38.47762 14.53148,-48.09172 -34.93966,-36.09983 -58.29487,-13.25584 -51.980049,-13.34056 13.486006,-62.96823 52.884303,9.1184 58.61054,11.78198 46.65984,-18.62352 6.43947,-49.8248 -25.98243,-53.84165 -21.97896,-48.957338 57.63893,-28.716264 25.84375,47.031852 27.33156,53.1695 43.65239,24.86856 42.96956,-26.03068 25.89529,-53.8836 24.57274,-47.708241 58.38858,27.15963 -20.65766,49.529351 -24.52864,54.51931 7.77378,49.63411 47.1427,17.36507 58.27332,-13.3501 52.62068,-10.53386 15.17042,62.58377 -51.60345,14.73024 -57.91826,14.81496 -33.95864,37.02417 15.81644,47.68454 46.77034,37.2363 41.04416,34.57276 z" /></g></svg>'
  actions:
    - text: Explore Ontology
      link: /groups/compute/
      icon: right-arrow
      variant: primary
    - text: View on GitHub
      link: https://github.com/controlplaneio/native-cloud
      icon: external
      variant: minimal
---

import OntologyCardGrid from '~/components/OntologyCardGrid.astro';

## What is native.cloud?

You can use the identifiers *(keys)* on this website to mark out details in your cloud native infrastructure code. They work great with [Kubernetes](https://k8s.io/) and its ecosystem, and with other cloud native components that use the same kind of metadata.

## Ontology Domains

<OntologyCardGrid />
`;
fs.writeFileSync(path.join(DEST_DOCS, 'index.mdx'), homeMdx);

// 2. About Page
if (fs.existsSync(path.join(SRC_SITE, 'about.md'))) {
  const aboutRaw = fs.readFileSync(path.join(SRC_SITE, 'about.md'), 'utf-8');
  const { data, body } = parseFrontmatterAndBody(aboutRaw);
  const cleanFm = cleanFrontmatter(data, 'About native.cloud', 'Learn more about the native.cloud open ontology project.');
  const cleanBody = cleanMarkdown(body);
  fs.writeFileSync(path.join(DEST_DOCS, 'about.md'), `---\n${yaml.dump(cleanFm)}---\n\n${cleanBody}`);
}

// 3. Prefixes Page
if (fs.existsSync(path.join(SRC_SITE, 'prefixes.md'))) {
  const prefRaw = fs.readFileSync(path.join(SRC_SITE, 'prefixes.md'), 'utf-8');
  const { data, body } = parseFrontmatterAndBody(prefRaw);
  const cleanFm = cleanFrontmatter(data, 'Domain Prefixes', 'Overview of domain prefixes in the native.cloud ontology.');
  const cleanBody = cleanMarkdown(body);
  fs.writeFileSync(path.join(DEST_DOCS, 'prefixes.md'), `---\n${yaml.dump(cleanFm)}---\n\n${cleanBody}`);
}

// 4. Advice & Tips Directory
const adviceSrc = path.join(SRC_SITE, 'advice-tips');
const adviceDest = path.join(DEST_DOCS, 'advice-tips');
if (fs.existsSync(adviceSrc)) {
  fs.mkdirSync(adviceDest, { recursive: true });
  for (const file of fs.readdirSync(adviceSrc)) {
    if (!file.endsWith('.md')) continue;
    const raw = fs.readFileSync(path.join(adviceSrc, file), 'utf-8');
    const { data, body } = parseFrontmatterAndBody(raw);
    const targetName = file === '_index.md' ? 'index.md' : file;
    const defaultTitle = file === '_index.md' ? 'Advice & Tips' : file.replace('.md', '');
    const cleanFm = cleanFrontmatter(data, defaultTitle, 'Best practices and advice for native.cloud keys.');
    const cleanBody = cleanMarkdown(body);
    fs.writeFileSync(path.join(adviceDest, targetName), `---\n${yaml.dump(cleanFm)}---\n\n${cleanBody}`);
  }
}

// 5. Context Uses Directory
const contextSrc = path.join(SRC_SITE, 'context-uses');
const contextDest = path.join(DEST_DOCS, 'context-uses');
if (fs.existsSync(contextSrc)) {
  fs.mkdirSync(contextDest, { recursive: true });
  for (const file of fs.readdirSync(contextSrc)) {
    if (!file.endsWith('.md')) continue;
    const raw = fs.readFileSync(path.join(contextSrc, file), 'utf-8');
    const { data, body } = parseFrontmatterAndBody(raw);
    const targetName = file === '_index.md' ? 'index.md' : file;
    const defaultTitle = file === '_index.md' ? 'Context Uses' : file.replace('.md', '');
    const cleanFm = cleanFrontmatter(data, defaultTitle, 'Guidance on using native.cloud keys across metadata contexts.');
    const cleanBody = cleanMarkdown(body);
    fs.writeFileSync(path.join(contextDest, targetName), `---\n${yaml.dump(cleanFm)}---\n\n${cleanBody}`);
  }
}

// 6. Ontology Groups & Keys
const groupsDest = path.join(DEST_DOCS, 'groups');
fs.mkdirSync(groupsDest, { recursive: true });

const ontologyDirs = fs.readdirSync(SRC_ONTOLOGY).filter(d => fs.statSync(path.join(SRC_ONTOLOGY, d)).isDirectory());

for (const dir of ontologyDirs) {
  const groupSlug = dir.replace('.native.cloud', '');
  const groupDestDir = path.join(groupsDest, groupSlug);
  fs.mkdirSync(groupDestDir, { recursive: true });

  const srcGroupPath = path.join(SRC_ONTOLOGY, dir);
  const files = fs.readdirSync(srcGroupPath).filter(f => f.endsWith('.md'));

  const keyList = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(srcGroupPath, file), 'utf-8');
    const { data, body } = parseFrontmatterAndBody(raw);

    if (file === '_index.md') continue;

    const keyName = data.params?.ontology?.key || `${dir}/${file.replace('.md', '')}`;
    const cleanFm = cleanFrontmatter(data, keyName, `Specification for ${keyName} key.`);

    const uses = {
      annotation: Boolean(data.params?.ontology?.uses?.kubernetesAnnotation),
      label: Boolean(data.params?.ontology?.uses?.kubernetesLabel),
      taint: Boolean(data.params?.ontology?.uses?.kubernetesTaint),
      resourceClaim: Boolean(data.params?.ontology?.uses?.kubernetesResourceClaim),
    };

    const cleanBody = cleanMarkdown(body);
    const firstPara = cleanBody.split('\n\n')[0].replace(/^Use this key to\s+/i, 'Records ').replace(/\n/g, ' ');
    const keySlug = file.replace('.md', '').toLowerCase();

    keyList.push({
      name: keyName,
      link: `/groups/${groupSlug}/${keySlug}/`,
      description: firstPara.length > 120 ? firstPara.slice(0, 117) + '...' : firstPara,
    });

    const mdxContent = `---
${yaml.dump(cleanFm)}---

import KeyHeader from '~/components/KeyHeader.astro';
import ContextBadges from '~/components/ContextBadges.astro';
import Values from '~/components/Values.astro';

<KeyHeader keyName="${keyName}" />

## Applicable Contexts

<ContextBadges
  annotation={${uses.annotation}}
  label={${uses.label}}
  taint={${uses.taint}}
  resourceClaim={${uses.resourceClaim}}
/>

## Description

${cleanBody}

<Values frontmatter={frontmatter} />
`;

    const targetFile = file.replace('.md', '.mdx');
    fs.writeFileSync(path.join(groupDestDir, targetFile), mdxContent);
  }

  // Create Group Index MDX
  const indexRaw = fs.existsSync(path.join(srcGroupPath, '_index.md'))
    ? fs.readFileSync(path.join(srcGroupPath, '_index.md'), 'utf-8')
    : '';
  const { data: indexData, body: indexBody } = parseFrontmatterAndBody(indexRaw);
  const cleanIndexFm = cleanFrontmatter(indexData, dir, `Standard ontology keys for ${groupSlug} in cloud native architectures.`);
  const cleanIndexBody = cleanMarkdown(indexBody);

  const groupIndexContent = `---
${yaml.dump(cleanIndexFm)}---

import GroupKeysTable from '~/components/GroupKeysTable.astro';

## Domain Overview

Standard keys under the \`${dir}\` domain prefix.

${cleanIndexBody}

## Keys in this Domain

<GroupKeysTable keys={${JSON.stringify(keyList)}} />
`;

  fs.writeFileSync(path.join(groupDestDir, 'index.mdx'), groupIndexContent);
}

console.log('Migration completed successfully with structured TOC headings.');
