---
title: Contexts for Key/Value Usage
description: Quick reference and best practices for applying native.cloud keys across Kubernetes contexts.
---

This site defines ontology keys that can be used in various Kubernetes contexts. Here's a quick reference to help you understand where and how these keys can be applied:

## Context Comparison

| Context | Target Objects | Max Value Length | Allowed Characters | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **[Annotations](/context-uses/kubernetesannotation/)** | All Kubernetes Resources | Unlimited (subject to etcd object limit) | Any UTF-8 string, JSON, or YAML | URLs, timestamps, descriptions, structured configs |
| **[Labels](/context-uses/kuberneteslabel/)** | All Kubernetes Resources | 63 characters | Alphanumeric, `-`, `_`, `.` | Selectors, grouping, filtering, routing |
| **[Taints](/context-uses/kubernetestaint/)** | Nodes | 63 characters (value) | Alphanumeric, `-`, `_`, `.` | Node isolation, scheduling constraints |
| **[Resource Claims](/context-uses/kubernetesresourceclaim/)** | Dynamic Resource Allocation | Driver-dependent | Driver-dependent | Hardware attributes, GPU/FPGA allocations |

## Choosing the Right Context

1. **Use Labels when** you need Kubernetes controllers, services, or CLI selectors (`kubectl get pods -l ...`) to query or group resources.
2. **Use Annotations when** you need to store metadata for human operators, CI/CD tools, or external auditing platforms that do not require label selectors.
3. **Use Taints when** you want to repel pods from nodes unless they have matching tolerations (e.g. dedicated hardware or maintenance).

Always ensure your key values match the syntax requirements for the context you're using.