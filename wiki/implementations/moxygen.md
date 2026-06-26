---
title: "Moxygen (Meta)"
tags: [implementation, cpp, meta]
date: 2026-04-10
last_updated: 2026-06-26
status: current
---

> **2026-06-26**: **Three of the June-24/25 upstream PRs close *unmerged* — the wake-up partly retracts.** **[PR #196](https://github.com/facebookexperimental/moxygen/pull/196)** (Subscriber requestID from PUBLISH_OK), **[PR #197](https://github.com/facebookexperimental/moxygen/pull/197)** (mock `fetch()` on MockMoQSession), and **[PR #192](https://github.com/facebookexperimental/moxygen/pull/192)** (request session in handleTrackStatus) are all **CLOSED without merge** June 24–25 — consistent with Meta's internal-diff (Phabricator) workflow, where the canonical landing happens internally and the GitHub PR mirror is closed rather than merged. **Still OPEN**: **[#193](https://github.com/facebookexperimental/moxygen/pull/193)** (draft<18 SUBSCRIBE_NAMESPACE fallback), **[#194](https://github.com/facebookexperimental/moxygen/pull/194)** (server-initiated PUBLISH via SUBSCRIBE_TRACKS), **[#195](https://github.com/facebookexperimental/moxygen/pull/195)** (graceful SIGINT/SIGTERM shutdown). See [[openmoq]], [[discussions-2026-06]].
>
> **2026-06-25**: **The upstream repo wakes up — four new OPEN PRs land on `facebookexperimental/moxygen` itself (June 24–25), after weeks where the active moxygen work was happening on the [[openmoq|openmoq/moqx]] fork.** All on the draft-18 PUBLISH / SUBSCRIBE_TRACKS surface: **[PR #194](https://github.com/facebookexperimental/moxygen/pull/194)** *"moqtest: support server-initiated PUBLISH via SUBSCRIBE_TRACKS"* (+430/−21) — exercises the draft-18 server-initiated PUBLISH path; **[PR #195](https://github.com/facebookexperimental/moxygen/pull/195)** *"moqtest: graceful SIGINT/SIGTERM shutdown for client and server"* (+551/−42); **[PR #196](https://github.com/facebookexperimental/moxygen/pull/196)** *"MoQForwarder: set Subscriber requestID from PUBLISH_OK"* (+3/−0); **[PR #193](https://github.com/facebookexperimental/moxygen/pull/193)** *"MoQRelaySession: fall back to SUBSCRIBE_NAMESPACE on draft < 18"* (+54/−4) — version-negotiation fallback so the relay handles pre-18 peers. This is the same message-shape work the fork has been doing surfacing on the upstream tree. See [[openmoq]], [[discussions-2026-06]].
>
> **2026-06-10**: **moxygen relay live on draft-18 at the London hackathon.** [[alan-frindell|afrind]] brought the relay up at `fb.mvfst.net:9448` (QUIC + WebTransport) supporting **versions 14/16/18** on June 9 — the first publicly-announced draft-18 relay endpoint. Known gaps: no REDIRECT errors, no GOAWAY-on-request-stream, no PUBLISH_BLOCKED. afrind also shipped a draft-18 wire decoder (`moqx/tools/moq_decode.py`, [openmoq/moqx PR #398](https://github.com/openmoq/moqx/pull/398)) to help debug interop failures. See [[interop-endpoints]], [[discussions-2026-06]], [[openmoq]].

**Language**: C++ (mvfst-based)
**Organization**: Meta
**Maintainer**: [[alan-frindell]], Joseph Beshay
**GitHub**: [facebookexperimental/moxygen](https://github.com/facebookexperimental/moxygen)
**Relay endpoint**: `fb.mvfst.net`

# Overview

Meta's open-source C++ MOQ implementation built on their mvfst QUIC library. Includes relay, client, and protocol library. [[openmoq|OpenMOQ]] maintains a fork ([openmoq/moxygen](https://github.com/openmoq/moxygen)) as a buffer repo for their planned moqx server.

# Draft Support

- Draft 14 and 16 supported
- Can negotiate draft 15
- [[qmux]] support on port 9449

# Public Infrastructure

- **QUIC relay**: `moqt://fb.mvfst.net:9448` / `https://fb.mvfst.net:9448/moq-relay`
- **QMux relay**: `fb.mvfst.net:9449` (TLS/TCP and QUIC)
- **WebSocket proxy**: `wss://fb.mvfst.net:9450` (proxying to TLS on 9449)

# Notable

- [[alan-frindell]] achieved 0-RTT subscribe with draft-16 + unidirectional control streams (2026-03-16)
- Frequently used as the "reference relay" for interop testing

# Related

- [[moq-rs]] - Alternative relay implementation
- [[interop-endpoints]] - Full endpoint listing
