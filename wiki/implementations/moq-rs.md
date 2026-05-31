---
title: "moq-rs (Cloudflare)"
tags: [implementation, rust, cloudflare, ietf]
date: 2026-04-12
last_updated: 2026-05-31
status: current
---

> **2026-05-31**: **PR #169 AuthHook breaks 2-day silence — 8 thibmeu review comments May 30 14:55-15:20 UTC**. [[thibault-meunier|Thibault Meunier]] (Cloudflare, privacy-pass author, [`@thibmeu`](https://github.com/thibmeu)) delivers the first substantive design engagement on the May 28 [PR #169](https://github.com/cloudflare/moq-rs/pull/169) AuthHook trait design proposal. 8 inline review comments span: **(1)** trait surface might be limiting for **Privacy Pass challenge reply** — cites [draft-ietf-moq-privacy-pass-auth-02 §3.4.5.1](https://datatracker.ietf.org/doc/html/draft-ietf-moq-privacy-pass-auth-02#section-3.4.5.1); **(2)** should reference the `AUTHORIZATION_TOKEN` parameter directly with its Token Alias / Token Type / Token Value structure ([draft-ietf-moq-transport-18 AUTHORIZATION TOKEN parameter](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-18#name-authorization-token-paramet)); **(3)** *"need some issue in moqt"* — flags need for upstream moq-transport spec issue; **(4)** decode-before-scope vs scope-before-knowing-challenge ordering matters for **two distinct namespaces using two distinct issuers**; **(5)** **`&str` vs `&[u8]`**: *"privacy-pass-moq-auth uses bytes, which I think avoid the whole UTF-8/normalisation question. I would suggest `&[u8]` or something similar"*; **(6)** *"I like that design choice. Beyond the fact that everyone has different requirements, for privacy pass it's actually part of the privacy model"*; **(7)** use `SETUP` consistently — *"draft -18 collapses them (despite still being defined)"*; **(8)** -16 as target is fine but **wording mixes draft-16 + draft-18** (SETUP/CLIENT_SETUP/SERVER_SETUP) and assumes MOQT Auth Token Type exists. **Significance**: thibmeu's first-pass review forces the trait surface to accommodate **issuer-aware challenge reply** rather than just verifier interface — i.e. AuthHook can't be a pure verify-callback, it needs **bidirectional challenge/response state** for PrivacyPass to work. This is the design wedge that splits "verifier hook" from "challenge protocol participant". **Carry-forward**: with [[2026-06-09-london-interim|London hackathon]] 9 days away, the AuthHook trait surface decisions are now actively contested — whether the trait becomes a pure verifier (CAT-friendly) or a challenge-protocol-aware abstraction (PrivacyPass-friendly) sets the implementation baseline for both auth efforts. **Wider impact**: thibmeu's review is **first cross-impl review-engagement on cloudflare/moq-rs by a non-Cloudflare-stewarded contributor since PR #167** — first review-pressure on englishm's editorial pace.
>
> **2026-05-30**: **[[itzmanish|itzmanish (Manish)]] closes 155-day-old [PR #131](https://github.com/cloudflare/moq-rs/pull/131) and opens fresh [PR #170](https://github.com/cloudflare/moq-rs/pull/170)** May 29 07:09:11 UTC *"[Rewrite] Draft-16 migration"* (+5289/−3115, 81 files) with note: *"NOTE - Please use this branch instead of older #131 because that is not compatible with base branch."* **PR #131 CLOSED 45 seconds later at 07:09:54 UTC by Manish himself** — writes off 155 days of his own work (PR #131 was +4384/−2045, OPEN since Dec 18 2025) to restart with a larger rewrite. **Combined with [video-dev/moq-js PR #72](https://github.com/video-dev/moq-js/pull/72)** (Manish's +11205/−22195 refactor still OPEN since May 26), **Manish is now driving both Cloudflare-stewarded TypeScript/Rust stacks as essentially "from-scratch" rewrites within the same week**. PR #169 AuthHook trait design proposal still OPEN with no new comments. **Carry-forward**: if PR #170 ships before London (10 days), cloudflare/moq-rs gets its first draft-16 (still 2 drafts behind transport-18) baseline merged by an external contributor. **Wider impact**: the **external-contributor-rewrites-twice pattern** is structurally different from the corporate-contributor pattern at moq-dev/moq (kixelated owns main and merges his own work in hours) — cloudflare/moq-rs's PR-merge cadence for external contributors is bimodal: same-day for Cloudflare staff, multi-month for external.
>
> **2026-05-29**: **No new commits May 28-29**. [PR #169 AuthHook trait design proposal](https://github.com/cloudflare/moq-rs/pull/169) still OPEN with no new comments since May 28 03:58 UTC (englishm-cloudflare's last edit minutes after opening). PR #167 Suhas filter-framework remains OPEN Day +18. **No design review activity in 24h** against the new AuthHook design proposal — first cloudflare/moq-rs design-PR comment-silence window after opening. **Carry-forward**: with moq-dev/moq's massive May 28-29 ~25-PR burst occupying the cross-impl design venue (moq-rtc WebRTC bridge + lite-05 deflate compression + REANNOUNCE), the AuthHook design proposal's coordination role for PrivacyPass + C4M auth schemes may be deferred — first comment activity expected once London-week design conversations begin.
>
> **2026-05-28**: **17-day design-PR quiet streak BROKEN** — **[PR #169](https://github.com/cloudflare/moq-rs/pull/169) OPENED May 28 03:13 UTC** by [[mike-english|englishm-cloudflare]] *"docs: add AuthHook trait design proposal"* (+724/−0, 1 markdown file). *"Design sketch for a pluggable AuthHook trait to support intra-scope authorization in the relay. Covers the trait surface, supporting types, invocation points, and reference implementation sketches for PrivacyPass and C4M (CAT for MoQ) auth schemes. Intended as a shared reference for contributors working on PP and C4M implementations in parallel."* **First cloudflare/moq-rs design-PR since [PR #167 Suhas filter-framework](https://github.com/cloudflare/moq-rs/pull/167) May 11** (still OPEN Day +16). **Significance**: explicitly frames the trait surface as a coordination mechanism for **PrivacyPass + C4M in parallel** — letting PrivacyPass for [[moq-privacy-pass|moq-privacy-pass-auth-02]] (afrind-authored WG draft) and C4M for CAT for MoQ (Cisco-led) ship as parallel implementations rather than as competing forks. Moves auth-scheme coordination work from the mailing list / moq-wg/moq-transport into cloudflare/moq-rs's repo. **Carry-forward**: with [[2026-06-09-london-interim|London hackathon]] 12 days away, the trait-surface decisions in PR #169 set the implementation baseline for both auth efforts in the cloudflare/moq-rs codebase — whether that becomes the cross-impl interop baseline depends on whether moq-dev/moq, openmoq/moqx, meetecho/imquic, moqtail/moqtail adopt the same trait shape.
>
> **2026-05-21**: **38-day main-quiet streak BROKEN** (last prior merge Apr 13). May 20 16:34-16:45 UTC, [[mike-english]] merged 2 PRs in 11 minutes: **[PR #121](https://github.com/cloudflare/moq-rs/pull/121)** *"refactor: simplified remote manager"* by **itzmanish (Manish)** (+762/−647, **OPEN since Dec 18 2025**, 155 days), finally merged — long-stale community refactor. **[PR #168](https://github.com/cloudflare/moq-rs/pull/168)** release-plz auto-cut **moq-transport 0.14.1 → 0.14.2 / moq-relay-ietf 0.7.17 → 0.7.18 / moq-pub 0.8.13 → 0.8.14 / moq-sub 0.4.7 → 0.4.8** (+57/−12). Changelog cites actual bug fixes: *"subscribe cleaning on drop"* (moq-transport / moq-sub) + *"tokio utils use default features"* + *"check for cancelled of cancellation token when waiting for subscribe open"* (moq-relay-ietf). **First real engineering signal from cloudflare/moq-rs since [PR #167](https://github.com/cloudflare/moq-rs/pull/167) (Suhas filter-framework) opened May 11** (still OPEN Day +9, untouched). PR #131 (Manish's draft-16 work) **still OPEN** as the underlying draft-16 baseline. The cloudflare/moq-rs draft-18 bump remains **not staged** — no PR to update beyond the draft-14 `main` / draft-16 PR #131 split.

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

# Recent Activity (April 2026)

- **PR #165** (opened Apr 23 20:47 UTC, @hrushikeshdeshpande from Cloudflare AppSec/ProdSec): *ci: add Semgrep OSS scanning workflow*. Part of Cloudflare App&ProdSec's migration from Semgrep Pro to Semgrep CE. Runs on PR, push-to-main, and monthly staggered schedule. Uses `actions/cache@v5`, pinned `semgrep==1.160.0` with `--config=auto`, runs on `ubuntu-slim` (+30/0). No code changes to the MoQ relay itself.
- **v0.7.17** released (Apr 13): Bug fix — always register in coordinator after registering in local (PR #161 by itzmanish)
- **PR #163** (Apr 14, [[mike-english]]): Aligning mlog qlog output with draft-pardue-moq-qlog-moq-events-03 (+346/−242, 6 files). Includes epoch-relative timestamps, typed parameter formatting, nested control messages within a `message` object, `request_id` mapping, and authorization token redaction. Addresses feedback from Lucas Pardue at IETF 125.
- **PR #157** (opened Apr 9, [[suhas-nandakumar]], updated Apr 21): **Publish/Subscribe Namespace Support**. Bundles draft-16 migration (subsumes PR #131) with a new relay `subscriber_registry`, preserved subgroup-header forwarding (fixes EndOfGroup handling), a fix for a 1-second freeze on group transitions, and a `web-transport` v0.10 upgrade with subprotocol negotiation. Nine iteration commits on Apr 21 03:13–05:30 UTC tightened the SUBSCRIBE_NAMESPACE/PUBLISH_NAMESPACE lifecycle: `REQUEST_UPDATE forward=1` for paused-track arrivals, stale-namespace cleanup on publisher reconnect, handle-lifetime fixes in `serve_subscribe_namespace`, self-exclusion in SUBSCRIBE_NAMESPACE, wait-for-`PUBLISH_OK`-before-streaming, and the correct wire type (`NAMESPACE` vs `PUBLISH`). A second batch of **five commits on Apr 21 06:39–08:46 UTC** fixed forwarding-path issues: forward `track_extensions` in PUBLISH messages (`7f95515`), fix stream header type mismatch when forwarding objects without extensions (`4e33675`), move datagram forwarding to a broadcast channel for proper queueing (`0112f91`), restore the datagram forwarding rate from a regressed **1/sec back to 50/sec** (`1148fa1`), and fix object encoding to match header type in the SUBSCRIBE flow (`5c0606d`).

# NAB Show 2026

Cloudflare's moq-rs relay network is a key component in multiple NAB demonstrations:
- **Wowza + Cloudflare**: Live CMAF-to-MoQ demo at booth W2300
- **Bitmovin Player Web X**: Sub-second playback tested against Cloudflare's 330+ city relay network

# Interop

- Registered in [[interop-runner]] as **moq-rs** (draft-14) and **moq-rs-draft-16**
- moq-rs-draft-16 <-> [[moxygen]]: 12 pass in interop runner

# Related

- [[moq-dev]] - Luke Curley's original project (moq-dev/moq), sibling implementation
- [[moq-js]] - IETF-aligned JavaScript companion (video-dev/moq-js)
- [[interop-status]] - Cross-implementation testing
- [[interop-endpoints]] - Full endpoint listing
