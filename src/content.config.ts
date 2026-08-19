import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: (context) =>
      docsSchema({
        extend: z.object({
          highlight: z.string().optional(),
          params: z
            .object({
              short: z.string().optional(),
              plural: z.string().optional(),
              more_information: z.string().optional(),
              ontology: z
                .object({
                  key: z.string().optional(),
                  exampleValues: z.array(z.string()).optional(),
                  allowedValues: z.array(z.string()).optional(),
                  uses: z
                    .object({
                      kubernetesAnnotation: z.boolean().optional(),
                      kubernetesLabel: z.boolean().optional(),
                      kubernetesTaint: z.boolean().optional(),
                      kubernetesResourceClaim: z.boolean().optional(),
                    })
                    .optional(),
                })
                .optional(),
            })
            .optional(),
        }),
      })(context),
  }),
};
