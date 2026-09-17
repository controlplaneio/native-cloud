---
title: About
description: Learn more about the native.cloud open ontology project.
---

This is for anyone.


## The vision

`native.cloud` provides a shared ontology of keys that can be used across different cloud native platforms and tools. By standardizing how we label, annotate, and describe our resources, we make it easier for teams to collaborate, for tools to interoperate, and for organizations to maintain consistency at scale.

Cloud native ecosystems have grown rapidly, but with that growth comes fragmentation. Different teams use different naming conventions, different tools expect different metadata formats, and the result is confusion and missed opportunities for automation.

## What we provide

Based on an idea formed in 2020, and live since 2026, `native.cloud` is about helping
people share common definitions for metadata across cloud native platforms and tools.

This site defines a curated set of keys that can be used in various [contexts](/context-uses/), that include:

- [Annotations](/context-uses/kubernetesannotation/) - For storing arbitrary metadata
- [Labels](/context-uses/kuberneteslabel/) - For identifying and selecting Kubernetes objects
- [Taints](/context-uses/kubernetestaint/) - For controlling pod scheduling

Each key definition includes an explanation to help you use it correctly. Where it's relevant, there are also validation rules or example values.


## Completely optional

> Is this going to be more work for my team?

It really doesn't have to be.

`native.cloud` is a voluntary standard; it can live alongside other standards and doesn't aim to be the standard to replace/consolodate all others (obligatory [xkcd 972](https://xkcd.com/927/)).

We have some specific advice to [ease adoption](/advice-tips/ease-of-adoption/).

If you've been asked by a boss or team lead to "just implement `native.cloud` ontology and you've not identified any keys that'd be of use. Please do not add any keys unnecessarily!
In the event you don't identify keys that'd be of use to you but would fit with the vision please do raise an [RFC](/TODO).


## About ControlPlane

[ControlPlane](https://control-plane.io/), the sponsor behind `native.cloud`, offers expert consultancy
for strategic solutions and sustainable growth.