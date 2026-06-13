---
title: Zone ID
layout: ontology_key

draft: true
params:
  ontology:
    key: topology.native.cloud/zoneId
    exampleValues:
      - "antartica-42a-1"
    uses:
      kubernetesAnnotation: false
      kubernetesLabel: true
      kubernetesTaint: false
---

This key identifies failure isolation zones (also called availability zones),
in a way that aims to be vendor neutral.

This identifier is meant to be globally unique. It's useful because some
providers, notably Amazon Web Services (AWS), expose similar identifers that
are unique only within a tenancy or some narrower context.

If it's useful for two different organizations to agree on which failure
isolation zone they want to use, or to avoid, this key lets you do that.
