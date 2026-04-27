---
title: Wiki Log
tags: [log, maintenance]
date: 2026-04-14
last_updated: 2026-04-27
status: current
---

Chronological record of all ingestions, queries, and maintenance operations.

# 2026-04-27 - Interim day; PR #1586 merges (closes Martin's #877 "Pack the bits"); Suhas reviews PR #1542, Vasilvv reviews #1534/#1544 in pre-interim warm-up; moq-dev/moq lands #1340 + #1343, opens FETCH-readiness #1348; external PR #1349 from skirsten; interop recovers one test to 23/68/14

**Operation**: Update
**Sources**:
- Slack: MCP verified working. `#moq` / `#moq-rs` / `#moq-js` / `#libquicr` all quiet — no new posts in any channel since [[ian-swett]]'s Apr 23 14:12 UTC i18n review request. Four+ days of silence on the eve / morning of the interim.
- GitHub moq-wg repos:
  - **moq-transport**:
    - **PR #1586 MERGED** Apr 27 05:24 UTC by [[alan-frindell]] (+32/−23, *Make Object ID and Group ID delta encoded in Fetch responses*). Final suggested-text patch landed at 05:23 UTC immediately before merge. **Closes [[martin-duke]]'s Issue #877 ("Pack the bits")** and Issue #1345 ("Separate the list of reasons for malformed tracks into two lists", yekuiwang) — both closed Apr 27 05:24 UTC.
    - **PR #1542 review pass** (Split SUBSCRIBE_NAMESPACE / SUBSCRIBE_TRACKS) — [[suhas-nandakumar]] posted **seven inline comments** Apr 27 03:18–03:40 UTC: suggested `SUBSCRIBE_NAMESPACES` plural rename; *"I think we don't allow for the tracks to be echoed by default (sub-ns with self track commit)"*; clarifying-question on REQUEST_UPDATE-prefix-narrowing as error; *"may be you need to add one line that says what does 'First' mean here?"*; *"should we also add a note to say the namespace, namespace done, publish, publish done messages all get sent on the same bidirectional stream?"*; *"why did we remove this?"*. afrind responded Apr 27 04:59–05:23 UTC: *"It is not an error. It is only an error if the new namespace overlaps with a different sub_ns."* / *"It was removed in #1596, I updated here to match."* / suggested-text *"messages for tracks within matching namespaces, excluding tracks published by the subscriber."* / *"🤷 I can spend 45 seconds asking in the interim"* (one item explicitly deferred to live discussion).
    - **PR #1534 review pass** (Add REDIRECT) — [[suhas-nandakumar]] Apr 27 03:15 UTC: *"I am not sure how a relay would know the right FullTrackName which is application scoped."* (afrind replied "via configuration rules typically, it's not in-band"). [[victor-vasiliev]] reviewed Apr 27 03:52 UTC: *"This overall looks good, but we do need text on relay behavior (forwarding and caching)."* afrind Apr 27 05:00 UTC: *"@vasilvv Do you remember what we agreed to say? Cacheable up to retry interval?"* — Cloudflare/Google relay-caching alignment loop opened ~3 hours pre-interim.
    - **PR #1544** (Improve Startup Latency and 0-RTT, ianswett, opened Mar 8) — [[victor-vasiliev]] reviewed Apr 27 04:09 UTC: *"I don't understand what forward secrecy has anything to do with the text of this section."* First post-park signal on the PR.
    - Other interim agenda PRs (#1603 / #1604 / #1605 / #1607 / #1608 / #1609 / #1611 / #1613): no new comments.
  - **msf, loc, secure-objects, cmsf, catalog-format, privacy-pass**: No new issues, no new PRs, no new comments.
- Implementation repos:
  - **moq-dev/moq**:
    - **PR #1340 MERGED** Apr 26 16:26 UTC by [[luke-curley]] (+182/−5) — *moq-lite: add OriginConsumer::wait_for_broadcast; deprecate consume_broadcast*. Fixes the moq-gst sync-lookup footgun.
    - **PR #1343 MERGED** Apr 26 16:35 UTC by [[luke-curley]] (+283/−26) — *relay: add subdomain-based slug routing for customer isolation*. The 🔴 Critical WS/web auth-handler bypass that CodeRabbit flagged Apr 23 was resolved before merge. **First SaaS-style multi-tenancy primitive in moq-relay.**
    - **PR #1348 OPENED** Apr 26 15:38 UTC by [[luke-curley]] (+1049/−471) — *moq-lite: backport Subscription model API for FETCH readiness*. **First FETCH-readiness commit** on `moq-lite-fetch`. Backports `Subscription` / `TrackSubscriber` model-layer API from `dev`'s PR #1134. `Track` loses `priority`; new `Subscription { priority, ordered, max_latency, start, end }` carries it. CodeRabbit flagged 🔴 Critical: aggregator's `start`/`end` reduce treats `None` as "no preference" but the doc says `start: None` = "deliver all cached history" / `end: None` = "no end (live)" — semantics mismatch.
    - **PR #1349 OPENED** Apr 27 01:32 UTC by **skirsten** (Simon Kirsten, external contributor, +196/−13) — *@moq/watch: add static catalog format*. Third catalog mode beyond `hang` / `msf`: `static` lets callers pass a `Catalog.Root` directly. Promotes `Broadcast.catalog` to writable `Signal<Catalog.Root | undefined>`. CodeRabbit 🟡 Minor: `finally` clears a potentially user-owned signal. **Second contributor-driven catalog-format extension** to `<moq-watch>` after Luke's MSF (PR #1330).
    - **PR #1341** (Refactor media producers) — Luke posted **8 inline self-review comments** Apr 26 16:08–16:16 UTC: *"release-plz will bump this; don't manually do it."* / *"just call it `init` honestly. Also is there some serde_as thing we could use instead of String?"* / *"Could we avoid making this pub?"* / *"I don't think we should remove these jitter calculations. Maybe make a jitter.rs helper instead of copy-pasting? `jitter` isn't a great name, really it should be `min_frame_duration` or something."* — same self-review pattern as PR #1343 used pre-merge.
  - **moqtail/moqtail**, **cloudflare/moq-rs**, **video-dev/moq-js**, **google/quiche (moqt)**, **birneee/quiche_moq**: No activity in the window.
- Mailing list: **Apr 26 Weekly GitHub digest** from Repository Activity Summary Bot (covers Apr 19–26 across moq-charter, moq-transport, moq-requirements, warp-streaming-format, loc, wg-materials). Highlights match what the wiki already tracks: +1 issue (#1612 "What happens to Joining FETCH if fwd changes to 0?"), 1 closed, 5 PRs submitted, 6 receiving 9 comments. No new individual posts since [[alan-frindell]]'s Apr 24 18:26 PDT slides-folder reply.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9). draft-ietf-moq-transport-17 still the latest WG transport draft.
- Interop runner: **Apr 27 00:34 UTC run = 23 / 68 / 14** — **+1 pass** vs. Apr 26 (22/69/14), but still **−1 below** the Apr 25 high (24/67/14). Matches the Apr 24 reading and the Apr 15–16 baseline. Walking-arc-with-regression: 22 → 23 → 24 → 22 → 23. The flipped test is not exposed in the summary report. Most plausible cause: PR #1340 (`wait_for_broadcast`) flowing through `moq-dev-rs` / `moq-dev-js` docker rebuilds.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: None open.

**Pages updated**: discussions/discussions-2026-04.md, implementations/moq-dev.md, interop/interop-runner.md, drafts/moq-transport.md, index.md

**Key findings**:

*Pre-interim warm-up on PR #1542 / #1534 / #1544* — Suhas Nandakumar conducted a substantial pre-interim review pass on PR #1542 (SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split), posting seven inline comments in 22 minutes (Apr 27 03:18–03:40 UTC) raising semantics questions about self-track-echo, REQUEST_UPDATE-prefix-narrowing-as-error, "First message" definition, and the bidi-stream-pinning convention. afrind responded systematically over 24 minutes (04:59–05:23 UTC), explicitly deferring one item to "the interim itself" with *"🤷 I can spend 45 seconds asking in the interim"*. Separately, Vasilvv reviewed PR #1534 (REDIRECT) approving the structure but flagging missing relay-behavior text — opening a Cloudflare/Google caching-alignment loop that afrind acknowledged with *"@vasilvv Do you remember what we agreed to say? Cacheable up to retry interval?"*. Vasilvv also pushed back on PR #1544's (0-RTT) forward-secrecy framing as a pre-merge blocker. Classic editor warm-up: groom text in PR comments to either land or punt before the call.

*PR #1586 lands and closes "Pack the bits"* — afrind merged the FETCH delta-encoding PR at Apr 27 05:24 UTC, just hours before the interim, and used it to close two long-running issues: Martin Duke's #877 "Pack the bits" (one of the older open Martin issues) and yekuiwang's #1345 (malformed tracks reasons split). Final suggested-text iteration landed at 05:23 UTC immediately before merge. The PR resolves the Apr 23 mid-group-FETCH ambiguity afrind flagged. This is the second `main` merge in the post-draft-17 era after PR #1606 (stream reset codes) on Apr 23 — moving the editor needle on cleanup as the WG approaches the meeting.

*moq-dev/moq big day: #1340 + #1343 merged, #1348 opens for FETCH* — Luke pushed two relay-infra primitives through to `main` Apr 26 16:26–16:35 UTC: `wait_for_broadcast` (fixes the moq-gst sync-lookup footgun) and subdomain-based slug routing (the first SaaS-style multi-tenancy primitive in moq-relay; resolves the Apr 23 🔴 Critical WS/web auth-handler bypass before merge). Then opened the major **FETCH-readiness foundation** PR #1348 at 15:38 UTC: backports the `Subscription` / `TrackSubscriber` model-layer API from `dev`'s PR #1134 onto `moq-lite-fetch` (+1049/−471). Goal stated explicitly: *"Land the API surface FETCH needs without implementing FETCH wire/stream handling — fetch can plug into TrackSubscriber::update once the wire path is added."* Pairs with Luke's Apr 24 spec-side argumentation on issue #1358 about JOINING FETCH priority limitations — Luke wants both API and design clarity locked in before FETCH wire ships. CodeRabbit flagged a 🔴 Critical semantics mismatch in the start/end aggregator that needs fixing before merge.

*External PR #1349 from skirsten — second contributor-driven catalog-format extension* — Simon Kirsten opened PR #1349 at Apr 27 01:32 UTC adding a third catalog mode (`static`) to `<moq-watch>`. After Luke's own MSF mode (PR #1330) and now an external `static` mode, the catalog-format-as-attribute API is gaining contributor mindshare. The PR also promotes `Broadcast.catalog` from getter to writable `Signal<Catalog.Root | undefined>` — a public-API change that needs Luke's review.

*Interop matrix walks back into interim parity at 23/68/14* — Apr 27 00:34 UTC = 23/68/14, +1 from Apr 26 (22/69/14), but −1 below the Apr 25 high (24/67/14). The walking arc is 22 → 23 → 24 → 22 → 23 over five days. Still matches the Apr 24 reading and the Apr 15–16 baseline. Implementation activity in the relevant window includes moq-dev/moq's two `main` merges, of which `wait_for_broadcast` (PR #1340) is the more plausible cause for a `moq-dev-rs` / `moq-dev-js` image rebuild that flipped one pair (it directly affects relay/origin lookups). The matrix walks into the Apr 27 interim **at parity with Apr 24**, neither at peak nor at the Apr 21–23 plateau.

---

# 2026-04-26 - Pre-interim lull on the spec side; moqtail draft-16 branch absorbs two big merges (#168 + #169, ~2.1k LOC); moq-dev #1346 root-caused as browser/GPU; interop regresses to 22/69/14

**Operation**: Update
**Sources**:
- Slack: MCP verified working. `#moq` / `#moq-rs` / `#moq-js` / `#libquicr` all quiet — no new posts in any channel since [[ian-swett]]'s Apr 23 14:12 UTC i18n review request. Three-plus calendar days of silence on the eve of the Apr 27 interim.
- GitHub moq-wg repos:
  - **moq-transport, msf, loc, secure-objects, cmsf, catalog-format, privacy-pass**: **No new issues, no new PRs, no new comments since the Apr 25 log entry.** Pre-interim lull — the headline interim agenda PRs (#1603 / #1604 / #1605 / #1607 / #1608 / #1609 / #1611 / #1613) are all quiet; discussion has likely moved to the meeting itself or offline conversations.
- Implementation repos:
  - **moq-dev/moq**:
    - **PR #1345 MERGED** Apr 25 15:13 UTC by [[luke-curley]] (+108/−0) — *py/moq-lite: add clock + announced examples*. Adds two Python examples for the moq-lite Python bindings.
    - **PR #1347 MERGED** Apr 25 14:47 UTC by dependabot[bot] (+2/−2) — Bump `rustls-webpki` 0.103.12 → 0.103.13. Routine.
    - **PR #1343** (subdomain-based slug routing) — still **OPEN**. Luke posted **two self-review rounds** on Apr 25 (22:09 UTC and 22:40 UTC) with five inline comments addressing CodeRabbit's earlier feedback ("IMO do one strip_suffix call." / "Maybe add the leading . to the domain after parsing the config file?" / "We could replace . with / to support multiple paths." / "We should also lowercase and add a . prefix here." / "Why is this public? IDK seems like it's too specific."). A new CodeRabbit review (Apr 24 22:22 UTC) suggests pre-canonicalizing suffixes to lowercase in `Auth::new`. The 🔴 Critical WS/web auth-handler bypass is still not addressed in pushed code.
    - **Issue #1346** (catalog-discovery / "how to build something with this") — saw ~7 substantive exchanges between @kubo6472 and Luke on Apr 25 14:17–19:15 UTC. **Root cause confirmed at 19:15 UTC**: kubo6472 switched to Chromium on Linux Mint and both `/watch/live` and `moq.dev/watch` started working — original tearing was a Firefox/GPU/driver issue, not a moq-lite or @moq/watch defect. Luke confirmed *"I'm working on DVR (rewind). It'll be at least a few months."* The underlying cross-impl Cloudflare-relay catalog-discovery bug (`SUBSCRIBE_NAMESPACE` not implemented) and the docs gap remain. Issue still OPEN.
  - **moqtail/moqtail**: **Two large merges into the `draft-16` integration branch** within 2 minutes on Apr 25 afternoon UTC:
    - **PR #168 MERGED** Apr 25 17:15 UTC by @ctllmp (+1094/−443) — closes #115. Lands the FETCH-object wire format finalized in the Apr 23 PR comment.
    - **PR #169 MERGED** Apr 25 17:17 UTC by @fatih-alperen (+994/−593). Migrates `FETCH`, `SUBSCRIBE_NAMESPACE`, `PUBLISH_NAMESPACE`, and `TRACK_STATUS` messages from older-draft key-value pairs to draft-16 Message Parameters.
    - Together: ~2.1k lines across `moqtail-rs` + `moqtail-ts` in lockstep — largest moqtail draft-16 day since the Apr 14–16 burst. The umbrella PR #145 (zafergurel) remains open against `main`.
  - **cloudflare/moq-rs**, **video-dev/moq-js**, **google/quiche (moqt)**, **birneee/quiche_moq**: No activity in the window.
- Mailing list: **No new posts** since [[alan-frindell]]'s Apr 24 18:26 PDT (Apr 25 01:26 UTC) reply with the slides folder link. Three-plus calendar days of silence ahead of the Apr 27 interim.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9). draft-ietf-moq-transport-17 still the latest WG transport draft.
- Interop runner: **Apr 26 00:34 UTC run = 22 / 69 / 14** — **two-test regression** from the Apr 25 high-water mark of 24/67/14, dropping back to the Apr 21–23 plateau. Breaks the three-day improvement arc. Most likely a flaky test or an upstream image rebuild for one of the other matrix entries — moqtail's draft-16 work landed on the integration branch, not `main`, so docker images shouldn't have changed; moq-dev/moq merged only a Python examples PR and a dep bump, neither of which touches the wire path.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: None open.

**Pages updated**: discussions/discussions-2026-04.md, implementations/moq-dev.md, implementations/moqtail.md, interop/interop-runner.md, index.md

**Key findings**:

*Pre-interim lull on the spec side* — Zero activity across all moq-wg repos in the Apr 25 02:00 UTC → Apr 26 00:34 UTC window: no new issues, no new PRs, and no new comments on any of the eight headline Apr 27 interim agenda PRs (#1603 RRID DoS, #1604 Joining FETCH onto SUBSCRIBE, #1605 delivery timeout, #1607 Largest Available Group filter, #1608 Subgroup ID alignment, #1609 forward-state-mismatch error, #1611 PUBLISH_OK removal, #1613 MAX_REQUEST_UPDATES). After the Apr 24 burst when Luke Curley posted three substantive comments in 52 minutes weighing in on the design, the editors and contributors have gone silent — three-plus calendar days of mailing-list silence too. Discussion has clearly moved offline or to the live meeting tomorrow. The interim agenda is now frozen-in-place: published slides for #1608, #1519/#1603, #1613, #1605; Victor Vasiliev's still-private RRID alternative will be the wildcard.

*moqtail's draft-16 branch absorbs two big merges in 2 minutes* — Apr 25 17:15 UTC and 17:17 UTC saw PR #168 (FETCH-object bitmask + delta encoding, +1094/−443, by @ctllmp) and PR #169 (Message Parameters migration for FETCH / SUBSCRIBE_NAMESPACE / PUBLISH_NAMESPACE / TRACK_STATUS, +994/−593, by @fatih-alperen) merged into the `draft-16` integration branch. Together ~2.1k LOC across `moqtail-rs` and `moqtail-ts` — the largest moqtail day for draft-16 since the Apr 14–16 burst, and the cleanest single-day signal that moqtail is chasing draft-16 conformance for both languages in lockstep. Umbrella PR #145 (zafergurel) still open against `main`; until that lands, draft-16 work won't appear in the moqtail interop docker image.

*moq-dev #1343 self-review rather than push* — Luke posted two self-review rolls on PR #1343 (subdomain-based slug routing) at Apr 25 22:09 UTC and 22:40 UTC with five inline TODOs ("do one strip_suffix call", "lowercase and add a . prefix here", "replace . with / to support multiple paths", etc.). No code push yet; the Apr 23 🔴 Critical WS/web auth-handler bypass is still on the table. This is rework-in-thinking, not rework-in-code. The PR is the first SaaS-style multi-tenancy primitive in moq-relay and remains gated.

*Issue #1346 root-caused as browser/GPU, not moq-lite* — The Apr 24 first-externally-reported `<moq-watch>` + MSF cross-impl bug saw heavy back-and-forth Apr 25 afternoon UTC. After Luke pushed back on the tearing as a browser/GPU/driver issue, kubo6472 confirmed at 19:15 UTC: *"tried chromium on said linux and now it works on both the /watch/live and the moq.dev/watch, cool"*. So the visible playback regression turns out to be a Firefox-on-Linux/GPU-driver issue, not a defect in moq-lite or `@moq/watch`. The original cross-impl Cloudflare-relay catalog-discovery bug (`Cloudflare relay does not support broadcast discovery yet`) and the docs gap kubo6472 surfaced (had to paste `live.vue` source code asking "what am I doing wrong?") remain unresolved.

*Interop matrix regresses 2 tests overnight* — Apr 26 00:34 UTC = 22/69/14 — back to the Apr 21–23 plateau and below the Apr 15–16 baseline of 23/68/14. The two flipped tests aren't exposed in the summary report. Because moqtail's two big merges hit the `draft-16` integration branch (not `main`, so docker images shouldn't have changed) and moq-dev/moq merged only a Python examples PR + a dep bump, neither of which touches the wire path, the regression is more plausibly explained by an upstream rebuild on one of the other matrix entries (moq-rs / moq-rs-draft-16 / moqx / quiche-moq / libquicr / xquic / imquic) or by a flaky test. The matrix now enters the Apr 27 interim at the Apr 21–23 plateau rather than at peak strength — the optimistic "matrix entering the meeting at its strongest April reading" framing from yesterday's log no longer holds.

---

# 2026-04-25 - Luke Curley joins the pre-interim design debate, PR #1610 quietly merged Apr 23, interim slides posted, interop hits new April high at 24/67/14

**Operation**: Update
**Sources**:
- Slack: MCP verified working. `#moq` / `#moq-rs` / `#moq-js` / `#libquicr` all quiet — no new posts since [[ian-swett]]'s Apr 23 14:12 UTC i18n review request on PR #1588.
- GitHub moq-wg repos:
  - **moq-transport**:
    - **PR #1610 noted as MERGED** Apr 23 21:03 UTC by [[alan-frindell]] (+22/−17, *Define textual aliases for REQUEST_OK by request type*). The Apr 24 log entry incorrectly recorded this as still open; the merge happened ~2 hours after the PR opened, after a one-line `LGTM` from [[ian-swett]]. Unblocks PR #1611 (PUBLISH_OK removal) which had been parked behind it.
    - **PR #1608 review thread** (Subgroup ID = first Object Id) — three Apr 24 comments approaching consensus: [[ian-swett]] 12:26 UTC ("That's what I mean, so I guess I should be more explicit"), [[suhas-nandakumar]] 17:43 UTC suggested-text `Original publishers SHOULD assign each Subgroup a Subgroup ID equal to the Object ID`, [[ian-swett]] 18:17 UTC ("Actually, re-reading the text, isn't that what it says?").
    - **PR #1586 review thread** (delta-encoded Object/Group ID in FETCH) — [[ian-swett]] Apr 24 18:15 UTC pushed two suggested-text patches addressing the Apr 23 ambiguity flagged by afrind, asking for re-review. Key clarification: `If there is a prior Object in the Group and the Object ID Delta field is present, the Object ID is the prior Object's ID plus the Object ID Delta.`
    - **Issue #1603 / PR #1607 / Issue #1358 — [[luke-curley]] returns to the spec debate**: Three substantive comments in 52 minutes on Apr 24 evening UTC.
      - **#1603 (RRID DoS), Apr 24 22:44 UTC**: "I don't understand why it's on so many messages either. … +1 Martin's concern about DoS. I don't think it's a major issue in this instance because of MAX_STREAMS, but I'm not a fan of blocking on arbitrary IDs like Track Alias and Required Request ID in general (oops forgot a timeout)." Lines up with Martin's structural-fix camp (PR #1604).
      - **PR #1607 (Largest Available Group filter), Apr 24 23:10 UTC**: Concrete defense against Suhas's NextGroup alternative. Two arguments: (1) catalogs MUST use LargestGroup (NextGroup never resolves on dormant tracks, NGR for catalogs sends every existing subscriber a duplicate copy); (2) Twitch TTV math — at 1s into a 2s GoP with 1.5 Mb/s media on 3 Mb/s network, race-to-startup is 0.66s vs 1s wait = **333 ms faster startup**, plus warmed congestion controller. Proposes the combined `CurrentGroup + NGR` race idiom.
      - **Issue #1358 (Subscribing to start of current Group), Apr 24 23:36 UTC**: Opens a new design problem — *with subscriber priorities, a JOINING FETCH will never be deprioritized even when a new group starts*. Walks through TTV=1.33s for JOINING FETCH vs TTV=0.5s for hypothetical `SUBSCRIBE filter=LargestGroup order=DESC` in his concrete example.
    - **PR #1611 / #1609 / #1604 / #1613**: Quiet since Apr 24 log entry.
  - msf, loc, secure-objects, cmsf, catalog-format, privacy-pass: no activity.
- Implementation repos:
  - **moq-dev/moq**:
    - **PR #1343** (subdomain-based slug routing for customer isolation, +248/−27) opened Apr 23 by [[luke-curley]]; updated Apr 24 22:22 UTC. CodeRabbit flagged a 🔴 **Critical** issue Apr 23: the WebSocket and web auth handlers build `AuthParams` directly without consulting `Auth::domains`, which would leak the slug-based isolation in the WebSocket path. Awaiting Luke's response.
    - **PR #1347** opened Apr 24 17:04 UTC by dependabot[bot] — bump `rustls-webpki` 0.103.12 → 0.103.13.
    - **Issue #1346** opened Apr 24 08:24 UTC by @kubo6472 — first externally-reported bug exercising the new `<moq-watch catalog-format="msf">` element (PR #1330, Apr 20). User points the element at the Cloudflare draft-14 endpoint; hits `Cloudflare relay does not support broadcast discovery yet; skipping subscribe_namespace` warning + `subscribe error: id=0 broadcast=room/bbb track=catalog error=SUBSCRIBE error: code=0 reason=internal error: Internal error`. No reply yet from Luke. Confirms cross-impl friction at the catalog discovery layer between moq-lite/moq-dev clients and the Cloudflare moq-rs relay (which still doesn't implement `SUBSCRIBE_NAMESPACE`).
    - No new merges to `main` since PR #1322 (hop-based clustering, Apr 23 23:26 UTC).
  - **cloudflare/moq-rs**, **video-dev/moq-js**, **moqtail/moqtail**, **birneee/quiche_moq**: Quiet.
  - **google/quiche (moqt)**: No new moqt-specific commits since the Apr 22 batch by [[martin-duke]] (`MoqtClient`/`MoqtServer` session parameters API + `moqt_messages.h` cleanup).
- Mailing list: **[[alan-frindell]] replied Apr 24 18:26 PDT (Apr 25 01:26 UTC)** to Martin's "Monday's agenda is ready" thread with the slides folder link. Notable line: *"Some content is still pending. Victor will provide updated slides on delivery timeout proposals and request ID alternatives."* — confirms [[victor-vasiliev|Victor Vasiliev]] will present a **competing proposal to RRID** at the Apr 27 interim. Headline agenda items now have published slides for **#1608**, **#1519/#1603**, **#1613**, **#1605**; time permitting: Joining FETCH Dissent.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9). draft-ietf-moq-transport-17 still the latest WG transport draft.
- Interop runner: **Apr 25 00:32 UTC run = 24 / 67 / 14** — second consecutive day of improvement and a **new April 2026 high-water mark** (Apr 15–16 baseline was 23/68/14). One more test flipped fail → pass. First time since draft-17 publication that the matrix has improved on two consecutive days.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: None open.

**Pages updated**: discussions/discussions-2026-04.md, discussions/interim-meetings.md, drafts/moq-transport.md, implementations/moq-dev.md, interop/interop-runner.md

**Key findings**:

*Luke Curley returns to moq-transport spec PRs in force* — After being mostly absent from the `moq-wg/moq-transport` thread (concentrating on his own moq-dev / moq-lite codebase), Luke posted three substantive comments in 52 minutes on Apr 24 evening UTC, weighing in on three of the four headline Apr 27 interim agenda items. The pattern is striking: Luke (1) **+1'd Martin's RRID DoS concern** (#1603), aligning with the structural-fix camp behind PR #1604 over Alan's flow-control camp behind PR #1613; (2) **provided the strongest deployment-rooted defense yet** for PR #1607 (Largest Available Group filter), with concrete Twitch TTV math (333 ms median startup-time savings) and the catalog-track use case that *requires* it; and (3) **opened a new design problem** with JOINING FETCH and subscriber priorities, showing TTV=1.33s for JOINING FETCH vs TTV=0.5s for a hypothetical `SUBSCRIBE filter=LargestGroup order=DESC` because the SUBSCRIBE can immediately reprioritize to a new group while a JOINING FETCH cannot. Net effect heading into the interim: PR #1607 has its strongest pro-merge advocate yet, PR #1604 vs #1613 leans toward #1604, and the JOINING-FETCH-vs-LargestGroup-SUBSCRIBE ergonomic comparison just got a lot sharper.

*PR #1610 was actually merged Apr 23, not still open as the Apr 24 log claimed* — A factual correction to yesterday's log: the editorial REQUEST_OK textual-aliases PR was merged at Apr 23 21:03 UTC, ~2 hours after opening, after a one-line `LGTM` from Ian Swett. This unblocks PR #1611 (Remove PUBLISH_OK message type, make it a REQUEST_OK alias), which had been parked waiting on the rename to land first. Wiki has been corrected — moq-transport's Recently Merged section now lists #1610 above #1606.

*Apr 27 interim slides are posted; Victor Vasiliev will present an RRID alternative* — Alan's mailing-list reply locks in the agenda 60 hours before the meeting and explicitly flags that Victor will ship updated slides on **two** topics: delivery timeout proposals (PR #1605) and **request ID alternatives**. The "request ID alternatives" line is the new piece of information — it confirms there will be a third design proposal on the table beyond Martin's PR #1604 (move Joining FETCH onto SUBSCRIBE stream) and Alan's PR #1613 (MAX_REQUEST_UPDATES flow control). The interim is now positioned to choose between (a) status quo, (b) #1604, (c) #1613, or (d) Victor's still-private proposal.

*moq-relay subdomain routing lands on the roadmap with a critical auth bug* — Luke's PR #1343 adds the first SaaS-style multi-tenancy primitive in moq-relay: `<slug>.<suffix>` host pattern is rewritten to `<suffix>/<slug>/...` before auth runs. CodeRabbit caught a 🔴 Critical issue at PR-open time — the WS and web auth handlers build `AuthParams` directly without consulting `Auth::domains`, leaving a slug-isolation bypass on the WebSocket fallback path. Luke has not yet responded; the PR remains open. This is directly relevant to anyone running moq-relay behind a wildcard certificate (notably the `cdn.moq.dev` hosted relay).

*First externally-reported @moq/watch + MSF cross-impl bug* — Issue #1346 (kubo6472) is the first externally-reported bug exercising the catalog-format negotiation that Luke landed in PR #1330 (Apr 20). The user pointed `<moq-watch>` with `catalog-format="msf"` at the Cloudflare draft-14 endpoint, and hit two errors on the catalog discovery flow: a `Cloudflare relay does not support broadcast discovery yet; skipping subscribe_namespace` warning followed by an internal SUBSCRIBE error on the catalog track. Confirms the moq-lite ↔ moq-rs catalog-discovery interop gap is now exposed at the user-facing layer in the new browser element.

*Interop matrix at new April high; entering the interim at peak strength* — 24/67/14 at Apr 25 00:32 UTC is the strongest April reading and the first time since draft-17 publication that the matrix has improved on two consecutive days (22 → 23 → 24). With no new moq-dev/moq merges to `main` between the Apr 24 and Apr 25 runs (PR #1322 was the most recent landing, and was already counted toward yesterday's tick), the gain is most likely attributable to ongoing moqtail or moq-rs container rebuilds. The matrix enters the Apr 27 interim at its strongest April reading — a counter-narrative to the otherwise unresolved spec design debate.

---

# 2026-04-24 - Hop-based clustering MERGED on moq-dev, PR #1613 flow-control response to RRID DoS, interop finally ticks up to 23/68/14, moqtail FETCH wire format finalized

**Operation**: Update
**Sources**:
- Slack: MCP verified working. `#moq` channel — one new post since the Apr 24 log entry: [[ian-swett]] at Apr 23 14:12 UTC asking for internationalization-statement review on [moq-transport PR #1588](https://github.com/moq-wg/moq-transport/pull/1588) ("it's generated by AI based on past IETF docs, so it'd be good to have a review from someone who knows more than Alan and I"). No response yet on the channel. `#moq-rs` / `#moq-js` / `#libquicr` all quiet (channel-join events only).
- GitHub moq-wg repos:
  - **moq-transport**:
    - **PR #1613 opened** Apr 23 23:10 UTC by [[alan-frindell]] (+30/0, label `Design`, references #1063) — *Add MAX_REQUEST_UPDATES setup option and TOO_MANY_REQUEST_UPDATES error*. Per-stream flow control for REQUEST_UPDATE: new `MAX_REQUEST_UPDATES` Setup Option, each REQUEST_OK / REQUEST_ERROR response restores one unit of capacity, default 1 if not present. Direct response to Martin Duke's RRID DoS escalation on #1603.
    - **Issue #1612 reply** Apr 23 21:02 UTC by [[alan-frindell]] — "Changing the subscription from 1 to 0 after joining fetch has no effect on the FETCH. … I wonder if we should just allow fwd=0." Hints at relaxing the fwd=1 precondition for Joining FETCH entirely.
    - **PR #1604 update** Apr 23 20:55–20:57 UTC by [[martin-duke]] — added text that "killing SUBSCRIBE also kills the FETCH"; the PR description now says "Now fixes #1612 as well". Branch is `dirty` vs `main`.
    - **PR #1613 discussion** Apr 23 23:28 UTC – Apr 24 00:42 UTC: Martin initially pushed back ("doesn't solve the problem at all… sender sends 1,000 REQUEST_UPDATES, skipping a valid ID each time, each is OKed, receiver still has to store 1,000 request IDs"), then after an offline chat posted at 00:42 UTC: "OK, we chatted online and I get it now. Given the number of authorized streams, there's a cap on the maximum possible request ID assuming the peer isn't skipping request IDs, which it shouldn't. So this does finitely bound the non-contiguous request ID table. However, this PR is missing any text that endpoints have to check the request ID against this theoretical maximum. That's crucial, and a little tricky to write."
    - PRs #1606 / #1608 / #1609 / #1610 / #1611 quiet since Apr 24 log entry; PR #1542 had a rebase push (updated_at 23:23 UTC) but no new review comments.
  - msf, loc, secure-objects, cmsf, catalog-format, privacy-pass: no activity.
- Implementation repos:
  - **moq-dev/moq**: **PR #1322 MERGED Apr 23 23:26:44 UTC** by [[luke-curley]] — *moq-lite/moq-relay: hop-based clustering* (+961/−979, final diff). Four days after opening on the `hops-port` branch. Single commit landed to `main` as `45db108ab`. `hops-port` branch deleted. A `chore: release` PR #1338 was refreshed by moq-bot at Apr 23 23:42 UTC to pick up version bumps. PR description carries the `🤖 Generated with [Claude Code]` trailer — the largest Claude Code–authored moq-dev `main` merge to date. `cargo-semver-checks` flags this as a breaking change on `moq-lite` and `moq-relay`. PR #1345 (Python examples) unchanged.
  - **cloudflare/moq-rs**: No new activity. PR #165 (Semgrep CI) still open, no reviews. PR #157 (Pub/Sub Namespace) still quiet since Apr 21.
  - **google/quiche (moqt)**: No new moqt-specific commits.
  - **moqtail/moqtail**: PR #168 status comment by @beyzademirr at Apr 23 20:01 UTC formalising the final draft-16 FETCH-object wire format: Serialization Flags varint with subgroup-mode low-2-bits + object_id / group_id / priority / extensions / datagram flags + End-of-Range markers at 0x8C / 0x10C. FETCH objects no longer carry Object Status; zero-length payload = zero-length Normal object. Sum-type API (`enum FetchObject { Object, EndOfRange }` in Rust; TS class + factories). `FetchObjectContext` threaded through serialize/deserialize like `previous_object_id` on subgroups. Client-js / meet / Rust client apps stay source-compatible. +1094/−443 on the overall PR.
  - **video-dev/moq-js**, **birneee/quiche_moq**: Quiet.
- Mailing list: Still no new posts since [[martin-duke]]'s Apr 22 19:41 PDT "Monday's agenda is ready" — two calendar days of silence ahead of the Apr 27 interim.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9).
- Interop runner: **Apr 24 00:35 UTC run = 23 / 68 / 14** — finally up one pass after three days flat at 22/69/14 (Apr 21–23). Matches the Apr 15–16 baseline. The summary report doesn't expose pair-level diffs, but the timing (~1 hour after the hop-clustering merge) is consistent with moq-dev-rs / moq-dev-js docker rebuilds picking up the new cluster plane.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: No open issues (3 closed: #1 OpenMOQ, #2 broken interop links, #3 factual corrections).

**Pages updated**: discussions/discussions-2026-04.md, drafts/moq-transport.md, implementations/moq-dev.md, implementations/moqtail.md, interop/interop-runner.md

**Key findings**:

*moq-dev's biggest main-branch landing in weeks* — PR #1322 had been on the `hops-port` branch since Apr 19 and is a structural rework of moq-relay's cluster plane: the three-tier `primary` / `secondary` / `combined` model and the `cluster: bool` token flag are gone, replaced by a single `OriginProducer` per relay tagged with an `OriginId` and hop chains attached to every Broadcast. `Lite04` Announce changes from `Vec<u64>` to `Vec<OriginId>`; `MAX_HOPS` tightened from 256 to 32; the CLI contracts from three cluster flags to one. `Claims::cluster` is now `#[deprecated]` — existing signed tokens still parse but the flag stops affecting routing. The PR description explicitly marks the local smoke test and browser-publisher interop checks as unchecked on the test plan — the design is wire-compatible, but the new JS `originId` plumbing ships un-smoke-tested. Claude Code authored this PR (the `🤖 Generated with [Claude Code]` trailer at the bottom) — Luke has quietly been shipping more Claude-authored moq-dev PRs, this is the biggest one so far.

*RRID DoS resolution is now a two-path fork* — Before today, Martin Duke's Apr 23 DoS escalation on #1603 had one structural answer: PR #1604 (move Joining FETCH onto the SUBSCRIBE stream so RRID stops multiplying). Alan's PR #1613 opens a second path: **keep RRID, add per-stream flow control** via a `MAX_REQUEST_UPDATES` setup option. Martin's Apr 24 00:42 UTC comment lands at an interesting middle: he accepts the bound argument (authorized-streams × max-per-stream caps the non-contiguous request-ID table) but flags the missing enforcement text ("endpoints have to check the request ID against this theoretical maximum. That's crucial, and a little tricky to write."). The Apr 27 interim now has #1603 + PR #1604 + PR #1613 as a three-way design debate instead of a binary one.

*Joining FETCH fwd=1 precondition may be on the way out* — Alan's casual aside on #1612 ("I wonder if we should just allow fwd=0") is the first suggestion from an editor that the fwd=1-only constraint on Joining FETCH might be relaxed. Paired with Martin's update on PR #1604 clarifying the SUBSCRIBE-kills-FETCH semantics, the precondition and the forward-state-mismatch error path (addressed by PR #1609) are both being rethought together. Expect this to surface in the Apr 27 interim under agenda item 3 (#1604 / #1602).

*Interop matrix finally up-ticks, coincides with hop-clustering* — Three days flat at 22/69/14 broke at the Apr 24 00:35 UTC run (23/68/14), about an hour after the hop-clustering merge. Summary report doesn't expose the pair-level diff, so the causal link is circumstantial — but the timing lines up with a moq-dev-rs / moq-dev-js docker rebuild. The 23/68/14 is now the three-way tie with the Apr 15–16 peak; beating it will require either PR #157 (moq-rs Pub/Sub Namespace) landing, PR #168 (moqtail draft-16 FETCH) landing, or one of the Apr 27 interim decisions translating to wire.

*moqtail FETCH wire format: canonicalized in a PR comment* — @beyzademirr's Apr 23 20:01 UTC comment on PR #168 is effectively the author-side finalization of draft-16 §10.4.4's FETCH Object encoding: the Serialization Flags varint at the head, the low-2-bits subgroup-mode encoding (zero / prior / prior+1 / explicit), the two End-of-Range sentinels (0x8C and 0x10C), dropping Object Status from FETCH, and the sum-type Rust enum / TS class API. It's now on the record in a form that other implementations can cross-check against. PR still needs the rebase push to land.

*Slack is quiet, mailing list is quiet, datatracker is quiet, MoQ Monthly is still at issue #0* — Three days of mailing-list silence before an Apr 27 interim is unusual but not unprecedented; the agenda is set and the editors have moved their design debate into GitHub threads. Slack had one substantive post (Ian Swett's i18n review ask); no one has replied.

---

# 2026-04-23 - moq-transport editor wave: PR #1606 merged, #1608–#1611 opened, RRID DoS concern, Semgrep CI on moq-rs, Python examples on moq-dev

**Operation**: Update
**Sources**:
- Slack: No MCP access this session — skipped.
- GitHub moq-wg repos:
  - **moq-transport**: Heavy Apr 23 UTC burst — largest single-day moq-transport day since the draft-17 publication:
    - **PR #1606 MERGED** Apr 23 18:32 UTC by [[alan-frindell]] (fixes #1581) — *Generalize stream reset codes to all request streams, add new codes, align with PUBLISH_DONE*. First merge to `main` since draft-17 published.
    - **PR #1608 opened** Apr 23 17:01 UTC by [[ian-swett]] (authored by Jules AI, +9/−10) — *Make Subgroup ID identical to first Object Id in the Subgroup*. Fixes #1405, closes #1593. First review comment from [[alan-frindell]] (18:31 UTC) flags the datagram + SG=0 case.
    - **PR #1609 opened** Apr 23 18:41 UTC by [[alan-frindell]] (fixes #1601, +3/−2) — *Joining Fetch forward state mismatch is a request error*. Downgrades session-fatal mismatch caused by REQUEST_UPDATE fwd=1 / joining-FETCH cross-stream race.
    - **PR #1610 opened** Apr 23 18:51 UTC by [[alan-frindell]] (+22/−17) — *Define textual aliases for REQUEST_OK by request type*. Editorial: `REQUEST_UPDATE_OK`, `TRACK_STATUS_OK`, `SUBSCRIBE_NAMESPACE_OK`, `PUBLISH_NAMESPACE_OK`.
    - **PR #1611 opened** Apr 23 18:56 UTC by [[alan-frindell]] (fixes #1598, +11/−30) — *Remove PUBLISH_OK message type, make it a REQUEST_OK alias*. **Wire format change**: removes PUBLISH_OK code point. Author note: retarget main after #1610 lands.
    - **Issue #1612 opened** Apr 23 20:25 UTC by [[martin-duke]] — *"What happens to Joining FETCH if fwd changes to 0?"*. Asks for explicit spec text on this race.
    - **PR #1607** (Largest Available Group filter) — [[suhas-nandakumar]] marked **CHANGES_REQUESTED** Apr 23 15:07 UTC — first hard blocker on the PR since it opened.
    - **PR #1605** (DELIVERY_TIMEOUT split) — [[alan-frindell]] left three Apr 23 18:02 UTC suggestions: explicitly permit retransmission cancellation after delivery timeout; evaluate delivery timeout "as late as possible" after internal queuing (both datagram and subgroup paths).
    - **PR #1586** (delta-encoded Object/Group ID in FETCH) — Apr 23 review by [[alan-frindell]] (ambiguity for mid-group FETCH starts) + [[ian-swett]] suggestion on Group-ID-Delta-present semantics.
    - **Issue #1603** (required-request-id use case) — [[martin-duke]] escalated Apr 23 18:54 UTC with a **DoS concern**: request IDs multiply via REQUEST_UPDATE even within one stream, so a malicious client can inflate state. Concrete proposal: eliminate RRID + Request ID in REQUEST_UPDATE; move Joining FETCH to the SUBSCRIBE stream (per PR #1604); use SWITCH or accept REQUEST_ERROR for ordering. "I have all these aesthetic concerns, but I do want to highlight that there is a DoS vector in here that IMO we must address."
    - **Issue #1578** (Bikeshed: `Largest Object` → `Next Object`) — [[ian-swett]] Apr 23 12:56 UTC: agrees with the rename.
    - **Issue #1534** (REDIRECT) — Apr 23 editor call decision: remove REDIRECT message from PR, overload GOAWAY on bidi stream for the same purpose.
    - **Issue #1476** (DELIVERY_TIMEOUT extension scope) — [[alan-frindell]]: "Victor asks if it's ok to go from zero to non-zero."
  - msf, loc, secure-objects, cmsf, catalog-format, privacy-pass: no activity.
- Implementation repos:
  - **cloudflare/moq-rs**: **PR #165 opened Apr 23 20:47 UTC** by @hrushikeshdeshpande (Cloudflare App&ProdSec) — *ci: add Semgrep OSS scanning workflow*. Part of Cloudflare's migration from Semgrep Pro to Semgrep CE. +30/0. PR #157 (Pub/Sub Namespace) quiet since Apr 21.
  - **moq-dev/moq**: **PR #1345 opened Apr 23 20:39 UTC** by [[luke-curley]] (+108/0) — *py/moq-lite: add clock + announced examples*. Python twin of `rs/moq-clock` (`publish` / `subscribe` subcommands) plus a CLI listing broadcasts announced under a prefix. Fifth PR in the Apr 22–23 burst.
  - **google/quiche (moqt)**: No new moqt-specific commits — Apr 22–23 commits are all general QUIC refactors (`PendingStream` cleanup) outside the moqt directory.
  - **moqtail/moqtail**: PR #168 (draft-16 fetch object) — @ctllmp pushed conflict-resolution commits Apr 23 19:49–19:56 UTC and merged `draft-16` back into the feature branch. Rebase work ahead of a push to land; no new substantive changes. PR #169 (message-parameters fix) remains open.
  - **video-dev/moq-js**: Quiet.
  - **birneee/quiche_moq**: Quiet.
- Mailing list: No new posts since Martin Duke's Apr 22 19:41 PDT "Monday's agenda is ready" notice.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9).
- Interop runner: No new run for Apr 24 at time of check — last run Apr 23 00:35 UTC = 22/69/14.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: No open issues.

**Pages updated**: discussions/discussions-2026-04.md, drafts/moq-transport.md, implementations/moq-dev.md, implementations/moq-rs.md, implementations/moqtail.md, interop/interop-runner.md

**Key findings**:

*moq-transport editor push ahead of Apr 27 interim* — Apr 23 was the largest single-day moq-transport activity day since draft-17 published. The shape of the Apr 27 editor session is now clear: six PRs (#1605, #1607, #1608, #1609, #1610, #1611) and one heavyweight design issue (#1603 required-request-id). PR #1606 landing as the first post-draft-17 merge signals the editors are comfortable landing uncontroversial cleanup while the big design calls wait for the interim. Three Apr 23 PRs (#1609, #1610, #1611) all come from Alan Frindell in the same 15-minute window — a cleanup sweep of REQUEST_OK naming, PUBLISH_OK wire-format removal, and the Joining-FETCH session-error downgrade. PR #1608 is essentially Ian Swett's inline suggestion from PR #1607 promoted to its own PR, retiring the long-running #1405 Subgroup-ID ambiguity and closing #1593. Suhas's CHANGES_REQUESTED on PR #1607 is notable because it's the first formal block on the Largest-Available-Group filter since Vasiliev opened it — until now the review energy had been mostly Luke's partial-cache pushback and Ian's Subgroup-ID clarification.

*Martin Duke's RRID DoS escalation (Issue #1603)* — Issue #1603 has been lingering since Apr 10. Apr 23 it sharpened into a security argument: request IDs can multiply within a single stream via REQUEST_UPDATE, so the QUIC max-bidi-stream bound (Alan's mitigation) doesn't actually cap receiver state. Martin's concrete proposal is now on the record: eliminate RRID except where dependencies are real (REQUEST_UPDATE, FETCH); move Joining FETCH onto the SUBSCRIBE stream; use SWITCH or accept REQUEST_ERROR for ordering. This is likely to be the spiciest item on the Apr 27 agenda.

*Editor call results bleed through in issue threads* — Comments like "Discussed in author/editor call" (PR #1534) and "Victor asks..." (Issue #1476) suggest an Apr 23 editor call happened in US hours before the PR burst. The call's two visible outcomes: REDIRECT moves onto GOAWAY rather than getting its own message; DELIVERY_TIMEOUT zero→non-zero transitions are still an open question.

*Semgrep CI scanning appears on moq-rs (PR #165)* — Not MoQ-specific content, but a signal that Cloudflare's App&ProdSec team is including cloudflare/moq-rs in their migration to Semgrep CE. The repo hadn't had third-party security-tooling contributions before. No new push from Suhas on PR #157 this cycle.

*moq-dev's Python surface widens (PR #1345)* — Luke's Apr 23 PR adds `clock.py` and `announced.py` as `py/moq-lite` examples. Combined with Lullabee's Apr 16 PR #1318 (raw track Python FFI), the Python binding is approaching functional parity with the Rust examples. This is the fifth consecutive PR in Luke's Apr 22–23 push; a pattern of stabilizing `main` ahead of closing #1322 (hop-clustering) and promoting the MSF-vs-Hang catalog negotiation work.

*Interop matrix still idle* — Three straight days at 22/69/14 (Apr 21 recovered 18→20→22, then two flat days). Nothing landed Apr 23 that would touch the wire — moq-rs PR #157 is still open; moqtail PR #168 is still rebasing; all the moq-transport action was spec-level PRs. Expect movement once PR #157 merges, PR #168/#169 lands, or the Apr 27 interim unblocks any of the DELIVERY_TIMEOUT / REDIRECT / Subgroup-ID design items.

---

# 2026-04-23 - MSF InitTracks reverted, Luke opens group-alignment issue, Apr 27 agenda published, moq-dev PR burst, interop flat

**Operation**: Update
**Sources**:
- Slack: No MCP access this session — skipped.
- GitHub moq-wg repos:
  - **msf**: **PR #154 merged Apr 22 17:01 UTC** by [[will-law]] — **Revert "Add support for InitTracks"** (−170 lines). After feedback from [[victor-vasiliev|Victor Vasiliev]], [[luke-curley]], and [[suhas-nandakumar]], Will decided the merged InitTracks design did not provide a practical solution for mid-stream parameter changes; MSF will stick with statically declared inits, leveraging AVC3 self-initializing segments (ISO/IEC 14496-15) for mid-stream changes. Follow-up discussion on catalog bloat: Will proposes `initCopy` or `inherit` track properties; Vasiliev asks if [#144 zlib compression](https://github.com/moq-wg/msf/issues/144) could solve it; Luke argues two tracks shouldn't have identical init data if publisher is demuxing correctly.
  - **msf**: **Issue #155 opened Apr 22 22:47 UTC** by [[luke-curley]] — *"Sequence aligned groups are too restrictive"*. Argues MSF §4.2 currently mandates group alignment across tracks and lists four concrete problems (audio buffering forced to video keyframe boundaries, on-demand encoding of late renditions, mixed GoP sizes across renditions, transcoding non-source renditions). Proposes MSF require shared PTS but loosen group alignment; CMSF can keep alignment for HLS/DASH compat.
  - **moq-transport**: **PR #1606 APPROVED by [[ian-swett]]** on Apr 23 01:20 UTC (stream reset codes generalization). **PR #1605** first review by Ian at 01:55–02:10 UTC — overall "looks reasonable but not sure two timeouts are necessary" + 6 line suggestions on MUST/SHOULD/MAY tuning, section rename, WebTransport datagram queue citation. **PR #1607** inline comment by Ian at 01:29 UTC — proposes forcing Subgroup ID = Object ID of first Object in a subgroup (cross-linked to issue [#1405](https://github.com/moq-wg/moq-transport/issues/1405)) to disambiguate subgroup start with "largest Object" / range filters.
  - loc, secure-objects, cmsf, catalog-format, privacy-pass: no activity.
- Implementation repos:
  - **moq-dev/moq**: Four-PR burst by [[luke-curley]] (Apr 22 16:51 UTC – Apr 23 01:12 UTC):
    - **PR #1339** (merged Apr 22 16:51 UTC, +5/−5) — bump JS patch versions to publish `recvGroup`; fixes the broken `@moq/lite@0.2.1` on NPM that predated the Apr 17 `recvGroup` API.
    - **PR #1340** (open, Apr 22 17:16 UTC, +182/−5) — `OriginConsumer::wait_for_broadcast; deprecate consume_broadcast`. Synchronous `consume_broadcast` is a footgun on freshly-connected origins; moq-gst's source hit this.
    - **PR #1341** (open, Apr 23 00:01 UTC, +748/−1145) — refactor media producers, simplify fMP4 CMAF passthrough; rename `moq_mux::import` → `moq_mux::producer`, remove `Fmp4Config` passthrough flag.
    - **PR #1343** (open, Apr 23 00:24 UTC, +226/−37) — relay subdomain-based slug routing; `--auth-domain`/`MOQ_AUTH_DOMAIN` maps `<slug>.<suffix>` hosts into path-based routing.
    - **PR #1344** (merged Apr 23 01:12 UTC, +31/−0) — catalog-format configuration docs for `@moq/watch`.
    - **Issue #1342** (Apr 23 00:08 UTC) — *"Raw QUIC doesn't support paths"*: no PATH SETUP param, only WebTransport works with path-based auth today.
  - **cloudflare/moq-rs**: No activity since Apr 21 PR #157 push.
  - **google/quiche (moqt)**: No new moqt commits since Apr 22 `10045277` (session-parameter API).
  - **moqtail/moqtail**: New Issue #177 opened Apr 22 11:08 UTC by @danrossi — Letsencrypt SSL setup docs suggestion. PR #169 (message-parameters fix, +900/−565) still open. Otherwise quiet.
  - **video-dev/moq-js**: Quiet.
  - **birneee/quiche_moq**: Quiet.
- Mailing list: One new post — **[[martin-duke]] Apr 22 19:41 PDT**: *"Monday's agenda is ready"* → points at datatracker [agenda-interim-2026-moq-14](https://datatracker.ietf.org/doc/agenda-interim-2026-moq-14-moq-01/) for the Apr 27 16:30 UTC session. "It's all editor time."
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9). New Apr 27 interim agenda published (PR #1542/#1586/#1605/#1603/#1604/#1602 + Message Parameters discussion).
- Interop runner: **Apr 23 00:35 UTC run — 22 / 69 / 14** — flat vs Apr 22 (third day of the same pass count after the Apr 21–22 two-day recovery). 1-test gap to the Apr 16 baseline remains.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: No open issues.

**Pages updated**: discussions/discussions-2026-04.md, discussions/interim-meetings.md, drafts/moq-msf.md, drafts/moq-transport.md, implementations/moq-dev.md, interop/interop-runner.md

**Key findings**:

*MSF InitTracks reverted (Apr 22)* — Six days of debate on msf#153 resolved decisively: Will Law reverted his own PR #141 rather than land a partial fix. The consensus that formed between Vasiliev's original "remove `initTrack`", Luke's Apr 21 "I'd rather just use annexb", and Suhas's in-band SPS/PPS practice is now encoded as "statically declared inits only; AVC3 self-init segments for mid-stream changes". The open design question has shifted from *how to synchronize dynamic init updates* to *how to reduce the catalog bloat from repeated `initData` across renditions* — Will's proposed `initCopy`/`inherit` properties vs Vasiliev's proposed zlib compression (#144). Luke's stance is that a correctly-built demuxer won't produce duplicate init data in the first place, so `initCopy` is mostly a demuxer-passthrough affordance.

*Luke's msf#155 challenges §4.2 group alignment* — Opened hours after the #153 revert. The framing ("Sequence aligned groups are too restrictive") targets a specific piece of MSF-00 §4.2 text (equal-numbered Groups must have overlapping render-duration). Luke's four arguments target different pipeline shapes: live encoding (audio flush latency tied to video keyframes), on-demand rendition lift-in, mixed GoP-size ladders (fast-join 1s / efficient 4k 4s), and OBS→Twitch transmux where source keyframe cadence is externally controlled. The proposed split — strict PTS alignment, loose group alignment in MSF; strict group alignment only in CMSF for HLS/DASH back-compat — is a substantive design proposal, not a typo-level nit. Expect discussion on the Apr 27 interim or via the `#moq` channel.

*Ian Swett review wave (Apr 23 01:20–02:10 UTC)* — Three open moq-transport PRs reviewed in ~50 minutes, ahead of the Apr 27 interim that has all three on the agenda:
- **#1606 APPROVED** — error-code generalization is straightforward and now ready to merge.
- **#1605** — the DELIVERY_TIMEOUT split got its first real review. Ian's "don't intuitively understand why two timeouts are necessary" is the key question the editors will likely take up on Monday.
- **#1607** — Ian's "force Subgroup ID = first Object ID" observation is the kind of design simplification that could land as a separate PR bolted onto the Largest-Available-Group filter work. Cross-posted to issue #1405 (which is the long-standing "Single Object Subgroups don't need a Subgroup ID" item).

*moq-dev spec cleanup push (Apr 22–23)* — Luke's four PRs are all small/medium in scope (producer refactor is the largest at +748/−1145) but they read as a push to stabilize `main` ahead of (a) closing out hop-clustering #1322 and (b) promoting the MSF-vs-Hang catalog negotiation work landed Apr 19–20 (#1330). The `wait_for_broadcast` API is a direct fix for a footgun reported by moq-gst; the subdomain routing PR gives operators a cleaner customer-isolation story on multi-tenant relays.

*Interop flat at 22/69/14* — Three days of the same number. Apr 22–23 didn't include landed implementation fixes that would touch the matrix (the moq-dev PRs are docs/refactors; moq-rs PR #157 is still open; quiche moqt just got a session-parameter API that doesn't change wire format). Expect movement again once PR #157 lands or moqtail PR #169 merges.

---

# 2026-04-22 - moq-rs datagram rate restored, quiche session-parameter API, moqtail timeout fix, interop +2 again

**Operation**: Update
**Sources**:
- Slack: No MCP access this session — skipped.
- GitHub moq-wg repos: Only activity — two comments from [[luke-curley]] on [msf#153](https://github.com/moq-wg/msf/issues/153) (Apr 21 16:21/16:26 UTC) reopening the static-init / annexb simplification path for `initTrack`. No new issues/PRs on moq-transport, msf (besides the comments), loc, secure-objects, cmsf, catalog-format, privacy-pass. PR #1607 quiet since Apr 20.
- Implementation repos:
  - **cloudflare/moq-rs**: [[suhas-nandakumar]] pushed **five more commits** to PR #157 on Apr 21 06:39–08:46 UTC, follow-up to the 03:13–05:30 UTC debug run in yesterday's log. Fixes on the forwarding path (track_extensions propagation, stream header type mismatch, datagram broadcast-channel queueing, **datagram rate restored 1/sec → 50/sec**, SUBSCRIBE-flow object encoding).
  - **google/quiche (moqt)**: Two Apr 22 commits by [[martin-duke]] — `c8ff6dc4` (03:59 UTC) moves non-message data structures out of `moqt_messages.h`; `10045277` (04:16 UTC) lets `MoqtClient`/`MoqtServer` control session parameters (groundwork for partial-object delivery).
  - **moqtail/moqtail**: PR #175 merged Apr 21 06:17 UTC by [[zafergurel]](https://github.com/zafergurel) — subscription inactivity timeout raised **1s → 5s** for congested links (+47/−42). New Issue #176 opened Apr 21 17:42 UTC — *"Implement the scheduling algorithm (Draft 16 Section 7.2)"* — relay currently does not honor message priorities.
  - **video-dev/moq-js**: PR #70 still open, no new activity since Apr 20 18:55 UTC.
  - **moq-dev/moq**: Quiet Apr 21 (PRs #1322, #1330, #1335, #1338 unchanged; #1330 and #1335 were in fact merged earlier on Apr 20 — status carried forward correctly in tree).
  - **birneee/quiche_moq**: Quiet.
- Mailing list: No new messages since Apr 19 weekly digest.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9).
- Interop runner: Apr 22 00:30 UTC run at **22 / 69 / 14** — **second consecutive +2 pass** (Apr 20 18/73/14 → Apr 21 20/71/14 → Apr 22 22/69/14). Now just 1 short of the Apr 16 baseline.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: No open issues, none updated since Apr 21.

**Pages updated**: discussions/discussions-2026-04.md, drafts/moq-msf.md, implementations/moq-rs.md, implementations/moqtail.md, implementations/quiche-moq.md, interop/interop-runner.md, index.md

**Key findings**:

*cloudflare/moq-rs PR #157 — forwarding-path repair (Apr 21 morning UTC)* — After the lifecycle fixes in the 03:13–05:30 UTC session, Suhas ran a second batch between 06:39 and 08:46 UTC focused on the relay's forwarding path:
- `7f95515` — Forward `track_extensions` through PUBLISH messages so extensions survive relay hops.
- `4e33675` — Fix stream header type mismatch when forwarding objects that have no extensions.
- `0112f91` — Move datagram forwarding onto a broadcast channel so per-subscriber queues drain correctly.
- `1148fa1` — **Fix datagram forwarding rate from 1/sec back to 50/sec** (a regression in the earlier refactor that had serialized datagram delivery).
- `5c0606d` — Fix object encoding in the SUBSCRIBE flow to match the header type.

The 50/sec vs 1/sec restoration is the most visible change — it directly affects interop pairs that exercise datagram-mode delivery.

*Luke on msf#153 `initTrack` — push toward static-only init or annexb (Apr 21)* — Two comments. The first (16:21 UTC) accepts Vasiliev's race framing but proposes a generic in-band fix using MP4 `track_id` switching: a `moof` referencing an unknown `track_id` blocks the player until the matching `moov` arrives, and the new init can carry both old and new `track_id` entries briefly for new subscribers. The second (16:26 UTC) is the stronger opinion — he'd rather use **annexb** and drop dynamic init segments entirely, and is fine reverting `initTrack` if init data (and codec mime) are made static with inline fallback. This reopens the static-init simplification path alongside Will Law's `inits[]` proposal and Vasiliev's original remove-`initTrack` stance.

*google/quiche session parameters (Apr 22)* — Martin Duke's `10045277` commit adds an API letting applications control MoQT session parameters on both client and server. Commit message specifically cites *partial-object delivery on the relay* as the motivating use case, which ties directly into the partial-cache debate Luke opened on moq-transport PR #1607 on Apr 19.

*moqtail subscription timeout fix (Apr 21)* — Zafer Gürel's PR #175 raises the no-event subscription termination window from **1 second to 5 seconds** because congested links were producing spurious terminations. Combined with the new Issue #176 acknowledging the relay doesn't yet implement draft-16 §7.2 scheduling (subscribe/publish priorities), this is part of the broader robustness push in moqtail's draft-16 migration.

*Interop runner continues to climb* — Three daily runs now: 18/73/14 (Apr 20) → 20/71/14 (Apr 21) → 22/69/14 (Apr 22). Two consecutive +2-pass recoveries after four days stuck at the Apr 17 regression floor. Likely drivers: moqtail PR #175's timeout fix (less spurious termination on congested pair tests) and Suhas's datagram-rate restoration on moq-rs.

---

# 2026-04-21 - Suhas iterates on moq-rs Pub/Sub Namespace PR, moq-js lifecycle fix, interop partial recovery

**Operation**: Update
**Sources**:
- Slack: No MCP access this session — skipped
- GitHub moq-wg repos: Only activity — [[victor-vasiliev|Victor Vasiliev]]'s PR #1607 (Largest Available Group filter) got two typo review comments from Aman Sharma (@sharmafb) on Apr 20 23:14–23:33 UTC (draft text `available`/`Available` casing). No new issues/PRs on moq-transport, msf, loc, secure-objects, cmsf, catalog-format.
- Implementation repos:
  - **cloudflare/moq-rs**: [[suhas-nandakumar]] pushed **9 commits** to PR #157 between 03:13 and 05:30 UTC on Apr 21 — lifecycle/cleanup fixes for SUBSCRIBE_NAMESPACE and PUBLISH_NAMESPACE flows (self-exclusion, wait for PUBLISH_OK, stale namespace on reconnect, handle lifetime). PR now at +6270/−2083 across 82 files.
  - **video-dev/moq-js**: New PR #70 by Manish (@itzmanish, Apr 20 18:55 UTC) — *"fix: moq-js player lifecycle and browser audio playback"* (+9542/−6440). Substantive playback rework; bulk of diff is deletion of legacy `web/` blog site.
  - moq-dev/moq, google/quiche (moqt), moqtail/moqtail, birneee/quiche_moq: quiet since Apr 20 covered in previous log entry.
- Mailing list: No new messages since Apr 19 weekly digest.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9).
- Interop runner: Apr 21 00:33 UTC run at **20 / 71 / 14** — **first partial recovery** (+2 pass, −2 fail) after four consecutive days flat at the 18/73/14 regression floor since Apr 17. Still 3 short of Apr 16 baseline.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: All 3 closed, no new issues.

**Pages updated**: discussions/discussions-2026-04.md, implementations/moq-rs.md, implementations/moq-js.md, interop/interop-runner.md, index.md

**Key findings**:

*cloudflare/moq-rs PR #157 late-night iteration (Apr 21 03:13–05:30 UTC)* — Suhas ran a focused debugging session on the SUBSCRIBE_NAMESPACE / PUBLISH_NAMESPACE relay flow that sits on top of Manish's draft-16 migration branch. Nine commits in ~2 hours:
- `c8cb923` `REQUEST_UPDATE` with `forward=1` when a subscriber arrives for a paused track.
- `12ac6bf` `PublishNamespace` handle lifetime + stale-track cleanup.
- `54a3557` Remove stale namespace entry on publisher reconnect.
- `cd0bdcd` Keep `PublishNamespace` handles alive in `serve_subscribe_namespace`.
- `a29815e` Send `NAMESPACE` (not `PUBLISH`) on `SUBSCRIBE_NAMESPACE`.
- `43b5665` Wait for `PUBLISH_OK` before streaming.
- `4dcaa7a` Self-exclusion on `SUBSCRIBE_NAMESPACE` (mirrors PR #1596 in the spec).
- `fbefe1d` Send `PUBLISH` for existing tracks on `SUBSCRIBE_NAMESPACE`.
- `eddc7bc` Only `PUBLISH` for tracks, not `PUBLISH_NAMESPACE`.

The PR as a whole bundles: draft-16 migration (subsumes PR #131), a new relay `subscriber_registry`, preserved subgroup-header forwarding (EndOfGroup fix), a fix for a 1-second freeze on group transitions, and `web-transport` crate v0.10 with subprotocol negotiation.

*video-dev/moq-js PR #70 (Apr 20 18:55 UTC)* — First substantive moq-js PR since Ali Begen's mid-April UI work. The real code changes are concentrated in `lib/playback/worker/audio.ts` (+137/−9), `lib/video-moq/index.ts`, `lib/playback/worker/{index,timeline,video}.ts`, and `lib/transport/subscriber.ts`. Most of the +9542/−6440 volume is deleting the legacy `web/` blog pages (quic-powers, replacing-hls-dash, never-use-datagrams, etc.) and bundling a fresh `demo/lib/publish.iife.js` (+9066).

*Interop runner partial recovery* — 20/71/14 is the first movement after four days stuck at 18/73/14. Coincides with continued draft-16 fixes in [[moqtail]] and [[moq-dev]] plus active iteration on the [[moq-rs]] SUBSCRIBE_NAMESPACE flow. Pair-level diff still needed to identify which two tests flipped back to pass.

*PR #1607 — typo-only activity*: Aman Sharma's two inline comments are the only moq-wg repo activity in this 24-hour window. No substantive movement on the partial-cache debate Luke opened on Apr 19.

---

# 2026-04-20 - moq-dev burst (hop-clustering, MSF catalog), PR #1607 review, quiche cleanup

**Operation**: Update
**Sources**:
- Slack: No MCP access this session — skipped
- GitHub moq-wg repos: PR #1607 saw its first substantive review on Apr 19 (Luke Curley). No new issues/PRs on moq-transport, msf, loc, secure-objects, cmsf, catalog-format.
- Implementation repos:
  - **moq-dev/moq** very active: PR #1322 (hop-based clustering refactor, open), #1330 (MSF catalog auto-negotiation, open), #1335 (WebSocket fallback tuning, open); merged #1332 (DNS bind), #1331 (fly.toml), #1333 (flake.lock), #1284 (crate READMEs), #1336/#1337 (Nix crane downgrade, Apr 20), #1321/#1334 (release bumps).
  - **google/quiche**: Apr 20 commit `9843feb` by [[martin-duke]] removing `moqt::SubscribeWindow`.
  - cloudflare/moq-rs, video-dev/moq-js, moqtail/moqtail, birneee/quiche_moq: quiet.
- Mailing list: Apr 19 automated "Weekly github digest" from Repository Activity Summary Bot; Apr 20 quiet.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9).
- Interop runner: Apr 20 run still at **18 / 73 / 14** across 105 tests — unchanged since the Apr 17 regression (now three consecutive daily runs at the same numbers).

**Pages updated**: discussions/discussions-2026-04.md, drafts/moq-transport.md, implementations/moq-dev.md, implementations/quiche-moq.md, interop/interop-runner.md, index.md

**Key findings**:

*moq-dev/moq burst of activity (Apr 19–20)* — Luke opened three substantive PRs in rapid succession:
- **#1322 (hop-based clustering)**: Replaces the three-tier `primary`/`secondary`/`combined` origin model and the `cluster: bool` token flag with a single `OriginProducer` per relay tagged by a stable `OriginId`. Broadcasts now carry `hops: Vec<OriginId>` for loop detection and shortest-path routing. `MAX_HOPS` tightened 256 → 32. CLI collapses into `--cluster-connect` for full-mesh config. `Claims::cluster` is now `#[deprecated]`. Flagged by `cargo-semver-checks` as a **breaking change** on `moq-lite` and `moq-relay` (+857/-900).
- **#1330 (MSF catalog)**: Adds a `@moq/msf` package and race-based Hang/MSF auto-negotiation in `<moq-watch>` — Hang gets a 100ms head start, then `Promise.any()` picks the first successful fetch. Concrete step toward MSF being a first-class catalog format in Luke's stack.
- **#1335**: WebSocket fallback head start 200 → 500 ms, with a synchronous bail-out when WebTransport has already won.
- Plus merged infra work: DNS-in-bind (#1332), Fly.io docker image (#1331), Nix toolchain alignment (#1336/#1337), crate READMEs (#1284).

*PR #1607 has live sub-debate on "partial cache / partial group"*:
- [[luke-curley]] reviewed Vasiliev's "Largest Available Group" filter PR on Apr 19 and pushed back: *"The MUST is too strong and requiring a full cache is too narrow."* Counter-proposal: `MAY attempt to reconstruct subscription from a partial cache; MUST NOT serve an object until all prior objects in that sub-group have been served`.
- Convergence on the overall filter shape continues, but partial-cache handling is still being negotiated.

*google/quiche*: Martin Duke removed `moqt::SubscribeWindow` (Apr 20) — continues the cleanup of legacy SUBSCRIBE window tracking as draft-17's PUBLISH/SUBSCRIBE model settles.

*Interop runner*: Three consecutive daily runs (Apr 18, 19, 20) all at 18/73/14. Pair-level investigation of the Apr 17 regression still pending.

---

# 2026-04-19 - Gwendal Simon dissents on REWIND consensus, interop still at 18/73/14

**Operation**: Update
**Sources**:
- Slack: No MCP access this session — skipped
- GitHub moq-wg repos (moq-transport, msf, loc, secure-objects, cmsf, catalog-format): no new issues or PRs since the Apr 18 update. PR #1607 (Largest Available Group filter) remains the most recent activity.
- Implementation repos: moq-dev/moq had only a release bot PR #1321 (Apr 18); no new commits since Apr 17. cloudflare/moq-rs, video-dev/moq-js, moqtail, google/quiche MoQT, birneee/quiche_moq all quiet in this window.
- Mailing list: One new message — **Gwendal Simon's reply** to the REWIND consensus thread ([msg](https://mailarchive.ietf.org/arch/msg/moq/1DoFuRdZDWMVXb9e7AXxpgR_EZ8/), Apr 18) — not covered in the Apr 18 update.
- IETF Datatracker: No new WG or individual draft versions since Apr 9 (moq-lite-04).
- Interop runner: Apr 19 00:32 UTC run still at **18 / 73 / 14** — unchanged since the Apr 17 regression.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: All 3 closed, no new issues.

**Pages updated**: concepts/joining-fetch-dissent.md, concepts/switch-abr.md, discussions/discussions-2026-04.md, interop/interop-runner.md, index.md

**Key findings**:

*Gwendal Simon's dissent on REWIND consensus (Apr 18, mailing list)*:
- Pushes back on the Alan/Luke/Victor convergence around a narrow LargestGroup/CurrentGroup/CurrentGroupFill filter (documented in the Apr 18 log entry).
- **Charter argument**: ABR track switching is an explicit MoQ charter deliverable; dismissing it as "innovation for extensions or V2" contradicts the charter.
- **Not an edge case**: A subscriber is "almost always behind the live edge" during a switch because congestion and intentional buffering both create lag.
- **CurrentGroup is insufficient**: It covers *joining* in one group, but ABR switching requires "an arbitrary range of past groups."
- **Real blocker is semantic, not HOL**: The V1 constraint he wants the WG to reconsider is that **past objects are not allowed in a PUBLISH stream**.
- **Proposed path**: "Joining PUBLISH with live semantics" — already prototyped in PR #1378 (SWITCH).
- This is currently the only documented dissent on the LargestGroup convergence. Consensus call closes May 1, 2026.

*Everything else is quiet*: this is a settle-down day after the heavy Apr 16–18 activity. moq-wg repos had zero new issues/PRs, implementation repos had only release bots, and no new drafts appeared. Interop runner is still at the Apr 17 regression baseline (18/73/14) with no recovery yet.

---

# 2026-04-18 - LargestGroup/CurrentGroup filter convergence (PR #1607)

**Operation**: Update
**Sources**:
- Slack #moq / #moq-rs / #moq-js / #libquicr: nothing new since 2026-04-17 evening update
- GitHub moq-wg repos: **PR #1607 (vasilvv, Apr 18)** — new Draft/RFC "Largest Available Group filter"; nothing else new
- Mailing list: four new replies in "Consensus call on way forward on REWIND" thread ([[luke-curley]] Apr 17 and Apr 18, [[victor-vasiliev|Victor Vasiliev]] Apr 18, [[alan-frindell]] Apr 18) all coalescing around a LargestGroup / CurrentGroup filter
- Implementation repos: moq-dev/moq merged PR #1327 (Luke, Apr 17 23:48 UTC) — fix TrackConsumer::read_frame respect start_at — and PR #1318 (Lullabee, Apr 17 23:39 UTC) — add JSON data to py_lib
- IETF Datatracker: no new WG or individual draft versions

**Pages updated**: concepts/joining-fetch-dissent.md, discussions/discussions-2026-04.md, drafts/moq-transport.md, index.md

**Key findings**:

*REWIND consensus thread converging on LargestGroup / CurrentGroup filter (Apr 17–18)*:
- **Luke Curley, Apr 17**: argues FETCH is inherently HOL-prone; proposes **LargestGroup filter for SUBSCRIBE** to cover 99% of the join-live case.
- **Luke Curley, Apr 18**: "Yeah, I just want to adopt CurrentGroup so we can make *some* progress."
- **Victor Vasiliev, Apr 18**: "Not against the LargestGroup idea." Turns it into concrete **PR #1607** — current group only, always complete group, no relay backfill, "probably really easy to implement."
- **Alan Frindell, Apr 18**: does not object; has drafted a parallel "CurrentGroupFill" PR in his own fork.
- Practical direction: drop REWIND for v1; land a narrow SUBSCRIBE filter instead.

*moq-transport PR #1607 — Largest Available Group filter (new, vasilvv, Apr 18)*: Draft/RFC. Sits alongside afrind/moq-transport#15 CurrentGroupFill and Luke's LargestGroup as three shapes of the same minimal filter direction.

*moq-dev/moq late Apr 17*: Luke merged PR #1327 fixing TrackConsumer::read_frame to respect start_at. Lullabee merged PR #1318 adding JSON data support to py_lib.

---

# 2026-04-17 (evening) - Supplemental: moqlivemock mlmtest, moqxr v0.2.1, Alan's REWIND reply

**Operation**: Update
**Sources**:
- Slack #moq (via MCP): new messages since morning update (Torbjörn on mlmtest PR #63, Paul Gregoire on moqxr v0.2.1, yuyou on moq-dev-rs v17 build, Torbjörn's Apr 12 moqlivemock dual-draft update)
- GitHub moq-wg repos: minor churn only — PR #1378 SWITCH got new gwendalsimon review comments Apr 17
- Implementation repos: cloudflare/moq-rs (release v0.7.17 on Apr 13), moq-dev/moq (heavy Apr 16-17 activity), video-dev/moq-js (Ali Begen UI work Apr 13-17), Quicr/libquicr (PUBLISH_OK filter), google/quiche (Apr 14-16 fixes), mondain/moqxr (v0.2.0 Apr 15, v0.2.1 Apr 17)
- Mailing list: Alan Frindell's Apr 17 reply on REWIND consensus call (backs Option 1)

**Pages updated**: discussions/discussions-2026-04.md, drafts/moq-transport.md, concepts/joining-fetch-dissent.md, implementations/openmoq.md, interop/interop-runner.md

**Key findings**:

*Alan Frindell on REWIND consensus (Apr 17)*: Backs **Option 1 — no action**. Argues FILL_TIMEOUT=0 (PR #1490, merged Apr 14) already removes the HOL-blocking scenarios REWIND was designed to fix. Recommends "stabilise around the core."

*moqlivemock / Eyevinn stack update (Apr 12 + Apr 17)*: Torbjörn posted a substantial update — dual draft-14/16 auto-negotiation; new namespaces `cmsf/clear`, `cmsf/drm-cbcs`, `cmsf/ecpp-cbcs`; iOS Safari 26.4 via managed source buffers + EME. Interop-runner PR #63 opened Apr 12, updated Apr 17, adds `mlmtest` component as a runner client.

*moqxr v0.2.0 + v0.2.1 releases (Apr 15 + Apr 17, Paul Gregoire / rwl4)*: Brings moqxr to working draft-16 base. v0.2.0 fixed SUBSCRIBE KVP parser, dropped WebTransport subprotocol for draft-14, unblocked unknown-control-message handling. v0.2.1 is additional draft-16 interop fixes.

---

# 2026-04-17 (late) - Supplemental: Luke Curley MoQ Boy demo

**Operation**: Update
**Sources**:
- Mailing list: "[Moq] MoQ Boy" by Luke Curley (2026-04-17)
- Blog: moq.dev/blog/moq-boy/

**Key findings**: Game Boy emulator demo streaming via MOQT. Showcases SUBSCRIBE_NAMESPACE as a flow-control + discovery primitive: encoding/emulation pauses when no active SUBSCRIBE for a track; player auto-unsubscribes invisible/muted tracks; bidirectional emulator↔player namespace publishing with per-viewer authorization. Timely given PR #1542 (SUBSCRIBE_NAMESPACE split) and PR #1562 (`.session` reserved namespace, merged Apr 16).

**Pages updated**: discussions/discussions-2026-04.md, people/luke-curley.md

---

# 2026-04-17 - Wiki update: REWIND consensus call, Session-Level Tracks merged, interop regression

**Operation**: Update
**Sources**:
- Slack #moq: No new messages (Endel joined #moq, #moq-rs, #moq-js on Apr 16 — no substantive posts)
- GitHub: moq-transport — PR #1562 (Session-Level Tracks) + PR #1596 (own-track filter) MERGED Apr 16; new PR #1606 (stream reset codes); PR #1542 (SUBSCRIBE_NAMESPACE split) reworked; PR #1378 SWITCH polish; PR #1604 new Gwendal Simon comment
- GitHub: moq-wg/loc — Issue #10 new Alan Frindell comment (loc-02 also has collisions)
- GitHub: moq-dev/moq — 10+ PRs merged Apr 16–17 (broadcast backup queue, auth refactor, --cert/--key split, moq-boy games, landing page)
- GitHub: moqtail — 2 draft-16 cleanup PRs merged (REQUEST_ERROR unification, publish hack removal); PR #169 open
- GitHub: cloudflare/moq-rs, video-dev/moq-js, birneee/quiche_moq — no new activity
- GitHub: google/quiche — 1 MoQT commit (cancel subgroups on STOP_SENDING)
- Mailing list: 2 new threads (REWIND consensus call + interim-13 minutes) from Magnus Westerlund
- IETF Datatracker: No new WG draft versions; no new individual drafts
- Interop runner: **Regression** to 18/73/14 (from 23/68/14) in Apr 17 00:32 UTC run
- MoQ Monthly: Still only #0 (March 4). No #1 yet.
- tobbee/moq-llm-wiki: No new issues (all 3 existing closed)

**Pages updated**: discussions-2026-04.md, moq-transport.md, joining-fetch.md, moq-dev.md, moqtail.md, interop-runner.md, index.md

**Key findings**:

### Spec activity
- **PR #1562 MERGED (Apr 16)**: Session-Level Tracks — reserves `.session` namespace tuple[0] for transport-internal tracks. Relays MUST NOT forward; unrecognized tracks MUST be rejected with NOT_SUPPORTED. IANA registry established under Specification Required policy. Useful for extending transport via existing sub/obj machinery (referenced by #1507).
- **PR #1596 MERGED (Apr 16)**: Exclude your own tracks from SUBSCRIBE_NAMESPACE (4-line fix for #1585).
- **PR #1606 NEW (Apr 16)**: Alan Frindell generalizes stream reset codes to all request streams. Adds GOING_AWAY (0x4), EXPIRED_AUTH_TOKEN (0x7), SESSION_CLOSED. Renumbers UNKNOWN_OBJECT_STATUS 0x4→0x6. Aligns TOO_FAR_BEHIND at 0x5 and EXPIRED at 0x6 in PUBLISH_DONE. Fixes #1581.
- **PR #1542 reworked (Apr 16)**: Split into SUBSCRIBE_NAMESPACE (0x50, namespace discovery) + SUBSCRIBE_TRACKS (0x51, track subscriptions). Removes SUBSCRIBE_NAMESPACE_OPTIONS and BOTH mode entirely — behavior now determined by message type. Adds TRACK_NAMESPACE_PREFIX (0x34) for REQUEST_UPDATE prefix changes. Fixes #1458.
- **PR #1604 (Apr 16)**: Gwendal Simon explicitly connects #1604 and SWITCH #1378 — same catch-up-on-PUBLISH-bidi pattern; difference is subscriber- vs relay-initiated.
- **PR #1378 (Apr 16)**: Continued prose polish — consistent terminology, trimmed redundant sections, clearer failure flow.

### Mailing list
- **REWIND consensus call (Apr 16)**: Magnus Westerlund opened formal three-way vote. Options: (1) no action until MOQT published, (2) adopt as extension, (3) basis for PR to merge. Deadline **May 1, 2026**. Follows interim-13 decision to keep REWIND as separate experimental extension.
- **Interim-13 minutes (Apr 16)**: Luke Curley + Victor Vasiliev worried REWIND's cache-dependent unreliability undermines utility; Alan Frindell flagged the "relay cheats by fetching upstream" idea creates substantial implementer complexity. Cullen Jennings vs Will Law on where joining complexity belongs (client library vs relay). Editors will develop FETCH timeout and subgroup filter PRs for immediate HOL relief.

### Implementation activity
- **moq-dev/moq**: Major day — broadcast backup queue (PR #1319, FIFO, avoids reannounces), major moq-relay auth refactor with ~15 new tests using wiremock + axum-server TLS integration test (PR #1311), --identity replaced with --cert/--key (PR #1308), moq-boy game server maintenance (capybara→songbird, fofk→runiestory), Python raw-track support (PR #1318 open). Releases: moq-lite 0.15.14, moq-cli 0.7.18, moq-clock 0.10.16, moq-ffi 0.2.6.
- **moqtail**: REQUEST_ERROR unification (PR #164), removed draft-14-era fake-SUBSCRIBE hack for PUBLISH (PR #165), message parameters PR #169 open.
- **google/quiche**: Commit cancels subgroups permanently on STOP_SENDING.
- **cloudflare/moq-rs**: No new activity since Apr 14.
- **video-dev/moq-js**: Still quiet since mid-March.

### LOC Properties collision
- Alan Frindell comments on loc issue #10: loc-02 still collides with moqt-17 on Properties Type 0x02/0x04. Recommends moving to highest one-byte code points in next LOC revision.

### Interop regression
- **18/73/14 (Apr 17)** vs **23/68/14 (Apr 16)** — 5 tests flipped from pass to fail. Regression coincides with moqtail draft-16 merges and moq-dev broadcast/auth changes. Pair-level investigation needed.

### Status watch
- **draft-cenzano-moq-media-interop-03** expires in 6 days (April 23) — no renewal
- **REWIND consensus call** closes May 1, 2026 (14 days)

---

# 2026-04-16 - Wiki update: NAB Show MoQ showcase, SWITCH redesign, implementation activity

**Operation**: Update
**Sources**:
- Slack #moq: No new messages (channel quiet since Feb 5). #moq-rs and #moq-js: only new member joins (Endel).
- GitHub: moq-transport — PR #1378 (SWITCH) major redesign Apr 15-16; PR #1604 new review comments; PR #1562 4th approval
- GitHub: moq-dev/moq — 4 PRs merged + 4 opened Apr 15-16 (browser compat, moq-lite negotiation, TLS config)
- GitHub: moqtail — 5 draft-16 PRs merged Apr 14-15 (unified message registry, SubgroupHeader, REQUEST_OK)
- GitHub: cloudflare/moq-rs — PR #163 qlog alignment work; v0.7.17 released
- GitHub: google/quiche — Joining FETCH fix (largest_object at SUBSCRIBE time) by Martin Duke
- GitHub: msf, loc, secure-objects, cmsf, catalog-format — no activity since Apr 15
- Mailing list: No new threads since April 13
- IETF Datatracker: No new draft versions
- Interop runner: Unchanged at 23/68/14 (105 tests, Apr 16)
- MoQ Monthly: Only #0 published (March 4). No #1 yet.
- tobbee/moq-llm-wiki: No new issues (all 3 existing issues closed)
- Web search: NAB Show 2026 MoQ demos from Wowza, Oracle, Bitmovin, Broadpeak, Synamedia

**Pages updated**: discussions-2026-04.md, moq-transport.md, switch-abr.md, moq-dev.md, moq-rs.md, moqtail.md, quiche-moq.md, interop-runner.md, index.md

**Key findings**:

### NAB Show 2026 (April 18-22)
Largest public display of MoQ technology to date with multiple live demonstrations:
- **Wowza + Cloudflare**: CMAF-to-MoQ relay demo (Java/Kwik stack → moq-rs relay) at Cloudflare booth W2300
- **Oracle Video @ Edge (OVE)**: MoQT relay network with partner demos — Ateme (ingest), Broadpeak (packaging), Bitmovin Player Web X (playback)
- **Bitmovin Player Web X**: Commercial MoQ player using WebTransport + WebCodecs, sub-second latency against Cloudflare's 330+ city relay network
- **Broadpeak**: "Half MoQ relay" for HAS/MoQ coexistence at booth W3034
- **Synamedia**: Quortex PowerVu & MEG with MoQ track-based affiliate distribution

### Spec activity
- **SWITCH PR #1378 redesigned**: Gwendal Simon replaced FETCH+SUBSCRIBE delivery with relay-initiated PUBLISH + inline catch-up (7 commits Apr 15-16)
- **Session-Level Tracks PR #1562**: 4th approval (Suhas Nandakumar), close to merge
- **Joining FETCH PR #1604**: Detailed feedback from Gwendal Simon on priority/parameter edge cases

### Implementation activity
- **moq-dev/moq**: Safari/Firefox compatibility fixes (avc3→avc1, AudioDecoder, WebTransport BiDi workaround), moq-lite ALPN fallback, releases moq-cli v0.7.18 + moq-relay v0.10.21
- **moqtail**: Major draft-16 push — unified message registry (+937/−1398), SubgroupHeader, REQUEST_OK/UPDATE refactoring, datagram compat. v0.9.1 pending.
- **cloudflare/moq-rs**: qlog alignment with draft-pardue-moq-qlog-moq-events-03 (+346/−242); v0.7.17 released
- **quiche-moq**: Joining FETCH limited to largest_object at SUBSCRIBE time (prepares for REWIND)
- **video-dev/moq-js**: No activity since mid-March

### Status watch
- **draft-cenzano-moq-media-interop-03** expires in 7 days (April 23) — still no renewal
- **Interop runner** stable at 23/68/14 with 11 implementations

---

# 2026-04-15 - Add people pages, fix editor/author roles

**Operation**: Expansion + Correction

**Pages created**: ian-swett.md, victor-vasiliev.md, mike-english.md
**Pages updated**: alan-frindell.md, suhas-nandakumar.md, moq-transport.md, index.md, discussions-2026-04.md, discussions-2026-03.md, discussions-2026-02.md, discussions-2026-01.md, open-issues-analysis.md, joining-fetch.md, joining-fetch-dissent.md, quiche-moq.md, moq-rs.md, moq-js.md, interop-runner.md

**Key changes**:
- **Three new people pages**: Ian Swett (Google, co-editor of moq-transport), Victor Vasiliev (Google, author of moq-transport, quiche-moq co-developer), Mike English (Cloudflare, maintainer of moq-rs/moq-js, interop runner operator, MoQ Monthly publisher).
- **Role corrections**: Alan Frindell and Ian Swett are the **editors** of draft-ietf-moq-transport. Suhas Nandakumar and Victor Vasiliev are **authors**. Previously the wiki listed Suhas as co-editor. Alan's page updated to "Co-editor", Suhas's page corrected from "Editor" to "Author".
- **moq-transport.md authors section** now lists all four authors with wikilinks.
- **Wikilinks added** across 11 wiki pages: all plain-text mentions of Ian Swett, Victor Vasiliev, and Mike English converted to `[[wikilink]]` format.
- People section in index.md expanded from 6 to 9 entries.

---

# 2026-04-15 - CMSF ContentProtection merged, Shaka Player DRM support

**Operation**: Update
**Sources**:
- GitHub: moq-wg/cmsf PR #18 (merged Apr 14 by Will Law)
- GitHub: shaka-project/shaka-player PR #9972 (merged Apr 14 by Álvaro Velad Galván)
- User (maintainer) confirmed both merges

**Pages updated**: moq-cmsf.md, shaka-player.md, moqlivemock.md, discussions-2026-04.md

**Key changes**:
- **CMSF ContentProtection signaling** (PR #18): DRM signaling proposal by Torbjörn Einarsson (Eyevinn) merged into the CMSF spec. Defines `contentProtections` with `refID`s and per-track `contentProtectionRefIDs`. Supports Widevine, PlayReady, FairPlay, and ECCP (ClearKey). Based on DASH/DASH-IF attributes. Key rotation not yet covered.
- **moqlivemock/warp-player DRM**: DRM support implemented by Hugo Björs (Eyevinn). Supports Widevine, PlayReady, FairPlay, and ClearKey/ECCP.
- **Shaka Player DRM support** (PR #9972): Álvaro Velad Galván (Atème) added CMSF contentProtection support to Shaka Player. This makes Shaka Player the **second implementation** of CMSF ContentProtection, after moqlivemock/warp-player. Two independent implementations is a significant milestone for the feature.

---

# 2026-04-15 - Wiki update: issue #3 corrections, DELIVERY_TIMEOUT PR, interop improvement

**Operation**: Update + Corrections
**Sources**:
- Slack #moq: No new messages (channel quiet since Feb 11)
- GitHub: moq-transport — new PR #1605 (Split DELIVERY_TIMEOUT, Victor Vasiliev, Apr 14)
- GitHub: msf — no new activity since Apr 14; loc — no new activity
- Mailing list: No new threads since Apr 13
- IETF Datatracker: No new draft versions
- Interop runner: Improved to 23 pass / 68 fail / 14 skip (from 21/70/14 on Apr 14)
- tobbee/moq-llm-wiki: Issue #3 filed by Mike English (englishm) — detailed fact-check with corrections

**Pages updated**: moq-rs.md, moq-js.md, quiche-moq.md (rewritten), moq-transport.md, interop-runner.md, interop-status.md, interop-endpoints.md, discussions-2026-04.md, publish-subscribe.md (via moq-transport.md), martin-duke.md, index.md

**Key changes**:

### Issue #3 corrections (Mike English):
- **moq-rs history rewritten**: Corrected Mike English's role — he did not help with the Go→Rust translation (that was Luke Curley). Mike joined mid-2023 as a close collaborator, contributing relay deployments, moq-pub, C FFI exploration, and draft-04 support. Added detailed timeline and key contributors (Manish, Jacob, Scott Godin, Zafer Gurel).
- **quiche-moq disambiguation**: The wiki incorrectly described quiche-moq as a Rust implementation (birneee/quiche_moq). The interop runner's "quiche-moq" is actually **Google's QUICHE MoQT** — a C++ implementation inside Google's QUICHE library (part of Chromium), primarily developed by Martin Duke and Victor Vasiliev with ~74+ source files. Rewrote the page entirely. birneee/quiche_moq is a separate Rust project on Cloudflare's quiche crate, not in the interop runner.
- **moq-js Montevideo Tech context**: Added history about video-dev/moq-js development coming from the Montevideo Tech Summer Camp 2025, with Mike as technical sponsor and Qualabs community contributors. The 2026 Summer Camp features both Mike and Luke as co-sponsors.
- **moqpack label**: Changed status from "Active" to "Individual" in index to clarify it's not a WG document.
- **publish-subscribe fix**: Corrected "REQUEST" to "REQUEST_OK/REQUEST_ERROR" in the moq-transport Key Concepts list (there is no bare "REQUEST" message in the spec).
- **Community resources**: Added section to index with MoQ Monthly newsletter (Mike English), Demuxed MoQ Talks playlist, Montevideo Tech Summer Camp, moq.dev Discord, and link to IETF Datatracker for all 24+ individual drafts.
- **Individual drafts listing**: Added note about notable uncovered individual drafts (rewind, qlog, hang, cdn-provisioning, relay-dos).

### New findings:
- **Transport PR #1605** (Apr 14): Victor Vasiliev proposes splitting DELIVERY_TIMEOUT into two separate types of timeout.
- **Interop runner improvement**: 23/68/14 — best result since test count expanded to 105. Two additional tests passing compared to Apr 14.
- **draft-cenzano-moq-media-interop-03** expires in 8 days (Apr 23) — still no renewal.

---

# 2026-04-14 - Wiki update: GraphQL mailing list thread, MSF authz merge, CARP origin, interop recovery

**Operation**: Update
**Sources**:
- Slack #moq: New messages Apr 13-14 (visa question for London interim, Hugo Björs joined)
- GitHub: msf — PR #118 (authorization flows) merged Apr 13, issue #119 closed
- GitHub: moq-transport — no new issues/PRs since Apr 13; loc — no new activity
- Mailing list: New thread "Using MOQT for graphql subscriptions with draft-17 requires extensions" by Alan Frindell (Apr 13)
- IETF Datatracker: No new WG draft versions; noted draft-law-moq-carp-00 (Nov 2025) as CMSF origin
- Interop runner: Recovery to 21 pass / 70 fail / 14 skip (from 20/71/14 on Apr 13)
- tobbee/moq-llm-wiki: No open issues

**Pages updated**: discussions-2026-04.md, interop-runner.md, interop-status.md, moq-msf.md, moq-cmsf.md, will-law.md, alan-frindell.md, index.md

**Key findings**:
- **GraphQL subscriptions on MOQT** (mailing list, Apr 13): Alan Frindell argues draft-17's inflexible message parameters are a mistake. Key issues: 4KB track name limit forces query body into namespace/name; custom parameters require negotiation at every hop; 64KB control message size limit may be too small; no HTTP-like header forwarding for auth. Broader question about MOQT suitability for non-media use cases.
- **MSF PR #118 merged** (Apr 13): Authorization flows documentation added to MSF spec by Suhas Nandakumar.
- **CARP → CMSF lineage**: draft-law-moq-carp-00 ("CARP - a CMAF compliant implementation of WARP", Nov 2025) was adopted by the WG and became draft-ietf-moq-cmsf-00 (Dec 2025). Added history to CMSF page.
- **Interop runner**: Recovered from 20/71 (Apr 13) back to 21/70 (Apr 14). One test flipped back to pass.
- **draft-cenzano-moq-media-interop-03** expires in 9 days (Apr 23) — still no renewal.
- Slack activity minimal: Aman Sharma asked about visa invitation for London interim; Hugo Björs joined #moq.

---

# 2026-04-13 - Wiki update: add moq-lite and NMSF drafts, interop regression, #1405 resolution

**Operation**: Update
**Sources**:
- GitHub: moq-transport issues/PRs checked — #1405 updated Apr 12 (Ian Swett inclined to close)
- GitHub: msf — no new activity since Apr 10; loc — no new activity since Mar 23
- Mailing list: Only weekly GitHub digest on Apr 12, no new substantive threads
- IETF Datatracker: No new WG draft versions; two individual drafts added to wiki
- Interop runner: Slight regression (21→20 pass, 70→71 fail)
- tobbee/moq-llm-wiki: No open issues

**Pages created**: wiki/drafts/moq-lite.md, wiki/drafts/moq-nmsf.md
**Pages updated**: index.md, discussions-2026-04.md, interop-runner.md, interop-status.md, moq-transport.md, luke-curley.md, moq-dev.md

**Key findings**:
- **draft-lcurley-moq-lite-04** (Apr 9): Luke Curley's simplified transport protocol, now at version 04. Removes subgroups, object properties, datagrams, and 30+ message types from moq-transport. Pull-only, stream-based design. Individual submission, not WG-adopted. This is the spec behind moq-dev/moq.
- **draft-herz-moq-nmsf-01** (Apr 7): Erik Herz (Vivoh) proposes extending MSF with Neural Video Codec packaging. Dual-track model (hyperprior + latent) for priority-aware delivery. Supports DCVC-RT, SSF, FVC, and other learned codecs. 18 pages, individual submission.
- **Issue #1405** (Single Object Subgroup ID): Ian Swett commented Apr 12 that he's inclined to close with no action after PR #1593 saw no WG interest. Will put before WG to confirm.
- **Interop runner**: Slight regression from 21 pass / 70 fail to 20 pass / 71 fail (105 tests, 14 skip unchanged). One test flipped from pass to fail.
- **Virtual interim 13** happening today (Apr 13) with REWIND slides on agenda.
- **draft-cenzano-moq-media-interop-03** expires in 10 days (Apr 23) — still monitoring for renewal.
- Slack #moq: No new messages (channel quiet since Feb 11).

---

# 2026-04-12 - Add London interim details

**Operation**: Update
**Sources**: IETF Datatracker (interim-2026-moq-08 through moq-11 session pages)

**Pages updated**: interim-meetings.md, discussions-2026-04.md

**Key changes**:
- Added London interim details: County Hall / The Riverside Building, Belvedere Road, London SE1 7PB
- June 11 (moq-08): 2 sessions (hackathon/interop day)
- June 12 (moq-09, moq-10 at 08:30 UTC, moq-11 at 12:30 UTC): 3 working sessions
- Remote participation via Meetecho (details TBD)
- Explained numbering: moq-08 through moq-11 registered on datatracker before the virtual interims

---

# 2026-04-12 - Rename Eyevinn MOQ Stack to moqlivemock, major update

**Operation**: Update + Rename
**Sources**: User (maintainer) provided updated feature list; GitHub repos checked for versions.

**File renamed**: `wiki/implementations/eyevinn-moq.md` -> `wiki/implementations/moqlivemock.md`
**Pages updated**: moqlivemock.md (full rewrite), index.md (renamed + updated draft versions), interop-status.md (renamed + added draft-16), shaka-player.md (updated wikilinks), discussions-2026-01.md (updated wikilink)

**Key changes**:
- Renamed from "Eyevinn MOQ Stack" to "moqlivemock" (the central component)
- Draft support upgraded from draft-14 only to **draft-14 and draft-16** with ALPN negotiation
- Catalog now supports both **FETCH and SUBSCRIBE**
- Content protection documented with three namespace modes: clear (`cmsf/clear`), commercial DRM (`cmsf/drm-{scheme}`), and ClearKey/ECCP (`cmsf/eccp-{scheme}`)
- All repos at v0.7.0+ (moqtransport v0.7.0, moqlivemock v0.7.0, warp-player v0.7.1)
- All `[[eyevinn-moq]]` wikilinks updated to `[[moqlivemock]]`

---

# 2026-04-12 - Add draft-cenzano-moq-media-interop-03

**Operation**: Ingest
**Sources**:
- HTML: https://afrind.github.io/draft-cenzano-media-interop/draft-cenzano-moq-media-interop.html
- IETF Datatracker: https://datatracker.ietf.org/doc/draft-cenzano-moq-media-interop/

**Pages created**: wiki/drafts/moq-media-interop.md
**Pages updated**: index.md (added to drafts table), alan-frindell.md (added as co-author), media-packaging.md (added Media Interop section), interop-status.md (added media wire format interop section)

**Key findings**:
- Individual submission by Jorge Cenzano-Ferret and Alan Frindell (both Meta), currently at version 03
- Defines concrete media wire format over LOC for H.264 video, Opus audio, AAC-LC audio, and UTF-8 text
- Uses MOQT extension headers (0x0A, 0x15, 0x0D, 0x0F, 0x11, 0x13) for media metadata
- Supports mid-stream encoding parameter changes
- **Expires 2026-04-23** — needs monitoring for renewal. If not renewed, the draft lapses.
- Not adopted by the MOQ working group (individual submission)
- Documents the wire format used by moxygen and LOC-based media interop

---

# 2026-04-12 - Fix moq-rs production draft version, add doc.moq.dev

**Operation**: Correction + Enhancement
**Sources**:
- Slack #moq thread (2026-04-11): Mike English noted moq-rs wiki page incorrectly listed draft-07 as Cloudflare's current production deployment — it's actually draft-14
- Slack #moq thread (2026-04-11): Luke Curley pointed to [doc.moq.dev](https://doc.moq.dev/) as documentation for moq-dev/moq

**Pages updated**:
- moq-rs.md — Fixed draft support: production deployment is draft-14, not draft-07
- moq-dev.md — Added doc.moq.dev as documentation link

# 2026-04-12 - Wiki update: interop runner expansion, required-request-id debate, rewind-02

**Operation**: Update
**Sources**:
- Slack #moq: No new messages (channel quiet since Feb 11)
- GitHub: moq-transport issues/PRs checked — #1603 has new comments from Ian Swett (Apr 11)
- GitHub: msf, loc — no new activity since Apr 10
- Mailing list: No new threads since last update
- IETF Datatracker: No new WG draft versions; draft-duke-moq-subscribe-rewind-02 published Apr 2
- Interop runner: Test count expanded from 93 to 105; moqx (OpenMOQ relay) added as 11th implementation
- tobbee/moq-llm-wiki: No open issues

**Pages updated**: interop-status.md, interop-runner.md, discussions-2026-04.md, joining-fetch-dissent.md, martin-duke.md, openmoq.md

**Key findings**:
- Interop runner expanded to 105 tests (was 93) with 21 pass / 70 fail / 14 skip. The growth is from moqx (OpenMOQ's moxygen fork) joining the matrix as an 11th relay. moqx shows strong results: 6/6 with moq-dev-js, 5-6/6 with moq-rs-draft-16.
- Ian Swett commented on #1603 (Apr 11): required-request-id was added for "feature parity" with single control stream model but "it was never clear exactly what functionality this provided." Stream IDs in WebTransport aren't exposed to applications. He also expressed that Joining FETCH's dependency on another Request is a design concern.
- draft-duke-moq-subscribe-rewind-02 published Apr 2 — refines the "Rewind" subscription filter for best-effort past group retrieval. Key topic for interim-13 meeting (Apr 13).
- Virtual interim 13 is tomorrow (Apr 13) with REWIND slides on the agenda.

---

# 2026-04-11 - Split moq-rs/moq-js into separate implementation pages

**Operation**: Restructure
**Sources**:
- Slack #moq: Mike English's clarification (2026-04-11) about the relationship between cloudflare/moq-rs, moq-dev/moq, and video-dev/moq-js
- GitHub API: Repo metadata for all four projects

**Context**: Mike English explained that cloudflare/moq-rs (was englishm/moq-rs) and moq-dev/moq (was kixelated/moq-rs) are "sibling" implementations that both started from Luke Curley's original codebase but are now independent. Similarly, video-dev/moq-js and the JS in moq-dev/moq are separate codebases. The forks were born when Luke was not going to support the IETF WG specs directly. Luke's Hang player is a total rewrite, not derived from the old moq-js.

**Pages created**: wiki/implementations/moq-dev.md (moq-dev/moq — Luke Curley's Rust+TS monorepo with moq-lite + Hang)
**Pages updated**:
- moq-rs.md — Clarified as Cloudflare's IETF-aligned fork; added history section; updated maintainer to Mike English
- moq-js.md — Clarified as video-dev's IETF-aligned JS; added history section
- index.md — Added moq-dev/moq to implementations list and draft support table
- luke-curley.md — Updated references from [[moq-rs]] to [[moq-dev]]
- interop-endpoints.md — Fixed Luke Curley entry to reference [[moq-dev]]
- interop-status.md — Fixed v17 interop to reference [[moq-dev]] instead of [[moq-rs]]
- interop-runner.md — Updated wikilinks for moq-dev-rs and moq-dev-js entries
- imquic.md — Fixed v17 interop reference to [[moq-dev]]

**Timeline**:
- 2022-06-29: kixelated/moq-rs created (Luke Curley's original)
- 2023-05-24: kixelated/moq-js created (companion JS library)
- 2024-10-15: englishm/moq-rs and video-dev/moq-js created (IETF-aligned forks)
- 2025-06-20: kixelated/moq-js archived ("Moved to kixelated/moq")
- Now: kixelated/moq-rs → moq-dev/moq (monorepo), englishm/moq-rs → cloudflare/moq-rs

---

# 2026-04-11 - Fix broken interop-runner links (issue #2)

**Operation**: Maintenance
**Changes**:
- Removed duplicate `wiki/implementations/interop-runner.md` (content already covered by `wiki/interop/interop-runner.md`)
- Moved `[[interop-runner]]` listing from Implementations to Interop section in `wiki/index.md`
- All `[[interop-runner]]` wikilinks now resolve unambiguously

# 2026-04-11 - Wiki update: new transport issue/PR, MSF initTrack debate

**Operation**: Update
**Sources**:
- Slack #moq: No new messages since Feb 11 (channel quiet)
- Slack #moq-rs, #moq-js, #libquicr: No substantive new activity
- GitHub: moq-transport, msf, loc — checked for new issues/PRs since Apr 10
- Mailing list: No new threads since last update
- IETF Datatracker: No new draft versions (still at transport-17, msf-00, loc-02, etc.)
- Interop runner: Unchanged — 93 tests, 19 pass / 62 fail / 12 skip (draft-16 target)
- tobbee/moq-llm-wiki: No open issues

**Pages updated**: discussions-2026-04.md, moq-transport.md, joining-fetch-dissent.md, moq-msf.md

**Key findings**:
- New transport issue #1603 by Martin Duke: questions whether required-request-id is needed for all request types (suggests limiting to REQUEST_UPDATE and FETCH only)
- New transport PR #1604 by Martin Duke: implements #1602 proposal to move Joining FETCH onto SUBSCRIBE/PUBLISH stream; Alan Frindell reviewed noting shared parameter state constraints
- Transport PR #1540 (coalescing REQUEST_UPDATE processing, merged Apr 9) was missed in previous update, now captured
- Transport PR #1562 (Session-Level Tracks reserved namespace) updated Apr 10, now listed as open PR
- MSF PR #118 (authorization flows) updated Apr 10, now listed in MSF page
- MSF issue #153 (initTrack synchronization problem) expanded with Victor Vasiliev's analysis favoring removal of initTrack feature

---

# 2026-04-11 - Add draft-frindell-moq-moqpack-00

**Operation**: Ingest
**Sources**:
- IETF Datatracker: https://datatracker.ietf.org/doc/draft-frindell-moq-moqpack/
- Full text: draft-frindell-moq-moqpack-00.txt (1792 lines)

**Pages created**: wiki/drafts/moq-moqpack.md
**Pages updated**: index.md (added to drafts table), alan-frindell.md (added as author)

**Key findings**:
- New individual submission by Alan Frindell (Meta), published 2026-03-02
- Proposes QPACK-based compression for MOQT control messages to reduce overhead from repeated values (auth tokens, track names)
- Uses flag bit 0x40 on message types to signal compressed format
- Designed for compatibility with existing QPACK libraries
- Not yet adopted by the MOQ working group

---

# 2026-04-10 - Wiki update: OpenMOQ repos, MSF PR coverage

**Operation**: Update
**Sources**:
- Slack #moq: Messages through 2026-04-10 (no new activity since last update)
- GitHub: moq-transport, msf, loc — checked for new issues/PRs
- GitHub: tobbee/moq-llm-wiki issue #1 ("Add OpenMOQ")
- Mailing list: No new threads since last update
- IETF Datatracker: No new draft versions
- Interop runner: Unchanged — 93 tests, 19 pass / 62 fail / 12 skip (draft-16 target)

**Pages updated**: openmoq.md (added moqx relay context, playa player, moqxr description), moq-msf.md (added merged PR #124)

**Key findings**:
- Wiki issue #1 requested adding OpenMOQ repos: moqx (server/relay) not yet public — openmoq/moxygen fork serves as buffer repo; red5pro/moq-playa (player) not yet public; mondain/moqxr already listed but description enriched
- MSF had PR #124 (clarify first object in event/media timeline track) merged Apr 9, not previously captured
- No new IETF drafts, mailing list threads, or interop runner changes since last update

---

# 2026-04-10 - Wiki update: mailing list, interop runner, discussion enrichment

**Operation**: Update
**Sources**:
- Slack #moq: Messages through 2026-04-10
- GitHub: moq-transport (issues/PRs), msf (issues/PRs), loc (issues/PRs)
- Mailing list: https://mailarchive.ietf.org/arch/browse/moq/ (threads through Apr 10)
- IETF Datatracker: No new draft versions (still at transport-17, msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00)
- Interop runner: 93 tests, 19-22 pass / 59-62 fail / 12 skip (draft-16 target)

**Pages created**: interop-runner.md
**Pages updated**: discussions-2026-04.md, discussions-2026-03.md, interim-meetings.md, moq-transport.md

**Key findings**:
- Mailing list had active threads not previously captured: consensus call on draft-17 (Mar 24 → Apr 10), 7-byte varint debate (Mar 19 → Apr 7), MoQ charter and QMUX scope, Presence/Notifications proposal
- 7-byte varint debate resolved with PR #1595 (merged Apr 9)
- Virtual interim 12 (Mar 30) minutes posted, interim 13 (Apr 13) agenda posted with REWIND discussion
- PUBLISH_DONE / subgroup FIN handling question raised by Alan Frindell (Mar 31)
- New varint encoding example bug found and acknowledged (Mar 3)
- Luke Curley published security camera blog post (Mar 10)
- No new draft versions published since last update

---

# 2026-04-10 - GitHub issues/PRs analysis, SWITCH status, interim schedule

**Operation**: Analysis + Ingest
**Sources**:
- GitHub: All open issues across moq-transport (48), msf (49), loc (9), secure-objects (8), privacy-pass (2), cmsf (4)
- GitHub: All open PRs across moq-transport (17), msf (3)
- IETF datatracker API: Interim meeting schedule through June 2026
- AI minutes index: ietfminutes.org

**Pages created**: switch-abr.md, joining-fetch-dissent.md, open-issues-analysis.md, interim-meetings.md
**Pages updated**: index.md

**Key findings**:
- 48 open transport issues, 17 open PRs - Joining Fetch and SWITCH are biggest debates
- SWITCH (#1354) has 39 comments, most discussed open issue
- Next interim is April 13 with REWIND slides
- Properties Type collision (#1550) is a cross-draft bug needing coordinated fix
- Request ID validation (#1459) is an implementation blocker labeled BLOCKED

---

# 2026-04-10 - Ingest full Slack history (Jan 12 - Apr 10) and interop matrix

**Operation**: Ingest
**Sources**:
- Slack #moq: Complete history from 2026-01-12 through 2026-04-10
- Interop runner matrix: https://englishm.github.io/moq-interop-runner/

**Pages created**: discussions-2026-01.md, discussions-2026-02.md
**Pages updated**: index.md, interop-status.md (added matrix details), interop-endpoints.md (added quiche-moq, moqtail, akamai, imquic), eyevinn-moq.md (media support details)

**Key findings**:
- 10 implementations in the interop runner matrix
- Draft-16 published Jan 14, draft-17 published Mar 3
- Boulder interim hackathon (Feb 9-12) drove major interop progress
- Eyevinn moqlivemock announced with HEVC, Opus, AC-3, subtitles (Jan 27)
- Shaka Player v5.0.5 updated to draft-14 support

---

# 2026-04-10 - Add draft-14 and Eyevinn implementations

**Operation**: Ingest
**Sources**:
- Downloaded draft-ietf-moq-transport-14.txt (Sept 2025)
- Eyevinn GitHub repos: moqtransport, moqlivemock, warp-player

**Pages created**: wiki/implementations/eyevinn-moq.md
**Pages updated**: index.md, interop-status.md

---

# 2026-04-10 - Initial Wiki Creation

**Operation**: Full initial setup
**Sources ingested**:
- IETF drafts: moq-transport-17, moq-msf-00, moq-loc-02, moq-secure-objects-00, moq-privacy-pass-auth-02, moq-cmsf-00
- GitHub activity: moq-wg/moq-transport (issues up to #1602, PRs up to #1599), moq-wg/msf, moq-wg/loc
- Slack #moq channel: messages from 2026-03-12 through 2026-04-10
- IETF Datatracker: MOQ WG document listing

**Pages created**: 30+ pages covering drafts, concepts, people, implementations, discussions, and interop
**Cross-references**: Established between all pages using Obsidian wikilinks
