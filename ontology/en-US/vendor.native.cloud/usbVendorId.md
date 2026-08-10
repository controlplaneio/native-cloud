---
title: USB Vendor ID
layout: ontology_key

params:
  ontology:
    key: vendor.native.cloud/usbVendorId
    exampleSnippets:
      - |
        device.attributes["vendor.native.cloud"].usbVendorId == "1d6b" # Linux Foundation
    uses:
      kubernetesAnnotation: false
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: true
---

Use this key to specify the USB vendor ID for USB devices or virtualized USB devices.

USB vendor IDs are 16-bit identifiers assigned by the [USB Implementers Forum](https://www.usb.org/) (USB-IF)
to uniquely identify hardware manufacturers.
These IDs are used to identify the manufacturer of USB devices such as keyboards, mice, storage devices, and network adapters.

The value is specified in hexadecimal format (without any `0x` prefix).

{{% ontology-validation %}}
The value must be a valid 16-bit hexadecimal number representing a USB vendor ID,
without any prefixes or suffixes.

The value must be in lowercase hexadecimal format.
{{% /ontology-validation %}}
