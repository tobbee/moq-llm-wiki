---
title: "moq-go (floatdrop)"
tags: [implementation, go, relay, draft-19]
date: 2026-08-22
last_updated: 2026-08-22
status: current
---

**Language**: Go
**Maintainer**: Vsevolod Strukchinsky ([floatdrop](https://github.com/floatdrop)), Yandex
**GitHub**: [floatdrop/moq-go](https://github.com/floatdrop/moq-go) — Apache-2.0 OR MIT
**Role**: Transport-agnostic MOQT session library + reference relay + demo CLIs
**Draft support**: **draft-19** (ALPN `moqt-19`)

# Overview

A Go implementation of IETF **moq-transport**, created 2026-06-22. It is small and young, but it occupies a distinctive position in the ecosystem: **it is the only implementation in the [[interop-runner]] running draft-19**, and therefore the only endpoint the runner has ever classified as **ahead of the interop target**.

Components:

- A **transport-agnostic session library** (the protocol core, independent of the QUIC/WebTransport binding).
- A **reference relay** (`cmd/relay`) supporting multi-instance deployment through a pluggable `DiscoveryStore`.
- **Packaging support** for [[moq-loc|LOC-04]], [[moq-msf|MSF-01]], and [[moq-cmsf|CMSF-01]].
- Demo publisher/subscriber CLIs.

Recent work (Aug 2026): Prometheus metrics and a health endpoint (#90/#91, Aug-21), and a subgroup-stream parking fix (#88).

# Interop — the "ahead of target" case study

`moq-go` is registered in the [[interop-runner]] as **both a client and a relay**. Its version choice makes it the runner's most instructive data point:

- Through the **2026-08-18** cut it ran at **draft-18** and was paired against ~13 relay endpoints — roughly **30 at-target runs**, most of them failing 0/6.
- From the **2026-08-19** cut it is labeled **draft-19**, and because the runner only pairs version-matched endpoints, it now appears in exactly **one** cell: **`moq-go → moq-go`, draft-19, docker, 6/6 pass**.
- That single reclassification *is* the Aug-19 matrix contraction: **at-target 220 → 190**, **ahead 0 → 1**, total cells **350 → 321**.

The lesson generalizes beyond this project: **under the current runner design, moving ahead of the interop target costs an implementation all of its cross-implementation coverage.** With the **[[interim-meetings|Sep-2 hackathon]]** targeting draft-18 and draft-20 not becoming the target until the **Oct 12–15 Seattle interim**, an early mover is effectively invisible in the shared matrix in the meantime.

> **Naming hazard**: there are **two unrelated `moq-go` projects**, plus a third confusable name. This page covers **floatdrop/moq-go**. [dineshadhi/moq-go](https://github.com/dineshadhi/moq-go) is an abandoned Go implementation (last commit 2024-10). Separately, **`moq-dev/moq-go`** is [[moq-dev|moq-dev/moq]]'s Go FFI bindings *mirror* repo — not an independent implementation.

# Related

- [[interop-runner]] — where the draft-19 "ahead" classification shows up
- [[overview|Implementations Overview]], [[moq-transport]]
- [[moqtransport]] — the other significant Go MOQT implementation
