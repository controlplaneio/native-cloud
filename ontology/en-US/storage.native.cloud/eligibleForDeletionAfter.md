---
title: Eligible for Deletion After
layout: ontology_key

draft: true
params:
  ontology:
    key: storage.native.cloud/eligibleForDeletionAfter
    exampleValues:
      - "2027-01-01T00:00:00Z"
      - "2030-12-31T23:59:59+00:00"
      - "2025-06-15T14:30:00-05:00"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to specify when storage becomes eligible for deletion.

The timestamp indicates when automated deletion processes may delete the data.
Deletion is not guaranteed to occur at exactly this time - it may happen at or
after this timestamp, depending on cleanup schedules, batch processing, or other
operational factors.

This key is useful for implementing data retention policies, compliance
requirements, and automated cleanup of temporary or time-limited data.

{{% ontology-validation %}}
The value must be a valid ISO 8601 timestamp with timezone information, and
precision to whole seconds.

Valid formats:

- `2027-01-01T00:00:00Z` (UTC)
- `2027-01-01T00:00:00+00:00` (UTC with offset notation)
- `2027-01-01T14:30:00-05:00` (with timezone offset)

You can define validation rules that enforce ISO 8601 timestamp format.
{{% /ontology-validation %}}

Some timestamps are valid under ISO 8601 but not for this annotation.
For example, `2027-01-01T00:00:00` is valid under ISO 8601 but not for this annotation
(because it lacks timezone information).
