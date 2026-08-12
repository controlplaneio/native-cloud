---
title: CPU Core Count
layout: ontology_key

draft: true
params:
  ontology:
    key: compute.native.cloud/cpuCoreCount
    exampleValues:
      - "2"
      - "4"
      - "72"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
---

Use this key to indicate the number of CPU cores available to a compute resource.
The value **should** be a positive integer representing the total number of physical or
virtual CPU cores. Fractional values are not allowed; the key represents the number of
different cores that tasks can be scheduled to, not fractional allocation.

This key is useful for capacity planning, resource allocation, and workload scheduling decisions.

{{% ontology-validation %}}
The value must be a natural number greater than zero (positive integer).
Values such as `0`, negative numbers, or non-numeric strings are not valid.

You can define validation rules that enforce these constraints.
{{% /ontology-validation %}}

<!--more-->

CPU cores can be taken offline. This key represents the total number of cores that can be available, not the number of cores currently active. However, a hot-plug event or
hot-unplug event can still lead to the number changing.