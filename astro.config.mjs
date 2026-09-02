import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeGalaxy from 'starlight-theme-galaxy';

export default defineConfig({
  site: 'https://native.cloud',
  integrations: [
    starlight({
      title: 'native.cloud',
      description: 'Shared names for common ideas in cloud native infrastructure metadata.',
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
          autogenerate: { directory: 'context-uses' },
        },
        {
          label: 'Advice & Tips',
          autogenerate: { directory: 'advice-tips' },
        },
        {
          label: 'Ontology Domains',
          items: [
            { label: 'Compute', autogenerate: { directory: 'groups/compute' } },
            { label: 'Identity', autogenerate: { directory: 'groups/identity' } },
            { label: 'Network', autogenerate: { directory: 'groups/network' } },
            { label: 'Storage', autogenerate: { directory: 'groups/storage' } },
            { label: 'Tenancy', autogenerate: { directory: 'groups/tenancy' } },
            { label: 'Topology', autogenerate: { directory: 'groups/topology' } },
            { label: 'Vendor', autogenerate: { directory: 'groups/vendor' } },
            { label: 'Workload', autogenerate: { directory: 'groups/workload' } },
          ],
        },
      ],
    }),
  ],
});
