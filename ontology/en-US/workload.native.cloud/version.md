---
title: Workload Version
layout: ontology_key

draft: true
params:
  ontology:
    key: workload.native.cloud/version
    exampleValues:
      - "1.0.0"
      - "2.3.4-alpha.1"
      - "0.1.0-beta+20240605"
      - "3.2.1+build.123"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to specify the version of a workload.

The version identifies a specific release or build of the workload's software.
This is useful for tracking deployments, debugging issues, managing rollbacks,
and correlating runtime behavior with specific code versions.

{{% ontology-validation %}}
The value must be a valid Semantic Versioning 2.0.0 version string.

The format is `MAJOR.MINOR.PATCH` with optional pre-release and build metadata:

- `MAJOR.MINOR.PATCH` (e.g., `1.2.3`)
- `MAJOR.MINOR.PATCH-prerelease` (e.g., `1.0.0-alpha.1`)
- `MAJOR.MINOR.PATCH+build` (e.g., `1.0.0+20240605`)
- `MAJOR.MINOR.PATCH-prerelease+build` (e.g., `1.0.0-rc.1+build.123`)

See https://semver.org/ for the complete specification.

You can define validation rules that enforce SemVer 2.0.0 version numbering.
{{% /ontology-validation %}}

Because SemVer 2.0.0 allows characters (such as `+`) that are not valid in
Kubernetes label values, this key can only be used as an annotation.
