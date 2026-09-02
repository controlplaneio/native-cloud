---
title: Source Date (RFC 3339)
layout: ontology_oci_annotation

draft: true
params:
  ontology:
    ociAnnotation: cloud.native.artifact.source-date-rfc-3339
    exampleValues:
      - "2024-06-06T12:34:56Z"
      - "2024-06-06T12:34:56+00:00"
    uses:
      ociAnnotation: true
---

Use this OCI annotation to record the source date timestamp for this artifact.

The value is an [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) timestamp that has the equivalent
meaning to the [`SOURCE_DATE_EPOCH`](https://reproducible-builds.org/docs/source-date-epoch/)
environment variable.

This annotation should only be set when `$SOURCE_DATE_EPOCH` or an equivalent mechanism defines a specific
instant that has been used as the source date for the build. If no such mechanism is used, this annotation
should not be set.

This annotation is useful for:

- Validating that a build is reproducible
- Supply chain analysis

You can set this annotation and `org.opencontainers.image.created` on an artifact; they have similar
but different purposes.

### Timezones

For consistency across different systems and builds, values for this annotation **should** use the UTC timezone,
represented as the offset **`+00:00`**. This is not the same as specifying the timezone as **`Z`**
(which indicates the equivalent UTC time for some unknown timezone).

Annotations that use a different timezone **may** be permitted.

{{% ontology-validation %}}
The value **must** be either:

- a valid RFC 3339 timestamp (for example: `2006-01-02T15:04:05+00:00`).
- a valid timestamp according to an IETF RFC that has updated or superseded RFC 3339
  (for example: [RFC 9557](https://www.rfc-editor.org/info/rfc9557)).

The timestamp **must** include a timezone.

For your cloud native platform or context, you **may** choose to require that the timezone offset
is `+00:00`.
{{% /ontology-validation %}}

### Reliance on values

This annotation is designed to be used as a reference for supply chain analysis and SBOM enrichment.
It is **not** intended to be used as evidence of artifact freshness.