---
title: "Discussions - April 2026"
tags: [discussions, slack, github]
date: 2026-04-14
last_updated: 2026-04-25
status: current
---

Summary of active discussions in the MOQ ecosystem during April 2026.

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
