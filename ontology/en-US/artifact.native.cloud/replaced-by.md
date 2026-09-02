---
title: Artefact Replaced By
layout: ontology_oci_annotation

draft: true
params:
  ontology:
    ociAnnotation: cloud.native.artifact.replaced-by
    exampleValues:
      - "docker.io/library/example-app:2.0.0"
      - "registry.example/example/example-app@sha256:abc123def4567890abcdef1234567890abcdef1234567890abcdef1234567890"
    uses:
      ociAnnotation: true
---

Use this OCI annotation to indicate that this artifact has been superseded by another artifact.

The value is a fully qualified OCI artifact reference (including registry, repository, and tag or digest) that should be used instead of this artifact.

This annotation is useful for:

- Automated update workflows
- Software supply chain management


### Example annotation values

- `docker.io/library/myapp:2.0.0`
- `ghcr.io/example/myapp@sha256:abc123def4567890abcdef1234567890abcdef1234567890abcdef1234567890`

{{% ontology-validation %}}
The value must be a fully qualified OCI artifact reference.

Annotation values that do not include a registry part are invalid.
{{% /ontology-validation %}}

If the registry is omitted, consumers **may** interpret this as referring to `localhost`.  
Tooling that writes this annotation **must** always include the registry to avoid ambiguity.