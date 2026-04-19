---
title: "SWITCH and Client-Side ABR"
tags: [concept, transport, abr, media]
date: 2026-04-10
last_updated: 2026-04-19
status: current
---

One of the most debated topics in MOQ - whether the transport layer needs a dedicated SWITCH message for adaptive bitrate track switching.

# Background

In traditional ABR streaming (HLS/DASH), the client decides which quality to fetch next. In MOQ's [[publish-subscribe]] model, switching quality means changing which track you subscribe to. The question is whether SUBSCRIBE/UNSUBSCRIBE is sufficient or a dedicated SWITCH message is needed.

# PR #1378 - SWITCH for Client-Side ABR

**Author**: Gwendal Simon (Nov 2025)
**Labels**: Needs Discussion, ABR, Design

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

This positions SWITCH as the only design currently on the table that actually addresses mid-stream quality switching inside V1, and sets up a tension with the LargestGroup/CurrentGroup convergence in [[joining-fetch-dissent]].

# Related

- [[adaptive-bitrate]] - ABR overview in MOQ
- [[moq-transport]] - Protocol spec
- [[publish-subscribe]] - Subscription model
- [[moq-msf]] - Streaming format with ABR support
