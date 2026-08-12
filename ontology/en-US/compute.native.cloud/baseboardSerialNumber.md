---
title: Baseboard Serial Number
layout: ontology_key

draft: true
params:
  ontology:
    key: compute.native.cloud/baseboardSerialNumber
    exampleValues:
      - "EFGH9876543210"
      - "SN-BB-2024-005678"
      - "MB123456789ABC"
      - "9668d047-7280-42f3-96e0-4d28d431d4ba"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to record the baseboard serial number of the physical
or virtual hardware hosting a compute resource. A baseboard is also known as 
a motherboard.

The baseboard serial number uniquely identifies the main circuit board that
connects and controls the primary components of a computer system. This is
useful for hardware inventory tracking, warranty management, and identifying
specific hardware revisions in bare-metal or hybrid cloud environments.

For virtual machines, this may contain a hypervisor-assigned baseboard identifier.

{{% ontology-validation %}}
The value must not be an empty string. The format depends on the
manufacturer and may include alphanumeric characters, hyphens, and spaces.

You can define validation rules that enforce this constraint.
{{% /ontology-validation %}}
