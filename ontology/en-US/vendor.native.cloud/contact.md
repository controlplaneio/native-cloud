---
title: Contact
layout: ontology_key

params:
  ontology:
    key: vendor.native.cloud/contact
    exampleValues:
      - "mailto:support@example.com"
      - "tel:+12125554240"
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
The value **must** be a valid URI.
Use `mailto:` for email addresses (e.g., `mailto:support@example.com`),
`tel:` for phone numbers (e.g., `tel:+443069990999` or `tel:+1-555-426-7378` or `tel:87654`).
Phone number URIs **should** include the country code (based on the [E.123](https://www.itu.int/rec/T-REC-E.123) standard);
company directory internal short codes **may** be used, but are **not** recommended
or `https://` for contact form URLs.
{{% /ontology-validation %}}
