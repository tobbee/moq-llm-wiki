---
title: "Media over QUIC - Lite (moq-lite)"
tags: [draft, transport, individual]
date: 2026-04-13
last_updated: 2026-07-29
status: current
draft_version: "05"
ietf_url: "https://datatracker.ietf.org/doc/draft-lcurley-moq-lite/"
---

**draft-lcurley-moq-lite-05** | Expires 2027-01-01

> **2026-07-01**: **`draft-lcurley-moq-lite-05` is now on the Datatracker (published June 30) — the `-05` revision the wiki flagged "presumably forthcoming" since May 5 finally lands, and [[moq-dev|moq-dev/moq]] ships the matching wire the same 48 hours.** Datatracker bumps **-04 → -05** (2026-06-30, Informational, expires 2027-01-01), catching the published spec up to the **Lite05 / DRAFT_05** wire version that has been in flight in moq-dev's code since [PR #1374](https://github.com/moq-dev/moq/pull/1374) (May 4). On the implementation side, moq-dev landed a **moq-lite-05 wire push** across June 29–July 1: **[PR #1954](https://github.com/moq-dev/moq/pull/1954) MERGED** *"moq-net: moq-lite-05 SETUP message + PATH parameter"* (+828/−116), **[PR #1963](https://github.com/moq-dev/moq/pull/1963) MERGED** *"moq-net: hook up rest of moq-lite-05 wire (TRACK_INFO, SUBSCRIBE_END, frame timestamps)"* (+854/−64), and — a notable design pivot — **[PR #1962](https://github.com/moq-dev/moq/pull/1962) MERGED** *"moq-net: drop per-frame compression, restore Publisher Max Latency to TRACK_INFO"* (+149/−614), walking back the per-frame DEFLATE experiment (the code side of Luke's June-26 [[discussions-2026-06|"MoQ + Compression" thread]]) and restoring the `max_latency` filter to `TRACK_INFO`. So the published draft and the reference implementation are re-converged on the -05 wire. See [[moq-dev]], [[discussions-2026-06]].
>
> **lite-06 wire work has begun in code (2026-07-28)** — still `-05` on the Datatracker (no `-06` submitted). [[moq-dev|moq-dev/moq]] merged [PR #2550](https://github.com/moq-dev/moq/pull/2550) *"drop Exclude Hop from ANNOUNCE_REQUEST in lite-06"* (+189/−98), the first in-code sign of a next moq-lite revision — the same in-code-before-Datatracker pattern the -05 wire followed. Watch the Datatracker for a `draft-lcurley-moq-lite-06` submission.
>
> **Lite05 origin** (historical): [[luke-curley]] opened [moq-dev/moq PR #1374](https://github.com/moq-dev/moq/pull/1374) on **May 4 2026 22:57 UTC** introducing wire version **Lite05 / DRAFT_05** (ALPN `moq-lite-05`, code `0xff0dad05`). Added an opt-in **DATAGRAMS control stream `0x6`** + QUIC datagram delivery (`subscribe_id | sequence | payload`, 1200B cap), 33ms publisher cache, per-subscriber `max_latency` filter. Spec text lives in the separate `moq-wg/moq-drafts` repo; the Datatracker `-05` (June 30) is the published counterpart.

# Author
- [[luke-curley]] (kixelated@gmail.com)

# Abstract

moq-lite is a simplified protocol designed to fanout live content 1->N across the internet. It uses QUIC to prioritize important content during congestion while avoiding head-of-line blocking and respecting encoding dependencies. Though media-focused, the protocol is payload-agnostic and can be proxied by relays/CDNs without access to decryption keys or codec knowledge.

# Relationship to moq-transport

moq-lite is explicitly derived from [[moq-transport]]. The author states: "This draft is based on MoqTransport. The concepts, motivations, and terminology are very similar."

The key difference is design philosophy — moq-lite removes complexity by eliminating what it characterizes as "too many messages, optional modes, and half-baked features" in the full standard.

# Key Simplifications (vs moq-transport)

- **Stream-based architecture** replaces request IDs
- **Pull-only model** — no unsolicited publishing
- **Simplified FETCH** — operates as single request/response (unlike moq-transport's multi-group approach)
- **Extension negotiation** via stream probing rather than parameters
- **Removed features**: subgroups, object properties, datagrams, paused subscriptions, 30+ message types
- **UTF-8 strings** replace byte arrays for names
- **Default subscriptions** start at latest group automatically

# Data Model

Hierarchical structure similar to [[moq-transport]] but simplified:
- **Sessions** — connections between client and server
- **Broadcasts** — collections of content from a single source
- **Tracks** — series of independent content groupings
- **Groups** — ordered sequences within tracks
- **Frames** — individual data units

# Implementation

Luke Curley implements moq-lite in [[moq-dev]] (moq-dev/moq), with IETF adapter shims enabling interop with IETF-aligned implementations (draft-14 through draft-17).

# Version History

| Version | Date | Notes |
|---------|------|-------|
| draft-04 | 2026-04-09 | Current |
| draft-03 | 2026-03-10 | — |
| draft-02 | 2026-01-13 | — |
| draft-01 | 2025-10-20 | — |
| draft-00 | 2025-07-07 | Initial submission |

# Status

Individual submission — not adopted by the MOQ working group. This draft represents Luke Curley's alternative vision for the MOQ protocol, focusing on simplicity over the full feature set of [[moq-transport]].

# External Links
- [Datatracker](https://datatracker.ietf.org/doc/draft-lcurley-moq-lite/)
- [moq-dev/moq implementation](https://github.com/moq-dev/moq)
- [Documentation](https://doc.moq.dev/)

# Related
- [[moq-transport]] — The IETF WG standard that moq-lite simplifies
- [[moq-dev]] — Implementation of moq-lite
- [[luke-curley]] — Author
