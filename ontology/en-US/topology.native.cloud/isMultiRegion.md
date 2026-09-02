---
title: Multi-region
layout: ontology_key

draft: true
params:
  ontology:
    key: topology.native.cloud/isMultiRegion
    allowedValues:
      - "true"
      - "false"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to indicate whether a workload or infrastructure spans multiple
geographic regions.

A value of `true` indicates the resource is deployed across two or more
failure-isolation regions. A value of `false` indicates it is confined to a
single region.

This key is useful for resilience planning, latency optimization, and compliance
tracking. Multi-region deployments typically have higher availability but may
have cross-region latency or data residency implications.

{{% allowed-ontology-values %}}

{{% ontology-validation-automatic %}}
