---
title: "imquic (Meetecho)"
tags: [implementation, c, meetecho]
date: 2026-04-10
last_updated: 2026-05-29
status: current
---

> **2026-05-29**: **PR #27 still OPEN no new commits May 28-29** (last updated May 28 17:00 UTC = thread metadata, not code). Lorenzo's strategic question now answered by **[[will-law|Will Law]] in Slack May 27 10:30 UTC**: *"LOC is just a packaging format... use MSF (MOQT Streaming Format). I plan to release a new draft this Friday ahead of the London interop"* (MSF -01 publishes today May 29). Lorenzo confirms imquic PR #27 already uses MSF for catalog; notes the **TIMESTAMP-vs-SUBGROUP_DELIVERY_TIMEOUT conflict** in moq-transport-18 §15.8-2 — Lorenzo's working around it with custom property IDs until the cross-spec coordination gap resolves. **Alan Frindell May 27 21:10 UTC** suggests Jordi Cenzano migrates moq-encoder-player off moqmi (still stuck on v14). **Carry-forward**: with MSF -01 publishing today and Mike English asking for **streaming-format-level automated interop** ([Issue #32](https://github.com/englishm/moq-interop-runner/issues/32)) in the same thread, imquic PR #27's catalog implementation is now reference-aligned with the canonical MSF specification; the LOC property ID conflict resolution is still pending WG-level decision.
>
> **2026-05-28**: **[PR #27 OPEN since May 25 15:56 UTC](https://github.com/meetecho/imquic/pull/27)** by [[lorenzo-miniero|lminiero]] *"New MoQ demos to test publishing/subscribing LOC with live capture/playback"* (+3057/−492). Two new live-media demos: **`imquic-moq-loc-send`** captures local webcam + microphone, publishes to audio (Opus via libopus) + video (H.264 via libavcodec) tracks using LOC; **`imquic-moq-loc-recv`** subscribes, unpacks LOC, decodes media, renders audio/video locally via SDL2. **Paired with Lorenzo's `#moq` Slack May 27 08:21 UTC question**: *"Is moq-mi still relevant, or should all A/V efforts focus on LOC now?"* — PR body explicitly acknowledges the dual-identity question: *"this started arguably more of an implementation of [moq-mi](https://www.ietf.org/archive/id/draft-cenzano-moq-media-interop-03.html), as that's what moq-encoder-player [arguably is]"*. **Uses the LOC property IDs from [moq-encoder-player](https://github.com/facebookexperimental/moq-encoder-player/)** (Facebook, stuck on MoQT v14) *"as that's what I used to test my MoQ/WebRTC integration in Janus with that project"*. **Carry-forward**: as of May 28 06:00 UTC no one had answered Lorenzo's strategic question on Slack; PR #27's draft-14-era property IDs would need re-doing for either draft-ietf-moq-loc-02 (WG, 19 pages) or the **conflicting moq-transport-18 §15.8-2 property type IDs** (TIMESTAMP=0x06, TIMESCALE=0x08) that [[moq-dev|moq-dev/moq]]'s May 23 PR #1388 ships — the cross-spec coordination gap [moq-wg/loc Issue #20](https://github.com/moq-wg/loc/issues/20) surfaced.
>
> **2026-05-21**: **imquic draft-18 LANDS ON `main`** — [PR #25 MERGED May 20 09:25:23 UTC](https://github.com/meetecho/imquic/pull/25) by [[lorenzo-miniero|Lorenzo Miniero]] (+2184/−1693, *"Add support for MoQT v18"*). The `moq-18` branch is now folded in, ending the May 19 *"branch ready, gated on interop-runner PR #68"* holding pattern — Lorenzo merged unilaterally without waiting for the matrix bump. PR body lists draft-17→18 changes implemented: SUBGROUP_HEADER FIRST_OBJECT bit, FETCH ID delta encoding, new PADDING message on dedicated streams, SUBSCRIBE_TRACKS split from SUBSCRIBE_NAMESPACE, REQUEST_UPDATE on both, new redirect structure via REQUEST_ERROR, new error codes. PR #26 (RoQ demos refactor) also merged 14:06:55 UTC — `main` is no longer parked. **lminiero.it:9000 POC relay** now runs `main` rather than branch builds. **imquic is the second open-source impl with draft-18 in `main`** (after [[moq-dev]] May 18); **6-day spec-to-`main` cycle** (May 12 → May 20).
>
> **2026-05-20**: **imquic `moq-18` branch exists but unmerged to `main`**. Lorenzo Miniero `#moq-interop-runner` May 19 15:40 UTC in [[mike-english|Mike English]]'s [PR #68](https://github.com/englishm/moq-interop-runner/pull/68) thread: *"Let me know when you're ready to go and I'll merge the v18 branch in imquic, I finished the bulk of the work and the rest can wait."* — gated on the interop-runner's draft-18 target merging. **`main` last-touched April 16**, but the `moq-18` branch carries the draft-18 wire-format work that backs the lminiero.it:9000 POC relay. Lorenzo also did the **first hands-on draft-18 interop attempt** against [mondain/moqxr](https://github.com/mondain/moqxr) May 19 09:12 UTC, finding a bidi-vs-uni SETUP-stream divergence that Paul Gregoire fixed in 8 commits over 10 hours. **The matrix-bump / library-merge / interop-cycle ordering** is now: PR #68 merges → imquic moq-18 branch merges → next interop run includes draft-18 axis → imquic vs moqxr first-cross-impl pair on draft-18 surfaces in matrix.
>
> **2026-05-19**: **imquic updated to draft-18** ([[lorenzo-miniero]] `#moq` Slack May 18 17:53 UTC): *"I updated my stack to most of the changes there (hopefully the right way). I think I'm missing the ability to REQUEST_UPDATE a SUBSCRIBE_NAMESPACE/TRACKS, but I'll try to do that in the next few days."* **Second open-source implementation to ship draft-18** (after [[moq-dev|moq-dev/moq]] PR #1418 May 18 05:08 UTC). POC relay endpoint at **lminiero.it port 9000** (raw QUIC + WebTransport) is publicly available for interop testing. Repo last-pushed May 18 15:51 UTC.

**Language**: C
**Organization**: Meetecho
**Maintainer**: [[lorenzo-miniero]]
**GitHub**: [meetecho/imquic](https://github.com/meetecho/imquic)
**POC relay**: lminiero.it port 9000 (raw QUIC + WebTransport, draft-18 as of May 18, 2026)

# Overview

A C library for QUIC that includes MOQ Transport support alongside RTP over QUIC (RoQ). Built as part of the Janus WebRTC gateway ecosystem.

# Draft Support

- **draft-18 (since May 18, 2026)** — partial: most of the wire-format changes from the draft-17 → draft-18 changelog; missing `REQUEST_UPDATE` for `SUBSCRIBE_NAMESPACE` / `SUBSCRIBE_TRACKS` (planned for the days following May 18)
- **draft-16 and draft-17** (version range: `0xff000010` to `0xff000011`) — prior supported set
- Supports version negotiation - can offer all supported versions or pin to a specific one
- Previously supported draft-11 through draft-16; draft-14 was dropped when moving to v17
- Not all features of all versions are fully implemented

# Public Infrastructure

- Relay at `lminiero.it:9000` (raw QUIC and WebTransport)

# Interop

- Registered in [[interop-runner]] matrix
- First v17 interop achieved with [[moq-dev]] (moq-dev/moq, Rust publisher + JS subscriber) (2026-04-01)
- Active interop testing at IETF 125 Shenzhen and Boulder hackathon

# Related

- [[lorenzo-miniero]] - Maintainer
- [[interop-endpoints]] - Public relay endpoints
- [[interop-runner]] - Test framework
