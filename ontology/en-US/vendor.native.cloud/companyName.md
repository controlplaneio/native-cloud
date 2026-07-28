---
title: Company Name
layout: ontology_key

params:
  ontology:
    key: vendor.native.cloud/companyName
    exampleValues:
      - "Acme Corporation GmbH"
      - "Initech, Inc."
      - "三菱グループ"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
---

Use this key to specify the legal or trading name of a supplier organization.

This key is useful for identifying the company that operates or supplies equipment, services, or resources. It can be used for billing, compliance, ownership tracking, or organizational purposes.

Company names are free-form text that **should** match the official legal name or commonly
used trading name of the organization.

If you are building a container image, you would set `org.opencontainers.image.vendor` as an
OCI annotation on the image (and you wouldn't use this annotation).

{{% ontology-validation %}}
The value must be a string representing a company name. Company names can be in any
language and may contain spaces, punctuation, or special characters.
{{% /ontology-validation %}}
