import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = './dist';

if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ dist/ directory not found. Please run build first.');
  process.exit(1);
}

const REQUIRED_ROUTES = [
  'index.html',
  '404.html',
  'about/index.html',
  'prefixes/index.html',
  'advice-tips/index.html',
  'advice-tips/contexts/index.html',
  'advice-tips/ease-of-adoption/index.html',
  'advice-tips/kubernetes-quantities/index.html',
  'advice-tips/kyverno/index.html',
  'advice-tips/validating-admission-policy/index.html',
  'groups/compute/index.html',
  'groups/compute/baseboardserialnumber/index.html',
  'groups/compute/chassisserialnumber/index.html',
  'groups/compute/cpucorecount/index.html',
  'groups/compute/outsidethermaltolerance/index.html',
  'groups/compute/pcirootcount/index.html',
  'groups/compute/virtualized/index.html',
  'groups/identity/index.html',
  'groups/identity/displayname/index.html',
  'groups/identity/minimumremainingcertificatevalidity/index.html',
  'groups/identity/username/index.html',
  'groups/identity/useruniqueidentifier/index.html',
  'groups/network/index.html',
  'groups/network/macaddress/index.html',
  'groups/storage/index.html',
  'groups/storage/eligiblefordeletionafter/index.html',
  'groups/storage/retainuntil/index.html',
  'groups/storage/retentionduration/index.html',
  'groups/tenancy/index.html',
  'groups/tenancy/suspended/index.html',
  'groups/tenancy/tenancymodel/index.html',
  'groups/tenancy/tenantid/index.html',
  'groups/tenancy/tier/index.html',
  'groups/topology/index.html',
  'groups/topology/continentname/index.html',
  'groups/topology/countrycode/index.html',
  'groups/topology/zoneid/index.html',
  'groups/vendor/index.html',
  'groups/vendor/companyname/index.html',
  'groups/vendor/contact/index.html',
  'groups/vendor/isdeprecated/index.html',
  'groups/vendor/pcivendorid/index.html',
  'groups/vendor/productid/index.html',
  'groups/vendor/servicelevelagreementurls/index.html',
  'groups/vendor/usbvendorid/index.html',
  'groups/vendor/website/index.html',
  'groups/workload/index.html',
  'groups/workload/businesscriticality/index.html',
  'groups/workload/dashboardurl/index.html',
  'groups/workload/documentationlandingpageurl/index.html',
  'groups/workload/environmentname/index.html',
  'groups/workload/responsibleteams/index.html',
  'groups/workload/sourcecoderepositoryurl/index.html',
  'groups/workload/version/index.html',
];

console.log(`🔍 Validating ${REQUIRED_ROUTES.length} static routes in ${DIST_DIR}...`);

let passed = 0;
let failed = 0;

for (const route of REQUIRED_ROUTES) {
  const filePath = path.join(DIST_DIR, route);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing route: ${route}`);
    failed++;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes('<title>') || !content.includes('</title>')) {
    console.error(`❌ Route ${route} missing <title> tag`);
    failed++;
    continue;
  }

  if (content.length < 200) {
    console.error(`❌ Route ${route} appears empty (${content.length} bytes)`);
    failed++;
    continue;
  }

  // Check for broken artifacts or unrendered tags
  if (content.includes('LocalImageUsedWrongly') || content.includes('UnhandledRuntimeError')) {
    console.error(`❌ Route ${route} contains runtime error text`);
    failed++;
    continue;
  }

  if (content.includes('{.lead}') || content.includes('{.table-extra-padding}')) {
    console.error(`❌ Route ${route} contains unrendered Kramdown attribute syntax`);
    failed++;
    continue;
  }

  if (content.includes('href="()"') || content.includes('href="" class="sl-link"')) {
    console.error(`❌ Route ${route} contains empty link target`);
    failed++;
    continue;
  }

  passed++;
}

console.log(`\n📊 Route Validation Summary:`);
console.log(`   Passed: ${passed}/${REQUIRED_ROUTES.length}`);
console.log(`   Failed: ${failed}/${REQUIRED_ROUTES.length}`);

if (failed > 0) {
  process.exit(1);
}

console.log('\n✅ All routes validated successfully with zero missing pages or rendering errors!');
