---
title: Deprecated offering (boolean)
layout: ontology_key

draft: true
params:
  ontology:
    key: vendor.native.cloud/isDeprecated
    allowedValues:
      - "true"
      - "false"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

This key indicates whether a vendor product or service is deprecated.
To avoid doubt: you use this key to indicate that a product or service is deprecated; the key itself is _not_ deprecated!

A value of `true` indicates the product or service is deprecated and may be removed
in the future. A value of `false` indicates the product or service is current and
actively supported.

This key is useful for lifecycle management, migration planning, and operational
awareness of upcoming changes.

{{% allowed-ontology-values %}}

{{% ontology-validation-automatic %}}
