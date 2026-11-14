---
title: "moqtransport (Go) — mengelbart + Eyevinn fork"
tags: [implementation, go, library]
date: 2026-08-22
last_updated: 2026-11-14
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
| Draft support | README draft-11 / runner draft-13 | **draft-22 alongside draft-18** (v0.15.0, 2026-10-30; earlier draft-18: v0.11.0 → v0.14.1) |

The upstream is the registry-registered one and roughly 17× larger by stars; the README still advertises draft-11 while the runner entry says draft-13, so its **draft support is behind the rest of the ecosystem** and it is not a current interop contender. The **Eyevinn fork jumped ahead of the upstream on 2026-08-30**, shipping a full **draft-18 rewrite as v0.11.0** (see Recent activity), and on **2026-10-30 it added draft-22 alongside draft-18 in one build** (v0.15.0) — widening the divergence from `mengelbart/moqtransport`.

# Recent activity

- **v0.15.2 "bounded Object sizes and Request IDs"** (tagged 2026-11-13): a hardening bug-fix release ([#33](https://github.com/Eyevinn/moqtransport/issues/33)) that bounds what a peer can make a session hold. An Object on a subgroup or fetch stream whose **payload or Properties length exceeds `Session.MaxObjectSize`** (new field, default **64 MiB**) is now refused **before anything is allocated** — the stream is stopped with EXCESSIVE_LOAD and the session continues. Previously a declared length of 2⁵² or more made the receiver panic, so **a single Object header from a peer could crash the process**; Objects above 1 MiB are now read in pieces as their bytes arrive. Separately, the out-of-order **Request IDs a session remembers are capped at a 4096-ID window** — before, one Request ID that never arrived (e.g. of a request cancelled before its message was read) kept every later ID in memory for the rest of the session (surfaced by [moqlivemock #173](https://github.com/Eyevinn/moqlivemock/issues/173)); a Request ID arriving >4096 requests late is now treated as a duplicate. The API is unchanged apart from the new `Session.MaxObjectSize` (zero value = default). Consumed the same day by [[moqlivemock]] **v0.19.1**.
- **v0.15.1 "one Track Alias per subscription"** (tagged 2026-11-03): [PR #31](https://github.com/Eyevinn/moqtransport/pull/31) fixes [#30](https://github.com/Eyevinn/moqtransport/issues/30). Two subscriptions to the same track on one session used to share a Track Alias, so each received the other's Objects and counted the other's streams toward PUBLISH_DONE. Each subscription now gets its own alias. When a peer does share an alias, a data stream waits while a SUBSCRIBE to that track is unanswered (draft-22 §3.1.3). A datagram with an unknown alias is now dropped, where before it stopped datagram delivery for the rest of the session.
- **v0.15.0 "draft-22 alongside draft-18"** (tagged 2026-10-30): [PR #29](https://github.com/Eyevinn/moqtransport/pull/29) ([[tobbe-einarsson|tobbee]], **+7,811/−1,435**) makes the Go library speak **both [[moq-transport]] draft-22 and draft-18 in one build**, ALPN-selected per session — so a single process can bridge a draft-18 upstream to a draft-22 downstream. This is the fork's first multi-draft build since the draft-18 rewrite; consumed the next day by [[moqlivemock]] ([#164](https://github.com/Eyevinn/moqlivemock/pull/164)) to bring its whole stack onto draft-22. Ahead of the **IETF 127 hackathon** (early November), whose interop target pair is draft-18 + draft-22.
- **v0.14.0 "§7.2 stream tiering"** (tagged 2026-09-29): [PR #26](https://github.com/Eyevinn/moqtransport/pull/26) ([[tobbe-einarsson|tobbee]], +177/−57, merged Sep-21) bumps quic-go to **v0.62.0**, whose RFC 9218-style stream priorities make the library's priority mapping live for the first time. It applies **draft-18 §7.2's tiering** as QUIC urgency: control streams 0, bidi request streams 1, Objects 2–5 (by the top two bits of the priority number), 6 spare, 7 padding. It also fixes a real inversion: the control stream had kept quic-go's default urgency 3, so any subscription with priority below 96 overtook it. The practical consequence is that **two priorities must now differ by at least 64** to be separated. Go 1.26 is now required. [[moqlivemock]] v0.16.0 consumes it to schedule catalog/audio/subtitles ahead of video.
- **v0.13.0 "RENDEZVOUS_TIMEOUT on SUBSCRIBE"** (tagged 2026-09-02) — [PR #25](https://github.com/Eyevinn/moqtransport/pull/25) (+83/−0) exposes the **draft-18 §10.2.6 RENDEZVOUS_TIMEOUT** parameter (wire codepoint `0x04`, a varint of milliseconds) that the wire layer already knew but nothing surfaced: `Parameters.RendezvousTimeout()` / `SubscribeRequest.RendezvousTimeout()` return the wait plus **whether it was present** (absent and zero get different answers from a relay — DOES_NOT_EXIST vs. an expired hold), and `WithRendezvousTimeout(d)` sets it on a SUBSCRIBE. Driven by [[moqlivemock]]'s `mlmrel`, whose blanket hold on every SUBSCRIBE contradicted the section's MUST ([moqlivemock #139](https://github.com/Eyevinn/moqlivemock/pull/139)); also needed by any client wanting the runner's proposed `publish-to-pending-subscription` test ([interop-runner #103](https://github.com/englishm/moq-interop-runner/pull/103), which sends 5000 ms).
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
