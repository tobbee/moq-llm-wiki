---
title: "Moxygen (Meta)"
tags: [implementation, cpp, meta]
date: 2026-04-10
last_updated: 2026-08-22
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

- **Request-stream GOAWAY series (2026-08-21)**: @sandarsh landed a five-commit pass giving GOAWAY proper semantics on *request* streams — context-aware GOAWAY framing, admitting GOAWAY on established SUBSCRIBE/FETCH streams, a `MoQSession::requestStreamGoaway` API (+224/−0), surfacing migration to `TrackConsumer`/`FetchConsumer` (+231/−0), and resetting the stream with `GOING_AWAY` after a timeout. This is the relay-drain/migration path that [[moq-transport]]'s GOAWAY-restriction PR [#1852](https://github.com/moq-wg/moq-transport/pull/1852) is specifying.
- **Interop-client ALPN gap (Aug 2026)**: the moxygen **relay** negotiates draft-18 correctly, but the interop **client** binary's `kInteropAlpns` lacked `moqt-18`, so draft-18-only relays failed the handshake — a configuration defect that showed up as protocol failures in the [[interop-runner]] matrix. Documented in runner [PR #111](https://github.com/englishm/moq-interop-runner/pull/111); fixes tracked in [issue #219](https://github.com/facebookexperimental/moxygen/issues/219) — [[mike-english|englishm]]'s #221 adds `moqt-18`, afrind's #222 landed ALPN derivation, and [[giovanni-marzot|gmarzot]]'s #223 (derive ALPNs, `--versions`, report the negotiated draft) is still OPEN.
- **MoQMediaServer** — a new server + binary with an `MoQMp4Receiver` test client and CMake/OSS build wiring (@sandarsh, Aug 18–19), plus [[alan-frindell|afrind]] fixes: routing SUBSCRIBE past publisher-less namespace nodes, emitting the subgroup **End of Group** bit, and resolving publisher priority from track property extensions.
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
