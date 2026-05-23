---
title: "Media over QUIC Transport (MOQT)"
tags: [draft, transport, core]
date: 2026-04-13
last_updated: 2026-05-23
status: current
draft_version: 18
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-transport/"
---

**draft-ietf-moq-transport-18** | published 2026-05-12 | [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-transport/18/)

# Draft-18 Implementation Status (as of 2026-05-20)

| Implementation | Stack | Maintainer | Status | Public endpoint |
|---|---|---|---|---|
| **[[moq-dev|moq-dev/moq]]** | Rust + JS | [[luke-curley|kixelated]] | Shipped May 18 05:08 UTC ([PR #1418](https://github.com/moq-dev/moq/pull/1418), +1431/−477) | `cdn.moq.dev/anon` (claims draft-18, untested) |
| **[[imquic|meetecho/imquic]]** | C | [[lorenzo-miniero]] | `moq-18` branch ready; merge gated on [interop-runner PR #68](https://github.com/englishm/moq-interop-runner/pull/68). Lorenzo May 19 15:40 UTC: *"finished the bulk of the work and the rest can wait"*. | lminiero.it:9000 (raw QUIC + WebTransport, served from branch) |
| **[mondain/moqxr](https://github.com/mondain/moqxr)** | C++ | Paul Gregoire ([[openmoq]] member) | Shipped May 16–18; **8 fix-up commits May 19 14:17 → May 20 00:11 UTC** after Lorenzo found a bidi-vs-uni SETUP-stream divergence in first interop attempt | — |
| [[moq-rs\|cloudflare/moq-rs]] | Rust | [[mike-english]] | Not yet (Day +37 main-quiet) | — |
| [[moq-rs\|google/quiche moqt]] | C++ | [[martin-duke]] / [[victor-vasiliev]] | Not yet (Day +8 quiet on draft-18 wire path; martinduke May 18-19 commits are refactors not wire-bumps) | — |
| [[moqtail]] | Rust | Zafer Gurel | Not yet (Day +7 quiet) | — |
| [[interop-runner]] matrix | (target only) | [[mike-english]] | Target is **still draft-16** ([PR #68](https://github.com/englishm/moq-interop-runner/pull/68) Open, CI work in progress) | — |

**6 days after publication, draft-18 has 3 distinct codebases shipped + 1 production deployment** — fastest spec → first-impl turnaround the wiki has tracked (draft-17: ~3 weeks; draft-16: ~2 weeks). The accelerants: (1) the Claude-co-authored PR pattern on moq-dev/moq; (2) draft-18's small-delta scope (7-byte varint, FIRST_OBJECT bit, RequestID removal, LARGEST_OBJECT) lets implementations stage changes incrementally on draft-17 plumbing.

# Authors
- [[alan-frindell]] (Meta)
- [[ian-swett]] (Google)
- [[suhas-nandakumar]] (Cisco)
- [[victor-vasiliev]] (Google)

# Abstract

MOQT is a publish/subscribe protocol that runs over QUIC and WebTransport. It leverages transport capabilities including streams, datagrams, priorities, and partial reliability. MOQT enables content delivery both directly between endpoints and through intermediate [[relays]], achieving scalable low-latency distribution. **Despite its name referencing media, the specification emphasizes that MOQT remains content-agnostic and applicable across various use cases** (abstract reframing in draft-18 — see [[discussions-2026-05]] for Will Law's parallel May 12 recharter proposal).

# Recent Changes (draft-18, published 2026-05-12)

The draft-18 cut was assembled in two phases of merges to `main`:

**Phase 1 — May 11 21:32–22:02 UTC editorial sprint (6 PRs in 30 min):**
- **PR #1544** — *Improve Startup Latency and 0-RTT* (ianswett, fixes #420 #83). New sections on reducing startup latency / 0-RTT flow with WebTransport.
- **PR #1615** — ***Remove Required Request ID*** (ianswett, fixes #1603). **Materialises the Apr 27 interim consensus**. Required Request IDs are removed; Request IDs remain for individual requests (used by Joining FETCH and GOAWAY).
- **PR #1617** — *Allow GOAWAY on request streams to migrate individual requests* (afrind, fixes #1481). Per-request GOAWAY with zero-length URI causes endpoint to re-issue request on the specified URI session.
- **PR #1618** — *Add FIRST_OBJECT bit to SUBGROUP_HEADER type* (afrind). Bit 6 (0x40) signals subgroup contains the first object published by the original publisher; type byte expands 0b00X1XXXX → 0b0XX1XXXX (still 1-byte varint).
- **PR #1621** — *Forbid relays from lying about LARGEST_OBJECT* (afrind, fixes #1386).
- **PR #1629** — *Clarify definition of scope* (vasilvv, fixes #1432).

**Phase 2 — May 12 20:02–23:07 UTC final merges (3 PRs):**
- **PR #1625** — *Improve Security Considerations section* (suhasHere, +118/−7). Rebases / extends [[magnus-westerlund]]'s long-parked PR #1455. **Closes Issue #783**.
- **PR #1605** — *Split DELIVERY_TIMEOUT into two types of timeout* (vasilvv, +114/−76). `OBJECT_DELIVERY_TIMEOUT` (more precisely defined replacement for `DELIVERY_TIMEOUT`) + new `SUBGROUP_DELIVERY_TIMEOUT` (covers subgroups fully queued but not fully delivered). **Closes Issue #667** (DELIVERY_TIMEOUT is unimplementable).
- **PR #1630** — *Draft 18 release notes* (afrind, +59/0). Body: *"Behold"*.

Datatracker upload followed at approximately May 12 23:30 UTC; afrind announcement on Slack `#moq` at May 13 01:15 CEST: *"It's heeeeere"*.

# Key Concepts

- **[[publish-subscribe]]**: Core messaging pattern - PUBLISH, SUBSCRIBE, FETCH, REQUEST_OK/REQUEST_ERROR, PUBLISH_DONE
- **[[subgroups-and-objects]]**: Data hierarchy: Track > Group > Subgroup > Object
- **[[relays]]**: First-class relay support for CDN-style distribution
- **[[track-properties]]**: Metadata attached to tracks and objects via Key-Value Pairs
- **[[joining-fetch]]**: Mechanism to fetch historical data when joining a live session
- **[[qmux]]**: TCP fallback via QUIC multiplexing over TLS+TCP
- **URI Scheme**: `moqt://` URI scheme with fragment identifier support (PR #1571)

# Recent Changes (draft-17, published 2026-03-02)

Draft-17 brought significant changes from draft-16:
- Unidirectional control streams for 0-RTT subscribe capability
- SUBSCRIBE_NAMESPACE split into two messages: SUBSCRIBE_NAMESPACE (namespace info) and SUBSCRIBE_TRACKS (PUBLISH notifications)
- Subscription filters moved to be a Param (PR #1590)
- Track Properties added to REQUEST_OK (PR #1576)
- Allow 7-byte varint and non-minimal encodings (PR #1595)
- Editorial: consistent use of "MOQT" for protocol references (PR #1597)
- Editorial: use "message" instead of "frame" (PR #1587)

# Active Issues (as of 2026-05-20)

## Design Issues
- **#1636** — *Empty namespace clarification*. OPENED May 21 10:50 UTC by RichLogan (Cisco). Body: *"I was just reading the draft-18 text regarding namespace prefixes and full track names and wanted to clarify the rules for our implementation. I understand the use-case for zero element namespace prefixes, but wanted to check that publishing a track with a zero element namespace is allowed, and in theory, given the text as it is today, a track with a zero element namespace AND an empty name is also allowed?"* — **3-comment AI-hallucination incident May 22**: afrind 18:24 UTC initial reply (prefixed *"With apologies for answering your question with AI"*) hallucinated *"between 1 and 32 Track Namespace Fields"* + non-existent line numbers (511 / 544-546 / 3107-3108) claiming 0-element namespaces are a PROTOCOL_VIOLATION; RichLogan 21:15 UTC catches the hallucination by quoting the actual draft-18 §2.4.1 text (*"between 0 and 32 Track Namespace Fields"*); afrind 21:45 UTC explicit apology — *"Wow, that is pretty embarrassing. I apologize. It spit out that sentence about 1 and 32 and that seemed familiar I didn't double check it. Ouch."* — **first explicit on-record acknowledged-AI-hallucination on `moq-wg/moq-transport` by an editor in spec discussion**. Substantive question (allow vs. forbid 0-element namespace + empty name) remains open; afrind tentatively in favour of allowing (*"sort of like path=/ in HTTP"*). Belongs in the *"draft-18 ambiguity backlog"* alongside #1633/#1634/#1635 (afrind May 19 tranche) and #1632 (yuanchao-chris May 14 Properties Type collision).
- **#1635** — *[draft-18] Should a subscriber treat FIN/RST on a bidi stream as equivalent to PUBLISH_DONE?* OPENED May 19 18:37 UTC by [[alan-frindell|afrind]]. Body: *"PUBLISH_DONE conveys error information as well as stream count. Seems like FIN without PUBLISH_DONE is entirely avoidable and could be a PROTOCOL_VIOLATION?"* First subscriber-side post-publication control-stream-lifecycle question.
- **#1634** — *[draft-18] What semantics do FIN or RST on a request stream carry?* OPENED May 19 18:34 UTC by [[alan-frindell|afrind]]. Quotes §4.5 + §3.6 (`STOP_SENDING` is the canonical cancellation) and asks what action a receiver should take on a bare FIN or RST_STREAM. Self-comment May 19 21:45 UTC: *"FIN almost always isn't a cancellation... For TRACK_STATUS an early FIN is perfectly normal. For requests like FETCH, PUB_NS, SUB_NS, SUB_T and SUBSCRIBE, an early FIN can mean 'I don't plan to REQUEST_UPDATE'..."* Sibling of #1635 on the publisher side.
- **#1633** — *Should we allow more than one concurrent subscription per Track*. OPENED May 19 16:33 UTC by [[alan-frindell|afrind]]. **Operationalises [[luke-curley|Luke Curley]]'s May 18 SVC-thread procedural gap discovery** (SUBSCRIBE-same-track-twice illegal so SGPL-with-per-layer-priority needs multi-sub). Body lifts text from Editors' IETF-125 slides with 4-proposal slate: **1a (Editors' rec)** = unique Track Aliases per sub, no dedup; **1b** = same Track Alias, publisher coalesces (Ian Swett + Martin Duke prefer); **2** = single-sub + union filters; **3** = status quo (illegal). Same-day comments [[ian-swett]] May 19 17:08 UTC and afrind May 19 17:31 UTC re-argue 1b conflict-handling (afrind: *"different DELIVERY_TIMEOUT, PRIORITY, GROUP_ORDER, AUTH... if publisher is deduplicating by single track alias, it's unclear how to apply these"*). **May 21 substantive make-before-break thread** (4 comments 18:43-21:21 UTC): [[martin-duke]] *"Yes, 1b. The non-silly use case for this is make-before-break or just avoiding a session_error because of a lost RESET_STREAM"*; [[ian-swett]] *"With Subgroup filters, one clear usecase is starting the enhancement layer Subgroup at the next group boundary... end the current Subscription at the end of the current Group and start a new one at the next Group with the updated Subgroup filter"*; martinduke *"yeah, that's a make-before-break. It also highlights that the **group-as-join-point thinking in the design is still pretty muddled. Why can't a REQUEST_UPDATE be triggered to start on the next group?**"*; ianswett *"a simpler option might be to start a new Subscription with the new filters you want"*. **First explicit chair-side endorsement of 1b** + **new "REQUEST_UPDATE next-group offset" design alternative** surfaced. Cites long-parked PR #1451 (open since April 13). **Slated for [[2026-06-09-london-interim|London]]** — 10-min Day-1 slot Jun 11 1300-1310 in the May 21 final agenda.
- **#1632** — *MOQ-18: Properties Type collision with LOC-02*. OPENED May 14 03:24 UTC by **yuanchao-chris** (new contributor — 2nd issue in 2 days). Reports that **draft-18 §15.8-2 assigns Property Type IDs that diverge from draft-ietf-moq-loc-02's commit-history values**: MOQ-18 has TIMESTAMP=0x06 / TIMESCALE=0x08 / AUDIO_LEVEL=0x0C / VIDEO_FRAME_MARKING=0x0A / VIDEO_CONFIG=0x0D, while LOC-02 records TIMESTAMP=0x02 / AUDIO_LEVEL=0x06 / VIDEO_FRAME_MARKING=0x04. Twin issue filed simultaneously on the LOC side ([moq-wg/loc Issue #20](https://github.com/moq-wg/loc/issues/20)). **PR #1624** (April 30, *"provisional IANA registry for LOC properties"*) was supposed to resolve [[issue-1550]] but the assignment cuts in draft-18 §15.8-2 did not adopt the registry values. **First publicly-flagged post-draft-18 cross-spec coordination failure** — see [[discussions-2026-05]].
- **#1631** — *Track-level codec switching semantics*. OPENED May 13 02:23 UTC by **yuanchao-chris**. Asks whether MoQ supports in-band codec migration (H265→H264, AV1→H264) within an existing Track, analogous to WebRTC PT change inside the same SSRC. **[[alan-frindell]] May 13 05:11 UTC** sketches *"publisher make a new group in an ongoing track, and include codec information on properties communicated on Object 0 in the new group - or the Object 0 payload"*. **yuanchao-chris May 13 09:23 UTC** confirms works in stream mode but in datagram mode needs property-stamped frames + `REQUEST_UPDATE`-based "ACK" semantics; also notes [[moq-msf]] §5.1.24 catalog track information needs alignment. First substantive post-draft-18 design conversation.
- **#1626** - Version negotiation for QMUX. Opened May 1 23:50 UTC by **sharmafb** (Suhas Sathyanarayana): *"We have an idea of how version negotiation works for MoQ-over-HTTP/3 and how it works for MoQ-over-QUIC, but do we know how it's going to work for MoQ-over-QMUX?"* **[[alan-frindell]] reply** May 2 02:19 UTC: *"We discussed quite a bit last IETF. The plan is to say something like TLS ALPN moqt-18 implies qmux-01"* — first explicit statement of the QMUX/transport ALPN coupling for draft-18. See [[qmux]] for context.
- **#1622** - Request ID in GOAWAY isn't useful. Opened Apr 30 by [[ian-swett]] (label `Handshake and Session`). Body: *"After more thought (yes I approved #1559), I don't think the Request ID in GOAWAY is actionable in MoQ. … Now that we're removing Required Request ID (#1615) and we've already removed Request ID flow control, GOAWAY is one of the two remaining uses of Request ID (the other is Joining Fetch)."* **PR #1623** (revert) opened Apr 30 01:38 UTC. **[[alan-frindell]] counter Apr 30 18:31:57 UTC**: *"My counter is - it's trivial to put the request ID in goaway, and might be useful. If nothing else it can speed up retry when a new request is racing a GOAWAY."* — afrind's first explicit pushback against the walk-back. PR #1623 now contested.
- **#1616** - Both PUBLISH_NAMESPACE and NAMESPACE are responses to SUBSCRIBE_NAMESPACE. **CLOSED Apr 29 20:44 UTC** via PR #1619 merge.
- **#1614** - (JOINING) FETCH + SUBSCRIBE prioritization. Opened Apr 27 by [[luke-curley]] (split from #1358). Concrete TTV math: at 1.5s into a 2s GoP with 3 Mb/s media on 4.5 Mb/s network, JOINING FETCH delivers TTV=1.33s while a hypothetical `SUBSCRIBE filter=LargestGroup order=DESC` delivers TTV=0.5s. Concludes: *"we need order=DESC support for JOINING FETCH. Either some way of prioritizing between the SUBSCRIBE + JOINING FETCH, or cancelling the JOINING FETCH if the next group starts (kinda gross), or add back the LargestGroup filter (pls)."* Renews pressure on PR #1607.
- **#1612** - What happens to Joining FETCH if fwd changes to 0? Opened Apr 23 by [[martin-duke]]. **Apr 23 21:02 UTC**: [[alan-frindell]] replied: "Changing the subscription from 1 to 0 after joining fetch has no effect on the FETCH. We can update the spec. Though now it seems like requiring fwd=1 is causing a lot of problems. I wonder if we should just allow fwd=0." **Addressed by PR #1620** (Apr 28 23:25 UTC).
- **#1603** - What is the use case for required-request-id. **Apr 27 18:42 UTC interim outcome** ([[ian-swett]]): *"Conclusion was to remove required-request-id from draft 18 and fix Joining Fetch (if necessary?). Those who believe some functionality in this space is useful, such as for make-before-break, should explore those use cases in more detail and further describe what, if any, dependency structure between requests is needed in MoQ. Tentative plan is to discuss these at the London hybrid interim in June."* PR #1615 implements the removal. PRs #1604 (Martin's structural fix) and #1613 (Alan's flow control) lose their headline justification.
- **#1602** - Joining Fetch should be on the SUBSCRIBE/PUBLISH stream — **CLOSED Apr 28 23:31 UTC** by [[alan-frindell]] as duplicate of #1313 (*"Joining FETCH as a separate control message creates edge cases and feature gaps"*, ianswett, Oct 15).
- **#1601** - Joining FETCH session errors are subject to a race condition — **CLOSED Apr 29 00:03 UTC** via PR #1609 merge.
- **#1598** - Why PUBLISH_OK not REQUEST_OK? — **CLOSED Apr 29 00:04 UTC** via PR #1611 merge.
- **#1593** - RFC: Allow framing single Objects without Subgroup ID — **CLOSED unmerged** Apr 29 17:29 UTC by [[ian-swett]]. The PR proposed an alternative OBJECT_STREAM type. Made OBE by Apr 27 interim disposition on PR #1608 + PR #1618 (FIRST_OBJECT bit) replacing it.
- **#1582** - Caching and propagation of REQUEST_ERRORs (Design)
- **#1581** - Request cancellation should be able to specify an error code (resolved — PR #1606 merged Apr 23)
- **#1578** - Bikeshed: `Largest Object` should be `Next Object`. **Apr 23**: [[ian-swett]] agrees with the rename.
- **#1550** - Properties Type collision between moq-16 and loc-01 (LOC issue #10; loc-02 also has collisions per [[alan-frindell]] Apr 16). **CLOSED Apr 30 18:10:19 UTC via PR #1624 merge** ([[alan-frindell]]) — provisional IANA registry for LOC properties now established.
- **#1534** - REDIRECT. **Apr 23 editor call**: Remove REDIRECT message from PR. Use GOAWAY on a bidi stream to mean what REDIRECT did. **PR #1534 MERGED May 1 01:11:59 UTC** by [[alan-frindell]] (+50/−1) — both REDIRECT-as-REQUEST_ERROR and standalone REDIRECT message landed.
- **#1507** - (Referenced by Session-Level Tracks extension point)
- **#1481** - Do we need a way to move / goaway for individual track ([[fluffy]], Feb 9). **Addressed by PR #1617** (Apr 28 16:21 UTC) and **PR #1534** (merged May 1 01:11:59 UTC) — REDIRECT message now provides the per-track move mechanism.
- **#1476** - DELIVERY_TIMEOUT is both Track and Object extension. **Apr 23**: Victor asks whether zero→non-zero transition is permitted.
- **#1405** - Single Object Subgroups don't need a Subgroup ID. **PR #1608 CLOSED unmerged Apr 28 21:19 UTC** ([[alan-frindell]]: *"WG didn't think this was the right approach, but agreed we need a way to know if a subgroup contains the beginning"*). Replaced by **PR #1618** (FIRST_OBJECT bit in SUBGROUP_HEADER type — adopts the alternative yuyou suggested on PR #1608 Apr 28 07:29 UTC). PR #1608 **formally CLOSED** May 1 18:35 UTC (afrind: *"Closing in favor of 1618"*).
- **#1386** - Can a publisher 'lie' about what Largest Object is? ([[ian-swett]], Dec 7 2025). **Addressed by PR #1621** (Apr 28 23:50 UTC).

## Open PRs
- **PR #1625** (Apr 30 05:59 UTC, [[suhas-nandakumar]], +132/−1) — *Rebased and Update Security Considerations PR from Magnus Westerlund*. Rebases and extends Magnus Westerlund's long-parked Security Considerations PR (gloinul's #1455). suhasHere requests gloinul review.
- **PR #1623** (Apr 30 01:38 UTC, [[ian-swett]], +0/−10, label `Handshake and Session`) — *Remove Request ID from GOAWAY* (reverts #1559, fixes #1622). Pure-removal patch. Pairs with PR #1615 (RRID removal). **Apr 30 18:31:57 UTC**: [[alan-frindell]] pushed back on the parent issue: *"trivial to put the request ID in goaway, and might be useful. If nothing else it can speed up retry when a new request is racing a GOAWAY."* PR now contested.
- **PR #1621** (Apr 28 23:50 UTC, [[alan-frindell]], +8/−1) — *Forbid relays from lying about LARGEST_OBJECT* (fixes #1386). Body: *"If we want to serve cached objects in response to SUBSCRIBE, lying is not the correct approach."* Closes a long-running 2025 design issue.
- **PR #1620** (Apr 28 23:25 UTC, [[alan-frindell]], +2/0) — *Clarify Joining FETCH is unaffected by fwd changing to 0* (fixes #1612). [[ian-swett]] **APPROVED** Apr 29 20:40:08 UTC. Two approvals → ready to merge.
- **PR #1618** (Apr 28 21:33 UTC, [[alan-frindell]], +20/−10) — *Add FIRST_OBJECT bit to SUBGROUP_HEADER type*. **The replacement for PR #1608's approach.** [[suhas-nandakumar]] **APPROVED** Apr 29 23:45:55 UTC: *"Looks fine to me"*. ianswett added Apr 29 20:48 UTC inline comment: *"Ideally, I'd like this to be required, which was a perk of my other proposal to force the Subgroup ID==First Object ID"*. Long Apr 29 20:54-22:04 UTC ianswett comments still re-litigating the closed PR #1608 approach — the Apr 29 list thread "Knowing the start of a Subgroup" (ianswett, afrind, Cullen) continues that debate. PR ready to merge despite parallel list dispute.
- **PR #1617** (Apr 28 16:21 UTC, [[alan-frindell]], +85/−73) — *Allow GOAWAY on request streams to migrate individual requests* (fixes #1481). Body: *"GOAWAY can now appear on a request stream using the same wire format as the control-stream form, but without Request ID (optional, present only on control stream). A client MUST send a zero-length URI in any GOAWAY."* ianswett comment Apr 29 18:10 UTC: *"I think we should remove Request ID from GOAWAY entirely, since I don't think it has much practical value."* — directly motivated PR #1623.
- **PR #1615** (Apr 27 19:48 UTC, [[ian-swett]], +3/−52, label `Control Messages`) — *Remove Required Request ID* (fixes #1603). Body: *"Removes 'Required Request ID'. Does not remove Request ID, because it is used by Joining Fetch and GOAWAY."* **Implements the Apr 27 interim decision.** [[victor-vasiliev]] APPROVED. **Unblocked by PR #1609 merge.**
- **PR #1613** (Apr 23 23:10 UTC, [[alan-frindell]], +30/0, label: `Design`) — *Add MAX_REQUEST_UPDATES setup option and TOO_MANY_REQUEST_UPDATES error* (references #1063). Adds **per-stream flow control** for REQUEST_UPDATE messages. **Now superseded** by the Apr 27 interim decision to remove RRID outright (PR #1615). PR #1613 was the alternative-frame to PR #1604's structural reshuffling; both lose headline justification post-interim.
- **PR #1607** (Apr 18) - [Draft/RFC] Largest Available Group filter ([[victor-vasiliev|Victor Vasiliev]]). Simpler alternative to REWIND: current group only, always serves complete group, no relay-side backfill. Coalescing point of the Apr 17–18 mailing-list convergence on LargestGroup/CurrentGroup. **Apr 19**: [[luke-curley]] left the first review — pushes back on the "MUST serve a complete group" / "full cache only" framing. **Apr 23**: [[suhas-nandakumar]] marked the PR **CHANGES_REQUESTED** (15:07 UTC, the first hard blocker). **Apr 24 23:10 UTC**: [[luke-curley]] returned with concrete defense — catalogs MUST use LargestGroup (NextGroup never resolves on dormant tracks), and Twitch's TTV math shows 333 ms startup-time savings at the median (1s into 2s GoP, 1.5 Mb/s media on 3 Mb/s network → 0.66s vs 1s wait). Proposes the combined `CurrentGroup + NGR` race idiom. Separately, [[ian-swett]]'s Apr 23 inline "force Subgroup ID = first Object ID" suggestion has now been split into standalone PR #1608. See [[joining-fetch-dissent]].
- **PR #1605** - Split DELIVERY_TIMEOUT into two types of timeout ([[victor-vasiliev|Victor Vasiliev]], Apr 14). `OBJECT_DELIVERY_TIMEOUT` replaces existing `DELIVERY_TIMEOUT`; new `SUBGROUP_DELIVERY_TIMEOUT` covers subgroups that have been fully queued but not yet fully delivered. Fixes #667 and #606. **Apr 23 morning**: First review by [[ian-swett]] — "this looks reasonable, but I don't intuitively understand why two timeouts are necessary". **Apr 23 afternoon**: [[alan-frindell]] added three suggestions — explicitly permit cancellation of retransmissions after delivery timeout, and evaluate delivery timeout "as late as possible" after internal queuing. On the Apr 27 interim agenda.
- **PR #1604** - Joining FETCH with subscription (implements #1602) — active review; Gwendal Simon (Apr 16) notes this is the subscriber-initiated sibling of the relay-initiated PUBLISH+catch-up pattern in SWITCH #1378. **Apr 23**: [[alan-frindell]] asked [[martin-duke]] for thoughts on Gwendal's FETCH+PUBLISH_DONE race proposal; Martin replies that REQUEST_UPDATE ordering is a general problem and orthogonal to this PR. **Apr 23 20:55 UTC**: Martin added text that "killing SUBSCRIBE also kills the FETCH. I'm not sure how else to do it; there's no other way to turn off the SUBSCRIBE." **Apr 23 20:57 UTC**: Martin noted the PR "Now fixes #1612 as well". **Now mostly superseded** by the Apr 27 interim decision to remove RRID outright (PR #1615) — Martin's structural fix for RRID multiplication is no longer needed if RRID is gone. Branch is `dirty` (merge conflict with `main`).
- **PR #1591** - RFC: Add flow control for Subscriptions
- **PR #1588** - Add internationalization statement for moqt URI scheme
- **PR #1544** - *Improve Startup Latency and 0-RTT* ([[ian-swett]], opened Mar 8, fixes #420 + #83). **Apr 28 01:46 UTC**: [[martin-thomson]] (former QUIC WG chair, IAB member) joined the review with a substantive rewrite of the introductory sentences. **Apr 30 02:12-02:29 UTC**: [[ian-swett]] posted **6 inline reply/suggestion comments** working through Thomson's rewrite — defends gRPC-style 0-RTT WT path, two suggestion patches around cache-expiry semantics for replayed objects, and a rewrite for resource-exhaustion mitigation (*"Relays MAY defer initiating upstream subscriptions until the handshake is complete or reject 0-RTT entirely to mitigate resource exhaustion from replayed packets."*). **Apr 30 03:25:32 UTC**: Thomson asks *"Do you have a specific response code that a relay could use so that the client can know that this was something that can be retried?"* The 0-RTT review is now in serious dialogue.
- **PR #1378** - SWITCH for Client-Side ABR — relay-initiated PUBLISH + inline catch-up design; Apr 16 polish pass by Gwendal Simon. See [[switch-abr]].

## Recently Merged
- **PR #1542** - *Split SUBSCRIBE_NAMESPACE into SUBSCRIBE_NAMESPACE and SUBSCRIBE_TRACKS* (**merged May 1 22:59:13 UTC** by [[alan-frindell]], +215/−135, fixes #1458). Replaces single SUBSCRIBE_NAMESPACE (0x11) with **SUBSCRIBE_NAMESPACE (0x50)** for namespace discovery + **SUBSCRIBE_TRACKS (0x51)** for track subscriptions. Removes SUBSCRIBE_NAMESPACE_OPTIONS + BOTH mode; adds **TRACK_NAMESPACE_PREFIX (0x34)** allowing REQUEST_UPDATE to change the prefix. Approvals: ianswett (Mar 9), vasilvv (Apr 27), [[suhas-nandakumar]] (final May 1 18:32:48 UTC on commit `4aa849a`). Closes one of the longest-standing draft-17 design splits. Anticipated by moqtail PR #180 (zafergurel) which had already opened against the post-Apr-29 split design.
- **PR #1534** - *Add REDIRECT for request errors and established subscriptions* (**merged May 1 01:11:59 UTC** by [[alan-frindell]], +50/−1). Lands both: (1) Redirect structure (Connect URI + Full Track Name) + REDIRECT error code on REQUEST_ERROR for new requests; (2) standalone REDIRECT message for established subscriptions/publications. Servers receiving a non-empty Connect URI MUST close with PROTOCOL_VIOLATION; non-empty Track Namespace + empty Connect URI is an internal track redirect. Closes Issue #1481 (per-track move). Two approvals: Vasilvv (Apr 27 23:01 UTC) + suhasHere (Apr 29 17:56:52 UTC).
- **PR #1624** - *Add provisional registry for LOC properties* (**merged Apr 30 18:10:18 UTC** by [[alan-frindell]], +11/0, fixes #1550). [[suhas-nandakumar]]'s provisional IANA registry resolving the cross-draft 0x02/0x04 collision between MOQT and LOC. Closes the cross-draft #1550 saga without renumbering existing codepoints.
- **PR #1619** - *Fix SUBSCRIBE_NAMESPACE response message name* (**merged Apr 29 20:44 UTC** by [[ian-swett]], +1/−1, fixes #1616). Editorial: response to SUBSCRIBE_NAMESPACE is NAMESPACE, not PUBLISH_NAMESPACE.
- **PR #1611** - *Remove PUBLISH_OK message type, make it a REQUEST_OK alias* (**merged Apr 29 00:04 UTC** by [[alan-frindell]], +11/−30, fixes #1598). Wire-format change: removes the `PUBLISH_OK` code point; PUBLISH_OK becomes a textual shorthand consistent with the other REQUEST_OK aliases introduced in PR #1610. Approvals from [[ian-swett]], `@sharmafb` (Suhas Sathyanarayana), `@sandarsh`.
- **PR #1609** - *Joining Fetch forward state mismatch is a request error* (**merged Apr 29 00:03 UTC** by [[alan-frindell]], +3/−2, fixes #1601). Downgrades session-fatal forward-state mismatch (race between `REQUEST_UPDATE fwd=1` and Joining FETCH on different streams) to a request error. Approvals from [[ian-swett]], `@sharmafb`, `@sandarsh`. **Unblocks PR #1615** (RRID removal) per afrind's Apr 28 21:17 UTC comment.
- **PR #1586** - *Make Object ID and Group ID delta encoded in Fetch responses* (**merged Apr 27 05:24 UTC** by [[alan-frindell]], +32/−23). Replaces inline raw IDs with delta encoding for FETCH responses. Final wording: *"If the Group ID Delta field is present, the Object ID is the value of Object ID Delta if present. When the Group ID Delta field is not present, the Object ID is the prior Object's ID plus the Object ID Delta if present."* — directly resolves the Apr 23 ambiguity afrind flagged. afrind's last suggested-text patch landed Apr 27 05:23 UTC immediately before merging. **Closes [[martin-duke]]'s long-running Issue #877 ("Pack the bits")** and Issue #1345 ("Separate the list of reasons for malformed tracks into two lists", yekuiwang).
- **PR #1610** - *Define textual aliases for REQUEST_OK by request type* (**merged Apr 23 21:03 UTC** by [[alan-frindell]], +22/−17). Editorial: introduces `REQUEST_UPDATE_OK`, `TRACK_STATUS_OK`, `SUBSCRIBE_NAMESPACE_OK`, `PUBLISH_NAMESPACE_OK` as shorthand for `REQUEST_OK (in response to X)`. Unblocks PR #1611 (PUBLISH_OK removal).
- **PR #1606** - *Generalize stream reset codes to all request streams* (**merged Apr 23 18:32 UTC** by [[alan-frindell]], fixes #1581). Adds `GOING_AWAY` (0x4), `EXPIRED_AUTH_TOKEN` (0x7), `SESSION_CLOSED`; aligns `TOO_FAR_BEHIND` / `EXPIRED` codes between stream-reset and `PUBLISH_DONE` registries. First merge to `main` since draft-17 publication.
- **PR #1596** - Exclude your own tracks from SUBSCRIBE_NAMESPACE (Apr 16, fixes #1585)
- **PR #1562** - RFC: Add Session-Level Tracks reserved namespace (**merged Apr 16** by [[alan-frindell]]) — reserves `.session` namespace tuple[0] for transport-internal tracks; relays MUST NOT forward; unknown session tracks MUST be rejected with NOT_SUPPORTED; IANA registry established under Specification Required policy
- **PR #1490** - FILL_TIMEOUT parameter (Apr 14; subscriber's max wait to fill a FETCH gap before Unknown; addresses part of #1023)

## Previously Merged (Apr 9-10)
- **PR #1599** - Move normative text on Track Alias
- **PR #1597** - Consistently use MOQT for protocol references
- **PR #1595** - Allow 7-byte varint and non-minimal encodings
- **PR #1590** - Subscription filters are a Param
- **PR #1583** - Allow publisher to reopen subgroup after REQUEST_UPDATE fwd 0->1
- **PR #1577** - Clarify Joining Fetch ordering with Forward State transitions
- **PR #1576** - Add Track Properties to REQUEST_OK
- **PR #1540** - Allow coalescing REQUEST_UPDATE processing

# ALPN Negotiation

Draft-17 uses ALPN strings for version negotiation:
- `qmux-00.moqt-17` - QUIC multiplexed, draft-17
- `qmux-00.moqt-16` - QUIC multiplexed, draft-16
- `qmux-00` with no suffix implies draft-14 (legacy)

# Related Drafts
- [[moq-msf]] - Streaming format built on MOQT
- [[moq-loc]] - Low overhead container for MOQT objects
- [[moq-secure-objects]] - E2E encryption for MOQT
- [[moq-privacy-pass]] - Authentication for MOQT

# Mailing List

## REWIND Consensus Call (Apr 16, 2026, deadline May 1)
Chair [Magnus Westerlund](mailto:magnus.westerlund@ericsson.com) opened a consensus call on how to proceed with [draft-duke-moq-subscribe-rewind](https://martinduke.github.io/draft-duke-moq-subscribe-rewind/draft-duke-moq-subscribe-rewind.html) following [[interim-meetings|interim-13]]. Three options on the ballot: (1) no action until MOQT is published, (2) adopt as an MOQT extension, (3) use as the basis for a PR to merge when editors decide. Deadline: **May 1, 2026**. The draft targets issues #861, #1039, #1358, #1362, and #1386 plus Boulder-meeting concerns about head-of-line blocking in Joining Fetch.

Over Apr 17–18 the thread pivoted toward a simpler **LargestGroup / CurrentGroup / CurrentGroupFill filter** ([[alan-frindell]], [[luke-curley]], [[victor-vasiliev]] all aligned). Alan backed **Option 1** Apr 17 (FILL_TIMEOUT=0 already solves core HOL-blocking scenarios). Vasiliev captured the emerging direction as **PR #1607** (Draft/RFC) — current group only, always complete group, no relay backfill.

**Apr 27–28 thread re-eruption** (9 messages over 19 hours during/after interim-14):
- [[suhas-nandakumar]] Apr 27 06:55 UTC: REWIND can't handle gapped caches.
- [[luke-curley]] Apr 27 08:33 UTC: HTTP analogy — *"imagine if HTTP operated based on the cache state... allowed to return a partial response with byte range 68-419"*. Would only support REWIND if relays must attempt upstream retrieval.
- Gwendal Simon (Synamedia) Apr 27 16:12 UTC: Acknowledges Luke's PR #1378 feedback, commits to updating SWITCH with explicit cache-continuity condition.
- [[martin-duke]] Apr 27 12:23 UTC: *"The 'best-effortness' of REWIND is critical to the design, and is consistent with what I briefed in Boulder."*
- [[luke-curley]] Apr 27 12:46 UTC: Reiterates HTTP analogy + supports PR #1607 instead.
- [[martin-duke]] Apr 27 12:52 UTC compromise: *"would you accept something that is still best-effort... but does not preclude the relay doing something more aggressive"*.
- [[luke-curley]] Apr 27 13:18 UTC agrees: *"A relay MUST deliver objects within a sub-group in order (SUBSCRIBE semantics). Otherwise, the relay MUST skip the remainder of the sub-group."*
- [[ian-swett]] Apr 28 02:03 UTC: *"I'm open to some variant of REWIND, but not very optimistic that we'll get consensus on anything more complex than CurrentGroupFill."* Endorses CurrentGroupFill (Alan's sketched alternative); main rationale for more complex REWIND would be removing Joining Fetch entirely.
- Gwendal Simon Apr 28 10:38 UTC: **Pushes back on Joining FETCH removal** as a live-streaming-deployment concern. Proposes proactive past-object delivery via SUBSCRIBE_OK parameter `[Start_Group, Live_Edge)`.
- Magnus Westerlund (chair) Apr 28 10:49 UTC: Asks for explicit ballot positions; design discussion has eclipsed the ballot itself.
- [[ian-swett]] Apr 29 17:27 UTC: Clarifies his Apr 28 endorsement is *"his individual position"* as an editor, not an editorial mandate. Endorses *"some variant of option 3"* — afrind's CurrentGroupFill specifically.
- **Cullen Fluffy Jennings Apr 29**: **Explicit option-#1 vote** — *"I support option #1. I do not think we should not take on Rewind until we have MoQT wrapped up. … when the working group eventually addresses this topic, we need to start with the use case we are trying solve."* **First explicit option-#1 ballot vote on the list.**

The May 1 deadline is in **1 day**. With at least one explicit option-#1 vote (Cullen), strong option-3-with-CurrentGroupFill positions (Luke, Ian Swett individually), Martin Duke's compromise-floor framing, and Gwendal's live-streaming pushback on Joining FETCH removal, chair Magnus will need to interpret a split outcome. See [[joining-fetch-dissent]] and [[discussions-2026-04]].

## "Knowing the start of a Subgroup" Thread (Apr 29-30) — now 10+ messages

Re-litigates the Apr 27 interim disposition (PR #1608 closed, #1618 adopted) on the list. Apr 29 had 3 messages; Apr 30 added 7 more.

- [[ian-swett]] Apr 29 ([msg](https://mailarchive.ietf.org/arch/msg/moq/S4SA8G1Brd807AaMfD_H-WSsvcI/)): Still prefers his closed PR #1608 (Subgroup ID == first Object ID) over PR #1618 (FIRST_OBJECT bit). Asks for community feedback.
- [[alan-frindell]] Apr 29 ([msg](https://mailarchive.ietf.org/arch/msg/moq/znrcAgMSZf1dbppkvGD1KiXY7J8/)): Supports #1608. Asks Mo, Cullen, Magnus, Suhas to *"provide examples of what would be broken by #1608"*.
- Cullen Fluffy Jennings Apr 30 ~14:00 MDT ([msg](https://mailarchive.ietf.org/arch/msg/moq/W6043G0SUOKJSXR7MXcwBajURMM/)): Three critiques of #1608 — favors explicit signaling (PR #1618 approach) over *"pinning to very weird implicit signaling"*.
- Magnus Westerlund Apr 30 ([msg](https://mailarchive.ietf.org/arch/msg/moq/LjT4jA8TH4koIfygE8rxIBpy3nM/)): replies on examples broken by #1608.
- [[ian-swett]] Apr 30 ([msg](https://mailarchive.ietf.org/arch/msg/moq/WCj_TkgQogAPfE_3RBXKf2AfO7g/)): follow-up.
- **[[luke-curley]] Apr 30 ~10:41 PDT** ([msg](https://mailarchive.ietf.org/arch/msg/moq/eIEyCkv8E2dwf-bduz5s_hOnsPg/)): **Critical of both proposals.** Against #1608: *"information is already implicit via FETCH or SUBSCRIBE object arrival order"*. Against #1618: the bit *"only helps REWIND (if there's a fragmented cache) for the first object… not expensive to add, but you still need a plan to handle the rest of the gaps"*. **Proposes a third option**: an **0-indexed counter per object within a subgroup** so relays can detect cache gaps on a subgroup basis.
- [[alan-frindell]] Apr 30 ([msg](https://mailarchive.ietf.org/arch/msg/moq/K7PCeHtL66kMCc1QfsJ07AYAq24/)).
- [[suhas-nandakumar]] Apr 30 ([msg](https://mailarchive.ietf.org/arch/msg/moq/fDDf7ZkatVbdUb9MJk9-lgtoTwI/)).
- [[luke-curley]] Apr 30 follow-up ([msg](https://mailarchive.ietf.org/arch/msg/moq/nHSUhOI9s2QhfyxDrny55ElxHW0/)).
- **Mo Zanaty Apr 30 22:06 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/k8-VOGI2V1wWcApiZIH5nMB3C8o/)): **Endorses #1618 over #1608.** Concrete AV1 example: temporal-only AV1 layering produces frame numbers (0-5) ≠ layer numbers (0,2,1,2,0,2), violating any rule tying Subgroup ID to first Object ID. Calls #1608 *"a footgun for devs to screw up"* — *"even the working group fell into this trap"*. On subgroup-vs-datagram tie-breaking: *"subgroup wins"*; datagrams at matching priority are *"disposable and therefore lower priority"*.

**Net**: list debate is now a three-way design discussion (#1608 / #1618 / Luke's per-subgroup counter) on top of an already-APPROVED PR #1618. Cullen + Mo aligned with #1618; Magnus engaged but unclear; Luke proposing a fourth path. PR #1618 has not yet been merged despite approval.

Pre-interim mailing list activity now surfaced: **Mo Zanaty Apr 27 14:43 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/BSTWelz12xXk6wz6PCu96weVXHI/)): *"1608 is a major change to the core data model that makes subgroups semantically meaningless"*. afrind Apr 27 16:04 UTC reply asks for application examples that would break — establishing the burden-of-proof shift that ultimately led to PR #1608's closure.

## Consensus Call on draft-17 (March 2026)
[[martin-duke]] initiated a consensus call on the mailing list (2026-03-24) for draft-17 changes. The thread received responses through April 10, 2026.

## 7-Byte Varint Encoding Debate
Multi-week mailing list thread (March 19 - April 7) about the new varint format introduced in draft-17. The 7-byte encoding (6 leading ones) was initially marked invalid. Discussion among [[alan-frindell]], [[martin-duke]], [[suhas-nandakumar]], [[ian-swett|Ian Swett]], Mo Zanaty, and Christian Huitema led to PR #1595 allowing 7-byte varint and non-minimal encodings.

# External Links
- [GitHub repo](https://github.com/moq-wg/moq-transport)
- [Latest HTML](https://moq-wg.github.io/moq-transport/draft-ietf-moq-transport.html)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-transport/)
- [moq-wg wiki](https://github.com/moq-wg/moq-transport/wiki)
