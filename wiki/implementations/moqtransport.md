---
title: "moqtransport (Go) — mengelbart + Eyevinn fork"
tags: [implementation, go, library]
date: 2026-08-22
last_updated: 2026-09-02
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
| Draft support | README draft-11 / runner draft-13 | **draft-18** (v0.11.0, 2026-08-30; v0.11.1, 2026-08-31; **v0.12.0**, 2026-09-01) |

The upstream is the registry-registered one and roughly 17× larger by stars; the README still advertises draft-11 while the runner entry says draft-13, so its **draft support is behind the rest of the ecosystem** and it is not a current interop contender. The **Eyevinn fork jumped ahead of the upstream on 2026-08-30**, shipping a full **draft-18 rewrite as v0.11.0** (see Recent activity) — the first time the fork's draft support has diverged materially from `mengelbart/moqtransport`.

# Recent activity

- **v0.12.0 "receive-side fixes for relays"** (tagged 2026-09-01) — [PR #23](https://github.com/Eyevinn/moqtransport/pull/23) *"receive side: complete delivery, surface subgroup ends"* (+488/−59) plus [PR #24](https://github.com/Eyevinn/moqtransport/pull/24) running the session suite under Go's `testing/synctest`. Hardens the library's relay/receive path — the same day [[moqlivemock|Eyevinn/moqlivemock]] added its own `mlmrel` relay component built on this library.
- **v0.11.1 "qlog payload cap"** (tagged 2026-08-31) — a small follow-up to the draft-18 rewrite, capping qlog payload sizes; consumed the same day by [[moqlivemock]] ([#133](https://github.com/Eyevinn/moqlivemock/pull/133)) as it cut its v0.14.0 tag.
- **[PR #18 "Rewrite for MoQ Transport draft-18"](https://github.com/Eyevinn/moqtransport/pull/18)** ([[tobbe-einarsson|tobbee]], merged 2026-08-30, **+16,989/−13,359**) → **v0.11.0 "draft-18 rewrite"** (tagged 2026-08-30) — a large rewrite migrating the Eyevinn fork from draft-14/16 to **[[moq-transport]] draft-18**, done alongside the parallel [[moqlivemock]] draft-18 migration ([moqlivemock #129](https://github.com/Eyevinn/moqlivemock/pull/129)) ahead of the **Sep-2 draft-18 interop hackathon**. The migration surfaced a §11.4.4.2 End-of-Range clarity question — [moq-transport #1861](https://github.com/moq-wg/moq-transport/issues/1861) — which **[[alan-frindell|afrind]] then closed as *"agentic output"* (Aug-31)**, part of a WG crackdown on AI-generated issues (see [[moq-transport]] open questions).
- **[PR #16 "Eyevinn fixes"](https://github.com/Eyevinn/moqtransport/pull/16)** (@paulharter, +169/−15, **merged 2026-08-28**) with follow-up **[PR #17](https://github.com/Eyevinn/moqtransport/pull/17)** ([[tobbe-einarsson|tobbee]], +34/−3, merged 2026-08-28, documenting delivery semantics + guarding against goroutine leaks) — three fixes cherry-picked from **`panaudia/moqtransport`**, a further-downstream fork used by **LASA (live spatial audio over MoQ)**:
  1. **Backpressure for stream-read objects** — subgroup and fetch objects shared the same drop-on-overflow channel as datagrams, so reliable stream data could be **silently lost**. The most substantive of the three.
  2. Expose the publisher-assigned **track alias** on `RemoteTrack`.
  3. Atomic subgroup handling.

  This is the first sign of a *third-tier* fork chain (upstream → Eyevinn → panaudia) feeding fixes back upward, and the first MoQ **spatial-audio** application the wiki has recorded.

- Companion `mengelbart/gst-moq-app` (Go GStreamer demo) has been stale since 2024.

# Related

- [[mathis-engelbart]], [[moqlivemock]], [[tobbe-einarsson]]
- [[moq-go]] — the other significant Go MOQT implementation, at draft-19
- [[overview|Implementations Overview]], [[interop-runner]]
