---
build:
  publishResources: false
  render: never
---

You can use Kubernetes' built-in mechanisms (including the ValidatingAdmissionPolicy API) to
enforce constraints on valid values.
You can also use a validating admission webhook and an external policy solution, such as
Kyverno or Open Policy Agent.
