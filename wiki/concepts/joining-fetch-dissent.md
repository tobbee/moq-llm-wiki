---
title: "Joining Fetch Dissent"
tags: [concept, transport, design-debate]
date: 2026-04-12
last_updated: 2026-06-22
status: current
---

A cluster of open issues and competing proposals around how subscribers join a live stream mid-session. Tagged "Joining Fetch Dissent" on GitHub. **The April five-way debate documented below was resolved at the June 11–12 London interim — see Resolution.**

> **2026-06-22 — Resolution.** The mid-April five-way contest collapsed at the **London interim (June 11–12)** into two consolidated workstreams: **fill fetch** (subscription filters delivering past groups over fetch-formatted streams — replaces Joining FETCH, absorbs REWIND / LargestGroup / CurrentGroupFill) and **SWITCH_FROM** (a parameter, not a standalone message, for ABR track switching — see [[switch-abr]]). The live wire-design item is **[[mo-zanaty|Mo Zanaty]]'s [Range Filters PR #1765](https://github.com/moq-wg/moq-transport/pull/1765)** (June 16, OPEN). REWIND was parked at -02; the May 1 consensus call closed with no chair conclusion. As of June 22 the transport editorial pipeline is **frozen for a 4th straight day**, all these PRs OPEN, held for the June 22 virtual interim. See [[interim-meetings]], [[discussions-2026-06]].

# The Problem

When joining a live stream, a subscriber needs historical data (e.g., the latest keyframe) to start rendering. The current [[joining-fetch]] mechanism has been contentious, generating multiple alternative proposals.

# Open Issues (tagged "Joining Fetch Dissent")

- **#1313** - Joining FETCH as separate control message creates edge cases and feature gaps (ianswett, Past Deadline)
- **#1391** - Unclear how to use Joining FETCH with New Group Request (ianswett)
- **#1386** - Can a publisher 'lie' about what Largest Object is? (ianswett)
- **#1358** - Subscribing to start of current Group could be optimized (ianswett)
- **#1039** - Simplifying joining at the latest available join point (wilaw)
- **#1023** - Subgroups + DELIVERY_TIMEOUT = pathological FETCH (afrind, Past Deadline)

# Competing Proposals (and their fate)

