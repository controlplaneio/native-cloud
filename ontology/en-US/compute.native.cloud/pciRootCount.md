---
title: PCI Root Count
layout: ontology_key

draft: true
params:
  ontology:
    key: compute.native.cloud/pciRootCount
    exampleValues:
      - "1"
      - "2"
      - "4"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to indicate the number of PCI root complexes present in a compute
resource.

A PCI root complex is the hardware component that connects the CPU and memory
subsystem to the PCIe fabric. Systems with multiple root complexes typically
reflect a NUMA topology, where each CPU socket has its own PCIe hierarchy.

This key is useful for workloads that are sensitive to PCIe topology, such as
those using GPU passthrough, SR-IOV networking, or high-performance storage
devices, where the placement of a device relative to a CPU socket affects
latency and bandwidth.

{{% ontology-validation %}}
The value must be a natural number greater than zero (positive integer).
Values such as `0`, negative numbers, or non-numeric strings are not valid.

You can define validation rules that enforce these constraints.
{{% /ontology-validation %}}
