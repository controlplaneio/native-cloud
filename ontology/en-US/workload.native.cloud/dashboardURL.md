---
title: Dashboard URL
layout: ontology_key

draft: true
params:
  ontology:
    key: workload.native.cloud/dashboardURL
    exampleValues:
      - "https://grafana.example.com/d/abc123/my-service"
      - "https://datadog.example.com/dashboard/xyz789"
      - "https://monitoring.example.com/workloads/payment-service"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to provide a URL to the primary monitoring or observability
dashboard for a workload.

This URL should link to a dashboard that displays key metrics, logs, traces,
or other observability data specific to this workload. The dashboard helps
operators, developers, and on-call engineers quickly assess the health and
performance of the workload.

{{% ontology-validation %}}
The value must be a valid URL. The URL **should** use the `https://` or `http://`
scheme and point to an accessible dashboard resource.

You can define validation rules that enforce URL format constraints and
optionally restrict URLs to approved dashboard platforms or domains.
{{% /ontology-validation %}}
