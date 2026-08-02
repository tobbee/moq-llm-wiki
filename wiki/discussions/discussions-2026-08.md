---
title: "Discussions - August 2026"
tags: [discussions, slack, github]
date: 2026-08-02
last_updated: 2026-08-02
status: current
---

Summary of active discussions in the MOQ ecosystem during August 2026.

# Activity (Aug 1 → Aug 2) — **[[moq-dev|moq-dev/moq]] carries a quieter window and follows through on the prior day's spec-alignment thread: it *completes* the LOC-04 Timestamp code-point adoption ([#2581](https://github.com/moq-dev/moq/pull/2581) merged), adds relay-lifecycle and native-video hardening, and opens a genuinely new front — local-network peer discovery/mesh via mDNS ([#2585](https://github.com/moq-dev/moq/pull/2585), OPEN) — while the WG repos stay near-silent (no PRs; one live encoding discussion on transport [issue #1837](https://github.com/moq-wg/moq-transport/issues/1837)).**

The Aug 1 → Aug 2 window was **implementation-carried again** — the third straight day where [[moq-dev|moq-dev/moq]] (all [[luke-curley|Luke Curley]]) supplied the durable content, but at a much smaller scale than July 31's ~6,000-LOC burst. **Slack `#moq` stayed quiet** (newest is still [[suhas-nandakumar|Suhas]]'s July-29 20:14 EEST reply on the [[lorenzo-miniero|Miniero]] MoQ-over-MoQ blog thread — no July 30/31 or Aug-1/2 traffic), the **[mailing list](https://mailarchive.ietf.org/arch/browse/moq/) had no genuinely new message** (raw-verified — [[magnus-westerlund|Magnus Westerlund]]'s July-29 IETF-126 draft-minutes email is still the newest; the **weekly GitHub digest was due ~Aug 2 but had not posted at check time**), and the [datatracker](https://datatracker.ietf.org/group/moq/documents/) shows **no revision bumps or new individual drafts** (transport-19, loc-04 newest; `draft-lcurley-moq-lite` still -05; still **no `draft-lcurley-moq-archive`** I-D). IETF-126 minutes remain the single Monday doc at rev -01 (in its ~2-week WG review, corrections due ~Aug 12). No new [[moq-monthly|MoQ Monthly]] (#2, May 31); no open wiki issues; the nightly runner produced one new cut (−3 pass, see below).

## moq-dev: LOC-04 adoption completes, relay + native-video hardening, an mDNS mesh front opens

[[moq-dev|moq-dev/moq]] followed through on July 31's *spec-alignment* thread with four Aug-1 merges/PRs (relay v0.14.5 stands; no new release):

- **LOC-04 Timestamp code point adopted (merged)**: [#2581](https://github.com/moq-dev/moq/pull/2581) *"adopt the `draft-ietf-moq-loc-04` Timestamp code point, and align relay-hops with lite-06"* (+653/−198, **MERGED**) — this was OPEN the prior day and now lands, **completing the LOC-04 registry-fix adoption** that [#2578](https://github.com/moq-dev/moq/pull/2578) began July 31. It moves moq-dev's LOC packaging onto the [draft-ietf-moq-loc-04](https://datatracker.ietf.org/doc/draft-ietf-moq-loc/) Timestamp code point (published July 20, which relocated the LOC Timestamp off its 0x06 collision) and continues moq-lite-06 relay-hop alignment ahead of any datatracker `-06`. Same spec-follows-in-code pattern the wiki has tracked since moq-dev first chose the transport-18 §15.8 property IDs (see [[moq-loc]], [[moq-lite]]).
- **Relay-lifecycle hardening**: [#2582](https://github.com/moq-dev/moq/pull/2582) *"keep parked groups across a prune and revive a buried route"* (+118/−28, **MERGED**) — another route/relay-lifecycle correction in the post-Vienna relay-correctness vein (parked groups surviving a prune, a buried route brought back).
- **Native-video hardening**: [#2584](https://github.com/moq-dev/moq/pull/2584) *"keep Media Foundation decoded frames on the GPU, and stop losing frames at group boundaries"* (+731/−142, **MERGED**) — a Windows **Media Foundation** decode-path fix that keeps decoded frames GPU-resident and stops frame loss at group boundaries.
- **New front — local-network peer mesh via mDNS**: OPEN [#2585](https://github.com/moq-dev/moq/pull/2585) *"discover and mesh with MoQ peers on the local network via mDNS"* (+606/−4) — a genuinely new capability: native peers auto-discovering and meshing with each other on the LAN via mDNS, extending the gossip/peer-mesh work beyond configured routes. Worth watching for a follow-on relay/CLI story. Trivia merges: a test-naming tidy ([#2586](https://github.com/moq-dev/moq/pull/2586)) and a bot `flake.lock` bump ([#2587](https://github.com/moq-dev/moq/pull/2587)).

## WG repos: no PRs, one live encoding discussion (transport #1837)

The WG document repos stayed near-silent — **no PRs merged on any moq-wg repo** in the window (the last transport merge was July 30, msf July 30). The one live thread was **[[mathis-engelbart|Mathis Engelbart]]'s transport [issue #1837](https://github.com/moq-wg/moq-transport/issues/1837) *"FETCH and REQUEST_ERROR encoding"*** (opened July 31), which drew a real Aug-1 exchange: [[alan-frindell|afrind]] asked "how ugly is your parser?", [[martin-duke|Martin Duke]] agreed the **three separate FETCH message formats are bit-inefficient and editorially hard to read** (two are moving into a parameter), and Engelbart confirmed the code isn't ugly but is "slightly annoying, especially when upgrading to new versions" — a WGLC-hygiene encoding cleanup, not a wire change (transport-19 stands). afrind's [PR #1820](https://github.com/moq-wg/moq-transport/pull/1820) *"Add PUBLISH_NOTIFY message"* (OPEN since July 21) also saw activity Aug-1 but has not merged. loc, secure-objects, msf, cmsf, catalog-format, and privacy-pass were quiet.

## Everything else: quiet, plus small stirrings

- **[[moq-rs|cloudflare/moq-rs]]** was quiet after July 31's ship-day — `moq-relay-ietf` v0.7.25 (with the draft-14 upstream-retention backport) stands; no new PRs.
- **[[openmoq|moqx]]** took a routine moxygen sync ([#535](https://github.com/openmoq/moqx/pull/535)); [[alan-frindell|afrind]]'s [#532](https://github.com/openmoq/moqx/pull/532) (MoQT safe-form names) and [#533](https://github.com/openmoq/moqx/pull/533) (per-track `/metrics/track` counters) remain OPEN.
- **[[aiomoqt]]** (Giovanni Marzot) opened a **v0.11.0 release-prep PR** ([#36](https://github.com/gmarzot/aiomoqt/pull/36)) — the first movement on that Python client in a while.
- **[[moxygen]]** closed [#206](https://github.com/facebookexperimental/moxygen/pull/206) (qlog per-connection QLogger, afrind) unmerged.
- **[[quiche-moq|google/quiche]]** (moqt), **[[moqtail]]**, **[[moq-js]]**, **[[imquic]]**, **[[moqlivemock|Eyevinn/moqlivemock]]**, **[[warp-player]]**, **[[moqtransport|Eyevinn/moqtransport]]**, **[[kota-yatagai|Moqtopus]]**, and birneee/quiche_moq were all quiet.

## Interop runner: −3 pass, still inside the settled band

The nightly runner's **[Aug-1 00:34 UTC cut](https://englishm.github.io/moq-interop-runner/results/2026-08-01_003417/report.html)** was **350 / 130 / 209 / 11** (~37.1% pass; at-target draft-18 220 · 0 ahead · 130 behind) — a **−3 pass / +3 fail** drift versus the July-31 cut (350/133/206/11), with matrix, skip, and at-target all flat. Pass 130 falls back into the settled 350-cell band (126–133); it's the tenth straight cut on that matrix, at-target holding 220 for an eleventh straight cut. Still targets **draft-18**. No Aug-2 cut at check time. See [[interop-runner]].
