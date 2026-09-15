import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeGalaxy from 'starlight-theme-galaxy';

export default defineConfig({
  site: 'https://native.cloud',
  integrations: [
    starlight({
      title: 'native.cloud',
      description: 'Shared names for common ideas in cloud native infrastructure metadata.',
      routeMiddleware: './src/routeData.ts',
      logo: {
        src: './src/assets/ocno_icon.svg',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/controlplaneio/native-cloud',
        },
      ],
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en-US',
        },
      },
      customCss: [
        './src/styles/custom.css',
      ],
      editLink: {
        baseUrl: 'https://github.com/controlplaneio/native-cloud/edit/main/',
      },
      components: {
        Footer: './src/components/Footer.astro',
        PageSidebar: './src/components/PageSidebar.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
        overviewLabel: 'Overview',
      },
      plugins: [
        starlightThemeGalaxy(),
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Introduction', slug: 'index' },
            { label: 'About native.cloud', slug: 'about' },
            { label: 'Domain Prefixes', slug: 'prefixes' },
          ],
        },
        {
          label: 'Context Uses',
          items: [{ autogenerate: { directory: 'context-uses' } }],
        },
        {
          label: 'Advice & Tips',
          items: [{ autogenerate: { directory: 'advice-tips' } }],
        },
        {
          label: 'Ontology Domains',
          items: [
            {
              label: 'Compute',
              items: [{ autogenerate: { directory: 'groups/compute' } }],
            },
            {
              label: 'Identity',
              items: [{ autogenerate: { directory: 'groups/identity' } }],
            },
            {
              label: 'Network',
              items: [{ autogenerate: { directory: 'groups/network' } }],
            },
            {
              label: 'Storage',
              items: [{ autogenerate: { directory: 'groups/storage' } }],
            },
            {
              label: 'Tenancy',
              items: [{ autogenerate: { directory: 'groups/tenancy' } }],
            },
            {
              label: 'Topology',
              items: [{ autogenerate: { directory: 'groups/topology' } }],
            },
            {
              label: 'Vendor',
              items: [{ autogenerate: { directory: 'groups/vendor' } }],
            },
            {
              label: 'Workload',
              items: [{ autogenerate: { directory: 'groups/workload' } }],
            },
          ],
        },
      ],
    }),
  ],
});
