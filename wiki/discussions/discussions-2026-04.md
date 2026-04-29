---
title: "Discussions - April 2026"
tags: [discussions, slack, github]
date: 2026-04-14
last_updated: 2026-04-29
status: current
---

Summary of active discussions in the MOQ ecosystem during April 2026.

# Implementation Activity (Apr 28–29 UTC, post-interim cleanup wave)

## moq-wg/moq-transport — Two PRs MERGED, PR #1608 CLOSED, Five New PRs Opened (Apr 28 16:21 → Apr 29 00:04 UTC)

After the Apr 27 interim, [[alan-frindell]] turned the editorial-action list into pushed code in a **9-PR wave over ~8 hours** (5 new PRs Apr 28 16:21–23:50 UTC, 2 merges Apr 29 00:03–00:04 UTC, plus PR #1608 closed unmerged). Three of the new PRs implement specific interim outcomes; two address mailing-list / longstanding bug-tracker items.

### Two merges (Apr 29 00:03–00:04 UTC)

- **[PR #1611](https://github.com/moq-wg/moq-transport/pull/1611) MERGED** Apr 29 00:04:05 UTC by [[alan-frindell]] (+11/−30, *Remove PUBLISH_OK message type, make it a REQUEST_OK alias*, fixes #1598). Wire-format change: removes the `PUBLISH_OK` code point; PUBLISH_OK becomes a textual shorthand consistent with the other REQUEST_OK aliases introduced in PR #1610 (`REQUEST_UPDATE_OK`, `TRACK_STATUS_OK`, `SUBSCRIBE_NAMESPACE_OK`). Approvals from [[ian-swett]] (Apr 27 19:39 UTC, the post-interim greenlight), Suhas Sathyanarayana (`@sharmafb`, Apr 28 23:42 UTC), `@sandarsh` (Apr 28 23:55 UTC). **Closes Issue #1598** (mzanaty's "Why PUBLISH_OK not REQUEST_OK?", opened Apr 4).
- **[PR #1609](https://github.com/moq-wg/moq-transport/pull/1609) MERGED** Apr 29 00:03:07 UTC by [[alan-frindell]] (+3/−2, *Joining Fetch forward state mismatch is a request error*, fixes #1601). Downgrades the session-fatal forward-state mismatch (race between `REQUEST_UPDATE fwd=1` and Joining FETCH on different streams) to a request error. Approvals from [[ian-swett]] (Apr 23 19:49 UTC), Suhas (Apr 28 23:42 UTC), `@sandarsh` (Apr 28 23:54 UTC). **Closes Issue #1601** (martinduke's race condition report). Also unblocks **PR #1615** (RRID removal): afrind's Apr 28 21:17 UTC comment on #1615 stated *"Removing RRID creates races between REQUEST_UPDATE FWD=1 and Joining FETCH (rejoining a paused subscription). At least #1609 is required, so it's a request rather than a session error."*

### PR #1608 CLOSED unmerged (Apr 28 21:19 UTC)

- **[PR #1608](https://github.com/moq-wg/moq-transport/pull/1608)** (*Make Subgroup ID identical to first Object Id in the Subgroup*, ianswett via Jules AI) **CLOSED** Apr 28 21:19 UTC. afrind's closure comment: *"Discussed 4/27: The working group didn't think this was the right approach, but agreed we need a way to know if a subgroup contains the beginning."* Issue #1405 (yuyou's "Single Object Subgroups don't need a Subgroup ID") **remains open** but the WG settled on a **different mechanism** — see PR #1618 below.
- **yuyou Apr 28 07:29 UTC** had posted an alternative-approach comment on #1608: *"I have some concerns that mandating the Subgroup ID to always be identical to the first Object ID might restrict publisher flexibility. Tying the Subgroup ID directly to the first Object ID prevents applications from maintaining structurally consistent Subgroup IDs across multiple Groups. Publishers often need the flexibility to keep the exact same Subgroup ID for a specific data stream component over the lifespan of a track... To solve the original problem of identifying the first Object ID, may it be an alternative approach to explicitly signal the starting Object ID in the Subgroup header instead of tying it to the Subgroup ID field."* — anticipates exactly the FIRST_OBJECT-bit approach afrind ended up taking in #1618.

### Five new PRs (afrind, Apr 28 16:21 → 23:50 UTC)

- **[PR #1617](https://github.com/moq-wg/moq-transport/pull/1617) OPENED** Apr 28 16:21 UTC by [[alan-frindell]] (+85/−73, *Allow GOAWAY on request streams to migrate individual requests*, fixes #1481 — fluffy's Feb 9 issue *"Do we need a way to move / goaway for individual track"*). Body: *"GOAWAY can now appear on a request stream using the same wire format as the control-stream form, but without Request ID (optional, present only on control stream). A client MUST send a zero-length URI in any GOAWAY. Upon receiving a per-request GOAWAY, the endpoint re-issues that request on a session at the specified URI and closes the old stream."* Pairs with the [[interim-meetings|interim-14]] decision flow toward request-stream-centric protocol design.
- **[PR #1618](https://github.com/moq-wg/moq-transport/pull/1618) OPENED** Apr 28 21:33 UTC by [[alan-frindell]] (+20/−10, *Add FIRST_OBJECT bit to SUBGROUP_HEADER type*). Body: *"Add bit 6 (0x40) to signal that the subgroup contains the first object published in the subgroup by the original publisher. The type format expands from 0b00X1XXXX to 0b0XX1XXXX. All valid type values still fit in a 1-byte varint."* **The replacement for PR #1608's approach.** Honors yuyou's Apr 28 #1608 comment: explicitly signals "is this the first Object" without restricting Subgroup ID to be the first Object ID. Note: type-byte format expands its allowable bits — the 1-byte varint constraint still holds.
- **[PR #1619](https://github.com/moq-wg/moq-transport/pull/1619) OPENED** Apr 28 22:05 UTC by [[alan-frindell]] (+1/−1, *Fix SUBSCRIBE_NAMESPACE response message name*, fixes #1616). Body: *"The response to SUBSCRIBE_NAMESPACE should be NAMESPACE, not PUBLISH_NAMESPACE. PUBLISH_NAMESPACE is an unsolicited message, while NAMESPACE is sent on the response stream of SUBSCRIBE_NAMESPACE."* Implements afrind's Apr 28 03:43 UTC commitment in response to mope-life's Apr 28 03:09 UTC issue #1616.
- **[PR #1620](https://github.com/moq-wg/moq-transport/pull/1620) OPENED** Apr 28 23:25 UTC by [[alan-frindell]] (+2/0, *Clarify Joining FETCH is unaffected by fwd changing to 0*, fixes #1612 — martinduke's Apr 23 issue *"What happens to Joining FETCH if fwd changes to 0?"*). Body: *"The spec required Forward State 1 for sending a Joining FETCH but did not specify what happens if the Forward State changes to 0 after the FETCH is accepted."* Implements afrind's Apr 23 21:02 UTC reply on issue #1612.
- **[PR #1621](https://github.com/moq-wg/moq-transport/pull/1621) OPENED** Apr 28 23:50 UTC by [[alan-frindell]] (+8/−1, *Forbid relays from lying about LARGEST_OBJECT*, fixes #1386 — ianswett's Dec 7 2025 issue *"Can a publisher 'lie' about what Largest Object is?"*). Body: *"If we want to serve cached objects in response to SUBSCRIBE, lying is not the correct approach."* Closes one of the longest-running open design issues from late 2025.

### Issue closures via the merge wave

- **#1602** (*Joining Fetch should be on the SUBSCRIBE/PUBLISH stream*, martinduke, Apr 9) — CLOSED Apr 28 23:31 UTC by [[alan-frindell]] as **duplicate of #1313** (*Joining FETCH as a separate control message creates edge cases and feature gaps*, ianswett, Oct 15). Cleans up the dependency graph that PR #1604 was wrapped around.
- **#1601, #1598** — closed automatically via PR #1609 / PR #1611 merges.

Net: the editorial-cleanup volume here is unusual for a single ~8-hour window, and conspicuously concentrated on afrind (5 of 5 new PRs are his). Two of the three interim-driven items (PUBLISH_OK removal, fwd-mismatch-as-request-error) merged on the same day. The third (RRID removal, PR #1615) is **not yet merged but is now unblocked** by #1609. The rest of the wave (#1617/#1618/#1620/#1621) closes longer-running design issues that the interim's structural decisions made tractable. PR #1608's failure becomes the source for #1618's cleaner replacement — yuyou's #1608 review comment effectively wrote the design.

## Mailing List — REWIND Thread Continues (Apr 28 08:43 → 12:34 UTC) + Interim Minutes Posted

**Four messages posted Apr 28** to the IETF moq list — three more REWIND consensus-call entries, plus the formal interim minutes:

1. **[[luke-curley]] Apr 28 08:43 UTC** ([msg link](https://mailarchive.ietf.org/arch/msg/moq/itiruoCeL0utBXju20PDtPVcAvs/)): Replies to ianswett's Apr 28 02:03 UTC CurrentGroupFill endorsement. Outlines three paths for merging the CurrentGroup proposals: (1) status quo with Joining FETCH for multiple groups; (2) replace Joining FETCH with REWIND or modified SUBSCRIBE with `Start_Group` parameter; (3) remove Joining FETCH entirely, requiring subscribers to block on SUBSCRIBE_OK before fetching older groups. *"Personal preference for option 2... ianswett would likely prefer anything except option 1 to streamline the draft."*
2. **Gwendal Simon (Synamedia) Apr 28 10:38 UTC** ([msg link](https://mailarchive.ietf.org/arch/msg/moq/FQ1tdKIZTGeWxySc6qhF7YIbFu0/)): **Pushes back on Joining FETCH removal.** Asserts *"Joining FETCH was added via explicit WG consensus to address live streaming requirements"* and questions whether removing it requires equivalent consensus from live-streaming stakeholders who may not be active in GitHub discussions. **Technical distinction**: CurrentGroupFill addresses the current group only; Joining FETCH enables *"fast buffer filling at join"* by retrieving multiple past groups — the normal state for live players. **Alternative proposal**: a proactive delivery mechanism where relays deliver past objects inline on SUBSCRIBE/PUBLISH without subscriber-initiated FETCH; a parameter in SUBSCRIBE_OK communicates the range `[Start_Group, Live_Edge)`, eliminating subscriber round trip. First substantive defense of Joining FETCH from a live-streaming-deployment perspective.
3. **Magnus Westerlund (chair) Apr 28 10:49 UTC** ([msg link](https://mailarchive.ietf.org/arch/msg/moq/NnfEdDCSLHCPweWJaW_Rw5_rJfA/)): **Chair note.** Notes difficulty interpreting consensus because participants have discussed numerous related topics without clearly stating positions on the actual consensus question. Requests explicit positions on the original ballot. Reflects tension between simplifying the protocol (removing Joining FETCH) versus keeping features that support live-streaming deployments.
4. **Magnus Westerlund Apr 28 12:34 UTC** ([msg link](https://mailarchive.ietf.org/arch/msg/moq/s2UNChEeHEiuekdHBWE3KuxeS88/)): *"Minutes from Interim meeting 27 of April 2026"* — formally publishes the interim-14 minutes on the datatracker; invites corrections via the WG chairs.

The chair's "please state explicit positions" intervention is notable: with **3 days left until the May 1 ballot deadline**, the consensus call is at risk of producing no clear outcome because the design discussion has eclipsed the ballot itself.

## moq-dev/moq — Two Merges + Five New PRs from Luke + One External Bug Fix (Apr 28 16:11 UTC → Apr 29 01:49 UTC)

[[luke-curley]] turned both Apr 27's open PRs into merged code, then **opened five more substantive PRs** in the same window. External contributor `Qizot` also landed an audio-encoder bug fix.

### Two merges (post-interim PRs land)

- **[PR #1352](https://github.com/moq-dev/moq/pull/1352) MERGED** Apr 29 01:32:29 UTC by [[luke-curley]] (final +10/−2) — *Handle relays without announcement subscription support*. Lands the `mediaoverquic.com`-specific announcementless-relay handling (issue #1346 fix). Final size grew by 4 lines vs the original +6/0 after the CodeRabbit suffix-match-false-positive fix.
- **[PR #1353](https://github.com/moq-dev/moq/pull/1353) MERGED** Apr 29 01:49:24 UTC by [[luke-curley]] (final +347/−147) — *moq-lite: per-frame buffer + BufMut producer to cut relay memory*. The production-profiled memory optimization (~234 MB / ~254 MB / ~446 MB attribution) lands, replacing `Vec<Bytes>` per-frame chunks with single `Arc<FrameBuf>` allocations and `BufMut`-driven direct writes from quinn streams. **First memory-cost-per-connection optimization to land in moq-relay.**
- **PR #1350** (mTLS for HTTPS callers) — **still OPEN**. Last activity Apr 27 23:33 UTC. The CodeRabbit-flagged 🟠 Major (CORS+browser-readable-GET issue) hasn't been addressed in pushed code yet; presumably waits for the CORS scope decision.

### Five new PRs from Luke (Apr 28 16:11 UTC → 23:55 UTC)

- **[PR #1356](https://github.com/moq-dev/moq/pull/1356) OPENED** Apr 28 16:11 UTC by [[luke-curley]] (+27/−86) — *moq-lite: switch insert_track to take TrackConsumer*. Changes `BroadcastProducer::insert_track` to take `TrackConsumer` (by value) instead of `&TrackProducer`. Removes `TrackConsumer::produce()` from #1300 — the workaround that this change supersedes. Adds `TrackConsumer::weak()` (`pub(crate)`).
- **[PR #1357](https://github.com/moq-dev/moq/pull/1357) OPENED** Apr 28 16:33 UTC by [[luke-curley]] (+319/−24) — *moq-lite: add fetch_group API + TrackDynamic*. **Ties together the FETCH-readiness work.** New `TrackConsumer::fetch_group(seq) -> Result<GroupConsumer>` — *"Cache hit → ..."* (truncated body). The first-class FETCH path at the track level. *"The breaking API change is captured here so the wire-side hookup (lite ControlType::Fetch, ietf::run_fetch_stream) can land as a clean follow-up."* Pairs with PR #1348 (Subscription model API).
- **[PR #1358](https://github.com/moq-dev/moq/pull/1358) OPENED** Apr 28 19:20 UTC by [[luke-curley]] (+994/−1289) — *moq-lite: rewrite Origin as a poll-driven, conducer-based model*. **Massive rewrite**: replaces `OriginNode`/`NotifyNode` tree, per-publish `web_async::spawn` cleanup, and per-consumer `mpsc` fan-out with a flat `HashMap<PathOwned, Entry>` behind a `Mutex` plus per-consumer queues. Consumers register a single `conducer::Waiter` on both the shared state and each tracked entry. Net −295 lines. (Note: separate from issue #1358 — share number, different repo / context.)
- **[PR #1359](https://github.com/moq-dev/moq/pull/1359) OPENED** Apr 28 21:22 UTC by **ksletmoe-aws** (Karl Sletmoe, AWS) (+64/−67) — *fix(watch): process CMAF groups sequentially in WebCodecs decoder*. **External contributor bug fix.** Problem: *"The CMAF WebCodecs decoder path in `js/watch/src/video/decoder.ts` and `audio/decoder.ts` spawns a concurrent async task per MoQ group via `effect.spawn()`. When groups contain a single large frame (e.g. CMAF passthrough where each group is one moof+mdat blob), `readFrame()` resolves immediately..."* — concrete issue exposed by passthrough where each group is one moof+mdat blob.
- **[PR #1360](https://github.com/moq-dev/moq/pull/1360) OPENED** Apr 28 23:55 UTC by [[luke-curley]] (+29/−10) — *moq-native: relocate jemalloc helper; wire it into moq-boy*. Moves the `jemalloc` SIGUSR1-dump helper from `moq-relay` into `moq-native` behind a new `jemalloc` feature, and re-exports `tikv_jemallocator` so binaries can use it for `#[global_allocator]` without a direct dep. Wires `moq-boy` for jemalloc heap profiling — *"its 6 production instances..."* (truncated body) suggests **moq-boy is now in production at 6+ instances** and needs the same heap-profiling tooling Luke has been using on moq-relay.

### Audio-encoder fix from external contributor

- **[PR #1355](https://github.com/moq-dev/moq/pull/1355) MERGED** Apr 28 20:04:23 UTC by [[luke-curley]] (+7/−2, author **Qizot**) — *Add encoder's AudioContext sampleRate override*. Routine fix.
- **[PR #1354](https://github.com/moq-dev/moq/pull/1354) OPENED** Apr 28 07:23 UTC by **Qizot** (+21/−11) — *Fix missing channel samples for audio encoder*. **External-contributor bug report+fix on iOS Safari.** *"On iOS safari the line `channelCount: settings.channelCount ?? root.channelCount,` resolves to `2`, but afterwards we receive mono audio in `onmessage`. Since the number of channels in `AudioData` must match the number of channels the encoder has been initialized with, we are fixing the `AudioData` by copying the active channel to the missing one."* iOS Safari WebCodecs/getUserMedia mismatch.

### Conversation activity

- **Issue #1310** (*"why use the worklet plugin?"* — beeequeue) and **Issue #1328** (*"help with js tooling"* — beeequeue) saw substantive activity during Apr 28 → Apr 29 01:24 UTC. Luke's comment on #1310: *"The problem is that `user` needs to use Vite, otherwise these Vite-specific urls won't resolve. This is how `moq/watch` and co used to work, we 'built' with tsc an[d] then..."* Live conversation about tooling tradeoffs in the moq-dev JS packaging.

### Net effect

The merge wave continues the SaaS-multi-tenancy push from Apr 26 (slug routing, wait_for_broadcast). The five new PRs split into two threads: **moq-lite-fetch readiness API** (#1356/#1357 build the TrackConsumer/`fetch_group` surface PR #1348 is meant to consume) and **runtime substrate** (#1358 Origin rewrite, #1359 ksletmoe-aws decoder fix, #1360 jemalloc-in-moq-native for moq-boy production heap profiling). External contributors (`Qizot`, `ksletmoe-aws`, earlier `skirsten` on #1349, earlier `kubo6472` on issue #1346) are now driving 4 of the last 12 PRs/issues — the contributor base is widening rapidly.

## Slack — Quiet (no posts since Apr 27 18:50 CEST)

`#moq` had no new posts since Giovanni Marzot's 😞 emoji at the interim open Apr 27 18:50 CEST. `#moq-rs` / `#moq-js` / `#libquicr` quiet.

## Datatracker, MoQ Monthly — Quiet

- **Datatracker**: No new WG or individual draft versions since moq-lite-04 (Apr 9). draft-ietf-moq-transport-17 still the latest WG transport draft.
- **MoQ Monthly**: Still only issue #0 (Mar 4).

## Interop Runner — One-Test Recovery (Apr 29 00:38 UTC = 23/68/14)

The Apr 29 00:38 UTC run shows **23 / 68 / 14**, **+1 pass from Apr 28 (22/69/14)**, recovering to the Apr 24 / Apr 27 reading. Walking arc since draft-17 publication: **22 → 23 → 24 → 22 → 23 → 22 → 23**. Still −1 below the Apr 25 high (24/67/14). The two interim-PR merges (#1611, #1609) are **spec-only** and don't trigger an implementation rebuild; the moq-dev/moq merges (#1352, #1353, #1355) merged after the Apr 29 00:38 UTC run, so they couldn't have driven the +1. Most likely a flaky test or an upstream image rebuild for one of the other matrix entries. See [[interop-runner]].

# Implementation Activity (Apr 27–28 UTC, post-interim)

## moq-wg/moq-transport — interim-2026-moq-14 Decisions Materialize on GitHub (Apr 27 18:36 → Apr 28 03:43 UTC)
The Apr 27 interim (16:30 UTC, [[interim-meetings|interim-2026-moq-14]]) produced a clear set of editorial-action decisions, recorded by [[ian-swett]] on individual PRs/issues as the meeting concluded:

- **Required Request ID — REMOVE.** [[ian-swett]] Apr 27 18:42 UTC on issue #1603: *"From today's interim: Conclusion was to remove required-request-id from draft 18 and fix Joining Fetch (if necessary?). Those who believe some functionality in this space is useful, such as for make-before-break, should explore those use cases in more detail and further describe what, if any, dependency structure between requests is needed in MoQ. Tentative plan is to discuss these at the London hybrid interim in June."* **PR #1615 OPENED** Apr 27 19:48 UTC by [[ian-swett]] (+3/−52, *Remove Required Request ID*, label `Control Messages`): *"Removes 'Required Request ID'. Does not remove Request ID, because it is used by Joining Fetch and GOAWAY."* [[victor-vasiliev]] APPROVED. The Apr 27 interim agenda's three-way fork (status quo / PR #1604 structural / PR #1613 flow control) collapsed to a fourth, simplest option: **delete the field**. Make-before-break work is deferred to the **London hybrid interim (June 11-12)**.

- **Subgroup ID = first Object ID — needs more iteration.** [[ian-swett]] Apr 27 18:36 UTC on PR #1608 and (verbatim) issue #1405: *"Feedback from the WG at today's interim was: 1) People agreed it was important to know what the start Object ID of the Subgroup (and possibly Group?) 2) People had different concerns about restricting the Subgroup ID to be starting Object ID at the Original Publisher. 3) There was some confusion about both this proposal and what is possible in today's Object model in terms of publishing Objects in a subgroup 'out of order'."* No merge.

- **PUBLISH_OK removal — proceed with retarget.** [[ian-swett]] Apr 27 19:39 UTC review on PR #1611 (PUBLISH_OK removal): APPROVED with body *"Reminder to retarget this."* — interim greenlight for the retarget against `main`.

- **REDIRECT — APPROVED.** [[victor-vasiliev]] APPROVED PR #1534 at Apr 27 23:01 UTC. The Cloudflare/Google relay-caching alignment loop afrind opened on Apr 27 05:00 UTC ("Cacheable up to retry interval?") is no longer blocking — but the relay-behavior text Vasilvv flagged as missing pre-interim hasn't yet appeared in pushed code.

- **SUBSCRIBE_NAMESPACE split — APPROVED, near merge.** PR #1542 reached APPROVED state from [[victor-vasiliev]] at Apr 27 04:00 UTC pre-interim. Suhas's seven inline comments were addressed by afrind at Apr 27 05:07–05:13 UTC. afrind's Apr 27 04:59–05:23 UTC responses to Suhas's review are now part of the merge-ready text.

- **0-RTT (PR #1544) — Martin Thomson joins review.** [[victor-vasiliev]] continued questioning the security-considerations text's invocation of forward secrecy: Apr 27 22:08 UTC: *"I don't see text like that in RFC 8470. Let's just remove it?"* [[ian-swett]] removed it via suggestion patch Apr 28 01:28 UTC. Then [[martin-thomson]] (former QUIC WG chair, IAB member, very senior IETF security/transport reviewer) joined the review at Apr 28 01:46 UTC with a **substantive rewrite suggestion** for the introductory sentences: rewriting "QUIC 0-RTT provides the option for a client to initiate transactions immediately after attempting to establish a connection..." and clarifying the WebTransport restriction. PR #1544 had been parked since Mar 8 with only Ian Swett activity; the reviewer pool is widening rapidly post-interim.

- **New issue #1614 from Luke Curley** (Apr 27 19:11 UTC, split from his earlier issue #1358): *"(JOINING) FETCH + SUBSCRIBE prioritization"*. Concrete TTV math: at 1.5s into a 2s GoP with 3 Mb/s media on 4.5 Mb/s network, JOINING FETCH delivers TTV=1.33s while a hypothetical `SUBSCRIBE filter=LargestGroup order=DESC` delivers TTV=0.5s. *"Basically, we need order=DESC support for JOINING FETCH. Either some way of prioritizing between the SUBSCRIBE + JOINING FETCH, or cancelling the JOINING FETCH if the next group starts (kinda gross), or add back the LargestGroup filter (pls)."* Self-comment Apr 27 19:16 UTC: *"Effectively, I want to race to determine if it's faster to: Download all of the current group (at network speed), or Wait for the next group. SUBSCRIBE filter=CurrentGroup order=DESC does this perfectly. I don't think it's possible in the current draft."* Renews the pressure for PR #1607 (Largest Available Group filter) and ties the JOINING FETCH design directly to the REWIND consensus thread.

- **New issue #1616 from Dustin Ross (mope-life)** (Apr 28 03:09 UTC): *"Both PUBLISH_NAMESPACE and NAMESPACE are responses to SUBSCRIBE_NAMESPACE"*. Spotted a textual inconsistency between draft §1588-1592 (mandates PUBLISH_NAMESPACE) and §3404-3408 (says NAMESPACE). [[alan-frindell]] Apr 28 03:43 UTC: *"It should only be NAMESPACE since draft-16. We will clean this ul[sic]."* Editorial-cleanup item, not a design change.

## Mailing List — REWIND Consensus Call Re-Erupts (Apr 27 06:55 UTC → Apr 28 02:03 UTC)
Magnus Westerlund's [Apr 16 consensus call on REWIND](https://mailarchive.ietf.org/arch/msg/moq/MJ3MPP0r9gUPs04_WTGl8vIdBsg/) (deadline May 1) had been **quiet for 9 calendar days** since the Apr 17–18 burst. The interim discussion (which formally ran the Apr 13 REWIND debate again) shoved the design conversation back to the list with **9 messages over 19 hours**:

1. **[[suhas-nandakumar]] Apr 27 06:55 UTC** (reply to Gwendal Simon): *"IIUC REWIND was not addressing this use-case. Looks like the switch needs continuous groups with no gaps as it expects Relay to have cached the objects. REWIND does give up if there are gaps."* — Structural challenge to the framing that REWIND covers ABR-switching scenarios.
2. **[[luke-curley]] Apr 27 08:33 UTC**: *"Imagine if HTTP operated based on the cache state... a HTTP server was allowed to return a partial response with byte range 68-419."* Argues against cache-state-dependent behavior. Would support REWIND if it required **best-effort upstream retrieval** (similar to JOINING FETCH).
3. **Gwendal Simon (Synamedia) Apr 27 16:12 UTC**: Acknowledges Luke's PR #1378 feedback. *"REWIND delivery begins at the start of the latest gap-free run of Groups, skipping earlier Groups with gaps."* Notes SWITCH has stricter requirement: *"for every Group in the range, if available on current Track, must be available on target Track"*. Symmetric gaps OK. Commits to updating PR #1378 with explicit cache-continuity condition.
4. **[[martin-duke]] Apr 27 12:23 UTC**: Defends best-effort. *"The 'best-effortness' of REWIND is critical to the design, and is consistent with what I briefed in Boulder."*
5. **[[luke-curley]] Apr 27 12:46 UTC**: Reiterates HTTP analogy + supports PR #1607 (Largest Available Group filter) as the cleaner cache-state-independent alternative.
6. **[[martin-duke]] Apr 27 12:52 UTC**: Compromise proposal — *"would you accept something that is still best-effort (i.e. the publisher MAY refuse based on its cache state) but does not preclude the relay doing something more aggressive"* (best-effort floor, allow more aggressive).
7. **[[luke-curley]] Apr 27 13:18 UTC**: Agrees: *"A relay MUST deliver objects within a sub-group in order (SUBSCRIBE semantics). Otherwise, the relay MUST skip the remainder of the sub-group."*
8. **[[luke-curley]] Apr 27 13:32 UTC** (clarification): Three-option fragmented-cache options for relays — serve partial sub-groups, request upstream via REWIND/FETCH, or skip sub-groups entirely. *"Skipping entire groups will negatively impact user experience, similar to a FETCH returning an error."*
9. **[[ian-swett]] Apr 28 02:03 UTC**: *"I'm open to some variant of REWIND, but not very optimistic that we'll get consensus on anything more complex than CurrentGroupFill."* Endorses **CurrentGroupFill** ([[alan-frindell]]'s sketched alternative). Notes the main rationale for pursuing more complex REWIND variants would be enabling removal of the Joining Fetch mechanism entirely. Would support removing Joining Fetch if CurrentGroupFill adopted, but uncertain about WG support.

The thread crystallizes two camps: **Luke + Ian favor CurrentGroupFill** as the simplest band-aid; **Martin defends REWIND's best-effort semantics** but accepts the compromise framing (best-effort floor, allow more aggressive). The HTTP-style "publisher MUST attempt upstream retrieval" framing Luke initially pushed has been **weakened to a sub-group-ordering MUST** that both Luke and Martin agreed to. **The May 1 ballot deadline is now 3 days away.** See [[joining-fetch-dissent]] and [[interim-meetings]].

## moq-dev/moq — Luke's Post-Interim Burst (Apr 27 22:24 → Apr 28 00:27 UTC)
[[luke-curley]] opened **three substantive PRs in <2 hours after the interim**, none yet merged:

- **[PR #1350](https://github.com/moq-dev/moq/pull/1350)** OPENED Apr 27 22:24 UTC (+351/−18) — *moq-relay: authenticate HTTPS callers via the cluster mTLS CA*. The QUIC server already short-circuits to `AuthToken::unrestricted()` when a peer presents a client cert signed by `--server-tls-root` (`connection.rs:34`). The HTTPS web server (`/announced`, `/fetch`, `/ws/*`) didn't — it required a JWT in the query string. So on a relay host you couldn't hit `/announced` with the local `cluster.crt` even though the moq layer treats that cert as full access. PR wires the same path through the HTTPS listener: when `--server-tls-root` is set, the listener installs a `WebPkiClientVerifier` (with `.allow_unauthenticated()` so JWT-only callers still work), and a verified peer cert produces `AuthToken::unrestricted()` via a new `WebState::resolve_token` helper. A tiny `MtlsAcceptor` wraps `RustlsAcceptor` and, after the handshake, installs a per-connection tower middleware (`SetMtlsExtension`) that injects an `Option<MtlsPeer>` request extension. Cert hot-reload via SIGUSR1 preserved. CodeRabbit flagged 🟠 Major: combined with the existing `CorsLayer::allow_origin(Any)`, an arbitrary website could read `/announced` and `/fetch` through a browser that auto-selects or has approved a matching client cert. Luke posted six self-review comments Apr 27 23:15–23:28 UTC.
- **[PR #1352](https://github.com/moq-dev/moq/pull/1352)** OPENED Apr 27 23:59 UTC (+6/0) — *Handle relays without announcement subscription support*. **Direct response to issue #1346** (kubo6472's Apr 24 cross-impl Cloudflare-relay catalog-discovery bug). Changes `announced` getter type from `Set<Path.Valid>` to `Set<Path.Valid> | undefined`. When connecting to `mediaoverquic.com`, the system explicitly sets `announced` to `undefined` instead of silently skipping announcement subscriptions; broadcast reload logic treats `undefined` announced state as `reload=false`, preventing indefinite waiting for announcements that will never arrive. CodeRabbit flagged hostname-suffix matching false-positive risk (`endsWith("mediaoverquic.com")` could match lookalike domains); Luke pushed a fix Apr 28 00:07 UTC. **Pragmatic move**: hardcodes a single relay URL (Cloudflare's) into moq-lite — preserves user-visible behavior of `<moq-watch catalog-format=msf>` against a Cloudflare endpoint at the cost of a layered hardcode.
- **[PR #1353](https://github.com/moq-dev/moq/pull/1353)** OPENED Apr 28 00:27 UTC (+346/−146) — *moq-lite: per-frame buffer + BufMut producer to cut relay memory*. **Production-profiled memory optimization**. Luke profiled a relay with ~66 connections at 2.7 GB RSS on a 4 GB box, attributing:
  - **~234 MB** to `FrameProducer::create` (per-chunk 32 B `Bytes` headers in `Vec<Bytes>` plus growth)
  - **~254 MB** to `GroupProducer::create_group` (`VecDeque<FrameProducer>` + retained frame state)
  - **~446 MB** to `quinn::endpoint::RecvState::poll_socket` — quinn's reassembly arena being **pinned by held `Bytes`** (the returned `Bytes` is a refcounted slice into quinn's arena)

  Replaces `FrameState.chunks: Vec<Bytes>` with `FrameBuf` — a single Arc-shared, fixed-capacity heap allocation per frame. `FrameProducer` now `impl bytes::BufMut`, so the receive path writes quinn stream bytes directly into the pre-allocated buffer via `read_buf` (one memcpy, no per-chunk Bytes headers, no quinn-arena pinning). `FrameConsumer` tracks a byte cursor and materializes transient `Bytes` views via `Bytes::from_owner(buf.clone()).slice(..)` — nothing accumulates in `FrameState`.

- **Issue #1351 OPENED+CLOSED** Apr 27 23:15 UTC → Apr 28 00:10 UTC by **metapox** (taku): *"Container.Legacy.Consumer.next() returns undefined after 20-60 frames with multiple concurrent tracks"*. Reported against `@moq/hang` 0.2.4 + `@moq/lite` 0.2.2 against `moq-relay` 0.10. Luke replied Apr 27 23:18 UTC: *"recvGroup() should only return undefined when the track has finished. Can you verify this is not happening? Yeah, I need more information, this should never happen."* metapox followed up Apr 28 00:08 UTC: *"After further investigation, I was unable to reproduce this issue in a clean environment... The original report was likely caused by an unstable publisher on my side. Sorry for the noise — feel free to close this."* — false-alarm closure. Notable as another externally-reported bug exercising recent moq-lite work.

No new merges to `main` since Apr 26 (PRs #1340 + #1343).

## moq-wg/msf — Suhas Pushes Two Open PRs Forward (Apr 27 18:56 / 19:19 UTC)
[[suhas-nandakumar]] pinged @wilaw on two long-open MSF PRs after the interim — the first MSF activity since the spec-side has been chasing draft-17 in moq-transport:
- **[PR #133](https://github.com/moq-wg/msf/pull/133)** ("Add SCTE-35 support and CEA-608/708 accessibility fields", fixes #95, +259/0) — open since Feb 27. Adds accessibility field for CEA-608/708 closed captions per SCTE 214-1; defines well-known event timeline types for SCTE-35 ad markers and out-of-band captions; adds catalog example with embedded captions and SCTE-35 events. suhas: *"@wilaw latest commit should address your feedback. please check and let me know."*
- **[PR #122](https://github.com/moq-wg/msf/pull/122)** ("initial text on zapping", fixes #110, +2627/0) — open since Feb 19. suhas: *"I think i have addressed your feedback in the last commit. Please give another read and see if it makes sense."*

These are MSF's two largest open PRs. The relative dormancy of msf vs moq-transport remains striking (msf draft is still draft-00 from Jan 19, with no new versions in 2026-Q2).

## Slack — Two Posts During the Interim
- [[alan-frindell]] Apr 27 16:32 UTC: *"Interim starting now. Small number of participants so far..."* — first-ever moderator-style channel post about a live interim, signaling low live attendance. Three calendar days of mailing-list-only activity preceded the meeting.
- Giovanni Marzot Apr 27 16:50 UTC: single 😞 reaction emoji. No follow-up.

`#moq-rs` / `#moq-js` / `#libquicr` quiet.

## Interop Runner — One-Test Regression (Apr 28 00:37 UTC = 22/69/14)
The Apr 28 00:37 UTC run shows **22 / 69 / 14**, **−1 pass from Apr 27 (23/68/14)**, regressing back to the Apr 21–23 / Apr 26 plateau. Walking arc since draft-17 publication: 22 → 23 → 24 → 22 → 23 → 22. None of moq-dev/moq's Apr 27 PRs have merged to `main`, so docker images shouldn't have rebuilt. Most likely a flaky test or an unrelated impl rebuild. The matrix neither at the Apr 25 peak (24) nor at the Apr 19–20 trough (18) — stuck at the post-draft-17 plateau. See [[interop-runner]].

## Datatracker, MoQ Monthly — Quiet
- **Datatracker**: No new WG or individual draft versions since moq-lite-04 (Apr 9). draft-ietf-moq-transport-17 still the latest WG transport draft.
- **MoQ Monthly**: Still only issue #0 (Mar 4).

# Implementation Activity (Apr 26–27 UTC, interim-day morning)

## moq-wg/moq-transport — Suhas's Pre-Interim Review Pass on PR #1542 + Vasilvv on PR #1534/#1544 (Apr 27 03:15 → 05:31 UTC)
A burst of spec-review activity in the ~6 hours preceding the Apr 27 interim:

- **[PR #1542](https://github.com/moq-wg/moq-transport/pull/1542)** (Split SUBSCRIBE_NAMESPACE into SUBSCRIBE_NAMESPACE and SUBSCRIBE_TRACKS) — [[suhas-nandakumar]] posted **seven inline review comments** Apr 27 03:18–03:40 UTC, raising:
  - Suggested-text patch making `SUBSCRIBE_NAMESPACES` plural and clarifying the semantics: *"requests namespace discovery: the publisher sends relevant"*.
  - *"I think we don't allow for the tracks to be echoed by default (sub-ns with self track commit)"* — flagging a self-tracks-echoed default risk.
  - *"may be you need to add one line that says what does 'First' mean here?"* (re: messages "MUST be the first message on a new request stream").
  - *"should we also add a note to say the namespace, namespace done, publish, publish done messages all get sent on the same bidirectional stream establishing the request?"*
  - Clarifying-question: *"if i do a sub-ns to a/b and then do req_update to a/b/c (more focussed namespace), is it an error?"*
  - *"why did we remove this? I think this still holds true right?"* — questioning a deletion in the diff.
  - [[alan-frindell]] responded systematically Apr 27 04:59–05:23 UTC: *"It is not an error. It is only an error if the new namespace overlaps with a different sub_ns."* / *"It was removed in #1596, I updated here to match."* / *"@suhasHere this is done via configuration rules typically, it's not in-band"* (re: error-stream behavior on REDIRECT in PR #1534) / suggested-text edit *"messages for tracks within matching namespaces, excluding tracks published by the subscriber."* / *"🤷 I can spend 45 seconds asking in the interim"* (deferring one item to live discussion).

- **[PR #1534](https://github.com/moq-wg/moq-transport/pull/1534)** (Add REDIRECT for request errors and established subscriptions, afrind) — [[suhas-nandakumar]] Apr 27 03:15 UTC: *"I am not sure how a relay would know the right FullTrackName which is application scoped."* [[victor-vasiliev]] Apr 27 03:52 UTC review approval with: *"This overall looks good, but we do need text on relay behavior (forwarding and caching)."* afrind responded Apr 27 05:00 UTC tagging Vasilvv: *"@vasilvv Do you remember what we agreed to say? Cacheable up to retry interval?"* — a Cloudflare/Google relay-caching alignment loop opened ~3 hours before the call.

- **[PR #1544](https://github.com/moq-wg/moq-transport/pull/1544)** (Improve Startup Latency and 0-RTT, ianswett — fixes #420 and #83) — Vasilvv pushed back Apr 27 04:09 UTC: *"I don't understand what forward secrecy has anything to do with the text of this section."* Implies the security-considerations text on 0-RTT needs a rewrite before merge. PR has been parked since Mar 8 — last activity until today was on the original PR-open burst.

This pattern (Suhas reviews, afrind responds, Vasilvv flags scope creep) is the classic pre-interim warm-up — the editors are clearly grooming PR text to either land or punt before the call. Several items explicitly deferred to "the interim itself" (afrind's "🤷 I can spend 45 seconds asking in the interim" + Vasilvv's relay-caching open question on REDIRECT).

## moq-wg/moq-transport — PR #1586 MERGED + Issue #877 + #1345 Closed (Apr 27 05:24 UTC, just before interim)
[[alan-frindell]] merged **[PR #1586](https://github.com/moq-wg/moq-transport/pull/1586)** at Apr 27 05:24 UTC (+32/−23, *Make Object ID and Group ID delta encoded in Fetch responses*) and simultaneously closed two long-running issues:

- **[Issue #877](https://github.com/moq-wg/moq-transport/issues/877)** ("Pack the bits", opened by [[martin-duke]]) — closed Apr 27 05:24 UTC by [[alan-frindell]]. The PR delivers the wire-format bit-packing that #877 had been requesting. Notable closure: this is one of the older open Martin Duke issues to land.
- **[Issue #1345](https://github.com/moq-wg/moq-transport/issues/1345)** ("Separate the list of reasons for malformed tracks into two lists", opened by yekuiwang) — closed Apr 27 05:24 UTC by afrind alongside #1586.

The merged PR replaces inline raw IDs with delta encoding ("If the Group ID Delta field is present, the Object ID is the value of Object ID Delta if present. When the Group ID Delta field is not present, the Object ID is the prior Object's ID plus the Object ID Delta if present.") — directly resolves the Apr 23 ambiguity flagged by afrind. afrind pushed final suggested-text patches at Apr 27 05:23 UTC immediately before merging. See [[moq-transport]].

## moq-dev/moq — PR #1343 + PR #1340 MERGED, PR #1348 Opens (Apr 26 15:38 → 16:35 UTC)
A productive Apr 26 afternoon UTC for [[luke-curley]]:

- **[PR #1340](https://github.com/moq-dev/moq/pull/1340) MERGED** Apr 26 16:26 UTC (+182/−5) — *moq-lite: add OriginConsumer::wait_for_broadcast; deprecate consume_broadcast*. Lands the announcement-aware lookup that fixes the moq-gst footgun where a sync `consume_broadcast` returned `None` because announcements hadn't arrived over the wire yet. Both `OriginProducer::consume_broadcast` and `OriginConsumer::consume_broadcast` are now deprecated.
- **[PR #1343](https://github.com/moq-dev/moq/pull/1343) MERGED** Apr 26 16:35 UTC (+283/−26) — *relay: add subdomain-based slug routing for customer isolation*. The subdomain-routing primitive lands after a week of self-review and CodeRabbit iteration. The PR description grew to +283/−26 (from the Apr 23 +248/−27 + Apr 25 self-review pass). The 🔴 Critical WS/web auth-handler bypass that CodeRabbit flagged Apr 23 must have been resolved in the final iteration since Luke merged. moq-relay now supports `customer.cdn.moq.dev/foo` ≡ `cdn.moq.dev/customer/foo` via `--auth-domain`/`MOQ_AUTH_DOMAIN`/TOML `domains`.
- **[PR #1348](https://github.com/moq-dev/moq/pull/1348)** OPENED Apr 26 15:38 UTC by [[luke-curley]] (+1049/−471) — *moq-lite: backport Subscription model API for FETCH readiness*. Backports the `Subscription` / `TrackSubscriber` model-layer API from `dev`'s PR #1134 onto `moq-lite-fetch`. **The goal stated explicitly**: *"Land the API surface FETCH needs without implementing FETCH wire/stream handling — fetch can plug into TrackSubscriber::update once the wire path is added."* Major surgery: `Track` loses `priority`; new `Subscription { priority, ordered, max_latency, start, end }` carries that state instead. New `TrackSubscriber` owns group iteration (`recv_group`, `next_group`, `next_group_ordered`, `read_frame`) and per-subscriber `Subscription` state. CodeRabbit posted three review notes flagging:
  - 🔴 Critical: aggregator's `start`/`end` reduce treats `None` as "no preference" — but the struct doc says `start: None` means "deliver all cached history" and `end: None` means "no end (live)".
  - 🟡 Minor: hardcoded `priority: 0` in upstream signaling is a temporary regression.
  - 🟡 Minor: catalog's former `priority: 100` no longer carried on the track — subscribers must opt in via `Subscription`.
- **[PR #1341](https://github.com/moq-dev/moq/pull/1341)** (Refactor media producers and simplify fMP4 CMAF passthrough, open since Apr 23) — [[luke-curley]] posted **8 inline self-review comments** Apr 26 16:08–16:16 UTC ahead of the next push: *"release-plz will bump this; don't manually do it."* / *"just call it `init` honestly. Also is there some serde_as thing we could use instead of String?"* / *"Could we avoid making this pub? I don't want users to accidentally call the wrong methods?"* / *"Maybe we split this into stream.rs"* / *"Same release-plz will do this changelog."* / *"I don't think we should remove these jitter calculations. Maybe make a jitter.rs helper instead of copy-pasting? `jitter` isn't a great name, really it should be `min_frame_duration` or something."* / *"Maybe we split this into framed.rs. decoder.rs doesn't make sense any longer."* — same self-review pattern as PR #1343 used before merging today.

This is the **first FETCH-readiness commit** Luke has made on the `moq-lite-fetch` branch. Pairs with his Apr 24 spec-side argumentation on issue #1358 (JOINING FETCH priority limitations) — Luke wants both the API surface and the design clarity locked in before FETCH wire handling ships. See [[moq-dev]].

## moq-dev/moq — PR #1349 (skirsten) — Static Catalog Format (Apr 27 01:32 UTC)
A new external contributor opened **[PR #1349](https://github.com/moq-dev/moq/pull/1349)** at Apr 27 01:32 UTC (+196/−13) — *@moq/watch: add static catalog format*. Author: **skirsten** (Simon Kirsten). Adds a third catalog mode beyond `hang` and `msf`: a `"static"` mode where callers pass a `Catalog.Root` directly rather than fetching it via the hang or MSF catalog track. Also promotes `Broadcast.catalog` from a getter to a writable `Signal<Catalog.Root | undefined>` and adds a new `demo/web/src/static.html` page with a textarea + Apply button to manually drive `<moq-watch catalog-format="static">` against `bbb`. CodeRabbit flagged a 🟡 Minor issue: *"`finally` unconditionally clears a potentially user-owned signal."* (because `Signal.from` returns the caller's `Signal` instance when one is passed via `props.catalog`, the `this.catalog.set(undefined)` in `finally` could overwrite caller-owned state).

This is a **second contributor-driven catalog-format extension** to `<moq-watch>` (the first being PR #1330 / MSF, by Luke himself). Suggests the catalog-format-as-attribute API is gaining contributor mindshare. See [[moq-dev]].

## Interop Runner — One-Test Recovery (Apr 27 00:34 UTC = 23/68/14)
The Apr 27 00:34 UTC run shows **23 / 68 / 14**, **+1 pass** vs. Apr 26 (22/69/14) but still **−1 below** the Apr 25 high (24/67/14). Matches the Apr 24 reading and the Apr 15–16 baseline. The matrix walks back into Apr 27 interim parity rather than at peak. The flipped test isn't exposed in the summary report. Implementation activity in the Apr 26 02:00 UTC → Apr 27 00:34 UTC window: moq-dev/moq merged PR #1340 + PR #1343 on `main` (so docker images for `moq-dev-rs`/`moq-dev-js` should rebuild). The wait_for_broadcast change is a likely candidate for the recovery since it directly affects relay/origin lookups; the slug-routing change shouldn't affect the matrix's connection URLs. See [[interop-runner]].

## Mailing List — Weekly GitHub Digest (Apr 26)
The **Repository Activity Summary Bot** posted the weekly GitHub digest to the moq@ietf.org list on Apr 26: covers Apr 19–26 across moq-charter, moq-transport, moq-requirements, warp-streaming-format, loc, wg-materials. Highlights match what the wiki already tracks: +1 issue created (#1612 "What happens to Joining FETCH if fwd changes to 0?"), 1 closed, 5 PRs submitted (the headline interim agenda PRs), 6 receiving 9 total comments. No surprises. No other mailing-list posts since [[alan-frindell]]'s Apr 24 18:26 PDT slides-folder reply.

## Datatracker, MoQ Monthly, Slack — Quiet
- **Datatracker**: No new WG or individual draft versions since moq-lite-04 (Apr 9). draft-ietf-moq-transport-17 still the current WG transport draft.
- **MoQ Monthly**: Still only issue #0 (Mar 4).
- **Slack**: `#moq` / `#moq-rs` / `#moq-js` / `#libquicr` all quiet — no new posts in any channel since [[ian-swett]]'s Apr 23 14:12 UTC i18n review request. Four+ days of silence on the eve of the interim.
- **cloudflare/moq-rs, video-dev/moq-js, google/quiche (moqt), moqtail/moqtail, birneee/quiche_moq**: No activity in the Apr 26 02:00 UTC → Apr 27 window. moqtail's draft-16 branch landings (#168 + #169) were the last big merge, two days ago.

# Implementation Activity (Apr 25–26 UTC)

## moqtail — Two Large Draft-16 Merges into PR #145 (Apr 25 17:15 / 17:17 UTC)
The moqtail draft-16 integration branch absorbed **two substantive merges within 2 minutes** on Apr 25 afternoon UTC — the largest day for the draft-16 effort since the Apr 14–16 burst:
- **[PR #168](https://github.com/moqtail/moqtail/pull/168)** "Feature/draft16 fetch object" — merged Apr 25 17:15 UTC by @ctllmp (mervegül parlak), **+1094/−443**, into the `draft-16` branch (closes [#115](https://github.com/moqtail/moqtail/issues/115)). Lands the FETCH-object wire format finalized in the Apr 23 PR comment: bitmask `FetchObjectSerializationFlags` per draft-16 §10.4.4, delta encoding (omits inferable group/object/priority/subgroup IDs), end-of-range markers `0x8C` / `0x10C`, datagram-forwarded objects (bit `0x40`), and the first-object-must-be-fully-explicit `ProtocolViolation` enforcement. Rust enum `FetchObject { Object, EndOfRange }` and TS class with `kind: 'object' | 'end_of_range'` factories now ship in both `moqtail-rs` and `moqtail-ts`.
- **[PR #169](https://github.com/moqtail/moqtail/pull/169)** "Fix/message parameters fix" — merged Apr 25 17:17 UTC by @fatih-alperen (Alperen Fatih Zengin), **+994/−593**, into the `draft-16` branch. Migrates `FETCH`, `SUBSCRIBE_NAMESPACE`, `PUBLISH_NAMESPACE`, and `TRACK_STATUS` messages from older-draft key-value pairs to the draft-16 **Message Parameters** encoding. Validated against the local meet application before merge.

Together these two PRs add ~2.1k lines across TS + Rust libs — the cleanest single-day signal that moqtail is actively chasing draft-16 conformance for both languages in lockstep. The umbrella draft-16 PR [#145](https://github.com/moqtail/moqtail/pull/145) (zafergurel) remains open against `main`. See [[moqtail]].

## moq-dev/moq — Two Small PRs Merged + PR #1343 Self-Review (Apr 25 UTC)
- **[PR #1345](https://github.com/moq-dev/moq/pull/1345)** *"py/moq-lite: add clock + announced examples"* — merged Apr 25 15:13 UTC by [[luke-curley]] (+108/−0). Adds two Python examples for the moq-lite Python bindings (clock and announced-track demos).
- **[PR #1347](https://github.com/moq-dev/moq/pull/1347)** — merged Apr 25 14:47 UTC by dependabot[bot] (+2/−2). Bumps `rustls-webpki` from 0.103.12 to 0.103.13 in the cargo group. Routine.
- **[PR #1343](https://github.com/moq-dev/moq/pull/1343)** (subdomain-based slug routing) — still **OPEN**. [[luke-curley]] posted **two self-review rounds** on Apr 25 (22:09 UTC and 22:40 UTC) with inline comments addressing CodeRabbit's earlier feedback: "IMO do one strip_suffix call." / "Maybe add the leading . to the domain after parsing the config file?" / "We could replace . with / to support multiple paths." / "We should also lowercase and add a . prefix here." / "Why is this public? IDK seems like it's too specific." A new CodeRabbit review (Apr 24 22:22 UTC, processed today) suggests pre-canonicalizing suffixes to lowercase in `Auth::new` to avoid per-request allocation. The 🔴 Critical WS/web auth-handler bypass flagged at PR-open is still not addressed in pushed code — these self-review notes signal a rework is incoming. See [[moq-dev]].

## moq-dev/moq — Issue #1346 Root-Caused as Browser/GPU (Apr 25 14:17 → 19:15 UTC)
The first externally-reported `<moq-watch>` + MSF cross-impl bug ([issue #1346](https://github.com/moq-dev/moq/issues/1346)) saw seven exchanges between @kubo6472 and [[luke-curley]] across Apr 25 afternoon UTC. Highlights:
- @kubo6472 confirmed publishing to `cdn.moq.dev` via the OBS MoQ plugin works; Cloudflare relay still refuses to start; the watch page experienced "heavy tearing, and lagging back and forth" on `moq.dev/watch`.
- [[luke-curley]] (Apr 25 14:59 UTC): *"I don't work for Cloudflare, so I can't help debug issues with their CDN. But if it works on cdn.moq.dev then it should work on CF. … And I'm working on DVR (rewind). It'll be at least a few months."* Pointed kubo6472 at the OBS plugin and the [moq.dev blog](https://moq.dev) post.
- [[luke-curley]] (Apr 25 17:02 UTC): *"Any tearing would have to be a browser/GPU/driver issue. What are you using?"*
- @kubo6472 (Apr 25 19:11 UTC): *"Tried Chrome on Android (12) and Firefox on a Linux Mint machine with a GTX1080."* Then 19:15 UTC follow-up: *"//EDIT: tried chromium on said linux and now it works on both the /watch/live and the moq.dev/watch, cool"*.

So the original tearing turned out to be a Firefox-on-Linux/GPU-driver issue, not a moq-lite or @moq/watch defect. The underlying docs gap (kubo6472 had to paste `live.vue` source code and ask "what am I doing wrong?") remains the unresolved part of the issue — Luke implicitly handed off the "build with this" docs concern. The original cross-impl bug (`Cloudflare relay does not support broadcast discovery yet`) is unchanged: still gated on Cloudflare moq-rs implementing `SUBSCRIBE_NAMESPACE`. See [[moq-dev]].

## Interop Runner — Two-Test Regression (Apr 26 00:34 UTC = 22/69/14)
The Apr 26 00:34 UTC run shows **22 / 69 / 14**, **down 2 passes** from the Apr 25 high-water mark of 24/67/14 — back to the Apr 21–23 plateau. Breaks the two-day improvement streak (22 → 23 → 24 → 22) on the eve of the Apr 27 IETF interim. Because the regression hits ~24 hours after the Apr 25 moqtail draft-16 branch merges (#168 + #169) but moqtail's **`main`** branch and the docker image were not updated, the regression is more likely attributable to a different impl rebuild or to flaky tests rather than the draft-16 work directly. The summary report doesn't expose the pair diff. See [[interop-runner]].

## Mailing List, Datatracker, MoQ Monthly, moq-wg GitHub — Quiet
- **moq-wg GitHub**: No new issues, no new PRs, no new comments on any of the headline Apr 27 interim PRs (#1603 / #1604 / #1605 / #1607 / #1608 / #1609 / #1611 / #1613). Pre-interim lull — discussion has likely moved to the meeting itself.
- **Mailing list**: No new posts since Alan's Apr 24 18:26 PDT (Apr 25 01:26 UTC) reply with the slides-folder link. Three-plus calendar days of silence ahead of the interim.
- **Datatracker**: No new WG or individual draft versions since moq-lite-04 (Apr 9). draft-ietf-moq-transport-17 still the current WG transport draft.
- **Slack**: `#moq` / `#moq-rs` / `#moq-js` / `#libquicr` all quiet — no new posts in any channel since [[ian-swett]]'s Apr 23 14:12 UTC i18n review request.
- **MoQ Monthly**: Still only issue #0 (Mar 4).
- **cloudflare/moq-rs, video-dev/moq-js, google/quiche (moqt), birneee/quiche_moq**: No activity in the Apr 25 02:00 UTC → Apr 26 window.

# Implementation Activity (Apr 24–25 UTC)

## moq-wg/moq-transport — Luke Curley Joins the Pre-Interim Design Debate (Apr 24 22:44 → 23:36 UTC)
After being mostly absent from moq-transport spec PRs in recent weeks (concentrating on moq-dev / moq-lite), [[luke-curley]] posted three substantive comments in 52 minutes on Apr 24 evening UTC, weighing in on three of the four headline Apr 27 interim agenda items:

- **[Issue #1603](https://github.com/moq-wg/moq-transport/issues/1603)** (RRID DoS, Apr 24 22:44 UTC) — "I don't understand why it's on so many messages either. One use-case could be to make sure that you don't issue a duplicate `SUBSCRIBE track=video` until the previous one has finished (FIN/RST received), but that doesn't even work. It did work when UNSUBSCRIBE was a separate message. **IMO it needs a rethink.** And I +1 Martin's concern about DoS. I don't think it's a major issue in this instance because of MAX_STREAMS, but I'm not a fan of blocking on arbitrary IDs like Track Alias and Required Request ID in general (oops forgot a timeout)." Lines up with Martin's structural-fix camp (PR #1604) over Alan's flow-control camp (PR #1613).
- **[PR #1607](https://github.com/moq-wg/moq-transport/pull/1607)** (Largest Available Group filter, Apr 24 23:10 UTC) — Concrete defense against Suhas Nandakumar's "use NextGroup instead" suggestion. Two arguments: (1) **Catalogs require it**: "`NextGroup` will never resolve; you MUST do a JOINING FETCH or SUBSCRIBE LargestGroup. A NGR for catalogs is extremely wasteful; every existing subscriber will get a duplicate copy of the old catalog." (2) **TTV race math** (Twitch-rooted): "let's say we're 1s into a 2s group. We want to use LargestGroup to race: 1. Downloading/decoding 1s+ of old media (at network speed) to catch up from behind. 2. Or wait 1s. As a concrete example, let's say the media is 1.5Mb/s (360p) and our network can do 3Mb/s. It'll take something like 0.66s to start playback instead of 1s if we waited, plus the congestion controller will be warmed. **333ms faster startup time is HUGE**." And the combined idiom: "Ideally, you combine CurrentGroup + NGR. Again it's a race: 1. Download/decode x seconds of old media at network speed. 2. Or wait for a new group."
- **[Issue #1358](https://github.com/moq-wg/moq-transport/issues/1358)** (Subscribing to start of current Group, Apr 24 23:36 UTC) — Opens a **new design problem with JOINING FETCH and subscriber priorities**: "**when using subscriber priorities, a JOINING FETCH will never be deprioritized, even if there's a new group.**" Walks through a concrete example: at 1.5s into a 2s GoP with 3Mb/s media on 4.5Mb/s network, JOINING FETCH delivers TTV=1.33s while a hypothetical `SUBSCRIBE filter=LargestGroup order=DESC` delivers TTV=0.5s, because the SUBSCRIBE can immediately reprioritize to a new group while a JOINING FETCH cannot. Concludes: "I think you could work around this with JOINING FETCH by relying on publisher priorities. But I don't really feel like consulting the draft to see how FETCH/SUBSCRIBE priorities are supposed to interact." This issue had been dormant since Nov 2025 — Luke just made it relevant to PR #1607's discussion.

Net effect: PR #1607 (Largest Available Group filter) gets its strongest pro-merge advocate yet, with deployment-rooted numbers; PR #1604 vs PR #1613 leans further toward #1604; and the JOINING-FETCH-vs-LargestGroup-SUBSCRIBE ergonomic comparison is now part of the debate. Expect Luke's analysis to surface in the Apr 27 interim discussion. See [[moq-transport]].

## moq-wg/moq-transport — PR #1610 Merged Editorial REQUEST_OK Aliases (Apr 23 21:03 UTC)
Quietly merged 12 minutes after [[ian-swett]]'s `LGTM` review: [[alan-frindell]] landed **[PR #1610](https://github.com/moq-wg/moq-transport/pull/1610)** ("Define textual aliases for REQUEST_OK by request type", +22/−17). Introduces the shorthand names `REQUEST_UPDATE_OK`, `TRACK_STATUS_OK`, `SUBSCRIBE_NAMESPACE_OK`, `PUBLISH_NAMESPACE_OK` so the spec stops saying "REQUEST_OK (in response to X)". Purely editorial, but it unblocks **PR #1611** (Remove PUBLISH_OK message type, make it a REQUEST_OK alias) which had been parked waiting on this rename to land first. (The Apr 24 log entry incorrectly listed #1610 as still open.)

## moq-wg/moq-transport — Editorial Refinement on PR #1608 and PR #1586 (Apr 24)
- **[PR #1608](https://github.com/moq-wg/moq-transport/pull/1608)** (Subgroup ID = first Object Id) — Three new comments. [[ian-swett]] Apr 24 12:26 UTC: "That's what I mean, so I guess I should be more explicit." (responding to afrind's SG=0 + datagram concern). [[suhas-nandakumar]] Apr 24 17:43 UTC suggested-text: `Original publishers SHOULD assign each Subgroup a Subgroup ID equal to the Object ID`. [[ian-swett]] Apr 24 18:17 UTC: "Actually, re-reading the text, isn't that what it says?" PR appears to be approaching consensus on tightening the Subgroup ID = first Object ID requirement to a SHOULD.
- **[PR #1586](https://github.com/moq-wg/moq-transport/pull/1586)** (delta-encoded Object/Group ID in FETCH) — [[ian-swett]] Apr 24 18:15 UTC pushed two suggested-text patches addressing the Apr 23 ambiguity flagged by afrind, with the comment "PTAL a the suggestions below to see if they're correct?". Key clarification text: `If there is a prior Object in the Group and the Object ID Delta field is present, the Object ID is the prior Object's ID plus the Object ID Delta. When the...`. Awaiting afrind re-review.

## moq-dev/moq — PR #1343: Subdomain-Based Slug Routing for Customer Isolation (Apr 23 → 24)
[[luke-curley]] opened **[PR #1343](https://github.com/moq-dev/moq/pull/1343)** at Apr 23 00:24 UTC (+248/−27) — *relay: add subdomain-based slug routing for customer isolation*. Adds a new `--auth-domain` flag (env `MOQ_AUTH_DOMAIN`, TOML key `domains`) to configure a list of host suffixes; when a connection's URL host matches `<slug>.<suffix>`, the slug is prepended to the path before auth runs, so `customer.cdn.moq.dev/foo` is equivalent to `cdn.moq.dev/customer/foo`. Multi-label slugs (`a.b.<suffix>`) are rejected as `400 InvalidHost` to keep customer isolation unambiguous. Hosts that match no suffix fall back to plain path routing. CodeRabbit flagged a **🔴 Critical** issue at Apr 23 00:30 UTC: the WebSocket and web handlers build `AuthParams` directly without consulting `Auth::domains`, which would leak the slug-based isolation in the WS path. Last activity Apr 24 22:22 UTC. This is the first SaaS-style multi-tenancy primitive in moq-relay — directly relevant to Cloudflare's hosted relay design and to anyone running moq-relay behind a wildcard certificate. See [[moq-dev]].

## moq-dev/moq — Issue #1346: First @moq/watch + MSF Catalog Cross-Impl Bug Report (Apr 24 08:24 UTC)
@kubo6472 opened **[issue #1346](https://github.com/moq-dev/moq/issues/1346)** ("Q: how to build something with this?") with a `<moq-watch-ui>` snippet pointing the new `@moq/watch` element at the Cloudflare draft-14 endpoint:
```html
<moq-watch url="https://draft-14.cloudflare.mediaoverquic.com" name="room/bbb" catalog-format="msf">
```
Hits two errors: **`Cloudflare relay does not support broadcast discovery yet; skipping subscribe_namespace`** (warning), then `subscribe error: id=0 broadcast=room/bbb track=catalog error=SUBSCRIBE error: code=0 reason=internal error: Internal error`. First externally-reported bug exercising the `catalog-format` negotiation Luke landed in PR #1330 (Apr 20) against a non-moq-dev relay. Confirms cross-impl friction at the catalog discovery layer between moq-lite/moq-dev clients and the Cloudflare moq-rs relay (which still doesn't implement `SUBSCRIBE_NAMESPACE`). No reply yet from Luke. See [[moq-dev]] and [[moq-rs]].

## Mailing List — Alan Frindell Posts Apr 27 Interim Slides Link (Apr 24 18:26 PDT / Apr 25 01:26 UTC)
After ~2.5 calendar days of silence, [[alan-frindell]] replied to [[martin-duke]]'s Apr 22 "Monday's agenda is ready" with the slides folder link on the IETF datatracker. Notable line: *"Some content is still pending. Victor will provide updated slides on delivery timeout proposals and request ID alternatives."* — confirms that **Victor Vasiliev will present a competing proposal to RRID** at the interim, complementing Martin's PR #1604. The agenda items now have published slides for: **#1608** (Subgroup ID alignment), **#1519/#1603** (Required Request ID), **#1613** (MAX_REQUEST_UPDATES), **#1605** (delivery timeout). Time permitting: Joining FETCH Dissent. Closing call: *"please review materials beforehand to maximize our discussion time"*. See [[interim-meetings]].

## Interop Runner — Second Consecutive Up-Tick (Apr 25 00:32 UTC = 24/67/14)
The Apr 25 00:32 UTC run shows **24 / 67 / 14**, up one more pass from the Apr 24 result of 23/68/14. **First time since draft-17 publication that the matrix has improved on two consecutive days** — and the new high-water mark for April 2026 (Apr 15–16 peak was 23/68/14). One test flipped fail → pass; the summary report doesn't expose the pair diff, but the timing aligns with continued moq-dev-rs / moq-dev-js docker rebuilds picking up the hop-clustering merge and possibly other recent moq-dev fixes. See [[interop-runner]].

## Slack, Datatracker, MoQ Monthly — Quiet
- **Slack** `#moq` / `#moq-rs` / `#moq-js` / `#libquicr`: No new posts since Ian Swett's Apr 23 i18n review request — Slack remains the quietest channel on the eve of the interim.
- **Datatracker**: No new WG or individual draft versions since moq-lite-04 (Apr 9).
- **MoQ Monthly**: Still only issue #0 (Mar 4).

# Implementation Activity (Apr 24 UTC)

## moq-dev/moq — Hop-Based Clustering MERGED (PR #1322, Apr 23 23:26 UTC)
[[luke-curley]] **merged [PR #1322](https://github.com/moq-dev/moq/pull/1322)** ("moq-lite/moq-relay: hop-based clustering", +961/−979) at **23:26 UTC on Apr 23** — the structural rework of moq-relay's cluster plane that had been on the `hops-port` branch since Apr 19. Replaces the three-tier `primary` / `secondary` / `combined` origin model and the `cluster: bool` token flag with a single `OriginProducer` per relay tagged with a stable `OriginId`; every `Broadcast` now carries `hops: Vec<OriginId>` so loops are refused and the shortest path wins. CLI collapses `--cluster-root` / `--cluster-node` / `--cluster-prefix` into a single `--cluster-connect` list for full-mesh peers, plus optional `--cluster-origin-id`. `Lite04` `Announce` changes from `Vec<u64>` to `Vec<OriginId>`; `MAX_HOPS` tightened 256 → 32. `Claims::cluster` is now `#[deprecated]` — existing signed tokens still parse but the flag no longer affects routing. Browser JS `Publisher` generates a random 53-bit non-zero `originId` via `crypto.getRandomValues` per session. `cargo-semver-checks` will flag this as a **breaking change** on `moq-lite` and `moq-relay`; a `chore: release` PR #1338 was refreshed by moq-bot at Apr 23 23:42 UTC to pick up the version bumps. The PR description carries the `🤖 Generated with [Claude Code]` trailer — the largest Claude Code–authored merge to moq-dev `main` to date. Local smoke and browser-publisher interop checks remain on the unchecked test plan (wire-compatible by design, but the JS origin-id plumbing is newly executed). See [[moq-dev]].

## moq-wg/moq-transport — PR #1613: Flow-Control Response to the RRID DoS (Apr 23 → 24)
In direct response to [[martin-duke]]'s Apr 23 DoS escalation on [issue #1603](https://github.com/moq-wg/moq-transport/issues/1603) (request IDs multiplying via REQUEST_UPDATE), [[alan-frindell]] opened **[PR #1613](https://github.com/moq-wg/moq-transport/pull/1613)** at **Apr 23 23:10 UTC** (+30/0, labelled `Design`) — *Add MAX_REQUEST_UPDATES setup option and TOO_MANY_REQUEST_UPDATES error*. Per-stream flow control for REQUEST_UPDATE messages via a new `MAX_REQUEST_UPDATES` Setup Option; each `REQUEST_OK` / `REQUEST_ERROR` response restores one unit of capacity; default is 1 if not present.

Martin's response was a short arc that ran through the night:

- **Apr 23 23:28 UTC** — "What happens when REQUEST_UPDATE is aggregated as described in the draft?"
- **Apr 23 23:31 UTC** — "Actually I take it back, this doesn't solve the problem at all. The problem isn't pending REQUEST_UPDATEs, it's any REQUEST_UPDATE at all. If the sender sends 1,000 REQUEST_UPDATES, skipping a valid ID each time, and each is OKed, I still have credit to do more requests, but the receiver still has to store 1,000 request IDs in case there is a reference to them later."
- **Apr 24 00:42 UTC** — "OK, we chatted online and I get it now. Given the number of authorized streams, there's a cap on the maximum possible request ID assuming the peer isn't skipping request IDs, which it shouldn't. So this does finitely bound the non-contiguous request ID table. However, this PR is missing any text that endpoints have to check the request ID against this theoretical maximum. That's crucial, and a little tricky to write."

Net outcome: the PR is viable but incomplete — the design is accepted but the spec text that makes the bound enforceable still needs to be written. This PR is now the **alternative-frame** to PR #1604 on the Apr 27 interim: #1613 keeps RRID and adds flow control; #1604 moves Joining FETCH onto the SUBSCRIBE stream so RRID stops multiplying in the first place. See [[moq-transport]] and [[interim-meetings]].

## moq-wg/moq-transport — Issue #1612: afrind Hints at Allowing Joining FETCH with fwd=0
Responding to Martin's Apr 23 [issue #1612](https://github.com/moq-wg/moq-transport/issues/1612) ("What happens to Joining FETCH if fwd changes to 0?"), [[alan-frindell]] posted Apr 23 21:02 UTC: *"Changing the subscription from 1 to 0 after joining fetch has no effect on the FETCH. We can update the spec. Though now it seems like requiring fwd=1 is causing a lot of problems. I wonder if we should just allow fwd=0."* Meanwhile, Martin updated PR #1604 at 20:57 UTC to note "Now fixes #1612 as well" and clarified (20:55 UTC review comment) that the PR already kills the FETCH on SUBSCRIBE teardown: *"I added text that killing SUBSCRIBE also kills the FETCH. I'm not sure how else to do it; there's no other way to turn off the SUBSCRIBE."* Concrete hint that the editors are converging on relaxing the fwd=1 precondition for Joining FETCH entirely.

## moqtail — PR #168 Draft-16 FETCH Object Spec Finalized in PR Comment (Apr 23 20:01 UTC)
@beyzademirr posted a detailed status comment on [moqtail#168](https://github.com/moqtail/moqtail/pull/168) formalising the final draft-16 FETCH-object wire format and API shape for moqtail-rs + moqtail-ts: Serialization Flags varint (subgroup mode + object_id / group_id / priority present bits + extensions + datagram bits + End-of-Range markers at 0x8C / 0x10C), sum-type API (Rust `enum FetchObject { Object, EndOfRange }`; TS class + factories), `FetchObjectContext` threaded through serialize/deserialize. FETCH objects no longer carry Object Status; zero-length payload = zero-length Normal object. Client-js / meet / Rust client apps stay source-compatible. Follows the Apr 23 19:49–19:56 UTC conflict-resolution push by @ctllmp. See [[moqtail]].

## Interop Runner — First Up-Tick in 3 Days (Apr 24 00:35 UTC = 23/68/14)
After three days flat at 22/69/14 (Apr 21–23), the **Apr 24 00:35 UTC** run finally moved up by one: **23 / 68 / 14**, matching the Apr 15–16 baseline. One test flipped fail → pass; the summary report doesn't expose the pair diff directly, but the timing (Apr 23 23:26 UTC hop-clustering merge, ~1 hour before the run) is consistent with a moq-dev-rs / moq-dev-js docker rebuild picking up the new cluster plane. See [[interop-runner]].

## Slack #moq — Ian Swett Asks for i18n Statement Review (Apr 23 14:12 UTC)
[[ian-swett]] posted to `#moq`: *"If anyone has any familiarity with Internationalization Statements, can they review: moq-transport/pull/1588. I think it looks ok, but it's generated by AI based on past IETF docs, so it'd be good to have a review from someone who knows more than Alan and I."* Refers to [moq-transport PR #1588](https://github.com/moq-wg/moq-transport/pull/1588) (Add internationalization statement for moqt URI scheme). Still outstanding — no response on the channel.

## Mailing List, Datatracker, MoQ Monthly — Quiet
- **Mailing list**: Still no new posts since [[martin-duke]]'s Apr 22 19:41 PDT "Monday's agenda is ready" notice — two calendar days of silence ahead of the Apr 27 interim.
- **Datatracker**: No new WG or individual draft versions since moq-lite-04 (Apr 9).
- **MoQ Monthly**: Still only issue #0 (Mar 4).

# Implementation Activity (Apr 23–24 UTC)

## moq-wg/moq-transport — Pre-Interim Editor Wave (Apr 23)
With the Apr 27 interim agenda locked in, the editors pushed a large batch of PRs, issues, and review activity on Apr 23 — the largest single-day moq-transport burst since the draft-17 consensus call closed. Key items:

- **PR #1606 MERGED** (Apr 23 18:32 UTC, [[alan-frindell]]) — *Generalize stream reset codes to all request streams* (fixes #1581). The first new merge to `main` since the draft-17 publication. Adds `GOING_AWAY` (0x4), `EXPIRED_AUTH_TOKEN` (0x7), `SESSION_CLOSED`, and aligns `TOO_FAR_BEHIND`/`EXPIRED` codes between stream-reset and `PUBLISH_DONE` registries. Approved earlier in the day by [[ian-swett]] (see yesterday's log).
- **PR #1608 opened** (Apr 23 17:01 UTC, [[ian-swett]], +9/−10) — *Make Subgroup ID identical to first Object Id in the Subgroup*. Authored by Jules AI on Ian's behalf. Fixes #1405, closes #1593. First review comment by [[alan-frindell]] (18:31 UTC): "still relevant if you have a group with SG=0 and datagrams. Unless you are saying that the datagram's object ID is compared to the subgroup ID, in which case you should be more explicit." This is the direct follow-up to Ian's Apr 23 01:29 UTC inline comment on PR #1607 — now a standalone PR that retires the long-running "Largest Object" subgroup-start ambiguity.
- **PR #1609 opened** (Apr 23 18:41 UTC, [[alan-frindell]], +3/−2) — *Joining Fetch forward state mismatch is a request error* (fixes #1601 by Martin Duke). Downgrades the previously-session-fatal forward-state mismatch (race between REQUEST_UPDATE forward=1 on the subscription stream and a joining FETCH on a different stream) to a request error. Small wording change, non-controversial.
- **PR #1610 opened** (Apr 23 18:51 UTC, [[alan-frindell]], +22/−17) — *Define textual aliases for REQUEST_OK by request type*. Introduces shorthand names `REQUEST_UPDATE_OK`, `TRACK_STATUS_OK`, `SUBSCRIBE_NAMESPACE_OK`, `PUBLISH_NAMESPACE_OK` so the spec stops saying "REQUEST_OK (in response to X)". Purely editorial.
- **PR #1611 opened** (Apr 23 18:56 UTC, [[alan-frindell]], +11/−30) — *Remove PUBLISH_OK message type, make it a REQUEST_OK alias* (fixes #1598). **Wire format change**: PUBLISH_OK had the same wire format as REQUEST_OK (no Track Properties, only Parameters), so the code point is removed and PUBLISH_OK becomes a textual shorthand. Author's note: "retarget main branch after #1610 lands".
- **Issue #1612 opened** (Apr 23 20:25 UTC, [[martin-duke]]) — *"What happens to Joining FETCH if fwd changes to 0?"*. Martin asks for spec clarity on whether sending Joining FETCH after fwd flips to 0 mid-subscription cancels the FETCH. Open question, no preferred resolution.
- **PR #1586 reviews** (Apr 23) — delta-encoded Object/Group ID in FETCH responses. [[alan-frindell]] pushed back on "first object in the group" ambiguity (17:46 UTC): for FETCH starts mid-group, the semantics aren't obvious. [[ian-swett]] added a suggestion clarifying the Group-ID-Delta-present case uses the absolute Object ID Delta (19:44 UTC).
- **PR #1605 reviews** (Apr 23) — [[alan-frindell]] left three inline suggestions on Vasiliev's DELIVERY_TIMEOUT split (18:02 UTC): **"we should explicitly permit cancellation of retransmissions after delivery timeout, and even suggest that is optimal"**; "evaluate the datagram's delivery timeout as late as possible before sending, after any internal queuing"; and the same "as late as possible" guidance on the subgroup path.
- **PR #1607 review** (Apr 23 15:07 UTC) — [[suhas-nandakumar]] marked Vasiliev's Largest Available Group filter as **CHANGES_REQUESTED**, the first hard blocker on that PR since it opened. Still needs a proper review writeup.
- **PR #1534 decision** (Apr 23 19:34 UTC) — [[alan-frindell]]: "Discussed in author/editor call: Remove REDIRECT message from this PR. Use GOAWAY on a bidi stream to mean what REDIRECT did." Confirms an editor call happened earlier Apr 23 in US hours; the outcome is that redirect semantics will be overloaded onto GOAWAY rather than a new control message.
- **Issue #1603 discussion** (Apr 23) — *What is the use case for required-request-id*. The thread flared up with [[martin-duke]] raising a **DoS vector**: "I need to keep a scoreboard of all received request IDs to check if I processed them, even if the request is long-dead. A malicious client could use every other request ID to maximize my state." [[alan-frindell]] counter-argued that QUIC's max-bidi-stream limits bound the state, but Martin notes request IDs multiply via REQUEST_UPDATE even on a single stream. Martin's concrete proposal (19:20 UTC): (1) eliminate required-request-id and Request ID in REQUEST_UPDATE; (2) use SWITCH for ordering forward-mode swaps or accept REQUEST_ERROR; (3) put Joining FETCH in the SUBSCRIBE stream (per PR #1604); (4) add a "modified request ID" field to REQUEST_UPDATE if needed. Martin flags: "I have all these aesthetic concerns, but I do want to highlight that there is a DoS vector in here that IMO we must address."
- **Issue #1578** (Apr 23 12:56 UTC) — [[ian-swett]]: "Fair point, this rename makes sense to me and reduces likelihood that people will mistakenly think Largest Object gives them a join point" — agreeing with Luke's bikeshed to rename `Largest Object` → `Next Object`.
- **Issue #1476** (Apr 23 19:18 UTC) — [[alan-frindell]] notes "Victor asks if it's ok to go from zero to non-zero" on the DELIVERY_TIMEOUT extension-scope question.

The shape of the Apr 27 editor session is now clear: 1605, 1607, 1608, 1609, 1610, 1611 are the six PRs; #1603 (required-request-id) is the heaviest open design issue. See [[moq-transport]] and [[interim-meetings]].

## cloudflare/moq-rs — Semgrep CI Scanning (PR #165, Apr 23)
[[hrushikeshdeshpande]] (Cloudflare AppSec/ProdSec) opened [PR #165](https://github.com/cloudflare/moq-rs/pull/165) at 20:47 UTC adding a Semgrep Community Edition (OSS) scanning workflow to the repo. Context: Cloudflare's App&ProdSec team is migrating from Semgrep Pro to Semgrep CE. Runs on every PR, on pushes to main/master, and monthly on a staggered schedule. Uses `actions/cache@v5`, pinned to `semgrep==1.160.0` with `--config=auto`, runs on `ubuntu-slim`. +30/0. No code-repo activity on the MoQ relay itself — PR #157 (Pub/Sub Namespace Support) remains open without new pushes since Apr 21.

## moq-dev/moq — Python Examples Land (PR #1345, Apr 23)
[[luke-curley]] opened [PR #1345](https://github.com/moq-dev/moq/pull/1345) at 20:39 UTC (+108/0) adding two Python examples to the `py/moq-lite` package: `examples/clock.py` (Python twin of `rs/moq-clock` — publishes UTC timestamps one group/minute, one frame/second) and `examples/announced.py` (CLI listing broadcasts announced under a prefix). Both use `argparse` and the `async with moq.Client(...)` pattern. This is the **fifth PR in Luke's Apr 22–23 burst** (after #1339, #1340, #1341, #1343, #1344) and extends the Python binding surface that PR #1318 (Lullabee, Apr 16) started with raw track publish/consume.

## moqtail/moqtail — PR #168 Conflict Resolution (Apr 23)
@ctllmp pushed two merge-conflict-resolution commits (`0570542` at 19:49 UTC, `bf84690` at 19:52 UTC) and then merged `draft-16` into `feature/draft16-fetch-object` at 19:56 UTC (`1f967c1`) on the long-running [moqtail PR #168](https://github.com/moqtail/moqtail/pull/168) (draft-16 FetchObject). PR has been open since Mar 30 and is the umbrella for draft-16 §10.4.4 fetch-object serialization with delta encoding and end-of-range markers (+1094/−443). No new substantive changes — this is rebase work ahead of a push to land. See [[moqtail]].

## Mailing List, IETF Datatracker, Interop Runner — Quiet
- **Mailing list**: No new posts since [[martin-duke]]'s Apr 22 19:41 PDT "Monday's agenda is ready" notice.
- **Datatracker**: No new WG or individual draft versions since moq-lite-04 (Apr 9).
- **Interop runner**: No new run posted for Apr 24 (last run Apr 23 00:35 UTC = 22/69/14).
- **MoQ Monthly**: Still only issue #0 (Mar 4).

# Implementation Activity (Apr 22–23)

## moq-wg/msf — InitTracks Reverted, Static-Init Wins (PR #154, Apr 22)
After six days of back-and-forth on [msf#153](https://github.com/moq-wg/msf/issues/153), [[will-law]] **reverted his own PR #141** ("Add support for InitTracks") in [PR #154](https://github.com/moq-wg/msf/pull/154) (merged **Apr 22 17:01 UTC**, −170 lines). Reasoning posted in #153:

> After feedback from @vasilvv, comments from @kixelated and discussion with @suhasHere, I reverted the PR adding inittracks. The merged design did not provide a practical solution to synchronize mid-stream changes. Additionally, streams requiring mid-stream parameter re-initialization can leverage **AVC3 self-initializing segments** as defined by ISO/IEC 14496-15. Each segment contains the SPS/PPS inside the media data units. To keep MSF simple, we'll stick with statically declared inits.

Will also proposed addressing catalog bloat from repeated `initData` declarations via either (a) an `initCopy` track property pointing to another track's init, or (b) a more general `inherit` track property inheriting all properties from a parent track unless overwritten. [[victor-vasiliev|Victor Vasiliev]] asked if [#144 catalog compression](https://github.com/moq-wg/msf/issues/144) (zlib) could solve it instead. [[luke-curley]] suggested `initCopy` makes sense for HLS→MoQ demuxers that don't re-encode init segments, but argued "two tracks *shouldn't* have identical init data if the publisher is building them correctly" — init data should describe a single track, not multiplex. See [[moq-msf]].

## moq-wg/msf — Luke: "Sequence Aligned Groups Are Too Restrictive" (Issue #155, Apr 22 22:47 UTC)
[[luke-curley]] opened [msf#155](https://github.com/moq-wg/msf/issues/155) pushing back on §4.2's "The render duration of the first media object of each equally numbered MOQT Group, after decoding, MUST have overlapping presentation time." He reads this as requiring **group-aligned boundaries across tracks**, and lists four reasons MSF should loosen the requirement:

1. **Audio buffering**: Group alignment forces audio to wait for video keyframe boundaries — 300ms of video encode latency forces at least 300ms of audio encode latency because audio can't flush until keyframe boundaries are known. Hurts (re)transmit-early latency wins.
2. **On-demand encoding**: Generating a late rendition (e.g., 1080p arriving after 360p is already on-air) requires seeking back to align GoPs — means keeping raw frames in memory when not encoding.
3. **Mixed GoP sizes**: Prevents 1s GoPs for 360p (fast join/switch-down) combined with 4+s GoPs for 4K (slow switch-up). "We have a chance to improve upon HLS/DASH here."
4. **Transcoding non-source renditions**: For passthrough-then-transcode pipelines (e.g., Twitch accepting OBS h.264 and transmuxing), keyframes must land at exactly the same frame boundaries as the source.

Luke's conclusion: CMSF can keep group alignment for HLS/DASH back-compat, but **MSF should be more lenient** — tracks share the same PTS but not necessarily the same group boundaries. See [[moq-msf]].

## moq-wg/moq-transport — Ian Swett Review Wave on PRs #1605, #1606, #1607 (Apr 23 early UTC)
[[ian-swett]] posted reviews on three open PRs within 15 minutes (01:20–02:10 UTC Apr 23):

- **PR #1606** ([[alan-frindell]]'s stream-reset-codes generalization) — **APPROVED** (01:20 UTC). This PR moves stream reset code definitions earlier so they apply to all request streams, adds `GOING_AWAY` (0x4), `EXPIRED_AUTH_TOKEN` (0x7), `SESSION_CLOSED`, and aligns `TOO_FAR_BEHIND`/`EXPIRED` codes between the stream-reset and PUBLISH_DONE registries. Fixes #1581.
- **PR #1607** ([[victor-vasiliev|Victor Vasiliev]]'s Largest Available Group filter) — one inline comment (01:29 UTC): "The first object in a subgroup starts the subgroup except in cases like 'largest Object' today and when a range filter explicitly starts partway through a Group. ... We could force the Subgroup ID to be the Object ID of the first Object, and then it'd be unambiguous." Posted as a cross-reference on [issue #1405](https://github.com/moq-wg/moq-transport/issues/1405) (Single Object Subgroups don't need a Subgroup ID) two minutes later.
- **PR #1605** ([[victor-vasiliev|Victor Vasiliev]]'s DELIVERY_TIMEOUT split) — review summary (02:08 UTC): "I think this looks reasonable, but I don't intuitively understand why two timeouts are necessary." Plus six line-level suggestions, notably: renaming to "Delivery Timeouts and Data Reliability {#delivery-timeouts}", softening `MUST` → `SHOULD` where a timer isn't strictly required, suggesting `MAY`/`SHOULD` on WebTransport datagram-queue timeouts (pragmatic because WebTransport supports this natively).

All three PRs are on the **Apr 27 interim agenda** (see [[interim-meetings]]).

## moq-dev/moq — Catalog-Format Docs, `wait_for_broadcast` API, Producer Refactor, Subdomain Routing (Apr 22–23)
[[luke-curley]] pushed a four-PR burst on `main` spanning 8 hours:

- **PR #1339** (merged Apr 22 16:51 UTC, +5/−5) — Bump JS patch versions to publish `recvGroup`. `@moq/lite@0.2.1` on NPM was published Apr 16 **before** the `recvGroup` API landed in #1324 on Apr 17, so `@moq/watch@0.2.9` built against the new API declared `@moq/lite: ^0.2.1` and resolved to the broken 0.2.1 for consumers, causing runtime errors when `recvGroup` was called.
- **PR #1340** (open, Apr 22 17:16 UTC, +182/−5) — `moq-lite: add OriginConsumer::wait_for_broadcast; deprecate consume_broadcast`. Flags synchronous `consume_broadcast` as a footgun: a freshly-connected origin has not yet received any announcements over the wire, so a sync lookup returns `None` even when the broadcast is about to arrive. moq-gst's source hit this directly. New `wait_for_broadcast(path)` scopes a fresh consumer to the path and loops.
- **PR #1341** (open, Apr 23 00:01 UTC, +748/−1145) — `Refactor media producers and simplify fMP4 CMAF passthrough`. Renames `moq_mux::import` → `moq_mux::producer`, removes the `Fmp4Config` passthrough flag, makes CMAF passthrough the only fMP4 mode.
- **PR #1343** (open, Apr 23 00:24 UTC, +226/−37) — `relay: add subdomain-based slug routing for customer isolation`. New `--auth-domain`/`MOQ_AUTH_DOMAIN` flag accepts suffix lists; when a connection URL host is `<slug>.<suffix>`, the slug is prepended to the path so `customer.cdn.moq.dev/foo` equals `cdn.moq.dev/customer/foo`. Multi-label slugs allowed.
- **PR #1344** (merged Apr 23 01:12 UTC, +31/−0) — Add catalog-format configuration docs for `@moq/watch` (hang vs MSF, HTML example, auto-negotiation note).
- **Issue #1342** (open, Apr 23 00:08 UTC) — *"Raw QUIC doesn't support paths"*: No PATH SETUP parameter, so only WebTransport works with path-based auth today.

See [[moq-dev]].

## Interop Runner — Apr 23 Flat at 22/69/14
The **Apr 23 00:35 UTC** run is again **22 / 69 / 14** — third consecutive day at the same pass count after the two-day Apr 21–22 recovery (18→20→22). No further movement; the 1-test gap to the Apr 16 baseline (23/68/14) persists. See [[interop-runner]].

## IETF MoQ WG — Apr 27 Interim Agenda Published ([[martin-duke]], Apr 23 02:41 UTC)
[[martin-duke]] sent a short mailing-list note ("It's all editor time") announcing the [interim-2026-moq-14 agenda](https://datatracker.ietf.org/doc/agenda-interim-2026-moq-14-moq-01/) on the MoQ list. Editor-driven session working through:
1. **PR #1542 / Issue #1458** — Split `SUBSCRIBE_NAMESPACE` and `SUBSCRIBE_TRACKS` with prefix update ([[alan-frindell]]).
2. **PR #1586** — Delta-encode Object ID and Group ID in FETCH responses ([[ian-swett]]).
3. **Issue #1604 / Issue #1602** — Placement of Joining FETCH on the SUBSCRIBE stream (noted as having complications).
4. **PR #1605** — Split `DELIVERY_TIMEOUT` into two types (Vasiliev); potentially resolves #1476.
5. **PR #1603 / Issue #1519** — Required request ID for draft-17.
6. **General discussion** — Whether removing Message Parameters was a mistake.

Meeting runs **2026-04-27 16:30 UTC** via Meetecho. See [[interim-meetings]].

# Implementation Activity (Apr 21–22)

## moq-wg/msf — Luke Pushes Back on `initTrack`, Prefers Static Init or annexb (Issue #153, Apr 21)
[[luke-curley]] weighed in on [msf#153 "`initTrack` does not work"](https://github.com/moq-wg/msf/issues/153) (Vasiliev's Apr 10 report of a race between init-track and media-track updates when init version changes at the same group). Two comments on Apr 21:

- **16:21 UTC**: Acknowledges the race also occurs with inline init segments. Proposes a general mechanism — have each media segment reference its init segment via the MP4 `track_id` (instead of hard-coding 1). If a `moof` references an unknown `track_id`, the player blocks until the matching `moov` arrives. To avoid a rare race for new subscribers, the new init could carry both old and new `track_id` entries for a few seconds.
- **16:26 UTC**: "To be honest, I'd rather just use annexb instead of dynamic init segments. It avoids this whole class of problem and any HLS import library can make a separate track on discontinuity or new init. I'm fine reverting `initTrack` if we add the restriction that init data (and codec mime) are static. If `initData` is not present, init data is inline."

Will Law's earlier proposal (an `inits[]` array with a per-object init reference ID) and Vasiliev's original "remove `initTrack`" stance are both in play; Luke's contribution reopens the static-init / annexb simplification path. See [[moq-msf]].

## cloudflare/moq-rs — Suhas Fixes Forwarding + Datagram Rate on PR #157 (Apr 21 morning UTC)
[[suhas-nandakumar]] pushed **five more commits** to [moq-rs PR #157](https://github.com/cloudflare/moq-rs/pull/157) between 06:39 and 08:46 UTC on Apr 21 — a direct follow-up to the 03:13–05:30 UTC debug run documented in the Apr 21 log entry:

- `7f95515` (06:39) — Forward `track_extensions` in PUBLISH messages.
- `4e33675` (07:41) — Fix stream header type mismatch when forwarding objects without extensions.
- `0112f91` (08:03) — Fix datagram forwarding to use a broadcast channel for proper queueing.
- `1148fa1` (08:24) — **Fix datagram forwarding rate from 1/sec to 50/sec** (throughput regression in the earlier refactor).
- `5c0606d` (08:46) — Fix object encoding to match header type in SUBSCRIBE flow.

Two themes in this batch: propagating `track_extensions` through the relay forwarding path correctly, and repairing datagram-channel behaviour that had regressed to a 1/sec serialisation bottleneck. See [[moq-rs]].

## google/quiche — Martin Duke Refactors moqt_messages.h, Adds Session-Parameter Hooks (Apr 22 early UTC)
Two commits from [[martin-duke]] on Apr 22:

- `c8ff6dc4` (03:59 UTC) — *Move some non-message-related data structures out of `moqt_messages.h`.* Prep refactor to untangle the monolithic messages header before the session-parameter work.
- `10045277` (04:16 UTC) — *Allow `MoqtClient` and `MoqtServer` to control session parameters.* Exposes an API so applications can tune session-level parameters (groundwork for partial-object delivery on the relay).

See [[quiche-moq]].

## moqtail/moqtail — Subscription Timeout 1s → 5s, New Scheduling Algorithm Issue (Apr 21)
- **PR #175** merged Apr 21 06:17 UTC ([zafergurel](https://github.com/zafergurel)): *"fix wrong termination of a subscription"*. When a subscription received no events for 1 second it was being terminated; the timeout is raised to **5 seconds** to tolerate congested links, plus minor optimizations (+47/−42).
- **Issue #176** opened Apr 21 17:42 UTC ([zafergurel](https://github.com/zafergurel)): *"Implement the scheduling algorithm (Draft 16 Section 7.2)"*. The current relay does not honor subscribe/publish message priorities; draft-16 §7.2 scheduling is not yet implemented.

PR #168 (draft-16 fetch object) remains open.

## Interop Runner — Second Partial Recovery, Now 22/69/14 (Apr 22)
The **Apr 22 00:30 UTC** run is **22 / 69 / 14** — another +2 pass / −2 fail vs. Apr 21. Two consecutive daily improvements after the four-day stall at 18/73/14. Still 1 short of the Apr 16 baseline (23/68/14). See [[interop-runner]].

# Implementation Activity (Apr 20–21)

## cloudflare/moq-rs — Suhas Iterates on PR #157 Publish/Subscribe Namespace (Apr 21 early UTC)
[[suhas-nandakumar]] pushed **nine commits** to [moq-rs PR #157](https://github.com/cloudflare/moq-rs/pull/157) between 03:13 and 05:30 UTC on Apr 21, iterating on the SUBSCRIBE_NAMESPACE / PUBLISH_NAMESPACE relay flow that sits on top of Manish's draft-16 migration branch. The commit sequence reads like a focused debugging session:

- `c8cb923` — Add `REQUEST_UPDATE` with `forward=1` when a subscriber arrives for a paused track.
- `12ac6bf` — Fix `PublishNamespace` handle lifetime and stale-track cleanup.
- `54a3557` — Remove stale namespace entry on publisher reconnect.
- `cd0bdcd` — Keep `PublishNamespace` handles alive inside `serve_subscribe_namespace`.
- `a29815e` — Fix `SUBSCRIBE_NAMESPACE` to send `NAMESPACE` instead of `PUBLISH`.
- `43b5665` — Fix `SUBSCRIBE_NAMESPACE` to wait for `PUBLISH_OK` before streaming.
- `4dcaa7a` — Add self-exclusion to the `SUBSCRIBE_NAMESPACE` flow (matches PR #1596's "exclude your own tracks" rule).
- `fbefe1d` — Send `PUBLISH` for existing tracks on `SUBSCRIBE_NAMESPACE`.
- `eddc7bc` — Only send `PUBLISH` for tracks, not `PUBLISH_NAMESPACE`.

The overall PR is now **+6270/−2083** across 82 files. It bundles Manish's draft-16 migration (#131) with a new relay `subscriber_registry`, preserved subgroup-header forwarding (fixes EndOfGroup handling), a fix for a 1-second freeze on group transitions, and a web-transport v0.10 upgrade with subprotocol negotiation. See [[moq-rs]].

## video-dev/moq-js — Manish's Player Lifecycle + Audio Fix (PR #70, Apr 20 18:55 UTC)
Manish ([@itzmanish](https://github.com/itzmanish)) opened [moq-js PR #70](https://github.com/video-dev/moq-js/pull/70) — *"fix: moq-js player lifecycle and browser audio playback"* — a **+9542/−6440** sweeping change. The substantive playback work:
- Reworked `lib/playback/worker/audio.ts` (+137/−9): better browser audio handling.
- Extended `<video-moq>` lifecycle (`lib/video-moq/index.ts`) and the worker's index, timeline, video, and worklet code.
- `lib/transport/subscriber.ts` (+32/−3): subscriber plumbing for lifecycle.

The bulk of the diff volume is **deleting the old `web/` blog site and its assets** and bundling a fresh `demo/lib/publish.iife.js` (+9066). First substantive moq-js PR since Ali Begen's UI refactor work in mid-April. See [[moq-js]].

## moq-wg/moq-transport — Aman Sharma Typo Review on PR #1607 (Apr 20 evening)
Aman Sharma ([@sharmafb](https://github.com/sharmafb)) left two inline review comments on [PR #1607](https://github.com/moq-wg/moq-transport/pull/1607) (Vasiliev's Largest Available Group filter) on Apr 20 23:14–23:33 UTC — both trivial typo fixes (`available` / `Available` casing in the draft text, lines 1427 and 1442). No substantive new debate; the partial-cache discussion with Luke remains open from Apr 19.

## Interop Runner — First Partial Recovery from the Apr 17 Regression (Apr 21)
The **Apr 21 00:33 UTC** run is **20 / 71 / 14** (up from 18/73/14). First movement after **four consecutive days** flat at the regression floor since Apr 17. Two tests flipped back from fail to pass — specific pair(s) still need identification. See [[interop-runner]].

# Implementation Activity (Apr 19–20)

## moq-dev/moq — Hop-Based Clustering Refactor (PR #1322, Apr 19)
[[luke-curley]] opened [PR #1322](https://github.com/moq-dev/moq/pull/1322) porting the hop-based clustering design from the `origin/dev` branch (#1082 + #1152) onto `main`. Large refactor (**857+/-900** lines) that replaces the three-tier `primary`/`secondary`/`combined` origin model and the `cluster: bool` token flag with a **single `OriginProducer` per relay** tagged with a stable `OriginId`. Every `Broadcast` now carries a `hops: Vec<OriginId>` chain so loops are refused and the shortest path wins.

Highlights:
- New `OriginId` type — non-zero 62-bit varint, encoded as `u64` on the wire.
- `Lite04` `Announce` changes from `Vec<u64>` to `Vec<OriginId>`; `Lite03` still decodes as `UNKNOWN` placeholders.
- `MAX_HOPS` tightened from 256 → **32** (matched in the JS `@moq/lite` publisher).
- `moq-relay` CLI flattens: `--cluster-root`/`--cluster-node`/`--cluster-prefix` → `--cluster-connect` (repeat or comma-sep for full mesh), plus optional `--cluster-origin-id` for deterministic IDs in tests.
- `Claims::cluster` is now `#[deprecated]`; existing tokens still parse but the flag no longer affects routing.
- Browser clients generate a random 53-bit non-zero `originId` per session — they only publish their own broadcasts (no forwarding), so they don't need full loop-detection logic.
- `demo/relay/{root,leaf0,leaf1}.toml` switched to the mesh `connect = [...]` format with pinned per-node `origin_id`s.

`cargo-semver-checks` will flag this as a **breaking change** on `moq-lite` and `moq-relay`. See [[moq-dev]] and [[moq-lite]].

## moq-dev/moq — MSF Catalog Format with Auto-Negotiation (PR #1330, Apr 19–20)
[[luke-curley]] opened [PR #1330](https://github.com/moq-dev/moq/pull/1330) adding **MSF catalog format** support alongside the existing Hang format, with **race-based format negotiation**:
- New `@moq/msf` package with Zod-validated MSF catalog schema and encode/decode/fetch helpers.
- `js/watch/src/msf.ts` converts MSF catalogs into the internal Hang shape (`toHang()`, `toVideoConfig()`, `toAudioConfig()`, `toContainer()` parsing CMAF init segments with legacy-format fallback).
- `Broadcast` gains a `catalogFormats` signal; `<moq-watch>` gains a new `catalog` attribute accepting `"hang"`, `"msf"`, or `"auto"`.
- Fetch race: Hang gets a **100ms head start**, then `Promise.any()` picks the first successful catalog. Winner continues for subsequent updates, avoiding format switching mid-stream.

Concrete step toward MSF becoming a first-class catalog format in Luke's stack (not just the Hang-specific one). See [[moq-msf]] and [[catalog-format]].

## moq-dev/moq — WebSocket Fallback Tuning (PR #1335, Apr 19)
[[luke-curley]] opened [PR #1335](https://github.com/moq-dev/moq/pull/1335) raising the moq-lite WebSocket fallback head start from **200ms → 500ms** to give QUIC more runway, and adding an explicit synchronous check so the WebSocket connect attempt bails out when WebTransport has already won the race (closes a tight microtask-ordering window).

## moq-dev/moq — Infrastructure Merges (Apr 19–20)
- **PR #1332** (merged Apr 19) — `moq-native`: resolve DNS hostnames in `--server-bind` (accepts `host:port` inputs like Fly.io's `fly-global-services:443`; first resolved address is used since Quinn doesn't support multi-address bind).
- **PR #1331** (merged Apr 19) — Update `fly.toml` to use the hosted docker image.
- **PR #1333** (merged Apr 19) — Update `flake.lock` dependencies.
- **PR #1284** (merged Apr 19) — Add `README` files for Rust crates.
- **PR #1336/#1337** (merged Apr 20) — Nix: downgrade crane to avoid needing Rust 1.95; align toolchain with devShell's `rust-overlay` stable.
- **Release PRs #1321 + #1334** (merged Apr 19–20) — `chore: release` bumps.

## Luke Curley Reviews PR #1607 — Pushes Back on "MUST + Full Cache" (Apr 19)
[[luke-curley]] left the first substantive review on [moq-transport PR #1607](https://github.com/moq-wg/moq-transport/pull/1607) (Vasiliev's Largest Available Group filter): *"The MUST is too strong and requiring a full cache is too narrow."* His counter-proposal:

> A relay MAY attempt to reconstruct subscription from a partial cache. An object MUST NOT be served until all prior objects within that sub-group have been served. This can be deduced by sequence numbers, upstream subscriptions (sub-groups are ordered), and/or upstream fetches (groups are ordered).

This keeps the filter shape from #1607 but loosens the strict "complete group only" and "no relay backfill" constraints that Vasiliev included as distinguishing features. Signals that the LargestGroup convergence still has a live sub-debate around **partial cache / partial group** handling, even as everyone continues to agree on the overall direction. See [[joining-fetch-dissent]] and [[moq-transport]].

## google/quiche — `moqt::SubscribeWindow` Removed (Apr 20)
[[martin-duke]] landed commit [`9843feb`](https://github.com/google/quiche/commit/9843feb) on Apr 20 14:37 UTC: *"Get rid of moqt::SubscribeWindow."* Continues the ongoing cleanup of legacy SUBSCRIBE window tracking as draft-17's PUBLISH/SUBSCRIBE model settles. See [[quiche-moq]].

# Mailing List (Apr 19)

## Weekly GitHub Digest (Apr 19)
The automated [Repository Activity Summary Bot](https://mailarchive.ietf.org/arch/browse/moq/) (do_not_reply@mnot.net) posted its regular weekly "Media Over QUIC Activity Summary" to the list on Apr 19. No substantive discussion; purely a mechanical rollup of the week's GitHub activity across moq-wg repos.

# Mailing List & GitHub Activity (Apr 18–19)

## Gwendal Simon Dissents on REWIND Consensus — Charter Requires ABR Switching (Apr 18)
[Gwendal Simon's reply](https://mailarchive.ietf.org/arch/msg/moq/1DoFuRdZDWMVXb9e7AXxpgR_EZ8/) to the [[joining-fetch-dissent|REWIND consensus thread]] pushes back on the Alan/Luke/Victor convergence around a narrow LargestGroup/CurrentGroup/CurrentGroupFill filter. His argument:
- **Charter alignment**: ABR track switching is an explicit charter deliverable; deferring it to "extensions or V2" contradicts the charter.
- **Not an edge case**: A subscriber is "almost always behind the live edge" during a switch (congestion and intentional buffering both create lag).
- **CurrentGroup is insufficient**: It handles the join case for a single group, but ABR switching requires access to "an arbitrary range of past groups."
- **Real blocker is semantic, not HOL**: The actual V1 constraint is that **past objects are not allowed in a PUBLISH stream**. He asks the WG to reconsider that rule, scoped narrowly.
- **Proposed path**: "Joining PUBLISH with live semantics" — already prototyped in [PR #1378 (SWITCH)](https://github.com/moq-wg/moq-transport/pull/1378). See [[switch-abr]].

This is currently the only dissent on the emerging LargestGroup convergence documented in [[joining-fetch-dissent]]. The REWIND consensus call still closes **May 1, 2026**.

## Implementation, GitHub, Drafts — Quiet (Apr 18–19)
- **moq-transport**: No new issues or PRs; PR #1607 (Largest Available Group filter, Vasiliev) remains the most recent activity.
- **MSF / LOC / CMSF / Secure-Objects / Catalog-Format**: No new activity.
- **moq-dev/moq**: Only a release bot PR (#1321) opened Apr 18; no new code commits since PR #1327 / #1318 merged Apr 17.
- **cloudflare/moq-rs, video-dev/moq-js, moqtail, google/quiche MoQT, birneee/quiche_moq**: No new activity in this window.
- **IETF Datatracker**: No new WG or individual draft versions.
- **MoQ Monthly**: Still only issue #0 (Mar 4).

## Interop Runner — Stable at 18/73/14 (Apr 19)
The [[interop-runner]] ran on Apr 19 00:32 UTC and reported **18 pass / 73 fail / 14 skip** across 105 tests — identical to the Apr 17 regression baseline. No recovery from the Apr 17 drop yet; investigation of the pair-level regression (moqtail draft-16 merges + moq-dev broadcast/auth changes) still pending.

# Slack #moq Highlights

## moqlivemock `mlmtest` Interop Client PR (Apr 17)
Torbjörn Einarsson opened [interop-runner PR #63](https://github.com/englishm/moq-interop-runner/pull/63) adding `mlmtest` — a new component from [[moqlivemock]] — as an interop-runner test client. Takes a `DRAFT` env var to pick draft-14 or draft-16, and auto-tries both. Already passes locally against most published endpoints. Tobbe also announced he is adding MSF/LOC and moq-mi support, with the goal of enabling proper **media interop** (not just transport interop) in the runner. See [[interop-runner]].

## moqxr v0.2.1 Release — Draft-16 Ready (Apr 17)
Paul Gregoire ([[openmoq|OpenMOQ / RED5]]) tagged [moqxr v0.2.1](https://github.com/mondain/moqxr/releases/tag/v0.2.1) on Apr 17, following v0.2.0 on Apr 15. Adds draft-16 interop fixes: SUBSCRIBE parser now reads the KVP parameter list, no WebTransport subprotocol is offered for draft-14, and unknown control messages are handled without blocking. Brings moqxr to a working draft-16 base. See [[openmoq]].

## v17 Interop Build Issues (Apr 17)
`yuyou` reported that the `builds/moq-dev-rs/build.sh` docker build in `englishm/moq-interop-runner` fails when trying to run their draft-17 server/client against the runner, and asked whether other public v17 endpoints exist. As of Apr 17 no public follow-up yet — tracks with the still-limited draft-17 interop surface (only [[luke-curley]]'s stack confirmed so far; see [[interop-status]]).

## moqlivemock Update — Dual draft-14/16 + DRM (Apr 12)
Torbjörn Einarsson posted a substantial update on moqlivemock and warp-player:
- Auto-negotiates **draft-14 or draft-16**
- New publishable namespaces: `cmsf/clear`, `cmsf/drm-cbcs` (Widevine / PlayReady / FairPlay), `cmsf/ecpp-cbcs` (ClearKey), plus `moq-test/interop` for interop testing
- DRM signalling follows the [[moq-cmsf|CMSF]] PR #18 approach (now merged)
- Catalog is fetchable via both FETCH and SUBSCRIBE (the latter is against current spec — see [[moq-cmsf]] catalog discussion)
- Works with [[shaka-player]] and [[moqtail]] on the CMSF path
- Client uses MSE/EME including on iOS Safari 26.4 with managed source buffers

Demo: [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io).

## Joining Fetch Restriction Removed (Apr 9)
[[martin-duke]] asked if there's still a requirement that Joining FETCH only be with largest object subscribes. [[alan-frindell]] confirmed: "We did remove it. You can joining fetch any subscription at any time - it fetches to Joining Location." See [[joining-fetch]].

## Rewind vs Join Filters Status (Apr 8)
[[will-law]] asked [[alan-frindell]] and [[martin-duke]] about the status between Martin's [Subscribe Rewind](https://martinduke.github.io/draft-duke-moq-subscribe-rewind/draft-duke-moq-subscribe-rewind.html) and Alan's [Join Subscription Filters](https://afrind.github.io/draft-frindell-moq-join-filters/draft-frindell-moq-join-filters.html). Both provide mechanisms for retrieving a group behind live at join time. Alan indicated his idea was "more of an extension to Martin's."

## v17 Interop Achievement (Apr 1)
[[lorenzo-miniero]] reported first proper v17 interop working with [[luke-curley]]'s stack. Luke confirmed: "Rust publisher, JS subscriber, so that counts as two interops." See [[interop-status]].

## Track Properties Parsing Clarification (Apr 1)
[[alan-frindell]] detailed confusion about Properties in datagram/subgroup objects: the draft-14->16 diff removed the explicit length field from the diagram but the text still references it. Two open questions:
1. How are implementations doing this in draft-16?
2. What should the final state be?
See [[track-properties]].

# GitHub Activity

## moq-wg/cmsf
- **PR #18** (Merged Apr 14) — Initial proposal for ContentProtection signaling (Torbjörn Einarsson, [[moqlivemock|Eyevinn]]). Adds DRM signaling based on DASH/DASH-IF attributes: Widevine, PlayReady, FairPlay, ECCP. Merged by [[will-law]].

## shaka-project/shaka-player
- **PR #9972** (Merged Apr 14) — Add CMSF contentProtection signaling support (Álvaro Velad Galván, Atème). Second implementation of [[moq-cmsf]] ContentProtection after [[moqlivemock|warp-player]].

## moq-wg/msf
- **PR #118** (Merged Apr 13) - Add details of authorization flows ([[suhas-nandakumar]])
- **Issue #119** (Closed Apr 13) - Add authz details

## moq-transport
**Merged PRs** (Apr 9-10 batch):
- PR #1599 - Move normative text on Track Alias
- PR #1597 - Consistently use MOQT for protocol references  
- PR #1595 - Allow 7-byte varint and non-minimal encodings
- PR #1590 - Subscription filters are a Param
- PR #1583 - Allow publisher to reopen subgroup after REQUEST_UPDATE fwd 0->1
- PR #1540 - Allow coalescing REQUEST_UPDATE processing

**New Issues**:
- #1603 - What is the use case for required-request-id (Apr 10)
- #1602 - Joining Fetch should be on the SUBSCRIBE/PUBLISH stream (Apr 9)
- #1601 (Closed) - Joining FETCH session errors race condition
- #1600 (Closed) - Can the same Track be published multiple times into different namespaces?

**New / Updated Open PRs** (since Apr 10):
- PR #1607 (New, Apr 18) - **[Draft/RFC] Largest Available Group filter** ([[victor-vasiliev|Victor Vasiliev]]). Simpler alternative to REWIND: current group only, always serves complete group, no relay backfill. See [[joining-fetch-dissent]].
- PR #1606 (New, Apr 16) - Generalize stream reset codes to all request streams, add new codes (GOING_AWAY 0x4, EXPIRED_AUTH_TOKEN 0x7, SESSION_CLOSED), align TOO_FAR_BEHIND/EXPIRED numbering in PUBLISH_DONE with stream reset registry ([[alan-frindell]]; fixes #1581)
- PR #1605 (New, Apr 14) - Split DELIVERY_TIMEOUT into OBJECT_DELIVERY_TIMEOUT + SUBGROUP_DELIVERY_TIMEOUT ([[victor-vasiliev|Victor Vasiliev]]; fixes #667)
- PR #1604 - Joining FETCH with subscription (implements #1602)
- PR #1596 - Exclude your own tracks from SUBSCRIBE_NAMESPACE
- PR #1593 - Allow framing single Objects without Subgroup ID
- PR #1591 - Add flow control for Subscriptions
- PR #1588 - Add internationalization statement for moqt URI scheme
- PR #1586 - Delta encoding of Group/Object ID in Fetch responses
- PR #1544 - Improve Startup Latency and 0-RTT (ianswett)
- PR #1455 - Security Consideration Extension (gloinul)
- PR #1451 - Allow multiple Subscriptions to a Track (ianswett)
- PR #1378 - SWITCH for Client-side ABR (gwendalsimon; updated Apr 17)

## moq-wg/msf (earlier)
- PR #152 (Merged) - Clarify MSF URL construction and fragment parameters
- PR #141 (Merged) - Add support for InitTracks
- PR #121 (Merged) - Pub tracks, logs and metrics
- Issue #153 (Apr 14 activity) - `initTrack` does not work. Will Law now proposes instead of removing initTrack: define a standard MOQT Object property that references an init label (with integer init IDs) defined in the catalog, allowing mid-stream init changes to be signalled via the media payload itself. Victor Vasiliev agrees in-band signaling in the media payload is the only way that actually avoids the race condition.

### moq-wg/cmsf
- PR #18 (Merged Apr 14) - Initial proposal for ContentProtection signaling (tobbee). Specifies `contentProtections` with `refID`s and per-track `contentProtectionRefIDs`; DASH-compatible attributes; examples for Widevine, PlayReady, FairPlay, ECCP (clear key); referenced running implementation at moqlivemock.demo.osaas.io.
- PR #19 (New, Apr 14) - Clarify media content and group packaging requirements (wilaw; fixes #12)
- Issue #17 (New, Apr 14) - Explicit signalling of DRM/C2PA key-rotation or various init segment updates (DenizUgur). Notes MSF Feb 5 discussion and proposes either a dedicated init-segment track (with sync concerns) or inclusion of init updates inline.
- Issue #8 (Closed Apr 14) - Need to describe how Common Encryption is supported and communicated (closed by tobbee's PR #18).

### moq-wg/loc
- Issue #10 (New, Apr 16) - Properties Type collision between moqt-draft17 and loc-01 (yuanchao-chris). Properties Type (Extensions Type) 0x02 and 0x04 are defined in both with different semantics. Cross-ref transport issue #1550.

## PUBLISH_DONE and Subgroup FIN Handling (Mar 31)
[[alan-frindell]] asked relay implementers: "How do you handle the case where you receive a PUBLISH_DONE but some subgroups have not received a FIN? What will the downstream subscriber(s) see?" Options discussed: timer-based cleanup (preferred by [[suhas-nandakumar]]), RESET_STREAM_AT, or resetting streams.

# Mailing List Highlights

## MOQT for GraphQL Subscriptions (Apr 13)
[[alan-frindell]] posted to the mailing list arguing that implementing GraphQL subscriptions over MOQT SUBSCRIBE reveals several draft-17 limitations:
1. **Track name encoding**: Unknown message parameters are a protocol violation in draft-17, forcing the query body into the track namespace/name. The 4KB track name limit is restrictive for complex queries.
2. **Parameter negotiation**: A cleaner design using a custom parameter for the query body "requires extension and feels fragile" since custom parameters must be negotiated at every hop.
3. **Control message size**: The 64KB control message size limit may be too small for complex queries.
4. **HTTP integration gap**: HTTP intermediaries can forward GraphQL subscriptions using headers (e.g., recording client IP for authentication), but MOQT has no equivalent mechanism.

Alan concluded that "making message params inflexible in draft-17 may have been a mistake, and we should reconsider." This raises broader questions about MOQT's suitability for non-media use cases.

## Consensus Call on draft-17 (Mar 24 → Apr 10)
[[martin-duke]] issued a consensus call on the mailing list (2026-03-24) for changes in draft-17. Discussion continued through April 10 with responses from Martin Duke.

## 7-Byte Varint Encoding Debate (Mar 19 → Apr 7)
Multi-week discussion on the mailing list about the new varint encoding in draft-17. Participants: [[alan-frindell]], [[martin-duke]], [[suhas-nandakumar]], [[ian-swett|Ian Swett]], Mo Zanaty, Christian Huitema. Key issue: whether to allow the 7-byte encoding (6 leading ones) which was marked invalid in the initial spec. Resolved with PR #1595 (merged Apr 9) allowing 7-byte varint and non-minimal encodings.

## Agenda for Virtual Interim 13 - April 13 (Apr 9)
Magnus Westerlund posted the agenda. Key topic: REWIND slides and discussion of [[joining-fetch]] alternatives. See [[interim-meetings]].

## Minutes for March 30 Virtual Interim (Apr 9)
Magnus Westerlund posted the minutes for interim-2026-moq-12. Included discussion of SUBSCRIBE_NAMESPACE split.

## Weekly GitHub Digest (Apr 5)
Automated summary of moq-wg repository activity.

## Required-Request-ID Debate (Apr 10-11)
[[martin-duke]] filed issue #1603 questioning whether `required-request-id` is needed for all request types. He argues only REQUEST_UPDATE and FETCH genuinely need it, and maintaining state for all request IDs creates unnecessary overhead and enables a malicious client to maximize state by using every other request ID. [[alan-frindell]] countered that QUIC's maximum bidirectional streams naturally bound the state, but Martin questioned whether stream IDs are actually bound to request IDs. [[ian-swett|Ian Swett]] (Apr 11) noted that **stream IDs in WebTransport and some QUIC implementations aren't exposed to the application**, and that `required-request-id` was added to achieve "feature parity" with the single control stream model but "it was never clear exactly what functionality this provided." Ian also expressed that Joining FETCH's dependency on another Request is one reason he dislikes it.

## Joining FETCH Redesign (Apr 10)
[[martin-duke]] opened PR #1604 implementing the proposal from issue #1602 to move Joining FETCH onto the SUBSCRIBE/PUBLISH stream. He noted it was "much spicier than expected" due to parameter state sharing. [[alan-frindell]] reviewed and flagged that subscriber priority cannot differ between fetch and subscription under this model.

## Subscribe Rewind draft-02 Published (Apr 2)
[[martin-duke]]'s [draft-duke-moq-subscribe-rewind-02](https://datatracker.ietf.org/doc/draft-duke-moq-subscribe-rewind/) was published April 2. The "Rewind" subscription filter allows subscribers to request past groups using SUBSCRIBE semantics (multiple streams, best-effort) rather than FETCH semantics (single stream, complete). This is a key topic for the interim-13 meeting on Apr 13.

## Single Object Subgroup ID Likely Closing (Apr 12)
[[ian-swett|Ian Swett]] commented on issue #1405 (originally filed Dec 2025) proposing that single-object subgroups don't need a Subgroup ID. After PR #1593 (allow framing single objects without subgroup ID) saw limited WG interest, Ian wrote: "Discussion of the PR so far indicates we don't really want to bother with #1593. I'm inclined to close this issue with no action, but I'll put it before the WG to confirm." The related idea of simplifying prioritization (#1446) also lacked appetite.

## DELIVERY_TIMEOUT Split Proposal (Apr 14)
[[victor-vasiliev|Victor Vasiliev]] opened PR #1605 proposing to split DELIVERY_TIMEOUT into two separate types of timeout. This addresses a design concern about the existing single-timeout approach.

## Interop Runner Expansion (Apr 12–15)
The [[interop-runner]] expanded from 93 to 105 tests with the addition of **moqx** ([[openmoq|OpenMOQ]]'s moxygen fork) as an 11th implementation. Results have fluctuated: 21/70 (Apr 12) → 20/71 (Apr 13) → 21/70 (Apr 14) → **23/68** (Apr 15), with 14 skip unchanged. The Apr 15 run shows a notable improvement with 2 additional passing tests. moqx shows strong interop: moq-dev-js <-> moqx achieves 6/6, moq-rs-draft-16 <-> moqx achieves 5-6/6.

## Weekly GitHub Digest (Apr 12)
Automated weekly summary of moq-wg repository activity posted to the mailing list.

## New Individual Drafts on Datatracker

Two individual drafts appeared on the IETF datatracker this period:
- **[[moq-lite|draft-lcurley-moq-lite-04]]** (Apr 9) — [[luke-curley]]'s simplified transport protocol, now at version 04. Removes subgroups, object properties, datagrams, and 30+ message types from [[moq-transport]], using a pull-only, stream-based architecture. This is the spec behind the [[moq-dev]] implementation.
- **[[moq-nmsf|draft-herz-moq-nmsf-01]]** (Apr 7) — Erik Herz (Vivoh) proposes extending [[moq-msf]] with a `nvc` packaging type for Neural Video Codecs. Uses a dual-track model (hyperprior + latent) for priority-aware delivery. Supports DCVC-RT, SSF, FVC, and other learned codecs.

# Upcoming

## London In-Person Interim (June 11-12)
Four MOQ sessions scheduled at County Hall / The Riverside Building, Belvedere Road, London SE1 7PB. June 11 has 2 sessions (likely hackathon/interop), June 12 has 3 working sessions. Similar format to the [[discussions-2026-02|Boulder interim]]. See [[interim-meetings]] for details.

# NAB Show 2026 — MoQ Industry Showcase (Apr 18–22)

NAB Show in Las Vegas (April 18–22) features the largest public display of MoQ technology to date, with multiple companies demonstrating live MoQ workflows:

## Wowza + Cloudflare
Live demo of a next-generation streaming architecture built on MoQ. Workflow: OBS → Wowza origin → Cloudflare [[moq-rs]] relay → MoQ playback. Barry Owen (Wowza Chief Solutions Architect) presenting at Cloudflare booth W2300 (Sunday noon–1pm, Tuesday 2–3pm). Wowza built a CMAF-to-MoQ relay using Java modules (Kwik QUIC / Flupke WebTransport). Published [April 6 blog post](https://www.wowza.com/blog/moq-streaming-with-wowza-streaming-engine-and-claude-ai) documenting the architecture.

## Oracle Video @ Edge (OVE)
Oracle's MoQT relay network — functions as a relay fabric (not CDN origin), with short sliding-window cache (~1 GOP) for late-joining subscribers. NAB partner demos with:
- **Ateme** — encoding/ingest entry point into the OVE relay
- **Broadpeak** — packaging within the relay workflow
- **Bitmovin Player Web X** — commercial-grade MoQ playback

## Bitmovin Player Web X
Commercial MoQ player using WebTransport + WebCodecs API. Plugin architecture enables MoQ support without touching core player code. Successfully tested against Cloudflare's global relay network (330+ cities). [Live demo with Cloudflare at NAB](https://bitmovin.com/blog/media-over-quic-bitmovin-cloudflare/). Sub-second latency confirmed. Roadmap includes MSE and WebRTC fallback.

## Broadpeak
"Half MoQ relay" approach for HAS/MoQ coexistence — both protocols from the same cache infrastructure. Frame or small group-of-frames delivery. Live demo at booth W3034. Technical contacts: Guillaume Bichot, Christoph Neumann, Nominoë Kervadec. White paper forthcoming.

## Synamedia
Quortex PowerVu & MEG providing "next-generation MoQ track-based distribution" for affiliates. Demonstrated alongside dynamic channel creation and ATSC 3.0 reception.

This represents a significant milestone for MoQ commercialization — major CDN, player, encoder, and platform vendors are all demonstrating interoperable MoQ workflows simultaneously.

# Mailing List & GitHub Activity (Apr 16–17)

## REWIND Consensus Call (Apr 16)
Magnus Westerlund (MoQ chair) opened a formal consensus call on the mailing list following the [[interim-meetings|interim-13 discussion on Apr 13]] about [Martin Duke's REWIND proposal](https://martinduke.github.io/draft-duke-moq-subscribe-rewind/draft-duke-moq-subscribe-rewind.html). WG members asked to pick one of three options by **May 1, 2026**:
1. **No action** until MOQT is published (defer joining/rewind work for V1)
2. **Adopt as extension** — take the draft as the basis for an MOQT extension
3. **PR approach** — use the draft as the foundation for a PR to merge into MOQT when editors deem it ready

Magnus noted there is "a lot of interest to do something in this space but little agreement on the key properties of a solution." The draft aims to resolve issues #861, #1039, #1358, #1362, and #1386 along with Boulder meeting concerns about head-of-line blocking in Joining Fetch. Alternative proposals are welcome subject to the same consensus process.

## Interim-13 Minutes Posted (Apr 16)
Magnus Westerlund published [minutes for interim-13 (Apr 13)](https://datatracker.ietf.org/meeting/interim-2026-moq-13/materials/minutes-interim-2026-moq-13-202604131630-01). Key points:

- **REWIND core tension**: Group debated whether REWIND should be reliable. [[luke-curley]] and [[victor-vasiliev]] worried unreliable delivery based on cache state undermines utility. Some suggested relays could "cheat" by fetching upstream data, but [[alan-frindell]] flagged this creates substantial implementation complexity for relay operators.
- **Joining strategy debate**: Cullen Jennings advocated "pushing the complexity of joining to the client library," while [[will-law]] countered that relays — with direct cache visibility — make faster decisions and save round-trip times.
- **Decision**: REWIND will remain a **separate experimental extension** rather than merge into the core transport draft.
- **Action items**: Editors will develop `FETCH` timeout and subgroup filter PRs for immediate head-of-line-blocking relief. Community discussion continues on "Largest Group" filters and intent-based joining.
- **Next meetings**: Virtual interims April 27 (moq-14) and May 11 (moq-15), then London in June.

# GitHub Activity (Apr 16–17)

## moq-transport

**PR #1562 (Session-Level Tracks) — MERGED (Apr 16)**:
[[alan-frindell]]'s proposal to reserve the `.session` namespace tuple for session-level tracks was merged by Alan on Apr 16 at 13:38 UTC. Relays MUST NOT forward `.session` subscriptions, and unrecognized session-level tracks MUST be rejected with `NOT_SUPPORTED`. Establishes an IANA registry for session-level track names under Specification Required policy. Enables extending transport functionality via existing subscription/object machinery. Useful for issue #1507. See [[moq-transport]].

**PR #1596 (Exclude own tracks from SUBSCRIBE_NAMESPACE) — MERGED (Apr 16)**:
Merged by [[alan-frindell]] one minute after #1562. A 4-line change fixing issue #1585 — ensures a client does not receive notifications for its own published tracks via SUBSCRIBE_NAMESPACE.

**PR #1606 (Stream reset codes) — NEW (Apr 16)**:
[[alan-frindell]] opened a PR generalizing stream reset error codes to all request streams (not just subgroup streams). Changes:
- Move stream reset code definitions earlier in the spec
- Add `GOING_AWAY` (0x4), `EXPIRED_AUTH_TOKEN` (0x7), `SESSION_CLOSED`
- Renumber `UNKNOWN_OBJECT_STATUS` (0x4 → 0x6) to make room for GOING_AWAY
- Align `TOO_FAR_BEHIND` to 0x5 in both `PUBLISH_DONE` and stream reset registries
- Renumber `EXPIRED` to 0x6 in `PUBLISH_DONE`
- Add SHOULD recommendation to send FIN after PUBLISH_DONE
- Rename "Data Stream Reset Error Codes" registry to "Stream Reset Error Codes"
Fixes #1581.

**PR #1542 (Split SUBSCRIBE_NAMESPACE) — Updated (Apr 16)**:
[[alan-frindell]] pushed a rework so the single `SUBSCRIBE_NAMESPACE` message (0x11) is replaced with two separate messages: `SUBSCRIBE_NAMESPACE` (0x50) for namespace discovery (NAMESPACE / NAMESPACE_DONE) and `SUBSCRIBE_TRACKS` (0x51) for track subscriptions (PUBLISH). Removes the `SUBSCRIBE_NAMESPACE_OPTIONS` parameter and the `BOTH` mode entirely — behavior is now determined by message type. Adds a new `TRACK_NAMESPACE_PREFIX` parameter (0x34) allowing `REQUEST_UPDATE` to change the prefix of an established subscription without tearing down the stream. Fixes #1458.

**PR #1604 (Joining FETCH) — Updated (Apr 16)**:
Gwendal Simon added a new comment explicitly connecting PR #1604 to his [[switch-abr|SWITCH]] redesign (#1378). He proposes that SWITCH's catch-up data be delivered on the same PUBLISH bidi as live objects (with higher QUIC transmission priority), implemented by having the relay follow the PUBLISH message with a FETCH_HEADER inline — effectively a **relay-proactive variant** of what #1604 proposes (co-locating FETCH data on the PUBLISH bidi, initiated by the Relay rather than the Subscriber).

**PR #1378 (SWITCH) — Continued polish (Apr 16)**:
[[gwendal-simon|Gwendal Simon]] pushed ~10 more cleanup commits refining the SWITCH prose (consistent track terminology, trimmed redundant sections, clearer failure flow, polished relay-switch and error-handling sections). See [[switch-abr]].

## moq-wg/loc

**Issue #10 (Properties Type collision)** got a new comment from [[alan-frindell]] (Apr 16): "fwiw loc-02 also has collisions. I recommend changing the next LOC to use the highest possible one-byte code points so we don't have problems again." Active discussion: 0x02 / 0x04 collide between moqt-17 and loc-01/02. [[suhas-nandakumar]] previously committed to fixing both drafts.

## Implementation Activity (Apr 16–17)

### [[moq-dev]] — Major day (Apr 16–17)
[[luke-curley]] landed a burst of 14+ PRs in ~24 hours:
- **PR #1319 (merged Apr 17)**: Change broadcast replacement strategy to **queue backups** instead of reannouncing. New broadcasts on an active path are now held in a FIFO backup queue; when the active broadcast closes, the oldest backup is promoted. Avoids unnecessary reannouncements when multiple broadcasts are published in quick succession.
- **PR #1311 (merged Apr 16)**: `moq-relay` auth module refactor — `AuthError` no longer swallows transport errors; uses `thiserror`'s `#[from]` so callers can inspect cause. Fixes the PublicAccess.api flow (sets `claims.root` correctly, only calls the API with zero overlap to static prefixes, propagates HTTP errors as `ApiUnavailable`). Adds ~15 new tests using `wiremock` covering success/404/500/network/decode/cache paths plus an integration test standing up an `axum-server` with self-signed CA + `WebPkiClientVerifier` to verify `--auth-tls-identity` is actually presented during TLS handshake.
- **PR #1308 (merged Apr 16)**: Replace `--identity` (single bundled PEM) with separate `--cert` and `--key` flags across client, server, and auth TLS configs. Each flag parses PEM files for only the relevant content, matching curl's behavior.
- **PR #1315, #1313, #1312** (merged Apr 16): moq-boy game server fixes — replaced `capybara` with `songbird` and `fofk` with `runiestory`; ROMs on R2; volume slider + lower default volume; keyboard input fix.
- **PR #1316 (merged Apr 16)**: `moq-relay` — inline landing page HTML to fix Nix build.
- **PR #1317, #1314, #1305 (releases)**: patch bumps; moq-lite 0.15.14, moq-cli 0.7.18, moq-clock 0.10.16, moq-ffi 0.2.6.
- **PR #1318 (open)**: Adding raw (non-media) track publishing/consuming to the Python `py_lib` — new `RawProducer`/`RawConsumer` classes wrapping FFI `MoqRawProducer`/`MoqRawConsumer`, with `publish_raw()` and `subscribe_raw()` on `BroadcastProducer`/`BroadcastConsumer`. Author: Lullabee.

### [[moqtail]] — More draft-16 cleanup (Apr 16)
- **PR #164 (merged)**: `refactor: request error` — unified all ERROR messages under `REQUEST_ERROR` per draft-16 (Alperen Fatih Zengin).
- **PR #165 (merged)**: Cleaned up a draft-14-era hack that used a fake `SUBSCRIBE` message to establish subscriptions with `PUBLISH`. Draft-16's ability to update publish messages makes the hack unnecessary (Alperen Fatih Zengin).
- **PR #169 (open)**: "Fix/message parameters fix" — updates fetch, subscribe-namespace, publish-namespace, and track-status messages to use the new message parameters (key-value pairs from older drafts were still in place).
- **PR #145 (open)**: Umbrella draft-16 tracking PR (+12,200 / −10,236 by Zafer Gürel).

### google/quiche (Apr 16)
- Commit `ba02ee8`: "Permanently cancel subgroups if the stream has STOP_SENDING."

### Others
- **[[moq-rs]]**: No new activity since Apr 14 (PR #163 qlog alignment still open).
- **video-dev/[[moq-js]]**: Still quiet since mid-March.
- **[[quiche-moq]]**: No new MoQT-directory commits since Apr 16.
- **[[openmoq]] (moqx)**: No new activity this window.

# GitHub Activity (Apr 15–16)

## moq-transport

**PR #1378 (SWITCH) — Major Redesign (Apr 15–16)**:
Gwendal Simon pushed 7 commits redesigning SWITCH for client-side ABR. The new approach replaces FETCH+SUBSCRIBE delivery with **relay-initiated PUBLISH + inline catch-up**. Catch-up data is delivered on the PUBLISH bidi stream rather than requiring a separate FETCH. This addresses earlier concerns about the complexity of coordinating FETCH and SUBSCRIBE delivery during track switches. See [[switch-abr]].

**PR #1604 (Joining FETCH) — New Feedback (Apr 15)**:
Gwendal Simon posted detailed review comments on [[martin-duke]]'s proposal:
- Raised edge case where SUBSCRIBE_PRIORITY in a Joining FETCH inadvertently changes live delivery priority
- Noted the problem of publisher closing the request stream while Joining FETCH data is still delivering
- Analyzed how relays can unilaterally assign higher QUIC stream priority to FETCH data during catch-up
- Pointed out that a subscriber cannot include a parameter that applies only to the FETCH portion

**PR #1562 (Session-Level Tracks) — 4th Approval (Apr 15)**:
[[suhas-nandakumar]] approved [[alan-frindell]]'s PR to reserve the `.session` namespace tuple for session-level tracks. Now has 4 approvals (from [[ian-swett]], sharmafb, [[victor-vasiliev|vasilvv]], and suhasHere). Appears close to merge.

## Implementation Repos

**[[moq-dev]] — Very Active (Apr 15–16)**:
[[luke-curley]] landed 4 PRs and opened 4 more in 24 hours:
- **PR #1304** (merged): Safari/Firefox moq-boy compatibility — fixes Safari WebCodecs issue (avc3 vs avc1), Firefox AudioDecoder 6-channel output for stereo Opus
- **PR #1280** (merged): Landing page for non-MoQ browser clients connecting to relay
- **PR #1302** (merged): Release moq-cli v0.7.18, moq-relay v0.10.21
- **PR #1307** (open): moq-lite negotiate Lite03+ via legacy SETUP when ALPN unavailable (Firefox workaround)
- **PR #1306** (open): Disable WebTransport on Firefox, force WebSocket fallback (Firefox BiDi stream bug)
- **PR #1308** (open): Replace `--identity` with separate `--cert` and `--key` flags
- **PR #1309** (open): moq-token default to base64url encoding for JWK output

**[[moqtail]] — Major Merge Day (Apr 14–15)**:
Five draft-16 PRs merged, representing a major push toward draft-16 compliance:
- **PR #163**: Unified registry mapping messages to request_ids (+937/−1398, 47 files)
- **PR #160**: SubgroupHeader per draft-16 §10.4.2 (24 new type definitions)
- **PR #162**: Consolidated OK messages into unified REQUEST_OK
- **PR #159**: REQUEST_UPDATE refactoring
- **PR #157**: Datagram draft-16 compatibility
- v0.9.1 release pending (fixes race condition causing negative object deltas)

**[[moq-rs]] — qlog Alignment (Apr 14)**:
[[mike-english]] opened PR #163 aligning mlog qlog output with draft-pardue-moq-qlog-moq-events-03 (+346/−242, 6 files). Includes epoch-relative timestamps, typed parameter formatting, and authorization token redaction. Addresses feedback from Lucas Pardue ([@LPardue](https://github.com/LPardue)) at IETF 125.

**[[quiche-moq]] — Joining FETCH Fix (Apr 14)**:
[[martin-duke]] committed a fix to limit Joining FETCH to `largest_object` at time of SUBSCRIBE rather than using current value. Moves responsibility from `MoqtOutgoingQueue` to the session layer. Prepares for REWIND implementation.

**video-dev/[[moq-js]]**: No activity since mid-March.

# Interop Runner (Apr 17)

**Regression to 18 pass / 73 fail / 14 skip** (105 tests) in the Apr 17 run (2026-04-17 00:32 UTC). Five tests flipped from pass to fail compared to Apr 15–16's 23/68/14 result. Investigation pending — the regression coincides with the large moqtail draft-16 merge and moq-dev/moq broadcast replacement and auth refactor changes that landed overnight.

# Draft Status Watch

- **[[moq-media-interop|draft-cenzano-moq-media-interop-03]]** expires in **6 days** (April 23). Still no renewal or version -04 published.
- **MoQ Monthly #1** not yet published — #0 was published March 4 with "See you in April!" but no new issue yet.
- **REWIND consensus call** closes **May 1, 2026** (14 days).

# Key Themes

1. **REWIND consensus call open (May 1 deadline)** - Magnus Westerlund opened a formal three-way consensus call following the interim-13 decision to keep REWIND as a separate experimental extension
2. **Session-Level Tracks merged** - PR #1562 landed on Apr 16 reserving `.session` namespace tuple (IANA registry established)
3. **NAB Show MoQ showcase** - Biggest industry milestone: Wowza, Oracle, Bitmovin, Broadpeak, Synamedia, Ateme, and Cloudflare all demoing MoQ workflows at NAB (Apr 18–22)
4. **Joining mechanism convergence** - Active work to reconcile Joining Fetch, Rewind, and Join Filters; Gwendal Simon connects PR #1604 and SWITCH PR #1378 as client- vs relay-initiated variants of the same pattern
5. **SWITCH redesign** - PR #1378 significantly reworked to use relay-initiated PUBLISH+catch-up instead of FETCH+SUBSCRIBE; prose polish continues
6. **SUBSCRIBE_NAMESPACE split reworked** - PR #1542 now splits into SUBSCRIBE_NAMESPACE (0x50) for namespace discovery and SUBSCRIBE_TRACKS (0x51) for track subscriptions; new TRACK_NAMESPACE_PREFIX param
7. **moqtail draft-16 push continues** - More cleanup landed Apr 16: unified REQUEST_ERROR, publish-without-fake-subscribe, message params fixes
8. **moq-dev broadcast/auth work** - Luke Curley's backup-queue broadcast replacement and major moq-relay auth refactor with wiremock test suite
9. **Non-media use cases** - Alan Frindell's GraphQL subscriptions analysis (Apr 13) highlights draft-17 parameter inflexibility
10. **Protocol simplification** - Growing consensus that required-request-id may be unnecessary
11. **Interop runner regression** - Drop from 23/68/14 to 18/73/14 in the Apr 17 run (5 tests flipped), coinciding with the moqtail draft-16 and moq-dev auth/broadcast changes
12. **London interim** - In-person interim June 11-12 at County Hall, London
13. **CMSF ContentProtection** - DRM signaling merged into CMSF spec, with two implementations
14. **media-interop expiry** - draft-cenzano-moq-media-interop-03 expires April 23, still no renewal
15. **LOC Properties type collision** - Alan flags that loc-02 still has the same 0x02/0x04 collisions with moqt — needs fresh code points
16. **LargestGroup/CurrentGroup filter convergence (Apr 17–18)** - PR #1607 by Vasiliev captures WG pivot from REWIND toward narrow SUBSCRIBE filter

# Mailing List & GitHub Activity (Apr 17–18 additions)

## Alan Frindell's Reply on REWIND (Apr 17)
[[alan-frindell]] posted a [detailed response](https://mailarchive.ietf.org/arch/msg/moq/hw5pIm56DBOot-DqmLkaCBxtSVo/) advocating for **Option 1 — no action at this time**. His argument: recent MOQT changes (notably `FILL_TIMEOUT=0`, landed in PR #1490) have eroded REWIND's core value proposition by removing head-of-line-blocking scenarios REWIND was introduced to fix:
- Cache gaps in low-priority subgroups no longer block higher-priority cached objects
- Datagram / stream-per-object tracks with missing objects can be delivered without HOL blocking
- Evicted-group scenarios are handled via immediate FETCH responses

Frindell concedes one narrow remaining case (lower-priority cached data shouldn't cause blocking) and suggests it can be solved with filters, not REWIND. His recommendation: "stabilise around the core" and defer such innovation to future versions. See [[joining-fetch-dissent]].

## Convergence on "LargestGroup / CurrentGroup" Filter (Apr 17–18)
After Alan's Option-1 reply, the REWIND thread pivoted toward a simpler filter-based alternative.

- **[[luke-curley]] (Apr 17, [message](https://mailarchive.ietf.org/arch/msg/moq/y5f5XZT005Y6ebrHYBOXtr4JojQ/))**: argues FETCH introduces HOL blocking (one uncached group blocks cached subsequent groups) and that "smart" VOD clients are better served issuing per-group FETCH requests HLS/DASH-style. Core critique: subscribers want **live semantics** on all groups, but today's first group uses **VOD semantics** via Joining FETCH. Calls the current workaround (sequentially-prioritised Joining FETCHes merged with SUBSCRIBE streams) "a gross hack." Proposes a **LargestGroup filter for SUBSCRIBE** that captures the intended behaviour 99% of the time and eliminates the first-group special case.
- **[[luke-curley]] (Apr 18, [message](https://mailarchive.ietf.org/arch/msg/moq/UpRFbpqfPGUb5V5X4-saOznMWaU/))**: "Yeah, I just want to adopt CurrentGroup so we can make *some* progress." Treats it as incremental and achievable.
- **[[victor-vasiliev|Victor Vasiliev]] (Apr 18, [message](https://mailarchive.ietf.org/arch/msg/moq/q8Vxe5NGEX-KWgqnChyA3LnMUDE/))**: "Not against the LargestGroup idea" — turned it into a concrete draft as [PR #1607](https://github.com/moq-wg/moq-transport/pull/1607).
- **[[alan-frindell]] (Apr 18, [message](https://mailarchive.ietf.org/arch/msg/moq/GKLXatC9zc2euVTCXwO0ICxgYWQ/))**: also "does not object" and has drafted a parallel "CurrentGroupFill" PR. Caveats: the filter solves "joining via a single message and keeping the response in a more consistent format" (the common case) but does **not** address previous-group HOL cases REWIND was aimed at.

Practical consensus forming: drop REWIND for v1, land a narrow SUBSCRIBE filter (LargestGroup / CurrentGroup / CurrentGroupFill) that handles the common join case without new messages, new streams, or best-effort semantics. See [[joining-fetch-dissent]] and [[moq-transport]] PR #1607.

## moq-transport PR #1607 — Largest Available Group Filter (Apr 18)
[[victor-vasiliev|Victor Vasiliev]] opened [PR #1607](https://github.com/moq-wg/moq-transport/pull/1607) as a Draft/RFC "Largest Available Group filter." Distinctives versus REWIND / CurrentGroupFill / LargestGroup:
- Only the **current** group supported (no prior groups)
- Always serves a **complete** group
- **No explicit backfill on the relay** — relay just delivers whatever cached subgroups it has for the largest available group
- "Probably really easy to implement"
- "Sensible semantics for cases when the groups are really large"

Direct alternative to [[draft-duke-moq-subscribe-rewind|REWIND]], [afrind/moq-transport#15 CurrentGroupFill](https://github.com/afrind/moq-transport/pull/15), and Luke's LargestGroup proposal. See [[joining-fetch-dissent]].

## MoQ Boy — SUBSCRIBE_NAMESPACE Demo (Apr 17)
[[luke-curley]] announced "MoQ Boy" on the mailing list, a Game Boy emulator demo that streams gameplay over MOQT (blog: moq.dev/blog/moq-boy/). Key protocol points highlighted:
- Encoding/emulation is on-demand and **pauses when there is no active SUBSCRIBE** for a track — pub-side reacts to subscribe/unsubscribe as a flow-control signal
- Player automatically unsubscribes tracks that are not visible or audible, and re-subscribes when they are
- Bidirectional flow: emulator publishes per-game namespaces and subscribes to viewer streams; player publishes a per-viewer namespace and subscribes to game content
- Multiple concurrent players supported with per-session authorization

Curley's takeaway: **SUBSCRIBE_NAMESPACE is "extremely powerful"** and under-exploited. This lands mid-debate about SUBSCRIBE_NAMESPACE splitting (PR #1542) and the `.session` reserved namespace (PR #1562 merged Apr 16) — concrete evidence for keeping the namespace discovery primitive flexible. See [[luke-curley]], [[moq-dev]].
