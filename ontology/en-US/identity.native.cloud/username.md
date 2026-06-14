---
title: Username
layout: ontology_key

draft: true
params:
  ontology:
    key: identity.native.cloud/username
    exampleValues:
      - "lovelaceada"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
---

This key identifies users by their username. Human users who have usernames
are always included in the meaning of this key, but machine identities
(such as Kubernetes ServiceAccounts) can also have usernames.

If your username format allows usernames that do not match Kubernetes' label
values, you should use this key exclusively for annotations.
