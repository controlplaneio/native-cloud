---
title: Kubernetes Quantities
---

A [Kubernetes Quantity](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/quantity/)
is a number with an optional unit suffix, used throughout Kubernetes to express
resource amounts such as memory, storage, and CPU.

## Suffixes

Quantities use either binary (power-of-two) or decimal (power-of-ten) suffixes:

| Suffix | Meaning | Example |
|--------|---------|---------|
| `m` | milli- | `100m` = 0.1 |
| `Ki` | kibi- | `1Ki` = 1024 |
| `Mi` | mebi- | `24Mi` = 25165824 |
| `Gi` | gibi- | `1Gi` = 1073741824 |
| `Ti` | tebi- | `4Ti` = 4398046511104 |
| `Ei` | exbi- | `1Ei` = 1152921504606846976 |
| `k` | kilo- | `1k` = 1000 |
| `M` | mega- | `1M` = 1000000 |
| `T` | tera- | `5T` = 5000000000000 |
| `P` | peta- | `1P` = 1000000000000000 |
{.table-extra-padding}

A plain integer with no suffix is interpreted as a count of the base unit
(e.g. bytes for memory).

## Binary vs. decimal suffixes

Binary and decimal suffixes are not interchangeable. `1G` is 1000000000,
while `1Gi` is 1073741824.

## Values below 1

Some quantities don't make sense to have less than 1 of them, so you wouldn't
use `m` as a suffix. Take care not to confuse `m` (milli-) with `M` (mega-).

