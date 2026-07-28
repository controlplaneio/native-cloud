---
title: Documentation Landing Page URL
layout: ontology_key

draft: true
params:
  ontology:
    key: workload.native.cloud/documentationLandingPageURL
    exampleValues:
      - "https://docs.example.com/services/payment-service"
      - "https://wiki.example.com/workloads/api-gateway"
      - "https://confluence.example.org/display/PLATFORM/User+Service"
    uses:
      kubernetesAnnotation: true
      kubernetesLabel: false
      kubernetesTaint: false
      kubernetesResourceClaim: false
---

Use this key to provide a URL to the main documentation landing page for a workload.

This URL should link to the primary documentation resource that provides an
overview, architecture details, operational guides, runbooks, API documentation,
or other reference materials for this workload. This serves as the starting
point for anyone seeking to understand or work with the workload.

{{% ontology-validation %}}
The value must be a valid URL. The URL should use the `https://` or `http://`
scheme and point to an accessible documentation resource.

You can define validation rules that enforce URL format constraints and
optionally restrict URLs to approved documentation platforms or domains.
{{% /ontology-validation %}}
