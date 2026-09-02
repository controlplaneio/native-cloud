---
title: Release Note URL
layout: ontology_oci_annotation

draft: true
params:
  ontology:
    ociAnnotation: cloud.native.vendor.releaseNoteURL
    exampleValues:
      - "https://example.com/releases/v1.2.3"
      - "https://github.com/example/myapp/releases/tag/v1.2.3"
    uses:
      ociAnnotation: true
---

Use this OCI annotation to provide a URL to the release notes for this container image
or OCI artifact.

Release notes document changes, new features, bug fixes, and known issues for
a specific version.

This annotation is useful for change management, upgrade planning, and operational
awareness of what changed between versions.

{{% ontology-validation %}}
The value must be a valid URL pointing to release note documentation.
{{% /ontology-validation %}}
