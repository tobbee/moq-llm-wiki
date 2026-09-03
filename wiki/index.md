---
title: "MOQ Wiki Index"
tags: [index, navigation]
date: 2026-04-14
last_updated: 2026-09-03
status: current
updated: 2026-09-02
---

A living knowledge base tracking the **Media over QUIC** protocol ecosystem.
Updated daily by an LLM from Slack, GitHub, IETF mailing list, and datatracker.

> **Suggest content or corrections**: [File an issue](https://github.com/tobbee/moq-llm-wiki/issues/new) on the wiki repo to request coverage of a topic, implementation, or discussion, or to report corrections. It will be picked up by the next automated update.

# IETF Drafts

| Draft | Version | Status | Summary |
|-------|---------|--------|---------|
| [[moq-transport]] | draft-19 | Active | Core publish/subscribe transport protocol over QUIC/WebTransport (-19 published 2026-07-06) |
| [[moq-msf]] | draft-01 | Active | MOQT Streaming Format - media delivery over MOQT (-01 published 2026-06-02) |
| [[moq-loc]] | draft-04 | Active (**-04 2026-07-20**) | Low Overhead Media Container for interactive streaming (adds audio config; -04 fixes the shared IANA registry values) |
| [[moq-secure-objects]] | draft-01 | Active (**-01 2026-07-06**) | End-to-end authenticated encryption for MOQT objects (adds test vectors) |
| [[moq-privacy-pass]] | draft-03 | Active (**-03 2026-07-06**) | Privacy-preserving authentication via Privacy Pass tokens (major MoQT-integration rebuild) |
| [[moq-c4m]] | draft-01 | Active (**-01 2026-06-18**) | Authorization via CTA WAVE Common Access Tokens (CAT/CWT) — scoped bearer-token auth for MOQT |
| [[moq-cmsf]] | draft-01 | Active | CMAF-compliant extension of MSF (-01 published 2026-06-03) |
| [[moq-moqpack]] | draft-00 | Individual | QPACK compression for MOQT control messages |
| [[moq-media-interop]] | draft-03 | Individual — **EXPIRED 2026-04-23**, no -04 | Media wire format over LOC for H.264/Opus/AAC ([[jordi-cenzano\|Jordi Cenzano]]); LOC media interop now relies on what is already implemented |
| [[moq-lite]] | draft-05 | Individual (**-05 2026-06-30**) | Simplified transport protocol by Luke Curley |
| [[moq-cluster]] | draft-00 | Individual (**NEW 2026-08-04**) | MoQ Cluster Extension — relay-mesh Hop-ID path vector + accumulated route cost (loop detection, lowest-cost routing); implemented over moq-transport in moq-dev PR #2629 ([[luke-curley\|Luke Curley]]) |
| [[moq-hang]] | draft-02 | Individual (**-02 2026-08-04**) | Media over QUIC - Hang — real-time conferencing profile on moq-lite (rooms/participants/tracks; intended home for recording/DVR) ([[luke-curley\|Luke Curley]]) |
| [[moq-timestamp]] | draft-01 | Individual (**-01 2026-08-04**) | MoQ Object Timestamp Extension — transport-level Timescale/Timestamp (now framed on the LOC-registered properties) for age-based relay decisions ([[luke-curley\|Luke Curley]]) |
| [[moq-nmsf]] | draft-01 | Individual | Neural Video Codec Packaging for MSF |
| [[moq-msfts]] | draft-00 | Individual | MPEG-2 Transport Stream Packaging for MSF (`m2ts`) |
| [[moq-locmaf]] | draft-01 | Individual (**-01 2026-07-05**) | Low Overhead CMAF for Media over QUIC — [[tobbe-einarsson|Torbjörn Einarsson]] + Hugo Björs; major rewrite (canonical, no IANA), [Eyevinn/locmaf](https://github.com/Eyevinn/locmaf) ref impl |
| [[moq-live-agent-interaction]] | draft-01 | Individual (**-01 2026-07-03**) | Live Agent Interaction over MoQ — real-time AI-agent/voice profile (turns→Groups, tokens→Objects); Yanmei Liu + Dapeng Liu (Alibaba) |
| [[moq-feedback]] | draft-00 | Individual (**NEW 2026-07-31**) | MoQ Feedback — receiver→sender delivery-quality reports via a per-Object "Feedback Track" (Multimodal Feedback/MMF); Yanmei Liu + Minghui Jiang (Alibaba) + Ronghua Wu (Ant Group) |
| [[moq-mocha]] | draft-00 (×6) | Individual (**NEW 2026-07-06**) | MOCHA — "MoQ Open Communication & Hosting Architecture": a 6-part RTC suite (chat, meetings, identity, MLS keying, reactions, address book) over MoQT; Cullen Jennings + Suhas Nandakumar (Cisco) |
| [[moq-tempo]] | draft-00 | Individual (**NEW 2026-07-06**) | TEMPO — synchronized media playout orchestration (publisher/relay timestamps + PlaySyncServer feedback); Suhas Nandakumar + Cullen Jennings (Cisco) |
| [[moq-conditional-filtering]] | draft-00 | Individual (**NEW 2026-08-17**) | Conditional Range Filters for MOQT — `RANGE_FILTER_CONDITION` lets a relay activate/deactivate filter sets autonomously on real-time metrics (no `REQUEST_UPDATE`), plus `PRIOR_SUBGROUP_ID_GAP` to distinguish shedding from loss; [[yu-you\|Yu You]] (Nokia) |
| [[moq-discovery]] | draft-00 | Individual (**NEW 2026-08-14**) | DNS and mDNS Discovery for MOQT — SVCB/HTTPS records for the `moqt` URI scheme, SRV backup, DNS-SD over mDNS for local networks; Cullen Jennings + Suhas Nandakumar (Cisco) |
| [[moq-overview]] | draft-00 | Individual (**NEW 2026-06-30**) | Media over QUIC Overview — Informational suite survey; co-chair Magnus Westerlund (Ericsson) + Zaheduzzaman Sarker (Nokia) |
| [[compressed-mp4]] | draft-00 | Individual | Varint compression scheme for ISO BMFF / fMP4 (96 → ~21 bytes per fragment) |

For a complete list of all 24+ related individual Internet-Drafts, see the [IETF Datatracker MOQ documents page](https://datatracker.ietf.org/group/moq/documents/). Notable individual drafts not yet covered in the wiki include: draft-duke-moq-subscribe-rewind-02 (Rewind subscription filter), draft-pardue-moq-qlog-moq-events-06 (qlog event definitions), draft-englishm-moq-cdn-provisioning-00 (CDN provisioning), draft-englishm-moq-relay-dos-01 (relay DoS considerations, **-01 2026-07-06**), draft-altanai-moq-relay-geocode-01 (geographic location for MoQ relays, **-01 2026-07-24**), and the three [[moq-msf|MSF]] event-timeline spinout drafts by Will Law + Suhas Nandakumar (all **-00 2026-07-06**): draft-wilaw-moq-scte35-event-timeline-00, draft-wilaw-moq-webvtt-msf-00, and draft-law-moq-imsc1-msf-00.

# Protocol Concepts

- [[publish-subscribe]] - Core pub/sub model and message flow
- [[relays]] - Relay architecture and CDN integration
- [[subgroups-and-objects]] - Data model: tracks, groups, subgroups, objects (+ wire-format diff 14/16/17)
- [[streams-and-framing]] - Stream classes and code points across drafts 14/16/17
- [[joining-fetch]] - Joining a live stream mid-session: **fill fetch** and `FILL_PARAMETERS` (shipped draft-20, replacing Joining FETCH)
- [[qmux]] - QUIC multiplexing over TCP for fallback transport
- [[track-properties]] - Object and track metadata system (Extensions → Properties rename)

# Design Debates

- [[switch-abr]] - Client-side ABR switching (resolved June 2026 as the SWITCH_FROM parameter)
- [[joining-fetch-dissent]] - Competing proposals for joining live streams (resolved June 2026: fill fetch + Range Filters)
- [[open-issues-analysis]] - Full evaluation of all open issues (April 2026)

# Media & Streaming

- [[media-packaging]] - LOC vs CMAF container approaches
- [[adaptive-bitrate]] - ABR switching in MOQ
- [[catalog-format]] - Track catalog and delta updates

# Implementations

See **[[overview|Implementations Overview]]** for the full comparison — language, draft versions, roles (Pub/Sub/Relay/Player), and media/feature support.

- [[moq-dev]] - Luke Curley's Rust+TypeScript monorepo (moq-lite + Hang player)
- [[moq-rs]] - Cloudflare's IETF-aligned Rust implementation (cloudflare/moq-rs)
- [[moq-js]] - IETF-aligned JavaScript/browser library (video-dev/moq-js)
- [[moxygen]] - Meta's C++ relay (mvfst-based)
- [[libquicr]] - Cisco's C++ library with Go bindings
- [[aiomoqt]] - Python async implementation
- [[xquic-moq]] - Alibaba's XQUIC-based implementation
- [[moqlivemock]] - Eyevinn's Go transport + JS CMSF player (draft-14/16, DRM)
- [[moqtail]] - Publisher, subscriber, and relay with LOC + CMSF demos ([[zafer-gurel\|Zafer Gürel]]; draft-16 + draft-18, `relay18.moqtail.dev` live since July 23)
- [[imquic]] - Meetecho's C library, also supports RoQ ([[lorenzo-miniero]]; draft-16 through draft-19, -19 merged to `main` July 19)
- [[quiche-moq]] - Google's C++ MoQT in Chromium's QUICHE library (draft-16; draft-18 migration on `main` since July)
- [[shaka-player]] - Google's media player with experimental MSF/CMSF support incl. DRM (draft-14)
- [[openmoq]] - Industry consortium (Akamai, Cisco, RED5, YouTube, etc.) with moxygen fork and relay testing
- [[moqintosh]] - Pure-Swift iOS client by gazzy / Toshiro Igarashi (draft-14, client-only)
- [[mediamtx|MediaMTX]] - Go multi-protocol media server with a native MoQ server; **drafts 16–19**, the widest range in the ecosystem (~19.9k stars, not yet in the interop runner)
- [[moq-go]] - Go session library + relay by Vsevolod Strukchinsky; **draft-19** — the interop runner's only "ahead of target" endpoint
- [[laps|LAPS]] - Cisco's MOQT relay with Edge/Via/Stub relay-mesh peering, on [[libquicr]]
- [[moqtransport]] - The Go MoQ Transport library ([[mathis-engelbart|Mathis Engelbart]]) and Eyevinn's downstream fork
- [[warp-player]] - Eyevinn's TypeScript CMSF player using MSE playback
- **Moqtopus** - C++/MsQuic client for Unreal Engine by [[kota-yatagai|Kota Yatagai]] ([kota-yata/Moqtopus](https://github.com/kota-yata/Moqtopus), announced June 4 2026; draft-18, running at-target in the interop runner)
- **MOQ5** - Red5 Pro's sans-I/O C protocol core (draft-16/18), interop-registered; see [[openmoq]]
- **Playa** - Red5 Pro's TypeScript player suite, npm `@moqt/*` + `@playa/player` v0.5.7; see [[openmoq]]

## Draft Version Support Summary

Moved to the dedicated **[[overview|Implementations Overview]]** page (language, draft versions, roles, and media/feature support in one table).

# People & Organizations

- [[alan-frindell]] - Meta, editor of moq-transport
- [[ian-swett]] - Google, editor of moq-transport
- [[suhas-nandakumar]] - Cisco, author of moq-transport, secure-objects, LOC
- [[victor-vasiliev]] - Google, author of moq-transport, quiche-moq developer
- [[luke-curley]] - moq-rs creator, active implementer
- [[will-law]] - Akamai, editor of MSF/CMSF
- [[mike-english]] - Cloudflare, maintainer of moq-rs/moq-js, interop runner
- [[lorenzo-miniero]] - Meetecho, Janus-based implementation
- [[martin-duke]] - **MOQ WG co-chair**; rewind proposal, quiche-moq developer
- [[magnus-westerlund]] - Ericsson, **MOQ WG co-chair**, co-author of [[moq-overview]]
- [[zaheduzzaman-sarker]] - Nokia, **MOQ WG co-chair**, co-author of [[moq-overview]] and [[moq-conditional-filtering]]
- [[cullen-jennings]] - Cisco, author of [[moq-mocha|MOCHA]], [[moq-discovery]], [[moq-tempo|TEMPO]]
- [[mo-zanaty]] - Cisco, filter design lead (Range/Location/Top Tracks)
- [[yu-you]] - Nokia, relay implementer, corresponding author of [[moq-conditional-filtering]]
- [[ali-begen]] - Networked Media, streaming researcher, [[moqtail]] contributor
- [[mathis-engelbart]] - TUM, author of the Go [[moqtransport]] library
- [[lucas-pardue]] - Cloudflare, author of the MoQ qlog/mlog event definitions
- [[gwendal-simon]] - Synamedia, SWITCH/SSTS co-driver, [[moq-msfts|MSFTS]] author
- [[zafer-gurel]] - Ozyegin/Networked Media, [[moqtail]] maintainer
- [[giovanni-marzot]] - [[openmoq|OpenMOQ]], author of [[aiomoqt]]
- [[jordi-cenzano]] - Meta, moq-encoder-player, [[moq-media-interop]]
- [[mondain|Paul Gregoire (mondain)]] - Red5 Pro / OpenMOQ implementer
- [[kota-yatagai]] - Keio University, author of Moqtopus (Unreal Engine)
- [[steven-riedl]] - Pluto TV/Paramount, SSAI operator perspective on interop
- [[aman-sharma]] - University of Michigan, [[moq-transport]] editor, [[moqtail]] contributor and interop bug-finder
- [[martin-thomson]] - Mozilla, transport/security review
- [[tobbe-einarsson|Torbjörn Einarsson]] - Eyevinn, co-author of LOCMAF, author of moqlivemock/warp-player, wiki maintainer

# Active Discussions

- [[discussions-2026-09]] - September 2026 discussions
- [[discussions-2026-08]] - August 2026 discussions
- [[discussions-2026-07]] - July 2026 discussions
- [[discussions-2026-06]] - June 2026 discussions
- [[discussions-2026-05]] - May 2026 discussions
- [[discussions-2026-04]] - April 2026 discussions
- [[discussions-2026-03]] - March 2026 discussions (IETF 125 Shenzhen)
- [[discussions-2026-02]] - February 2026 discussions (Boulder Interim + Hackathon)
- [[discussions-2026-01]] - January 2026 discussions (draft-16 release)

# Meetings

- [[interim-meetings]] - Interim meeting schedule and links to notes/recordings

# Interop

- [[interop-runner]] - Standardized cross-implementation test framework
- [[interop-status]] - Interop orientation: the target draft, known cross-impl issues, live-vs-automated testing
- [[interop-endpoints]] - Public relay endpoints for testing

# Community Resources

- **[IETF Datatracker — MOQ WG](https://datatracker.ietf.org/group/moq/documents/)** — Canonical list of all WG and related individual drafts
- **[[moq-monthly|MoQ Monthly]]** ([buttondown](https://buttondown.com/moqmonthly)) — Periodic newsletter by [[mike-english|Mike English]]; **dormant since issue #2 (2026-05-31)**
- **[deMOQed 2026](https://moqalliance.org/demoqed-2026/)** — the first dedicated MoQ conference, **Oct 8 2026, 1–8pm at the Alamo Drafthouse, San Francisco** (SF Tech Week); hosted by the **MoQ Alliance** (implementer companies incl. Cloudflare, Mux, OpenMOQ), practical-applications focus, $99 entry (no sponsors). Announced by [[luke-curley|Luke Curley]] Aug-28 ([moq.dev/blog/demoqed](https://moq.dev/blog/demoqed/))
- **[Demuxed MoQ Talks](https://www.youtube.com/playlist?list=PLiF9acz7G1ppuCCYHjke1p-GSpWNJOdOl)** — Curated playlist of MoQ-related conference talks
- **[Montevideo Tech Summer Camp](https://montevideotech.dev/summer-camp-2026-moq-project/)** — Annual open-source collaboration event with MoQ projects ([2025](https://montevideotech.dev/summercamp2025/), [2026](https://montevideotech.dev/summer-camp-2026-moq-project/))
- **[moq.dev Discord](https://discord.gg/FCYF3p99mr)** — Community chat for MoQ developers, run by Luke Curley
- **[Mailing List Archive](https://mailarchive.ietf.org/arch/browse/moq/)** — moq@ietf.org IETF mailing list
- **[Slack #moq](https://quicdev.slack.com/)** — Primary developer chat in quicdev workspace
