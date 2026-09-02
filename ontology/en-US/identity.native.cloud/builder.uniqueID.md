---
title: Builder Unique ID
layout: ontology_oci_annotation

draft: true
params:
  ontology:
    ociAnnotation: cloud.native.identity.builder.uniqueID
    exampleValues:
      - "gieves:200554d4-b36c-4e4a-9673-90d92459ea8b:build-456"
      - "github-actions:1234567890"
      - "gitlab-ci:runner-abc123"
    uses:
      ociAnnotation: true
---

Use this OCI annotation to provide a machine-readable unique identifier for the
person or build system entity that produced this OCI artifact.

For automated builds, the unique ID should be stable and uniquely identify the machine identity for the specific build runner, workflow, or job instance. This enables traceability and debugging back to the exact build that produced the artifact.

If a build is manual, this should be the ID of their user record. Avoid using
this OCI annotation if they have a locally unique ID, such as `1042`, that isn't
likely to be unique across your organization.

This annotation is useful for supply chain traceability, incident investigation,
and build system integration.

{{% ontology-validation %}}
The value must be a non-empty string. The format depends on your identity
system and artefact build tooling, but should be stable and unique within
your organization.
{{% /ontology-validation %}}
