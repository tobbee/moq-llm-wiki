---
title: "Implementations Overview"
tags: [implementation, overview, comparison]
date: 2026-07-09
last_updated: 2026-08-22
status: current
---

At-a-glance comparison of the open-source MoQ implementations the wiki tracks. Each row links to its detail page; live cross-implementation results are in [[interop-runner]]. Draft versions and roles change often — the per-implementation pages are authoritative, and the day-by-day history lives in [[log|the wiki log]].

**Roles**: **Pub** = publishes media · **Sub** = subscribes / consumes · **Relay** = relay / server · **Player** = playback UI (browser or native).

# Comparison

| Implementation | Language | Org / Maintainer | Draft(s) | Roles | Focus / notable |
|---|---|---|---|---|---|
| [[moq-dev]] | Rust + TS | [[luke-curley\|Luke Curley]] | moq-lite + IETF 14–19 ¹ | Pub · Sub · Relay · Player | moq-lite + Hang; media gateways (RTMP/SRT/WebRTC/HLS/TS); native HW codecs |
| [[moq-rs]] | Rust | Cloudflare | 14 (prod) · 16 · 18 | Pub · Sub · Relay | Strict IETF WG compliance; very active |
| [[moq-js]] | JS / TS | video-dev | 14 | Pub · Sub · Player | Browser client over WebTransport; `<video-moq>` component; needs a relay |
| [[moxygen]] | C++ (mvfst) | Meta | 14 · 16 (neg. 15) | Pub · Sub · Relay | Reference relay; [[qmux]]; [[openmoq\|OpenMOQ]] fork |
| [[libquicr]] | C++ + Go | Cisco (QuicR) | 16 (runner: 14) | Pub · Sub · Relay | Go bindings; `moq-web` client (18); new session-callback API + logger abstraction Aug 2026; see also [[laps\|LAPS]] |
| [[aiomoqt]] | Python (asyncio) | [[giovanni-marzot\|Giovanni Marzot]] | 14 · 16 · 18 | Pub · Sub · Relay | aioquic-based; **18/18** vs moqx/moxygen/moq-rs-draft-18 on the Aug-22 cut |
| [[xquic-moq]] | C (XQUIC) | Alibaba | 14 | Relay | Merged into the interop matrix |
| [[moqlivemock]] | Go + TS | Eyevinn | 14 · 16 | Pub · Sub · Player | CMSF/LOC/MSF/LOCMAF; DRM; `mlmtest` interop tool |
| [[moqtail]] | Rust + TS | [[zafer-gurel\|Z. Gürel]] / [[ali-begen\|A. C. Begen]] | 16 · 18 | Pub · Sub · Relay · Player | LOC + CMSF demos; `relay18.moqtail.dev` live since Jul 23; `moqt://` URI scheme |
| [[imquic]] | C | Meetecho ([[lorenzo-miniero]]) | 16 · 17 · 18 · 19 | Pub · Sub · Relay | draft-19 merged to `main` Jul 19; also RTP-over-QUIC (RoQ); Janus ecosystem |
| [[quiche-moq]] | C++ | Google (QUICHE / Chromium) | 16 · 18 (on `main`) | Pub · Sub · Relay | 41/41 conformance; relay/server/chat/simulator tools; object-ACK work Aug 2026 |
| [[shaka-player]] | JS | Google | 14 (experimental) | Sub · Player | MSF/CMSF playback; player-only |
| [[moqintosh]] | Swift | T. Igarashi (t-gazzy) | 14 | Sub (client-only) | First pure-Swift / Apple-native client |
| [[openmoq]] | C++ (moxygen fork) | Consortium (Akamai, Cisco, RED5, YouTube…) | 14/16 floor · 18 (moqx) | Relay | Consortium; `moqx` server; CAT-token auth; relay testing |
| **Moqtopus** (no page yet) | C++ / MsQuic | [[kota-yatagai\|Kota Yatagai]] | 18 | Client | Unreal Engine client ([kota-yata/Moqtopus](https://github.com/kota-yata/Moqtopus)); at-target in the runner |
| [[mediamtx\|MediaMTX]] | Go | bluenviron | **16 · 17 · 18 · 19** | Pub · Sub | Multi-protocol production media server; **widest draft range tracked**; MSF + LOC; not in the runner |
| [[moq-go]] | Go | V. Strukchinsky (floatdrop) | **19** | Pub · Sub · Relay | Session library + reference relay; the runner's only **ahead-of-target** endpoint |
| [[moqtransport]] | Go | [[mathis-engelbart\|M. Engelbart]] (+ Eyevinn fork) | 11–13 | Pub · Sub | The principal Go MoQT library; behind the ecosystem on drafts |
| [[laps\|LAPS]] | C++ | Cisco (QuicR) | via [[libquicr]] | Relay | Relay-**mesh** with Edge/Via/Stub roles; public "MOQT Developer Playground" endpoint |
| [[warp-player]] | TS | Eyevinn | — | Sub · Player | CMSF playback via MSE; companion to [[moqlivemock]] |
| **MOQ5** (see [[openmoq]]) | C | Red5 Pro | 16 · 18 | Client | Sans-I/O zero-dependency protocol core; simulation-tested; interop-registered |
| **Playa** (see [[openmoq]]) | TS | Red5 Pro | — | Sub · Player | `@moqt/*` + `@playa/player` v0.5.7; WebCodecs with MSE/CMAF fallback |

¹ [[moq-dev]] implements Luke Curley's own [[moq-lite]] protocol plus IETF adapter shims (draft-14 through draft-19); it was the first open-source implementation to ship draft-18.

# Media & packaging support

For the media-oriented implementations:

- **[[moqlivemock]]**: [[moq-cmsf|CMSF]], [[moq-loc|LOC]], [[moq-msf|MSF]], [[moq-media-interop|moq-mi]], [[moq-locmaf|LOCMAF]]; H.264/HEVC, AAC/Opus/AC-3, WebVTT/TTML subtitles; DRM (Widevine, PlayReady, FairPlay, ClearKey)
- **[[moq-dev]]**: Hang media layer; H.264/H.265 (native hardware encode + decode), Opus/AAC/FLAC/MP3; CMSF; [[moq-msf|MSF]]-01; RTMP/SRT/WebRTC/HLS/MPEG-TS gateways
- **[[moqtail]]**: [[moq-loc|LOC]] + [[moq-cmsf|CMSF]] demos (real-time / live / on-demand)
- **[[shaka-player]]**: [[moq-msf|MSF]] draft-0, [[moq-cmsf|CMSF]] draft-0 (experimental)
- **[[imquic]]**: RTP-over-QUIC (RoQ) alongside MoQT

# Related

- [[interop-runner]] — live cross-implementation test matrix
- [[interop-status]] — interop summary
- [[interop-endpoints]] — public relay/endpoint listing

# Not yet tracked with a page

Implementations and tools that exist and are active, but do not yet have a wiki page. Listed so the gap is visible rather than invisible:

- **`shiguredo/moqt-js`** — TypeScript browser MOQT client (draft-19, LOC-04, MSF-01) from Shiguredo, the vendor behind the Sora WebRTC SFU. Interop-tested only against their own non-public relay.
- **`qumo-dev/gomoqt`** — pure-Go [[moq-lite]] implementation (~45★), the second-largest moq-lite implementation after [[moq-dev]] itself; companion `qumo-dev/qumo` relay.
- **`kt81/Spangle.Net.Moqt`** — the only **.NET/C#** MOQT implementation found; draft-18, verified against [[moxygen]] over raw QUIC.
- **`eisenzopf/rvoip`** — Rust VoIP stack with a draft-19 MoQT relay crate; vendors/forks [[moq-dev]] crates.
- **`moqtap/*`** — MoQ **debugging/observability** toolchain: intercepting proxy, `.moqtrace` format, and language-agnostic cross-implementation JSON **test vectors**. Draft coverage stops at 17.
- **Elixir**: `membraneframework/membrane_moq_plugin` (official Membrane plugin over moq-dev NIFs) and the independent `dmorn/moqx` + `kim-company/membrane_moqx_plugin`.
- **`shermerL/moq-cast`** — native **Android** screencast publisher; the first Android MoQ app tracked.
- **`streamer45/streamkit`**, **`zsiec/prism`**, **Norsk Video** `@norskvideo/moq-*`, **`@pipecat-ai/moq-transport`** (voice-AI agents), **`pzanella/moq-lab`** (SSAI/CSAI/SGAI ad insertion).
- **`ossrs/srs`** — has **no** MoQ support; tracked only as an open feature request ([issue #4686](https://github.com/ossrs/srs/issues/4686)).

# Name collisions to watch

Three live collisions exist in this ecosystem; the wiki disambiguates them on the relevant pages:

| Name | This wiki tracks | Also exists |
|---|---|---|
| `moq-go` | [[moq-go\|floatdrop/moq-go]] (draft-19, interop-registered) | `dineshadhi/moq-go` (abandoned 2024); `moq-dev/moq-go` (moq-dev's Go FFI mirror) |
| `moqx` | [[openmoq\|openmoq/moqx]] (C++ moxygen fork relay) | `dmorn/moqx` (Elixir subscriber library) |
| `moqtail` | [[moqtail\|moqtail/moqtail]] ([[zafer-gurel\|Gürel]] / [[ali-begen\|Begen]]) | `kota-yata/moqtail` ([[kota-yatagai\|Yatagai]]'s older draft-11 experiment) |
| `quiche` | [[quiche-moq\|google/quiche]] (C++ QUICHE MoQT) | `birneee/quiche_moq` (Rust, on the Cloudflare quiche crate) |
