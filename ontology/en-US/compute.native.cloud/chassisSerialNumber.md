---
title: Chassis Serial Number
layout: ontology_key

draft: true
params:
  ontology:
    key: compute.native.cloud/chassisSerialNumber
    exampleValues:
      - "ABCD1234567890"
      - "SN-CH-2024-001234"
      - "ExampleVendor-42 1a:3c:5d:6e:7f:8a:9b-c0:d1:e2:f3"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to record the chassis serial number of the physical or virtual
hardware hosting a compute resource.

The chassis serial number uniquely identifies the physical enclosure or frame
that houses the computing components.

Serial numbers **should** be unique globally.

{{% ontology-validation %}}
The value must not be an empty string. The format depends on the hardware
manufacturer and may include alphanumeric characters, hyphens, and spaces.


You can define validation rules that enforce this constraint.
{{% /ontology-validation %}}
