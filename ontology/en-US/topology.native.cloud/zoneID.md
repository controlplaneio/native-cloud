---
title: Zone ID
layout: ontology_key

draft: true
params:
  ontology:
    key: topology.native.cloud/zoneID
    exampleValues:
      - "antarctica-42a-1"
    uses:
      kubernetesAnnotation: false
      kubernetesLabel: true
      kubernetesTaint: false
---

This key identifies _availability zones_ in a vendor-neutral way. Availability
zones are sometimes also known as _failure isolation zones_.

The identifier is globally unique. Some cloud providers, such as Amazon Web Services (AWS),
use zone identifiers that are only unique within their own systems.
This key provides a standard way to refer to zones that works across different providers.

You can use this key when you need to coordinate with other organizations about which
availability zones to use, or to avoid.
