---
title: PCI Vendor ID
layout: ontology_key

params:
  ontology:
    key: vendor.native.cloud/pciVendorId
    exampleValues:
      - "5204" # SMK Corporation
      - "8086" # Intel Corporation
      - "01de" # Oxide Computer Company
    exampleSnippets:
      - |
        device.attributes["vendor.native.cloud"].pciVendorId == "1234" && 
        device.attributes["resource-driver.example.com"].size == "medium"
    uses:
      kubernetesAnnotation: false
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: true
---

Use this key to specify the PCI vendor ID for hardware devices or virtualized hardware.

PCI vendor IDs are 16-bit identifiers assigned by the [PCI-SIG](https://pcisig.com/) to uniquely identify hardware manufacturers. These IDs are used to identify the manufacturer of PCI devices such as network cards, storage controllers, and graphics adapters.

The value can be specified in hexadecimal format (without any `0x` prefix) or decimal format.

{{% ontology-validation %}}
The value must be a valid 16-bit hexadecimal number representing a PCI vendor ID,
without any prefixes or suffixes.

The value should be in lowercase hexadecimal format.
{{% /ontology-validation %}}
