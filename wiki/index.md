---
title: MOQ Wiki Index
tags: [index, navigation]
date: 2026-04-14
last_updated: 2026-05-28
status: current
updated: 2026-05-28
---

A living knowledge base tracking the **Media over QUIC** protocol ecosystem.
Updated daily by an LLM from Slack, GitHub, IETF mailing list, and datatracker.

> **Suggest content or corrections**: [File an issue](https://github.com/tobbee/moq-llm-wiki/issues/new) on the wiki repo to request coverage of a topic, implementation, or discussion, or to report corrections. It will be picked up by the next automated update.

# IETF Drafts

| Draft | Version | Status | Summary |
|-------|---------|--------|---------|
| [[moq-transport]] | draft-18 | Active | Core publish/subscribe transport protocol over QUIC/WebTransport (published 2026-05-12) |
| [[moq-msf]] | draft-00 | Active | MOQT Streaming Format - media delivery over MOQT |
| [[moq-loc]] | draft-02 | Active | Low Overhead Media Container for interactive streaming |
| [[moq-secure-objects]] | draft-00 | Active | End-to-end authenticated encryption for MOQT objects |
| [[moq-privacy-pass]] | draft-02 | Active | Privacy-preserving authentication via Privacy Pass tokens |
| [[moq-cmsf]] | draft-00 | Active | CMAF-compliant extension of MSF |
| [[moq-moqpack]] | draft-00 | Individual | QPACK compression for MOQT control messages |
| [[moq-media-interop]] | draft-03 | Individual (expires **Apr 23**) | Media wire format over LOC for H.264/Opus/AAC |
| [[moq-lite]] | draft-04 | Individual | Simplified transport protocol by Luke Curley |
| [[moq-nmsf]] | draft-01 | Individual | Neural Video Codec Packaging for MSF |
| [[moq-msfts]] | draft-00 | Individual | MPEG-2 Transport Stream Packaging for MSF (`m2ts`) |
| [[compressed-mp4]] | draft-00 | Individual | Varint compression scheme for ISO BMFF / fMP4 (96 → ~21 bytes per fragment) |

For a complete list of all 24+ related individual Internet-Drafts, see the [IETF Datatracker MOQ documents page](https://datatracker.ietf.org/group/moq/documents/). Notable individual drafts not yet covered in the wiki include: draft-duke-moq-subscribe-rewind-02 (Rewind subscription filter), draft-pardue-moq-qlog-moq-events-06 (qlog event definitions), draft-lcurley-moq-hang-01 (Hang media layer), draft-englishm-moq-cdn-provisioning-00 (CDN provisioning), and draft-englishm-moq-relay-dos-00 (relay DoS considerations).

# Protocol Concepts

- [[publish-subscribe]] - Core pub/sub model and message flow
- [[relays]] - Relay architecture and CDN integration
- [[subgroups-and-objects]] - Data model: tracks, groups, subgroups, objects (+ wire-format diff 14/16/17)
- [[streams-and-framing]] - Stream classes and code points across drafts 14/16/17
- [[joining-fetch]] - Mechanisms for joining a live stream mid-session
- [[qmux]] - QUIC multiplexing over TCP for fallback transport
- [[track-properties]] - Object and track metadata system (Extensions → Properties rename)

# Design Debates

- [[switch-abr]] - SWITCH message for client-side ABR (most debated open issue)
- [[joining-fetch-dissent]] - Competing proposals for joining live streams
- [[open-issues-analysis]] - Full evaluation of all open issues (April 2026)

# Media & Streaming

- [[media-packaging]] - LOC vs CMAF container approaches
- [[adaptive-bitrate]] - ABR switching in MOQ
- [[catalog-format]] - Track catalog and delta updates

# Implementations

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

## Draft Version Support Summary

| Implementation | Language | Draft Version(s) | GitHub |
|----------------|----------|-------------------|--------|
| [[moq-dev]] | Rust + TS | moq-lite + IETF shims (14-17) | [moq-dev/moq](https://github.com/moq-dev/moq) |
| [[moq-rs]] | Rust | 14 (main), 07 (prod) | [cloudflare/moq-rs](https://github.com/cloudflare/moq-rs) |
| [[moq-js]] | TypeScript | 14 | [video-dev/moq-js](https://github.com/video-dev/moq-js) |
| [[moxygen]] | C++ | 14, 15, 16 | [facebookexperimental/moxygen](https://github.com/facebookexperimental/moxygen) |
| [[libquicr]] / quicr-go | C++ / Go | 16 | [quicr/libquicr](https://github.com/quicr/libquicr), [Quicr/quicr-go](https://github.com/Quicr/quicr-go) |
| [[aiomoqt]] | Python | 14 + 16 (dual) | [gmarzot/aiomoqt](https://github.com/gmarzot/aiomoqt) |
| [[moqlivemock]] | Go / JS | 14, 16 | [Eyevinn/moqtransport](https://github.com/Eyevinn/moqtransport), [Eyevinn/moqlivemock](https://github.com/Eyevinn/moqlivemock), [Eyevinn/warp-player](https://github.com/Eyevinn/warp-player), [demo](https://moqlivemock.demo.osaas.io/) |
| [[moqtail]] | Rust/TS | 14 | [moqtail/moqtail](https://github.com/moqtail/moqtail) |
| [[imquic]] | C | 16, 17 | [meetecho/imquic](https://github.com/meetecho/imquic) |
| [[quiche-moq]] | C++ | 16 | [google/quiche](https://github.com/google/quiche/tree/main/quiche/quic/moqt) |
| [[shaka-player]] | JavaScript | 14 (experimental) | [shaka-project/shaka-player](https://github.com/shaka-project/shaka-player) |
| [[xquic-moq]] | C | 14 | Alibaba (see [[interop-runner]]) |
| [[moqintosh]] | Swift (iOS) | 14 | [t-gazzy/Moqintosh](https://github.com/t-gazzy/Moqintosh) |

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

# Active Discussions

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
