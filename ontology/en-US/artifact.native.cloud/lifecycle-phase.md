---
title: Lifecycle Phase
layout: ontology_oci_annotation

draft: true
params:
  ontology:
    ociAnnotation: cloud.native.artifact.lifecycle-phase
    exampleSnippets:
      - |
        LABEL cloud.native.artifact.lifecycle-phase=alpha
    allowedValues:
      - alpha
      - beta
      - stable
    uses:
      ociAnnotation: true
---

Use this OCI annotation to indicate the lifecycle phase of an artifact.

{{% allowed-ontology-values %}}

**alpha**
: Early development, may be unstable, not recommended for production use

**beta**
: Feature-complete but may still have bugs, limited production use cases

**stable**
: Production-ready, suitable for general use


{{% ontology-validation %}}
The value **must** be one of the allowed values.
{{% /ontology-validation %}}

If you use a different set of lifecycle phases, you should use your own annotation and not
`cloud.native.artifact.lifecycle-phase`.
