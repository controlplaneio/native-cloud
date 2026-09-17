---
title: End of Vendor Support Date
layout: ontology_oci_annotation

draft: true
params:
  ontology:
    ociAnnotation: cloud.native.vendor.endOfSupportDate
    exampleValues:
      - "2027-12-31"
      - "2029-06-30"
    exampleSnippets:
      - |
        LABEL cloud.native.vendor.endOfSupportDate="2027-12-31"
        # This could go in your Containerfile or Dockerfile
    uses:
      ociAnnotation: true
---

Use this OCI annotation to indicate the end-of-support date for an OCI artifact,
such as a container image or Helm chart.

The end-of-support date is when the vendor will no longer provide security updates,
bug fixes, or other support for this version.

If you do not know the end of support date at the time you are building an artifact,
you should not set this annotation.

This annotation is useful for lifecycle management, upgrade planning, and compliance
tracking.

{{% ontology-validation %}}
The value must be a valid ISO 8601 date string in the format `YYYY-MM-DD`.
{{% /ontology-validation %}}
