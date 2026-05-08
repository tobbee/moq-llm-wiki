---
title: "Discussions - May 2026"
tags: [discussions, slack, github]
date: 2026-05-01
last_updated: 2026-05-08
status: current
---

Summary of active discussions in the MOQ ecosystem during May 2026.

# Activity (May 7 06:00 UTC → May 8 06:00 UTC)

## moq-dev/moq — Day-3 burst: PR #1387 "Revert the revert" un-reverts PR #1356 within 24h; PR #1386 Firefox stats merged; PR #1388 LOC frame format opened; PR #1389 stats aggregation opened

[[luke-curley]]'s third consecutive day with material `main`-branch activity, all between **17:42 and 18:24 UTC** May 7. Headline element: **PR #1387 reverts the May 6 revert (PR #1385) of PR #1356** — the type-level cleanup is back in `main` with the underlying clone-counting bug fixed in-place. Plus a major *new* feature-PR pair: LOC frame format support and stats aggregation, both Claude-Code-generated.

- **[PR #1387](https://github.com/moq-dev/moq/pull/1387) MERGED** May 7 17:47:35 UTC by [[luke-curley]] (+167/−177) — *Revert the revert*. One-line body: *"Actually fix the issue by incrementing the dynamic count when cloning."* Un-reverts PR #1385's revert of PR #1356 (`insert_track` takes `TrackConsumer`). **Cycle**: PR #1356 merged May 5 22:15 UTC → reverted via #1385 May 6 22:08 UTC (−24h) → reverted-back via #1387 May 7 17:47 UTC (+19h 39m). **Total cycle 43h 32m. First merge → revert → revert-of-revert cycle on `main` in moq-dev/moq history.** Yesterday's wiki entry framed PR #1385 as a "first merge-then-revert-within-24h" event; today it is reframed as a *transient* revert. The `TrackConsumer::produce()` removal from #1300 is again gone.
- **[PR #1386](https://github.com/moq-dev/moq/pull/1386) MERGED** May 7 18:17:23 UTC by [[luke-curley]] (+72/−177) — *@moq/watch: source network stats from the connection, not navigator*. Final shape +72/−177 (vs opened-shape +88/−130 on May 6 — the reviewed form deletes more code than originally drafted). Replaces `navigator.connection` (Firefox doesn't expose, others report unreliably) with QUIC-connection-sourced stats. **Second Firefox-compatibility PR to land in 3 days; sibling PR #1307 (Lite03+ via legacy SETUP) still open.**
- **[PR #1388](https://github.com/moq-dev/moq/pull/1388) OPENED** May 7 17:42:06 UTC by [[luke-curley]] (+799/−17, **OPEN**) — *Add Low Overhead Container (LOC) frame format support*. **First adoption of an IETF-spec media container format in moq-dev/moq alongside its native Hang stack.** New `moq-loc` Rust crate + `@moq/loc` JS package implementing encode/decode for the [[moq-loc|draft-ietf-moq-loc]] wire format; QUIC-style varint property block (delta-encoded type IDs `0x06`=timestamp, `0x08`=timescale) followed by raw codec payload. **Catalog integration**: hang catalog gains `Container::Loc { timescale }` (default 1,000,000 µs); audio source selection prioritizes LOC after legacy, before CMAF. Watch player audio/video decoders + MSE backends instantiate the appropriate LOC decoder based on catalog config. Per-frame timescale (`0x08` property) overrides catalog default. *"Even-typed properties carry varint values; odd-typed properties carry length-prefixed bytes. Unknown properties are silently skipped on decode, never emitted on encode."* Body marked *"🤖 Generated with Claude Code"*.
- **[PR #1389](https://github.com/moq-dev/moq/pull/1389) OPENED** May 7 18:23:35 UTC by [[luke-curley]] (+1168/−39, **OPEN**) — *Add stats aggregation and publishing for moq-lite sessions*. New `Stats` module (`rs/moq-lite/src/stats.rs`); per-broadcast and per-prefix stats published as **`.stats/<level>/<name>` JSON broadcasts** (1Hz snapshot, atomic counters with `Relaxed` ordering, RAII guards record open/close + frames + bytes + groups). **Hidden-path filtering**: new `Path::is_hidden()` (segments starting with `.`) so stats infrastructure doesn't recursively generate its own stats traffic; `OriginConsumer::announced()` filters hidden paths, complementary `announced_hidden()` exposes them. New `StatsConfig` in moq-relay (`name` + `levels` for per-prefix bucketing depth). API surface: `Client::with_stats()` / `Server::with_stats()` builders. Body marked *"🤖 Generated with Claude Code"*. **Same problem domain as the May 5-closed PR #853** (fcancela's "Minimal observability metrics", +1261/−38) — Luke's reformulation lands as a 1168-line opening within 2 days, occupying adjacent design space with three novel mechanisms (in-band stats broadcasts, hidden-path filtering, per-prefix bucketing).
- **[PR #1338](https://github.com/moq-dev/moq/pull/1338) updated** May 7 18:32 UTC — `chore: release` (moq-bot[bot]). Auto-bumped after #1387 + #1386 merges; the day-1 revert + day-3 revert-of-revert net no-op rolls forward, plus the Firefox stats fix.
- **[PR #1374](https://github.com/moq-dev/moq/pull/1374) (Lite05 DATAGRAMS) updated** May 7 19:25 UTC — still **open**, Day +3 since open. No movement towards merge.
- **[PR #853](https://github.com/moq-dev/moq/pull/853) — note**: closed-not-merged on May 5; received an automated cross-reference timestamp ping May 7 17:50 UTC when PR #1389 opened (PR #1389 occupies adjacent design space). State remains CLOSED.

**Net**: Day-3 lands **two merges** that net to zero net code change but unwind yesterday's revert with the underlying bug fixed in-place, and **opens two large new feature PRs** (+799 LOC frame format, +1168 stats aggregation). Both new PRs are Claude-Code-generated. Combined moq-dev/moq diff opened in the 4-day May 4 → May 7 window: PR #1374 (Lite05) +1615/−7 + PR #1378 +295/−240 + PR #1388 +799/−17 + PR #1389 +1168/−39 = **+3877/−303 added across 4 Claude-Code-generated PRs**, of which only PR #1378 has merged.

## moq-wg/msf — avelad asks for PR #133 (SCTE-35 + CEA-608/708) to be split into 3 PRs

After 70+ days open with periodic updates, [[suhas-nandakumar]]'s [PR #133](https://github.com/moq-wg/msf/pull/133) (+259/0, *Add SCTE-35 support and CEA-608/708 accessibility fields*) gets the **first new comment in 12 days** from a new reviewer.

- **avelad** (Alvaro Velad / Google, Shaka Player engineer) May 7 11:50 UTC: *"Perhaps this should be separated into 3 PRs, one for CEA, one for SCTE-35, and one for IMSC1 and WebVTT?"*
- The PR adds 4 separable concerns: accessibility metadata, SCTE-35 timeline events, IMSC1 caption events, WebVTT references. avelad's split suggestion would distribute these into 3 PRs (CEA-608/708 alone; SCTE-35 alone; IMSC1+WebVTT bundled).
- **First moq-wg/msf review activity from a Google engineer in this PR thread.** Prior reviewer engagement was Will Law (Akamai) on Apr 27. Comes 1 day after avelad's May 6 14:27 UTC ping requesting Will Law's review.
- **Process pushback, not technical pushback** — but the cadence change of moving from 1 PR (open Feb 27 → May 7+) to 3 PRs would extend the merge timeline considerably and may force the SCTE-35 + accessibility separation discussion into the May 12 MOQ Town Hall window.

## moq-transport — afrind reframes Issue #1622 (GOAWAY Request ID removal) as repurposable Group-ID slot

[Issue #1622](https://github.com/moq-wg/moq-transport/issues/1622) was opened Apr 30 by [[ian-swett]] with the title *"Request ID in GOAWAY isn't useful"*. Body argues request IDs are not the right primitive in MoQ, citing [[victor-vasiliev]]'s reluctance on PR #1559. After ianswett's open + afrind's brief Apr 30 18:31 UTC counter (*"trivial to put the request ID in goaway, and might be useful"*), the issue sat untouched for a week.

- **[[alan-frindell]] May 7 18:53 UTC** ([comment](https://github.com/moq-wg/moq-transport/issues/1622#issuecomment-...)): *"Perhaps we want to use the Request ID slot to convey a Group ID when sent on an individual subscription or fetch stream."*
- Reframes the GOAWAY Request-ID slot as **repurposable wire field for a different per-stream identifier**, rather than removing it. Suggests the slot itself is valuable but the *meaning* may need to change to be useful.
- Combined with Required Request ID removal (PR #1615), Vasiliev's PR #1559 hesitation, and the Apr 30 Joining FETCH discussion, the editorial team appears to be **converging on per-stream identifier signalling as a subgroup of the Request-ID cleanup direction**.
- **First substantive afrind comment on Issue #1622 since the original Apr 30 reply.**

Other moq-transport open PRs (#1621, #1618, #1617, #1613, #1544, #1455-CLOSED) received label/timestamp pings on May 7 18:13–18:37 UTC but no code pushes. Likely afrind doing review-cleanup labelling on a single sit-down.

## Slack #moq — quiet for 1 day

No new posts since May 6 17:49 CEST (Suhas CAT4MOQ + Will Law MOQ Town Hall announcements). `#moq-rs` (C09CG9V7A2Y), `#moq-js` (C09BZ7KH0BZ), `#libquicr` (C08ER7J16BF) all unchanged.

## Mailing list — quiet for 3rd consecutive day

No new messages on May 6 or May 7. Cullen Jennings's *"Request Synchronization Use Case"* thread (May 1) and Magnus Westerlund's three May 4 framing messages remain unanswered for **7 days** and **4 days** respectively. **No on-list announcement** posted for the new MSFTS draft (Day +2 since Datatracker submission).

## moqtail and other repos — completely quiet day

[[zafer-gurel]] and contributors take May 7 off — no new commits, PRs, or issues on `moqtail/moqtail` after the **9 merges across May 5–6**. PR #193 [4/n] (sharmafb upstream FETCH on cache miss, +248/−132, OPEN since late May 6) remains untouched 24h+ later.

`cloudflare/moq-rs` Day +25 quiet; `google/quiche` moqt Day +3 quiet (no commits since the May 5 Vasiliev parser rewrite); `video-dev/moq-js`, `birneee/quiche_moq`, all Eyevinn repos all quiet.

**One implementation-side commit elsewhere**: [`Quicr/cat-rs`](https://github.com/Quicr/cat-rs) (newly open-sourced May 6) gets May 7 04:07 UTC commit `1e4423e` *"Security hardening: fix all audit findings"* by Suhas — Day +1 of post-open-source maintenance.

## Datatracker / MoQ Monthly / wiki

- **No new draft revisions**. WG state unchanged: transport-17, msf-00, loc-02, secure-objects-00 (-01 substantively ready in repo, **still not on Datatracker**), privacy-pass-02, cmsf-00. Notable individual: lite-04 (Apr 9), nmsf-01 (Apr 7), gregoire-moq-msfts-00 (May 6, **Day +2**).
- **MoQ Monthly**: No new issue. Day +7 since #1.
- **tobbee/moq-llm-wiki**: No new open issues.

## Interop runner — 19/72/14 — breaks the 4-day floor downward

**−1 pass / +1 fail vs 4 prior days at 20/71/14.** New post-NAB low; the matrix has now returned to the **Apr 17–21 floor reading of 19** (which was the early-floor reading before the late-April recovery wave to 25). moqtail PR #193 (upstream FETCH on cache miss) **did not merge** May 7 — yesterday's wiki noted it as the next candidate to move the matrix once `moqtail-relay` rebuilds, but the rebuild hasn't happened. Likely cause is **another image's rebuild** or natural per-run variance. Walking arc since the Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → **19**.

---

# Activity (May 6 06:00 UTC → May 7 06:00 UTC)

## IETF Datatracker — NEW individual draft `draft-gregoire-moq-msfts-00` (Gregoire/Simon, MPEG-2 TS over MoQ)

**[`draft-gregoire-moq-msfts-00`](https://datatracker.ietf.org/doc/draft-gregoire-moq-msfts/) submitted** May 6, 2026 — 21 pages — *MPEG-2 Transport Stream Packaging for Media Over QUIC Transport*.

- **Authors**: **Paul Gregoire** (Red5) and **Gwendal Simon** (Synamedia).
- **Scope**: extends [[moq-msf]] by registering the **`m2ts`** packaging value alongside CMSF (`cmaf`) and LOC. Defines catalog fields for transport-stream track description and specifies receiver/relay behavior for joining, switching, and validating packetized streams. Preserves existing MPEG-2 semantics while mapping consecutive source packets into MOQT Objects.
- **m2ts-specific catalog fields** (10 total):
  1. `m2tsPacketSize` (required, 188 or 192 octets)
  2. `m2tsPacketsPerObject` (optional, typical packets per object)
  3. `m2tsProgramNumber` (optional, program carried)
  4. `m2tsPmtPid` (optional, locates PMT)
  5. `m2tsPcrPid` (optional, identifies PCR location)
  6. `m2tsPsiInterval` (optional, PSI repetition interval in ms)
  7. `m2tsRandomAccess` (optional, signals whether groups begin at access points)
  8. `m2tsTimestampMode` (optional, timestamp interpretation for 192-octet packets)
  9. `m2tsScte35Pid` (optional, splice signaling)
  10. `initData` (optional, Base64-encoded initialization packets)
- **Significance**: **first non-CMAF, non-LOC packaging format proposed for the MSF umbrella** — extends MSF to broadcast/contribution workflows where MPEG-2 TS is still the dominant container. The 192-octet variant accommodates the M2TS source-packet form (4-byte timestamp prefix). SCTE-35 PID is explicitly modeled, signaling intent to support ad-insertion / splice points end-to-end.
- **First MoQ contribution from Paul Gregoire** (Red5), who maintains [`moqxr`](https://github.com/mondain/moqxr) (recent v0.2.1 release, Apr 17 Slack post). Co-author **[[gwendal-simon]]** is also the author of moq-transport [PR #1378 (SWITCH for client-side ABR)](https://github.com/moq-wg/moq-transport/pull/1378), still active. **First IETF-side artifact from Gwendal after the late-April spec/impl cross-pollination wave.**
- **No mailing-list announcement message yet** — both authors might announce on `moq@ietf.org` in the May 7+ window, or wait for the London June interim.

## moq-dev/moq — Evening burst day-2: PR #1385 REVERTS yesterday's PR #1356 within 24h; PR #1382/#1383 polish; PR #1386 opened; Issue #1384

[[luke-curley]] returns May 6 evening (~20:00–22:30 UTC) for a second burst building on the May 5 seven-PR run. Notable element: **PR #1385 reverts PR #1356 (`insert_track` takes `TrackConsumer`)** ~24 hours after it merged.

- **[PR #1382](https://github.com/moq-dev/moq/pull/1382) MERGED** May 6 20:03 UTC by [[luke-curley]] (+3/−0) — *Unignore moq-mux test fixtures*. Test-fixture file inclusion fix following the moq-mux backport (PR #1341). Cosmetic.
- **[PR #1383](https://github.com/moq-dev/moq/pull/1383) MERGED** May 6 21:09 UTC by [[luke-curley]] (+15/−5) — *@moq/watch: don't tear down a broadcast when an unrelated path flaps*. Targeted fix in the TypeScript `watch` package for spurious broadcast tear-downs when an unrelated subscription/announcement path changes state.
- **[Issue #1384](https://github.com/moq-dev/moq/issues/1384) OPENED** May 6 20:41 UTC by [[luke-curley]] — *@moq/signals improvements*. Tracks reactive-signals layer cleanup in the TypeScript `signals` package.
- **[PR #1386](https://github.com/moq-dev/moq/pull/1386) OPENED** May 6 21:51 UTC by [[luke-curley]] (+88/−130, **OPEN**) — *@moq/watch: source network stats from the connection, not navigator*. Replaces use of `navigator.connection` (which Firefox doesn't expose, and which other browsers report unreliably) with stats sourced directly from the QUIC connection object. **Second Firefox-compatibility-affecting PR** in two days (after PR #1307 legacy SETUP fallback, also still open).
- **[PR #1385](https://github.com/moq-dev/moq/pull/1385) MERGED** May 6 22:08 UTC by [[luke-curley]] (+160/−117) — *Revert "moq-lite: switch insert_track to take TrackConsumer (#1356)"*. Body is the standard auto-generated revert text (*"This reverts commit `b611acd1`."*). **Backs out PR #1356 ~24 hours after it merged on May 5 22:15 UTC** — the type-level cleanup that was supposed to land the `TrackConsumer::produce()` removal from #1300 has been pulled back. No follow-up issue or new PR yet explaining the regression that prompted the revert; the next release-train PR (#1338) will roll without that change. **First merge-then-revert-within-24h cycle on `main` since the Apr 30 PR #1357 → PR #1372 fetch_group revert (which took 2 days).**
- **[PR #1338](https://github.com/moq-dev/moq/pull/1338) updated** May 6 22:24 UTC — `chore: release` (moq-bot[bot]). Auto-bumped after the day's merges; will drop PR #1356 from the staging release line.
- **[PR #1358](https://github.com/moq-dev/moq/pull/1358) updated** May 6 21:32 UTC — Origin poll-driven rewrite, still open.
- **[PR #1149](https://github.com/moq-dev/moq/pull/1149) updated** May 6 19:06 UTC — catalog registry, still open.
- **[Issue #1364](https://github.com/moq-dev/moq/issues/1364) CLOSED** May 6 06:00 UTC — Dan Rossi's *"Cloudflare Relay"* question. No comment on close.
- **[PR #1374](https://github.com/moq-dev/moq/pull/1374) (Lite05 DATAGRAMS) — no movement** today (Day +2 since open).
- **[PR #1307](https://github.com/moq-dev/moq/pull/1307) (Firefox legacy-SETUP fallback) — no movement** today.

**Net**: Day-2 follow-up to the May 5 burst lands two small fixes (#1382, #1383) and **a notable revert (#1385)** that pulls PR #1356 back out of `main` within 24 hours of landing. PR #1386 (network-stats source change) is the day's only **new** open PR; it continues a Firefox-compatibility theme alongside the still-open PR #1307. Lite05 DATAGRAMS PR #1374 remains untouched for a 2nd day.

## moqtail — sharmafb upstream-FETCH 3-PR series MERGED in 27 minutes; PR #179 (Firefox docs) merges; PR #193 [4/n] opens

[[zafer-gurel]] merges **all 3 of sharmafb's upstream-FETCH PRs** (#186, #188, #187 in that order — note non-sequential merge order) on May 6 between 14:31 and 14:58 UTC, plus **davemevans's PR #179 Firefox docs** at 15:04 UTC. Late evening, **sharmafb opens PR #193** as the final piece of the upstream-FETCH series.

- **[PR #186](https://github.com/moqtail/moqtail/pull/186) MERGED** May 6 14:31 UTC by zafergurel (+15/0) — *[upstream fetches] Add command-line args for FETCH upstream timeout and gap limit [1/n]* (sharmafb / Aman Sharma). Adds two new relay command-line flags configuring upstream-FETCH timeout and gap-tolerance behavior.
- **[PR #188](https://github.com/moqtail/moqtail/pull/188) MERGED** May 6 14:56 UTC by zafergurel (+154/−8) — *[upstream fetches] Function to send upstream fetch [3/n]* (sharmafb). Adds the relay-side primitive for sending upstream FETCH requests to a publisher when a cache miss occurs. **Merged out of order vs #187** (the [2/n] plumbing PR).
- **[PR #187](https://github.com/moqtail/moqtail/pull/187) MERGED** May 6 14:58 UTC by zafergurel (+71/−6) — *[upstream fetches] Plumbing to forward FETCH data received from upstream [2/n]* (sharmafb). Adds the data-forwarding plumbing connecting the upstream FETCH response back to the requesting downstream subscriber. **Merge order 1 → 3 → 2** (likely cherry-pick / linearization rather than fast-forward).
- **[PR #179](https://github.com/moqtail/moqtail/pull/179) MERGED** May 6 15:04 UTC by zafergurel (+11/−2) — *docs: add instructions for Firefox testing using private CA* (davemevans / David Evans, opened Apr 29). Documents the `network.http.http3.disable_when_third_party_roots_found` Firefox config required when running moqtail behind mkcert + private CA. **Second non-maintainer-authored PR to land on `main` in 2 days** (after thexeos's co-authorship in PR #191 yesterday).
- **[PR #192](https://github.com/moqtail/moqtail/pull/192) OPENED** May 6 15:05 UTC by github-actions[bot] — *[ci] release*. Standard release-line bump capturing #186/#187/#188/#179.
- **[PR #193](https://github.com/moqtail/moqtail/pull/193) OPENED** May 6 23:11 UTC by sharmafb (+248/−132, **OPEN**) — *[upstream fetches] Finish implementation of sending FETCH requests upstream for cache misses [4/n]*. **Capstone of the 4-PR series.** Body summary:
  - **Upstream fetch on cache miss**: relay now iterates group-by-group and sends a FETCH upstream to the publisher for any groups missing from the local cache, rather than serving only from the cache.
  - **Split `fetch_requests` into incoming and outgoing**: separated the single `fetch_requests` map into `incoming_fetch_requests` (fetches the client sent to the relay) and `outgoing_fetch_requests` (fetches the relay sent to the publisher).
  - **Use publisher's track alias**: upstream FETCH requests now use the publisher's own track alias instead of the relay's internal track ID, so the response stream can be resolved correctly.
  - **Manual test plan**: 4-terminal local setup with relay, publish-namespace client (modified to respond to incoming FETCH by replaying objects), subscribe client, and fetch client; relay-side logs confirm cache hits and misses.
- **[Commit `ccf9d2e`](https://github.com/moqtail/moqtail/commit/ccf9d2e)** May 6 08:59 UTC by **Ali C. Begen** — *docs: update reference*. Co-maintainer commit on `main`.

**Net**: moqtail completes a key relay capability — **upstream FETCH on cache miss** — through a contributor-led 3-PR series merged in a 27-minute window, with the 4th and largest PR (the actual upstream fetch logic) opened the same evening. Combined with **PR #179 (davemevans Firefox docs)** also merging, this is the **second consecutive day with non-maintainer-authored merges on `main`** (after thexeos's co-authorship in PR #191 on May 5). The moqtail contributor base is widening visibly — sharmafb and davemevans both had multiple PRs land in the May 5–6 window.

## moq-wg/secure-objects — First commits in many weeks: Suhas merges PR #87 (diagram fix)

After a multi-week silent period on `main`, **[[suhas-nandakumar]]** lands a 2-commit diagram fix.

- **Commit `8d789cf`** May 6 13:30 UTC by Suhas Nandakumar — *Fix encryption/decryption diagrams to match SECURE_OBJECT_AAD structure*.
- **Commit `68f9f0b`** May 6 13:45 UTC by Suhas Nandakumar — *Merge pull request #87 from moq-wg/pic-fix*.

**Diagram-only fix** aligning the figure-level depiction of encryption/decryption flow with the SECURE_OBJECT_AAD wire structure. **No normative change**. First commits on `main` in moq-wg/secure-objects since the May 1 editorial wave; the secure-objects-01 substantive draft (containing the SFRAME RFC reference, additional test vectors, and en-dash fix from the still-open #83/#84/#85 trio) is **still not on Datatracker** as of May 7.

## moq-wg/moq-transport — Quiet day on `main`; only PR #1604 timestamp ping

No new commits, merges, or new issues opened on `main` in the May 6 06:00 UTC → May 7 06:00 UTC window.

- **[PR #1604](https://github.com/moq-wg/moq-transport/pull/1604) (Joining FETCH with subscription)** — touched at May 6 15:04 UTC; no new comment surfaced — likely a label/state update rather than a substantive comment after [[alan-frindell]]'s May 5 16:36 UTC reframing.

Open PR slate unchanged.

## Mailing list — Quiet for 2nd consecutive day

**No new messages** on `moq@ietf.org` on May 6 or May 7 (through the wiki window). Cullen's *"Request Synchronization Use Case"* thread (May 1) and Magnus Westerlund's three May 4 framing messages now sit unanswered for **6 days** and **3 days** respectively. **Notably, no announcement message** was posted for the new `draft-gregoire-moq-msfts-00` draft. The "Knowing the start of a Subgroup" thread is also dormant since [[alan-frindell]]'s twin May 5 pushback messages.

## Slack #moq — CAT4MOQ libraries open-sourced; Dan Rayburn MOQ Town Hall scheduled May 12

Two new posts in the May 6 06:00 UTC → May 7 06:00 UTC window — first `#moq` activity since [[torbjorn-einarsson]]'s May 5 06:43 CEST moqlivemock+warp-player announcement.

- **[[suhas-nandakumar]] May 6 17:49 CEST** — *"Just some updates on CAT4MOQ related implementation work"*:
  1. **`catapult`** (C++ library, [github.com/Quicr/catapult](https://github.com/Quicr/catapult)) — open-sourced for a while, used in internal dev/testing.
  2. **`cat-rs`** (Rust library, [github.com/Quicr/cat-rs](https://github.com/Quicr/cat-rs)) — **newly open-sourced**. Both libraries up to date with C4M spec, full CAT token implementation with **DPoP support**.
  3. Cisco/Quicr commits to keeping both libs current and welcomes feedback.
  - **Significance**: First open-sourcing of a Rust CAT4MOQ implementation. Pairs with the existing C++ `catapult` to give the [[moq-privacy-pass|privacy-pass]] / CAT4MOQ track its first cross-language client-side coverage. Suhas is a [[moq-wg/secure-objects|secure-objects]] co-editor, so the timing aligns with this morning's diagram-fix merge as a coherent Cisco/Quicr push.
- **Will Law (Akamai) May 6 09:44 CEST** — Dan Rayburn is hosting a **live MOQ Town Hall Zoom session on May 12 at 1pm ET**, open to everyone. *"Please join to answer the questions, promote your project or service, or debate the nuances of MOQT."* [LinkedIn announcement](https://www.linkedin.com/posts/danrayburn_moq-openmoq-streamingmedia-share-7457463529865113602-KstM).
  - **Significance**: First public-facing moderated MoQ town hall (vs IETF interim or Demuxed-style talks). Dan Rayburn is a streaming-industry analyst (StreamingMediaBlog); the framing is industry-promotion + practitioner debate. Falls 6 days before the next regular WG cadence; slot timing (1pm ET = 19:00 CEST = 17:00 UTC = 10am PT) hits both EU and US working hours.

`#moq-rs` (C09CG9V7A2Y), `#moq-js` (C09BZ7KH0BZ), `#libquicr` (C08ER7J16BF) all unchanged.

## Other implementations — quiet

- **cloudflare/moq-rs**: No new commits since Apr 13 (Day +24 of upstream-fork quiet).
- **video-dev/moq-js**: No new commits since Apr 16.
- **google/quiche** (`quiche/quic/moqt`): No new commits since the May 5 01:02 UTC `1ceadc7` Vasiliev *"Rewrite MOQT control message parser"* — Day +2 of post-rewrite quiet.
- **birneee/quiche_moq**: No new commits since Mar 13.
- **Eyevinn/moqlivemock + warp-player**: No new commits since the May 5 v0.8.0 release.
- **Eyevinn/moqtransport**: No new commits.

# Activity (May 5 06:00 UTC → May 6 06:00 UTC)

## moq-dev/moq — Luke's biggest single-day merge run; 7 PRs land (incl. PR #1341 +2588/−3594 moq-mux backport, PR #1378 API tightening, Origin renames, DNS fix, TOML config); PR #1307 OPENED for Firefox legacy-SETUP fallback

[[luke-curley]]'s most active day on `main` since the Apr 29–30 wave. Seven PRs merged in a ~9-hour window, ranging from a 2588-line moq-mux backport to a single-line social-image swap. **No new wire-version increments** today (Lite05 PR #1374 still open).

- **[PR #1377](https://github.com/moq-dev/moq/pull/1377) MERGED** May 5 17:17:23 UTC by [[luke-curley]] (+52/−1, 4 files; closes [#1376](https://github.com/moq-dev/moq/issues/1376)) — *fix(config): accept single string or array for TOML list fields*. Several relay TLS/auth fields are typed as `Vec<_>` but were documented in `demo/relay/prod.toml` as plain strings, so loading those configs failed with *"invalid type: string, expected a sequence."* Applies `serde_with::OneOrMany<_, PreferMany>` (already used elsewhere) so a bare string and a TOML array both deserialize into a `Vec`. Affected fields: `server.tls.{cert,key,generate,root}`, `tls.root` (`ClientTls`), `web.https.root`, `auth.tls.root`, `auth.domains`. **Smallest production-fixing PR** of the day; closes a real config-load failure.
- **[PR #1380](https://github.com/moq-dev/moq/pull/1380) MERGED** May 5 18:51:38 UTC by [[luke-curley]] (+130/−127, 7 files) — *moq-lite: port Origin API renames from #1358*. Stacked on #1378. **Ports the public-API renames from #1358 without the new state model.** The existing `OriginNode` tree, `web_async::spawn` cleanup, and tokio mpsc fan-out stay untouched. Renames: `OriginProducer::publish_only` → `scope`; `OriginConsumer::consume_only` → `scope`; `OriginConsumer::try_consume_broadcast` → `get_broadcast`; `OriginProducer::consume_only` and `try_consume_broadcast` **dropped** (callers write `producer.consume().scope(p)` / `.get_broadcast(p)` instead). Rationale: every `consume_xxx` on `OriginProducer` was a one-liner shortcut for `producer.consume().xxx()`. **Picks up the consumer-facing API surface from PR #1358's massive Origin rewrite without merging the substrate change itself.**
- **[PR #1379](https://github.com/moq-dev/moq/pull/1379) MERGED** May 5 19:22:22 UTC by [[luke-curley]] (+110/−11, 3 files) — *Fix DNS resolution to prefer matching address family*. **Fixes DNS resolution issues on Windows and other platforms where sockets may be bound to a single address family.** New utility `pick_addr()` in `util.rs` selects a single DNS entry from multiple results, preferring one whose address family matches the local socket; falls back to the first entry if no family match. Resolves `AddrNotAvailable` errors when DNS returned both A and AAAA but the local socket was bound to only one family. **Cross-platform stability fix** — moq-relay clients on Windows previously saw spurious connect failures.
- **[PR #1381](https://github.com/moq-dev/moq/pull/1381) MERGED** May 5 20:03:32 UTC by [[luke-curley]] — *Update OG image with proper dimensions for social sharing*. Cosmetic, no code impact.
- **[PR #1378](https://github.com/moq-dev/moq/pull/1378) MERGED** May 5 20:08:31 UTC by [[luke-curley]] (+295/−240 across 20 files) — *moq-lite: tighten public API surface and remove deprecated methods*. Body: *"Make `ALPN_*` constants, `MAX_HOPS`, the coding module, and the encode_params!/decode_params! macros crate-private; re-export `DecodeError`/`EncodeError`/`BoundsExceeded` from the crate root. Drop deprecated `TrackProducer::close`, `TrackConsumer::poll_next_group`, `TrackConsumer::next_group` (alias), `FrameProducer::write_chunk`, and the `OriginProducer/OriginConsumer consume_broadcast` methods. The sync lookup is preserved as `try_consume_broadcast` for callers (e.g. libmoq's FFI) that genuinely need it. Rename `TrackConsumer::next_group_ordered/poll_next_group_ordered` back to `next_group/poll_next_group` now that the deprecated aliases are gone, and clarify the `recv_group` vs `next_group` docs. Add `Origin::new(id)` for callers that need a stable identifier. Add a Producers/Consumers and Async section to the crate-level docs, and fill in missing doc-strings across the model module. Migrate moq-relay (`web.rs` uses `announced_broadcast` within the fetch deadline; `cluster.rs` drops the unused `Cluster::get`) and `libmoq / moq-ffi` to the new method names."* Test plan: `cargo check --workspace`, `cargo test -p moq-lite --lib` 278/278 pass. Body marked *"🤖 Generated with Claude Code"*. **Largest API-surface tightening of the moq-lite cycle; finalizes the deprecation queue accumulated since Lite03.**
- **[PR #1356](https://github.com/moq-dev/moq/pull/1356) MERGED** May 5 22:15:50 UTC by [[luke-curley]] (+117/−160, 7 files) — *moq-lite: switch insert_track to take TrackConsumer*. Body: *"Change `BroadcastProducer::insert_track` to take `TrackConsumer` (by value) instead of `&TrackProducer`. Remove `TrackConsumer::produce()` from #1300 — it was added as a workaround that this change supersedes. Add `TrackConsumer::weak()` (`pub(crate)`) so the broadcast can derive its `TrackWeak` from a consumer."* The `&TrackProducer` parameter was effectively a witness that *some* producer existed, but the API misleadingly suggested the broadcast was taking ownership of publishing rights. **Lands the type-level cleanup that was in flight since Apr 28.**
- **[PR #1341](https://github.com/moq-dev/moq/pull/1341) MERGED** May 6 01:20:29 UTC by [[luke-curley]] (+2588/−3594 across 82 files) — *moq-mux backport + dual-API cleanup*. **Largest moq-dev/moq merge of the post-NAB period.** Backports the `moq-mux` structural refactor from `dev` to `main`, then collapses the dual API surface that grew during the merge into a single canonical one. Backport elements: module reorg `moq_mux::import` / `moq_mux::export` / `moq_mux::container` / `moq_mux::convert`; catalog-side `Container::Cmaf { init: Bytes }` (init segment in the catalog) replacing the old `timescale` / `track_id` shape; **all codec support always compiled (no per-codec feature flags)**; lazy track creation, dropped per-track stats/drift tracking, simplified producer lifecycle; `Decoder` → `Framed`, `DecoderFormat` → `FramedFormat`; `convert::cmaf::Convert` and `convert::hang::Convert` for in-process container rewriting; `hang` catalog API: `Audio::insert` / `Video::insert` / `remove`, `OrderedProducer`, `Container::Cmaf { init }` schema. Cleanup (final commit `5e6d5a3`) collapses the parallel APIs in `moq_mux::export`: `OrderedConsumer<F: ContainerFormat>` → `Consumer<F: Container>`; `ContainerFormat` trait → `container::Container` trait; `OrderedFrame` (`BufList` payload) → `container::Frame` (`Bytes` payload); `OrderedMuxer<F>` (static `Vec<(name, OrderedConsumer)>`) → `Muxed` (catalog-driven, handles track changes); `export::Cmaf { timescale }` → `container::Cmaf { trak }`. **Net deletion of ~1000 lines** despite being a backport — much of the dev branch's transient API churn evaporates. ksletmoe-aws's #1359 effectively flowed back into the codebase via this merge in a different shape.
- **[PR #1307](https://github.com/moq-dev/moq/pull/1307) OPENED / updated** May 5 21:45:24 UTC by [[luke-curley]] (+150/−13, 7 files) — *moq-lite: negotiate Lite03+ via legacy SETUP when ALPN is unavailable*. Body: *"Firefox's WebTransport doesn't expose an ALPN selection API, so clients there can never pick `moq-lite-03`/`moq-lite-04`. Previously the fallback SETUP path (bare `moql` ALPN or no ALPN at all) only advertised `[Lite02, Lite01, Draft14]`, stranding Firefox on Lite02. Extend the fallback to advertise every supported moq-lite version in the draft-14 SETUP versions list. When the peer selects Lite03+, gracefully close the bootstrap SETUP stream and run the rest of the session as if it had been ALPN-negotiated (no SessionInfo control messages). Mirror the change in the Rust and TypeScript client/server paths, and add unit + integration tests covering the no-ALPN / `moql` negotiation of Lite03 and Lite04."* **Direct Firefox-WebTransport-compatibility fix.** Lifts Firefox from Lite02-only to full Lite03+ parity via legacy-SETUP fallback.
- **[PR #1338](https://github.com/moq-dev/moq/pull/1338) updated** May 5 22:37 UTC — `chore: release` (moq-bot[bot]). Staging PR for next moq-lite release; rolls in today's merges.
- **[PR #853](https://github.com/moq-dev/moq/pull/853) CLOSED unmerged** May 5 21:45:47 UTC — fcancela's *"Minimal observability metrics (relay & client)"* (+1261/−38, 29 files). **Major housekeeping close** — observability metrics PR was open from a much earlier era of the repo (note: this is from the `kixelated/moq-rs` legacy numbering). No comment on close.
- **[PR #856](https://github.com/moq-dev/moq/pull/856) CLOSED unmerged** May 5 21:45:33 UTC — ac-freeman's *"WIP: Delivery timeout"* (+225/−54, 14 files). Same housekeeping wave; long-stale WIP PR retired.
- **[PR #1374](https://github.com/moq-dev/moq/pull/1374) updated** May 5 16:17 UTC — Lite05 DATAGRAMS PR remains **open**, no merge today. Last activity is a refresh.
- **[PR #1371](https://github.com/moq-dev/moq/pull/1371) updated** May 5 16:07 UTC — `hang: cross-broadcast track references` remains **open**.

**Net**: Luke's largest single-day landings since Apr 29–30. **Six substantive merges (#1341, #1378, #1380, #1379, #1377, #1356)** clean up moq-lite's API surface, fix Windows DNS resolution, accept TOML config strings in list fields, and backport the entire `moq-mux` refactor with deletions. **Lite05 (PR #1374) is still on the open queue**, but the day's work has prepared the ground: API tightening (#1378), Origin API renames (#1380), and config robustness (#1377) all reduce the surface area that the Lite05 PR has to maintain compatibility with. The two-PR housekeeping close (#853, #856) retires multi-year-old open PRs predating the moq-lite split. Firefox-fallback PR #1307 is the day's only **new** open PR — addresses a known Firefox-WebTransport ergonomics blocker by gracefully degrading SETUP through the bare `moql` ALPN.

## moqtail — PR #189 + PR #191 MERGED (per-subscription early-discard, isValidTrackAlias BigInt fix); PR #156 closed in favor of #191; release commits

[[zafer-gurel]] continues the post-umbrella draft-16 release line — two more `moqtail-ts` API fixes and a CI release bump, all in a single ~25-minute window.

- **[PR #189](https://github.com/moqtail/moqtail/pull/189) MERGED** May 5 13:40:06 UTC by zafergurel (+18/−4, 4 files) — *feat(moqtail-ts): set early discard policy per subscription*. Body: *"Early discard policy can be set for each subscription separately."* **Refines the `setEarlyDiscardPolicy` API from May 4's PR #184 (which exposed it as a moqtail-ts-wide setting) to a per-subscription scope.** Subscribers can now apply different slow-stream thresholds to different tracks (e.g. video vs audio, hero vs PiP camera).
- **[PR #191](https://github.com/moqtail/moqtail/pull/191) MERGED** May 5 14:00:08 UTC by zafergurel (+51/−4, 4 files; closes [#156](https://github.com/moqtail/moqtail/pulls/156); co-authored by **@thexeos**) — *fix(moqtail-ts): adds isValidTrackAlias validator*. Body: *"Add `isValidTrackAlias` type guard in `src/client/util/validators.ts`, consolidating three inconsistent checks (`!trackAlias`, `=== undefined`, and a compound condition) into one canonical test that correctly accepts 0 as a valid alias."* **Fixes a BigInt-falsy bug** — several methods used `if (!trackAlias)` to check whether a `Map.get()` returned a value; since `trackAlias` is a `BigInt` and `0n` is falsy in JavaScript (`!0n === true`), the relay's first-assigned `trackAlias = 0` was incorrectly treated as missing. **First moqtail-ts merge with a non-maintainer co-author** — thexeos's PR #156 (filed earlier with the strict-undefined-check approach) was closed unmerged in favor of zafergurel's broader-validator landing, with attribution preserved via Co-Authored-By.
- **[PR #156](https://github.com/moqtail/moqtail/pull/156) CLOSED unmerged** May 5 14:01:57 UTC — thexeos's *"fix(moqtail-ts): use strict undefined check for trackAlias"*. Issue body cited the same draft-16 wire constraint (relay assigns `trackAlias = 0` to first announcer); the maintainer's broader fix landed via #191 with thexeos credited.
- **[PR #190](https://github.com/moqtail/moqtail/pull/190) MERGED** May 5 14:04:21 UTC by github-actions[bot] — *[ci] release*. Cuts the next moqtail release line (presumably v0.9.x continuation) capturing #189 + #191.
- **[PR #179](https://github.com/moqtail/moqtail/pull/179) updated** May 5 10:04:48 UTC by **davemevans** (David Evans) — *docs: add instructions for Firefox testing using private CA*. Still open. Documents the `network.http.http3.disable_when_third_party_roots_found` Firefox config required when running moqtail behind mkcert + private CA. **Today's only externally-authored open PR.**
- **PRs #186 / #187 / #188** (sharmafb's upstream-FETCH 3-PR series) — **all 3 still open**, no movement vs May 4–5 baseline. No new commits or comments.

**Net**: Two-merge polish day on `moqtail-ts`. The per-subscription early-discard refinement (#189) signals that moqtail-ts's slow-stream API is being driven by real-application feedback (likely from the `apps/meet` WebRTC-over-MoQ demo). The thexeos co-authorship in #191 establishes a template for absorbing externally-proposed fixes — the maintainer takes the "right" broader fix while preserving credit. The CI release line (#190) suggests moqtail-ts will publish frequent post-umbrella draft-16 patches as the API is hardened.

## moq-wg/moq-transport — Quiet day; 2-commit SWITCH message-type fix on PR #1378; afrind comment on PR #1604

No new commits, merged PRs, or new issues opened on `main` between May 5 06:00 UTC and May 6 06:00 UTC. Two PR-level updates:

- **[PR #1378](https://github.com/moq-wg/moq-transport/pull/1378) (gwendalsimon SWITCH for client-side ABR) updated** May 5 09:55–09:59 UTC with **two commits**:
  - `c301893` 09:55:31 UTC — *fix(switch): change SWITCH message type from 0x12 to 0x1F*
  - `77e5326` 09:59:51 UTC — *fix(switch): change SWITCH message type to 0x1B*
  Two consecutive code-point assignments in a 4-minute window suggests Gwendal pulled the registry table mid-edit and reconciled to **0x1B** as the final SWITCH type. PR #1378 is **+168/−0, 1 file** (single message-section addition). Open since Nov 24, 2025; received its first push in months as the Joining-FETCH-vs-SWITCH design space heats up.
- **[PR #1604](https://github.com/moq-wg/moq-transport/pull/1604) (martinduke Joining FETCH with subscription) — afrind comment** May 5 16:36:31 UTC. Replying to the design-rationale debate from prior days: *"Luke indicated in another issue a case where you want future SUBSCRIBE groups > FETCH current group > SUBSCRIBE current group. But that also can't be expressed in any form in MOQ today."* Frames the priority-overlap concern as an open gap in the spec rather than a blocker on PR #1604.

Open PR slate unchanged: #1627 (ianswett SUBSCRIBE-with-Joining-Fetch alternative), #1604, #1617, #1615, #1625, #1607, #1544, #1623, #1618, #1621, #1591, #1605, **#1378 (now active)**, #1613.

## moq-wg/loc — Luke OPENS Issue #19 ("How do you encode LOC Private Properties?")

[[luke-curley]] opens the **first new LOC issue since the Apr 30 PR #1624 LOC-properties registry merge.**

- **[Issue #19](https://github.com/moq-wg/loc/issues/19) OPENED** May 5 22:12:11 UTC by **kixelated** ([[luke-curley]]) — *"How do you encode LOC Private Properties?"*. Body: *"The encoding of LOC Public Properties depend on the moq-transport version, but it's how are we supposed to encode private properties? I don't know the version, nor will it be the same between an arbitrary publisher/subscriber with a relay in the middle."* Follow-up self-comment May 5 22:14:17 UTC: *"Based on `vi64` I can guess that moq-transport-17 encoding is being used, but LOC itself is going to have to specify a specific version/encoding for anything in the payload."* **Argues LOC needs to lock down its own version/encoding contract for private properties** rather than implicitly inheriting whatever moq-transport version the connection negotiated — the publisher and subscriber may not even agree on the wire-version since relays can bridge them. **Direct conceptual challenge to LOC's current "borrow moq-transport's encoding" stance**; likely intersects with Yuanchao Chris's earlier #1550 (Properties Type collision moq-16 ↔ loc-01) but at a deeper architectural layer.

## Mailing List — afrind weighs in twice on "Knowing the start of a Subgroup"; pushes back on revisiting Subgroup ID size and varint audit

After 4 implementer voices (ian-swett, mo-zanaty, suhas-nandakumar, luke-curley) probed the single-byte Subgroup ID question on May 4, **[[alan-frindell]] enters the thread** with two replies in a 6-minute window taking a **conservative editor's stance**.

- **[[alan-frindell]] May 5 16:56 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/ikxGhCS3LMvDeEA9YjKF_zPqgBY/)) — replying to Luke Curley's May 4 use-case question (*"What are the use-cases for a sub-group per object/datagram? I think for media, it would be sending each b-frame as a separate sub-group."*). **Pushes back on revisiting Subgroup ID width**: *"We've already been over this ground and I don't see any need to revisit the size of the subgroup ID field."* Counter-frames the prioritization argument: *"Group IDs and Object IDs are varints and are also part of the priority scheme, so 'we only have 1 byte for prioritization' is already the wrong place to start from."* Concedes one editorial gap: *"It would be nice to have a specification for how to rationalize the priority of mixed subgroup and datagram groups that's not 'implementation defined'"* — but tags it as a tertiary concern, not sufficient justification to reopen Subgroup ID encoding.
- **[[alan-frindell]] May 5 17:02 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/-VFBqpRny-7ZehuT7nD20x4GiXg/)) — replying to a Cullen suggestion that group/track/subgroup starts could be addressed simultaneously since they represent the same problem. **Splits the problem into three cases:**
  1. **Group starts** — already solved: *"either it starts at Object ID = 0, or the OP can include a Gap header indicating the objects from 0 - the actual start do not exist."*
  2. **Track starts** — non-trivial because *"publishers can lose state between publishing instances"*. Acknowledges adding a Track Property is plausible but *"we've been at this four years and no one has needed it"* — argues against speculative implementation without demonstrated need.
  3. **Subgroup ID priority overlap** — restates the Group/Object ID varint counter-argument from his earlier message; closes the door on a fresh varint-vs-fixed-width audit.

**Net**: afrind walks back **both fronts of Mo Zanaty's May 4 04:24 UTC varint-vs-fixed-width audit call** (Subgroup ID width + broader varint review) by reframing them as already-decided. Combined with Ian Swett's May 3 22:38 UTC FIRST_OBJECT-bit decision message, the editorial direction now signals: **subgroup-design topics are closed for draft -18; the varint-audit reopening would need fresh on-list advocacy.** Magnus Westerlund's May 4 framing on request-synchronization ("problem-solving, not removal of consensus") stands unanswered by Cullen for a **5th day**.

## Slack #moq — Quiet (no new posts since Tobbe's May 5 06:43 CEST moqlivemock announcement)

`#moq` shows zero new posts in the May 5 06:00 UTC → May 6 06:00 UTC window. The 3 react-clap reactions on Tobbe's announcement are the only post-Slack-MCP-probe activity. `#moq-rs` (C09CG9V7A2Y), `#moq-js` (C09BZ7KH0BZ), `#libquicr` (C08ER7J16BF) all unchanged.

## Other implementations — quiet

- **cloudflare/moq-rs**: No new commits since Apr 13 (Day +23 of upstream-fork quiet).
- **video-dev/moq-js**: No new commits since Apr 16.
- **google/quiche** (`quiche/quic/moqt`): No new commits since the May 5 01:02 UTC `1ceadc7` *"Rewrite MOQT control message parser"* (Vasiliev) — Day +1 of post-rewrite quiet.
- **birneee/quiche_moq**: No new commits since Mar 13.
- **Eyevinn/moqlivemock + warp-player**: No new commits since the May 5 04:15 UTC v0.8.0 release.
- **Eyevinn/moqtransport**: No new commits in window.
- **moq-wg/secure-objects, msf, cmsf, catalog-format, privacy-pass**: No new activity since the May 1 secure-objects editorial wave. Open secure-objects PRs remain #83 (SFRAME RFC ref), #84 (test vectors), #85 (en-dash fix). draft-ietf-moq-secure-objects-01 still **not** on Datatracker.

## tobbee/moq-llm-wiki — No open issues

No new issues. (3 issues all closed: #1 OpenMOQ, #2 broken interop-runner links, #3 factual corrections.)

## MoQ Monthly — No new issue

Archive remains #0 (Mar 3) + #1 (Apr 30 / May 1). Day +5 since #1 publication.

# Interop Runner (May 6 00:36 UTC)

**20 pass / 71 fail / 14 skip** (105 tests). **Flat day** vs May 5 00:37 UTC's identical 20/71/14 — no recovery from the May 5 −4 pass / +4 fail regression. Walking arc: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → **20**. Two consecutive days at the Apr 17–21 floor reading.

Implementation activity in the May 5 02:00 UTC → May 6 00:36 UTC window:
- **moq-dev/moq merged 7 PRs** (#1341, #1356, #1377, #1378, #1379, #1380, #1381) — final merge `34dc7c9` at May 6 01:20 UTC was **after** the May 6 00:36 UTC interop run, so the moq-mux backport (largest of the day) does **not** affect this report. Earlier merges (PRs #1377–#1380, all merged 17:17–22:15 UTC May 5) **could** be reflected if `moq-dev-rs` / `moq-dev-js` builders rebuilt before the run. None of these are wire-format changes; they are API-surface and platform-portability fixes, so wire interop should be preserved.
- **moqtail merged PR #189 + #191 + #190** (May 5 13:40–14:04 UTC). `moqtail-ts`-only changes; Rust relay code unchanged, so the interop matrix should be unaffected on the moqtail-relay rows.
- **moq-transport had no `main` merges** in window.
- **moqtail PR #145 (umbrella draft-16) merged into `main` May 4 19:23 UTC** is now ~30 hours old — the moqtail-relay docker image rebuild that drove the May 5 regression has presumably stabilized. **Net zero on the matrix today** suggests the post-umbrella moqtail-relay state is the new normal until specific pair-level fixes land.

Pair-level diff inspection still warranted to confirm which moqtail × {moq-dev / moq-rs / others} pairs flipped on May 5 and remain flipped today.

---

# Activity (May 4 06:00 UTC → May 5 06:00 UTC)

## moqtail — PR #145 (umbrella draft-16) FINALLY MERGED into main; draft-14 docs removed; setEarlyDiscardPolicy added; sharmafb opens upstream-FETCH 3-PR series

After being open since **March 6** and absorbing 29 commits / 216 files / +17,114 / −11,744, [[zafer-gurel]]'s draft-16 umbrella PR landed on `main`.

- **[PR #145](https://github.com/moqtail/moqtail/pull/145) MERGED** May 4 19:23:22 UTC by **zafergurel** — *feat: draft-16 compatibility*. Body: *"Here is a substantial PR thanks to the huge difference between draft-14 and draft-16."* Brings moqtail into full compliance with [draft-ietf-moq-transport-16](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16). Highlights from the merge body:
  - **Setup/Session**: New ALPN-based ClientSetup/ServerSetup negotiation (#132). Two new demo apps: `apps/client-js` (browser subscriber) and `apps/meet` (WebRTC-over-MoQ video conferencing demo). Renamed `request_id` → `max_request_id` (#146).
  - **Control Message Overhaul**: Replaced VersionParameter with **MessageParameter** (#153) — typed parameters: `DeliveryTimeout`, `Expires`, `Forward`, `GroupOrder`, `LargestObject`, `NewGroupRequest`, `SubscriberPriority`, `SubscriptionFilter`. **Track Extensions** + **Object Extensions** (#155) added across `Publish`/`Subscribe`/`Fetch`/`PublishOk`/`SubscribeOk`/`FetchOk`. **Unified request ID registry** (#163).
  - This is the largest single moqtail merge since the project's draft-14 baseline; the `draft-16` integration branch (existed since Mar 6) is now collapsed into `main`.
- **[PR #181](https://github.com/moqtail/moqtail/pull/181) MERGED** May 4 19:39:57 UTC by zafergurel — *refactor: clean up object status values* (closes Issue #117 *"Remove 0x1 from Object Status"*).
- **[PR #182](https://github.com/moqtail/moqtail/pull/182) MERGED** May 4 20:12:09 UTC by zafergurel — *docs: remove draft 14 texts*. **moqtail formally drops draft-14 documentation** ~30 minutes after the umbrella draft-16 lands. moqtail is now a single-draft project (draft-16).
- **[PR #184](https://github.com/moqtail/moqtail/pull/184) MERGED** May 4 21:21:20 UTC by zafergurel — *feat: add setEarlyDiscardPolicy to moqtail-ts API* (+85/−38). Body: *"add setEarlyDiscardPolicy to cancel slow subgroup streams after a configurable timeout."* New developer-facing API for slow-stream protection.
- **README updated** May 4 20:27 UTC by **Ali C. Begen** (`1d39865`) — first commit on `main` from the co-maintainer in this update window.
- **CI release commits** (#173, #183, #185) bumped versions on `main`. v0.9.x release line presumably published.
- **PR #186 OPENED** May 4 21:37:33 UTC by **sharmafb** (Aman Sharma) — *[upstream fetches] Add command-line args for FETCH upstream timeout and gap limit [1/n]* (+15/0). Body: *"This is going to be the first in a series of commits that aims to implement upstream fetches."* Underscore-prefixed unused vars to be filled in by [2/n] and [3/n].
- **PR #187 OPENED** May 5 02:35:51 UTC by **sharmafb** — *[upstream fetches] Plumbing to forward FETCH data received from upstream [2/n]* (+71/−6, 4 files). Body: *"making some plumbing changes so that in handle_uni_stream, when we receive objects in a stream from the upstream, we can forward it to the downstream."*
- **PR #188 OPENED** May 5 02:50:23 UTC by **sharmafb** — *[upstream fetches] Function to send upstream fetch [3/n]* (+154/−8, 5 files). Body: *"writing a function send_upstream_fetch_for_range to send FETCHes upstream."*

**Net**: moqtail's biggest week of the year. The draft-14→draft-16 wholesale migration on `main` is done; the relay can now host upstream FETCH plumbing as a feature increment (Aman Sharma's 3-PR series). Combined with the May 4 20:02 UTC `fix: fix relay url for the player`, moqtail is positioning for a clean draft-16 production release.

## moq-dev/moq — Luke OPENS PR #1374 (DATAGRAMS control stream + QUIC datagram delivery, Lite05 wire version)

[[luke-curley]] introduced moq-lite's biggest wire-level addition since the protocol's inception — opt-in unreliable datagram delivery as a brand-new wire version.

- **[PR #1374](https://github.com/moq-dev/moq/pull/1374) OPENED** May 4 22:57:32 UTC by [[luke-curley]] — *moq-lite: add DATAGRAMS control stream + QUIC datagram delivery (Lite05)* (+1615/−7 across 21 files; both Rust and TypeScript libraries). Body: *"New wire version Lite05 / DRAFT_05 (ALPN moq-lite-05, code 0xff0dad05) gating an opt-in unreliable delivery path."* Key elements:
  - **New `DATAGRAMS` bidi control stream (`0x6`)** parallel to `SUBSCRIBE`. Sharing the same `subscribe_id` namespace lets a single QUIC datagram body be routed by ID alone.
  - **QUIC datagram body**: `subscribe_id (i) | sequence (i) | payload (b)`, **payload capped at 1200 B**. Sequence number is preserved on the wire (ignored by Lite05 semantics) so a future moq-transport adapter can reuse the encoding.
  - **33 ms publisher-side cache**; per-subscriber `max_latency` filters stale entries on forward. *"max_latency = 0 is strict: only fresh arrivals (no congestion-delayed retries)."*
  - **Public API**: groups-mirroring — `TrackProducer.write_datagram` / `append_datagram`, `TrackConsumer.subscribe_datagrams` → `DatagramsConsumer`. JS exposes `Track.writeDatagram` / `appendDatagram` / `recvDatagram` / `skipDatagramsToLatest`.
  - **Spec draft** section + Lite05 changelog entry live in the separate `moq-wg/moq-drafts` repo.
  - 17 new Rust tests, 12 new TS tests; manual-relay round-trip and Lite04↔Lite05 cross-version sanity still pending.
  - PR body explicitly notes: *"🤖 Generated with Claude Code"*.
- **[PR #1356](https://github.com/moq-dev/moq/pull/1356) updated** May 4 23:10 UTC by [[luke-curley]] — *moq-lite: switch insert_track to take TrackConsumer* (+39/−93). Body: *"The `&TrackProducer` parameter was effectively a witness... `TrackConsumer` is the honest type for 'I have a handle to this track.'"* Removes `TrackConsumer::produce()` from #1300.
- **[PR #1373](https://github.com/moq-dev/moq/pull/1373) updated** May 4 22:25 UTC by **skirsten** — playback stalls / frame-rate beating fix (still open, follow-up to PR #1367).
- **[PR #1341](https://github.com/moq-dev/moq/pull/1341) updated** May 4 22:24 UTC by [[luke-curley]] — *Refactor media producers and simplify fMP4 CMAF passthrough* (+3808/−2025 across 79 files). Includes module reorg `moq_mux::import` → `moq_mux::producer`, removed feature gates, init-segments now base64-encoded ftyp+moov in catalog.

**Net**: PR #1374 introduces the **Lite05** wire version with optional datagram delivery, opening a new dimension to moq-lite's design — the framework for low-latency unreliable transport as a peer to subgroup-stream delivery. The 33ms freshness cap is a firm latency target; per-subscriber `max_latency` is a novel knob. Lite05 spec text lives in moq-drafts (a separate repo not yet visible to the wiki crawler). Notable that this is a **wire-version increment** (Lite04 → Lite05) — earlier moq-lite changes typically remained inside Lite04.

## moq-wg/moq-transport — Quiet (no new PRs / merges in the window)

No new commits, merged PRs, or issues opened on `main` between May 4 06:00 UTC and May 5 06:00 UTC. Open PRs unchanged: #1627 (ianswett SUBSCRIBE-with-Joining-Fetch alternative), #1604 (martinduke Joining FETCH carry on SUBSCRIBE stream), #1617 (afrind GOAWAY individual requests), #1615 (ianswett Remove RRID, *Merge Ready*), #1625 (Magnus Security rebase), #1607 (Largest Available Group filter), #1544 (Improve Startup Latency / 0-RTT), #1623 (Remove Request ID from GOAWAY), #1618 (FIRST_OBJECT bit), #1621 (Forbid relays lying about LARGEST_OBJECT), #1591 (flow control for Subscriptions), #1605 (Split DELIVERY_TIMEOUT), #1378 (SWITCH for client-side ABR), #1613 (MAX_REQUEST_UPDATES setup option).

## google/quiche `moqt` — First commit since Apr 22 (Day +13)

- **`1ceadc7`** May 5 01:02:22 UTC — *Rewrite MOQT control message parser* (Vasiliev). **First moqt commit on `google/quiche` `main` since the Apr 22 `1004527` "Allow MoqtClient and MoqtServer to control session parameters."** Ends a 13-day quiet period. Suggests Vasiliev is back on the moqt subtree after the late-April pause.

## Mailing List — Heavy May 4 day; 'Knowing the start of a Subgroup' (single-byte Subgroup ID debate continues), 'Request Synchronization Use Case' (Magnus replies), Magnus on minutes quality

After Cullen's May 1 *"Request Synchronization Use Case"* sat unanswered for 3 days, [[magnus-westerlund]] returned to the list and replied substantively. The Subgroup ID thread also got a fresh round, this time digging into single-byte feasibility.

### Knowing the start of a Subgroup (4 new May 4 messages)

- **[[ian-swett]]** May 4 12:56 EDT (16:56 UTC) ([msg](https://mailarchive.ietf.org/arch/msg/moq/dpfivbI043m20hxziKNBYN38V2I/)) — replies to Mo Zanaty's varint critique. **Calls limiting Subgroup ID to a single byte *"a very appealing change"***, but flags the cost: *"if you wanted to do Object-per-Subgroup and couldn't or didn't want to use datagrams, you'd be limited to 256 Objects per Group."* References Issue #1405 (single-object subgroups). Repeats the broader concern: both Subgroup ID and Priority overlap as prioritization mechanisms within a Group; Priority was previously agreed to be a single byte, while Subgroup ID currently creates a much larger namespace. *"Maybe I'm overthinking it... worth exploring simplifications."*
- **[[mo-zanaty]]** May 4 17:36 UTC ([msg](https://mailarchive.ietf.org/arch/msg/moq/xShnVHc5vXqEBrhUfU8czjTnkkU/)) — proposes a workaround for object-per-subgroup applications: *"transmit numerous objects as separate streams using identical identifiers (such as 0) and reset values."* Acknowledges this is inelegant, suggests a **specialized header format for single-object streams** as an alternative — references Issue #1405, notes conceptual similarity to datagrams, and proposes a dedicated header type combining desired characteristics of both. **If stream-per-object is achievable without consuming many Subgroup IDs, a single byte for Subgroup ID would suffice.**
- **[[suhas-nandakumar]]** May 4 17:40 UTC (10:40 PDT) ([msg](https://mailarchive.ietf.org/arch/msg/moq/JHLULNLlNJ-o_RikD_XB8Ba-2-4/)) — *"Is there a use-case where we need more than 256 subgroups and needs to be considered for prioritization? I cannot think of one but appreciate inputs from others."*
- **[[luke-curley]]** May 4 20:00 UTC (13:00 PDT) ([msg](https://mailarchive.ietf.org/arch/msg/moq/tPHPb_3nf893KMqICMIUJqE0NFI/)) — questions the use case: *"What are the use-cases for a sub-group per object/datagram? I think for media, it would be sending each b-frame as a separate sub-group."* Asks the WG how prioritization should work in that pattern.

### Request Synchronization Use Case (3 May 4 replies; thread breaks 3-day silence)

- **[[magnus-westerlund]]** May 4 10:04 UTC ([msg](https://mailarchive.ietf.org/arch/msg/moq/bSQf02Wcdvul4VNWro4_WikggSM/)) — replies to Cullen's May 1 framing. **Clarifies the WG poll was about whether request synchronization needed resolution in draft-18, with intent to defer discussion to London.** *"The discussion also indicated that there are some different views on why a request synchronization mechanism is needed. Thus, we asked for clarification on the use cases from the WG participants to enable discussion and proposals."* Proposes two paths: explicitly state request-synchronization capability remains, **or** retain `required_request_id` in draft -18 with notes documenting its issues. **Frames this as problem-solving, not removal of consensus.**
- **[[magnus-westerlund]]** May 4 10:15 UTC ([msg](https://mailarchive.ietf.org/arch/msg/moq/UoDRMucPSFVAKzwJPeKVex1f0Io/)) — follow-up clarifier. **Asks Cullen to detail three specific scenarios**: (1) Swap Tracks (does pausing use REQUEST_UPDATE forward-flag, or new subscriptions w/ termination?), (2) Client Side ABR (REQUEST_UPDATE / new subscriptions / SWITCH?), (3) Pause/Unpause (*"requests will be delivered and processed in the order transmitted assuming the QUIC connection doesn't time out."* — questions whether reorder-via-REQUEST_UPDATE is achievable).
- **[[luke-curley]]** May 4 17:10 UTC (10:10 PDT) ([msg](https://mailarchive.ietf.org/arch/msg/moq/6X8WPyp6GXcTVnMgN8D1aozmEbc/)) — identifies a **deadlock concern with draft-17's `required_request_id`**: *"if either side RESETs a request, it can cause a deadlock. The peer may never learn about a specific `request_id` referenced via a `required_request_id` so it will block (until some timeout)."* States the issue is *"addressable"* — alternative approaches may exist; encourages clarifying actual use cases.

### Re: Minutes from Interim meeting 27 of April 2026

- **[[magnus-westerlund]]** May 4 07:59 UTC ([msg](https://mailarchive.ietf.org/arch/msg/moq/ykbgFMG2I4KaMtzhlah8gc1u1rQ/)) — responds to Cullen's earlier criticism about minutes quality. *"Minutes at least indicating which issues was discussed, some of the argument and outcome"* serves as a useful pointer for deeper investigation; full details are in the Meetecho recording transcript. **Proposes more discussion via email**: *"For keeping the arguments more easily available we should in fact have more discussion over email as there the full argumentation would be available in the mail archive."* Implicit position: list-as-system-of-record over interim minutes.

**Net**: This is the **first substantive activity from Magnus Westerlund on the list since the REWIND consensus call** — three messages in a single day, all on contested topics (Cullen's request-sync framing, minutes quality, deferral to London). Magnus appears to be re-engaging the list as the formal venue for unresolved post-interim issues. Cullen has not yet replied to either Magnus message.

## Slack #moq — Day +7 silence broken; yuyou (London venue), Martin Duke ("yes"), Tobbe (moqlivemock 0.8 / MSF / LOC / WebCodecs / moq-mi)

The 7-day silence on `#moq` since Giovanni Marzot's Apr 27 `:disappointed:` ended.

- **yuyou** May 4 08:47 CEST — *"For the June interim in London, are the interop and the meeting at the same venue?"* Logistics question for London hybrid-interim.
- **[[martin-duke]]** May 4 16:19 CEST — single-word reply: *"yes"*. Confirms interop and meeting share venue.
- **[[torbjorn-einarsson]]** May 5 06:43 CEST — announces moqlivemock + warp-player update: *"I've updated moqlivemock and warp-player to support MSF/LOC and use WebCodecs for rendering. There is the same wall-clock synchronized loop with AVC, HEVC, AAC, Opus content as for CMSF/LOC. I also added moq-mi support to the server and to my Go client, so it may be interesting to interop test it."* Demo URL: [https://moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io). **First confirmation that moqlivemock now ships LOC + MSF + moq-mi support alongside CMSF.**

## Eyevinn repos (moqlivemock, warp-player) — v0.8.0 release wave; LOC HEVC + WebCodecs LOC pipeline

Tobbe's [[moqlivemock]] and [[warp-player]] both bumped to **v0.8.0** in coordinated May 4–5 commits.

- **moqlivemock** `d174037` May 5 03:59 UTC — *chore: bump version to 0.8.0*.
  - `77d67b0` May 3 22:13 UTC — *feat(catalog): expose accurate per-packaging bitrate*.
  - `2d08ea1` May 3 21:20 UTC — *feat(loc): add HEVC support for LOC packaging*. Closes Issue #23 (*Add support for LoC*) via PR #76.
  - PR #77 *feat(catalog): expose accurate per-packaging bitrate* MERGED May 5 03:47 UTC.
  - PR #78 *Version 0.8.0* MERGED May 5 04:04 UTC.
- **warp-player** `05ded99` May 5 04:15 UTC — *chore: bump version to 0.8.0*.
  - `421e8da` May 5 03:54 UTC — *docs: cover MSF catalog and WebCodecs LOC pipeline in README and CLAUDE.md*.
  - `48378e9` May 3 21:32 UTC — *feat(loc): add HEVC support to WebCodecs LOC pipeline*.
  - `f154020` May 3 20:56 UTC — *fix(transport): handle wt.closed rejection so Safari doesn't flag it*.
  - `95a653d` May 3 20:36 UTC — *feat(ui): add engine legend, mute toggle, and namespace filtering*.

**Net**: Eyevinn's v0.8.0 wave covers HEVC for LOC, MSE+WebCodecs LOC pipelines, namespace filtering UI, and the Safari `wt.closed` rejection fix. Combined with the moq-mi support announced on Slack, moqlivemock now exercises four packaging formats (CMSF, LOC, MSF, moq-mi) and warp-player exercises both MSE and WebCodecs rendering paths. Major step forward for media-format interop.

## moq-wg/secure-objects, msf, loc, cmsf, catalog-format, privacy-pass — Quiet

No new activity since the May 1 editorial wave for secure-objects. Open secure-objects PRs remain #83 (SFRAME RFC ref), #84 (test vectors), #85 (en-dash fix). draft-ietf-moq-secure-objects-01 still **not** on Datatracker.

## tobbee/moq-llm-wiki — No open issues

No new issues since #3 (factual corrections) closed earlier this week.

## Other implementations — mostly quiet

- **cloudflare/moq-rs**: No new commits since Apr 13 (Day +22 of upstream-fork quiet).
- **video-dev/moq-js**: No new commits since Apr 16.
- **birneee/quiche_moq**: No new commits since Mar 13.

# Interop Runner (May 5 00:37 UTC)

**20 pass / 71 fail / 14 skip** (105 tests). **Major regression**: −4 pass / +4 fail vs May 4 00:38 UTC's 24/67/14. Walking arc since the Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → **20**. **Largest single-day regression since Apr 17 (back to that floor level).**

Most plausible cause: image rebuilds for `moqtail-relay` and `moq-dev-rs` / `moq-dev-js` now picking up large changes from May 3–4:
- **moqtail PR #145 merged May 4 19:23 UTC** — `main` now reflects the wholesale draft-14→draft-16 migration (216 files, +17,114/−11,744). Substantially new wire behavior on the moqtail-relay rows.
- **moq-dev/moq PR #1359 closed May 4 21:25 UTC** (Consumer unify across container formats) — referenced as the Consumer refactor path; status shown as closed (not merged).
- The May 5 build also predates moq-dev's PR #1374 (DATAGRAMS Lite05) which was opened May 4 22:57 UTC and is not yet merged.

The regression is large enough that pair-level diff inspection is warranted; it likely reflects a moqtail × {moq-dev / moq-rs / others} pair flipping fail after the umbrella merge.

---

# Activity (May 3 06:00 UTC → May 4 06:00 UTC)

## moq-wg/moq-transport — ianswett OPENS Issue #1627 (SUBSCRIBE with Joining Fetch — alternative to martinduke's PR #1604)

- **[Issue #1627](https://github.com/moq-wg/moq-transport/issues/1627) OPENED** May 3 07:40:15 UTC by [[ian-swett]] — *"SUBSCRIBE with Joining Fetch"*. Body: *"A different take on #1604 that adds two new modes to SUBSCRIBE instead of allowing Joining FETCH to be sent on the SUBSCRIBE stream."* Notes: (1) *"Might be able to remove Request ID once #1615 lands"*, (2) *"Could use some more text on what happens to the FETCH_HEADER stream if the Subscription is cancelled"*, (3) *"Could use clarification on how prioritization of Objects is intended to work."* **Fixes #1039, #1313, #1602, #1612** — same set [[martin-duke]]'s [PR #1604](https://github.com/moq-wg/moq-transport/pull/1604) targets, framed as a competing simpler design (collapse the function into SUBSCRIBE message types instead of carrying Joining FETCH on the SUBSCRIBE stream).
- **[PR #1604](https://github.com/moq-wg/moq-transport/pull/1604) — ianswett comments** May 3 06:39 + 06:42 UTC, replying to gwendalsimon's Apr 16 SWITCH-relay-proactive-FETCH framing: *"Thanks for the detailed reply, as well as your reply on the list, that was helpful for me. I'd like to put the question of whether Objects are delivered on the control stream in your SWITCH proposal and this one as a separate question. If we want to do that, we should do it for FETCH as well. **This conversation makes me think using a single message would be better.**"* Then on the priority concern: *"I thought about this, and I don't think there's a compelling use case for updating the priority separately. You're issuing a message to Join a Track... I can't imagine a case when you're much more interested in the FETCH data, but not more interested in the SUBSCRIBE data."* The two May 3 comments are the proximate trigger for opening Issue #1627 ~1 hour later.

**Net**: Joining FETCH redesign now has two competing live proposals — Martin Duke's PR #1604 (carry Joining FETCH on the SUBSCRIBE stream) vs. Ian Swett's Issue #1627 (collapse Joining FETCH into new SUBSCRIBE modes). Both target the same four issues (#1039 / #1313 / #1602 / #1612). No other new transport activity in the window.

## Mailing List — "Knowing the start of a Subgroup" thread reignites; ianswett commits to FIRST_OBJECT bit; Mo Zanaty raises broader varint concern; weekly GitHub digest

After 3 days of relative quiet, the *"Knowing the start of a Subgroup"* thread restarted late on May 3 with a clear direction signal from Ian Swett.

- **[[ian-swett]]** May 3 22:38 UTC ([msg](https://mailarchive.ietf.org/arch/msg/moq/dL1-WD_iTNa4WR-dHfZrHPKhNXA/)) — thanks Mo Zanaty for the detailed earlier response and **announces decision to proceed with the bitfield approach** (the FIRST_OBJECT bit in [PR #1618](https://github.com/moq-wg/moq-transport/pull/1618), already approved). Raises a small reservation: *"having both Subgroup ID and Priority serve as methods for prioritizing objects within a group"* — previously the WG agreed priority should be limited to a single byte, but Subgroup ID creates a much larger namespace. *"Likely no practical problem, but suggests exploring potential simplifications to the Object model that wouldn't compromise real-world applications."* Effectively closes the design dispute: PR #1618 (FIRST_OBJECT bit) is the WG-adopted answer, confirming the May 1 PR #1608 closure.
- **[[mo-zanaty]]** May 4 04:24 UTC ([msg](https://mailarchive.ietf.org/arch/msg/moq/_OwGvDKV9OaYxgOc6tJH7osmn3I/)) — replies to Ian's post by **broadening the topic**: proposes reconsidering varints across the spec, suggesting *"Subgroup ID to a single byte"* could be more appropriate than the current implementation. Argues varints were applied as default encoding without sufficient justification, and recommends a **broader review of all variable-length integer fields** to determine whether they genuinely require that encoding approach. **First explicit on-list call for a varint-vs-fixed-width audit** — could be picked up as London hybrid-interim agenda item.
- **Repository Activity Summary Bot** May 3 ([msg](https://mailarchive.ietf.org/arch/msg/moq/umr1H3WzgiNKptknCbeSZHCNCCg/)) — weekly GitHub digest covering moq-wg repos (transport, charter, requirements, warp-streaming-format, loc, wg-materials). For moq-transport: *"3 new issues created (incl. QMUX version negotiation, Request ID in GOAWAY isn't useful), 12 issues received 15 comments, 14 issues closed, 10 PRs submitted."* Notable PRs: #1625 (Magnus Security Considerations rebase), #1615 (Remove Required Request ID — *"Merge Ready"*), #1608 (Subgroup ID, 6 comments), #1607 (Largest Available Group filter). For warp-streaming-format: *"2 PRs incl. SCTE-35 + CEA-608/708 accessibility fields and initial zapping specifications"* — first wiki-visible mention of warp-streaming-format SCTE-35/CC PR work this cycle.

**Net**: The May 1 PR #1608 closure is now formally backed by an on-list direction message from Ian; Mo Zanaty's varint concern reopens at a higher level (codec-class encoding choices) rather than relitigating the closed PR. No chair-summary message on REWIND consensus has appeared — Day +3 since the May 1 deadline.

## moq-dev/moq — skirsten OPENS PR #1373 fixing PR #1367 (pull-mode renderer); ksletmoe-aws revises PR #1359

- **[PR #1373](https://github.com/moq-dev/moq/pull/1373) OPENED** May 3 16:53:49 UTC by **skirsten** (+146/−144, *@moq/watch: fix playback stalls and frame-rate beating*, **closes #1367**). Body terse: *"Detailed description of both fixes is in the commits."* Effectively a follow-up that supersedes the pull-mode-renderer work in PR #1367 (skirsten, opened May 1) — same author, near-zero net diff, addresses two distinct symptoms (playback stalls + frame-rate beating). coderabbitai bot review May 3 17:02 UTC: *"No actionable comments were generated in the recent review."* skirsten now has 4 PRs in the May 1–3 window (#1349 catalog merged, #1365 AudioContext merged, #1367 still open, #1373 superseding #1367).
- **[PR #1359](https://github.com/moq-dev/moq/pull/1359) updated** May 3 04:30 UTC by **ksletmoe-aws** — *feat(player): unify Consumer across container formats* (now +1002/−1173 across 14 files, vs. earlier reading of +971/...). Author note: *"Replace the two separate consumer implementations (Legacy and CMAF) with a single generic `Consumer` class that accepts a `ContainerFormat` strategy for frame parsing. This mirrors the Rust `moq-mux` `Consumer<F: Container>` pattern and eliminates ~90% code duplication. Additionally, add a `sequential` delivery mode flag to fix audio stuttering caused by inter-group serialization."* Earlier Luke review nits (May 2 20:47–20:49): *"Just call it `Frame`... `Legacy.LegacyFormat` should be avoided IMO... We should reuse `Frame` and `DecodedFrame`."* The May 3 push presumably addresses those nits — first revision turn-around since Luke's Apr 30 design suggestion.
- **No new merges in the window.** PR #1370 (metapox PriorityQueue fix), PR #1371 (Luke cross-broadcast track refs), PR #1367 (skirsten pull-mode), PR #1373 (skirsten playback fix), PR #1359 (ksletmoe-aws Consumer unify), PR #1362 (Qizot audio reconfiguration), PR #1356/#1358/#1341 (Luke earlier work) all open.

## moqtail — PR #145 (umbrella draft-16) gets 3 race-condition / logging commits May 3

The DRAFT: draft-16 umbrella PR ([PR #145](https://github.com/moqtail/moqtail/pull/145), zafergurel, open since Mar 6) picked up three new commits May 3:

- `6f79910` 18:10 UTC *fix: fixes a race condition*
- `ee9f7e0` 19:02 UTC *refactor: proper logging for moqtail-ts*
- `ad78f25` 23:39 UTC *fix: fixes a race condition*

Two race-condition fixes ~5.5 hours apart bracket a logging-refactor commit. Now at 29 commits, +17187/−11733, 240 files vs. main. Still not landed on `main` despite PR #180 (separate stream for SUBSCRIBE_NAMESPACE) merging into the `draft-16` branch May 1.

## moq-wg/secure-objects, msf, loc, cmsf, catalog-format, privacy-pass — Quiet

No new activity since the May 1 editorial wave. Open secure-objects PRs remain #83 (SFRAME RFC ref), #84 (test vectors), #85 (en-dash fix). draft-ietf-moq-secure-objects-01 still not on Datatracker.

## Implementation repos (moq-rs / moq-js / google/quiche / birneee) — Quiet

- **cloudflare/moq-rs**: No new commits since Apr 13 (Day +21 of upstream-fork quiet).
- **video-dev/moq-js**: No new commits since Apr 16.
- **google/quiche** `quiche/quic/moqt`: No new commits since Apr 22 (Day +12).
- **birneee/quiche_moq**: No new commits since Mar 13.

## Slack — Day +7 of #moq silence

`#moq` (C046V0QF3CK) shows no new posts since Apr 27 18:50 CEST (Giovanni Marzot's :disappointed:). `#moq-rs` (C09CG9V7A2Y), `#moq-js` (C09BZ7KH0BZ), `#libquicr` (C08ER7J16BF) all quiet.

## MoQ Monthly — No new issue

Archive shows #0 (Mar 3) and #1 (Apr 30 / May 1) only. Day +3 since #1 publication.

## tobbee/moq-llm-wiki — No new issues

3 issues all closed (#1 OpenMOQ, #2 broken interop-runner links, #3 factual corrections). No new requests.

# Interop Runner (May 4 00:38 UTC)

**24 pass / 67 fail / 14 skip** (105 tests). **Flat day vs. May 3**: identical to May 3 00:38 UTC's 24/67/14. Walking arc since the Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → **24**. The May 2 21:18 UTC PR #1372 revert (Luke removing the partial fetch_group / Subscription API) presumably reached the moq-dev-rs / moq-dev-js builder before this run, so any restoration-effect from the revert is already baked in — net zero on the matrix.

---

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
