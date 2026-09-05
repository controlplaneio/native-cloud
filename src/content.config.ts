import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Derive valid context uses from the frontmatter of context files in src/data/contexts/
function getValidContextUses() {
  const contextsDir = path.join(process.cwd(), 'src/data/contexts');
  if (!fs.existsSync(contextsDir)) {
    return [];
  }
  const files = fs.readdirSync(contextsDir).filter(f => f.endsWith('.mdx') && !f.startsWith('_'));
  const validUses = [];
  
  for (const filename of files) {
    const filepath = path.join(contextsDir, filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = yaml.load(frontmatterMatch[1]) as { id?: string };
      if (frontmatter.id) {
        // Validate that id matches the kebab-case filename
        const base = filename.replace(/\.mdx$/, '');
        const expectedId = base.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        if (frontmatter.id !== expectedId) {
          throw new Error(`Context file ${filename} has id '${frontmatter.id}' but expected '${expectedId}' based on filename`);
        }
        validUses.push(frontmatter.id);
      }
    }
  }
  
  return validUses;
}

const validContextUses = getValidContextUses();

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: (context) =>
      docsSchema({
        extend: z
          .object({
            highlight: z.string().optional(),
            params: z
              .object({
                group: z.string().optional(),
                short: z.string().optional(),
                plural: z.string().optional(),
                more_information: z.string().optional(),
                ontology: z
                  .object({
                    key: z.string().optional(),
                    ociAnnotation: z.string().optional(),
                    exampleValues: z.array(z.string()).optional(),
                    exampleSnippets: z.array(z.string()).optional(),
                    allowedValues: z.array(z.string()).optional(),
                    uses: z
                      .record(z.string(), z.boolean())
                      .optional(),
                  })
                  .optional(),
              })
              .optional(),
          })
          .superRefine((data, ctx) => {
            const ontology = data.params?.ontology;
            if (ontology) {
              // If ontology key defined, it must define uses
              if (ontology.key) {
                if (!ontology.uses || Object.keys(ontology.uses).length === 0) {
                  ctx.addIssue({
                    code: 'custom',
                    message: `Key '${ontology.key}' has no uses defined. Each key must have a uses section.`,
                    path: ['params', 'ontology', 'uses'],
                  });
                } else {
                  let hasAtLeastOneTrue = false;
                  for (const [useName, useVal] of Object.entries(ontology.uses)) {
                    if (!validContextUses.includes(useName)) {
                      ctx.addIssue({
                        code: 'custom',
                        message: `Key '${ontology.key}' has unrecognised use '${useName}'. Valid context uses are: ${validContextUses.join(', ')}`,
                        path: ['params', 'ontology', 'uses', useName],
                      });
                    }
                    if (useVal === true) {
                      hasAtLeastOneTrue = true;
                    }
                  }

                  if (!hasAtLeastOneTrue) {
                    ctx.addIssue({
                      code: 'custom',
                      message: `Key '${ontology.key}' has no uses set to true. At least one use must be enabled.`,
                      path: ['params', 'ontology', 'uses'],
                    });
                  }
                }
              }
            }
          }),
      })(context),
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema(),
  }),
};
