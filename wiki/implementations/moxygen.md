---
title: "Moxygen (Meta)"
tags: [implementation, cpp, meta]
date: 2026-04-10
last_updated: 2026-09-27
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

- **The conformance matrix reaches ten sections — and everyone fails Section 10** (Sep-25, 2026) — [[alan-frindell|afrind]]'s `moq-test` harness now runs **10 sections**, adding *9. FETCH Ranges* and *10. Joining FETCH* to the eight used at the Sep-2 hackathon. The Sep-25 sweep: **moxygen itself 75/76 (QUIC) and 74/76 (WT)**, [[openmoq|moqx]] 68/76 and 70/76, [[yu-you|Nokia]] `moqt-nr` 41/76 and 52/76, [[moq-rs]] 51/76 (WT only), [[imquic]] 25/76, and **[[moq-dev]], [[moqtail]] and `stitcher-moq` all failing the smoke test outright** ("no subscribe"). **Section 10 fails for every implementation including afrind's own two relays** — *"I think the tool has some pending fixes."* Two durable facts came out of the thread with [[luke-curley|Luke Curley]]: the results are **not published anywhere automatically** (you fetch a prebuilt moxygen tree from OpenMOQ and run it yourself), and the suite **refuses to run at all** unless one object arrives with every bit correct — *"if you can't get one object through … it refuses to run the whole suite"* — which is why moq-dev, lacking wire-level publisher priority, scores no partial credit.
- **mlog gains probabilistic session sampling** (Sep-25, 2026) — a **`SamplingMLoggerFactory`** ([#238](https://github.com/facebookexperimental/moxygen/pull/238)) lets a deployment log a fraction of sessions rather than all or none, and a companion change **stops MLog retaining object payload bodies** — the two together make mlog viable to leave on in production.
- **Conformance harness for the Sep-2 draft-18 hackathon**: moxygen's `moq-test` conformance script is the de-facto draft-18 relay-conformance harness for the ecosystem — [[alan-frindell|afrind]] runs it against every live relay registered in the [[interop-runner]] and posts the per-section pass matrix to Slack `#moq`. By Sep-1 it covered **10 sections**, having gained **Section 9 (FETCH Ranges) and Section 10 (Joining FETCH)** ("new as of Monday"). At the Sep-2 hackathon it drove rapid fixes in [[moqtail]] (4/17 → 53/59) and [[moq-rs]] (Sections 1–7); moxygen's own relay scored **74/76 quic · 75/76 WT** — after afrind candidly reported it first **failed its own suite over a real cross-country network** (58/76 quic, 69/76 WT: *"How embarrassing"*), exposing network-timing bugs in the harness that local runs hid. The conformance tests are being folded into the runner itself ([runner #103](https://github.com/englishm/moq-interop-runner/pull/103), OPEN).
- **Transparent MoQ proxy at the edge (2026-09-01)**: a new **`MoQProxyHandler`** ([`eed28e56`](https://github.com/facebookexperimental/moxygen/commit/eed28e56)) plus MoQ-proxy lifecycle management ([`94b0e93c`](https://github.com/facebookexperimental/moxygen/commit/94b0e93c)) — a transparent MoQ proxy component — alongside an OSS-buildability push (exported/BB runtime libraries, OSS tests + CI coverage).
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
