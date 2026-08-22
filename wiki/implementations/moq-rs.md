---
title: "moq-rs (Cloudflare)"
tags: [implementation, rust, cloudflare, ietf]
date: 2026-04-12
last_updated: 2026-08-01
status: current
last_updated: 2026-08-19
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
- **draft-18**: `draft-18-dev` branch behind the runner-registered `moq-rs-draft-18` relay; the request-stream rework (PR #178, removes `MAX_REQUEST_ID`, moves requests to bidi streams) merged in the July-8 burst. **SUBSCRIBE_NAMESPACE support** ([PR #187](https://github.com/cloudflare/moq-rs/pull/187), itzmanish/Manish) merged to `main` July 19, and `draft-18-dev` was rebased onto `main` the same day to prep the Vienna Hackathon relay. **Relay draft-18 restoration** — [PR #211](https://github.com/cloudflare/moq-rs/pull/211) (Jacob/@nnazo, *"Restore relay work for draft-18 and port missing session layer,"* **+12164/−778**) merged **Aug 18**, bringing the **relay** role — which had lagged on draft-14/16 while the client tracked draft-18 — back onto draft-18 and porting the missing session layer, with unit-test coverage from [PR #156](https://github.com/cloudflare/moq-rs/pull/156) (+950/−71); a `moq-transport` crate **v0.16.2** release-please round is queued in [PR #212](https://github.com/cloudflare/moq-rs/pull/212) (OPEN, not yet cut)
- **draft-16**: the long-open community rewrite ([PR #170](https://github.com/cloudflare/moq-rs/pull/170), itzmanish) merged July 8; its follow-on PUBLISH message support ([PR #181](https://github.com/cloudflare/moq-rs/pull/181), +4049/−624) merged July 9
- Latest release: `moq-relay-ietf` **v0.7.25** (July 31) — the batch that shipped the relay upstream-retention fix — with `moq-pub` v0.9.3 / `moq-sub` v0.4.14 / `moq-clock-ietf` v0.6.20 / `moq-api` v0.2.13 / `moq-test-client` v0.1.12, following the July-20 v0.7.24 (`moq-native-ietf` v0.10.0, [PR #190](https://github.com/cloudflare/moq-rs/pull/190)) and July-19 v0.7.23 SUBSCRIBE_NAMESPACE batches. Bug [issue #191](https://github.com/cloudflare/moq-rs/issues/191) (dmorn) — the relay retains an upstream track subscription after the last downstream subscriber leaves — was **fixed July 30 by [PR #196](https://github.com/cloudflare/moq-rs/pull/196)** (release upstream subscriptions for idle cached tracks) and **backported to the draft-14 `main` branch July 31 by [PR #198](https://github.com/cloudflare/moq-rs/pull/198)** (+1986/−163), with a companion ordering fix [PR #197](https://github.com/cloudflare/moq-rs/pull/197) (*wait for upstream subscription before sending SUBSCRIBE_OK*, +477/−55) — all cut in v0.7.25
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
- **draft-18 request-ID removal.** [PR #178](https://github.com/cloudflare/moq-rs/pull/178) (englishm) removes `MAX_REQUEST_ID` and moves requests onto bidi streams — the direction the WG converged on (cf. [[moq-transport]] [Issue #1653](https://github.com/moq-wg/moq-transport/issues/1653)); merged in a July-8 burst that also landed the long-open community draft-16 rewrite (itzmanish) and a `moq-relay-ietf` v0.7.21 release.
- **Pluggable AuthHook / relay authorization.** [PR #169](https://github.com/cloudflare/moq-rs/pull/169) (englishm) proposed an AuthHook trait for intra-scope relay authorization; [PR #171](https://github.com/cloudflare/moq-rs/pull/171) ([[suhas-nandakumar|Suhas]]) implemented it with new `moq-auth` and `moq-auth-cat` crates (C4M — CAT for MoQ). [[thibault-meunier|Thibault Meunier]]'s review pushed the trait toward issuer-aware challenge/reply so it also fits [[moq-privacy-pass|PrivacyPass]]. Both OPEN as the shared coordination venue.
- **draft-16 rewrite + PUBLISH support.** [[moq-rs|Manish]] closed his 155-day-old [PR #131](https://github.com/cloudflare/moq-rs/pull/131) and reopened it as [PR #170](https://github.com/cloudflare/moq-rs/pull/170) ("[Rewrite] Draft-16 migration"), the underlying draft-16 baseline (merged July 8). Its large follow-on [PR #181](https://github.com/cloudflare/moq-rs/pull/181) ("Publish message support", +4049/−624) merged July 9, adding native PUBLISH-message handling and triggering a `moq-relay-ietf` v0.7.22 / `moq-pub` v0.9.0 release round.
- **Namespace pub/sub and qlog alignment.** [PR #157](https://github.com/cloudflare/moq-rs/pull/157) (Suhas) added Publish/Subscribe Namespace support with a new relay `subscriber_registry`; [PR #163](https://github.com/cloudflare/moq-rs/pull/163) ([[mike-english]]) aligned mlog qlog output with draft-pardue-moq-qlog-moq-events-03.
- **draft-18 SUBSCRIBE_NAMESPACE + Vienna Hackathon prep.** [PR #187](https://github.com/cloudflare/moq-rs/pull/187) (Manish) landed SUBSCRIBE_NAMESPACE on `main` July 19, and `draft-18-dev` was rebased onto `main` the same day for the IETF-126 Hackathon relay — cut as `moq-relay-ietf` v0.7.23 (+ moq-pub v0.9.1 / moq-sub v0.4.12 / moq-clock-ietf v0.6.18 / moq-test-client v0.1.10). At the Hackathon the `draft-18-interop.cloudflare.mediaoverquic.com:443` relay was *"back to the initial draft-18 features + PUBLISH and SUBSCRIBE_NAMESPACE"* ([[mike-english]]), though testers (Miniero, Kota Yatagai) still saw SUBSCRIBE not reaching the publisher — an in-progress gap Mike is debugging for Friday's interop report.
- **Relay plumbing.** A `socket_wrapper` hook to wrap the underlying UDP socket landed ([PR #174](https://github.com/cloudflare/moq-rs/pull/174), merged June 10); a proposed warm-cache-linger + upstream `UNSUBSCRIBE` scheme for propagating downstream interest loss is under review ([PR #180](https://github.com/cloudflare/moq-rs/pull/180), OPEN).
- **Relay upstream-retention fix — merged, then shipped.** [PR #196](https://github.com/cloudflare/moq-rs/pull/196) ([[mike-english]], +1740/−150, merged July 30) **releases upstream subscriptions for idle cached tracks and stops FIN-ing subgroup streams mid-object** — fixing the [issue #191](https://github.com/cloudflare/moq-rs/issues/191) bug where the relay held an upstream subscription after the last downstream subscriber left (the same relay-lifecycle class as [[moqtail]] [issue #332](https://github.com/moqtail/moqtail/issues/332)). It was then **backported to the draft-14 `main` branch July 31 ([PR #198](https://github.com/cloudflare/moq-rs/pull/198), +1986/−163) with a companion ordering fix ([PR #197](https://github.com/cloudflare/moq-rs/pull/197) *wait for upstream subscription before sending SUBSCRIBE_OK*, +477/−55) and shipped as the `moq-relay-ietf` v0.7.25 release train** (July 31) — the repo's first tagged release since July 20 and a durable correctness gain on the recurring post-Vienna relay-resource-lifecycle front.

# Interop

- Registered in [[interop-runner]] as **moq-rs** (draft-14), **moq-rs-draft-16**, and **moq-rs-draft-18**
- moq-rs-draft-16 <-> [[moxygen]]: 12 pass in interop runner

# Related

- [[moq-dev]] - Luke Curley's original project (moq-dev/moq), sibling implementation
- [[moq-js]] - IETF-aligned JavaScript companion (video-dev/moq-js)
- [[interop-status]] - Cross-implementation testing
- [[interop-endpoints]] - Full endpoint listing
