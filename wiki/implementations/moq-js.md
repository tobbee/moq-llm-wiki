---
title: "moq-js (video-dev)"
tags: [implementation, javascript, browser, ietf]
date: 2026-04-11
last_updated: 2026-05-28
status: current
---

> **2026-05-28**: **[PR #72](https://github.com/video-dev/moq-js/pull/72) OPEN since May 26 12:49 UTC** by **itzmanish (Manish)** *"Refactor project structure and APIs"* (**+11205/−22195** across draft-16 baseline) — massive code reorganization. **Same external contributor whose [PR #121 in cloudflare/moq-rs](https://github.com/cloudflare/moq-rs/pull/121) took 155 days to merge** (Dec 18 2025 → May 20 2026) and whose [PR #131](https://github.com/cloudflare/moq-rs/pull/131) (draft-16 implementation) is still open in cloudflare/moq-rs. **Manish is now a structural cross-impl contributor** across both Cloudflare-stewarded MoQ TypeScript/Rust stacks. **Carry-forward**: net delta -10990 LOC (deletions far exceed additions) suggests Manish is consolidating moq-js around a simpler core API surface; whether englishm/Cloudflare merges before London is the open question — the prior 155-day stewardship lag pattern is a structural risk.
>
**Language**: JavaScript/TypeScript
**Organization**: video-dev
**Maintainer**: [[mike-english|Mike English]] (@englishm), community
**GitHub**: [video-dev/moq-js](https://github.com/video-dev/moq-js)
**Slack**: #moq-js (C09BZ7KH0BZ)
**Discord**: [video-dev Discord](https://discord.gg/FCYF3p99mr)

# Overview

IETF-aligned JavaScript/browser implementation of MoQ Transport, enabling browser-based publishing and subscribing via WebTransport. Client-side only — requires a MoQ relay such as [[moq-rs]] for operation.

# History

Created 2024-10-15, the same day as [[moq-rs]] (cloudflare/moq-rs). Both were born out of the period when [[luke-curley]] was not going to support the IETF WG specs in his original `kixelated/moq-js`. The video-dev version started from Luke's codebase but diverged to follow the IETF MoQ working group specifications. Luke's original `kixelated/moq-js` was archived in June 2025 and its functionality was absorbed into [[moq-dev]] as the Hang player (a total rewrite).

Much of the post-fork development came from the [Montevideo Tech Summer Camp 2025](https://montevideotech.dev/summercamp2025/) "MoQ Player Implementation" project, with Mike English as technical sponsor and contributors from the Qualabs community. The repo was moved from `englishm/moq-js` to `video-dev/moq-js` to reflect its status as a community project. The [2026 Summer Camp](https://montevideotech.dev/summer-camp-2026-moq-project/) continued MoQ work with both Mike English and Luke Curley as co-technical sponsors, this time focused on `moq-dev/moq`.

The two JS projects are now **separate implementations** — video-dev/moq-js follows IETF WG specs, while moq-dev/moq's JS packages implement Luke's moq-lite/Hang protocol.

# Draft Support

- **Main branch**: draft-14 (IETF WG spec)
- PR #64: draft-14 implementation with publisher and player (merged 2026-02-17)

# Use Cases

- Browser-based media publishing
- Browser-based media consumption
- Provides `<video-moq>` web component and `Player` class for custom UIs

# Top Contributors

kixelated (historical), englishm, JoaquinBCh, itzmanish, Manuel-Barrabino

# Recent Activity (April 2026)

- **PR #70** (Apr 20, Manish / @itzmanish): *"fix: moq-js player lifecycle and browser audio playback"* — +9542/−6440. Reworks `lib/playback/worker/audio.ts` for browser audio handling, extends `<video-moq>` lifecycle, and updates the subscriber transport plumbing. The volume comes mostly from deleting the legacy `web/` blog site and bundling a fresh `demo/lib/publish.iife.js`. First substantive moq-js PR since mid-April.

# Related

- [[moq-rs]] - IETF-aligned Rust companion (cloudflare/moq-rs)
- [[moq-dev]] - Luke Curley's project with Hang player (moq-dev/moq, different JS codebase)
- [[interop-runner]] - Testing framework
