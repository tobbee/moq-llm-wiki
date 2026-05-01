---
title: "Discussions - May 2026"
tags: [discussions, slack, github]
date: 2026-05-01
last_updated: 2026-05-01
status: current
---

Summary of active discussions in the MOQ ecosystem during May 2026.

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
