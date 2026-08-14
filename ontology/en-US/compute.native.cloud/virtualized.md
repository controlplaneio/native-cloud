---
title: Virtualized (boolean)
layout: ontology_key

draft: true
params:
  ontology:
    key: compute.native.cloud/virtualized
    allowedValues:
      - "true"
      - "false"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

This key indicates whether a compute resource is virtualized.

A value of `true` indicates the resource is a virtual machine or container running
on a hypervisor or managed platform. A value of `false` explicitly indicates bare-metal
(no virtualization).

This key is useful for workload scheduling decisions, performance tuning, and
hardware inventory tracking. Some workloads require direct hardware access for
performance or security reasons and are scheduled to _avoid_ virtualized nodes.

{{% allowed-ontology-values %}}

If you are unsure whether a resource is virtualized: don't set this key at all.

{{% ontology-validation-automatic %}}
