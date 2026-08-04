---
title: Source Code Repository URL
layout: ontology_key

draft: true
params:
  ontology:
    key: workload.native.cloud/sourceCodeRepositoryURL
    exampleValues:
      - "https://git.example.com/example-org/hello-world"
      - "https://source.example.org/platform/api-gateway/main"
      - "https://forge.example.net/projects/CORE/repos/acme-service"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to provide a URL to the source code repository for a workload.

This URL should link to the primary repository containing the source code,
configuration, or infrastructure-as-code that defines this workload. This
helps developers and operators quickly locate the code for understanding
implementation details, filing issues, or making changes.

{{% ontology-validation %}}
The value must be a valid URL.

You can define validation rules that enforce URL format constraints.
{{% /ontology-validation %}}
