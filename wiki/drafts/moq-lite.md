---
title: "Media over QUIC - Lite (moq-lite)"
tags: [draft, transport, individual]
date: 2026-04-13
last_updated: 2026-04-14
status: current
draft_version: "04"
ietf_url: "https://datatracker.ietf.org/doc/draft-lcurley-moq-lite/"
---

**draft-lcurley-moq-lite-04** | 23 pages | Expires 2026-10-11

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
