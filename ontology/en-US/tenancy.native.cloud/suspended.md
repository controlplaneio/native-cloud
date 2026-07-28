---
title: Tenancy suspension status
layout: ontology_key

draft: true
params:
  ontology:
    key: tenancy.native.cloud/suspended
    allowedValues:
      - "true"
      - "false"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: true
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to indicate whether a tenant's access or service has been suspended.

This key is commonly used in SaaS applications to temporarily disable tenant
access due to non-payment, policy violations, or administrative actions, while
preserving the tenant's data and configuration for potential reactivation.

A value of `false` indicates the tenancy is active; `true` indicates suspended.
The specific meaning of suspension depends on your service policies, terms of use,
and other context.
