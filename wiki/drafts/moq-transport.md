---
title: "Media over QUIC Transport (MOQT)"
tags: [draft, transport, core]
date: 2026-04-13
last_updated: 2026-04-29
status: current
draft_version: 17
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-transport/"
---

**draft-ietf-moq-transport-17** | 121 pages | Expires 2026-09-03

# Authors
- [[alan-frindell]] (Meta)
- [[ian-swett]] (Google)
- [[suhas-nandakumar]] (Cisco)
- [[victor-vasiliev]] (Google)

# Abstract

MOQT defines a media transport protocol operating over QUIC and WebTransport. It uses a [[publish-subscribe]] model where producers publish data that is consumed by multiple endpoints via subscription. The protocol treats [[relays]] as first-class citizens, enabling intermediate content distribution networks for high-scale, low-latency distribution.

# Key Concepts

- **[[publish-subscribe]]**: Core messaging pattern - PUBLISH, SUBSCRIBE, FETCH, REQUEST_OK/REQUEST_ERROR, PUBLISH_DONE
- **[[subgroups-and-objects]]**: Data hierarchy: Track > Group > Subgroup > Object
- **[[relays]]**: First-class relay support for CDN-style distribution
- **[[track-properties]]**: Metadata attached to tracks and objects via Key-Value Pairs
- **[[joining-fetch]]**: Mechanism to fetch historical data when joining a live session
- **[[qmux]]**: TCP fallback via QUIC multiplexing over TLS+TCP
- **URI Scheme**: `moqt://` URI scheme with fragment identifier support (PR #1571)

# Recent Changes (draft-17)

Draft-17 was published 2026-03-02 with significant changes from draft-16:
- Unidirectional control streams for 0-RTT subscribe capability
- SUBSCRIBE_NAMESPACE split into two messages: SUBSCRIBE_NAMESPACE (namespace info) and SUBSCRIBE_TRACKS (PUBLISH notifications)
- Subscription filters moved to be a Param (PR #1590)
- Track Properties added to REQUEST_OK (PR #1576)
- Allow 7-byte varint and non-minimal encodings (PR #1595)
- Editorial: consistent use of "MOQT" for protocol references (PR #1597)
- Editorial: use "message" instead of "frame" (PR #1587)

# Active Issues (as of 2026-04-29)

## Design Issues
- **#1616** - Both PUBLISH_NAMESPACE and NAMESPACE are responses to SUBSCRIBE_NAMESPACE. Opened Apr 28 by **mope-life** (Dustin Ross, new contributor). Spotted a textual inconsistency between draft §1588-1592 and §3404-3408. [[alan-frindell]] Apr 28 03:43 UTC: *"It should only be NAMESPACE since draft-16. We will clean this ul[sic]."* **Addressed by PR #1619** (Apr 28 22:05 UTC).
- **#1614** - (JOINING) FETCH + SUBSCRIBE prioritization. Opened Apr 27 by [[luke-curley]] (split from #1358). Concrete TTV math: at 1.5s into a 2s GoP with 3 Mb/s media on 4.5 Mb/s network, JOINING FETCH delivers TTV=1.33s while a hypothetical `SUBSCRIBE filter=LargestGroup order=DESC` delivers TTV=0.5s. Concludes: *"we need order=DESC support for JOINING FETCH. Either some way of prioritizing between the SUBSCRIBE + JOINING FETCH, or cancelling the JOINING FETCH if the next group starts (kinda gross), or add back the LargestGroup filter (pls)."* Renews pressure on PR #1607.
- **#1612** - What happens to Joining FETCH if fwd changes to 0? Opened Apr 23 by [[martin-duke]]. **Apr 23 21:02 UTC**: [[alan-frindell]] replied: "Changing the subscription from 1 to 0 after joining fetch has no effect on the FETCH. We can update the spec. Though now it seems like requiring fwd=1 is causing a lot of problems. I wonder if we should just allow fwd=0." **Addressed by PR #1620** (Apr 28 23:25 UTC).
- **#1603** - What is the use case for required-request-id. **Apr 27 18:42 UTC interim outcome** ([[ian-swett]]): *"Conclusion was to remove required-request-id from draft 18 and fix Joining Fetch (if necessary?). Those who believe some functionality in this space is useful, such as for make-before-break, should explore those use cases in more detail and further describe what, if any, dependency structure between requests is needed in MoQ. Tentative plan is to discuss these at the London hybrid interim in June."* PR #1615 implements the removal. PRs #1604 (Martin's structural fix) and #1613 (Alan's flow control) lose their headline justification.
- **#1602** - Joining Fetch should be on the SUBSCRIBE/PUBLISH stream — **CLOSED Apr 28 23:31 UTC** by [[alan-frindell]] as duplicate of #1313 (*"Joining FETCH as a separate control message creates edge cases and feature gaps"*, ianswett, Oct 15).
- **#1601** - Joining FETCH session errors are subject to a race condition — **CLOSED Apr 29 00:03 UTC** via PR #1609 merge.
- **#1598** - Why PUBLISH_OK not REQUEST_OK? — **CLOSED Apr 29 00:04 UTC** via PR #1611 merge.
- **#1582** - Caching and propagation of REQUEST_ERRORs (Design)
- **#1581** - Request cancellation should be able to specify an error code (resolved — PR #1606 merged Apr 23)
- **#1578** - Bikeshed: `Largest Object` should be `Next Object`. **Apr 23**: [[ian-swett]] agrees with the rename.
- **#1550** - Properties Type collision between moq-16 and loc-01 (LOC issue #10; loc-02 also has collisions per [[alan-frindell]] Apr 16)
- **#1534** - REDIRECT. **Apr 23 editor call**: Remove REDIRECT message from PR. Use GOAWAY on a bidi stream to mean what REDIRECT did.
- **#1507** - (Referenced by Session-Level Tracks extension point)
- **#1481** - Do we need a way to move / goaway for individual track ([[fluffy]], Feb 9). **Addressed by PR #1617** (Apr 28 16:21 UTC).
- **#1476** - DELIVERY_TIMEOUT is both Track and Object extension. **Apr 23**: Victor asks whether zero→non-zero transition is permitted.
- **#1405** - Single Object Subgroups don't need a Subgroup ID. **PR #1608 CLOSED unmerged Apr 28 21:19 UTC** ([[alan-frindell]]: *"WG didn't think this was the right approach, but agreed we need a way to know if a subgroup contains the beginning"*). Replaced by **PR #1618** (FIRST_OBJECT bit in SUBGROUP_HEADER type — adopts the alternative yuyou suggested on PR #1608 Apr 28 07:29 UTC).
- **#1386** - Can a publisher 'lie' about what Largest Object is? ([[ian-swett]], Dec 7 2025). **Addressed by PR #1621** (Apr 28 23:50 UTC).

## Open PRs
- **PR #1621** (Apr 28 23:50 UTC, [[alan-frindell]], +8/−1) — *Forbid relays from lying about LARGEST_OBJECT* (fixes #1386). Body: *"If we want to serve cached objects in response to SUBSCRIBE, lying is not the correct approach."* Closes a long-running 2025 design issue.
- **PR #1620** (Apr 28 23:25 UTC, [[alan-frindell]], +2/0) — *Clarify Joining FETCH is unaffected by fwd changing to 0* (fixes #1612). Body: *"The spec required Forward State 1 for sending a Joining FETCH but did not specify what happens if the Forward State changes to 0 after the FETCH is accepted."* Implements afrind's Apr 23 21:02 UTC reply on issue #1612.
- **PR #1619** (Apr 28 22:05 UTC, [[alan-frindell]], +1/−1) — *Fix SUBSCRIBE_NAMESPACE response message name* (fixes #1616). Body: *"The response to SUBSCRIBE_NAMESPACE should be NAMESPACE, not PUBLISH_NAMESPACE. PUBLISH_NAMESPACE is an unsolicited message, while NAMESPACE is sent on the response stream of SUBSCRIBE_NAMESPACE."*
- **PR #1618** (Apr 28 21:33 UTC, [[alan-frindell]], +20/−10) — *Add FIRST_OBJECT bit to SUBGROUP_HEADER type*. Body: *"Add bit 6 (0x40) to signal that the subgroup contains the first object published in the subgroup by the original publisher. The type format expands from 0b00X1XXXX to 0b0XX1XXXX. All valid type values still fit in a 1-byte varint."* **The replacement for PR #1608's approach** — explicitly signals "is this the first Object" without restricting Subgroup ID to be the first Object ID. Honors yuyou's Apr 28 PR #1608 review comment.
- **PR #1617** (Apr 28 16:21 UTC, [[alan-frindell]], +85/−73) — *Allow GOAWAY on request streams to migrate individual requests* (fixes #1481). Body: *"GOAWAY can now appear on a request stream using the same wire format as the control-stream form, but without Request ID (optional, present only on control stream). A client MUST send a zero-length URI in any GOAWAY. Upon receiving a per-request GOAWAY, the endpoint re-issues that request on a session at the specified URI and closes the old stream."*
- **PR #1615** (Apr 27 19:48 UTC, [[ian-swett]], +3/−52, label `Control Messages`) — *Remove Required Request ID* (fixes #1603). Body: *"Removes 'Required Request ID'. Does not remove Request ID, because it is used by Joining Fetch and GOAWAY."* **Implements the Apr 27 interim decision.** [[victor-vasiliev]] APPROVED. **Now unblocked by PR #1609 merge** — afrind's Apr 28 21:17 UTC comment: *"Removing RRID creates races between REQUEST_UPDATE FWD=1 and Joining FETCH (rejoining a paused subscription). At least #1609 is required, so it's a request rather than a session error."*
- **PR #1613** (Apr 23 23:10 UTC, [[alan-frindell]], +30/0, label: `Design`) — *Add MAX_REQUEST_UPDATES setup option and TOO_MANY_REQUEST_UPDATES error* (references #1063). Adds **per-stream flow control** for REQUEST_UPDATE messages. **Now superseded** by the Apr 27 interim decision to remove RRID outright (PR #1615). PR #1613 was the alternative-frame to PR #1604's structural reshuffling; both lose headline justification post-interim.
- **PR #1607** (Apr 18) - [Draft/RFC] Largest Available Group filter ([[victor-vasiliev|Victor Vasiliev]]). Simpler alternative to REWIND: current group only, always serves complete group, no relay-side backfill. Coalescing point of the Apr 17–18 mailing-list convergence on LargestGroup/CurrentGroup. **Apr 19**: [[luke-curley]] left the first review — pushes back on the "MUST serve a complete group" / "full cache only" framing. **Apr 23**: [[suhas-nandakumar]] marked the PR **CHANGES_REQUESTED** (15:07 UTC, the first hard blocker). **Apr 24 23:10 UTC**: [[luke-curley]] returned with concrete defense — catalogs MUST use LargestGroup (NextGroup never resolves on dormant tracks), and Twitch's TTV math shows 333 ms startup-time savings at the median (1s into 2s GoP, 1.5 Mb/s media on 3 Mb/s network → 0.66s vs 1s wait). Proposes the combined `CurrentGroup + NGR` race idiom. Separately, [[ian-swett]]'s Apr 23 inline "force Subgroup ID = first Object ID" suggestion has now been split into standalone PR #1608. See [[joining-fetch-dissent]].
- **PR #1605** - Split DELIVERY_TIMEOUT into two types of timeout ([[victor-vasiliev|Victor Vasiliev]], Apr 14). `OBJECT_DELIVERY_TIMEOUT` replaces existing `DELIVERY_TIMEOUT`; new `SUBGROUP_DELIVERY_TIMEOUT` covers subgroups that have been fully queued but not yet fully delivered. Fixes #667 and #606. **Apr 23 morning**: First review by [[ian-swett]] — "this looks reasonable, but I don't intuitively understand why two timeouts are necessary". **Apr 23 afternoon**: [[alan-frindell]] added three suggestions — explicitly permit cancellation of retransmissions after delivery timeout, and evaluate delivery timeout "as late as possible" after internal queuing. On the Apr 27 interim agenda.
- **PR #1604** - Joining FETCH with subscription (implements #1602) — active review; Gwendal Simon (Apr 16) notes this is the subscriber-initiated sibling of the relay-initiated PUBLISH+catch-up pattern in SWITCH #1378. **Apr 23**: [[alan-frindell]] asked [[martin-duke]] for thoughts on Gwendal's FETCH+PUBLISH_DONE race proposal; Martin replies that REQUEST_UPDATE ordering is a general problem and orthogonal to this PR. **Apr 23 20:55 UTC**: Martin added text that "killing SUBSCRIBE also kills the FETCH. I'm not sure how else to do it; there's no other way to turn off the SUBSCRIBE." **Apr 23 20:57 UTC**: Martin noted the PR "Now fixes #1612 as well". **Now mostly superseded** by the Apr 27 interim decision to remove RRID outright (PR #1615) — Martin's structural fix for RRID multiplication is no longer needed if RRID is gone. Branch is `dirty` (merge conflict with `main`).
- **PR #1593** - RFC: Allow framing single Objects without Subgroup ID. PR #1608's "Closes #1593" plan is moot (#1608 was closed unmerged Apr 28); the design moved to PR #1618 (FIRST_OBJECT bit).
- **PR #1591** - RFC: Add flow control for Subscriptions
- **PR #1588** - Add internationalization statement for moqt URI scheme
- **PR #1542** - Split SUBSCRIBE_NAMESPACE into SUBSCRIBE_NAMESPACE (0x50, namespace discovery) and SUBSCRIBE_TRACKS (0x51, track subscriptions) ([[alan-frindell]], updated Apr 16). Removes SUBSCRIBE_NAMESPACE_OPTIONS + BOTH mode; adds TRACK_NAMESPACE_PREFIX (0x34) for REQUEST_UPDATE prefix changes. Fixes #1458. **Apr 27 03:18–05:23 UTC pre-interim review pass**: [[suhas-nandakumar]] posted seven inline comments — suggested-text plural rename to `SUBSCRIBE_NAMESPACES`, "I think we don't allow for the tracks to be echoed by default", clarifying-question on REQUEST_UPDATE-prefix-narrowing as error, and four others. [[alan-frindell]] responded systematically: *"It is not an error. It is only an error if the new namespace overlaps with a different sub_ns."* / *"It was removed in #1596, I updated here to match."* / suggested-text *"messages for tracks within matching namespaces, excluding tracks published by the subscriber."* / *"🤷 I can spend 45 seconds asking in the interim"* (deferring one item to live discussion).
- **PR #1544** - *Improve Startup Latency and 0-RTT* ([[ian-swett]], opened Mar 8, fixes #420 + #83). Adds sections on startup-latency reduction and 0-RTT. **Apr 27 04:09 UTC**: [[victor-vasiliev]] reviewed *"I don't understand what forward secrecy has anything to do with the text of this section."* — implying the security-considerations text on 0-RTT needs a rewrite before merge. **Apr 27 19:42 UTC**: [[ian-swett]] *"I think I took that from HTTP/3 or the early data draft? Should I remove this?"*. **Apr 27 22:08 UTC**: Vasilvv *"I don't see text like that in RFC 8470. Let's just remove it?"*. **Apr 28 01:28 UTC**: Removed via suggestion patch. **Apr 28 01:46 UTC**: [[martin-thomson]] (former QUIC WG chair, IAB member) joined the review with substantive rewrite suggestions for the introductory sentences — first time on a moq-transport PR within April 2026's wiki record. Reviewer pool widening rapidly post-interim.
- **PR #1534** - Add REDIRECT for request errors and established subscriptions ([[alan-frindell]], +48/−1). **Apr 23 editor call decision**: remove the REDIRECT message from this PR; use GOAWAY on a bidi stream to mean what REDIRECT did. **Apr 27 03:15–05:00 UTC**: [[suhas-nandakumar]] flagged *"I am not sure how a relay would know the right FullTrackName which is application scoped."* (afrind responded the rule is "via configuration rules typically, it's not in-band"). [[victor-vasiliev]] reviewed Apr 27 03:52 UTC: *"This overall looks good, but we do need text on relay behavior (forwarding and caching)."* afrind responded Apr 27 05:00 UTC: *"@vasilvv Do you remember what we agreed to say? Cacheable up to retry interval?"* — Cloudflare/Google relay-caching alignment loop opened ~3 hours pre-interim. **Apr 27 23:01 UTC**: [[victor-vasiliev]] APPROVED post-interim, but the relay-behavior text Vasilvv flagged hasn't yet been pushed.
- **PR #1378** - SWITCH for Client-Side ABR — relay-initiated PUBLISH + inline catch-up design; Apr 16 polish pass by Gwendal Simon. See [[switch-abr]].

## Recently Merged
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

Two camps crystallizing as the May 1 deadline approaches: **Luke + Ian favor CurrentGroupFill** (the simplest band-aid); **Martin defends REWIND best-effort** with compromise framing. See [[joining-fetch-dissent]] and [[discussions-2026-04]].

## Consensus Call on draft-17 (March 2026)
[[martin-duke]] initiated a consensus call on the mailing list (2026-03-24) for draft-17 changes. The thread received responses through April 10, 2026.

## 7-Byte Varint Encoding Debate
Multi-week mailing list thread (March 19 - April 7) about the new varint format introduced in draft-17. The 7-byte encoding (6 leading ones) was initially marked invalid. Discussion among [[alan-frindell]], [[martin-duke]], [[suhas-nandakumar]], [[ian-swett|Ian Swett]], Mo Zanaty, and Christian Huitema led to PR #1595 allowing 7-byte varint and non-minimal encodings.

# External Links
- [GitHub repo](https://github.com/moq-wg/moq-transport)
- [Latest HTML](https://moq-wg.github.io/moq-transport/draft-ietf-moq-transport.html)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-transport/)
- [moq-wg wiki](https://github.com/moq-wg/moq-transport/wiki)
