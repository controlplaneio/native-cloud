---
title: Display Name
layout: ontology_key

draft: true
params:
  ontology:
    key: identity.native.cloud/displayName
    exampleValues:
      - "Ada Lovelace"
      - "CI/CD Pipeline Runner antarctica-7245ec4f6781"
      - "张伟"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
---

Use this key to provide a human-readable display name for an identity.

The display name is intended for presentation in user interfaces, audit logs,
notifications, and other contexts where a human-friendly representation of the
identity is needed. This is distinct from technical identifiers like usernames
or unique IDs.

Display names may include spaces, international characters, punctuation, and
other formatting that makes them readable and recognizable to humans. They can
be used for both human users and service accounts.

{{% ontology-validation %}}
The value must be a non-empty string. The string may contain any valid Unicode
characters, including spaces, punctuation, and international characters.

You can define validation rules that enforce character limits or other
constraints appropriate for your organization.
{{% /ontology-validation %}}
