---
title: Context Uses
description: Guidance on using native.cloud keys across metadata contexts including Kubernetes and OCI.
---

## Overview

In cloud native infrastructure, metadata keys can be applied across several distinct operational contexts. `native.cloud` specifies exact compatibility guidelines for each key to ensure consistency across tooling, admission controllers, and platform operators.

## Metadata Contexts

The `native.cloud` ontology currently defines rules and recommendations for five standard metadata contexts:

### 1. [Kubernetes Annotations](/context-uses/kubernetesannotation/)
Used for attaching arbitrary non-identifying metadata to Kubernetes objects. Annotations are ideal for configuration data, operational dashboards, ownership notes, and structured JSON payloads.

### 2. [Kubernetes Labels](/context-uses/kuberneteslabel/)
Used for identifying, grouping, and selecting Kubernetes objects. Labels have strict syntax requirements (maximum 63 characters, alphanumeric with `-`, `_`, `.`) and are used directly by selectors and query filters.

### 3. [Kubernetes Resource Claims](/context-uses/kubernetesresourceclaim/)
Used with Kubernetes Dynamic Resource Allocation (DRA) to configure and schedule structured device and hardware metadata claims.

### 4. [Kubernetes Taints](/context-uses/kubernetestaint/)
Used on Kubernetes Nodes to control pod scheduling and workload isolation boundaries via `NoSchedule`, `PreferNoSchedule`, or `NoExecute` taint effects.

### 5. [OCI Image Annotations](/context-uses/ociannotation/)
Used in Open Container Initiative (OCI) image and artifact manifests to embed build, source repository, version, and provenance metadata directly inside container registry descriptors.

## Context Matrix

Each key in the ontology includes an **Applicable Contexts** card indicating whether it is supported as an Annotation, Label, Taint, or Resource Claim.