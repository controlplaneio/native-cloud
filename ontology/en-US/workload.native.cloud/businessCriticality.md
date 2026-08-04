---
title: Business Criticality
layout: ontology_key

draft: true
params:
  ontology:
    key: workload.native.cloud/businessCriticality
    exampleValues:
      - "critical"
      - "high"
      - "medium"
      - "low"
    uses:
      kubernetesAnnotation: false
      kubernetesLabel: true
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to indicate the overall business criticality of a workload.

Business criticality reflects the impact to the organization if the workload
fails or degrades. This drives incident response priorities, resource allocation
decisions, change management processes, and operational practices.

Common values include "critical", "high", "medium", and "low", though
organizations may define their own criticality levels to match their specific
needs and operational practices.

{{% ontology-validation %}}
The value **must** be a valid Kubernetes label value (alphanumeric characters,
hyphens, underscores, and periods; maximum 63 characters).

Common values are "critical", "high", "medium", and "low", but you can define
custom criticality levels for your organization. Custom values do not have a
standardized meaning across the ontology.

You can define validation rules that restrict values to your organization's
specific criticality levels, or that warn when non-standard values are used.
{{% /ontology-validation %}}
