---
title: Responsible Teams
layout: ontology_key

draft: true
params:
  ontology:
    key: workload.native.cloud/responsibleTeams
    exampleValues:
      - '["platform-team"]'
      - '["platform-team-antartica", "security-team-global"]'
      - '["frontend", "backend", "sre"]'
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to identify the teams responsible for a workload.

The value must be a JSON _array of strings_, where each string identifies a team
that has ownership or responsibility for the workload. Multiple teams can share
responsibility for operating, maintaining, or supporting a workload.

This key is useful for incident management, on-call routing, access control,
cost allocation, and organizational accountability.

{{% ontology-validation %}}
The value must be a valid JSON document. The JSON document must be an array
containing one or more non-empty strings.
An empty array is not valid. Each team identifier must also be a non-empty string.

The sorting order of the array is not significant.

Example valid values:

- `["platform-team"]`
- `["platform-team", "security-team"]`

You can define validation rules that enforce these constraints and optionally
restrict team identifiers to a known set of team names in your organization.
{{% /ontology-validation %}}
