---
title: "SWITCH and Client-Side ABR"
tags: [concept, transport, abr, media]
date: 2026-04-10
last_updated: 2026-06-23
status: current
---

One of the most debated topics in MOQ - whether the transport layer needs a dedicated SWITCH message for adaptive bitrate track switching.

> **2026-06-23 — DTS is renamed SSTS, and the switching algorithm becomes an extensible IANA registry.** The [[interim-meetings|June 22 interim]] (minutes posted June 23 as [interim-2026-moq-17](https://datatracker.ietf.org/doc/minutes-interim-2026-moq-17-202606221630/)) closed the design questions left open after the spring SWITCH/DTS consensus call:
> - **Rename**: *"Dynamic Track Switching" (DTS) → "Sender Side Track Switching" (SSTS)* — *"this title more accurately reflects the functionality"* (RFC editors keep final naming say). The mechanism: a publisher exposes a **switching set** of renditions and the relay forwards exactly one, toggling the forward state to switch.
> - **Extensible algorithm**: rather than freezing one algorithm, switching is keyed by a **numeric ID in an IANA table**, negotiated via an **array of preferred algorithms** (client requests, relay answers with its supported set). The current implementation is the mandatory **"Algorithm Zero"** baseline in the base spec; future algorithms register + negotiate.
> - **DDoS-protection properties removed**: the per-switching-set **concurrent-track / throughput limits** (the (D)DoS vector [[gwendal-simon|Gwendal Simon]] flagged on DTS [PR #1638](https://github.com/moq-wg/moq-transport/pull/1638)) are **dropped from negotiated properties** — protection is deferred to **authorization tokens + existing relay-side mechanisms**.
> - **Message shape**: keep **single-message** switching-set assignment (the WG decided against splitting it); **unsubscription auto-removes** a track from the set (no explicit removal message).
> - **Demo**: [[will-law|Will Law]] presented [[yu-you|Yu You]]'s Nokia run — one set of **500/1500/3000 kbps**, relay forwarding one, *"smooth, continuous switching"* including *"fast-frequency switching close to segment boundaries."*
>
> The DTS half of the May consensus call had been heading toward a standalone extension draft (`draft-ietf-moq-dts4moq`, still unsubmitted/404); the interim instead folds the baseline ("Algorithm Zero") into the **base spec** with an IANA registry for future algorithms. See [[interim-meetings]], [[discussions-2026-06]].
>
> **2026-06-22 — Resolved as a parameter, not a message.** At the June 11–12 London interim the WG chose to deliver ABR track switching via a **`SWITCH_FROM` parameter** rather than [[gwendal-simon|Gwendal Simon]]'s standalone SWITCH message ([PR #1378](https://github.com/moq-wg/moq-transport/pull/1378), now effectively parked). [[alan-frindell]] opened **[PR #1674 "Track Switching via the SWITCH_FROM parameter"](https://github.com/moq-wg/moq-transport/pull/1674)** + **[PR #1675](https://github.com/moq-wg/moq-transport/pull/1675)** (soft mode) on June 14; consensus was to proceed with **"hard mode"** and defer softer modes pending use-case analysis. The DTS/SWITCH consensus call (May 21–June 4) drew 4 on-list YES votes (Will Law, Gwendal, Nokia/Yu You, Ali Begen); **DTS** itself proceeds as an extension, [`draft-ietf-moq-dts4moq`](https://datatracker.ietf.org/doc/draft-ietf-moq-dts4moq/), after the June 10 finding that base-spec integration lacked rough consensus. The catch-up/joining half is handled by **fill fetch** + **Range Filters** ([[joining-fetch-dissent]]). See [[interim-meetings]], [[discussions-2026-06]].

# Background

In traditional ABR streaming (HLS/DASH), the client decides which quality to fetch next. In MOQ's [[publish-subscribe]] model, switching quality means changing which track you subscribe to. The question is whether SUBSCRIBE/UNSUBSCRIBE is sufficient or a dedicated SWITCH message is needed.

# PR #1378 - SWITCH for Client-Side ABR (superseded)

**Author**: [[gwendal-simon|Gwendal Simon]] (Nov 2025)
**Labels**: Needs Discussion, ABR, Design
**Status**: still OPEN but **superseded in direction** — London chose the `SWITCH_FROM` parameter approach (PR #1674/#1675) over this standalone message.

Proposes a SWITCH message at the transport level to enable seamless client-side ABR. The PR adds a new control message that atomically transitions a subscription from one track to another.

# Issue #1354 - Why do we need a dedicated SWITCH message?

**Author**: Ali C. Begen
**Comments**: 39 (most discussed open issue)

The issue consolidates the history of ABR discussions in MOQ:
- **#259** - Sender-side ABR: publisher decides what to send based on congestion
- **#370** - Probing track approach for bandwidth estimation
- **#471** - Client-side upswitch causing excessive bandwidth

The core tension: should the publisher or subscriber make quality decisions?

# Related Open Issues

- **#1507** - Mechanism to get sender's bitrate (Luke Curley). Equivalent to CMSD for MOQ. Essential for client-side ABR to make informed decisions.
- **#1453** - Send Rate parameter (Will Law). Publisher-reported send rate.
- **#1365** - If you can't deliver an entire Group, should you send any Objects? Affects ABR drop behavior.
- **#1352** - SUBSCRIBE doesn't need a forward parameter if we have filters (Parked)

# Major Redesign (April 15-16, 2026)

Gwendal Simon pushed 7 commits significantly reworking the SWITCH mechanism. The new design replaces the previous **FETCH+SUBSCRIBE delivery** with **relay-initiated PUBLISH + inline catch-up**:

- **Old approach**: SWITCH triggered a FETCH for catch-up data and a new SUBSCRIBE for live data, requiring coordination between two delivery streams
- **New approach**: Catch-up data is delivered inline on the PUBLISH bidirectional stream, with the relay initiating the PUBLISH. This avoids the complexity of coordinating separate FETCH and SUBSCRIBE delivery during track switches.

The PR remains labeled "Needs Discussion" and hasn't been merged or closed. The community is split between:

1. **Transport-level SWITCH** (PR #1378) - Atomic transition with relay-initiated PUBLISH + catch-up
2. **Application-level switching** - Just UNSUBSCRIBE old track + SUBSCRIBE new track, keep transport simple
3. **Sender-side ABR** - Publisher decides quality, subscriber specifies constraints

# Charter-Alignment Argument (Apr 18, 2026)

In a [mailing-list reply on the REWIND consensus call](https://mailarchive.ietf.org/arch/msg/moq/1DoFuRdZDWMVXb9e7AXxpgR_EZ8/) (Apr 18), Gwendal Simon reframed SWITCH as **a charter deliverable**, not an optional extension:

- The MoQ charter explicitly lists ABR switching, so relegating it to "innovation for extensions or V2" contradicts the charter.
- During a track switch a subscriber is "almost always behind the live edge" (congestion or intentional buffering both create lag), so switching is not an edge case.
- The emerging **LargestGroup / CurrentGroup / CurrentGroupFill** direction (see [[joining-fetch-dissent]]) covers *joining* but only one group — ABR switching needs "an arbitrary range of past groups."
- The real blocker is a **semantic constraint**, not head-of-line blocking: past objects are currently not allowed in a PUBLISH stream. His ask is a scoped reconsideration of that rule.
- His proposed solution is a **Joining PUBLISH with live semantics**, prototyped in PR #1378.

This positioned SWITCH as the only April design on the table addressing mid-stream quality switching inside V1, in tension with the LargestGroup/CurrentGroup convergence in [[joining-fetch-dissent]].

# How It Resolved (June 2026)

Gwendal's charter argument was **addressed structurally, but not via his standalone SWITCH message**. The WG split the problem in three:
- **ABR track switching** → the **`SWITCH_FROM` parameter** (PR #1674 hard mode, PR #1675 soft mode; afrind, June 14). London consensus: proceed with hard mode, defer soft.
- **Arbitrary past-group retrieval** (Gwendal's "almost always behind the live edge" case) → **fill fetch** ([PR #1673](https://github.com/moq-wg/moq-transport/pull/1673)) + **Range Filters** ([PR #1765](https://github.com/moq-wg/moq-transport/pull/1765)). The "past objects not allowed on a PUBLISH stream" semantic constraint Gwendal flagged is relaxed by delivering the catch-up portion on a separate unidirectional fill-fetch stream. See [[joining-fetch]].
- **Decode-timestamp signaling** (the DTS half of the SWITCH/DTS consensus call) → an extension, [`draft-ietf-moq-dts4moq`](https://datatracker.ietf.org/doc/draft-ietf-moq-dts4moq/) (June 10 finding: no rough consensus for base-spec, no objection to an extension).

So ABR is being delivered as **SWITCH_FROM (in-spec) + fill fetch/Range Filters (in-spec) + DTS (extension)** rather than Gwendal's original standalone SWITCH / Joining-PUBLISH design.

# Related

- [[adaptive-bitrate]] - ABR overview in MOQ
- [[moq-transport]] - Protocol spec
- [[publish-subscribe]] - Subscription model
- [[moq-msf]] - Streaming format with ABR support
