---
title: Product ID
layout: ontology_key

draft: true
params:
  ontology:
    key: vendor.native.cloud/productID
    exampleValues:
      - "m5.large"
      - "Standard_D2s_v3"
      - "acmecorp:hosting.2xlarge"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to indicate the vendor-specific product identifier for a resource.

The product ID is a vendor-defined identifier that specifies the exact product type,
size, or configuration. This may include instance types, SKU codes, model numbers,
or other product identifiers used by the vendor's catalog.

This key is useful for cost tracking, capacity planning, and understanding the
specific characteristics of resources deployed across different vendors or regions.

{{% ontology-validation %}}
The value must be a non-empty string. The string may contain any valid characters
allowed by the vendor's product identification scheme.

You can define validation rules that restrict values to a known set of product
IDs in your organization.
{{% /ontology-validation %}}