| # | Proposal | Author | Fate (as of June 22) |
|---|----------|--------|----------------------|
| 1 | **Joining FETCH** (separate FETCH alongside live SUBSCRIBE; moved-to-SUBSCRIBE-stream = [PR #1604](https://github.com/moq-wg/moq-transport/pull/1604)) | in draft-17/18 | **CLOSED June 4** — replaced by fill fetch |
| 2 | **PR #1362** Prior Group Subscription Filter | ianswett | folded into the filter line of work |
| 3 | **Subscribe Rewind** ([draft-duke-moq-subscribe-rewind](https://datatracker.ietf.org/doc/draft-duke-moq-subscribe-rewind/)) | [[martin-duke]] | **parked at -02**; function folded into fill fetch |
| 4 | **Join Subscription Filters** ("more of an extension to Martin's") | [[alan-frindell]] | superseded by fill fetch |
| 5 | **LargestGroup / CurrentGroup / CurrentGroupFill** filters | Vasiliev / afrind / Luke | **#1607 CLOSED June 4**; `CurrentGroup` filter type absorbed into fill fetch |
| 6 | **SWITCH** ([PR #1378](https://github.com/moq-wg/moq-transport/pull/1378), charter ABR argument) | [[gwendal-simon]] | superseded by **SWITCH_FROM** parameter ([[switch-abr]]) |

The Apr 17–18 detail on these:

- **PR #1607 — Largest Available Group filter** ([[victor-vasiliev]], Apr 18): current group only, always complete group, no explicit relay backfill, "probably really easy to implement." **CLOSED June 4.**
- **[afrind/moq-transport#15 CurrentGroupFill](https://github.com/afrind/moq-transport/pull/15)** ([[alan-frindell]]): parallel draft targeting the same "current group" niche; absorbed into the official fill-fetch PRs ([#1642](https://github.com/moq-wg/moq-transport/pull/1642) → [#1673](https://github.com/moq-wg/moq-transport/pull/1673)).
- **Luke Curley's LargestGroup proposal** (mailing-list, informal) — same shape, framed as "the intended behaviour 99% of the time" so the first group stops being a special case.

# Latest Developments

## May–June 2026 consolidation (newest first)

- **June 16** — [[mo-zanaty|Mo Zanaty]] opens **[PR #1765 "Add Range Filters"](https://github.com/moq-wg/moq-transport/pull/1765)** (follow-up to the London object-range-filter consensus + the action item to re-add the location filter separately; builds on his long-open [PR #1518](https://github.com/moq-wg/moq-transport/pull/1518)). "The active design thrust." OPEN through the June editorial freeze.
- **June 14** — [[alan-frindell]] opens **[PR #1673](https://github.com/moq-wg/moq-transport/pull/1673)** *"Replace Joining FETCH with fill fetch streams"* (revises [#1642](https://github.com/moq-wg/moq-transport/pull/1642), closes #1023) **plus [PR #1674/#1675](https://github.com/moq-wg/moq-transport/pull/1674)** SWITCH_FROM hard/soft mode — all in a 33-minute window.
- **June 11–12 — London interim consensus**: *fill fetch replaces Joining FETCH*; *SWITCH_FROM hard mode* (soft deferred); keep the object-ID filter, split the location filter into a separate PR; draft-18 = Vienna interop target; Top-Tracks filter stays an extension.
- **June 4** — REWIND/SWITCH consensus call closes; **[PR #1604](https://github.com/moq-wg/moq-transport/pull/1604) (Joining FETCH) and [PR #1607](https://github.com/moq-wg/moq-transport/pull/1607) (LargestGroup) both CLOSED**. DTS resolved June 10 as an extension (`draft-ietf-moq-dts4moq`), not base-spec.
- **June 2** — afrind opens [PR #1642](https://github.com/moq-wg/moq-transport/pull/1642) *"Replace Joining Fetch with Subscription Fill, add Current Group."*
- **May 1** — REWIND consensus call deadline reached with **no chair conclusion** (split outcome); REWIND parked at -02. The WG proceeded on the filter-based path.

## April 2026 (historical)

- **Interim moq-13 outcome** (Apr 13) - WG declined to integrate REWIND into core v1. Editors will land minimal band-aids: **FETCH timeouts (PR #1490, merged Apr 14)** and subgroup filters; sophisticated joining deferred to future extensions.
- **REWIND Consensus Call** (Apr 16, Magnus Westerlund) - Three options open until **2026-05-01**:
  1. No action until MOQT publishes
  2. Adopt REWIND as a MOQT extension draft
  3. Use REWIND as basis for a PR into MOQT when editors deem ready
  Targets issues #861, #1039, #1358, #1362, #1386.
- **Alan Frindell's reply** (Apr 17) — backs **Option 1**. Argues FILL_TIMEOUT=0 (PR #1490, merged Apr 14) already removes the HOL-blocking scenarios REWIND was meant to solve (low-prio subgroup cache gaps, stream-per-object tracks, evicted groups). Residual case (cached low-prio data blocking) can be handled with filters. Recommends "stabilise around the core" and defer to future versions. [Full message](https://mailarchive.ietf.org/arch/msg/moq/hw5pIm56DBOot-DqmLkaCBxtSVo/).
- **Luke Curley's reply** (Apr 17, [message](https://mailarchive.ietf.org/arch/msg/moq/y5f5XZT005Y6ebrHYBOXtr4JojQ/)) — against REWIND as-is. Sees FETCH's VOD semantics as inherently HOL-prone and argues "smart" VOD clients are better served by per-group FETCHes (HLS/DASH-style). Proposes a **LargestGroup filter for SUBSCRIBE** to cover 99% of the join-live use case and eliminate the first-group special case. Follow-up Apr 18 ([message](https://mailarchive.ietf.org/arch/msg/moq/UpRFbpqfPGUb5V5X4-saOznMWaU/)): "Yeah, I just want to adopt CurrentGroup so we can make some progress."
- **Victor Vasiliev's reply** (Apr 18, [message](https://mailarchive.ietf.org/arch/msg/moq/q8Vxe5NGEX-KWgqnChyA3LnMUDE/)) — "Not against the LargestGroup idea." Authored a concrete draft: **[PR #1607 — Largest Available Group filter](https://github.com/moq-wg/moq-transport/pull/1607)**. Only the current group is supported, always serves a complete group, no relay-side backfill, "probably really easy to implement."
- **Alan Frindell follow-up** (Apr 18, [message](https://mailarchive.ietf.org/arch/msg/moq/GKLXatC9zc2euVTCXwO0ICxgYWQ/)) — also does not object to a LargestGroup filter and has drafted a parallel "CurrentGroupFill" PR. Key caveat: the filter handles the common case (joining via one message, consistent response format) and the in-cache low-pri subgroup/datagram case of the *current* group, but does **not** address previous groups.
- **Gwendal Simon's dissent** (Apr 18, [message](https://mailarchive.ietf.org/arch/msg/moq/1DoFuRdZDWMVXb9e7AXxpgR_EZ8/)) — argues the emerging LargestGroup/CurrentGroup direction is **insufficient for MoQ V1** because it does not cover ABR track switching, which is an explicit **charter deliverable**. Key points: (1) a subscriber is "almost always behind the live edge" during switches (congestion or buffering creates lag), so switching is not an edge case; (2) CurrentGroup helps with *joining* but only covers one group, whereas ABR switching requires "an arbitrary range of past groups"; (3) the real blocker is a **semantic constraint** — past objects are currently not allowed in a PUBLISH stream — not head-of-line blocking. He proposes reconsidering this constraint via **Joining PUBLISH with live semantics**, which he has prototyped in [PR #1378 — SWITCH](https://github.com/moq-wg/moq-transport/pull/1378). See [[switch-abr]].
- **Emerging consensus vs. unresolved ABR case** (as of Apr 19): Alan/Luke/Victor converging on a narrow LargestGroup/CurrentGroup filter for the join-live case; Gwendal contends this does not satisfy the charter's ABR-switching requirement and keeps pushing the SWITCH / Joining-PUBLISH path.
- **PR #1604** (Apr 10, updated Apr 16) - [[martin-duke]] implements #1602 to move Joining FETCH onto the SUBSCRIBE/PUBLISH stream. [[alan-frindell]] reviewed, noting subscriber priority cannot differ between fetch and subscription.
- **PR #1490** (Merged Apr 14) - FILL_TIMEOUT parameter: subscriber's max wait to fill a gap in a FETCH range before Unknown. Addresses part of #1023.
- **draft-duke-moq-subscribe-rewind-02** (Apr 2) - Updated Rewind draft published with refined subscription filter semantics.
- **#1603** (Apr 10-11) - [[martin-duke]] questions required-request-id. [[ian-swett|Ian Swett]] supports simplification, calling it unclear what functionality it provides. He also notes Joining FETCH's dependency on another Request as a design concern.
- **#1602** (Apr 9) - [[martin-duke]] proposes moving Joining Fetch to SUBSCRIBE/PUBLISH stream, eliminating race conditions
- **#1601** (Closed) - Race condition in current design
- Restriction requiring "largest object" subscribes was removed

## Debate at Interim 13
- **[[will-law]]**: Do OTT players actually benefit from REWIND if they require a complete buffer before playback?
- **[[luke-curley]] + Victor Vasiliev**: Best-effort rewind forces relays into complex upstream-fetching logic
- **Cullen Jennings**: Keep relays simple; push joining complexity into client libraries
- **Will Law (counter)**: Only relays have cache visibility to make optimal decisions

# Related

- [[joining-fetch]] - Current mechanism
- [[moq-transport]] - Protocol spec
- [[martin-duke]] - Rewind proposal author
- [[alan-frindell]] - Join Filters proposal author
