---
title: MAC Address
layout: ontology_key

params:
  ontology:
    key: vendor.native.cloud/macAddress
    exampleValues:
      - "00:1A:2B:3C:4D:5E"
      - "52:54:00:12:34:56"
    exampleSnippets:
      - |
        device.attributes["vendor.native.cloud"].macAddress == "00:1A:2B:3C:4D:5E"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: true
---

Use this key to specify the Media Access Control (MAC) address for hardware devices or virtual network interfaces.

MAC addresses are unique identifiers assigned to network interface controllers (NICs) for communications at the data link layer of a network segment. They are typically assigned by the manufacturer and are used in network protocols like Ethernet and Wi-Fi.

{{% ontology-validation %}}
The value must be a valid MAC address in EUI-48 or EUI-64 format. 

The value should use colon separators (e.g., `00:00:00:00:00:00`) or hyphen separators (e.g., `00-00-00-00-00-00`). Hexadecimal characters should preferably be in uppercase.
{{% /ontology-validation %}}
