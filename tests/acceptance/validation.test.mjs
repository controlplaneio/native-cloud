import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { validateOntology } from '../../scripts/validate-ontology.mjs';

const GROUPS_DIR = path.resolve('./src/content/docs/groups');

test('Ontology Data Validation Suite', async (t) => {
  await t.test('All current ontology domains, keys, and context-uses pass validation', () => {
    const result = validateOntology();
    assert.equal(result.passed, true, `Validation failed with errors: ${result.errors.join(', ')}`);
    assert.equal(result.errors.length, 0);
    assert.equal(result.stats.domainCount, 8, '8 ontology domains checked');
    assert.equal(result.stats.keyCount, 36, '36 ontology keys validated');
    assert.equal(result.stats.contextUseCount, 5, '5 context uses validated');
  });

  await t.test('Rejects build when a key path does not match file location', () => {
    const testFilePath = path.join(GROUPS_DIR, 'compute', 'invalidKeyTest.mdx');
    const invalidContent = `---
title: Invalid Key Test
params:
  ontology:
    key: wrongDomain.native.cloud/invalidKeyTest
    uses:
      kubernetesLabel: true
---
Specification.
`;
    try {
      fs.writeFileSync(testFilePath, invalidContent, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false, 'Validation should fail for mismatched key path');
      assert.ok(
        result.errors.some((e) => e.includes('Key mismatch in file') && e.includes('expected \'compute.native.cloud/invalidKeyTest\'')),
        `Expected key mismatch error, got: ${result.errors.join('; ')}`
      );
    } finally {
      if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
    }
  });

  await t.test('Rejects build when an OCI annotation does not match reverse domain format', () => {
    const testFilePath = path.join(GROUPS_DIR, 'vendor', 'invalidAnnotationTest.mdx');
    const invalidContent = `---
title: Invalid Annotation Test
params:
  ontology:
    ociAnnotation: vendor.cloud.native.invalidAnnotationTest
    uses:
      ociAnnotation: true
---
Specification.
`;
    try {
      fs.writeFileSync(testFilePath, invalidContent, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false, 'Validation should fail for invalid OCI annotation reverse domain');
      assert.ok(
        result.errors.some((e) => e.includes('Annotation mismatch in file') && e.includes('cloud.native.vendor.invalidAnnotationTest')),
        `Expected annotation mismatch error, got: ${result.errors.join('; ')}`
      );
    } finally {
      if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
    }
  });

  await t.test('Rejects build when a key has no uses defined', () => {
    const testFilePath = path.join(GROUPS_DIR, 'compute', 'noUsesTest.mdx');
    const invalidContent = `---
title: No Uses Test
params:
  ontology:
    key: compute.native.cloud/noUsesTest
---
Specification.
`;
    try {
      fs.writeFileSync(testFilePath, invalidContent, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false, 'Validation should fail when uses is missing');
      assert.ok(
        result.errors.some((e) => e.includes('has no uses defined')),
        `Expected missing uses error, got: ${result.errors.join('; ')}`
      );
    } finally {
      if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
    }
  });

  await t.test('Rejects build when a key has all uses set to false', () => {
    const testFilePath = path.join(GROUPS_DIR, 'compute', 'allFalseUsesTest.mdx');
    const invalidContent = `---
title: All False Uses Test
params:
  ontology:
    key: compute.native.cloud/allFalseUsesTest
    uses:
      kubernetesLabel: false
      kubernetesAnnotation: false
---
Specification.
`;
    try {
      fs.writeFileSync(testFilePath, invalidContent, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false, 'Validation should fail when all uses are false');
      assert.ok(
        result.errors.some((e) => e.includes('has no uses set to true')),
        `Expected all false uses error, got: ${result.errors.join('; ')}`
      );
    } finally {
      if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
    }
  });

  await t.test('Rejects build when a key has an unrecognised context-use', () => {
    const testFilePath = path.join(GROUPS_DIR, 'compute', 'unrecognisedUseTest.mdx');
    const invalidContent = `---
title: Unrecognised Use Test
params:
  ontology:
    key: compute.native.cloud/unrecognisedUseTest
    uses:
      dockerContainerLabel: true
---
Specification.
`;
    try {
      fs.writeFileSync(testFilePath, invalidContent, 'utf-8');
      const result = validateOntology();
      assert.equal(result.passed, false, 'Validation should fail for unrecognised context use');
      assert.ok(
        result.errors.some((e) => e.includes('unrecognised use \'dockerContainerLabel\'')),
        `Expected unrecognised use error, got: ${result.errors.join('; ')}`
      );
    } finally {
      if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
    }
  });
});
