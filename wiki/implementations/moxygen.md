---
title: "Moxygen (Meta)"
tags: [implementation, cpp, meta]
date: 2026-04-10
last_updated: 2026-07-17
status: current
---

**Language**: C++ (mvfst-based)
**Organization**: Meta
**Maintainer**: [[alan-frindell]], Joseph Beshay
**GitHub**: [facebookexperimental/moxygen](https://github.com/facebookexperimental/moxygen)
**Relay endpoint**: `fb.mvfst.net`

# Overview

Meta's open-source C++ MOQ implementation built on their mvfst QUIC library. Includes relay, client, and protocol library. [[openmoq|OpenMOQ]] maintains a fork ([openmoq/moxygen](https://github.com/openmoq/moxygen)) as a buffer repo for their planned moqx server.

# History

- **2026-03-16**: [[alan-frindell]] achieved 0-RTT subscribe with draft-16 + unidirectional control streams.
- **2026-06-09/10**: draft-18 relay live at the London hackathon — afrind brought the relay up at `fb.mvfst.net:9448` (QUIC + WebTransport) supporting **versions 14/16/18**, the first publicly-announced draft-18 relay endpoint. Known gaps at launch: no REDIRECT errors, no GOAWAY-on-request-stream, no PUBLISH_BLOCKED. afrind also shipped a draft-18 wire decoder (`moqx/tools/moq_decode.py`, [openmoq/moqx PR #398](https://github.com/openmoq/moqx/pull/398)) to help debug interop failures.

# Draft Support

- Draft 14 and 16 supported
- Can negotiate draft 15
- [[qmux]] support on port 9449

# Public Infrastructure

- **QUIC relay**: `moqt://fb.mvfst.net:9448` / `https://fb.mvfst.net:9448/moq-relay`
- **QMux relay**: `fb.mvfst.net:9449` (TLS/TCP and QUIC)
- **WebSocket proxy**: `wss://fb.mvfst.net:9450` (proxying to TLS on 9449)

# Recent Highlights

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **Meta lands moxygen via an internal-diff (Phabricator) workflow** — changes merge to `main` as direct commits, not GitHub PRs, so most GitHub PRs are mirrors that get closed *unmerged* even when the change actually ships. PR-based activity scans therefore understate real progress.
- **The active relay/stats/TLS development line runs through the [[openmoq|moqx]] fork** rather than the upstream tree — afrind's relay/stats hardening and gmarzot's PKCS#12 TLS work land there. See [[openmoq]].
- **qlog + visualization tooling**: per-connection QLogger wiring (`HQServerTransportFactory::setQLoggerFactory`) and an overhauled MoQ viz tool (NDJSON input, track-alias reconstruction, no CDN dependency).
- **Wire-conformance tightening**: a zero `DELIVERY_TIMEOUT` is now a PROTOCOL_VIOLATION on draft ≤16 (the versions moxygen advertises).
- **draft-18 REQUEST_UPDATE / FORWARD work** (mid-July 2026, direct commits): subscriber-side `request_updates` for **SUBSCRIBE_TRACKS** and **SUBSCRIBE_NAMESPACE**, *Forward* made updatable in REQUEST_UPDATE for SUBSCRIBE_TRACKS, and subgroup-reopen gated on v18 forward resume — the implementation side of the upstream FORWARD-on-REQUEST_UPDATE / INCLUDE_PROPERTIES cluster ([[ian-swett|ianswett]]'s [moq-transport #1813](https://github.com/moq-wg/moq-transport/pull/1813)). Breaks a weeks-long GitHub-visible quiet streak (consistent with the Phabricator-diff workflow above).

# Interop

- Frequently used as the "reference relay" for interop testing; see [[interop-endpoints]] for the full endpoint listing.

# Related

- [[moq-rs]] - Alternative relay implementation
- [[interop-endpoints]] - Full endpoint listing
