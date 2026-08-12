---
title: Website
layout: ontology_key

params:
  ontology:
    key: vendor.native.cloud/website
    exampleValues:
      - "https://www.example.com"
      - "https://native.cloud"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to specify the official website URL for a vendor or organization.

Providing the website URL allows users to easily find more information about the vendor, their products, services, and documentation.

{{% ontology-validation %}}
The value must be a valid URL. The URL **should** use the `https://` scheme.
{{% /ontology-validation %}}
