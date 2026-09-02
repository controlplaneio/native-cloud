import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { validateOntology } from '../../scripts/validate-ontology.mjs';

const GROUPS_DIR = path.resolve('./src/content/docs/groups');

test('Adversarial Ontology Validation & Bypass-Resistance Suite', async (t) => {
  await t.test('1. Baseline: Valid production dataset passes 100%', () => {
    const result = validateOntology();
    assert.equal(result.passed, true);
    assert.equal(result.errors.length, 0);
  });

  await t.test('2. Adversarial: Rejects case-tampering in key names (case sensitivity)', () => {
    const filePath = path.join(GROUPS_DIR, 'compute', 'caseTestKey.mdx');
    const content = `---
title: Case Test
params:
  ontology:
    key: compute.native.cloud/casetestkey
    uses:
      kubernetesLabel: true
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('Key mismatch in file') && e.includes('expected \'compute.native.cloud/caseTestKey\'')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('3. Adversarial: Rejects uppercase domain names', () => {
    const filePath = path.join(GROUPS_DIR, 'compute', 'upperDomainTest.mdx');
    const content = `---
title: Upper Domain Test
params:
  ontology:
    key: COMPUTE.native.cloud/upperDomainTest
    uses:
      kubernetesLabel: true
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('Key mismatch in file')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('4. Adversarial: Rejects whitespace injection in key identifier', () => {
    const filePath = path.join(GROUPS_DIR, 'compute', 'whitespaceKeyTest.mdx');
    const content = `---
title: Whitespace Test
params:
  ontology:
    key: "compute.native.cloud/whitespaceKeyTest "
    uses:
      kubernetesLabel: true
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('Key mismatch') || e.includes('Invalid key name format')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('5. Adversarial: Rejects path traversal attempts (..) in key name', () => {
    const filePath = path.join(GROUPS_DIR, 'compute', 'traversalKeyTest.mdx');
    const content = `---
title: Traversal Test
params:
  ontology:
    key: compute.native.cloud/../storage.native.cloud/traversalKeyTest
    uses:
      kubernetesLabel: true
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('Key mismatch') || e.includes('Invalid key name format')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('6. Adversarial: Rejects double slashes in key name', () => {
    const filePath = path.join(GROUPS_DIR, 'compute', 'doubleSlashTest.mdx');
    const content = `---
title: Double Slash Test
params:
  ontology:
    key: compute.native.cloud//doubleSlashTest
    uses:
      kubernetesLabel: true
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('Key mismatch') || e.includes('Invalid key name format')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('7. Adversarial: Rejects string value disguised as boolean ("true")', () => {
    const filePath = path.join(GROUPS_DIR, 'compute', 'stringBoolTest.mdx');
    const content = `---
title: String Bool Test
params:
  ontology:
    key: compute.native.cloud/stringBoolTest
    uses:
      kubernetesLabel: "true"
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('invalid non-boolean value') || e.includes('no uses set to true')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('8. Adversarial: Rejects numeric truthy value disguised as boolean (1)', () => {
    const filePath = path.join(GROUPS_DIR, 'compute', 'numericBoolTest.mdx');
    const content = `---
title: Numeric Bool Test
params:
  ontology:
    key: compute.native.cloud/numericBoolTest
    uses:
      kubernetesLabel: 1
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('invalid non-boolean value') || e.includes('no uses set to true')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('9. Adversarial: Rejects typos in valid context-uses names', () => {
    const filePath = path.join(GROUPS_DIR, 'compute', 'typoUseTest.mdx');
    const content = `---
title: Typo Use Test
params:
  ontology:
    key: compute.native.cloud/typoUseTest
    uses:
      kubernetesLabell: true
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('unrecognised use \'kubernetesLabell\'')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('10. Adversarial: Rejects arbitrary unknown context uses', () => {
    const filePath = path.join(GROUPS_DIR, 'compute', 'arbitraryUseTest.mdx');
    const content = `---
title: Arbitrary Use Test
params:
  ontology:
    key: compute.native.cloud/arbitraryUseTest
    uses:
      dockerSwarmAnnotation: true
      kubernetesLabel: true
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('unrecognised use \'dockerSwarmAnnotation\'')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('11. Adversarial: Rejects key with missing params.ontology definition', () => {
    const filePath = path.join(GROUPS_DIR, 'compute', 'missingOntologyTest.mdx');
    const content = `---
title: Missing Ontology Test
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('missing params.ontology definition')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('12. Adversarial: Rejects key with empty uses object', () => {
    const filePath = path.join(GROUPS_DIR, 'compute', 'emptyUsesTest.mdx');
    const content = `---
title: Empty Uses Test
params:
  ontology:
    key: compute.native.cloud/emptyUsesTest
    uses: {}
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('has no uses defined')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('13. Adversarial: Rejects key where all 5 context uses are set to false', () => {
    const filePath = path.join(GROUPS_DIR, 'compute', 'allFalseFiveTest.mdx');
    const content = `---
title: All False Test
params:
  ontology:
    key: compute.native.cloud/allFalseFiveTest
    uses:
      kubernetesAnnotation: false
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: false
      ociAnnotation: false
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('has no uses set to true')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('14. Adversarial: Rejects reversed domain OCI annotation order tampering', () => {
    const filePath = path.join(GROUPS_DIR, 'vendor', 'reversedDomainTamperTest.mdx');
    const content = `---
title: Tampered OCI Annotation Test
params:
  ontology:
    ociAnnotation: vendor.native.cloud.reversedDomainTamperTest
    uses:
      ociAnnotation: true
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('Annotation mismatch in file') && e.includes('cloud.native.vendor.reversedDomainTamperTest')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  await t.test('15. Adversarial: Rejects OCI annotation name mismatch against base filename', () => {
    const filePath = path.join(GROUPS_DIR, 'vendor', 'ociFilenameMismatchTest.mdx');
    const content = `---
title: OCI Filename Mismatch Test
params:
  ontology:
    ociAnnotation: cloud.native.vendor.differentFilename
    uses:
      ociAnnotation: true
---
`;
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false);
      assert.ok(result.errors.some((e) => e.includes('Annotation mismatch in file')));
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });
});
