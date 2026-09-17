---
title: Total Installed Memory Bytes
layout: ontology_key

draft: true
params:
  ontology:
    key: compute.native.cloud/totalInstalledMemoryBytes
    exampleValues:
      - "8Gi"
      - "128Gi"
      - "549755813888"
    uses:
      kubernetesAnnotation: false
      kubernetesLabel: true
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to indicate the total amount of physical memory installed in a
compute resource, expressed as a [Kubernetes quantity]({{< relref "advice-tips/kubernetes-quantities.md" >}}).

This represents the total installed RAM capacity, not the amount of memory
currently available or free. Some memory may be reserved by firmware or
hardware and unavailable to the operating system.

This information is useful for capacity planning, workload scheduling, and hardware
inventory.

{{% ontology-validation %}}
The value must be a Kubernetes quantity.

You can define validation rules that enforce these constraints.
{{% /ontology-validation %}}
