---
title: "LAPS (Cisco)"
tags: [implementation, cpp, relay, cisco]
date: 2026-08-22
last_updated: 2026-08-22
status: current
---

**Language**: C++
**Maintainer**: Cisco / [QuicR](https://github.com/Quicr)
**GitHub**: [Quicr/laps](https://github.com/Quicr/laps) — BSD-2-Clause
**Role**: **Latency Aware Publish/Subscribe** — a MOQT relay with relay-to-relay peering
**Draft support**: tracks the bundled `dependencies/libquicr` revision (see [[libquicr]])

# Overview

LAPS is Cisco's MOQT **relay** with an explicit **relay-mesh** design — the problem space [[moq-cluster|draft-lcurley-moq-cluster]] and [[relays|relay topology]] work also address, approached from a different direction.

Its distinguishing features:

- **Three node roles** — **Edge**, **Via**, and **Stub** — rather than a single flat relay type.
- **Separation of control and data peering**, so the mesh's routing plane is distinct from its media plane.
- **Source-routed forwarding** driven by **Subscribe Node Set advertisements**.
- **Track ranking** and **on-demand Via aggregation**.
- **Peering uses a LAPS-specific protocol, not MOQT** — an important distinction versus the [[moq-cluster|MoQ Cluster extension]], which carries mesh routing *over* moq-transport.

# Public infrastructure

LAPS runs a public **"MOQT Developer Playground"** interop endpoint (AWS `t4g.micro`, daily restart at 00:01 UTC) and has a dedicated **`#laps` channel on the quicdev Slack** — neither of which is currently listed in [[interop-endpoints]]. It is **not registered in the [[interop-runner]]**.

# Sibling projects

- **[Quicr/moq-bench](https://github.com/Quicr/moq-bench)** — C++ relay performance measurement harness. Distinct from the "Evens benchmark" *draft* the wiki references elsewhere.
- **[Quicr/quicr-mac](https://github.com/Quicr/quicr-mac)** — Swift macOS/iOS/tvOS A/V conferencing proof-of-concept on [[libquicr]]; actively developed (pushed 2026-08-21).

# Related

- [[libquicr]] — the Cisco C++ MOQT library LAPS builds on
- [[moq-cluster]] — the IETF relay-mesh extension solving adjacent problems over MOQT itself
- [[relays]], [[interop-endpoints]], [[suhas-nandakumar]]
