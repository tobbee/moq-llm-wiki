---
title: "moq-rs (Cloudflare)"
tags: [implementation, rust, cloudflare]
date: 2026-04-10
status: current
---

# moq-rs

**Language**: Rust
**Organization**: Cloudflare
**Maintainer**: [[luke-curley]], Mike English
**GitHub**: [cloudflare/moq-rs](https://github.com/cloudflare/moq-rs)
**Slack**: #moq-rs (C09CG9V7A2Y)

## Overview

Cloudflare's Rust implementation of MOQ Transport. Provides both relay and client functionality. One of the most active implementations in the ecosystem.

## Draft Support

- **main branch**: draft-14 (explicitly stated in README)
- **draft-07 branch**: Cloudflare's current production deployment
- **PR #131**: draft-16 (by Manish)
- **Luke Curley's fork**: draft-17 + [[qmux]] support (as of 2026-03-17)
- Historical branches: draft-04, 05, 06, 07

## Public Infrastructure

- **Anycast relays**:
  - `draft-14.cloudflare.mediaoverquic.com:443` (draft-14)
  - `draft-07.cloudflare.mediaoverquic.com:443` (draft-07, deprecated)
- **Interop relays** (with mlog capture):
  - `interop-relay.cloudflare.mediaoverquic.com:443` (draft-14)
  - `draft-16-manish.cloudflare.mediaoverquic.com:443` (draft-16, WIP)
- All support raw QUIC and WebTransport on port 443
- Interop relays have `--mlog-serve` for debugging: `/<connection-id>` over HTTPS

## Interop

- Registered in [[interop-runner]]
- v17 interop achieved with [[lorenzo-miniero]]'s implementation (2026-04-01)
- Luke runs `cdn.moq.dev/anon` for browser pub/sub testing

## Related

- [[moq-js]] - JavaScript companion project
- [[interop-status]] - Cross-implementation testing
- [[interop-endpoints]] - Full endpoint listing
