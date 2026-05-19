---
title: "imquic (Meetecho)"
tags: [implementation, c, meetecho]
date: 2026-04-10
last_updated: 2026-05-19
status: current
---

> **2026-05-19**: **imquic updated to draft-18** ([[lorenzo-miniero]] `#moq` Slack May 18 17:53 UTC): *"I updated my stack to most of the changes there (hopefully the right way). I think I'm missing the ability to REQUEST_UPDATE a SUBSCRIBE_NAMESPACE/TRACKS, but I'll try to do that in the next few days."* **Second open-source implementation to ship draft-18** (after [[moq-dev|moq-dev/moq]] PR #1418 May 18 05:08 UTC). POC relay endpoint at **lminiero.it port 9000** (raw QUIC + WebTransport) is publicly available for interop testing. Repo last-pushed May 18 15:51 UTC.

**Language**: C
**Organization**: Meetecho
**Maintainer**: [[lorenzo-miniero]]
**GitHub**: [meetecho/imquic](https://github.com/meetecho/imquic)
**POC relay**: lminiero.it port 9000 (raw QUIC + WebTransport, draft-18 as of May 18, 2026)

# Overview

A C library for QUIC that includes MOQ Transport support alongside RTP over QUIC (RoQ). Built as part of the Janus WebRTC gateway ecosystem.

# Draft Support

- **draft-18 (since May 18, 2026)** — partial: most of the wire-format changes from the draft-17 → draft-18 changelog; missing `REQUEST_UPDATE` for `SUBSCRIBE_NAMESPACE` / `SUBSCRIBE_TRACKS` (planned for the days following May 18)
- **draft-16 and draft-17** (version range: `0xff000010` to `0xff000011`) — prior supported set
- Supports version negotiation - can offer all supported versions or pin to a specific one
- Previously supported draft-11 through draft-16; draft-14 was dropped when moving to v17
- Not all features of all versions are fully implemented

# Public Infrastructure

- Relay at `lminiero.it:9000` (raw QUIC and WebTransport)

# Interop

- Registered in [[interop-runner]] matrix
- First v17 interop achieved with [[moq-dev]] (moq-dev/moq, Rust publisher + JS subscriber) (2026-04-01)
- Active interop testing at IETF 125 Shenzhen and Boulder hackathon

# Related

- [[lorenzo-miniero]] - Maintainer
- [[interop-endpoints]] - Public relay endpoints
- [[interop-runner]] - Test framework
