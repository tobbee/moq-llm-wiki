---
title: "MOQ Interop Runner"
tags: [interop, testing, tooling]
date: 2026-04-14
last_updated: 2026-07-10
status: current
---

Standardized cross-implementation test framework for MOQ protocol interoperability testing.

# Overview

The interop runner automates testing between MOQ implementations, publishing results as a matrix showing pass/fail status for each implementation pair.

**GitHub**: [englishm/moq-interop-runner](https://github.com/englishm/moq-interop-runner)
**Results**: [englishm.github.io/moq-interop-runner](https://englishm.github.io/moq-interop-runner/)

# Registered Implementations

1. **moq-dev-js** - [[moq-dev|moq-dev/moq]] JavaScript/Hang player ([[luke-curley]])
2. **moq-dev-rs** - [[moq-dev|moq-dev/moq]] Rust ([[luke-curley]])
3. **moq-rs** - [[moq-rs|cloudflare/moq-rs]] (draft-14)
4. **moq-rs-draft-16** - Cloudflare moq-rs (draft-16 branch)
5. **moxygen** - [[moxygen|Meta's C++ relay]]
6. **xquic** - [[xquic-moq|Alibaba's XQUIC]]
7. **imquic** - [[lorenzo-miniero]]'s C library
8. **libquicr** - [[libquicr|Cisco's C++ library]]
9. **moqtail** - [[moqtail|Zafer Gurel's Rust/TS implementation]]
10. **quiche-moq** - Google's C++ MoQT ([[martin-duke]], [[victor-vasiliev|Victor Vasiliev]])
11. **moqx** - [[openmoq|OpenMOQ]]'s moxygen fork relay (PR #59 merged Apr 11)
12. **mlmtest** - [[moqlivemock|Eyevinn moqlivemock]] interop client ([[tobbe-einarsson|Torbjörn Einarsson]], PR #63 merged **May 13 17:25 UTC**) — supports both draft-14 and draft-16 via `DRAFT` env var
13. **moqx (client)** - OpenMOQ moqx client role ([[giovanni-marzot]], PR #66 merged **May 13 17:24 UTC**) — adds the client-side image to complement the existing moqx relay
14. **aiomoqt** - Python asyncio MoQT client ([[giovanni-marzot]], PR #67 merged **May 13 17:23 UTC**)
15. **Nokia v17 (via Docker RELAY_URL)** - yuyou (Nokia) Docker relay-URL configuration support (PR #65 merged **May 13 17:25 UTC**) — enables Nokia's in-house v17 implementation to slot into the matrix

# Current Target

The interop runner targets **draft-18** for automated testing. The WG (per [[mike-english]]'s Interop Report) agreed to hold draft-18 as the interop target while expanding case coverage from a handful of cases to ~70. Each matrix cell is categorized as at-target (both endpoints on draft-18), ahead, or behind.

# Current standing

The runner's most recent published cut is the **[2026-07-09 00:37:17 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-07-09_003717/report.html): 319 cells; 124 pass / 195 fail / 0 skip** (~38.9% pass), run against the same expanded implementation set.

A July-7 structural expansion grew the matrix +25 cells to 319 and cleared all 34 skips to zero (every cell now runs); pass then climbed +14 (93 → 107) on the July-8 cut and a further +17 (107 → 124) on the July-9 cut as the newly-added cross-version cells kept converting green — two straight coverage-to-conversion cuts on a structurally flat matrix (319 cells, 0 skip, at-target draft-18 171). This followed the July-2 expansion (matrix +28 to 294; at-target draft-18 78 → 152) and five straight cuts holding at-target 152 through the draft-18-only era (July 2–6). The runner still targets **draft-18** and has not advanced to draft-19.

The full day-by-day score history lives in [[log|the wiki log]] (Interop bullet in each daily entry).

# Best Performing Pairs

- **moq-rs-draft-16 <-> moq-rs-draft-16**: All tests pass (self-test)
- **moq-dev-js <-> moqx**: 6/6 pass
- **moq-rs-draft-16 <-> moqx**: 5-6/6 pass
- **moq-rs-draft-16 <-> moxygen**: 5-6/6 pass
- **moq-rs-draft-16 <-> imquic**: 5-6/6 pass
- **moq-rs <-> moq-rs**: All tests pass (self-test, draft-14)
- **moq-rs <-> moqx**: All tests pass (draft-14)

# Getting Started

To add a new implementation to the runner, see the [getting started guide](https://github.com/englishm/moq-interop-runner/blob/main/docs/GETTING-STARTED.md).

# Related

- [[interop-status]] - Overall interop testing status
- [[interop-endpoints]] - Public relay endpoints
