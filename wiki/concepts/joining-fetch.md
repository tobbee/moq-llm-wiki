---
title: "Joining Fetch"
tags: [concept, transport, live-streaming]
date: 2026-04-10
last_updated: 2026-06-22
status: current
---

Mechanism in [[moq-transport]] for subscribers to fetch historical data when joining a live session.

> **2026-06-22 — Joining FETCH is being replaced by "fill fetch".** At the June 11–12 London interim the WG reached consensus that **fill fetch replaces Joining FETCH**: subscription filters that deliver past groups over fetch-formatted unidirectional streams. The standalone Joining-FETCH redesign [PR #1604](https://github.com/moq-wg/moq-transport/pull/1604) was **CLOSED June 4** (it lost its rationale once Required Request ID was removed in draft-18, #1615). The replacement is **afrind's [PR #1673](https://github.com/moq-wg/moq-transport/pull/1673)** *"Replace Joining FETCH with fill fetch streams"* (June 14, OPEN, revises [PR #1642](https://github.com/moq-wg/moq-transport/pull/1642), closes #1023). The related filter machinery is **Mo Zanaty's [Range Filters PR #1765](https://github.com/moq-wg/moq-transport/pull/1765)** (June 16, OPEN) — the active design thrust, held behind the June editorial freeze pending the June 22 interim. See [[joining-fetch-dissent]], [[interim-meetings]], [[discussions-2026-06]].

# Problem

When a subscriber joins a live stream, they need to "catch up" - for example, fetching the latest keyframe and subsequent data to start rendering immediately.

# Mechanism (draft-17/18 → fill fetch)

A **Joining FETCH** could be initiated for any subscription at any time. It fetches data up to the "Joining Location" - the point where live subscription data begins (clarified in PR #1577; the earlier "largest object" restriction was removed, [[alan-frindell]] 2026-04-09 Slack).

As of draft-18 this is being superseded. The **fill fetch** design instead lets a subscription's filter request past groups: the pre-Largest-Object portion arrives on a separate **unidirectional fill-fetch stream** in FETCH wire format, alongside live objects on the subscription. [[victor-vasiliev|Victor Vasiliev]] noted fill-fetch removes Joining FETCH's race/edge-case hazards; [[ali-begen|Ali Begen]] pushed for it to reach groups beyond just the current group. The new filter types include `CurrentGroup` (the old LargestGroup/CurrentGroupFill idea, now folded in).

# How It Got Here (April debate → June consensus)

Through mid-April 2026 there were five competing proposals for joining a live stream:

1. **Joining Fetch** (then in draft-17) - Fetch historical data alongside a live subscription
2. **Subscribe Rewind** ([[martin-duke]]) - [draft-duke-moq-subscribe-rewind](https://datatracker.ietf.org/doc/draft-duke-moq-subscribe-rewind/) - a Rewind subscription filter
3. **Join Subscription Filters** ([[alan-frindell]]) - filter-based join-point selection ("more of an extension to Martin's")
4. **LargestGroup / CurrentGroup / CurrentGroupFill** filters ([[victor-vasiliev]] [PR #1607](https://github.com/moq-wg/moq-transport/pull/1607), afrind CurrentGroupFill, [[luke-curley]]'s LargestGroup)
5. **SWITCH** ([[gwendal-simon]] [PR #1378](https://github.com/moq-wg/moq-transport/pull/1378)) - framed as a charter ABR deliverable. See [[switch-abr]].

A REWIND consensus call (chair [[magnus-westerlund]], deadline **May 1**) closed **without a chair conclusion** — the outcome was a split. REWIND was then **de facto parked**: `draft-duke-moq-subscribe-rewind` stayed frozen at **-02** with no further revisions, its function folded into fill fetch. The five-way contest collapsed at the **London interim (June 11–12)** into two consolidated workstreams: **fill fetch** (this page) and **SWITCH_FROM** for ABR track switching (see [[switch-abr]]), with **Range Filters** ([PR #1765](https://github.com/moq-wg/moq-transport/pull/1765)) the live wire-design item for the filter dimension.

PRs #1604 (Joining FETCH on SUBSCRIBE stream) and #1607 (LargestGroup filter) were both **CLOSED June 4**. See [[joining-fetch-dissent]] for the full proposal-by-proposal history.

# Related

- [[joining-fetch-dissent]] - The April five-way debate and its consolidation
- [[switch-abr]] - SWITCH_FROM, the sibling ABR-switching workstream
- [[moq-transport]] - Protocol spec
- [[publish-subscribe]] - Subscription model
- [[adaptive-bitrate]] - ABR implications of join point selection
