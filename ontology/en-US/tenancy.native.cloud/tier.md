---
title: Tenancy Tier
layout: ontology_key

draft: true
params:
  ontology:
    key: tenancy.native.cloud/tier
    exampleValues:
      - "free"
      - "basic"
      - "premium"
      - "enterprise"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
---

Use this key to identify the service tier or subscription level of a tenant
in a multi-tenant environment.

This key is commonly used in SaaS applications to differentiate between
service levels, enabling tier-based resource allocation, feature access,
and quality of service guarantees.

Common tier names include "free", "basic", "premium", and "enterprise",
though the specific tier values depend on your service offering.

{{% ontology-validation %}}
The value must not be an empty string. Any non-empty string value is valid.
You can define validation rules that enforce this constraint.

For your own service or platform, you can define a consistent set of tier names
and add validation rules to ensure that only those values are used.
{{% /ontology-validation %}}
