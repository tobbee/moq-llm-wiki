---
title: MOQ Wiki Index
tags: [index, navigation]
date: 2026-04-10
status: current
---

# MOQ Wiki Index

A living knowledge base tracking the **Media over QUIC** protocol ecosystem.

## IETF Drafts

| Draft | Version | Status | Summary |
|-------|---------|--------|---------|
| [[moq-transport]] | draft-17 | Active | Core publish/subscribe transport protocol over QUIC/WebTransport |
| [[moq-msf]] | draft-00 | Active | MOQT Streaming Format - media delivery over MOQT |
| [[moq-loc]] | draft-02 | Active | Low Overhead Media Container for interactive streaming |
| [[moq-secure-objects]] | draft-00 | Active | End-to-end authenticated encryption for MOQT objects |
| [[moq-privacy-pass]] | draft-02 | Active | Privacy-preserving authentication via Privacy Pass tokens |
| [[moq-cmsf]] | draft-00 | Active | CMAF-compliant extension of MSF |

## Protocol Concepts

- [[publish-subscribe]] - Core pub/sub model and message flow
- [[relays]] - Relay architecture and CDN integration
- [[subgroups-and-objects]] - Data model: tracks, groups, subgroups, objects
- [[joining-fetch]] - Mechanisms for joining a live stream mid-session
- [[qmux]] - QUIC multiplexing over TCP for fallback transport
- [[track-properties]] - Object and track metadata system

## Design Debates

- [[switch-abr]] - SWITCH message for client-side ABR (most debated open issue)
- [[joining-fetch-dissent]] - Competing proposals for joining live streams
- [[open-issues-analysis]] - Full evaluation of all open issues (April 2026)

## Media & Streaming

- [[media-packaging]] - LOC vs CMAF container approaches
- [[adaptive-bitrate]] - ABR switching in MOQ
- [[catalog-format]] - Track catalog and delta updates

## Implementations

- [[moq-rs]] - Cloudflare's Rust implementation
- [[moxygen]] - Meta's C++ relay (mvfst-based)
- [[moq-js]] - JavaScript/browser implementation
- [[libquicr]] - Cisco's C++ library with Go bindings
- [[aiomoqt]] - Python async implementation
- [[xquic-moq]] - Alibaba's XQUIC-based implementation
- [[eyevinn-moq]] - Eyevinn's Go transport + JS player (draft-14)
- [[moqtail]] - Publisher, subscriber, and relay with LOC + CMSF demos (draft-14)
- [[interop-runner]] - Standardized cross-implementation test framework

## People & Organizations

- [[alan-frindell]] - Meta, editor of moq-transport
- [[suhas-nandakumar]] - Cisco, editor of moq-transport, secure-objects, LOC
- [[luke-curley]] - moq-rs creator, active implementer
- [[will-law]] - Akamai, editor of MSF/CMSF
- [[lorenzo-miniero]] - Meetecho, Janus-based implementation
- [[martin-duke]] - Google, rewind proposal

## Active Discussions

- [[discussions-2026-04]] - April 2026 discussions
- [[discussions-2026-03]] - March 2026 discussions (IETF 125 Shenzhen)
- [[discussions-2026-02]] - February 2026 discussions (Boulder Interim + Hackathon)
- [[discussions-2026-01]] - January 2026 discussions (draft-16 release)

## Meetings

- [[interim-meetings]] - Interim meeting schedule and links to notes/recordings

## Interop

- [[interop-status]] - Current interop testing status across implementations
- [[interop-endpoints]] - Public relay endpoints for testing
