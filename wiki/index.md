---
title: MOQ Wiki Index
tags: [index, navigation]
date: 2026-04-14
last_updated: 2026-07-09
status: current
updated: 2026-07-09
---

A living knowledge base tracking the **Media over QUIC** protocol ecosystem.
Updated daily by an LLM from Slack, GitHub, IETF mailing list, and datatracker.

> **Suggest content or corrections**: [File an issue](https://github.com/tobbee/moq-llm-wiki/issues/new) on the wiki repo to request coverage of a topic, implementation, or discussion, or to report corrections. It will be picked up by the next automated update.

# IETF Drafts

| Draft | Version | Status | Summary |
|-------|---------|--------|---------|
| [[moq-transport]] | draft-19 | Active (**-19 2026-07-06**) | Core publish/subscribe transport protocol over QUIC/WebTransport (Range Filters + clarifications; contested design PRs defer) |
| [[moq-msf]] | draft-01 | Active | MOQT Streaming Format - media delivery over MOQT (-01 published 2026-06-02) |
| [[moq-loc]] | draft-03 | Active (**-03 2026-07-06**) | Low Overhead Media Container for interactive streaming (adds audio config) |
| [[moq-secure-objects]] | draft-01 | Active (**-01 2026-07-06**) | End-to-end authenticated encryption for MOQT objects (adds test vectors) |
| [[moq-privacy-pass]] | draft-03 | Active (**-03 2026-07-06**) | Privacy-preserving authentication via Privacy Pass tokens (major MoQT-integration rebuild) |
| [[moq-c4m]] | draft-01 | Active (**-01 2026-06-18**) | Authorization via CTA WAVE Common Access Tokens (CAT/CWT) — scoped bearer-token auth for MOQT |
| [[moq-cmsf]] | draft-01 | Active | CMAF-compliant extension of MSF (-01 published 2026-06-03) |
| [[moq-moqpack]] | draft-00 | Individual | QPACK compression for MOQT control messages |
| [[moq-media-interop]] | draft-03 | Individual (expires **Apr 23**) | Media wire format over LOC for H.264/Opus/AAC |
| [[moq-lite]] | draft-05 | Individual (**-05 2026-06-30**) | Simplified transport protocol by Luke Curley |
| [[moq-timestamp]] | draft-00 | Individual (**NEW 2026-06-12**) | MoQ Object Timestamp Extension — Timescale/Timestamp/Duration for age-based relay decisions ([[luke-curley\|Luke Curley]]) |
| [[moq-nmsf]] | draft-01 | Individual | Neural Video Codec Packaging for MSF |
| [[moq-msfts]] | draft-00 | Individual | MPEG-2 Transport Stream Packaging for MSF (`m2ts`) |
| [[moq-locmaf]] | draft-01 | Individual (**-01 2026-07-05**) | Low Overhead CMAF for Media over QUIC — [[tobbe-einarsson|Torbjörn Einarsson]] + Hugo Björs; major rewrite (canonical, no IANA), [Eyevinn/locmaf](https://github.com/Eyevinn/locmaf) ref impl |
| [[moq-live-agent-interaction]] | draft-01 | Individual (**-01 2026-07-03**) | Live Agent Interaction over MoQ — real-time AI-agent/voice profile (turns→Groups, tokens→Objects); Yanmei Liu + Dapeng Liu (Alibaba) |
| [[moq-mocha]] | draft-00 (×6) | Individual (**NEW 2026-07-06**) | MOCHA — "MoQ Open Communication & Hosting Architecture": a 6-part RTC suite (chat, meetings, identity, MLS keying, reactions, address book) over MoQT; Cullen Jennings + Suhas Nandakumar (Cisco) |
| [[moq-tempo]] | draft-00 | Individual (**NEW 2026-07-06**) | TEMPO — synchronized media playout orchestration (publisher/relay timestamps + PlaySyncServer feedback); Suhas Nandakumar + Cullen Jennings (Cisco) |
| [[moq-overview]] | draft-00 | Individual (**NEW 2026-06-30**) | Media over QUIC Overview — Informational suite survey; co-chair Magnus Westerlund (Ericsson) + Zaheduzzaman Sarker (Nokia) |
| [[compressed-mp4]] | draft-00 | Individual | Varint compression scheme for ISO BMFF / fMP4 (96 → ~21 bytes per fragment) |

For a complete list of all 24+ related individual Internet-Drafts, see the [IETF Datatracker MOQ documents page](https://datatracker.ietf.org/group/moq/documents/). Notable individual drafts not yet covered in the wiki include: draft-duke-moq-subscribe-rewind-02 (Rewind subscription filter), draft-pardue-moq-qlog-moq-events-06 (qlog event definitions), draft-lcurley-moq-hang-01 (Hang media layer), draft-englishm-moq-cdn-provisioning-00 (CDN provisioning), and draft-englishm-moq-relay-dos-01 (relay DoS considerations, **-01 2026-07-06**).

# Protocol Concepts

- [[publish-subscribe]] - Core pub/sub model and message flow
- [[relays]] - Relay architecture and CDN integration
- [[subgroups-and-objects]] - Data model: tracks, groups, subgroups, objects (+ wire-format diff 14/16/17)
- [[streams-and-framing]] - Stream classes and code points across drafts 14/16/17
- [[joining-fetch]] - Mechanisms for joining a live stream mid-session
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
- [[moqtail]] - Publisher, subscriber, and relay with LOC + CMSF demos (draft-14)
- [[imquic]] - Meetecho's C library, also supports RoQ (draft-16/17)
- [[quiche-moq]] - Google's C++ MoQT in Chromium's QUICHE library (draft-16)
- [[shaka-player]] - Google's media player with experimental MSF/CMSF support incl. DRM (draft-14)
- [[openmoq]] - Industry consortium (Akamai, Cisco, RED5, YouTube, etc.) with moxygen fork and relay testing
- [[moqintosh]] - Pure-Swift iOS client by gazzy / Toshiro Igarashi (draft-14, client-only)
- **Moqtopus** - C++/MsQuic client for Unreal Engine by Kota Yatagai ([kota-yata/Moqtopus](https://github.com/kota-yata/Moqtopus), announced June 4 2026; targeting draft-18 for the London interop)

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
- [[martin-duke]] - Google, rewind proposal, quiche-moq developer
- [[tobbe-einarsson|Torbjörn Einarsson]] - Eyevinn, co-author of LOCMAF, author of moqlivemock/warp-player, wiki maintainer

# Active Discussions

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
- [[interop-status]] - Current interop testing status across implementations
- [[interop-endpoints]] - Public relay endpoints for testing

# Community Resources

- **[IETF Datatracker — MOQ WG](https://datatracker.ietf.org/group/moq/documents/)** — Canonical list of all WG and related individual drafts
- **[MoQ Monthly](https://buttondown.com/moqmonthly)** — Periodic newsletter summarizing MoQ ecosystem activity, by Mike English
- **[Demuxed MoQ Talks](https://www.youtube.com/playlist?list=PLiF9acz7G1ppuCCYHjke1p-GSpWNJOdOl)** — Curated playlist of MoQ-related conference talks
- **[Montevideo Tech Summer Camp](https://montevideotech.dev/summer-camp-2026-moq-project/)** — Annual open-source collaboration event with MoQ projects ([2025](https://montevideotech.dev/summercamp2025/), [2026](https://montevideotech.dev/summer-camp-2026-moq-project/))
- **[moq.dev Discord](https://discord.gg/FCYF3p99mr)** — Community chat for MoQ developers, run by Luke Curley
- **[Mailing List Archive](https://mailarchive.ietf.org/arch/browse/moq/)** — moq@ietf.org IETF mailing list
- **[Slack #moq](https://quicdev.slack.com/)** — Primary developer chat in quicdev workspace
