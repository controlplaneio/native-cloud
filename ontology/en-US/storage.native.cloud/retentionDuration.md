---
title: Storage Retention Duration
layout: ontology_key

draft: true
params:
  ontology:
    key: storage.native.cloud/retentionDuration
    exampleValues:
      - "7y"
      - "90d"
      - "18m"
      - "2y6m"
      - "30d12h"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to specify the expected retention duration for storage.

The duration defines how long data should be retained according to policy,
regulatory requirements, or business rules. This is a policy statement, not
an absolute deadline - it doesn't specify when retention starts or ends.

{{% ontology-validation %}}
The value must be a valid duration string using a variant on the Kubernetes duration format,
extended to include years.

Valid units:
- `y` - years
- `d` - days
- `h` - hours
- `m` - minutes
- `s` - seconds

Units can be combined (e.g., `2y6m`, `90d12h`, `1h30m45s`).

Examples:
- `7y` - 7 years
- `90d` - 90 days
- `18m` - 18 minutes
- `2y6m` - 2 years and 6 months

Where feasible, you **should** define validation rules that enforce this duration format.
{{% /ontology-validation %}}

