---
title: Retain Until
layout: ontology_key

draft: true
params:
  ontology:
    key: storage.native.cloud/retainUntil
    exampleValues:
      - "2027-01-01T00:00:00Z"
      - "2032-12-31T23:59:59+00:00"
      - "2028-03-15T09:00:00-04:00"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to specify the **minimum** retention period for storage.

The timestamp indicates when the data must be retained until. Data must not be
deleted before this timestamp. This is typically used for legal holds, regulatory
compliance requirements, or business policies that mandate minimum retention periods.

After this timestamp, the data may still be kept, but the retention requirement
no longer applies.

{{% ontology-validation %}}
The value must be a valid ISO 8601 timestamp with timezone information and
precision to seconds.

Valid formats:

- `2027-01-01T00:00:00Z` (UTC)
- `2027-01-01T00:00:00+00:00` (UTC with offset notation)
- `2027-01-01T09:00:00-04:00` (with timezone offset)

You can define validation rules that enforce ISO 8601 timestamp format.
{{% /ontology-validation %}}

Some timestamps are valid under ISO 8601 but not for this annotation.
For example, `2027-01-01T00:00:00` is valid under ISO 8601 but not for this annotation
(because it lacks timezone information).
