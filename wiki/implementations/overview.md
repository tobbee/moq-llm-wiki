---
title: Implementations Overview
tags: [implementation, overview, comparison]
date: 2026-07-09
last_updated: 2026-07-09
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
| [[libquicr]] | C++ + Go | Cisco (QuicR) | 16 | Pub · Sub | Go bindings; `moq-web` client (18); chat/clock examples |
| [[aiomoqt]] | Python (asyncio) | Giovanni Marzot | 14 + 16 (dual) | Pub · Sub | aioquic-based; tested vs 6 relays |
| [[xquic-moq]] | C (XQUIC) | Alibaba | 14 | Relay | Merged into the interop matrix |
| [[moqlivemock]] | Go + TS | Eyevinn | 14 · 16 | Pub · Sub · Player | CMSF/LOC/MSF/LOCMAF; DRM; `mlmtest` interop tool |
| [[moqtail]] | Rust + TS | Z. Gürel / A. C. Begen | 16 | Pub · Sub · Relay · Player | LOC + CMSF demos; WebTransport + raw QUIC; WebRTC-over-MoQ demo |
| [[imquic]] | C | Meetecho | 16 · 17 · 18 · 19 (wip) | Pub · Sub | Also RTP-over-QUIC (RoQ); Janus ecosystem |
| [[quiche-moq]] | C++ | Google (QUICHE / Chromium) | 16 | Pub · Sub · Relay | 41/41 conformance; relay/server/chat/simulator tools |
| [[shaka-player]] | JS | Google | 14 (experimental) | Sub · Player | MSF/CMSF playback; player-only |
| [[moqintosh]] | Swift | T. Igarashi (t-gazzy) | 14 | Sub (client-only) | First pure-Swift / Apple-native client |
| [[openmoq]] | C++ (moxygen fork) | Consortium (Akamai, Cisco, RED5, YouTube…) | 14/16 floor · 18 (moqx) | Relay | Consortium; `moqx` server; CAT-token auth; relay testing |
| **Moqtopus** (no page yet) | C++ / MsQuic | Kota Yatagai | 18 (target) | Client | Unreal Engine client ([kota-yata/Moqtopus](https://github.com/kota-yata/Moqtopus)) |

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
