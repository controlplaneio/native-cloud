---
title: Minimum Remaining Certificate Validity
layout: ontology_key

draft: true
params:
  ontology:
    key: identity.native.cloud/minimumRemainingCertificateValidity
    exampleValues:
      - "30d"
      - "90d"
      - "7d"
      - "1y"
    uses:
      kubernetesAnnotation: false
      kubernetesLabel: true
      kubernetesTaint: false
---

Use this key to specify the minimum acceptable remaining validity period for
a certificate before it should be considered a problem requiring action.

This duration defines the threshold for alerts, automated renewal, or other
remediation actions. Automated renewal processes should ensure that new certificates
are requested, issued and installed before this threshold is reached.

When a certificate has less than this amount of time remaining before expiry, your
platform **may** trigger notifications or automated remediation processes.

Different certificates may have different configured durations based on their
criticality, renewal complexity, or organizational policies.

{{% ontology-validation %}}
The value must be a valid duration string using a variant on the Kubernetes
duration format, extended to include years. This also ensures that the value
is a valid Kubernetes label value.

Valid units:
- `y` - years
- `d` - days
- `h` - hours
- `m` - minutes
- `s` - seconds

Units can be combined (e.g., `1y30d`, `90d12h`).

Examples:
- `30d` - 30 days
- `90d` - 90 days
- `7d` - 7 days
- `1y` - 1 year

Where feasible, you **should** define validation rules that enforce this duration format.
{{% /ontology-validation %}}
