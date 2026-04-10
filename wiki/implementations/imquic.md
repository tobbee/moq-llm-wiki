---
title: "imquic (Meetecho)"
tags: [implementation, c, meetecho]
date: 2026-04-10
status: current
---

# imquic

**Language**: C
**Organization**: Meetecho
**Maintainer**: [[lorenzo-miniero]]
**GitHub**: [meetecho/imquic](https://github.com/meetecho/imquic)

## Overview

A C library for QUIC that includes MOQ Transport support alongside RTP over QUIC (RoQ). Built as part of the Janus WebRTC gateway ecosystem.

## Draft Support

- **draft-16 and draft-17** (version range: `0xff000010` to `0xff000011`)
- Supports version negotiation - can offer all supported versions or pin to a specific one
- Previously supported draft-11 through draft-16; draft-14 was dropped when moving to v17
- Not all features of all versions are fully implemented

## Public Infrastructure

- Relay at `lminiero.it:9000` (raw QUIC and WebTransport)

## Interop

- Registered in [[interop-runner]] matrix
- First v17 interop achieved with [[moq-rs]] / [[moq-js]] (2026-04-01)
- Active interop testing at IETF 125 Shenzhen and Boulder hackathon

## Related

- [[lorenzo-miniero]] - Maintainer
- [[interop-endpoints]] - Public relay endpoints
- [[interop-runner]] - Test framework
