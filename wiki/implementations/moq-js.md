---
title: "moq-js (video-dev)"
tags: [implementation, javascript, browser, ietf]
date: 2026-04-11
last_updated: 2026-06-27
status: current
---

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

# Recent Highlights

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **June 2026 merges**: itzmanish landed three merged PRs on June 26, breaking ~a month of quiet — [PR #70](https://github.com/video-dev/moq-js/pull/70) (player lifecycle + browser Web Audio playback fixes), [PR #71](https://github.com/video-dev/moq-js/pull/71) (Logger / structured logging), and [PR #69](https://github.com/video-dev/moq-js/pull/69) (repoints the demo at the current Cloudflare draft-14 relay endpoint). See [[discussions-2026-06]].
- **PR #72 refactor (open)**: [PR #72](https://github.com/video-dev/moq-js/pull/72) *"Refactor project structure and APIs"* (itzmanish, open since May 26, +11205/−22195) — a massive reorganization consolidating moq-js around a simpler core API surface; still open.
- **Cross-impl contributor / stewardship lag**: itzmanish (Manish) also contributes to [[moq-rs]] (cloudflare/moq-rs), where his PR #121 took 155 days to merge — the stewardship-lag pattern the wiki tracks as a structural risk for whether large PRs like #72 merge promptly. The smaller June fixes merging within ~1 day each partly eased that concern.

# Related

- [[moq-rs]] - IETF-aligned Rust companion (cloudflare/moq-rs)
- [[moq-dev]] - Luke Curley's project with Hang player (moq-dev/moq, different JS codebase)
- [[interop-runner]] - Testing framework
