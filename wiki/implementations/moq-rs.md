---
title: "moq-rs (Cloudflare)"
tags: [implementation, rust, cloudflare, ietf]
date: 2026-04-12
last_updated: 2026-07-09
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
- **Manish** (@itzmanish) — Cloudflare developer, currently working on draft-16 support (PR #170)
- **Jacob** (@nnazo) — Cloudflare developer working on the MoQ relay service
- **Scott Godin** (@sgodin) — Did the bulk of the draft-07 → draft-14 message migration
- **Zafer Gurel** (@zafergurel) — Substantial early contributions to moq-transport protocol messages; went on to create [[moqtail]]
- See the full [contributors page](https://github.com/cloudflare/moq-rs/graphs/contributors)

# Draft Support

- **main branch**: draft-14 (IETF WG spec) — current production deployment
- **draft-18**: `draft-18-dev` branch (PR #173 merged June 11) behind the runner-registered `moq-rs-draft-18` relay; tracks draft-18's moving wire decisions
- **draft-16**: rewrite in PR #170 (by Manish; supersedes the closed PR #131)
- Historical branches: draft-04, 05, 06, 07

# Public Infrastructure

- **Anycast relays**:
  - `draft-14.cloudflare.mediaoverquic.com:443` (draft-14)
  - `draft-07.cloudflare.mediaoverquic.com:443` (draft-07, deprecated)
- **Interop relays** (with mlog capture):
  - `interop-relay.cloudflare.mediaoverquic.com:443` (draft-14)
  - `draft-16-manish.cloudflare.mediaoverquic.com:443` (draft-16, WIP)
  - `draft-18-interop.cloudflare.mediaoverquic.com:443` (draft-18, auto-deployed from `draft-18-dev`)
- All support raw QUIC and WebTransport on port 443
- Interop relays have `--mlog-serve` for debugging: `/<connection-id>` over HTTPS

# NAB Show 2026

Cloudflare's moq-rs relay network is a key component in multiple NAB demonstrations:
- **Wowza + Cloudflare**: Live CMAF-to-MoQ demo at booth W2300
- **Bitmovin Player Web X**: Sub-second playback tested against Cloudflare's 330+ city relay network

# Recent Highlights (as of July 2026)

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **draft-18 landed and a registered relay went live.** [PR #173](https://github.com/cloudflare/moq-rs/pull/173) ("Start work on draft-18", englishm) opened on the London hackathon floor June 9 and merged June 11. A rolling `draft-18-dev` branch ([PR #176](https://github.com/cloudflare/moq-rs/pull/176)) auto-deploys to `draft-18-interop.cloudflare.mediaoverquic.com:443` and is registered in the [[interop-runner]] as `moq-rs-draft-18` — closing a long-standing two-draft gap (`main` stays draft-14).
- **draft-18 request-ID removal.** [PR #178](https://github.com/cloudflare/moq-rs/pull/178) (englishm) removes `MAX_REQUEST_ID` and moves requests onto bidi streams — the direction the WG converged on (cf. [[moq-transport]] [Issue #1653](https://github.com/moq-wg/moq-transport/issues/1653)).
- **Pluggable AuthHook / relay authorization.** [PR #169](https://github.com/cloudflare/moq-rs/pull/169) (englishm) proposed an AuthHook trait for intra-scope relay authorization; [PR #171](https://github.com/cloudflare/moq-rs/pull/171) ([[suhas-nandakumar|Suhas]]) implemented it with new `moq-auth` and `moq-auth-cat` crates (C4M — CAT for MoQ). [[thibault-meunier|Thibault Meunier]]'s review pushed the trait toward issuer-aware challenge/reply so it also fits [[moq-privacy-pass|PrivacyPass]]. Both OPEN as the shared coordination venue.
- **draft-16 rewrite.** [[itzmanish|Manish]] closed his 155-day-old [PR #131](https://github.com/cloudflare/moq-rs/pull/131) and reopened it as [PR #170](https://github.com/cloudflare/moq-rs/pull/170) ("[Rewrite] Draft-16 migration"), the underlying draft-16 baseline.
- **Namespace pub/sub and qlog alignment.** [PR #157](https://github.com/cloudflare/moq-rs/pull/157) (Suhas) added Publish/Subscribe Namespace support with a new relay `subscriber_registry`; [PR #163](https://github.com/cloudflare/moq-rs/pull/163) ([[mike-english]]) aligned mlog qlog output with draft-pardue-moq-qlog-moq-events-03.
- **Relay plumbing.** A `socket_wrapper` hook to wrap the underlying UDP socket landed ([PR #174](https://github.com/cloudflare/moq-rs/pull/174), merged June 10); a proposed warm-cache-linger + upstream `UNSUBSCRIBE` scheme for propagating downstream interest loss is under review ([PR #180](https://github.com/cloudflare/moq-rs/pull/180), OPEN).

# Interop

- Registered in [[interop-runner]] as **moq-rs** (draft-14), **moq-rs-draft-16**, and **moq-rs-draft-18**
- moq-rs-draft-16 <-> [[moxygen]]: 12 pass in interop runner

# Related

- [[moq-dev]] - Luke Curley's original project (moq-dev/moq), sibling implementation
- [[moq-js]] - IETF-aligned JavaScript companion (video-dev/moq-js)
- [[interop-status]] - Cross-implementation testing
- [[interop-endpoints]] - Full endpoint listing
