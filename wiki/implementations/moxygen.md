---
title: "Moxygen (Meta)"
tags: [implementation, cpp, meta]
date: 2026-04-10
last_updated: 2026-06-10
status: current
---

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
