---
title: Builder Display Name
layout: ontology_oci_annotation

draft: true
params:
  ontology:
    ociAnnotation: cloud.native.identity.builder.displayName
    exampleValues:
      - "Ada Lovelace"
      - "GitForge CI runner s_4de779a81df2"
      - "Jenkins agent agent1"
    uses:
      ociAnnotation: true
---

Use this OCI annotation to provide a human-readable display name for the build system
that produced this OCI artifact.

The display name is intended for presentation in user interfaces, logs, and
other contexts where a human-friendly representation of the builder is needed.
This complements the machine-readable unique identifier.

This annotation is useful for operational awareness, debugging, and user-facing
documentation of build provenance.

{{% ontology-validation %}}
The value must be a non-empty string. The string may contain any valid Unicode
characters, including spaces, punctuation, and international characters.
{{% /ontology-validation %}}
