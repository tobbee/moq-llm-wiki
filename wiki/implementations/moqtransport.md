---
title: "moqtransport (Go) — mengelbart + Eyevinn fork"
tags: [implementation, go, library]
date: 2026-08-22
last_updated: 2026-08-22
status: current
---

**Language**: Go
**Upstream**: [mengelbart/moqtransport](https://github.com/mengelbart/moqtransport) — MIT, ~87 stars, [[mathis-engelbart|Mathis Engelbart]] (TUM)
**Fork**: [Eyevinn/moqtransport](https://github.com/Eyevinn/moqtransport) — Eyevinn's downstream
**Built on**: `quic-go` + `webtransport-go`

# Overview

The principal **Go** MOQ Transport library, and the upstream from which several Go-based MoQ efforts derive. Written by [[mathis-engelbart|Mathis Engelbart]], who is also active in the WG on [[moq-transport]] encoding issues and the **mlog/qlog** event-definition work.

This page covers **both** the upstream and the Eyevinn fork, because the wiki's Eyevinn-centric coverage previously referenced only the fork:

| | Upstream `mengelbart/moqtransport` | Fork `Eyevinn/moqtransport` |
|---|---|---|
| Author | [[mathis-engelbart|Mathis Engelbart]] (TUM) | Eyevinn (see [[tobbe-einarsson]]) |
| Created | — | 2025-11-23 |
| Stars | ~87 | ~5 |
| Interop runner | **registered** (as `moqtransport`, draft-13) | not registered |

The upstream is the registry-registered one and roughly 17× larger by stars; the README still advertises draft-11 while the runner entry says draft-13, so its **draft support is behind the rest of the ecosystem** and it is not a current interop contender.

# Recent activity

- **[PR #16 "Eyevinn fixes"](https://github.com/Eyevinn/moqtransport/pull/16)** (@paulharter, opened 2026-08-21, +34/−5, OPEN) — three fixes cherry-picked from **`panaudia/moqtransport`**, a further-downstream fork used by **LASA (live spatial audio over MoQ)**:
  1. **Backpressure for stream-read objects** — subgroup and fetch objects shared the same drop-on-overflow channel as datagrams, so reliable stream data could be **silently lost**. The most substantive of the three.
  2. Expose the publisher-assigned **track alias** on `RemoteTrack`.
  3. Atomic subgroup handling.

  This is the first sign of a *third-tier* fork chain (upstream → Eyevinn → panaudia) feeding fixes back upward, and the first MoQ **spatial-audio** application the wiki has recorded.

- Companion `mengelbart/gst-moq-app` (Go GStreamer demo) has been stale since 2024.

# Related

- [[mathis-engelbart]], [[moqlivemock]], [[tobbe-einarsson]]
- [[moq-go]] — the other significant Go MOQT implementation, at draft-19
- [[overview|Implementations Overview]], [[interop-runner]]
