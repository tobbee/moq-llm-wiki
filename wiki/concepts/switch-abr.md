---
title: "SWITCH and Client-Side ABR"
tags: [concept, transport, abr, media]
date: 2026-04-10
last_updated: 2026-07-03
status: current
---

# Background

Adaptive bitrate (ABR) track switching was one of the most debated topics in MOQ: does the transport layer need a dedicated SWITCH message, or is subscription churn enough? In traditional ABR streaming (HLS/DASH), the client decides which quality to fetch next. In MOQ's [[publish-subscribe]] model, switching quality means changing which track you subscribe to, so the central question was whether SUBSCRIBE/UNSUBSCRIBE is sufficient or a dedicated SWITCH message is needed. Underneath it lies a deeper tension: should the publisher or the subscriber decide quality?

# Design options and rationale

The original proposal was a transport-level SWITCH message for seamless client-side ABR — a control message that atomically transitions a subscription from one track to another. It came from [[gwendal-simon|Gwendal Simon]]. A later redesign replaced the original FETCH+SUBSCRIBE catch-up delivery with **relay-initiated PUBLISH + inline catch-up**: instead of a SWITCH triggering a separate FETCH for catch-up data and a new SUBSCRIBE for live data (which required coordinating two delivery streams), the catch-up data is delivered inline on the PUBLISH bidirectional stream with the relay initiating the PUBLISH, avoiding the complexity of coordinating separate FETCH and SUBSCRIBE delivery during a switch.

The community was split three ways on where switching should live:

1. **Transport-level SWITCH** — atomic transition with relay-initiated PUBLISH + catch-up.
2. **Application-level switching** — just UNSUBSCRIBE the old track and SUBSCRIBE the new one, keeping the transport simple.
3. **Sender-side ABR** — the publisher decides quality while the subscriber specifies constraints.

The case for treating SWITCH as a first-class mechanism rather than an optional extension rested on several durable points: the MoQ charter explicitly lists ABR switching, so relegating it to extensions or "V2" would contradict the charter. During a track switch a subscriber is "almost always behind the live edge" (from congestion or intentional buffering), so switching is not an edge case. ABR switching needs an arbitrary range of past groups, whereas the joining direction (LargestGroup/CurrentGroup/CurrentGroupFill, see [[joining-fetch-dissent]]) covers only one group. The real blocker was identified as a semantic constraint rather than head-of-line blocking: past objects are not allowed in a PUBLISH stream, so the ask was a scoped reconsideration of that rule — a "Joining PUBLISH with live semantics." Informed client-side decisions also depend on the subscriber being able to learn the sender's send rate — a CMSD-equivalent for MOQ.

# How it resolved

The WG did not adopt a standalone SWITCH message. Instead it split ABR into three pieces:

- **ABR track switching** → the **`SWITCH_FROM` parameter**, chosen over the standalone message. [[alan-frindell|Alan Frindell]] opened the PRs; consensus was to proceed with "hard mode" and defer softer modes pending use-case analysis.
- **Arbitrary past-group retrieval** (the "almost always behind the live edge" case) → **fill fetch** + **Range Filters**, delivering the catch-up portion on a separate unidirectional fill-fetch stream, which relaxes the "past objects not allowed on a PUBLISH stream" semantic constraint. See [[joining-fetch]].
- **Decode-timestamp signaling** → first headed toward an extension, [`draft-ietf-moq-dts4moq`](https://datatracker.ietf.org/doc/draft-ietf-moq-dts4moq/), after a finding that base-spec integration lacked rough consensus.

So ABR is delivered as `SWITCH_FROM` (in-spec) + fill fetch/Range Filters (in-spec) + decode-timestamp signaling (extension) rather than a standalone SWITCH / Joining-PUBLISH design.

The switching mechanism was then renamed from "Dynamic Track Switching" (DTS) to **Sender-Side Track Switching (SSTS)**, which more accurately reflects the functionality: a publisher exposes a **switching set** of renditions and the relay forwards exactly one, toggling the forward state to switch. Rather than freezing one algorithm, switching is keyed by a **numeric algorithm ID in an IANA registry**, negotiated via an array of preferred algorithms (the client requests, the relay answers with its supported set) advertised through an **`SSTS_ALGORITHMS`** setup parameter. A mandatory baseline, **"Algorithm Zero"** (throughput thresholds + activation rules), is folded into the base spec, with future algorithms extending a **`SWITCHING-SET-ASSIGNMENT`** base framework. Switching-set assignment uses a single message, and unsubscription auto-removes a track from the set. Per-switching-set concurrent-track / throughput (D)DoS limits were dropped in favor of authorization tokens plus existing relay-side protections.

# Recent Highlights

Day-by-day PR/issue activity lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **First working SSTS demo**: [[will-law|Will Law]] presented [[yu-you|Yu You]]'s Nokia run — a single switching set of **500/1500/3000 kbps** with the relay forwarding one rendition, showing "smooth, continuous switching" including fast-frequency switching close to segment boundaries.

# Related

- [[adaptive-bitrate]] - ABR overview in MOQ
- [[moq-transport]] - Protocol spec
- [[publish-subscribe]] - Subscription model
- [[moq-msf]] - Streaming format with ABR support
