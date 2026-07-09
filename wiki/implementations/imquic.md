---
title: "imquic (Meetecho)"
tags: [implementation, c, meetecho]
date: 2026-04-10
last_updated: 2026-07-09
status: current
---

**Language**: C
**Organization**: Meetecho
**Maintainer**: [[lorenzo-miniero]]
**GitHub**: [meetecho/imquic](https://github.com/meetecho/imquic)
**POC relay**: lminiero.it port 9000 (raw QUIC + WebTransport, draft-18 as of May 18, 2026)

# Overview

A C library for QUIC that includes MOQ Transport support alongside RTP over QUIC (RoQ). Built as part of the Janus WebRTC gateway ecosystem.

# History

- **2026-05-18**: Shipped IETF draft-18 — the second open-source implementation to do so (after [[moq-dev]]).
- **2026-05-20**: draft-18 merged to `main` via [PR #25](https://github.com/meetecho/imquic/pull/25) (also folding in a RoQ demos refactor, PR #26); second open-source impl with draft-18 in `main`, a 6-day spec-to-`main` cycle.

# Draft Support

- **draft-18 (since May 18, 2026)** — partial: most of the wire-format changes from the draft-17 → draft-18 changelog (SUBGROUP_HEADER FIRST_OBJECT bit, FETCH ID delta encoding, PADDING message, SUBSCRIBE_TRACKS split from SUBSCRIBE_NAMESPACE, REQUEST_UPDATE on both, redirect via REQUEST_ERROR, new error codes); initially missing `REQUEST_UPDATE` for `SUBSCRIBE_NAMESPACE` / `SUBSCRIBE_TRACKS`
- **draft-16 and draft-17** (version range: `0xff000010` to `0xff000011`) — prior supported set
- Supports version negotiation - can offer all supported versions or pin to a specific one
- Previously supported draft-11 through draft-16; draft-14 was dropped when moving to v17
- Not all features of all versions are fully implemented

# Public Infrastructure

- Relay at `lminiero.it:9000` (raw QUIC and WebTransport), tracking draft-18 `main`

# Recent Highlights

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **Live-media LOC demos** — [PR #27](https://github.com/meetecho/imquic/pull/27) merged at the June 2026 London hackathon: `imquic-moq-loc-send` captures webcam + mic and publishes audio (Opus) + video (H.264) LOC tracks; `imquic-moq-loc-recv` subscribes, decodes, and renders via SDL2. Replaces the prior moq-clock-only demos and uses MSF for the catalog. See [[moq-loc]].
- **Push-to-talk conversational demo** — [PR #31](https://github.com/meetecho/imquic/pull/31) merged June 19, with a live web demo at [lminiero.it/moqp2t/](https://lminiero.it/moqp2t/): every client subscribes to the `push2talk` namespace and holding spacebar publishes an audio track carried over QUIC datagrams. Client side built on [[moqtail|Moqtail]], plus a native demo in the repo — the first publicly-reachable real-time conversational-media app over MoQ the wiki has tracked, exercising the PUBLISH-driven (vs SUBSCRIBE-driven) delivery pattern.
- **LOC private-object payload prefix** — [PR #29](https://github.com/meetecho/imquic/pull/29) added an explicit payload prefix for LOC private objects, resolving the omit-the-block-vs-write-a-zero-count encoding question surfaced while building the LOC demos.
- **Relay hardening** — fixed a nested-namespace `SUBSCRIBE_NAMESPACE` / `SUBSCRIBE_TRACKS` notification bug found in interop testing ([PR #30](https://github.com/meetecho/imquic/pull/30)), plus follow-on NAMESPACE / NAMESPACE_DONE and LOC-sender crash fixes, and partial `DYNAMIC_GROUPS` / `NEW_GROUP_REQUEST` support in the relay demo.

# Interop

- Registered in [[interop-runner]] matrix; became a registered **draft-18** endpoint (June 2026, advertising draft-18/17/16), one of the first two draft-18 registrations alongside Nokia's `moqt-nr`
- First v17 interop achieved with [[moq-dev]] (moq-dev/moq, Rust publisher + JS subscriber) (2026-04-01)
- London hackathon (June 2026): cross-impl object exchange with [[kota-yatagai|Kota Yatagai]]'s Moqtopus — Kota fixed a reciprocal publisher priority-bit bug in imquic ([PR #28](https://github.com/meetecho/imquic/pull/28)) — and with [[suhas-nandakumar|Suhas Nandakumar]]'s quicr/moq-web
- Active interop testing at IETF 125 Shenzhen and Boulder hackathon

# Related

- [[lorenzo-miniero]] - Maintainer
- [[interop-endpoints]] - Public relay endpoints
- [[interop-runner]] - Test framework
