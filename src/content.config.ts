import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

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
              // If ontology key or ociAnnotation is defined, it must define uses
              if (ontology.key || ontology.ociAnnotation) {
                if (!ontology.uses || Object.keys(ontology.uses).length === 0) {
                  ctx.addIssue({
                    code: 'custom',
                    message: `Key '${ontology.key || ontology.ociAnnotation}' has no uses defined. Each key must have a uses section.`,
                    path: ['params', 'ontology', 'uses'],
                  });
                } else {
                  const validUses = [
                    'kubernetesannotation',
                    'kuberneteslabel',
                    'kubernetestaint',
                    'kubernetesresourceclaim',
                    'ociannotation',
                  ];

                  let hasAtLeastOneTrue = false;
                  for (const [useName, useVal] of Object.entries(ontology.uses)) {
                    if (!validUses.includes(useName.toLowerCase())) {
                      ctx.addIssue({
                        code: 'custom',
                        message: `Key '${ontology.key || ontology.ociAnnotation}' has unrecognised use '${useName}'. Valid context uses are: ${validUses.join(', ')}`,
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
                      message: `Key '${ontology.key || ontology.ociAnnotation}' has no uses set to true. At least one use must be enabled.`,
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
