---
title: Contact
layout: ontology_key

params:
  ontology:
    key: vendor.native.cloud/contact
    exampleValues:
      - "support@example.com"
      - "+1-555-0123"
      - "https://support.example.com/contact"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to specify contact information for a vendor or service provider.

This key can be used to provide an email address, phone number, or a contact form URL that users or automated systems can use to reach out for support, billing inquiries, or other communications.

{{% ontology-validation %}}
The value should be a valid email address, phone number, or URL.
{{% /ontology-validation %}}
