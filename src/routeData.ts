// src/routeData.ts
import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals;

  // attach headers for components that are applied and not picked up by default
  // by starlight's ToC
  const frontmatter = context.locals.starlightRoute?.entry?.data;
  const ontologyParams = frontmatter?.params?.ontology || {};
  const definesAllowedValues = (ontologyParams?.allowedValues || []).length > 0;
  const definesExampleValues = (ontologyParams?.exampleValues || []).length > 0;
  const extraTocItems = [];
  if (definesAllowedValues) {
    extraTocItems.push({
      depth: 2,
      slug: "allowed-values",
      text: "Allowed Values",
      children: [],
    });
  }
  if (definesExampleValues) {
    extraTocItems.push({
      depth: 2,
      slug: "example-values",
      text: "Example Values",
      children: [],
    });
  }
  starlightRoute.toc = starlightRoute.toc
    ? {
        ...starlightRoute.toc,
        items: [
          ...starlightRoute.toc.items,
          // Add some custom TOC items
          ...extraTocItems,
        ],
      }
    : undefined;
});
