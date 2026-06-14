---
title: Country code
layout: ontology_key

draft: true
params:
  ontology:
    key: topology.native.cloud/countryCode
    exampleValues:
      - "EC" # Ecuador
      - "GB" # United Kingdom of Great Britain and Northern Ireland
      - "KG" # Kyrgyzstan
      - "TZ" # United Republic of Tanzania
      - "UA" # Ukraine
    uses:
      kubernetesAnnotation: false
      kubernetesLabel: true
      kubernetesTaint: false
---


Use this key to indicate that infrastructure is located within the borders of
a country.
Use the 2-letter ISO 3166 code for the country, all-uppercase.


{{% ontology-validation %}}
You should not set values for this key to a code not defined by ISO 3166,
and you should use the 2-letter code value. The meaning of any other values
isn't defined.

You are allowed to define validation rules that enforce these constraints.
{{% /ontology-validation %}}
