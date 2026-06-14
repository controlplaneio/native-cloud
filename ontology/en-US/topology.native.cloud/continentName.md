---
title: Continent name
layout: ontology_key

draft: true
params:
  ontology:
    key: topology.native.cloud/continentName
    exampleValues:
      - "antartica"
      - "north-america"
    allowedValues:
      - "africa"
      - "antartica"
      - "asia"
      - "australasia"
      - "europe"
      - "north-america"
      - "south-america"
    uses:
      kubernetesAnnotation: false
      kubernetesLabel: true
      kubernetesTaint: false
---

A continent is a large landmass defined by _de facto_ use and by convention.

Use this key to indicate that your infrastructure is on a particular continent
of planet Earth.
Use the common English name for the continent, all-lowercase. Replace spaces
with `-` characters.

{{% allowed-ontology-values %}}

Not all locations on Earth can map to a continent.
This ontology doesn't define a mapping from countries to continents, nor from
locations to continents.

{{% ontology-validation-automatic %}}
