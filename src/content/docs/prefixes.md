---
title: Prefixes & Keys
description: Complete directory of all DNS domain prefixes and key definitions across the native.cloud ontology.
---

This page lists all DNS domain names (prefixes) that have keys defined in the `native.cloud` ontology.

## Domain Prefixes

All metadata keys in `native.cloud` are prefixed with their domain namespace to ensure global uniqueness and clear semantic categorization:

| Prefix | Domain | Description | Keys |
| :--- | :--- | :--- | :--- |
| **`compute.native.cloud`** | [Compute](/groups/compute/) | Physical and virtual compute hardware, virtualization flags, CPU cores, and thermal states | 6 keys |
| **`identity.native.cloud`** | [Identity](/groups/identity/) | User identities, display names, unique identifiers, and certificate validities | 4 keys |
| **`network.native.cloud`** | [Network](/groups/network/) | Network interfaces, physical MAC addresses, and connectivity attributes | 1 key |
| **`storage.native.cloud`** | [Storage](/groups/storage/) | Data lifecycle, deletion eligibility timestamps, and retention lock durations | 3 keys |
| **`tenancy.native.cloud`** | [Tenancy](/groups/tenancy/) | Tenant identifiers, isolation models, service tiers, and suspension statuses | 4 keys |
| **`topology.native.cloud`** | [Topology](/groups/topology/) | Geographic continent names, ISO country codes, and availability zone IDs | 3 keys |
| **`vendor.native.cloud`** | [Vendor](/groups/vendor/) | Vendor organizations, contact endpoints, PCI/USB vendor IDs, and SLA documentation | 8 keys |
| **`workload.native.cloud`** | [Workload](/groups/workload/) | Application versions, business criticalities, monitoring dashboards, and repositories | 7 keys |

## Key Naming Convention

Keys follow standard Kubernetes domain prefix syntax:
```
<prefix>.native.cloud/<keyName>
```

For example:
- `compute.native.cloud/cpuCoreCount`
- `tenancy.native.cloud/tenantID`
- `workload.native.cloud/environmentName`