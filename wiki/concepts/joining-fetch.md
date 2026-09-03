---
title: "Fill Fetch (formerly Joining Fetch)"
tags: [concept, transport, live-streaming]
date: 2026-04-10
last_updated: 2026-09-02
status: current
---

How a subscriber to [[moq-transport]] catches up on past data when joining an ongoing live Track.

**Current mechanism**: **fill fetch**, shipped in **draft-20** (2026-08-31).
**Superseded mechanism**: **Joining FETCH** — present through draft-19, **removed** in draft-20 ([PR #1673](https://github.com/moq-wg/moq-transport/pull/1673)), along with the "standalone" FETCH moniker.
**Spec sections** (draft-20): §5.1.3 Fill Semantics, §5.1.3.1 Opening and Closing Fill Fetch Streams, §5.1.6 Joining an Ongoing Track, §10.2.15 `FILL_PARAMETERS`.

# Problem

A subscriber joining a live stream needs to "catch up" — typically fetching the latest keyframe and what follows, so it can start rendering immediately rather than waiting for the next Group boundary.

# Mechanism (draft-20, as shipped)

A subscription that carries the **`FILL_PARAMETERS`** parameter causes the publisher to open a **unidirectional fill fetch stream**, beginning with a `FETCH_HEADER` and delivered as a FETCH response. Objects arriving on it are *fill-delivered*; objects arriving on the subscription's own subgroups/datagrams are *subscription-delivered*.

- **Fill range**: the Locations selected by the Location filter *inside* `FILL_PARAMETERS`, or the subscription's own Location filter if that is omitted. It is evaluated with the Fetch rules, so **the fill range never extends beyond Largest Object**. A zero-length or absent Location filter means the whole track up to Largest Object. The subscriber learns Largest Object from the `LARGEST_OBJECT` parameter in `SUBSCRIBE_OK` / `REQUEST_UPDATE_OK`.
- Because the fill range is specified **independently** of the subscription's filter, a subscriber can pull a range of past Groups while the subscription itself starts at the Next Group. An empty fill range, or one starting after Largest Object, opens no stream.
- **Inheritance**: the fill fetch stream inherits the subscription's subscriber priority, range filters and authorization; parameters inside `FILL_PARAMETERS` override them for the fill. `FILL_TIMEOUT` applies as it does to a FETCH — Objects abandoned when it expires are signalled with **End of Timed-Out Range** ([#1822](https://github.com/moq-wg/moq-transport/pull/1822)).
- **Multiple concurrent fills**: the `FETCH_HEADER` carries the Request ID of whatever initiated it (the `SUBSCRIBE` for the initial fill, a `REQUEST_UPDATE` for a later one), so a subscription can have several fill fetch streams open at once. Opening a new one does not implicitly cancel earlier ones.
- **Forward State interaction**: `FILL_PARAMETERS` carried while Forward State is 0 opens no stream, and transitioning to Forward State 1 without re-sending it does not open one either. A `REQUEST_UPDATE` without `FILL_PARAMETERS` opens no new fill.
- **Completion and failure**: the publisher FINs the stream when the fill range is fully delivered. There is **no `REQUEST_ERROR` for a fill fetch stream** — failure is signalled by *resetting* the stream, and the publisher MUST open the stream and reset it right after the `FETCH_HEADER` if it has to. A subscriber cancels with `STOP_SENDING`. Resetting or cancelling the fill never affects the subscription, which keeps delivering.
- **Duplicates**: where the fill range overlaps the subscription's Location filter, an Object can be **both** fill- and subscription-delivered. A subscriber wanting exactly-once delivery uses the **Next Object** subscription Location Filter plus an **open-ended fill range**, which the publisher ends at Largest Object. Scheduling between fill-delivered and subscription-delivered Objects is defined by [#1673](https://github.com/moq-wg/moq-transport/pull/1673).

## The four join patterns (§5.1.6)

| Goal | How |
|---|---|
| Join **immediately** | `SUBSCRIBE` with a Location Filter starting at **Next Object**; delivery begins with the next Object and can begin mid-Group |
| Join at the **current Group** | Location Filter starting at Next Object **+** `FILL_PARAMETERS` whose Location filter has `StartGroup=1`, filling the current Group from its start |
| Join at a **past Group** | `SUBSCRIBE` with `FILL_PARAMETERS` whose Location filter selects the intended Groups (may be relative); the fill range arrives on the fill fetch stream, live Objects on the subscription |
| Join at the **next Group** | `SUBSCRIBE` with a Location Filter starting at **Next Group** |

**Dynamically starting new Groups** (§5.1.6.1): a joining subscriber may find it cheaper to ask the Original Publisher to start a new Group than to fill the current one. Publishers advertise this with the **`DYNAMIC_GROUPS` Track Property** (Property Type `0x30`, §12.6).

**Relays** (§7): a relay receiving a `SUBSCRIBE` with `FILL_PARAMETERS` serves the fill from its cache where it can, and otherwise goes upstream with either a `SUBSCRIBE` carrying `FILL_PARAMETERS` or a FETCH.

# How it got here (April debate → June consensus → draft-20)

Through mid-April 2026 there were five competing proposals for joining a live stream:

1. **Joining Fetch** (then in draft-17) — fetch historical data alongside a live subscription
2. **Subscribe Rewind** ([[martin-duke]]) — [draft-duke-moq-subscribe-rewind](https://datatracker.ietf.org/doc/draft-duke-moq-subscribe-rewind/), a Rewind subscription filter
3. **Join Subscription Filters** ([[alan-frindell]]) — filter-based join-point selection ("more of an extension to Martin's")
4. **LargestGroup / CurrentGroup / CurrentGroupFill** filters ([[victor-vasiliev]] [PR #1607](https://github.com/moq-wg/moq-transport/pull/1607), afrind's CurrentGroupFill, [[luke-curley]]'s LargestGroup)
5. **SWITCH** ([[gwendal-simon]] [PR #1378](https://github.com/moq-wg/moq-transport/pull/1378)) — framed as a charter ABR deliverable. See [[switch-abr]].

A REWIND consensus call (chair [[magnus-westerlund]], deadline **May 1**) closed **without a chair conclusion** — the outcome was a split. REWIND was then de facto parked: `draft-duke-moq-subscribe-rewind` stayed frozen at **-02**, its function folded into fill fetch. PRs [#1604](https://github.com/moq-wg/moq-transport/pull/1604) (Joining FETCH on the SUBSCRIBE stream) and #1607 (LargestGroup filter) were both **closed June 4** — #1604 lost its rationale once Required Request ID was removed in draft-18 ([#1615](https://github.com/moq-wg/moq-transport/pull/1615)).

At the **London interim (June 11–12)** the five-way contest collapsed into two workstreams: **fill fetch** (this page) and **`SWITCH_FROM`** for ABR track switching ([[switch-abr]]), with **Range Filters** ([#1765](https://github.com/moq-wg/moq-transport/pull/1765), [[mo-zanaty|Mo Zanaty]]) the filter-dimension wire design. Range Filters landed in **draft-19**; the fill-fetch replacement — afrind's [#1673](https://github.com/moq-wg/moq-transport/pull/1673), revising [#1642](https://github.com/moq-wg/moq-transport/pull/1642) and closing [#1023](https://github.com/moq-wg/moq-transport/issues/1023) — landed in **draft-20**, roughly two and a half months after the consensus.

[[victor-vasiliev|Victor Vasiliev]] had argued fill fetch removes Joining FETCH's race and edge-case hazards; [[ali-begen|Ali Begen]] pushed for it to reach Groups beyond just the current one — both are reflected in the shipped design's independent fill range.

# Open points against the shipped text

[[cullen-jennings|Cullen Jennings]] argued for keeping Joining FETCH pending operational experience and flagged three concerns; draft-20 addresses two of them explicitly, so what remains is implementation experience rather than open design:

- **Error delivery** — answered: no `REQUEST_ERROR` exists for a fill; failure is a stream reset after the `FETCH_HEADER` (§5.1.3.1).
- **Duplicate objects** — answered: overlap is legal and named, with a documented exactly-once recipe (Next Object filter + open-ended fill range).
- **Nested `FILL_PARAMETERS`** — `FILL_PARAMETERS` carries a sequence of Parameters ([#1868](https://github.com/moq-wg/moq-transport/pull/1868)) that override the subscription's for the fill; how deeply that nests is still worth watching.

Also live: [[victor-vasiliev|vasilvv]]'s [issue #1889](https://github.com/moq-wg/moq-transport/issues/1889) asks the draft to document **how the several subscription-pausing mechanisms interact** — Range/Location filters, FORWARD-based pausing and subscription state — which now includes the Forward-State rules above.

# Related

- [[joining-fetch-dissent]] — the April five-way debate, proposal by proposal
- [[switch-abr]] — `SWITCH_FROM`, the sibling ABR-switching workstream
- [[moq-transport]] — protocol spec
- [[publish-subscribe]] — subscription model
- [[adaptive-bitrate]] — ABR implications of join-point selection
