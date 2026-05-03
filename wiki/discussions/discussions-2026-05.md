---
title: "Discussions - May 2026"
tags: [discussions, slack, github]
date: 2026-05-01
last_updated: 2026-05-03
status: current
---

Summary of active discussions in the MOQ ecosystem during May 2026.

# Implementation Activity (May 2 → May 3 06:00 UTC)

## moq-dev/moq — Luke REVERTS PR #1357 (fetch_group + TrackDynamic) via PR #1372; metapox opens PR #1370 (PriorityQueue SUBSCRIBE_UPDATE bug); Luke opens PR #1371 (cross-broadcast track refs); PR #1369 MERGED

A surprisingly busy day on `moq-dev/moq`: a notable design U-turn from [[luke-curley]], a substantive bug report from a new external contributor (with a working fix in their fork), and a new feature PR opened.

- **[PR #1372](https://github.com/moq-dev/moq/pull/1372) MERGED** May 2 21:18:50 UTC by [[luke-curley]] — *Revert moq-lite FETCH/Subscription API changes*. **Reverts [PR #1357](https://github.com/moq-dev/moq/pull/1357) (fetch_group API + TrackDynamic) and [PR #1348](https://github.com/moq-dev/moq/pull/1348) (Subscription model API for FETCH readiness).** Body: *"FETCH isn't hooked up yet, so the breaking API change isn't worth it; the API also wasn't quite right."* Hop-based clustering (PR #1322) and per-frame buffer changes (PR #1353) are preserved. **Significant U-turn**: PR #1357 was merged Apr 30 00:01 UTC and was described in the Apr 30 wiki entry as the *"first track-level FETCH path API"*. Three days later Luke pulls it back as not-ready.
- **[PR #1371](https://github.com/moq-dev/moq/pull/1371) OPENED** May 2 20:28:59 UTC by [[luke-curley]] — *hang: cross-broadcast track references in renditions*. Adds optional `broadcast` field on video/audio rendition configs (e.g. `"../source"`) so a downstream catalog can reference tracks published in another broadcast without republishing bytes. New `PathRelative` type + `Path::resolve` in moq-lite Rust with full unit coverage; mirror `resolveBroadcast` helper for `@moq/hang`. `@moq/watch`'s `Broadcast.trackBroadcast(effect, configBroadcast)` looks up the override broadcast on the same connection; audio/video decoder + MSE backends honor it. PR body explicitly notes *"🤖 Generated with [Claude Code](https://claude.com/claude-code)"*. Use case: worker-style flow where a sidecar catalog aggregates source tracks without re-broadcasting them.
- **[PR #1370](https://github.com/moq-dev/moq/pull/1370) OPENED** May 2 15:28:56 UTC by **metapox** — *fix(lite): PriorityQueue does not update in-flight groups on SUBSCRIBE_UPDATE*. **Detailed bug report citing [draft-ietf-moq-transport-13 §6.1](https://www.ietf.org/archive/id/draft-ietf-moq-transport-13.html#section-6.1)**: *"When subscriber priority is changed, a best effort SHOULD be made to apply the change to all objects that have not been sent."* In moq-lite, `PriorityQueue::insert()` copies the `track` value at insertion time and provides no API to update it; when `run_track` receives `SUBSCRIBE_UPDATE` and calls `subscriber.update()`, the `PriorityQueue` is not notified — existing `PriorityHandle`s keep their stale position. Real-world impact: *"Under bandwidth constraints, switching camera focus via SUBSCRIBE_UPDATE takes several seconds because old groups from the previously-focused camera continue to be served at high priority, starving the newly-focused camera."* Proposed fix: add `subscription_id` to `PriorityItem`, add `PriorityQueue::update_subscription(subscription_id, new_track)` that re-sorts and notifies all handles via watch channels; widen quinn priority spread to `index * 64`; wrap `write_all` in `tokio::select!` with `priority.next()` so priority changes take effect during blocked writes. metapox confirms: *"We have a working implementation in our fork and can submit a PR if interested."* References related Issues #699 (priority tie-breaking) and #1363 (their own JS SUBSCRIBE_UPDATE issue from Apr 30). **First substantive bug-report-with-fix-offer from metapox**, who previously opened Issue #1363 about JS Subscriber lacking SUBSCRIBE_UPDATE.
- **[PR #1369](https://github.com/moq-dev/moq/pull/1369) MERGED** May 2 14:53:33 UTC by [[luke-curley]] (sidsethupathi author, +39/−2, *moq-gst: fix moqsink eos*). The gst-launch EOS fix opened May 2 03:27 UTC lands in ~11.5 hours. **sidsethupathi's second merged PR** after #1294 (Apr 12). MLB engineering presence on `moq-gst` is now well-established.

## moqtail — PR #180 MERGED (separate stream for SUBSCRIBE_NAMESPACE) ahead of upstream PR #1542

- **[PR #180](https://github.com/moqtail/moqtail/pull/180) MERGED** May 1 12:45:51 UTC by **zafergurel** (+1150/−488, *feat: separate stream for subscribe_namespace*) into the `draft-16` branch. Reviewer: DenizUgur. **moqtail merged the impl-side SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split design ~10 hours BEFORE moq-transport PR #1542 itself merged** (May 1 22:59 UTC) — first impl actually shipping the split design. Note: still on the `draft-16` branch, not yet in `main` (PR #145 umbrella tracker still open).

## moq-wg/moq-transport — Quiet day, no new commits or PRs

No new merges or PRs opened in the May 2 → May 3 window. Issue #1313 (ianswett's "Joining FETCH as a separate control message creates edge cases and feature gaps") got a comment May 3 06:00 UTC.

## Mailing List — Quiet (no new on-list messages May 2-3 visible)

The REWIND consensus deadline message-of-record from a chair has still **not appeared on the list** as of May 3 06:00 UTC. Cullen's *"Request Synchronization Use Case"* thread (May 1) has had no replies. The "Knowing the start of a Subgroup" thread is also quiet.

## MoQ Monthly — No new issue since #1 (Apr 30 / May 1)

The newsletter archive shows #0 (Mar 3) and #1 (Apr 30) only. No #2 in the May 2-3 window.

# Interop Runner (May 3 00:38 UTC)

**24 pass / 67 fail / 14 skip** (105 tests). **First regression after 4 consecutive +1/day recovery days**: −1 pass / +1 fail vs May 2's 25/66/14. Walking arc since Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → **24**.

The regression coincides roughly with image rebuilds for `moq-dev-rs` / `moq-dev-js` likely picking up the May 1 → May 2 PR landings (PR #1366 flake bump, PR #1368 doc fix, PR #1369 moqsink EOS). The notable revert on May 2 21:18 UTC (PR #1372 reverting #1357 + #1348) happened **after** the May 3 00:38 UTC report, so its effect on the matrix would only show up in the May 4 run.

---

# Implementation + WG Activity (May 1 → May 2 04:00 UTC)

## moq-wg/moq-transport — PR #1542 (SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split) MERGED; new Issue #1626 (QMUX version negotiation)

The post-interim editorial wave continued with the most structurally consequential merge of the cycle: the SUBSCRIBE_NAMESPACE / SUBSCRIBE_TRACKS split that moqtail's PR #180 had been preparing for.

- **[PR #1542](https://github.com/moq-wg/moq-transport/pull/1542) MERGED** May 1 22:59:13 UTC by [[alan-frindell]] (+215/−135, *Split SUBSCRIBE_NAMESPACE into SUBSCRIBE_NAMESPACE and SUBSCRIBE_TRACKS*, fixes #1458). Replaces single SUBSCRIBE_NAMESPACE (0x11) with two messages: **SUBSCRIBE_NAMESPACE (0x50)** for namespace discovery and **SUBSCRIBE_TRACKS (0x51)** for track subscriptions. Removes the SUBSCRIBE_NAMESPACE_OPTIONS parameter and the "BOTH" mode entirely. Adds **TRACK_NAMESPACE_PREFIX parameter (0x34)** allowing REQUEST_UPDATE to change the prefix. Approvals from ianswett (Mar 9), vasilvv (Apr 27), and [[suhas-nandakumar]] (final APPROVED May 1 18:32:48 UTC on commit `4aa849a`). Closes Issue #1458 (one of the longest-standing draft-17 design splits). The afrind 3/30 design note framed it as: *"1) We want to remove this option and bake it into the message type: no more 'BOTH'. 2) We want to allow updating the prefix via REQUEST_UPDATE..."*
- **[Issue #1626](https://github.com/moq-wg/moq-transport/issues/1626) OPENED** May 1 23:50:05 UTC by **sharmafb** (Suhas Sathyanarayana): *"Version negotiation for QMUX"*. Body: *"We have an idea of how version negotiation works for MoQ-over-HTTP/3 and how it works for MoQ-over-QUIC, but do we know how it's going to work for MoQ-over-QMUX?"* **[[alan-frindell]] reply** May 2 02:19:30 UTC: *"We discussed quite a bit last IETF. The plan is to say something like TLS ALPN moqt-18 implies qmux-01"* — first explicit statement of the QMUX/transport ALPN coupling for draft-18.
- **PR #1608 formally CLOSED** May 1 18:35 UTC ([[alan-frindell]]: *"Closing in favor of 1618"*) — confirms the FIRST_OBJECT bit (PR #1618) as the WG-adopted answer to "Knowing the start of a Subgroup".
- **Open PR state** (post-May 1): PR #1620 (Joining FETCH unaffected by fwd→0), PR #1618 (FIRST_OBJECT bit), PR #1623 (Remove Request ID from GOAWAY, contested), PR #1625 (Magnus Security Considerations rebase) all remain open.

## moq-wg/secure-objects — Editorial wave largely concludes (PRs #77, #82, #86 MERGED, #78 superseded)

The 30-hour Apr 29 → May 1 wave wrapped up its main body in a coordinated burst on May 1 21:05–21:33 UTC.

- **[PR #82](https://github.com/moq-wg/secure-objects/pull/82) MERGED** May 1 21:05:19 UTC by [[fluffy]] ([[suhas-nandakumar]] author, +66/0, *Add padding property for byte boundary alignment*). **Closes Issue #54** (fluffy Nov 2025 — *"add a private header extension for pad to N byte boundary"*). Adds the byte-boundary alignment property promised since November.
- **[PR #77](https://github.com/moq-wg/secure-objects/pull/77) MERGED** May 1 21:06:12 UTC self-merged by [[fluffy]] (+50/0, *describe threat model*). Body: *"This most Fixes #49 but making a separate PR to describe the fan out attacks."* **Mostly fixes Issue #49** ("Describe achieved security properties"); the fan-out attack got its own follow-up.
- **PR #78 CLOSED unmerged** May 1 21:29 UTC (the *"DO NOT MERGE YET"* fan-out attack PR), **superseded by PR #86**.
- **[PR #86](https://github.com/moq-wg/secure-objects/pull/86) OPENED + MERGED** in the same 6-minute window May 1 21:27:42 → 21:33:18 UTC by [[fluffy]] (opened) → [[suhas-nandakumar]] (merged) (+27/0, *Explain Fan Out Attack*, *"This replaces PR#78 and is part of Fixes #49"*). Closes the fan-out-attack documentation gap.
- **Open PRs remaining**: #83 (SFRAME RFC ref), #84 (test vectors), #85 (en-dash fix). All editorial polish — secure-objects is now substantively at the -01 release line. **draft-ietf-moq-secure-objects-01 has NOT yet been published on Datatracker** despite the merge wave.

## Mailing List — Cullen opens "Request Synchronization Use Case"; REWIND consensus deadline reached without chair conclusion

The May 1 REWIND consensus call deadline came and went **without a chair-summary message** on the list. Magnus Westerlund, Suhas Nandakumar, and Alan Frindell have not yet posted an interpretation of the split outcome.

- **Cullen Fluffy Jennings** opened a new thread *"Request Synchronization Use Case"* May 1 16:10:06 -0600 (22:10:06 UTC) ([msg](https://mailarchive.ietf.org/arch/msg/moq/YIkbDmf8BZ0Dx41j8QJ7nj0BZMU/)). Three concrete use cases for request ordering: (1) swap tracks in video conference (pause Alice before un-pause Bob to avoid congestion), (2) client-side ABR, (3) rapid pause/unpause where reorders cause opposite-of-desired state. Key quotes:
  - *"I'm a bit concerned with how the chairs are positioning this... after the call I realized what was happening here was the chairs are going to treat this as we no longer have the consensus we had on drafts up to -17 where there was a way to indicate ordering of requests to the proxy. We had no objections to this in last call of -17. We are trying to get to done and reopening base issues about what the requirements are is not helpful."*
  - *"I would have objected to bidi if it did not have a way to synchronize - this is a fundamental part of bidi."*
  - *"I'm fine with punting this to London."*
- **Net**: this is Cullen's framing of the situation absent a chair message — the absence of formal consensus on draft-17's request-ordering mechanism (now removed via PR #1615 RRID + PR #1623 GOAWAY) reopens what he believed was settled. Likely to drive London hybrid-interim agenda.
- **"Knowing the start of a Subgroup"** thread: ~1 additional Cullen reply on May 1; PR #1608 was formally closed the same day.

## moq-dev/moq — PR #1368 doc fix MERGED, PR #1367 (pull-mode renderer) + PR #1369 (moqsink EOS fix, sidsethupathi back) OPENED

[[luke-curley]] kept main moving forward with a small doc fix and a flake bump; two new contributor-driven PRs opened on May 1–2.

- **[PR #1368](https://github.com/moq-dev/moq/pull/1368) MERGED** May 1 18:08:59 UTC by [[luke-curley]] (+1/−1, *Update Cloudflare limitation note for latency=real-time*). Single-line doc note clarifying that Cloudflare doesn't support both `reload` AND `latency=real-time`.
- **[PR #1366](https://github.com/moq-dev/moq/pull/1366) MERGED** May 1 14:58 UTC — flake.lock dependency bump. Routine.
- **[PR #1367](https://github.com/moq-dev/moq/pull/1367) OPENED** May 1 15:17:12 UTC by **skirsten** (Simon Kirsten) (+46/−4, *@moq/watch: add pull mode to video renderer*). Body: on Chrome with 144Hz+ monitors the existing Renderer caused Chrome to render at 120fps despite the draw logic being correct. Wrapping `requestAnimationFrame` recursively syncs to the monitor's vsync. Adds `mode: "push" | "pull"` prop on Renderer; `"pull"` runs self-recursive rAF and redraws only on frame change. MultiBackend WebCodecs path now uses `mode: "pull"`. skirsten notes *"we can also drop the push mode if you want."* — fourth skirsten PR after #1349, #1355, #1365 (all now merged).
- **[PR #1369](https://github.com/moq-dev/moq/pull/1369) OPENED** May 2 03:27:40 UTC by **sidsethupathi** (Sid Sethupathi, MLB) (+39/−2, *moq-gst: fix moqsink eos*). Fixes the gst-launch pipeline `videotestsrc num-buffers=120 ! ... ! moqsink` so that EOS from `num-buffers` is honored — previously the pipeline ran indefinitely; with the fix it exits after 2 seconds. **Second sidsethupathi PR** after #1294 (Apr 12 *"use generated name if no sink pad name provided"*) — the moq-gst contributor base is solidifying around MLB engineering.

## moqtail — quiet day after May 1 PR #180 + PR #178 work

No new PRs opened May 1–2 after the heavy Apr 30 day. PR #180 (separate stream for SUBSCRIBE_NAMESPACE) is now structurally aligned with the just-merged moq-transport PR #1542.

## MoQ Monthly #1 published (May 1)

**[MoQ Monthly #1](https://buttondown.com/moqmonthly/archive/moq-monthly-1/)** *"NAB, interoperability, and a whole lot of catching up"* by Mike English (Cloudflare) — first issue since #0 (Mar 4 2026). ~3,500 words. Highlights:

- **NAB 2026 (Apr 18–22)**: Qualabs / Ateme / EZDRM C2PA + DRM + MoQ demo on Cloudflare's global relay; Oracle Video@Edge multi-vendor (Ateme / Broadpeak / Cloudflare / Bitmovin); Wowza OBS → Shaka via CMAF/CMSF; Norsk native MoQ.
- **Spec status**: Draft-14 widely implemented; Draft-16 interop underway; **Draft-18 named as next interop target**.
- **Browser support**: Safari 26.4 shipped WebTransport without dev-mode flag → WebTransport now Baseline.
- **Implementation activity**: OpenMOQ added Vindral; aiomoqt resumed by Giovanni Marzot.
- **Upcoming**: Streaming Tech Sweden May 21 Stockholm; **IETF MoQ Interim June 9–12 London (Cloudflare hosting)**.
- **Wiki shout-out**: explicit URL `tobbee.github.io/moq-llm-wiki/`. Phrasing: *"Torbjörn is also running an experiment using Andrej Karpathy's LLM Wiki concept to build a living MoQ ecosystem reference"* — described as *"updated daily from the mailing list, Slack, GitHub, and Datatracker"*. Earlier in the spec section: *"For a current summary of all active drafts and their status, the MoQ LLM Wiki has a useful table."*
- **moqlivemock shout-out**: *"Torbjörn Einarsson (Eyevinn Technology) has shipped a significant update to moqlivemock and warp-player: draft-14 and draft-16 support with auto-negotiation, DRM (Widevine, PlayReady, FairPlay, ClearKey) following CMSF PR 18, and confirmed working WebTransport on Safari 26.4 including iOS."*

# Interop Runner (May 2 00:37 UTC)

**25 pass / 66 fail / 14 skip** (105 tests). +1 pass / -1 fail vs May 1 00:40 UTC's 24/67/14. Gradual recovery from the Apr 17 regression continues at +1/day.

# Implementation + WG Activity (Apr 30 → May 1 04:00 UTC)

## moq-wg/moq-transport — PR #1534 (REDIRECT) MERGED, PR #1624 (LOC properties registry) MERGED, mailing-list "Knowing the start of a Subgroup" thread expands to 10+ messages

The post-interim editorial wave culminates with two more merges. The "Knowing the start of a Subgroup" thread on the list grew from 3 messages (Apr 29) to 10+ (Apr 30), with first explicit positions from Magnus Westerlund, Mo Zanaty, and Luke Curley.

### Merges (Apr 30 18:10 → May 1 01:11 UTC)

- **[PR #1534](https://github.com/moq-wg/moq-transport/pull/1534) MERGED** May 1 01:11:59 UTC by [[alan-frindell]] (+50/−1, *Add REDIRECT for request errors and established subscriptions*). Lands the redirection mechanism. Adds:
  - **Redirect structure** (Connect URI + Full Track Name) and **REDIRECT error code** to REQUEST_ERROR — allows publishers/relays to redirect new requests (SUBSCRIBE, FETCH, TRACK_STATUS, SUBSCRIBE_NAMESPACE) to a different location.
  - **Standalone REDIRECT message** for redirecting **established** subscriptions (SUBSCRIBE, PUBLISH, SUBSCRIBE_NAMESPACE, PUBLISH_NAMESPACE) without tearing down the session.
  - PROTOCOL_VIOLATION rules: servers receiving a non-empty Connect URI MUST close with PROTOCOL_VIOLATION; non-empty Track Namespace + empty Connect URI is an internal track redirect.
  - Vasilvv (Apr 27 23:01 UTC) + suhasHere (Apr 29 17:56:52 UTC) approvals before merge. **Closes Issue #1481** ([[fluffy]] Feb 9 — *"Do we need a way to move / goaway for individual track"*). Resolves the long-running redirect debate that started Feb 11 between afrind, suhasHere, and others.
- **[PR #1624](https://github.com/moq-wg/moq-transport/pull/1624) MERGED** Apr 30 18:10:18 UTC by [[alan-frindell]] (+11/0, *Add provisional registry for LOC properties*, fixes #1550). [[suhas-nandakumar]]'s tiny patch establishing a provisional IANA registry for LOC property type codepoints. **Closes Issue #1550** (yuanchao-chris's Mar 11 *"draft-17: Properties Type collision between moq-16 and loc-01"* — the cross-draft 0x02/0x04 collision afrind flagged Apr 16 also affected loc-02). The fix avoids changing existing codepoints; adds the registry needed to coordinate across MOQT and LOC going forward.

### Issue #1622 follow-up

- **[Issue #1622](https://github.com/moq-wg/moq-transport/issues/1622)** *"Request ID in GOAWAY isn't useful"* (ianswett, Apr 30 00:52 UTC) — **[[alan-frindell]] counter Apr 30 18:31:57 UTC**: *"My counter is - it's trivial to put the request ID in goaway, and might be useful. If nothing else it can speed up retry when a new request is racing a GOAWAY."* afrind's first explicit pushback against ianswett's walk-back of PR #1559. PR #1623 (the revert) is now contested.

### Open PR state (post-Apr 30)

- **PR #1542** (SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split) — APPROVED, ready to merge.
- **PR #1620** (Joining FETCH unaffected by fwd→0) — APPROVED, ready to merge.
- **PR #1618** (FIRST_OBJECT bit) — APPROVED but parallel list debate ongoing (see below).
- **PR #1623** (Remove Request ID from GOAWAY) — afrind opposed, ianswett unmoved; needs WG resolution.
- **PR #1625** (Magnus Security Considerations rebase) — awaiting gloinul review.

## Mailing List — "Knowing the start of a Subgroup" thread expands to 10+ messages (Apr 30)

Apr 30 saw a 7-message burst on the new thread, bringing total messages to 10. Magnus Westerlund, Luke Curley, Suhas Nandakumar, and Mo Zanaty all weighed in, and Luke proposed a third design alternative.

- **Magnus Westerlund Apr 30** ([msg](https://mailarchive.ietf.org/arch/msg/moq/LjT4jA8TH4koIfygE8rxIBpy3nM/)): replied to ianswett+afrind's request for examples broken by #1608.
- **Ian Swett Apr 30 follow-up** ([msg](https://mailarchive.ietf.org/arch/msg/moq/WCj_TkgQogAPfE_3RBXKf2AfO7g/)).
- **[[luke-curley]] Apr 30 ~10:41 PDT** ([msg](https://mailarchive.ietf.org/arch/msg/moq/eIEyCkv8E2dwf-bduz5s_hOnsPg/)): **Critical of both proposals.** Against #1608: enforcing `Subgroup ID == first Object ID` is impractical without tight encoder control and *"information is already implicit via FETCH or SUBSCRIBE object arrival order"*. Against #1618 alone: the bit *"only helps REWIND (if there's a fragmented cache) for the first object… not expensive to add, but you still need a plan to handle the rest of the gaps"*. **Proposes a third option**: an **0-indexed counter per object within a subgroup** (incrementing by one) so relays can detect cache gaps on a subgroup basis. *First proposal of an explicit per-subgroup object index since the Apr 17 LargestGroup/CurrentGroup convergence.*
- **[[alan-frindell]] Apr 30 follow-up** ([msg](https://mailarchive.ietf.org/arch/msg/moq/K7PCeHtL66kMCc1QfsJ07AYAq24/)).
- **[[suhas-nandakumar]] Apr 30** ([msg](https://mailarchive.ietf.org/arch/msg/moq/fDDf7ZkatVbdUb9MJk9-lgtoTwI/)).
- **[[luke-curley]] Apr 30 follow-up** ([msg](https://mailarchive.ietf.org/arch/msg/moq/nHSUhOI9s2QhfyxDrny55ElxHW0/)).
- **Mo Zanaty Apr 30 22:06 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/k8-VOGI2V1wWcApiZIH5nMB3C8o/)): **Endorses the FIRST_OBJECT-bit approach (#1618) over #1608.** Concrete AV1 example to motivate explicit signaling: temporal-only AV1 layering produces frame numbers (0-5) ≠ layer numbers (0,2,1,2,0,2), violating any rule that ties Subgroup ID to first Object ID. Calls #1608 *"a footgun for devs to screw up"* — *"even the working group fell into this trap"*. On the side, on subgroup-vs-datagram tie-breaking with equal priority: *"subgroup wins"* (datagrams at matching priority are *"disposable and therefore lower priority"*).

**Net effect**: the list debate is now a three-way design discussion (#1608 / #1618 / Luke's per-subgroup counter) on top of an already-merged-leaning PR #1618. Cullen and Mo aligned with #1618, Magnus engaged but unclear, Suhas weighing in, Luke proposing a fourth path. The PR is **APPROVED but not yet merged** as of May 1 04:00 UTC.

## moq-wg/secure-objects — MASSIVE editorial wave (Apr 29 → May 1, 4 PRs MERGED, 5 issues CLOSED, 6 PRs OPENED)

After being quiet since draft-00 was published Mar 2, secure-objects had its largest activity wave to date. Issue #74 ("Authentication of Track Properties") landed a working-group consensus decision: **option #1 — no E2E security for track properties** (applications add properties needing E2E to first object of group instead).

### Merged PRs (May 1 03:02–03:24 UTC, all by [[suhas-nandakumar]] as committer)

- **[PR #79](https://github.com/moq-wg/secure-objects/pull/79) MERGED** May 1 03:02:45 UTC ([[suhas-nandakumar]], *Use fixed-width integers for AAD and nonce formation to avoid varint ambiguity*). **Closes Issue #58** (vasilvv Feb 23 — *"Varints"* in AAD). Eliminates the varint canonicalization ambiguity that would have allowed two valid encodings of the same AAD to produce different ciphertext-AEAD outputs.
- **[PR #80](https://github.com/moq-wg/secure-objects/pull/80) MERGED** May 1 03:04:41 UTC ([[suhas-nandakumar]], *Add Publisher Priority to E2E authenticated data*). **Closes Issue #71** ([[fluffy]] Mar 16 — *"Add publisher priority to e2e authenticated data"*). Brings publisher priority under the AEAD authentication tag so relays cannot manipulate it.
- **[PR #75](https://github.com/moq-wg/secure-objects/pull/75) MERGED** May 1 03:24:17 UTC ([[fluffy]], *guidance on track extentions* [sic]). Adds guidance on how track extensions interact with secure-objects authentication.
- **[PR #76](https://github.com/moq-wg/secure-objects/pull/76) MERGED** May 1 03:24:52 UTC ([[fluffy]], *Explain 32-bit object ID nonce limitation*). **Closes Issue #70** ([[alan-frindell]] Mar 15 — *"Is using 32 bits of Object ID in the nonce ok?"*). Documents the implication that publishers must rotate keys before exhausting the 32-bit Object-ID space within a key generation.

### AAD structural change (commit-only, not in a merged-PR)

- **Commit `87a95f77`** ([[suhas-nandakumar]] May 1 03:17:34 UTC): *"Remove Track Namespace and Track Name from AAD structure"*. PR #81 (which proposed this *"Simplify SECURE_OBJECT_AAD to contain only Serialized Immutable Properties"*) was closed without merge, but the underlying change landed via a follow-on commit. **This is the most consequential change of the wave**: the AAD no longer authenticates Track Namespace + Track Name, only the serialized immutable properties. Aligns with the Issue #74 consensus that track-level data is signaled via control messages and not protected end-to-end.
- **Commit `56248619`** ([[suhas-nandakumar]] May 1 03:01:33 UTC): *"make object id 32 bits"*. Wire-format finalization for the Object ID nonce field discussed in PR #76 / Issue #70.

### Issues closed (Apr 29 → May 1)

- **Issue #74** *"Authentication of Track Properties"* ([[fluffy]] Apr 29 19:57 UTC opened → CLOSED May 1 03:24:18 UTC). Body documents WG decision: *"track properties appear only in control message and thus are not authenticated. Looked at various options including: Option #1: Don't provide end to end security for track properties. Applications will just add properties that need end to end security as object properties to first object of the group. Option #2: Provide authentication only for track properties when an object is received. Option #3: Provide authentication + encryption for track properties when an object is received. Option #4: Provide a separate End to End Encryption / Protection for track properties in control messages. **Consensus was option #1.**"*
- **Issue #70** (32-bit Object ID nonce) — closed via PR #76 merge.
- **Issue #71** (Publisher priority in E2E AAD) — closed via PR #80 merge.
- **Issue #58** (Varints in AAD) — closed via PR #79 merge.
- **Issue #61** (vasilvv Feb 23 — *"Private extensions set-up"*) — CLOSED Apr 29 20:37:06 UTC.

### Open PRs (still in flight as of May 1 04:00 UTC)

- **[PR #77](https://github.com/moq-wg/secure-objects/pull/77)** ([[fluffy]] Apr 30 — *describe threat model*, mostly fixes #49 — *"Describe achieved security properties with this solution"*).
- **[PR #78](https://github.com/moq-wg/secure-objects/pull/78)** ([[fluffy]] Apr 30 — *Describe the fan out attack — DO NOT MERGE YET*). Tracks the multi-subscriber AEAD-collision class.
- **[PR #82](https://github.com/moq-wg/secure-objects/pull/82)** ([[suhas-nandakumar]] Apr 30 — *Add padding property for byte boundary alignment*, fixes Issue #54 — fluffy Nov 2025 *"add a private header extension for pad to N byte boundary"*).
- **[PR #83](https://github.com/moq-wg/secure-objects/pull/83)** ([[fluffy]] Apr 30 — *Change the SFRAME ref to point at the RFC*).
- **[PR #84](https://github.com/moq-wg/secure-objects/pull/84)** ([[fluffy]] Apr 30 — *Add test vectors in appendix*).
- **[PR #85](https://github.com/moq-wg/secure-objects/pull/85)** ([[fluffy]] Apr 30 — *fix up inconsistent dash in end-to-end and hob-by-hop*).

### Other Cullen Apr 30 commit

- **`37a08eb0`** Apr 30 03:31:05 UTC ([[fluffy]]): *"Update draft-ietf-moq-secure-objects.md"* — direct main-branch edit (no PR), part of the editorial cleanup.

### Net effect

In ~30 hours secure-objects went from a quiet draft-00 to a coordinated cleanup: AAD structure simplified, varint ambiguity removed, publisher priority authenticated, 32-bit Object-ID limitation documented, track-property authentication scope formally decided (option #1: not in scope). The remaining open PRs are threat-model/test-vectors/editorial work — secure-objects is converging on a publishable -01.

## moq-dev/moq — PR #1357 (fetch_group + TrackDynamic) merged Apr 30 00:01 UTC; PR #1365 (skirsten AudioContext) merged May 1 01:38 UTC; PR #1359 (ksletmoe-aws OrderedConsumer) review begins

- **[PR #1357](https://github.com/moq-dev/moq/pull/1357) MERGED** Apr 30 00:01:46 UTC by [[luke-curley]] — already noted in the Apr 30 wiki entry; the fetch_group + TrackDynamic API is now on `main`.
- **[PR #1365](https://github.com/moq-dev/moq/pull/1365) MERGED** May 1 01:38:38 UTC (skirsten, *@moq/watch: expose AudioContext on the audio backend*, +11/0). Body: *"The WebCodecs decoder owns its own AudioContext but doesn't surface it past the Decoder class. Browsers create the context in `suspended` state when there's no user gesture, and applications need a handle on it to prompt the user (e.g. a 'click to enable audio' button) and call `resume()` from within the gesture handler."* Companion to PR #1349 (static catalog format) and PR #1355 (sampleRate override) — completes the Hang/moq-watch audio-handling polish for end users hitting browser autoplay policies.
- **[PR #1359](https://github.com/moq-dev/moq/pull/1359)** (ksletmoe-aws *feat(player): unify Consumer across container formats*, +1083/−1173) — author **self-summary Apr 30 21:16:33 UTC**: *"This PR grew a bit from the original fix — I took the opportunity to create a unified `Consumer` that mirrors the Rust `Consumer<F: Container>` pattern. **What started it:** The CMAF decoder paths…"*. Apr 30 22:10:45 UTC: *"Sorry for the churn on this one — the commit history is messier than it should be. In hindsight I should have closed the original PR and opened a fresh one once the scope expanded from a targeted fix"*. **[[luke-curley]] Apr 30 22:29:47 UTC**: *"No worries, I'll take a look at it soon."* PR remains open with major scope increase per Luke's design suggestion.
- **New issue [#1364](https://github.com/moq-dev/moq/issues/1364)** *"Cloudflare Relay"* opened Apr 30 14:20:51 UTC by **danrossi** (David Ross). Reports moq-js can't connect to Cloudflare's draft-14 / draft-07 relays from `moqlivemock` URLs. CodeRabbit auto-flagged as possible duplicate of #586.

## moqtail — PR #178 (relay scheduling algorithm) MERGED, PR #180 (separate stream for SUBSCRIBE_NAMESPACE) OPENED

- **[PR #178](https://github.com/moqtail/moqtail/pull/178) MERGED** Apr 30 12:23:13 UTC by **zafergurel** (+455/−62, *feat: implementation of the scheduling algorithm in the relay*). Lands draft-17 §7.2 prioritization scheduling at the relay layer. Closes Issue #176. **First moqtail merge implementing draft-17-specific behaviour.**
- **[PR #180](https://github.com/moqtail/moqtail/pull/180) OPENED** Apr 30 18:51:59 UTC by **zafergurel** (+1150/−488, *feat: separate stream for subscribe_namespace*) against `draft-16`. Major refactor moving SUBSCRIBE_NAMESPACE handling onto its own bidirectional stream — anticipates the [[moq-transport]] PR #1542 SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split that is now APPROVED upstream. Reviewer: DenizUgur. **First moqtail PR adopting the post-Apr-29 SUBSCRIBE_NAMESPACE split design** before it lands in draft-18.

## Slack & Other Channels

- **#moq**: No new posts since Apr 27 18:50 CEST. Channel quiet across the post-interim editorial wave.
- **#moq-rs / #moq-js / #libquicr**: Quiet since channel-creation period (mid-March 2026).

## Implementation Repos — Other

- **[[moq-rs]]** (cloudflare): No new commits since Apr 13. itzmanish's PR #134 (PUBLISH_NAMESPACE replacement) and #121 (remote-manager refactor) still open.
- **video-dev/[[moq-js]]**: Quiet since mid-March.
- **[[quiche-moq]]** (google/quiche moqt dir): No new commits since Apr 22.

# Interop Runner (May 1 00:40 UTC)

**24 pass / 67 fail / 14 skip** (105 tests). +1 pass / -1 fail vs Apr 30 23:17 UTC's 23/68/14. Gradual recovery continues from the Apr 17 regression (18/73/14).

# Draft Status Watch

- **draft-cenzano-moq-media-interop-03** is **EXPIRED** (Apr 23). No -04 has been published. [[moq-media-interop]] page should reflect "expired" status.
- **draft-ietf-moq-secure-objects-00** is in active editorial cleanup; -01 likely soon given the wave above.
- **REWIND consensus call** closed **today (May 1, 2026)**. Chair Magnus Westerlund will need to interpret a split outcome (Cullen explicit option-#1, Luke + Ian-individually for option-3 with CurrentGroupFill, Martin Duke compromise-floor, Gwendal pushing back on Joining FETCH removal).

# Key Themes

1. **REWIND consensus call deadline reached today (May 1)** — split outcome with at least one explicit option-#1 vote (Cullen), option-3-with-CurrentGroupFill positions (Luke, Ian individually), Martin Duke compromise-floor framing, Gwendal Simon live-streaming pushback.
2. **REDIRECT lands** — PR #1534 merged after a 60-day editorial cycle that began with the Feb 9 Issue #1481 (fluffy). MOQT now has both a REDIRECT REQUEST_ERROR variant and a standalone REDIRECT message for established subscriptions.
3. **LOC properties registry lands** — PR #1624 closes the cross-draft #1550 collision saga. Provisional IANA registry coordinates LOC and MOQT codepoints going forward.
4. **secure-objects editorial wave** — 4 merged PRs, 5 closed issues, 6 open PRs in 30 hours. Track Namespace + Track Name removed from AAD; track-property E2E protection formally out of scope (Issue #74 option #1). Object ID nonce nailed down as 32 bits.
5. **"Knowing the start of a Subgroup" debate is now three-way** — #1608 closed but ianswett still backs it; #1618 (FIRST_OBJECT bit) APPROVED with Cullen + Mo Zanaty support; Luke proposes 0-indexed per-subgroup counter as a third design.
6. **Request ID GOAWAY contested** — afrind pushes back on ianswett's PR #1623 walk-back, calling Request-ID-in-GOAWAY *"trivial to put in… might be useful… can speed up retry when a new request races GOAWAY"*. PR #1623 needs WG resolution.
7. **moqtail jumps to draft-17** — first PR (#178) implementing draft-17 §7.2 prioritization scheduling lands; PR #180 already prepares for the SUBSCRIBE_NAMESPACE split.
8. **moq-dev/moq Hang audio polish complete** — PRs #1349, #1355, #1365 form a sequence finishing the static catalog + AudioContext exposure + sampleRate override audio handling for browser autoplay constraints.
9. **media-interop draft expired** — draft-cenzano-moq-media-interop-03 expired Apr 23; no -04. LOC media-interop testing now relies on what's already implemented.
10. **moqtail PR #145 still not merged to main** — the umbrella draft-16 tracking PR (+12,200/−10,236) absorbed PR #168 + #169 on Apr 25 but has not landed on `main`.

# Pages Updated This Cycle (May 1)

- [[discussions-2026-04]] — last_updated bumped (cycle complete; rolls into May)
- [[moq-transport]] — PR #1534 + #1624 moved to "Recently Merged"; Issue #1550 + #1481 closed
- [[moq-secure-objects]] — added "Recent Editorial Wave" section + open-PR list
- [[moqtail]] — PR #178 merged, PR #180 opened
- [[moq-dev]] — PR #1365 + PR #1359 review state
- [[interop-status]] — 24/67/14 latest
- [[joining-fetch-dissent]] — Apr 30 list-thread additions
- [[moq-media-interop]] — marked expired
