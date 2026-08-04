---
title: Environment Name
layout: ontology_key

draft: true
params:
  ontology:
    key: workload.native.cloud/environmentName
    exampleValues:
      - "production"
      - "staging"
      - "development"
      - "test"
      - "qa"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to identify the deployment environment where a workload runs.

The environment name distinguishes between different stages of the software
development and deployment lifecycle, enabling environment-specific policies,
resource allocation, access controls, and operational practices.

Common environment names include "production", "staging", "development", "test",
and "qa", though the specific values depend on your organization's deployment
pipeline and practices.

{{% ontology-validation %}}
The value must not be an empty string. Any non-empty string value is valid.
You can define validation rules that enforce this constraint.

For your own organization, you can define a consistent set of environment names
and add validation rules to ensure that only those values are used.
{{% /ontology-validation %}}
