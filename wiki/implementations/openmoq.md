---
title: "OpenMOQ Software Consortium"
tags: [implementation, consortium, organization]
date: 2026-04-12
last_updated: 2026-08-22
status: current
---

**Website**: [openmoq.org](http://openmoq.org/)
**GitHub**: [openmoq](https://github.com/openmoq)

# Overview

An industry consortium advancing MOQ-based technology through high-performance, open-source software. Mission: deliver practical implementations that enable the next generation of media transport.

# Members

## Charter Members
- Akamai
- CDN77
- Cisco
- RED5
- Synamedia
- YouTube

## Standard Members
- Ateme
- Bitmovin
- Nano Cosmos
- Qualabs
- Vindral
- Wowza

## Academic Members
- University of Klagenfurt
- Özyeğin University

# Repositories

## openmoq/moxygen (moqx)
- **GitHub**: [openmoq/moxygen](https://github.com/openmoq/moxygen)
- Fork of Meta's [[moxygen]] relay, serving as the buffer repo for the planned **moqx** server/relay
- C++
- Default version set advertises **draft 14/16** as a stable "floor relay" (draft-18 excluded by policy); the codebase also carries draft-18 message handling and a [[qmux]] listener. See Recent Highlights and Interop.

## openmoq/moq-relay-test
- **GitHub**: [openmoq/moq-relay-test](https://github.com/openmoq/moq-relay-test)
- Interop testing tool for MOQT relays
- Updated: 2026-03-20

## mondain/moqxr
- **GitHub**: [mondain/moqxr](https://github.com/mondain/moqxr)
- Origin Publisher, Contribution, and Ingest CLI for OpenMOQ (C++), maintained by [[mondain|Paul Gregoire]] (mondain)
- **draft-18 support shipped May 16–18, 2026** — the third open-source implementation to ship draft-18, after [[moq-dev|moq-dev/moq]] and [[imquic]]
- Capabilities added since: a live-object publish API, an optional MSF media timeline track, an SRT MPEG-TS ingest path (fMP4 repackaging → MoQ objects), and a prebuilt static-library SDK (picoquic/picotls bundled) consumed by mondain/moq2ts
- Latest release: **v0.2.1** (Apr 17, 2026) — draft-16 interop fixes (release tag predates the draft-18 work); v0.2.0 (Apr 15) added a draft-16 SUBSCRIBE KVP parser, dropped the WebTransport subprotocol for draft-14, and made control-message handling non-blocking

## openmoq/moq5 — the C protocol core
- **GitHub**: [openmoq/moq5](https://github.com/openmoq/moq5) — C, Apache-2.0, created 2026-06-23
- Registered in the [[interop-runner]] under organization **"Red5 Pro"** as the `moq5` **client** endpoint, currently running **at-target draft-18**; supports **draft-16 and draft-18**, selected by transport negotiation and never auto-detected
- **Sans-I/O, zero-dependency C protocol core** with an explicit allocator and a shared transport bridge — designed to be embedded rather than run standalone
- A **media service tier** on top (`moq_endpoint_t`, `moq_media_receiver_t`, `moq_media_sender_t`) targets FFmpeg / VLC / GStreamer / OBS integration
- Deterministic **FoundationDB-style seed-replayable simulation testing** (`moq-sim` / SimPair) — an unusually rigorous test approach for this ecosystem
- Companion: [rwl4/gst-moq](https://github.com/rwl4/gst-moq) — a minimal C GStreamer plugin over MOQ5

## openmoq/moq-playa — Red5's TypeScript player suite
- **GitHub**: [openmoq/moq-playa](https://github.com/openmoq/moq-playa) — TypeScript, Apache-2.0, created 2026-06-06
- **Correction**: this wiki previously recorded moq-playa as *"planned / not yet publicly available (as of 2026-04-10)"*. It has been public and shipping since June 2026.
- A full-stack TypeScript MoQT reference implementation published as **two npm scopes**, all at **v0.5.7 (2026-08-18)**: `@moqt/transport` (sans-I/O core), `@moqt/loc`, `@moqt/msf`, `@moqt/playback` (jitter buffer, A/V sync), `@moqt/webtransport`, `@moqt/browser`, `@moqt/player`, plus a batteries-included `@playa/player`
- **WebCodecs** playback path with **MSE/CMAF fallback** and ABR

## mondain/moqzr
- **GitHub**: [mondain/moqzr](https://github.com/mondain/moqzr) — Zig + Electrobun MoQ player (MIT), [[mondain|Paul Gregoire]]

# Goals

- Distribute development costs across organizations
- Accelerate MOQ through collective expertise
- Ensure interoperability via standardized implementations
- Lower market barriers for new use cases beyond media (financial feeds, gaming, IoT, AR/VR)

# Development Status

Core infrastructure development is ongoing. The consortium has completed industry alignment, established a technical roadmap, and finalized legal structure and governance.

# Recent Highlights

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **Alan Frindell's OpenMOQ consulting arrangement disclosed (July 20, 2026)** — in an IETF "Change in employment disclosure" to the MoQ list, [[alan-frindell|Alan Frindell]] noted he has moved from **full-time to part-time at Meta** (Meta still sponsors his IETF participation, which remains on Meta's behalf), and in his non-Meta hours now **runs a consulting business contracted with OpenMOQ to build open-source software — specifically the `moqx` relay.** This formalizes the sponsorship behind the moqx work he has driven on the fork, and gives OpenMOQ a named, funded relay project.
- **Multi-threaded relay scaling** — [[alan-frindell|Alan Frindell]] (afrind, Meta) drove a sustained effort (late May–June) making moqx deployable with `threads > 1`: a cBPF reuseport worker-steering filter, `recvmmsg` batch receives, per-thread local forwarders, and a `relay_thread` config knob, plus follow-on lock-free-mode relay-correctness hardening.
- **CAT-token authentication** — [[mondain|Paul Mondain]]'s [PR #264](https://github.com/openmoq/moqx/pull/264) (merged June 3, the largest single moqx merge) added opt-in CAT-style token auth/authorization for MOQT relay services, verifying signed CWT/HMAC `exp`/`moqt`/`moqt-reval` claims; afrind then refactored it into per-session auth filters, and a CAT4MOQ / [[moq-c4m|C4M]] issuer utility followed.
- **Floor-relay version policy** — moxygen (moqx) deliberately defaults to advertising **draft 14/16** and excludes draft-18 (June 16–17), staying a stable floor relay while `moq-rs-draft-18` carries the at-target draft-18 interop cells. A known hazard ([Issue #472](https://github.com/openmoq/moqx/issues/472)) is that the default version order can cap negotiation at 16 even when 18 is mutually supported.
- **London hackathon (June 9)** — afrind brought the relay up as a public draft-18 endpoint and shipped `moq_decode.py`, a standalone draft-18 wire decoder for interop debugging, entering [[interim-meetings|London]] with CAT-token auth, auto-regression CI, and the multi-thread stack in place.
- **draft-18 codebase capabilities** — although the default relay stays on 14/16, the codebase gained draft-18 message handling (akash-a-n's SUBSCRIBE_TRACKS port, [PR #411](https://github.com/openmoq/moqx/pull/411)) and a [[qmux]] listener ([PR #420](https://github.com/openmoq/moqx/pull/420)), the latter landing the same day [[moq-dev|moq-dev/moq]] added its own qmux listener.
- **Observability + deployment hardening (July)** — afrind added a self-contained live Prometheus metrics dashboard and perf-test client metrics; [[giovanni-marzot|gmarzot]] added in-memory PKCS#12 TLS bundle support ([PR #460](https://github.com/openmoq/moqx/pull/460)), a no-sudo onboarding quickstart, and native Debian/Ubuntu build support.
- **Contributor footprint** — Tim Evens (Cisco) joined on the build system (CPM dependency migration, Debian + macOS toolchain fixes), widening Cisco's MoQ footprint; most moqx churn is afrind's, with gmarzot, akash-a-n, peterchave, and mondain also contributing. Meta's [[moxygen]] upstream stayed comparatively sparse as this work landed on the fork.
- **Governance incident resolved** — an April OpenMOQ dispute involving Mike English and [[giovanni-marzot|Giovanni Marzot]] (a "suspicious AI PR" on the interop runner) was resolved May 18, with Marzot returning as an active contributor.

# Interop

- **openmoq/moxygen (moqx)** in the [[interop-runner]] since Apr 2026 — strong results as a relay: moq-dev-js ↔ moqx 6/6, moq-rs-draft-16 ↔ moqx 5–6/6, moq-rs ↔ moqx all pass.
- **moxygen relay endpoint** at `fb.mvfst.net:9448` on versions 14/16/18 — the first publicly-announced draft-18 relay endpoint (brought up June 9); see [[interop-endpoints]].
- **First cross-impl draft-18 interop attempt**: mondain/moqxr ↔ [[imquic]] (May 19–20) surfaced a bidi-vs-uni SETUP-stream divergence, fixed within ~10 hours.

# Related

- [[moxygen]] - Meta's original relay that openmoq/moxygen forks
- [[interop-runner]] - Interop testing (moq-relay-test is a related tool)
- [[will-law]] - Akamai, charter member
- [[suhas-nandakumar]] - Cisco, charter member
