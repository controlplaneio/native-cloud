---
title: Tenancy model
layout: ontology_key

draft: true
params:
  ontology:
    key: tenancy.native.cloud/tenancyModel
    allowedValues:
      - "dedicated"
      - "pooled"
      - "hybrid"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
---

Use this key to indicate the tenancy model of a multi-tenant environment.

- **`dedicated`**: Infrastructure is dedicated to a single tenant, with hard physical or logical isolation from other tenants. In this model, each instance of storage or compute is assigned to exactly one tenant.
- **`pooled`**: Infrastructure is shared across multiple tenants, with isolation achieved within application code. A single instance of the application is used to serve multiple tenants.
- **`hybrid`**: A mix of dedicated and pooled infrastructure, where some resources or services are dedicated while others are shared.

This key is useful for security policies, compliance tracking, capacity planning,
and cost allocation. Different tenancy models have different implications for
performance isolation, security boundaries, and operational practices.

{{% allowed-ontology-values %}}

{{% ontology-validation-automatic %}}
