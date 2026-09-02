---
title: Machine identity (boolean)
layout: ontology_key

draft: true
params:
  ontology:
    key: identity.native.cloud/isMachineIdentity
    allowedValues:
      - "true"
      - "false"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to indicate whether an identity represents a machine or service
account rather than a human user.

A value of `true` indicates the identity is for a machine, service account, or
automated process. A value of `false` indicates the identity represents a human
user.

This key is useful for access control policies, audit logging, and security
monitoring. Machine identities typically have different privilege patterns and
lifecycle management requirements than human users.

{{% allowed-ontology-values %}}

{{% ontology-validation-automatic %}}
