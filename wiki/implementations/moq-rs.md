---
title: "moq-rs (Cloudflare)"
tags: [implementation, rust, cloudflare, ietf]
date: 2026-04-12
last_updated: 2026-04-14
status: current
---

**Language**: Rust
**Organization**: Cloudflare
**Maintainer**: [[mike-english|Mike English]] (@englishm)
**GitHub**: [cloudflare/moq-rs](https://github.com/cloudflare/moq-rs) (was englishm/moq-rs)
**Slack**: #moq-rs (C09CG9V7A2Y) — shared channel, covers both this and [[moq-dev]]

# Overview

Cloudflare's Rust implementation of IETF MoQ Transport. Provides both relay and client functionality, strictly following the IETF MoQ working group specifications. One of the most active implementations in the ecosystem.

# History

**Timeline**:
- **2022-06-29**: Luke Curley creates `kixelated/warp` (Go implementation)
- **2023-04–05**: Luke rewrites from Go to Rust (PR #15, May 22)
- **Mid-2023**: Mike English begins collaborating closely with Luke — near-daily discussions on codebase design and the evolving IETF MoQ Transport spec. Mike's contributions include early containerized relay deployments (Fly.io, GKE), the first MoQT client publisher (moq-pub), an exploration of C FFI for ffmpeg ([englishm/libmoq](https://github.com/englishm/libmoq)), and an update to support draft-ietf-moq-transport-04. See Mike's [pre-fork commits](https://github.com/moq-dev/moq/commits?author=englishm).
- **2024-10-07**: Luke publishes his ["Fork" blog post](https://moq.dev/blog/transfork), stepping away from the IETF WG to focus on moq-lite/Transfork
- **2024-10-15**: Mike creates `englishm/moq-rs` (fork of Luke's repo) to maintain IETF WG alignment
- **Later**: Transferred to Cloudflare as `cloudflare/moq-rs`

The two projects are now considered **sibling implementations** — neither is upstream of the other. See [[moq-dev]] for Luke's original project.

# Key Contributors

- **[[mike-english|Mike English]]** (@englishm) — Maintainer. Joined during the Go→Rust transition as a close collaborator.
- **Manish** (@itzmanish) — Cloudflare developer, currently working on draft-16 support (PR #131)
- **Jacob** (@nnazo) — Cloudflare developer working on the MoQ relay service
- **Scott Godin** (@sgodin) — Did the bulk of the draft-07 → draft-14 message migration
- **Zafer Gurel** (@zafergurel) — Substantial early contributions to moq-transport protocol messages; went on to create [[moqtail]]
- See the full [contributors page](https://github.com/cloudflare/moq-rs/graphs/contributors)

# Draft Support

- **main branch**: draft-14 (IETF WG spec) — current production deployment
- **PR #131**: draft-16 (by Manish)
- Historical branches: draft-04, 05, 06, 07

# Public Infrastructure

- **Anycast relays**:
  - `draft-14.cloudflare.mediaoverquic.com:443` (draft-14)
  - `draft-07.cloudflare.mediaoverquic.com:443` (draft-07, deprecated)
- **Interop relays** (with mlog capture):
  - `interop-relay.cloudflare.mediaoverquic.com:443` (draft-14)
  - `draft-16-manish.cloudflare.mediaoverquic.com:443` (draft-16, WIP)
- All support raw QUIC and WebTransport on port 443
- Interop relays have `--mlog-serve` for debugging: `/<connection-id>` over HTTPS

# Interop

- Registered in [[interop-runner]] as **moq-rs** (draft-14) and **moq-rs-draft-16**
- moq-rs-draft-16 <-> [[moxygen]]: 12 pass in interop runner

# Related

- [[moq-dev]] - Luke Curley's original project (moq-dev/moq), sibling implementation
- [[moq-js]] - IETF-aligned JavaScript companion (video-dev/moq-js)
- [[interop-status]] - Cross-implementation testing
- [[interop-endpoints]] - Full endpoint listing
