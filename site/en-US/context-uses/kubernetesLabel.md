---
title: Kubernetes label
params:
  short: Label
  plural: Kubernetes labels
  more_information: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
---

Items suitable to go into the `.metadata.labels` field of a Kubernetes object.

Labels are constrained; as well as being strings, you also have to use values
that match the syntax of a _DNS label name_. For example, whitespace is not
allowed.
