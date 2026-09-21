import { chromium } from '@playwright/test';
import fs from 'node:fs';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4321';

const VIEWPORTS = [
  { name: 'iPhone SE / Mini (375x667)', width: 375, height: 667 },
  { name: 'Modern Phone (390x844)', width: 390, height: 844 },
  { name: 'Pixel 7 (412x915)', width: 412, height: 915 },
  { name: 'Small Phone (320x568)', width: 320, height: 568 },
];

// Extract routes dynamically from scripts/test-routes.mjs
const testRoutesContent = fs.readFileSync('scripts/test-routes.mjs', 'utf8');
const match = testRoutesContent.match(/const REQUIRED_ROUTES = \[([\s\S]*?)\];/);
const REQUIRED_ROUTES = match[1]
  .split('\n')
  .map((l) => l.trim().replace(/^['"]|['"],?$/g, ''))
  .filter((l) => l && !l.startsWith('//'))
  .map((r) => r === 'index.html' ? '' : r.replace(/index\.html$/, ''));

async function runAudit() {
  console.log(`📱 Starting Mobile Rendering Audit across ${REQUIRED_ROUTES.length} routes...`);
  console.log(`🔗 Target URL: ${BASE_URL}`);

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n🔍 Auditing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      isMobile: true,
      hasTouch: true,
    });

    const page = await context.newPage();
    let vpIssues = 0;

    for (const route of REQUIRED_ROUTES) {
      const url = `${BASE_URL}/${route}`;
      try {
        const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
        if (!resp || (resp.status() >= 400 && route !== '404.html')) {
          console.error(`  ❌ [${route || '/'}] HTTP status ${resp?.status()}`);
          results.push({ viewport: vp.name, route, error: `HTTP ${resp?.status()}` });
          vpIssues++;
          continue;
        }

        await page.waitForTimeout(40);

        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const scrollWidth = doc.scrollWidth;
          const innerWidth = window.innerWidth;
          const overflowX = scrollWidth - innerWidth;

          // Check key-code element clipping inside key-header-card
          const keyCode = document.querySelector('.key-code');
          let keyCodeOverflow = 0;
          if (keyCode) {
            const kRect = keyCode.getBoundingClientRect();
            const parentRect = keyCode.closest('.key-header-card')?.getBoundingClientRect();
            if (parentRect && kRect.right > parentRect.right + 2) {
              keyCodeOverflow = Math.round(kRect.right - parentRect.right);
            }
          }

          // Check table containment
          const tables = document.querySelectorAll('table');
          let tableOverflow = 0;
          for (const t of tables) {
            const container = t.closest('div, .sl-markdown-content');
            if (t.getBoundingClientRect().width > innerWidth + 1 && getComputedStyle(container).overflowX === 'visible') {
              tableOverflow = Math.round(t.getBoundingClientRect().width - innerWidth);
            }
          }

          return {
            scrollWidth,
            innerWidth,
            overflowX,
            keyCodeOverflow,
            tableOverflow,
          };
        });

        if (metrics.overflowX > 1 || metrics.keyCodeOverflow > 0 || metrics.tableOverflow > 0) {
          console.warn(`  ⚠️  [${route || '/'}] Defect: overflowX=${metrics.overflowX}px, keyCodeOverflow=${metrics.keyCodeOverflow}px, tableOverflow=${metrics.tableOverflow}px`);
          vpIssues++;
          results.push({ viewport: vp.name, route, metrics });
        }
      } catch (err) {
        console.error(`  ❌ [${route || '/'}] Error: ${err.message}`);
        results.push({ viewport: vp.name, route, error: err.message });
        vpIssues++;
      }
    }

    await context.close();
    console.log(`📊 Viewport ${vp.name} completed with ${vpIssues} defect(s).`);
  }

  await browser.close();

  console.log('\n=============================================');
  console.log(`🏁 Total issues found across all viewports: ${results.length}`);
  if (results.length === 0) {
    console.log('🎉 100% PERFECT! Zero horizontal overflow, zero key-code clipping, zero table overflow across all routes and viewports!');
  } else {
    fs.writeFileSync('dist/mobile-audit-issues.json', JSON.stringify(results, null, 2));
    console.log('Saved report to dist/mobile-audit-issues.json');
  }

  return results;
}

runAudit().catch((err) => {
  console.error(err);
  process.exit(1);
});
