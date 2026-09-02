---
title: Kubernetes taint
params:
  short: Taint
  plural: Kubernetes taints
  more_information: >-
    https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/
description: Guidance on using native.cloud keys across metadata contexts.
---

Items suitable to be used as _taints_ on a Kubernetes node.

Taints are a way to mark nodes so that Pods (sets of related containers) don't
run there – with an exception. Kubernetes Pods can _tolerate_ a taint, allowing
them to run where other normal Pods cannot.