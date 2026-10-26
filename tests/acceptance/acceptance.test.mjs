import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('./dist');

test.describe('Astro Starlight Comprehensive Acceptance Suite', () => {
  test('Home Page renders title, hero actions, theme-aware inline hero logo, and 8 ontology cards', () => {
    const homeHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
    assert.ok(homeHtml.includes('native.cloud'), 'Title includes native.cloud');
    assert.ok(homeHtml.includes('Explore Ontology'), 'Explore Ontology CTA present');
    assert.ok(homeHtml.includes('https://github.com/controlplaneio/native-cloud'), 'GitHub link present');

    // The hero mark takes its colour from the theme rather than a hard-coded
    // white, which was invisible against the light-mode background.
    assert.ok(homeHtml.includes('hero-logo-svg'), 'Inline hero logo SVG present');
    assert.ok(homeHtml.includes('fill="currentColor"'), 'Inline hero logo SVG has fill="currentColor"');
    assert.ok(
      homeHtml.includes('fill:currentColor;stroke:currentColor'),
      'Inline hero logo styles fill and stroke with currentColor'
    );
    assert.ok(!homeHtml.includes('fill:#ffffff'), 'Inline hero logo has no hard-coded white fill');

    // Check all 8 domain cards
    const domains = [
      'compute.native.cloud',
      'identity.native.cloud',
      'network.native.cloud',
      'storage.native.cloud',
      'tenancy.native.cloud',
      'topology.native.cloud',
      'vendor.native.cloud',
      'workload.native.cloud',
    ];
    for (const d of domains) {
      assert.ok(homeHtml.includes(d), `Domain card ${d} present on home page`);
    }
  });

  test('All documentation uses unhyphenated "cloud native" phrasing', () => {
    const homeHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
    assert.ok(homeHtml.includes('cloud native infrastructure code'), 'Home page uses cloud native');
    assert.ok(!homeHtml.includes('cloud-native infrastructure code'), 'No hyphenated cloud-native on home page');

    const tenantHtml = fs.readFileSync(path.join(DIST_DIR, 'groups/tenancy/tenantid/index.html'), 'utf-8');
    assert.ok(tenantHtml.includes('cloud native workloads'), 'tenantID uses cloud native');
    assert.ok(!tenantHtml.includes('cloud-native workloads'), 'tenantID has no hyphenated cloud-native');
  });

  test('About page has clean markdown without {.lead} and has valid context links', () => {
    const aboutHtml = fs.readFileSync(path.join(DIST_DIR, 'about/index.html'), 'utf-8');
    assert.ok(aboutHtml.includes('This is for anyone.'), 'Lead sentence present');
    assert.ok(!aboutHtml.includes('{.lead}'), 'No unrendered {.lead} tag on about page');
    assert.ok(aboutHtml.includes('/advice-tips/contexts/'), 'Valid contexts link present');
    assert.ok(!aboutHtml.includes('LocalImageUsedWrongly'), 'No image error on about page');
  });

  test('All 8 Ontology Domain Indexes contain GroupKeysTable and TOC', () => {
    const domains = ['compute', 'identity', 'network', 'storage', 'tenancy', 'topology', 'vendor', 'workload'];
    for (const domain of domains) {
      const indexPath = path.join(DIST_DIR, `groups/${domain}/index.html`);
      assert.ok(fs.existsSync(indexPath), `Domain index for ${domain} exists`);
      const html = fs.readFileSync(indexPath, 'utf-8');
      assert.ok(html.includes(`${domain}.native.cloud`), `Domain title present in ${domain}`);
      assert.ok(html.includes('Domain Overview'), `Domain Overview heading in ${domain}`);
      assert.ok(html.includes('Keys in this Domain'), `Keys in this Domain heading in ${domain}`);
      assert.ok(html.includes('group-keys-table') || html.includes('<table'), `Keys table in ${domain}`);
    }
  });

  test('All Advice & Tips pages render cleanly', () => {
    const advicePages = [
      'advice-tips/index.html',
      'advice-tips/contexts/index.html',
      'advice-tips/kubernetes-quantities/index.html',
      'advice-tips/kyverno/index.html',
      'advice-tips/validating-admission-policy/index.html',
    ];
    for (const p of advicePages) {
      const html = fs.readFileSync(path.join(DIST_DIR, p), 'utf-8');
      assert.ok(html.length > 200, `Advice page ${p} is non-empty`);
      assert.ok(!html.includes('{.table-extra-padding}'), `No kramdown tag on ${p}`);
    }
  });

  test('Ontology Key Specification renders KeyHeader, ContextBadges, ExampleValues, and Action Links', () => {
    const keyHtml = fs.readFileSync(path.join(DIST_DIR, 'groups/compute/baseboardserialnumber/index.html'), 'utf-8');
    assert.ok(keyHtml.includes('key-header-card'), 'KeyHeader card present');
    assert.ok(keyHtml.includes('compute.native.cloud/baseboardSerialNumber'), 'Full key identifier present');
    assert.ok(keyHtml.includes('context-badges-grid'), 'ContextBadges grid present');
    assert.ok(keyHtml.includes('example-values-list'), 'ExampleValues list present');
    assert.ok(keyHtml.includes('EFGH9876543210'), 'Example serial number EFGH9876543210 present');

    // Right Sidebar Action Links
    assert.ok(keyHtml.includes('right-sidebar-actions'), 'Right sidebar actions block present');
    assert.ok(keyHtml.includes('Edit this page'), 'Edit this page action link present in right sidebar');
    assert.ok(keyHtml.includes('Edit keys'), 'Edit keys action link present in right sidebar');
    assert.ok(keyHtml.includes('Create new key'), 'Create new key action link present in right sidebar');
    assert.ok(keyHtml.includes('Create an issue'), 'Create an issue action link present in right sidebar');

    // TOC Verification
    assert.ok(keyHtml.includes('starlight-toc'), 'Desktop Starlight TOC present');
    assert.ok(keyHtml.includes('mobile-starlight-toc'), 'Mobile Starlight TOC present');
    assert.ok(keyHtml.includes('On this page'), 'On this page header present');
    assert.ok(keyHtml.includes('#applicable-contexts'), 'Applicable Contexts anchor in TOC');
    assert.ok(keyHtml.includes('#description'), 'Description anchor in TOC');
    assert.ok(keyHtml.includes('#example-values'), 'Example Values anchor in TOC');
  });

  test('Ontology Key with constraints renders AllowedValues and TOC link', () => {
    const virtualizedHtml = fs.readFileSync(path.join(DIST_DIR, 'groups/compute/virtualized/index.html'), 'utf-8');
    assert.ok(virtualizedHtml.includes('compute.native.cloud/virtualized'), 'Virtualized key header present');
    assert.ok(virtualizedHtml.includes('true'), 'Allowed value true present');
    assert.ok(virtualizedHtml.includes('false'), 'Allowed value false present');
    assert.ok(virtualizedHtml.includes('#allowed-values'), 'Allowed Values anchor in TOC');
  });

  test('Persistent 2-Column Footer renders Brand on left and Sponsors (ControlPlane Level 2) on right', () => {
    const keyHtml = fs.readFileSync(path.join(DIST_DIR, 'groups/compute/baseboardserialnumber/index.html'), 'utf-8');
    assert.ok(keyHtml.includes('site-footer'), 'Persistent site footer present');
    assert.ok(keyHtml.includes('footer-content-two-col'), '2-column footer layout present');
    assert.ok(keyHtml.includes('brand-col'), 'Brand column present on left');
    assert.ok(keyHtml.includes('sponsors-col'), 'Sponsors column present on right');
    assert.ok(keyHtml.includes('ControlPlane'), 'ControlPlane sponsor present');
    assert.ok(keyHtml.includes('Level 2') || keyHtml.includes('Silver'), 'Level 2 / Silver sponsor badge present');
    assert.ok(keyHtml.includes('https://control-plane.io'), 'ControlPlane link present');
    assert.ok(keyHtml.includes('Edit page'), 'Starlight edit page link present');
  });

  test('Theme switcher and CSS theme tokens are defined for dark and light versions', () => {
    const cssContent = fs.readFileSync(path.resolve('./src/styles/custom.css'), 'utf-8');
    assert.ok(cssContent.includes(":root"), 'Root dark variables defined');
    assert.ok(cssContent.includes("[data-theme='light']"), 'Light theme tokens defined');
    assert.ok(cssContent.includes('--nc-card-bg'), '--nc-card-bg token defined');
    assert.ok(cssContent.includes('--nc-badge-enabled-bg'), '--nc-badge-enabled-bg token defined');
    assert.ok(cssContent.includes('--nc-code-text'), '--nc-code-text token defined');
  });

  test('About and Reference Guide pages are populated with TOC', () => {
    const aboutHtml = fs.readFileSync(path.join(DIST_DIR, 'about/index.html'), 'utf-8');
    assert.ok(aboutHtml.includes('The vision'), 'Vision section present in About');

    const prefixesHtml = fs.readFileSync(path.join(DIST_DIR, 'prefixes/index.html'), 'utf-8');
    assert.ok(prefixesHtml.includes('Domain Prefixes') || prefixesHtml.includes('compute.native.cloud'), 'Prefixes present');

    const contextsHtml = fs.readFileSync(path.join(DIST_DIR, 'advice-tips/contexts/index.html'), 'utf-8');
    assert.ok(contextsHtml.includes('metadata.annotations'), 'Annotations guide present in contexts');
  });

  test('Pagefind search index and sitemap are generated and non-empty', () => {
    assert.ok(fs.existsSync(path.join(DIST_DIR, 'pagefind/pagefind.js')), 'Pagefind search script exists');
    assert.ok(fs.existsSync(path.join(DIST_DIR, 'sitemap-index.xml')), 'Sitemap index exists');
    assert.ok(fs.existsSync(path.join(DIST_DIR, 'sitemap-0.xml')), 'Sitemap XML exists');
  });

  test('Custom 404 page renders in static output', () => {
    const notFoundHtml = fs.readFileSync(path.join(DIST_DIR, '404.html'), 'utf-8');
    assert.ok(notFoundHtml.includes('404') || notFoundHtml.includes('Page Not Found'), '404 content present');
  });
});
