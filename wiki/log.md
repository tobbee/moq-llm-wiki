---
title: Wiki Log
tags: [log, maintenance]
date: 2026-04-14
last_updated: 2026-05-15
status: current
---

Chronological record of all ingestions, queries, and maintenance operations.

# 2026-05-15 — interop registry expands by 4; AWS lands in moq-dev/moq; post-draft-18 issue triage pattern emerges

**TL;DR**:
- **First mass expansion of the interop matrix in 2026**: [[mike-english]] **MERGED 4 long-pending interop-runner PRs in 2 minutes May 13 17:23–17:25 UTC** — [PR #67](https://github.com/englishm/moq-interop-runner/pull/67) (gmarzot **aiomoqt**, Python asyncio MoQT client) 17:23:32 UTC, [PR #66](https://github.com/englishm/moq-interop-runner/pull/66) (gmarzot **moqx client role**) 17:24:28 UTC — first OpenMOQ-author merge post-May-9-fork-incident, [PR #63](https://github.com/englishm/moq-interop-runner/pull/63) ([[tobbe-einarsson]] / Eyevinn **mlmtest** moqlivemock client) 17:25:14 UTC — Day +31 from open, [PR #65](https://github.com/englishm/moq-interop-runner/pull/65) (**yuyou / Nokia** Docker RELAY_URL support) 17:25:58 UTC. Registry grows from **11 → 15 roles** (mlmtest + moqx-client + aiomoqt + Nokia-via-Docker-URL). **Second-order effect**: matrix has not produced a May 14 or May 15 daily run — 2 consecutive missed cadences. Either intentional re-baselining or CI gating; carry-forward is the May 16 run as the structural-stability check. **AWS enters moq-dev/moq**: [PR #1408](https://github.com/moq-dev/moq/pull/1408) OPENED May 14 18:20 UTC by **ksletmoe-aws** (Kevin Sletmoe at AWS) — *"feat(moq-mux, libmoq): add CMSF muxer, demuxer, and C API"* (+3891/−457, **largest single PR to moq-dev/moq in 2026**). Brings CMSF muxer/demuxer + **C FFI surface** to the moq-dev stack alongside existing Rust + TypeScript. moq-dev corporate-contributor footprint now: Cloudflare (englishm review activity), Nokia (yuyou), Eyevinn (tobbee adjacent), OpenMOQ (gmarzot via interop-runner), and now **AWS** (ksletmoe-aws). **Post-draft-18 issue triage pattern emerges in moq-transport** (3 actions same day May 14): [[alan-frindell]] 18:43 UTC on Issue #1632 (cross-spec Properties collision) — *"The LOC authors will create a new loc draft, and update the appendix in moq to reflect it so we don't keep having this problem"* (defers to LOC editorial fix); Issue #1631 (codec switching) **TRANSFERRED to MSF as #162** after [[victor-vasiliev]] May 14 11:56 UTC: *"Either way, this is an MSF issue, and not MOQT"* + [[will-law]] 16:41 UTC MSF confirmation — **first cross-spec issue transfer post-draft-18**, sets the routing precedent (codec/encoding belongs to MSF); afrind 19:01 UTC closes 18-month-old Issue #607 (*"Group Order for Subscriptions ?"*) as keep — *"Folks seems to have use cases for this. Closing."* Pattern: WG editors actively route-and-defer rather than reopen MOQT debate.
- **Implementations**: **moq-dev/moq breaks 5-day quiet** — [[luke-curley]] **merges 4 PRs in ~12 hours May 14 16:45 → May 15 04:37 UTC**: PR #1402 (SteveMcFarlin moq-gst CAPS+EOS — first merge from 2nd new contributor of May), PR #1407 (kixelated *"Bump package versions across JS packages"* with explicit `Co-authored-by: Claude` trailer), PR #1399 (skirsten MultiBackend close), PR #1400 (skirsten PromiseReactions leak). Release-bot PR #1391 *"chore(moq-lite): release v0.16.1"* opens May 15 04:39 UTC. **google/quiche moqt — 2 more commits May 14 22:49 + 23:03 UTC by [[martin-duke]]** (OutgoingDataStream refactor + OutgoingSubgroupStream cleanup) bringing total to **8 commits in 3 days** (May 12–14) — most concentrated quiche-moqt activity of 2026. **Eyevinn moqlivemock [PR #79](https://github.com/Eyevinn/moqlivemock/pull/79) (hugobjoers LOCMAF support) MERGED May 14 08:08 UTC, +2886/−83 — largest moqlivemock PR of 2026**; warp-player PR #120 (same author) still open. moqtail quiet post-PR-193 release cycle. cloudflare/moq-rs Day +32 main-quiet; PR #167 untouched Day +5. video-dev/moq-js / birneee/quiche_moq / Eyevinn/moqtransport / Quicr/cat-token all quiet.
- **Interop**: **No new run** since May 13 00:41:38 UTC reading of **19 / 72 / 14** (note: prior wiki entries recorded `19/71/14` for this reading; the results page shows `19/72/14`, total 105). **2 consecutive missed daily cadences** (May 14 + May 15) aligning precisely with the 4-PR registry-expansion merge at May 13 17:23–17:25 UTC. Plausible causes: (a) new-15-role matrix re-baselining intentionally paused, (b) a new image build failing CI and gating the run, (c) operator absence. Carry-forward: **the May 16 run is the structural-stability check** — a successful run with **higher total-tests count** would confirm matrix expansion; another miss means the cadence is structurally broken.

**Operation**: Update
**Sources**:
- Slack: `#moq` — **1 new event** in the May 14 09:00 UTC → May 15 09:00 UTC window: **Dragana Damjanovic (Mozilla) May 14 18:09 CEST joined `#moq`** — first Mozilla-affiliated public join on the wiki record (Dragana is well-known in QUIC circles via Neqo); reads as Mozilla observation interest post-draft-18 + recharter. No messages. `#moq-rs`, `#moq-js`, `#libquicr`, `#moq-interop-runner` all unchanged.
- GitHub moq-wg repos:
  - **moq-transport** — **Issue #1632** (cross-spec collision) afrind May 14 18:43:18 UTC comment establishing LOC-new-draft + appendix-sync resolution path; **Issue #1631** (codec switching) **TRANSFERRED** to **moq-wg/msf Issue #162** after vasilvv May 14 11:56 UTC + wilaw May 14 16:41 UTC confirmations; **Issue #607** (Group Order for Subscriptions, Suhas Nov 2024) **CLOSED** May 14 19:01:43 UTC by afrind as keep. **PR #1476** (afrind delivery timeouts, Feb 9) updated May 14 11:50 UTC — needs rework after PR #1605 landed (DELIVERY_TIMEOUT split).
  - **moq-wg/msf** — **Issue #162 ACTIVE** (transferred from moq-transport #1631): wilaw May 14 16:41 UTC framing the MSF position (new track, not codec switch). Issue #153 (vasilvv `initTrack` does not work) still updated within window. PR #159 (catalog compression) updated May 15 04:45 UTC; PR #157 (group numbering) and PR #156 (object-stream mapping) quiet.
  - **moq-wg/loc** — Issue #20 (LOC-02 Properties collision, yuanchao-chris May 14) — no further activity; resolution path is the LOC-new-draft afrind referenced. Issue #19 (Luke Curley LOC Private Properties) still open.
  - **moq-wg/secure-objects, cmsf, catalog-format, privacy-pass**: All quiet.
- GitHub implementations:
  - **moq-dev/moq**: **PR #1408** OPENED May 14 18:20:14 UTC (**ksletmoe-aws**, *"feat(moq-mux, libmoq): add CMSF muxer, demuxer, and C API"*, **+3891/−457**, **first AWS contribution + largest single PR of 2026**). **PRs MERGED**: #1402 (SteveMcFarlin moq-gst) May 14 16:45 UTC; #1407 (kixelated version bump) May 14 16:59 UTC; #1399 (skirsten MultiBackend) May 14 17:00 UTC; #1400 (skirsten PromiseReactions) May 15 04:37 UTC. **Open**: PR #1391 (release v0.16.1 moq-bot, May 15 04:39 UTC); PR #1405 (Karolk99 solid-js peerDependency, May 14 20:58 UTC); PR #1404 (Qizot Fix reading catalogs, May 14 16:58 UTC); PR #1401 (skirsten video pacing rAF) updated May 11.
  - **google/quiche** (`quiche/quic/moqt`): **2 new commits May 14** by martinduke — 9c96a40 22:49 UTC *"Refactor: Move OutgoingDataStream to a separate file..."*; 6b1d73b 23:03 UTC *"Cleanup OutgoingSubgroupStream..."*. Total 8 commits May 12–14 across 3 authors (martinduke, vasilvv, asedeno).
  - **Eyevinn/moqlivemock**: **PR #79 MERGED** May 14 08:08:57 UTC (hugobjoers LOCMAF, +2886/−83). PR #77 (CENC chain IV) already merged earlier.
  - **Eyevinn/warp-player**: PR #120 (hugobjoers LOCMAF) updated May 14 12:02 UTC, still open. Dependabot PRs #121–127 all open Day +4.
  - **moqtail/moqtail**: No new merges since May 13 morning release pipeline. PR #170 (April 8 closed) updated_at touch was a release-tagging side effect, not a new event.
  - **cloudflare/moq-rs**: Day +32 main-quiet. PR #167 ([[suhas-nandakumar]] filter-framework) untouched since May 10 05:03 UTC — Day +5.
  - **video-dev/moq-js**: No new commits since Feb 17.
  - **birneee/quiche_moq**: No new commits since Mar 13.
  - **Eyevinn/moqtransport**: No new commits since Apr 17.
  - **Quicr/cat-token**: No new commits since May 10 22:30 UTC rename.
- Mailing list: **7 messages May 14–15** all on already-open threads. **5 replies May 14 on *"[Moq] Re: Consensus call on Object filters"*** (Lorenzo Miniero / Luke Curley / Victor Vasiliev ×2 / Mo Zanaty) — first substantive engagement on Magnus's May 12 consensus call. **2 replies May 14 on *"[Moq] Re: Joining FETCH Survey"*** (Luke Curley / Victor Vasiliev). **Yu You (Nokia) May 15** follow-up on the Joining Fetch user-case thread. **No May 14–15 activity** on Will Law's recharter thread (Day +3 silence post-IAB-burst) or martinduke's *"On other use cases"* thread. **No Weekly GitHub digest** May 14 or 15 (last digest May 10).
- IETF Datatracker: No new revisions May 13–15. WG state: transport-**18** (Day +3), msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00. Notable individual: lite-04, subscribe-rewind-02, qlog-moq-events-06, nmsf-01, gregoire-moq-msfts-00 (May 6, **Day +9, still no on-list announcement**), englishm-cdn-provisioning-00, englishm-relay-dos-00.
- Interop runner: **19 / 72 / 14** at **2026-05-13 00:41:38 UTC** — no May 14 / May 15 run as of this update. 4-PR registry expansion at May 13 17:23–17:25 UTC has interrupted the daily cadence.
- MoQ Monthly: No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30). **Day +15 since #1**, breaking the longest-gap record set yesterday.
- tobbee/moq-llm-wiki: No new open issues.

**Pages updated**: discussions-2026-05.md (new "May 14 09:00 UTC → May 15 09:00 UTC" section covering: **interop-runner 4-PR registry-expansion burst**, **AWS-enters-moq-dev/moq via PR #1408**, **Luke 4-PR-merge-in-12-hours review burst breaking 5-day quiet**, **moq-transport post-draft-18 issue triage pattern** (Issues #1632 / #1631-transfer / #607), **google/quiche moqt 2-more-commits**, **moqlivemock PR #79 LOCMAF merge**, **Filters consensus engaging on mailing list**, **Dragana Damjanovic Mozilla `#moq` join**, **interop runner 2-consecutive-missed-runs status**), interop/interop-runner.md (registry expanded 11 → 15 roles, May 14 + May 15 rows added with "—" pending), implementations/moq-dev.md (May 14 AWS PR #1408 callout in header), index.md (last_updated bump), log.md.

**Key findings**:
- **The interop matrix is in its first structural expansion since the moqx-relay-add of April 11**: 4 new participant roles in 2 minutes is a Mike English deliberate batch — likely a pre-London-interim staging act, getting all known mlmtest / moqx-client / aiomoqt / Nokia-v17 endpoints registered before the June 9–10 interop. The 2-consecutive-missed-runs is plausibly intentional: a 15-role matrix produces ~225 client-server pairs (vs ~121 for 11 roles), and the previous 105-test baseline was scoped to a known-passing subset. **Carry-forward**: the May 16 reading is the structural check — if total-tests count grows, the expansion is operational; if no run again, intervention will be needed before London.
- **AWS has entered the moq-dev/moq orbit with a packaging-layer contribution, not a protocol-core contribution**: ksletmoe-aws's PR #1408 brings **CMSF** muxer/demuxer + C FFI — exactly the *packaging/integration* layer where AWS would have leverage for IVS, Media Live, Elastic Transcoder, etc. The fact that the contribution is to Luke's moq-dev/moq (moq-lite) stack rather than to the IETF-aligned cloudflare/moq-rs is notable — it suggests AWS's near-term productization path is the moq-lite ecosystem, not the WG-strict spec. Combined with the **C FFI** (libmoq) surface this PR introduces, the moq-dev stack is becoming the de-facto cross-language integration target for non-Rust/non-TypeScript producers (Go, C++, Python, etc.) — a substantial widening of the implementation surface beyond what cloudflare/moq-rs offers.
- **The post-draft-18 issue triage pattern is now codified**: WG editors are routing issues to (a) dependent specs (LOC-new-draft for #1632, MSF for #1631→#162), (b) future cycles (PR #1476 rework), or (c) closed-as-keep (#607). This is a notably different stance from pre-draft-18 where many issues bounced back-and-forth without resolution. The May 14 actions establish that **draft-18 baseline is the contract; design churn is downstream work** — exactly the editorial discipline needed to keep momentum toward IETF WGLC. The Issue #1631→#162 transfer also formalises a clean separation of concerns: **MOQT defines the transport, MSF defines the media model**, with codec/encoding decisions belonging to MSF. This is a foundational architectural clarification that the May 11 6-PR sprint did not encode.
- **The moq-dev/moq external-contributor onboarding is accelerating, not slowing**: SteveMcFarlin's first-merge (PR #1402) makes 3 new external contributors in 5 days (metapox May 10, SteveMcFarlin May 14, ksletmoe-aws May 14). Previously the repo was almost exclusively Luke-authored; the May timeline shows Luke transitioning into a **maintainer/review-and-merge role** rather than sole contributor. Luke's *"gotta queue up the Claude prompt"* (May 11) is now visibly playing out: external work batched and merged via Claude-orchestrated review sessions, with explicit `Co-authored-by: Claude` trailers on the version-bump PR #1407. **Pattern**: Luke is industrialising the maintenance pipeline.
- **The google/quiche moqt 8-commit-in-3-days push is the most credible draft-18-implementation signal in the ecosystem**: martinduke's structural refactor (separate files, explicit interfaces, private/public boundary cleanup) immediately after the draft-18 cut, with vasilvv joining the moqt subdir for the first time, reads as a coordinated 2-engineer push. The fact that this is happening at Google (where draft-ietf-moq-transport co-authors Martin Duke and Victor Vasiliev both work) means the implementation-spec feedback loop is tight. **Carry-forward**: by London (June 9–10), quiche-moqt may be the only matrix participant tracking draft-18 wire format — but it will be the editorially-authoritative one. This raises a strategic question: should the interop-runner matrix be re-scoped to draft-18-only for the June interim, or maintain draft-16 compatibility for the longer-tail implementations?

---

# 2026-05-14 — first post-draft-18 cross-spec collision flagged; MSF 3-PR cleanup

**TL;DR**:
- **First post-draft-18 cross-spec coordination failure surfaces within 14 hours of publication**: **yuanchao-chris** (new contributor, his **2nd issue in 2 days**) opens **twin cross-spec issues** May 14 03:18 / 03:24 UTC — **[moq-transport Issue #1632](https://github.com/moq-wg/moq-transport/issues/1632)** *"MOQ-18: Properties Type collision with LOC-02"* + **[moq-wg/loc Issue #20](https://github.com/moq-wg/loc/issues/20)** *"LOC-02: Properties Type collision"* — concrete diff table: MOQ-18 §15.8-2 assigns `TIMESTAMP=0x06`, `TIMESCALE=0x08`, `VIDEO_FRAME_MARKING=0x0A`, `AUDIO_LEVEL=0x0C`, `VIDEO_CONFIG=0x0D`; LOC-02 commit history says `TIMESTAMP=0x02` (collides with Audio Level), `VIDEO_FRAME_MARKING=0x04`, `AUDIO_LEVEL=0x06`, etc. — i.e., **MOQ-18 publication did not adopt the LOC IANA-registry-provisional values from PR #1624 (April 30, Issue #1550)**. This is the **first ever cross-spec collision flagged by a non-author / non-WG-regular** (yuanchao-chris has no prior repo history before May 13). The headline carry-forward: **WG editorial coordination between moq-transport and LOC is not yet operational** — `wg-editorial-coordination` is now its own work item for the [[2026-06-09-london-interim]]. **moq-transport Issue #1631** (Track-level codec switching, yuanchao-chris May 13) afrind 05:11 UTC + yuanchao-chris 09:23 UTC exchange — afrind sketches new-group-with-codec-property-on-Object-0; yuanchao-chris confirms works in stream mode but in **datagram mode** needs property-stamped frames + `REQUEST_UPDATE`-based "ACK" semantics (subscriber tells publisher to stop adding the property once received). **Mailing list — Yu You (Nokia) May 13 opens *"[Moq] User case or question to Joining Fetch"*** — 4 same-day replies (Will Law / Zafer Gurel / Mo Zanaty / Will Law), first Nokia-driven on-list contribution since Yu You's May 8 3GPP SA4 announcement. **moq-wg/msf — 3 PRs MERGED May 13 10:30–18:43 UTC**: PR #158 (Suhas, *"Replace delta update fields with ordered operations array"*, +72/−81, closes Issue #145); **PR #133** (Suhas, *"Add SCTE-35 support and CEA-608/708 accessibility fields"*, +184/0, **the long-debated event-timeline PR**, closes Issue #95) — finally landed after the May 8 split-into-3-PRs debate; PR #161 (Will Law, *"Update overlapping presentation time requirement"*, +6/−1, closes Issue #155). Largest MSF main-advancement single-day in 2026. Will Law's recharter thread shows **no May 13/14 follow-up** — Day +2 silence after the May 12 IAB cross-WG burst.
- **Implementations**: **google/quiche moqt — 4 commits May 13** continuing the post-draft-18 push: **vasilvv first moqt-dir commit** (*"Use new MOQT control message parser API directly"*); martinduke *"Fix ASAN/MSAN errors in MoqtSessionTest and MoqtTrackTest"*; martinduke *"Fix an issue from AI review of cl/914368728"* (**first explicit *"AI review"* commit message** in any wiki-tracked MoQ repo — Google's internal AI code review flagging cl/914368728); asedeno *"Fix OSS QUICHE build"*. Combined with May 12's 2 commits = **6 commits in 2 days**, the most concentrated quiche-moqt activity since March 2026 — clearly tracking draft-17/18 implementation. **moqtail/moqtail — 3 PRs MERGED May 13 08:41–08:44 UTC** (PR #195 docs, PR #192 release, PR #196 ci-release) post-PR-193 release pipeline run. **moq-dev/moq Day +5 main-quiet** (last Luke commit May 9 22:30 UTC) — 5 external-contributor PRs still open (skirsten #1399/#1400/#1401, SteveMcFarlin #1402, Qizot #1398). **cloudflare/moq-rs Day +31 main-quiet**; PR #167 untouched Day +4. **Eyevinn/moqlivemock LOCMAF PR #79 + warp-player PR #120** both updated May 13 09:30 UTC — Day +7 LOCMAF iteration. video-dev/moq-js / birneee/quiche_moq / Eyevinn/moqtransport / Quicr/cat-token all quiet.
- **Interop**: **No new run** since May 13 00:41:38 UTC reading of **19 / 71 / 14**. The daily ~00:40 UTC run for May 14 has not yet fired (or has not yet published to the GitHub Pages site) as of this update. Carry-forward: **the May 14 reading is the first that could reflect a google/quiche-moqt rebuild post-May 13 quiche-moqt commits** — if the `quiche-moq` image is auto-rebuilt nightly, the 6 quiche-moqt commits May 12–13 (including PUBLISH_OK removal) should land in the next run; expect potentially larger movement than the +1/−1 daily variance.

**Operation**: Update
**Sources**:
- Slack: `#moq` — **3 thread replies** on [[alan-frindell]]'s May 13 01:15 CEST *"It's heeeeere"* draft-18 announcement: **Paul Gregoire (mondain) May 13 05:59 CEST**: *"Is moqx already supporting it? I suppose I should already know the answer..."* — first non-OpenMOQ-author public probe of OpenMOQ moqx draft-18 status; **afrind 06:48 CEST**: *"lol no."* + *"Goal is interop in London"* — explicit confirmation that no implementation is draft-18-ready and the June 9–10 London interop is the formal interop target. No other `#moq` activity in the May 13 06:00 UTC → May 14 ~09:00 UTC window. `#moq-interop-runner`, `#moq-rs`, `#moq-js`, `#libquicr` all unchanged.
- GitHub moq-wg repos:
  - **moq-transport** — **Issue #1632 OPENED** May 14 03:24 UTC (yuanchao-chris, *"MOQ-18: Properties Type collision with LOC-02"*) with concrete reference to MOQ-18 §15.8-2 and the LOC commit-history-implied values; **Issue #1631** (Track-level codec switching) — afrind May 13 05:11 UTC reply + yuanchao-chris May 13 09:23 UTC reply (in-band codec switching answer for datagram mode involves property-stamped frames + REQUEST_UPDATE ACK semantics); **Issue #1614** (kixelated Joining FETCH + SUBSCRIBE prioritization) pinged May 13 00:09 UTC; **Issue #1459** (martinduke Request ID validation broken in draft-16) **CLOSED** May 12 23:51 UTC; **PR #1476** (afrind delivery timeouts) updated May 13 00:07 UTC.
  - **moq-wg/loc** — **Issue #20 OPENED** May 14 03:18 UTC (yuanchao-chris, *"LOC-02: Properties Type collision"*) — the LOC-side twin to moq-transport #1632. Issue #19 (Luke Curley May 5 LOC Private Properties) still open.
  - **moq-wg/msf** — **3 PRs MERGED May 13** (PR #158 10:30 UTC, PR #161 18:43 UTC, PR #133 18:42 UTC); **3 Issues CLOSED May 13** (#145 10:30 UTC ordering of delta updates, #95 18:42 UTC close captions, #155 18:43 UTC sequence-aligned-groups). PR #157 (Suhas, Group numbering restarts) updated May 13 21:45 UTC. PR #156 (Suhas, Object-Stream mapping) updated May 13 16:27 UTC. PR #159 (Suhas, catalog compression via Track Properties — renamed) updated May 14 05:42 UTC. **Issue #153** (vasilvv, *"`initTrack` does not work"*) updated May 14 05:46 UTC.
  - **moq-wg/secure-objects, cmsf, catalog-format, privacy-pass**: All quiet.
- GitHub implementations:
  - **google/quiche** (`quiche/quic/moqt`): **4 new commits May 13** in addition to May 12's 2 (Day +1 from the wiki's May 13 entry): vasilvv *"Use new MOQT control message parser API directly"*, asedeno *"Fix OSS QUICHE build"*, martinduke *"Fix ASAN/MSAN errors in MoqtSessionTest and MoqtTrackTest"*, martinduke *"Fix an issue from AI review of cl/914368728"*. **First *"AI review"*-cited commit message** in wiki-tracked repos. 6 commits in 48 hours.
  - **moqtail/moqtail**: **3 PRs MERGED May 13 08:41–08:44 UTC** — PR #195 docs (+64/0), PR #192 release-bot, PR #196 [ci] release. Bumps moqtail post-PR-193 (upstream FETCH on cache miss) into a release.
  - **moq-dev/moq**: Day +5 main-quiet (no commits since May 9 22:30 UTC). PR #1400 last updated May 12 06:43 UTC; PR #1402 last updated May 12 03:48 UTC. No Luke review activity visible.
  - **cloudflare/moq-rs**: Day +31 main-quiet (last commit Apr 13). PR #167 ([[suhas-nandakumar]] filter-framework) untouched since May 10 05:03 UTC — Day +4.
  - **Eyevinn/moqlivemock**: LOCMAF PR #79 updated May 13 09:30 UTC (still open Day +7).
  - **Eyevinn/warp-player**: LOCMAF PR #120 updated May 13 09:30 UTC. Dependabot PRs #121–127 all still open Day +3.
  - **video-dev/moq-js**: No new commits since Feb 17.
  - **birneee/quiche_moq**: No new commits since Mar 13.
  - **Eyevinn/moqtransport**: No new commits since Apr 17.
  - **Quicr/cat-token**: No new commits since May 10 22:30 UTC rename.
- Mailing list: **1 new thread May 13** — **Yu You (Nokia)** *"[Moq] User case or question to Joining Fetch"* with 4 same-day replies (Will Law / Zafer Gurel / Mo Zanaty / Will Law). **Luke Curley May 13** reply on the *"[Moq] Re: Consensus call on Object filters"* thread (Magnus's May 12 consensus call). No May 14 messages as of this update. Will Law recharter thread / martinduke "On other use cases" thread / afrind Joining FETCH Survey thread all show **no May 13/14 follow-up**.
- IETF Datatracker: No new draft revisions since draft-18 (2026-05-12). WG state: transport-**18**, msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00. Notable individual: lite-04, subscribe-rewind-02, qlog-moq-events-06, nmsf-01, gregoire-moq-msfts-00 (May 6, Day +8, still no on-list announcement), englishm-cdn-provisioning-00, englishm-relay-dos-00.
- Interop runner: **19 / 71 / 14** at **2026-05-13 00:41:38 UTC — no May 14 run yet** as of this update (the ~00:40 UTC daily run may not have published).
- MoQ Monthly: No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30). **Day +14 since #1**, longest gap to date.
- tobbee/moq-llm-wiki: No new open issues.

**Pages updated**: discussions-2026-05.md (new "May 13 06:00 UTC → May 14 09:00 UTC" section covering: **yuanchao-chris cross-spec collision twin issues #1632 / loc #20**, Issue #1631 in-band codec switching afrind/yuanchao-chris exchange, MSF 3-PR cleanup sequence, Yu You Nokia Joining FETCH thread, google/quiche moqt 4-commit draft-18 push including first *"AI review"*-cited commit, moqtail release-pipeline burst, moq-dev/moq Day +5 quiet, interop runner no-new-run status), drafts/moq-transport.md (Active Issues section: add **Issue #1632** collision entry as headline post-draft-18 issue), drafts/moq-loc.md (Active Issues: add **Issue #20** entry; last_updated bump), index.md (last_updated bump), log.md.

**Key findings**:
- **Cross-spec coordination is the first concrete carry-forward from draft-18**: The yuanchao-chris twin-issue filing (moq-transport #1632 + loc #20, **same author within 6 minutes, 03:18–03:24 UTC May 14**) is the first **bilaterally-flagged** cross-spec collision in the wiki record — Issue #1550 (April 16, also by yuanchao-chris on the LOC side) was a one-sided LOC-repo filing. Two observations: (a) yuanchao-chris has emerged in **5 days** as the most active **new cross-spec reviewer**, having filed 4 issues across moq-transport + LOC since May 5 (no prior repo history); (b) **PR #1624** (afrind, April 30, *"provisional IANA registry for LOC properties"*) was supposed to resolve the Issue #1550 collision by establishing a registry — but draft-18 §15.8-2 went out using a *different* assignment (TIMESTAMP=0x06, AUDIO_LEVEL=0x0C) than what the LOC commit history records (TIMESTAMP=0x02, AUDIO_LEVEL=0x06). So either (i) PR #1624's registry was not synced into the editor's draft-18 cut, or (ii) the registry is correct and LOC-02's source needs updating but the LOC editors have not yet done so. Either way, **a published WG document (draft-18) and a published WG document (loc-02) now diverge on assigned IANA-style codepoints** — the kind of failure mode an editorial-coordination workflow exists to prevent.
- **The in-band codec switching design discussion is the first MoQ design issue actively progressed in the post-draft-18 window**: afrind's "new group with codec property on Object 0" sketch + yuanchao-chris's "datagram mode needs property-stamped + REQUEST_UPDATE ACK" extension is the first iteration of an actual new design problem since the May 11 6-PR sprint. The fact that **a brand-new contributor is now driving design conversations day +1 of a new draft** is a healthy sign for the WG's external engagement — but also exposes that the H265→H264 / AV1→H264 use case (well-understood from WebRTC PT-change semantics) was not addressed in the draft-18 cut.
- **google/quiche moqt is now the dominant draft-18 implementation push** (post-draft-18 day count: 6 commits / 2 days vs all-other-tracked-repos: 1 docs + 1 release PR at moqtail, 0 main commits at moq-dev/moq + cloudflare/moq-rs). The **vasilvv first moqt-dir commit** indicates the moqt subdir is no longer martinduke-only and is becoming a coordinated 2-engineer project. The *"AI review"* commit message (martinduke May 13 16:38 UTC) is **the first explicit Google-AI-code-review-tooling reference in a wiki-tracked MoQ commit** — pattern: AI-tooling is now visibly in the loop in MoQ implementation at Google (alongside Luke Curley's Claude orchestration at moq-dev/moq, Giovanni Marzot's "over zealous claude" at OpenMOQ).
- **MSF cleared its largest single-day delta of 2026**: 3 PRs merged + 3 issues closed (May 13 10:30–18:43 UTC), with **PR #133 (SCTE-35 + CEA-608/708)** being the headline — open since Jan 30, with the wiki tracking 4 prior debate cycles (Apr 22 ContentProtection-and-Captions split, May 8 split-into-3-PRs from avelad, May 8 event-timeline restructuring from wilaw/gwendalsimon, May 11 Suhas's "I do have initial drafts on..."). The fact that the PR landed **as-is** rather than being split into 3 event-timeline drafts indicates the split-out-event-timeline-drafts editorial direction (wilaw May 8) is **future work, not blocking-merge work** — MSF is consolidating before the London interim, not expanding.
- **Interop runner's May 14 run is materially-important**: The May 13 reading (19/71/14, post-draft-18-day floor-breach) is **the only matrix snapshot since google/quiche moqt's PUBLISH_OK-removal commit landed pre-cutoff**. Whether the May 14 run shows continued matrix degradation (because quiche-moq is now ahead of moq-transport-spec the matrix tests against) or recovery (because the spec-side is catching up) will be the first signal of how the spec-vs-implementation gap is resolving post-draft-18. **Watch carry-forward: the May 15 update should be the first reading with a full nightly post-quiche-moqt-rebuild propagation.**

---

# 2026-05-13 — draft-18 published; Will Law proposes recharter to non-media

**TL;DR**:
- **[draft-ietf-moq-transport-18.txt](https://datatracker.ietf.org/doc/draft-ietf-moq-transport/18/) PUBLISHED 2026-05-12** — the long-anticipated cut. Phase 2 of the editorial work (after May 11 6-PR sprint) added 3 more merges to `main` May 12 20:02–23:07 UTC: **PR #1625** (suhasHere, Security Considerations — extends [[magnus-westerlund]]'s long-parked PR #1455, closes Issue #783); **PR #1605** (vasilvv, *Split DELIVERY_TIMEOUT into OBJECT_DELIVERY_TIMEOUT + new SUBGROUP_DELIVERY_TIMEOUT*, +114/−76, closes Issue #667 *"DELIVERY_TIMEOUT is unimplementable"*); **PR #1630** ([[alan-frindell]], *Draft 18 release notes*, body literally *"Behold"*). Datatracker upload ~23:30 UTC; **[[alan-frindell]] Slack `#moq` May 13 01:15 CEST**: *"It's heeeeere"*. **Draft-18 abstract rewritten** to emphasise content-agnostic framing: *"Despite its name referencing media, the specification emphasizes that MOQT remains content-agnostic and applicable across various use cases."* **Mailing list — Will Law (Akamai) May 12 *"[Moq] Proposal to recharter to include non-media use cases."*** — proposes expanding the WG charter (chartered August 2022 for media) to cover AI inference / ML interfaces, sensor & telemetry, UAV C2, financial market data, AR/VR I/O; emphasises **no MOQT protocol changes required**. Same-day responses from **Ted Hardie**, **Christian Huitema**, **Richard Barnes**, [[martin-duke]], **Mo Zanaty** — first time non-MoQ-regular IETF voices (Hardie / Huitema / Barnes) engage on a MoQ recharter thread on-list. The spec-side draft-18 abstract reframing and the WG-charter-side recharter proposal landed **within 24 hours** of each other. **[[magnus-westerlund]] opens 2 filter consensus calls on-list May 12**: (1) *"Consensus call on Object filters"* — PR #1518 (mzanaty), **two-week consensus period through May 26**, optional support with implementer capacity advertisement; (2) *"Support for Track Filters and Top-N"* — meeting poll was 7-7 (numerous-support vs equal-opposition), splits the question into "track filters without top-N" vs "track filters with top-N" and proposes the **filters-as-extension-point** pattern (first explicit chair framing). Magnus also posted *"[Moq] Meeting cut short"* clarifying yesterday's Town Hall ended abruptly on **Meetecho mis-configuration** (afrind May 11 20:01 CEST had hinted with *"Brutally killed by meetecho!"*). **moq-transport Issue #1631** OPENED May 13 02:23 UTC by yuanchao-chris (0 prior issues, new contributor) — *"Track-level codec switching semantics"* — first day-+1 post-draft-18 issue, raises in-band codec migration (H265→H264, AV1→H264 mid-session like RTP/WebRTC PT change inside same SSRC); afrind May 13 05:11 UTC answers with new-group-with-codec-property-on-Object-0 sketch. **moq-wg/msf — Will Law adds Suhas Nandakumar to authors list** (PR #160 merged May 12 12:30 UTC) — first MSF author-list change of 2026, formalises Suhas's de-facto co-editor role; Will in MSF-issue-grooming mode 10:59–12:32 UTC closes Issues #93/#100/#111 in 4 minutes. **moqtail PR #194** merged May 12 20:00 UTC (zafergurel, remove track-forwarding-preference dead code, +27/−52) bringing moqtail in line with draft-16 wire format; moqtail PR #195 docs update opened 21:17 UTC.
- **Implementations**: **google/quiche moqt — 2 commits May 12** by [[martin-duke]] after 7-day quiet, both explicitly preparing for draft-17/18: *"Remove PUBLISH_OK message"* (14:23 UTC, commit message: *"Part of implementing draft-17/18 PUBLISH in draft-16"*) and *"Allow fragmented MOQT object payloads"* (17:52 UTC, MoqtLiveRelayQueue robustness). **First implementation activity directly cited as draft-17/18 work** in any wiki-tracked repo, same day as draft-18 publication. **moqtail PR #194** merged (above); PR #195 opened. **moq-dev/moq Day +3 main-quiet** — no Luke commits since May 9 22:30 UTC; the 5 external-contributor PRs from May 10–11 (SteveMcFarlin #1402, skirsten #1399/#1400/#1401, Qizot #1398) all open, with PR #1400 / #1402 updated May 12 morning UTC but no Luke review activity visible (consistent with afrind's May 11 22:56 UTC *"gotta queue up the Claude prompt"* / Luke "in Claude orchestration mode" reading). **cloudflare/moq-rs Day +30 main-quiet**, **PR #167** (Suhas filter-framework, +12163/−2197) untouched since May 10 — Suhas's May 12 effort went into MSF + moq-transport Security Considerations, not the moq-rs filter framework, even as Magnus opened the Object Filters consensus call that PR #167 implements. **Eyevinn/moqlivemock PR #80** merged May 12 08:02 UTC (fix(cenc): chain IV across CMAF fragments to avoid reuse); LOCMAF PR #79 unchanged Day +6; warp-player LOCMAF PR #120 + dependabot burst (PRs #121–127) all still open. video-dev/moq-js / birneee/quiche_moq / Eyevinn/moqtransport all quiet.
- **Interop**: **19 / 71 / 14** at 2026-05-13 00:41:38 UTC — **−1 pass / +1 fail vs May 12** (20/71/14). **Breaches the post-PR-#145 floor of 20 on the downside**; first 19-reading since May 8. Walking arc: 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → 19 → 20 → 20 → 21 → 20 → **19**. Most plausible driver: **google/quiche moqt commits May 12 14:23 / 17:52 UTC** (both pre-cutoff) — the PUBLISH_OK removal is a wire-format-affecting change, so any `quiche-moq` pair that had been passing on the PUBLISH_OK code point could be expected to flip; moqtail PR #194 (track-forwarding-preference removal) merged 20:00 UTC also pre-cutoff. moq-transport PRs #1625 / #1605 / #1630 (Phase 2 of draft-18 cut) are **spec-only** and don't drive image rebuilds. **At draft-18 publication day with no implementation tracking draft-18 yet**, the spec-vs-implementation gap is at its widest; matrix at 20±1 for **9 of 10 May-weekday readings** since May 5.

**Operation**: Update
**Sources**:
- Slack: `#moq` — **2 new posts** in the May 12 01:00 UTC → May 13 06:00 UTC window, both from [[alan-frindell]]: May 12 00:53 UTC qmux-01 framing for draft-18 interop; May 13 01:15 CEST draft-18 announcement (*"It's heeeeere"*). `#moq-rs`, `#moq-js`, `#libquicr`, `#moq-interop-runner` all unchanged.
- GitHub moq-wg repos:
  - **moq-transport** — **Phase 2 of draft-18 cut**: **PR #1625** MERGED May 12 20:02:18 UTC (suhasHere Security Considerations, closes Issue #783); **PR #1605** MERGED May 12 23:04:53 UTC (vasilvv OBJECT_DELIVERY_TIMEOUT + SUBGROUP_DELIVERY_TIMEOUT split, closes Issue #667); **PR #1630** MERGED May 12 23:07:53 UTC ([[alan-frindell]] *"Draft 18 release notes"*). **Issue #1631 OPENED** May 13 02:23 UTC by yuanchao-chris (new contributor) — *"Track-level codec switching semantics"*; afrind May 13 05:11 UTC reply. **PR #1628** (afrind QMux moqt-18 ALPN) updated May 12 20:40 UTC, still open. **PR #1476** (afrind, Feb 9 *Delivery timeouts are both Track and Object Properties*) updated May 13 00:07 UTC — needs rework after PR #1605 landed. **PR #1607** / **PR #1604** updated May 12 20:03 UTC. **PR #1627** (ianswett *SUBSCRIBE with Joining Fetch*) still open Day +10.
  - **moq-wg/msf** — **PR #160** OPENED + MERGED May 12 12:30 UTC ([[will-law]]) — *"Add Suhas Nandakumar to the authors list"* (first MSF author-list change of 2026). **Issues #93 / #100 / #111** CLOSED May 12 10:59–12:32 UTC (Will Law issue-grooming). Suhas's May 11 4-PR burst (PRs #156–159) all still open with review iteration May 13 00:57–04:17 UTC.
  - **moq-wg/loc, secure-objects, cmsf, catalog-format, privacy-pass**: All quiet.
- GitHub implementations:
  - **google/quiche** (`quiche/quic/moqt`): **2 commits May 12** by [[martin-duke]] — first activity in 7 days; both explicitly draft-17/18 prep work.
  - **moqtail/moqtail**: **PR #194** MERGED May 12 20:00 UTC (zafergurel, remove track-forwarding-preference, +27/−52). **PR #195** OPENED May 12 21:17 UTC (zafergurel, docs +64/0). **Issue #148** CLOSED May 11 22:39 UTC.
  - **moq-dev/moq**: Day +3 main-quiet (no commits since May 9 22:30 UTC). 5 external-contributor PRs from May 10–11 all open; skirsten PR #1400 updated May 12 06:43 UTC, SteveMcFarlin PR #1402 updated May 12 03:48 UTC. No Luke review activity visible May 12.
  - **cloudflare/moq-rs**: Day +30 main-quiet. PR #167 untouched since May 10 05:03 UTC.
  - **Eyevinn/moqlivemock**: **PR #80** MERGED May 12 08:02 UTC (fix(cenc): chain IV across CMAF fragments). LOCMAF PR #79 unchanged Day +6.
  - **Eyevinn/warp-player**: LOCMAF PR #120 + dependabot PRs #121–127 all still open.
  - **video-dev/moq-js**: No new commits since Feb 17.
  - **birneee/quiche_moq**: No new commits since Mar 13.
  - **Eyevinn/moqtransport**: No new commits since Apr 17.
- Mailing list: **6+ threads** in the May 12 window: **[Moq] I-D Action: draft-ietf-moq-transport-18.txt** (internet-drafts); **[Moq] Proposal to recharter to include non-media use cases** (Will Law) + responses from Ted Hardie / Christian Huitema / Richard Barnes / Martin Duke / Mo Zanaty; **[Moq] Consensus call on Object filters** ([[magnus-westerlund]], + responses from Law / Luke Curley); **[Moq] Support for Track Filters and Top-N** ([[magnus-westerlund]], + Mo Zanaty); **[Moq] Meeting cut short** ([[magnus-westerlund]]); **[Moq] Re: On other use cases** (Mo Zanaty, follow-up to martinduke's May 11/12 thread).
- IETF Datatracker: **draft-ietf-moq-transport-18 PUBLISHED 2026-05-12**. WG state: transport-**18** (NEW), msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00. Notable individual: lite-04, subscribe-rewind-02, qlog-moq-events-06, nmsf-01, **gregoire-moq-msfts-00** (May 6, Day +7, still no on-list announcement), englishm-cdn-provisioning-00, englishm-relay-dos-00.
- Interop runner: **19 / 71 / 14** at 2026-05-13 00:41:38 UTC. **−1 pass / +1 fail vs May 12** (20/71/14) — breaches post-PR-#145 floor of 20.
- MoQ Monthly: No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30). Day +13 since #1.
- tobbee/moq-llm-wiki: No new open issues.

**Pages updated**: discussions-2026-05.md (new "May 12 01:00 UTC → May 13 06:00 UTC" section covering: **draft-18 publication + Phase-2 PR sequence**, draft-18 abstract reframing, **Will Law recharter proposal** + IAB/cross-WG response list, **Magnus Westerlund Object Filters + Track Filters/Top-N consensus calls**, Magnus *"Meeting cut short"* note on Meetecho mis-config, Issue #1631 codec-switching first day-+1 issue, MSF Will Law issue-grooming + PR #160 authors-list change, **google/quiche moqt 2-commit draft-17/18 prep**, moqtail PR #194 track-forwarding-preference removal, moq-dev/moq Day +3 quiet observation, Eyevinn moqlivemock PR #80 CENC IV chaining fix, interop floor-breach), drafts/moq-transport.md (draft_version bumped to 18, abstract rewritten with draft-18 framing, **new Recent Changes (draft-18) section** with two-phase cut breakdown), interop/interop-runner.md (May 13 row added + floor-breach narrative + draft-18-publication-day framing), index.md (moq-transport row bumped to draft-18 with 2026-05-12 publication date, last_updated bump), log.md.

**Key findings**:
- **draft-ietf-moq-transport-18 lands**: After 47 days of Apr/May editorial work (the longest sustained 2026 sprint), draft-17 → draft-18 is now the published canonical reference. The two-phase cut sequence — **Phase 1 May 11 21:32–22:02 UTC** (6 PRs in 30 min: #1544 + #1615 + #1617 + #1618 + #1621 + #1629) and **Phase 2 May 12 20:02–23:07 UTC** (3 PRs: #1625 + #1605 + #1630) — is the **largest moq-transport `main`-advancement sequence in the wiki record**. **PR #1615 *Remove Required Request ID*** is the single headline change implementing the Apr 27 interim consensus; the entire May 11–12 editorial sequence was structured around it. The cut went uncelebrated on `#moq` beyond afrind's 5-word announcement (*"It's heeeeere"*) — consistent with the WG's pattern of decompressing all communication into bursts (5-day silence May 6–10, then May 11 burst, then May 12 Town Hall + draft cut, then May 13 quiet).
- **The protocol-vs-charter reframing arrives in a single 24-hour window**: The draft-18 abstract was rewritten to emphasise *"Despite its name referencing media, the specification emphasizes that MOQT remains content-agnostic and applicable across various use cases"* — **and Will Law's recharter proposal arrives within hours**, formalising the WG charter side of the same reframing. The mailing-list responses from **Ted Hardie / Christian Huitema / Richard Barnes** (none of whom are MoQ-regulars; all are senior IETF/IAB figures) are the **first cross-WG engagement on MoQ scope** on the wiki record — implying the proposal has carried beyond the MoQ WG's usual perimeter. Carry-forward: a formal WG recharter process is now plausible 2026-Q3, with the **June 9–10 London interim/interop** as the natural venue for a charter-proposal discussion alongside the Joining FETCH technical agenda.
- **Magnus Westerlund frames filters as extension-points**: Magnus's parallel Object Filters consensus call (May 12 → May 26 deadline) + Track Filters / Top-N question, with explicit "**potential to divide filters into core functionality vs optional extensions**" framing, is the **first WG-chair-level articulation of the filters-as-extension-point pattern** for moq-transport. This is the natural draft-18 → draft-19 trajectory: the May 12 cut establishes a stable -18 baseline; the filters debate then proceeds as extension-point work without blocking the core spec. The Object Filters consensus call references PR #1518 (mzanaty) which has been open since Mar 2 and saw first activity in weeks May 11 — now the spec-side anchor of the consensus question.
- **google/quiche moqt is the first implementation moving on draft-18 (same day as the cut)**: [[martin-duke]]'s May 12 commits *"Remove PUBLISH_OK message"* (with commit message *"Part of implementing draft-17/18 PUBLISH in draft-16"*) + *"Allow fragmented MOQT object payloads"* land **the same day as draft-18 publication**, making **quiche-moq the first wiki-tracked implementation with explicit draft-17/18 prep on `main`**. Other implementations (moq-dev/moq, moqtail, moq-rs) are all still tracking draft-16 wire formats. The implication for the June 9–10 London interop is significant: if quiche-moq is the only draft-18-tracking implementation by June 9, it will need to interop against draft-16/14 implementations using draft-16/14 wire formats. The QMux moqt-18-over-TLS+TCP path (afrind PR #1628) is a parallel **second interop pillar** for draft-18 — *"For anyone interested in draft-18 interop over QMux, we intend to use qmux-01 framing"* implies a draft-18-aligned QMux interop subset alongside the QUIC main path.
- **Interop matrix breaches the floor on draft-18 day**: 19/72/14 is the first sub-20 reading since May 8 — and lands exactly on the day draft-18 publishes, with no draft-18 implementation in the matrix yet. The most likely flip driver is the google/quiche moqt PUBLISH_OK removal landing pre-cutoff (wire-format-affecting). The matrix has now been at 20±1 for **9 of 10 May-weekday readings** since May 5 — completely insensitive to the parallel spec activity. Carry-forward: **the post-draft-18 interop matrix needs structural attention** — without a draft-18 build for at least one matrix participant, the matrix cannot demonstrate draft-18 stability between now and the June 9–10 London interop.

---

# 2026-05-12 — draft-18 sprint lands; OpenMOQ fork incident surfaces

**TL;DR**:
- **moq-transport — 6 PRs MERGED in 30 minutes (May 11 21:32–22:02 UTC)**, the largest single-sitting editorial sprint of 2026: **[PR #1544](https://github.com/moq-wg/moq-transport/pull/1544)** *"Improve Startup Latency and 0-RTT"* (fixes #420, #8…); **[PR #1615](https://github.com/moq-wg/moq-transport/pull/1615) *"Remove Required Request ID"*** (fixes #1603, materializes Apr 27 interim consensus — the **headline draft-18 commit**); **[PR #1617](https://github.com/moq-wg/moq-transport/pull/1617)** GOAWAY on request streams; **[PR #1618](https://github.com/moq-wg/moq-transport/pull/1618)** FIRST_OBJECT bit 0x40 in SUBGROUP_HEADER; **[PR #1621](https://github.com/moq-wg/moq-transport/pull/1621)** forbid relays from lying about LARGEST_OBJECT; **[PR #1629](https://github.com/moq-wg/moq-transport/pull/1629)** scope-definition (fixes #1432). [[alan-frindell]] queued the entire Apr 14–30 stack overnight on May 10/11 so it could land in one sequence ahead of the May 12 Town Hall (Dan Rayburn, 13:00 ET / 17:00 UTC). Issue #1603 CLOSED 21:41:24 UTC, with afrind's *"This is now tracked in #1519"* forwarding the "dependency structure between requests" pieces to vasilvv's [PR #1519](https://github.com/moq-wg/moq-transport/pull/1519). **[[ian-swett]] [PR #1627](https://github.com/moq-wg/moq-transport/pull/1627)** *"SUBSCRIBE with Joining Fetch"* (+44/**−139** net-shrink, fixes #1039/#1313/#1602/#1612) is the **alternative Joining-FETCH approach being surveyed** below. [[alan-frindell]] [PR #1628](https://github.com/moq-wg/moq-transport/pull/1628) (`moqt-18` ALPN over QMux+TLS+TCP) updated May 11 22:43 UTC; Slack `#moq` confirmation 22:53 UTC (00:53 CEST May 12): *"For anyone interested in draft-18 interop over QMux, we intend to use qmux-01 framing."* — **first explicit `qmux-01` framing target announced**. **Mailing list reactivates** after 5-day silence: afrind opens *"[Moq] Joining FETCH Survey"* (Slack 18:02 UTC, list 18:15 UTC) with **2 multi-question polls** (4.1/4.2/4.3 on past-data flow control + Y/N + MAY/MUST/MUST NOT; plus *"willing to delay WGLC and RFC by ___ months for a more preferable Joining FETCH outcome: 0/1/2/3/4+"*). martinduke opens *"[Moq] London Agenda requests"* same day, *"[Moq] On other use cases"* May 12; **London interim/interop is June 9–10** ([[alan-frindell]] *"interop is 6/9-10"*). **moq-wg/msf — [[suhas-nandakumar]] opens 4 new PRs in 1 hour evening May 11**: PR #156 (object→stream mapping implementation-specific, addresses #148), PR #157 (group numbering for restarts, addresses #147), PR #158 (replace delta updates with ordered operations array, addresses #145), PR #159 (catalog compression via track name suffix); plus [[luke-curley]] May 11 23:23 UTC on Issue #139 proposes nested-object catalog structure (`"container": {"kind": "cmaf", "initData": "..."}`). MSF spec-trimming continues — Suhas in spec-curator mode. **`#moq-interop-runner` channel** (Mike English created May 9 18:09 CEST) hosted **OpenMOQ fork incident in its first 48h**: Mike English May 9 18:20 CEST notices `openmoq/moq-interop-runner` fork with cloned issues; [[giovanni-marzot]] admits *"over zealous claude perhaps"*, makes fork private May 10 17:37 CEST; **[[lucas-pardue]] May 10 19:57 CEST escalates**: *"this is not a good look for OpenMoQ. Taking IETF work, forming pay to participate consortia, and then coopting running code from others. Thats not how we develop standards"*; **[[will-law]] May 10 21:02 CEST 5-paragraph response**: *"This is not an official OpenMOQ action ... we need an improved system for validating code provenance before it is merged into any repo managed by openmoq. I'll ask the dev team to institute that next week."* **First public OpenMOQ governance incident** on record; **Claude-as-community-friction-vector** (Giovanni: *"claude overstepped"*). Episode closed (fork private, issues retracted); carry-forward is OpenMOQ code-provenance review next week.
- **Implementations**: **moqtail/moqtail PR #193 [4/n] MERGED** May 11 22:37:32 UTC after Day +5 stuck — **completes the [N/n] upstream-FETCH series** (#186/#187/#188 May 6 + #193 May 11). **moq-dev/moq Day +2 main-quiet but 5 external-contributor PRs open in 24h**: **first contribution from SteveMcFarlin** PR #1402 (moq-gst CAPS+EOS fixes, 0 prior commits — second new external contributor after metapox May 10); skirsten PRs #1399/#1400/#1401 (video pacing rAF + PromiseReactions leak + MultiBackend close); Qizot PR #1398 (track activity signals +197/−6). Open-PR queue now ~12, deepest in repo history. **cloudflare/moq-rs Day +29 main-quiet**; PR #167 (Suhas filter-framework, +12163/−2197) untouched since May 10 05:03 UTC — Suhas's May 11 evening went to MSF PRs #156–159 instead. **Quicr/cat-rs renamed → Quicr/cat-token** (May 10 22:30 UTC commit confirms Suhas's May 6 announcement). Eyevinn/warp-player saw dependabot burst (PRs #121–127). google/quiche moqt / video-dev/moq-js / birneee/quiche_moq / Eyevinn/moqlivemock+moqtransport all quiet.
- **Interop**: **20 / 71 / 14** at 2026-05-12 00:37:28 UTC — **−1 pass / +1 fail vs May 11** (21/70/14), **back to the post-PR-#145 floor**. The May 11 +1 lift was **per-run variance**, not a real recovery. Walking arc: 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → 19 → 20 → 20 → 21 → **20**. Matrix has now been at 20±1 for **8 of 9 May-weekday readings** since May 5. No implementation activity in window: moqtail PR #193 merged 22:37:32 UTC (after run cutoff); moq-transport 6 PRs spec-only; moq-dev/moq main Day +2 quiet. Most plausible flip-back driver is a borderline `moq-dev-rs` / `moq-dev-js` pair that passed May 11 by variance. **Pre-Town-Hall reading: matrix opens the May 12 Town Hall at the floor**, having shown no real movement in 8 days.

**Operation**: Update
**Sources**:
- Slack: `#moq` — **8 new posts** in the May 11 12:00 UTC → May 12 01:00 UTC window: afrind 18:01 *"Brutally killed by meetecho!"*, afrind 18:02 (4.1/4.2/4.3 survey questions), afrind 18:03 (delay-WGLC survey question), afrind 18:15 *"Now available as list email"*, [[suhas-nandakumar]] 18:24 *"wonder a survey monkey link"*, afrind 18:29 *"Eh, email will let people express their nuanced feelings"*, afrind 22:53 *"For anyone interested in draft-18 interop over QMux, we intend to use qmux-01 framing"*, [[luke-curley]] 22:55 *"when is draft-18?"*, afrind 22:56 *"tomorrow"*, [[luke-curley]] 22:56 *"gotta queue up the Claude prompt"*, afrind 22:56 *"interop is 6/9-10"*. **`#moq-interop-runner` channel** (C0B2KQLJGN7): 22 messages in May 9 18:09 CEST → May 12 00:32 CEST window, including the **OpenMOQ fork incident** (Mike English May 9 18:20 CEST → Will Law May 10 21:02 CEST). `#moq-rs`, `#moq-js`, `#libquicr` all unchanged.
- GitHub moq-wg repos:
  - **moq-transport** (the BIG editorial day):
    - **6 PRs MERGED May 11 21:32–22:02 UTC**: #1544 (afrind, *Improve Startup Latency and 0-RTT*, fixes #420 #8…), **#1615** (afrind, *Remove Required Request ID*, fixes #1603 — Apr 27 interim consensus), #1617 (afrind, GOAWAY on request streams, fixes #1481), #1618 (afrind, FIRST_OBJECT bit 0x40), #1621 (afrind, forbid relays from lying about LARGEST_OBJECT, fixes #1386), #1629 (vasilvv, *Clarify definition of scope*, fixes #1432).
    - **Issue #1603 CLOSED** May 11 21:41:24 UTC by afrind with *"This is now tracked in #1519"*.
    - **PR #1628** (afrind QMux moqt-18 ALPN) updated May 11 22:43 UTC, now `mergeable_state=clean`.
    - **PR #1627** OPENED May 3, updated May 11 20:42 UTC — [[ian-swett]] *"SUBSCRIBE with Joining Fetch"* (+44/−139, fixes #1039 #1313 #1602 #1612) — competing Joining-FETCH-as-SUBSCRIBE-mode approach.
    - **PR #1623** (Ian Swett, *Remove Request ID from GOAWAY*, reverts #1559) updated May 11 22:19 UTC — now redundant on most lines after #1617 merged.
    - **PR #1625** (suhasHere, Magnus Security Considerations rebase) updated May 11 23:03 UTC, rebased on top of new `main`.
    - **PR #1605** (vasilvv, DELIVERY_TIMEOUT split into OBJECT_DELIVERY_TIMEOUT + SUBGROUP_DELIVERY_TIMEOUT) updated May 11 23:56 UTC.
    - **PR #1591** (Ian Swett, *RFC: Add flow control for Subscriptions*, MAX_SUB_STREAMS + MAX_SUB_BYTES + SUBGROUP_RESET, fixes #869) updated May 11 22:18 UTC.
    - **PR #1518** (mzanaty, *Filters with reduced scope, no location or group filter*, +265/−16) updated May 11 16:27 UTC — first activity in weeks.
    - **PR #1519** (vasilvv, *Improve design of requests blocking on other requests*) updated May 11 21:40 UTC — now **designated tracker** for swap-tracks / ABR / pause-unpause use cases formerly motivating required-request-id.
  - **moq-wg/msf** (Suhas burst May 11 22:21–23:08 UTC):
    - **PR #156 OPENED** May 11 22:21 UTC (Suhas, *Make MOQT Object to Stream mapping implementation-specific*, +7/−3, addresses #148, `mergeable_state=clean`).
    - **PR #157 OPENED** May 11 22:29 UTC (Suhas, *Clarify Group numbering requirements for restarts (#147)*, +10/−13).
    - **PR #158 OPENED** May 11 22:41 UTC (Suhas, *Replace delta update fields with ordered operations array*, +63/−56, addresses #145).
    - **PR #159 OPENED** May 11 23:08 UTC (Suhas, *Add catalog compression support via track name suffix*, +40/−1).
    - **Issue #139** ([[luke-curley]] May 11 23:23 UTC): proposes nested-object catalog structure.
    - **Issue #129** (yuyou): Suhas May 11 21:50 UTC explains BiDi-stream semantics for PUBLISH+FORWARD=1.
    - **Issue #111**, **#102**: minor activity.
    - **PR #133** (Suhas SCTE-35 + CEA-608/708) updated May 11 21:41 UTC.
  - **moq-wg/loc, secure-objects, cmsf, catalog-format, privacy-pass**: All quiet on `main`.
- GitHub implementations:
  - **moq-dev/moq** (Day +2 main-quiet, 5 external-contributor PRs in 24h):
    - **PR #1402 OPENED** May 12 00:04 UTC by **SteveMcFarlin** (+33/−22, **0 prior commits — first contribution**) — *"moq-gst: Fix MoqSink CAPS handling and per-pad EOS aggregation"*.
    - **PR #1401 OPENED** May 11 20:41 UTC by **skirsten** (+243/−139) — *"Refactor/video pacing rAF"*.
    - **PR #1400 OPENED** May 11 20:21 UTC by **skirsten** (+17/−12) — *"fix: stop leaking PromiseReactions in consumer loops"*.
    - **PR #1399 OPENED** May 11 20:18 UTC by **skirsten** (+3/−0) — *"fix(watch): close MultiBackend's sync and sources"*.
    - **PR #1398 OPENED** May 11 07:21 UTC by **Qizot** (+197/−6) — *"Expose track name and used/unused activity signals"*.
    - **PR #1396** (metapox SUBSCRIBE_UPDATE JS API) updated May 11 08:33 UTC.
    - Open-PR queue now ~12, deepest in repo history.
  - **cloudflare/moq-rs**: **PR #167** ([[suhas-nandakumar]] filter-support framework, +12163/−2197) untouched since May 10 05:03 UTC. Day +29 main-quiet.
  - **moqtail/moqtail**: **PR #193 MERGED** May 11 22:37:32 UTC (final stats +303/−158) — completes the [N/n] upstream-FETCH-on-cache-miss series. PR #192 (release-bot) opened May 11 22:38:27 UTC.
  - **Eyevinn/warp-player**: dependabot burst — PRs #121–127 opened May 11 23:33–23:35 UTC (eslint 9→10, typescript 5.9→6.0, commitlint 20.5→21, deps groups). LOCMAF PR #120 unchanged Day +5.
  - **Eyevinn/moqlivemock**: LOCMAF PR #79 unchanged Day +5.
  - **Quicr/cat-token** (renamed from `cat-rs`): commit May 10 22:30 UTC *"Update repository URL to Quicr/cat-token, bump to 0.1.2"* confirms Suhas's May 6 Slack announcement.
  - **video-dev/moq-js**: No new commits since Feb 17.
  - **google/quiche** (`quiche/quic/moqt`): No new commits since May 5 01:02 UTC — Day +7 quiet.
  - **birneee/quiche_moq**: No new commits since Mar 13.
  - **Eyevinn/moqtransport**: No new commits since Apr 16.
- Mailing list (reactivates after 5-day silence): **4 new threads / 4 new responses in May 11–12 window**: afrind *"[Moq] Joining FETCH Survey"* (May 11); martinduke *"[Moq] London Agenda requests"* (May 11); Mo Zanaty + martinduke *"[Moq] Re: Joining FETCH Survey"* (May 11); martinduke *"[Moq] On other use cases"* (May 12); Mo Zanaty *"[Moq] Re: On other use cases"* (May 12).
- IETF Datatracker: **No new draft revisions** in the May 7–12 window. WG state unchanged: transport-17, msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00. Notable individual: lite-04 (Apr 9), nmsf-01 (Apr 7), qlog-moq-events-06 (Mar 16), **gregoire-moq-msfts-00** (May 6, Day +6, still no on-list announcement). **Draft -18 candidate text is now effectively assembled on `main`** after the 6-PR merge sprint; awaits editor cut for datatracker submission.
- Interop runner: **20 / 71 / 14** at 2026-05-12 00:37:28 UTC. **−1 pass / +1 fail vs May 11** (21/70/14) — back to the post-PR-#145 floor. Walking arc: 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → 19 → 20 → 20 → 21 → **20**. The May 11 +1 lift was per-run variance, not a real recovery. Matrix at 20±1 for 8 of 9 May-weekday readings since May 5.
- MoQ Monthly: No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30). **Day +12 since #1**, longest gap to date.
- tobbee/moq-llm-wiki: No new open issues. (3 closed: #1, #2, #3.)

**Pages updated**: discussions-2026-05.md (new "May 11 12:00 UTC → May 12 01:00 UTC" section covering: 6-PR moq-transport editorial sprint, afrind Joining FETCH Survey + qmux-01 framing announcement, mailing-list 5-day-silence break, MSF Suhas 4-PR burst, moq-dev/moq 5-external-PR wave + SteveMcFarlin first contribution, moqtail PR #193 merge completing upstream-FETCH series, **OpenMOQ fork incident** in `#moq-interop-runner` channel, Quicr/cat-rs → cat-token rename, dependabot warp-player burst, interop floor-return), interop-runner.md (May 12 row + flip-back-to-floor narrative + 8-of-9-readings-at-floor framing), index.md (last_updated bump), log.md.

**Key findings**:
- **The largest single-sitting editorial sprint in moq-transport 2026 lands May 11 21:32–22:02 UTC**: 6 PRs in 30 minutes, headlined by **PR #1615 *"Remove Required Request ID"*** which **materializes the Apr 27 interim consensus on draft -18**. [[alan-frindell]]'s strategy of queueing the entire Apr 14–30 PR stack on May 10/11 for a single-sitting merge is now visible — he's been clearly waiting for the day before the May 12 Town Hall. **Draft -18 candidate text is effectively assembled on `main`** after this sprint; the next datatracker submission is the long-anticipated -18. The Slack confirmation (afrind 22:53 UTC: *"For anyone interested in draft-18 interop over QMux, we intend to use qmux-01 framing"*) makes **qmux-01 the official target framing for draft-18 interop testing** — first concrete commitment after May 11's PR #1628 floated the idea.
- **The mailing-list 5-day-silence-then-coordinated-burst pattern continues to be the WG's pre-public-event signature**: silence May 6–10 (only May 10 weekly digest), then May 11 sees afrind's Joining FETCH Survey (Slack + list), martinduke's London Agenda + use-cases threads, with Mo Zanaty responses. The survey is **the first WG-wide poll specifically on Joining FETCH timing-vs-design tradeoffs** (*"willing to delay WGLC and RFC by ___ months: 0/1/2/3/4+"*), positioning the May 12 Town Hall not as a presentation but as **a forcing function for WG-wide consensus on whether to delay**. [[ian-swett]]'s [PR #1627](https://github.com/moq-wg/moq-transport/pull/1627) *"SUBSCRIBE with Joining Fetch"* (+44/−139) is the **net-shrink alternative** being implicitly surveyed — fold Joining FETCH into SUBSCRIBE modes rather than allow it to be sent on the SUBSCRIBE stream.
- **OpenMOQ governance episode is the first public friction between OpenMOQ and Cloudflare**: [[lucas-pardue]]'s May 10 19:57 CEST characterization (*"Taking IETF work, forming pay to participate consortia, and then coopting running code from others"*) is the **deepest public critique of OpenMOQ's IETF-relation posture** on the wiki record. The carry-forward is structural: [[will-law]] commits to **OpenMOQ code-provenance review before merge** ("ask the dev team to institute that next week" — i.e. week of May 12–18). The **`#moq-interop-runner` channel is now a high-visibility venue**, not a quiet operational channel — to be probed every update. **First MoQ-ecosystem LLM-driven community-incident on record**: Giovanni cites *"over zealous claude perhaps"* / *"claude overstepped"* — fork-then-clone-issues was an LLM-assisted action that went further than intended. This is a noteworthy precedent for an ecosystem where LLM-tooling is now widespread (Luke May 11: *"gotta queue up the Claude prompt"*).
- **moq-dev/moq's external-contributor wave continues**: SteveMcFarlin May 12 00:04 UTC is the **second consecutive new external contributor** after metapox May 10. Combined with skirsten (4 prior) + Qizot (3 prior) recurring, the May 10–11 24h window has **5 external-contributor PRs** vs zero Luke commits to `main`. Luke is in Town Hall prep / Claude-orchestration mode, not merge mode. The repo is **transitioning from solo-Luke to community-contributed** in real time.
- **Interop matrix's pre-Town-Hall reading is at the floor**: 20/71/14 for 8 of 9 May-weekday readings since May 5. The May 11 +1 was variance, not recovery. The May 12 Town Hall opens with the matrix unable to demonstrate post-Apr-27-interim improvement to the public audience — **the spec is moving faster than the implementations are catching up**.

---

# 2026-05-11 — moq-transport pre-Town-Hall burst surfaces draft-18 / QMux fallback

**TL;DR**:
- **moq-wg/moq-transport pre-Town-Hall burst** — the day before the **May 12 MOQ Town Hall** (Dan Rayburn / [[will-law]]), the tracker — quiet for days during the May 6–10 mailing-list silence — receives **7 PRs and 3 issue threads of activity in the May 11 00:27–05:53 UTC window** from [[alan-frindell]] and Victor Vasilyev (vasilvv). **First public mention of `moqt-18` ALPN** lands in afrind's new **[PR #1628](https://github.com/moq-wg/moq-transport/pull/1628)** *"Add QMux framing for moqt-18 over TLS+TCP"* (+4/−3, OPENED May 11 01:29 UTC, fixes Issue #1626 sharmafb May 1 *"Version negotiation for QMUX"*) — first spec-side commitment to **MoQ-over-TLS+TCP via QMux v1**, signaling the post-Apr-27-interim editorial work is being cut into draft -18 candidate text on GitHub. **[[lucas-pardue]] May 11 01:57 UTC comment** cites [QMux draft §8.1-2](https://quicwg.org/qmux/draft-ietf-quic-qmux.html#section-8.1-2) ALPN naming rules — **first Pardue moq-transport comment in months**, Cloudflare's QMux co-author tagging in for ALPN review. Other newly-opened: **[PR #1629](https://github.com/moq-wg/moq-transport/pull/1629)** (vasilvv +7/−0, *"Clarify definition of scope"*, fixes michalhosna's Mar 14 session-reuse Issue #1432). Older PRs rebased/refreshed for Town Hall: **#1605** (vasilvv, DELIVERY_TIMEOUT split into OBJECT_DELIVERY_TIMEOUT + new SUBGROUP_DELIVERY_TIMEOUT, +112/−77); **#1617** (afrind, GOAWAY on request streams to migrate individual requests, +85/−73); **#1618** (afrind, FIRST_OBJECT bit 0x40 in SUBGROUP_HEADER, type-format expands 0b00X1XXXX → 0b0XX1XXXX, +22/−10); **#1621** (afrind, forbid relays from lying about LARGEST_OBJECT, +8/−1); **#1625** (suhasHere, rebased [[magnus-westerlund]] Security Considerations PR #1455, +132/−1). Issue threads: **#1603** (martinduke required-request-id, 12 comments) — afrind May 11 01:33 UTC quotes Cullen's mailing-list swap-tracks use case, bringing Apr 27 interim consensus (*"remove required-request-id from draft 18 and fix Joining Fetch"*) into direct collision with Cullen's pushback; **#1614** (kixelated JOINING-FETCH+SUBSCRIBE prioritization) Day +14 ping; **#1582** (vasilvv REQUEST_ERROR caching) Day +42 ping.
- **moq-wg/msf Issue #8 (Content protection)** — vasilvv May 11 02:54 UTC: *"This should probably be moved to CMSF repo, since that's where the text about content protection was moved."* Pushes back on suhasHere's May 9 *"can we close this?"*, extending the broader May spec-restructuring pattern (event-timeline + content-protection text migrating **out of MSF** into format-specific WG documents).
- **Implementations**: First full day of all-around `main`-side quiet in May. moq-dev/moq Day +1 quiet since Luke's May 9 22:30 UTC PR #1393 merge; **7-PR open queue unchanged at +4362/−307** (#1374 Day +7, #1388 Day +4, #1389 Day +4 no further LOC growth, #1394/#1395/#1396/#1397 Day +1). cloudflare/moq-rs Day +28 main-quiet, PR #167 ([[suhas-nandakumar]] +12163/−2197) untouched since May 10 05:03 UTC. moqtail PR #193 [4/n] (sharmafb +248/−132) **Day +5 stuck mergeable_state=blocked**, the longest non-Luke PR stall in moqtail draft-16 era. video-dev/moq-js, birneee/quiche_moq, google/quiche moqt, Eyevinn/moqlivemock+warp-player (LOCMAF PRs Day +4), Eyevinn/moqtransport, Quicr/cat-rs all quiet. **Slack `#moq`**: Mike English (Cloudflare) May 9 18:23 CEST creates new `#moq-interop-runner` channel (C0B2KQLJGN7) — first split of interop-runner discussion off the main channel. Luke May 9 20:13 CEST posts HN WebRTC flame-war link (`news.ycombinator.com/item?id=48051951`), pre-Town-Hall public-discourse positioning.
- **Interop**: **21 / 70 / 14** at 2026-05-11 00:42:00 UTC — **+1 pass / −1 fail vs May 10** (20/71/14). Walking arc: 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → 19 → 20 → 20 → **21**. Marginal lift above the post-PR-#145 floor, still −4 below the May 2 high (25). **Most plausible cause**: first run since the May 9 evening moq-dev/moq merges (PRs #1338 / #1392 / #1393), so `moq-dev-rs` / `moq-dev-js` docker images rebuilt against `moq-lite v0.16.0` for the first time. PR #1393's cache-eviction 30s → 5s tightening is the most likely single-pair flip-driver. moqtail PR #193 and moq-rs PR #167 still open — no `moqtail-relay` or `moq-rs-draft-16` rebuild involved.

**Operation**: Update
**Sources**:
- Slack: `#moq` — **2 new posts** in the May 9 11:00 UTC → May 11 12:00 UTC window: (a) Mike English May 9 18:23 CEST (16:23 UTC) created **`#moq-interop-runner` channel** (C0B2KQLJGN7); (b) [[luke-curley]] May 9 20:13 CEST posted HN WebRTC flame-war link. `#moq-rs`, `#moq-js`, `#libquicr` all unchanged.
- GitHub moq-wg repos:
  - **moq-transport** (pre-Town-Hall burst):
    - **PR #1628 OPENED** May 11 01:29 UTC ([[alan-frindell]], +4/−3, `mergeable_state=blocked`) — *"Add QMux framing for moqt-18 over TLS+TCP"*. **First public `moqt-18` ALPN reference**; fixes Issue #1626 (sharmafb May 1). **[[lucas-pardue]] May 11 01:57 UTC** cites [QMux §8.1-2 ALPN naming rules](https://quicwg.org/qmux/draft-ietf-quic-qmux.html#section-8.1-2) — implies afrind's `moqt-18` ALPN needs to be QMux-suffixed.
    - **PR #1629 OPENED** May 11 05:47 UTC (vasilvv, +7/−0, `mergeable_state=clean`) — *"Clarify definition of scope"*. Fixes Issue #1432 (michalhosna Mar 14 session-reuse rules).
    - **PR #1605** (vasilvv, Apr 14, +112/−77) — *"Split DELIVERY_TIMEOUT into two types of timeout"* — updated May 11 04:28 UTC with *"Addressed the comments."* Splits into `OBJECT_DELIVERY_TIMEOUT` + new `SUBGROUP_DELIVERY_TIMEOUT`. Fixes Issue #667.
    - **PR #1617** (afrind, Apr 28, +85/−73) — *"Allow GOAWAY on request streams to migrate individual requests"* — updated May 11 05:20 UTC. Per-request GOAWAY with zero-length URI causes endpoint to re-issue request on the specified URI session. Fixes Issue #1481.
    - **PR #1618** (afrind, Apr 28, +22/−10) — *"Add FIRST_OBJECT bit to SUBGROUP_HEADER type"* — updated May 11 04:39 UTC. Bit 6 (0x40) signals subgroup contains the first object published by the original publisher; type byte expands 0b00X1XXXX → 0b0XX1XXXX (still 1-byte varint).
    - **PR #1621** (afrind, Apr 28, +8/−1) — *"Forbid relays from lying about LARGEST_OBJECT"* — updated May 11 00:27 UTC. Fixes Issue #1386.
    - **PR #1625** (suhasHere, Apr 30, +132/−1) — *"Rebased and Update Security Considerations PR from Magnus Westerlund"* — updated May 11 01:09 UTC. Rebases [[magnus-westerlund]]'s PR #1455.
    - **Issue #1603** (martinduke, *"What is the use case for required-request-id"*, 12 comments) — **afrind May 11 01:33 UTC** quotes Cullen's mailing list post: *"1) Swap tracks ..."*. Brings the Apr 27 interim consensus (Ian Swett *"remove required-request-id from draft 18"*) into collision with Cullen's swap-tracks use case.
    - **Issue #1614** (kixelated JOINING FETCH + SUBSCRIBE prioritization) — Day +14 ping at May 11 03:09 UTC.
    - **Issue #1582** (vasilvv REQUEST_ERROR caching) — Day +42 ping at May 11 03:09 UTC.
  - **moq-wg/msf — Issue #8** (Content protection): **vasilvv May 11 02:54 UTC**: *"This should probably be moved to CMSF repo, since that's where the text about content protection was moved."* Follows suhasHere's May 9 *"can we close this?"*. Editorial direction: migrate to [[moq-cmsf]] rather than close.
  - **moq-wg/loc, secure-objects, cmsf, catalog-format, privacy-pass**: All quiet on `main`.
- GitHub implementations (first all-around quiet day in May):
  - **moq-dev/moq**: No new commits since [[luke-curley]]'s May 9 22:30 UTC PR #1393 merge. Day +1 of post-burst quiet. Open-PR queue unchanged at 7 PRs / +4362/−307 (#1374 Day +7, #1388 Day +4, #1389 Day +4 no further LOC growth, #1394/#1395/#1396/#1397 Day +1).
  - **cloudflare/moq-rs**: **PR #167** ([[suhas-nandakumar]] filter-support framework, +12163/−2197) untouched since May 10 05:03 UTC. Day +28 main-quiet.
  - **moqtail/moqtail**: **PR #193** [4/n] (sharmafb upstream FETCH on cache miss, +248/−132, `mergeable_state=blocked`) untouched since May 9 20:29 UTC — **Day +5 stuck**.
  - **Eyevinn/moqlivemock — PR #79 LOCMAF** unchanged Day +4.
  - **Eyevinn/warp-player — PR #120 LOCMAF** unchanged Day +4.
  - **video-dev/moq-js**: No new commits since Feb 17.
  - **google/quiche** (`quiche/quic/moqt`): No new commits since May 5 01:02 UTC — Day +6 quiet post-Vasiliev parser-rewrite.
  - **birneee/quiche_moq**: No new commits since Mar 13.
  - **Eyevinn/moqtransport**: No new commits since Apr 16.
  - **Quicr/cat-rs / catapult**: No new commits since May 7 04:07 UTC.
- Mailing list:
  - **No new human-authored messages** since [[yu-you]]'s May 8 11:52 CEST 3GPP SA4 #136 PoC announcement. Only the auto-generated May 10 weekly digest in the May 6–11 window — **5-day human-silence stretch**, longest in May. [[cullen-jennings]] (request-sync), [[magnus-westerlund]] (framing), [[suhas-nandakumar]], [[will-law]], [[ian-swett]], [[alan-frindell]] all silent on-list. All May 11 activity is on GitHub instead. May 12 MOQ Town Hall is the awaited unlock event.
- IETF Datatracker: **No new draft revisions** in the May 7–11 window. WG state unchanged: transport-17, msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00. Notable individual drafts: lite-04 (Apr 9), nmsf-01 (Apr 7), qlog-moq-events-06 (Mar 16), **gregoire-moq-msfts-00** (May 6, **Day +5**, still no on-list announcement). PR #1628's `moqt-18` ALPN reference suggests draft -18 candidate text is being prepared on GitHub ahead of the datatracker submission.
- Interop runner: **21 pass / 70 fail / 14 skip** (105 tests, 2026-05-11 00:42:00 UTC report). **+1 pass / −1 fail vs May 10** (20/71/14). Walking arc: 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → 19 → 20 → 20 → **21**. First marginal lift above the post-PR-#145 floor since the May 5 −4 regression. **Most plausible cause**: first run since the May 9 evening moq-dev/moq merges (PR #1338 release-train `moq-lite v0.16.0`, PR #1392 moq-ffi, PR #1393 cache-eviction 30s → 5s), so `moq-dev-rs` / `moq-dev-js` docker images rebuilt against `v0.16.0` for the first time. PR #1393's cache-eviction tightening is the most likely single-pair flip-driver. moqtail PR #193 still **open Day +5** so no `moqtail-relay` rebuild; moq-rs PR #167 still open so no `moq-rs-draft-16` rebuild.
- MoQ Monthly: No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30). **Day +11 since #1.**
- tobbee/moq-llm-wiki: No new open issues. (3 closed: #1, #2, #3.)

**Pages updated**: discussions-2026-05.md (new "May 10 12:00 UTC → May 11 12:00 UTC" section: moq-transport pre-Town-Hall burst + draft-18 + QMux signal, msf #8 vasilvv push-to-CMSF, all-impl-quiet day, Mike-English new interop-runner channel, Luke HN flame post, 5-day mailing-list silence), interop-runner.md (May 11 row + +1-pass narrative explaining v0.16.0 builder-rebuild theory), index.md (last_updated bump), log.md.

**Key findings**:
- **`moqt-18` ALPN appears in spec text for the first time** ([[alan-frindell]] PR #1628 May 11 01:29 UTC, "*Add QMux framing for moqt-18 over TLS+TCP*"). This is the **first GitHub-side confirmation that draft -18 editorial work is in progress** — up to now the active draft is transport-17 (Apr 9 / IETF Datatracker). The PR explicitly couples the draft -18 ALPN to **QMux v1 framing over TLS+TCP** — the **first spec-side commitment to MoQ-over-TLS+TCP fallback** via QMux. [[lucas-pardue]] (Cloudflare, QMux co-author) responds within 28 minutes citing QMux ALPN naming rules — Cloudflare tagging in for review of how the `moqt-18` token must be QMux-suffixed. The Apr 27 interim consensus on draft -18 work is now being materialized as concrete editorial PRs.
- **moq-transport tracker activity is decoupled from the mailing list**: 7 PRs + 3 issues touched on May 11 vs **zero human-authored mailing-list messages May 6–10** (only the May 10 weekly digest). The WG has shifted from on-list debate to GitHub-issue + interim-meeting + PR-cleanup cadence. The pre-Town-Hall burst pattern (afrind/vasilvv rebasing Apr 14–30 PRs on the eve of a public meeting) is now the third occurrence of this in 2026 (mirrors the pre-Apr-27-interim and pre-NAB editorial sprints). The May 12 Town Hall hosted by Dan Rayburn / [[will-law]] is **public-facing** — distinct from the WG-internal interims — so afrind/vasilvv are prepping the editorial story for an outside-IETF audience.
- **msf Issue #8 vasilvv migration push extends the May spec-restructuring direction**: after May 8 wilaw/gwendalsimon/suhasHere consensus to spin out event-timeline formats from MSF, May 11 vasilvv pushes content-protection text out to CMSF. The MSF spec is being **trimmed back to a packaging spec** rather than the omnibus document it was on opening, with: (a) event-timeline formats (SCTE-35, WebVTT, IMSC1) → 3 separate individual drafts; (b) content protection / encryption → CMSF; (c) MSFTS (MPEG-2 TS packaging) → already a separate draft (gregoire-moq-msfts-00). Suhas's role is shifting from MSF author to spec curator splitting the document.
- **First all-around `main`-quiet day across all tracked impl repos in May**: moq-dev/moq quiet Day +1, moq-rs Day +28, moqtail Day +5, all Eyevinn repos Day +4 on the LOCMAF branch, google/quiche moqt Day +6, video-dev/moq-js Day +84, birneee Day +59. The 7-PR moq-dev/moq backlog is large but **idle** — Luke is in May 12 prep mode rather than May 11 merge mode. The matrix is in a 7-day plateau (May 4–11 all within 20±1 except May 8's 19) — the May 5 PR #145 regression remains structurally uncorrected.
- **The +1 pass interop lift is the first post-PR-#145 floor break**: walking arc since May 5 was 20 → 20 → 20 → 20 → 19 → 20 → 20 → **21**. The May 9 evening Luke merges (release-train shipping `moq-lite v0.16.0` + cache-eviction 30s → 5s) are the first wire-impacting `moq-dev` change since the PR #145 regression; the May 11 +1 is consistent with a single `moq-dev-rs` / `moq-dev-js` rebuild flip. Whether this is a real recovery or per-run variance will be visible in the May 12 report. The May 5 −4 regression is still mostly uncorrected (matrix at 21, May-2 high was 25).

---

# 2026-05-10 — moq-dev/moq breaks quiet: v0.16.0 ships, 2 fix PRs merge, 4 new PRs opened including first external May contributor

**TL;DR**:
- **moq-dev/moq breaks 2-day quiet on `main`** — after no commits since May 7 18:17 UTC, [[luke-curley]] resumes May 9 19:27 UTC with **3 merges** ([PR #1338](https://github.com/moq-dev/moq/pull/1338) release-train shipping `moq-lite v0.16.0` +251/−128; [PR #1392](https://github.com/moq-dev/moq/pull/1392) moq-ffi uniffi-bindgen fix +3/−3; [PR #1393](https://github.com/moq-dev/moq/pull/1393) **track group cache eviction 30s → 5s** single-constant tuning) and **2 new feature PRs OPENED** the same evening: [PR #1394](https://github.com/moq-dev/moq/pull/1394) *Auto-detect catalog format from broadcast name extension* (+197/−86) and [PR #1395](https://github.com/moq-dev/moq/pull/1395) *moq-cli: rename `--output` to `--format`, `--name` to `--broadcast`, add `accept` subcommand* (+162/−42, CLI ergonomics breaking change). PR #1389 stats aggregation **grew +215 LOC overnight** (+1168/−39 → +1383/−50). After the post-revert auto-bump, `moq-bot` opens [PR #1391](https://github.com/moq-dev/moq/pull/1391) for the v0.16.1 release train. Open-PR count now **7** (was 3 on May 8); combined diff **+4362/−307**, deepest backlog in repo history.
- **First non-Luke contributor to moq-dev/moq in May**: `metapox` (taku) opens 2 PRs at May 10 10:58 UTC closing out the May 5–6 SUBSCRIBE_UPDATE backlog: [PR #1396](https://github.com/moq-dev/moq/pull/1396) *feat(lite): implement SUBSCRIBE_UPDATE API for JS subscriber and publisher* (+30/−4, addresses Issue #1363) and [PR #1397](https://github.com/moq-dev/moq/pull/1397) *fix(lite): update in-flight group priorities on SUBSCRIBE_UPDATE* (+176/−63, addresses Issue #1370). New external contributor — no prior commits in repo. Same morning, **Issue #1390** opened by **Dan Rossi** — *"Production ES Watch library won't connect to the dev relay"* — first **production-deployment** friction issue in months, signal that `@moq/watch` is in real use against non-Cloudflare relays.
- **Implementations**: moq-dev/moq day-4 burst (3 merges + 4 new PRs + 1 metapox external contributor) is the only material activity. **cloudflare/moq-rs PR #167** ([[suhas-nandakumar]] filter-support framework, +12163/−2197, opened May 6) updated May 10 05:03 UTC — Suhas's largest moq-rs PR still active; moq-rs `main` Day +27 quiet. **moqtail PR #193** still open Day +4 with `mergeable_state=blocked`; moqtail `main` quiet since May 6. moq-wg/secure-objects Issue #8 — [[luke-curley]] May 9 19:08 UTC comment, first non-author engagement in many days. Eyevinn LOCMAF PRs #79/#120 unchanged Day +3. video-dev/moq-js, birneee/quiche_moq, Eyevinn/moqtransport, google/quiche moqt, Quicr/cat-rs all quiet. moq-wg/msf PR #133 quiet for first time since opening (no comments since May 8 18:30 UTC).
- **Interop**: **20/71/14** at 2026-05-10 00:40:03 UTC — **flat 2nd consecutive day** (gh-pages commit `f70964a` 01:04:20 UTC). Walking arc since the Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → 19 → 20 → **20**. The May 5 −4 regression that returned the matrix to the post-PR-#145 floor remains uncorrected; May 8's brief dip to 19 was statistical noise. moq-dev/moq's May 9 evening merges (PRs #1338, #1392, #1393) all landed **after** the May 10 00:40 UTC run, so any `moq-lite v0.16.0` builder rebuild effect would only show in the May 11 report. moqtail PR #193 still open so no `moqtail-relay` rebuild has touched the matrix.

**Operation**: Update
**Sources**:
- Slack: `#moq` — **no new posts** since yu you's May 8 11:52 CEST 3GPP SA4 #136 PoC announcement. `#moq-rs`, `#moq-js`, `#libquicr` all unchanged.
- GitHub moq-wg repos:
  - **moq-transport**: No new commits, no new issues, no new PRs in the May 9 06:00 UTC → May 10 12:00 UTC window. Issue #1622 untouched since May 8. PR #1617 (afrind GOAWAY-on-request-streams) state unchanged.
  - **moq-wg/msf — PR #133 (Suhas SCTE-35 + CEA-608/708)**: No new comments since May 8 18:30 UTC suhasHere reply. **First quiet day on the thread** since avelad's May 7 split-into-3-PRs comment opened the review escalation.
  - **moq-wg/secure-objects**: **Issue #8** *"Content protection and encryption"* — **[[luke-curley]] new comment May 9 19:08 UTC** (first non-author engagement on the thread in many days). No `main` commits.
  - **moq-wg/loc, cmsf, catalog-format, privacy-pass**: All quiet on `main`.
- GitHub implementations:
  - **moq-dev/moq** (day-4 burst after 2-day quiet, all [[luke-curley]] except where noted):
    - **PR #1338 MERGED** May 9 19:27 UTC (+251/−128) — release-train auto-bump shipping `moq-lite v0.16.0`. Replaced same instant by **PR #1391 OPENED** May 9 19:29 UTC (`moq-bot`, release-train for v0.16.1).
    - **PR #1392 MERGED** May 9 21:41 UTC (+3/−3) — *moq-ffi: fix uniffi-bindgen invocation, bump 0.2.9*.
    - **PR #1393 MERGED** May 9 22:30 UTC (+1/−1) — *Reduce track group cache eviction timeout from 30s to 5s*. Single-constant tuning, Claude Code co-author. Reduces idle memory at the cost of more cache rebuilds for slow re-subscribers.
    - **PR #1394 OPENED** May 9 22:04 UTC (+197/−86) — *Auto-detect catalog format from broadcast name extension*. Catalog format inferred from path-extension trailer rather than passed as separate flag; aligns with PR #1341 moq-mux backport (May 7).
    - **PR #1395 OPENED** May 9 22:36 UTC (+162/−42) — *moq-cli: rename `--output` to `--format`, `--name` to `--broadcast`, add `accept` subcommand*. CLI ergonomics breaking change; new `accept` subcommand mirrors `publish`/`subscribe` for inbound subscriptions.
    - **PR #1396 OPENED** May 10 10:58 UTC by `metapox` (taku, +30/−4) — *feat(lite): implement SUBSCRIBE_UPDATE API for JS subscriber and publisher*. Closes Issue #1363 (May 5).
    - **PR #1397 OPENED** May 10 10:58 UTC by `metapox` (+176/−63) — *fix(lite): update in-flight group priorities on SUBSCRIBE_UPDATE*. Closes Issue #1370 (May 6).
    - **Issue #1390 OPENED** May 10 11:07 UTC by **Dan Rossi** — *"Production ES Watch library won't connect to the dev relay"*. First production-deployment friction issue from a non-developer outside contributor in months.
    - **PR #1389 stats aggregation** grew **+215 LOC** overnight: was +1168/−39 May 8, now +1383/−50 (May 10 00:12 UTC update). Day +3 still open and actively iterated.
    - **PRs #1374 / #1388 / #1389 / #1394 / #1395 / #1396 / #1397**: 7 open feature PRs total. Combined +4362/−307 — deepest backlog in repo history.
  - **cloudflare/moq-rs**: **PR #167** ([[suhas-nandakumar]] filter-support framework, opened May 6, +12163/−2197) **updated May 10 05:03 UTC** — review iteration; diff size unchanged (still the largest open PR in moq-rs). `main` Day +27 quiet (no commits since Apr 13).
  - **moqtail/moqtail**: PR #193 [4/n] (sharmafb upstream FETCH on cache miss, +248/−132) updated May 9 20:29 UTC, **still open Day +4, `mergeable_state=blocked`**. `main` quiet since May 6.
  - **Eyevinn/moqlivemock — PR #79 LOCMAF** unchanged since May 8 21:03 UTC. Day +3 still open.
  - **Eyevinn/warp-player — PR #120 LOCMAF** unchanged since May 8 09:42 UTC. Day +3 still open.
  - **video-dev/moq-js**: No new commits since Feb 17.
  - **google/quiche** (`quiche/quic/moqt`): No new commits since May 5 01:02 UTC — Day +5 quiet post-Vasiliev parser-rewrite.
  - **birneee/quiche_moq**: No new commits since Mar 13.
  - **Eyevinn/moqtransport**: No new commits since Apr 16.
  - **Quicr/cat-rs**: No new commits since May 7 04:07 UTC.
- Mailing list:
  - **May 10 — *"[Moq] Weekly github digest (Media Over QUIC Activity Summary)"*** (Repository Activity Summary Bot, auto-generated weekly digest). Same cadence as the May 3 digest. **Zero human-authored messages May 9–10**.
  - Cullen request-sync thread (May 1) / Magnus Westerlund framing thread (May 4) / [[suhas-nandakumar]] / [[will-law]] all silent. **Four-day silence stretch** in human discussion (last human message: yu you May 8 about 3GPP SA4 #136 PoC).
- IETF Datatracker: **No new draft revisions**. WG state unchanged: transport-17, msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00. Notable individual drafts: lite-04 (Apr 9), nmsf-01 (Apr 7), qlog-moq-events-06 (Mar 16), gregoire-moq-msfts-00 (May 6, **Day +4**, still no on-list announcement).
- Interop runner: **20 pass / 71 fail / 14 skip** (105 tests, 2026-05-10 00:40:03 UTC report, gh-pages commit `f70964a` 01:04:20 UTC). **Flat vs May 9** (20/71/14). Walking arc: 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → 19 → 20 → **20**. moq-dev/moq's May 9 evening merges all landed **after** the May 10 00:40 UTC interop run, so any `moq-lite v0.16.0` builder-rebuild effect would only show in the May 11 report. moqtail PR #193 still open (Day +4) so no `moqtail-relay` rebuild has touched the matrix. The post-PR-#145 floor at 20 pass continues.
- MoQ Monthly: No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30 / May 1). **Day +10 since #1.**
- tobbee/moq-llm-wiki: No new open issues. (3 issues remain closed: #1, #2, #3.)

**Pages updated**: discussions-2026-05.md (new "May 9 06:00 UTC → May 10 12:00 UTC" section: moq-dev/moq day-4 burst, metapox first external May contributor, Dan Rossi production friction issue, moq-rs PR #167 filter-framework still active, secure-objects #8 kixelated comment, moqtail PR #193 still blocked, mailing-list 4-day human-silence stretch), interop-runner.md (May 10 row + flat-day narrative), index.md (last_updated bump), log.md.

**Key findings**:
- **moq-dev/moq's May 9 day-4 burst is the heaviest open-PR queue in repo history at +4362/−307 across 7 unmerged PRs**: 3 large feature PRs (#1374 Lite05 DATAGRAMS +1615/−7 Day +6, #1388 LOC frame format +799/−17 Day +3, #1389 stats aggregation +1383/−50 Day +3 — grew +215 LOC overnight) + 2 same-evening Luke ergonomics PRs (#1394 Auto-detect catalog format +197/−86, #1395 moq-cli renames +162/−42) + 2 metapox SUBSCRIBE_UPDATE PRs (#1396 +30/−4, #1397 +176/−63). The **PR #1389 +215 LOC growth in 24h** signals active design iteration (not just review-comment polishing) and confirms Luke is reformulating the closed PR #853 (fcancela observability +1261/−38) into a more ambitious in-band stats-broadcasts design rather than a fix-and-merge.
- **First non-Luke contributor to moq-dev/moq in May (metapox / taku)**: 2 PRs opened May 10 10:58 UTC, both **closing pre-existing Luke-filed issues** (#1363 SUBSCRIBE_UPDATE TS impl, #1370 in-flight group priorities). This is the first time in May an external contributor has both opened and immediately delivered on Luke's tracked issue backlog — the typical pattern is Luke himself opens-and-closes issues in the same session. metapox has no prior commits in moq-dev/moq history, so this is a new entry.
- **Dan Rossi's Issue #1390 is the first production-deployment friction signal in months**: *"Production ES Watch library won't connect to the dev relay"* — implies (a) at least one real production deployment of `@moq/watch` exists outside `relay.cloudflare.com`, (b) the deployment is **failing** against the `relay.moq.dev` dev relay rather than a Cloudflare-hosted one. **Pattern signal**: moq-dev/moq's `@moq/watch` has at least one real downstream production user attempting to use the dev infrastructure. (Dan Rossi's prior issue history in moq-dev/moq is unclear; if first-time, this expands the active production-user surface from 0 to 1.)
- **Suhas's PR #167 still active in moq-rs** (May 10 05:03 UTC update) confirms the May-5/6 cross-repo pattern: Suhas pushes filter+observability infrastructure into **moq-rs**, while Luke reformulates the same domain inside **moq-dev/moq** (#1389 stats aggregation, +215 LOC overnight). Same observability problem, two parallel impls, two different codebases — and PR #853 in moq-dev/moq (fcancela's combined-domain attempt) was closed. **The two-track pattern persists**: moq-rs gets the comprehensive framework, moq-dev/moq gets Luke's smaller in-house design.
- **moqtail PR #193 still blocked Day +4**: with `mergeable_state=blocked` and no maintainer review since the May 9 metadata ping, the upstream-FETCH-on-cache-miss feature [4/n] is now the longest-stalled non-Luke PR in the moqtail draft-16 era. `main` quiet since May 6 means no rebuilds; the May 5 −4 interop regression remains structurally uncorrected pending this merge.
- **Mailing-list 4-day human-silence stretch is the longest in May**: only the auto-generated May 10 weekly digest in the May 6–10 window. Cullen / Magnus Westerlund / Suhas / Will Law / Ian Swett / afrind all silent on-list. Implication: the May 5 *Knowing the start of a Subgroup* exchange and the May 8 Cullen pushback are the last unanswered substantive content; the WG is functionally on hiatus on the list awaiting either the May 12 MOQ Town Hall (Will Law / Dan Rayburn) or the next IETF interim.

---

# 2026-05-09 — Eyevinn LOCMAF packaging proposal; MSF event-timeline split debate

**TL;DR**:
- **NEW packaging proposal: LOCMAF (Low Overhead CMAF)** — Hugo Björs (Eyevinn) opens twin PRs [moqlivemock #79](https://github.com/Eyevinn/moqlivemock/pull/79) (+2697/−83, 17 files) and [warp-player #120](https://github.com/Eyevinn/warp-player/pull/120) (+2211/−188, 14 files) on May 7, both updated through May 8. **Experimental LOC-inspired/compatible CMAF compression** designed for his master's thesis: avoids re-transmitting fixed/derivable CMAF header fields by encoding only non-derivable fields as MoQT/LOC-style key-value pairs aggregated under one LOCMAF property, defining 3 properties (init segment, full header, delta header). **Optimizations**: `tfdt.baseMediaDecodeTime` calculated from prior `baseMediaDecodeTime` + sample durations (omitted from wire); single-sample fragments omit sample size (equals payload length). **First standalone container-format proposal from Eyevinn since the v0.8.0 LOC pipeline release** — bridges the LOC/CMAF gap from the impl side rather than the spec side ([[luke-curley]]'s March compressed-mp4 attempt was the spec-side counterpart). Targets DRM testing on the warp-player branch.
- **moq-wg/msf PR #133 escalates to spec-restructuring debate** — [[will-law]] May 8 11:29 UTC notices an asymmetry in event-timeline format coverage (SCTE-35 carriage spec'd inline but WebVTT/IMSC1 punted to external drafts) and asks whether *all* event-timeline formats should move to separate drafts. **gwendalsimon agrees** (May 8 13:09 UTC); **suhasHere replies May 8 18:30 UTC** *"I do have initial drafts on..."* — implies pre-staged draft text already exists for the SCTE-35 / WebVTT / IMSC1 separation. **Editorial direction shift**: PR #133 is now likely to be split into 3+ separate individual drafts (CEA-608/708 stays in MSF; SCTE-35, WebVTT, IMSC1 each spin out as separate Event-Timeline drafts), extending the MSF Packaging Extensions umbrella (see [[moq-msfts]] precedent) into Event-Timeline Extensions. avelad's May 7 split-into-3-PRs comment was the trigger; today's exchange formalizes the spec-restructuring.
- **Implementations**: Eyevinn LOCMAF PRs the only material activity. moq-dev/moq main quiet on May 8 (last commit May 7 18:17 UTC); 3 large PRs **still open** Day +4 (#1374 Lite05 DATAGRAMS, #1388 LOC frame format, #1389 stats aggregation) — the +3877/−303 Claude-Code-generated diff backlog is now the largest open-PR queue in moq-dev/moq history. moqtail completely quiet for the 2nd consecutive day; PR #193 untouched 48h+. cloudflare/moq-rs Day +26 quiet; google/quiche moqt Day +4 quiet; video-dev/moq-js, birneee/quiche_moq, Eyevinn/moqtransport all quiet. moq-wg/msf only repo with activity (PR #133 comment thread); moq-transport / loc / secure-objects / cmsf / catalog-format / privacy-pass all quiet on `main`.
- **Interop**: 20/71/14 at 2026-05-09 00:39 UTC — **+1 pass / −1 fail** vs May 8's 19/72/14. **Partial recovery back to the May 4–7 floor**, not below it. Walking arc since the Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → 19 → **20**. moqtail PR #193 still **open** (Day +3 since open) so the bounce isn't a moqtail-relay rebuild effect; most likely natural per-run variance. Net effect of the 2-day excursion to 19 is zero.

**Operation**: Update
**Sources**:
- Slack: `#moq` — **1 new post** (yu you May 8 11:52 CEST): *FYI. We will present a conferencing PoC over MOQT at the upcoming 3GPP SA4 #136 meeting next week in Montreal, Canada.* Links to [3GPP S4-261065 input document](https://www.3gpp.org/ftp/tsg_sa/WG4_CODEC/TSGS4_136_Montreal/Docs/S4-261065.zip) and the [FS_Q4RTC_MED study (SP-251661)](https://www.3gpp.org/ftp/TSG_SA/TSG_SA/TSGS_110_Baltimore_2025-12/Docs/SP-251661.zip). PoC body: *"based on our in-house MOQT v17 implementation and provided as an informative input to the ongoing study in SA4."* **First public mention of a Nokia in-house MOQT v17 stack**; **first cross-pollination between MOQT and 3GPP SA4 standardization** (FS_Q4RTC_MED is a 3GPP study item on Q4RTC media). `#moq-rs`, `#moq-js`, `#libquicr` all unchanged.
- GitHub moq-wg repos:
  - **moq-transport**: No new commits, no new issues, no new PRs in May 8 06:00 UTC → May 9 06:00 UTC window. PR #1617 ([[alan-frindell]] *Allow GOAWAY on request streams to migrate individual requests*, +85/−73) received a metadata-only timestamp ping May 8 17:15 UTC — last code commit on the branch remains May 1 18:48 UTC. No new comments on Issue #1622.
  - **moq-wg/msf — PR #133 (Suhas SCTE-35 + CEA-608/708)** received **3 new comments** in 7 hours, escalating from yesterday's avelad split-into-3-PRs suggestion to a full spec-restructuring exchange:
    - **wilaw May 8 11:29 UTC**: *"I notice another anomaly here. The current draft has a section for defining the event timeline carriage of SCTE-35 data, but then it punts the definition of the carriage of WebVTT and IMSCI to external drafts. Wouldn't be better to specify all event timeline formats outside of the MSF spec?"* — proposes spinning out all event-timeline formats as separate drafts.
    - **gwendalsimon May 8 13:09 UTC**: agrees with wilaw's restructuring direction.
    - **suhasHere May 8 18:30 UTC**: *"@wilaw @gwendalsimon I do have initial drafts on..."* — reveals pre-staged draft text already exists for the separation.
    - **Direction**: 3 separate Event-Timeline format drafts (SCTE-35, WebVTT, IMSC1) likely to spin out as individual drafts; CEA-608/708 accessibility stays in MSF. Extends the MSF Packaging Extensions pattern (precedent: [[moq-msfts]]) into Event-Timeline Extensions.
  - **moq-wg/secure-objects, loc, cmsf, catalog-format, privacy-pass**: All quiet on `main`.
- GitHub implementations:
  - **Eyevinn/moqlivemock — PR #79 OPENED** May 7 13:12 UTC by hugobjoers (+2697/−83, 17 files, **OPEN**, updated May 8 21:03 UTC) — *Add LOCMAF support*. **LOCMAF (Low Overhead CMAF)** = compact LOC-inspired/compatible CMAF packaging that avoids re-transmitting CMAF header fields that are fixed, derivable, or only present for structural reasons. Stores only fields needed to reconstruct CMAF init segments and `moof` fragment headers. Encoding: fields as MoQT/LOC-style key-value pairs, each with a LOCMAF ID; values aggregated into **one** LOCMAF property rather than one LOC property per CMAF field (avoids globally coordinating new property IDs). **Three LOCMAF properties**: (1) **init segment** — non-derivable fields needed to reconstruct CMAF `ftyp` + `moov`; (2) **full header** — non-derivable fields needed to reconstruct a complete `moof` header (must be sent as stream access point + first object in MoQT group, ensuring group is independently decodable); (3) **delta header** — differences relative to the previous `moof` header (with a "deleted" semantic that resets fields to defaults rather than treating them as deltas). Decompression: receiver constructs empty CMAF init/fragment headers with default values, parses LOCMAF KV map, applies stored deltas. **Key optimizations**: (a) `tfdt.baseMediaDecodeTime` computed from previous `baseMediaDecodeTime` + previous sample durations — omitted from wire; (b) single-sample fragments omit sample size (equals LOCMAF payload length). **Body marks the proposal as experimental, with a more detailed description and measurements coming in the author's master's thesis.**
  - **Eyevinn/warp-player — PR #120 OPENED** May 7 13:15 UTC by hugobjoers (+2211/−188, 14 files, **OPEN**, updated May 8 09:42 UTC) — *Add LOCMAF support*. Player-side counterpart to moqlivemock #79 (cross-references it). Body: *"meant to match the corresponding branch and pull request"*. A separate branch tests **DRM with LOCMAF**, but DRM is not in this PR.
  - **moq-dev/moq**: **No new commits on `main`** since May 7 18:17 UTC `c54bca84` ([[luke-curley]], `@moq/watch network stats`). Day +1 of post-burst quiet. PR #1374 (Lite05 DATAGRAMS, +1615/−7) updated May 7 19:25 UTC, **still open Day +4**. PR #1388 (LOC frame format, +799/−17) opened May 7 17:42 UTC, **still open Day +1**. PR #1389 (stats aggregation, +1168/−39) opened May 7 18:23 UTC, **still open Day +1**. Combined open-PR diff: **+3582/−63 across 3 PRs** — largest open-PR backlog in moq-dev/moq history.
  - **moqtail/moqtail**: No new commits, no PR updates, no new issues — **2nd consecutive completely quiet day**. PR #193 [4/n] (sharmafb upstream FETCH on cache miss, +248/−132, OPEN since May 6 23:11 UTC) untouched **48h+ later**. Earliest stale PR signal since the May 4 PR #145 merge.
  - **cloudflare/moq-rs**: No new commits since Apr 13 (Day +26 of upstream-fork quiet).
  - **video-dev/moq-js**: No new commits since Feb 17.
  - **google/quiche** (`quiche/quic/moqt`): No new commits since May 5 01:02 UTC — Day +4 quiet post-Vasiliev parser-rewrite.
  - **birneee/quiche_moq**: No new commits since Mar 13.
  - **Eyevinn/moqtransport**: No new commits since Apr 16.
- Mailing list:
  - **yu you (Nokia) May 8** — new thread *"Web conferencing demo over MOQT"* — same announcement as Slack post (3GPP SA4 #136 PoC over in-house MOQT v17). **First IETF-archive cross-post of the 3GPP SA4 PoC.**
  - **Cullen Fluffy Jennings May 8** — reply on *"Knowing the start of a Subgroup"* — **first Cullen reply on this thread**, disputes Ian Swett's claim that the WG already agreed to single-byte priority: *"since even the pre-WG draft proposal we have always had a pretty complicated prioritization including object ID (lower goes first when doing datagrams and streams), group ID (both directions), subscriber priority, publisher priority."* Pushback against Ian's May 5 framing that subgroup-design topics are closed for draft -18.
  - **Cullen's *"Request Synchronization Use Case"* thread (May 1)** and **Magnus Westerlund's three May 4 framing messages** — still unanswered for **8 days** and **5 days** respectively.
  - **No on-list announcement** for the [[moq-msfts|MSFTS]] draft — Day +3 since Datatracker submission.
- IETF Datatracker: **No new draft revisions**. WG state: transport-17, msf-00, loc-02, secure-objects-00 (-01 substantively ready in repo, **still not on Datatracker**), privacy-pass-02, cmsf-00. Notable individual drafts: lite-04 (Apr 9), nmsf-01 (Apr 7), qlog-moq-events-06 (Mar 16), gregoire-moq-msfts-00 (May 6, **Day +3**).
- Interop runner: **20 pass / 71 fail / 14 skip** (105 tests, 2026-05-09 00:39 UTC report). **+1 pass / −1 fail vs May 8's 19/72/14**. **Partial recovery back to the May 4–7 floor** (which is also the post-NAB floor since PR #145 wholesale draft-14→16 migration). Walking arc: 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → 19 → **20**. moqtail PR #193 still **open** Day +3, so bounce isn't a `moqtail-relay` rebuild effect. moq-dev/moq merges in window (none on `main`) can't have triggered the recovery. **Most plausible cause**: natural per-run variance / single image rebuild for one of the matrix entries (moq-rs, moq-rs-draft-16, moqx, quiche-moq, libquicr, xquic, imquic) flipping a single test from fail back to pass. Two-day net effect (May 7 20 → May 8 19 → May 9 20) is **zero**.
- MoQ Monthly: No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30 / May 1). **Day +9 since #1.**
- tobbee/moq-llm-wiki: No new open issues. (3 issues remain closed: #1, #2, #3.)

**Pages updated**: discussions-2026-05.md (new "May 8 06:00 UTC → May 9 06:00 UTC" section: LOCMAF Eyevinn twin PRs, MSF PR #133 spec-restructuring escalation, mailing list reactivation with yu you 3GPP SA4 + Cullen subgroup pushback, moq-dev/moq main quiet day, moqtail 2nd quiet day, interop bounce-back), moqlivemock.md (LOCMAF PR #79 reference; PR #120 in warp-player), media-packaging.md (LOCMAF entry under "The Bridge" section as impl-side counterpart to compressed-mp4), moq-msf.md (PR #133 split-into-3-drafts direction note), interop-runner.md (May 9 row + narrative on bounce-back), interop-status.md (May 9 reading note), index.md (last_updated bump), log.md.

**Key findings**:
- **LOCMAF is the first impl-side proposal to bridge the LOC↔CMAF gap since [[luke-curley]]'s compressed-mp4 spec attempt (Mar 18, individual draft `draft-lcurley-compressed-mp4-00`)**. The two attempts come from opposite directions: Luke's compressed-mp4 starts with a CMAF stream and applies a generic compressor (he called it *"kinda gross, but maybe it's enough to bridge the gap"*); LOCMAF starts with the CMAF *structure* and encodes only the non-derivable fields as LOC-style KV pairs, leveraging properties LOC already defines for varint+byte-string encoding. **LOCMAF makes no new global property IDs needed** — single LOCMAF property aggregates all fields under locally-scoped LOCMAF IDs. **The init/full/delta header design recovers 90%+ of CMAF re-transmission overhead** (estimated; concrete measurements awaiting Hugo Björs's master's thesis). Hugo previously implemented DRM in moqlivemock + warp-player (CMSF ContentProtection PR #18), so this work fits a pattern of media-pipeline contributions from him.
- **MSF PR #133 escalation likely produces 3+ separate Event-Timeline drafts**: avelad's May 7 split-into-3-PRs suggestion → wilaw's May 8 anomaly observation (SCTE-35 inline vs WebVTT/IMSC1 external) → gwendalsimon agreement → suhasHere's *"I do have initial drafts on..."* reveal. The trajectory points to MSF retaining only **CEA-608/708 accessibility metadata** in the spec and spinning out **3 separate Event-Timeline format drafts** (SCTE-35, WebVTT, IMSC1). This extends the MSF Packaging Extensions pattern (precedent: [[moq-msfts]] for `m2ts`) into Event-Timeline Extensions — making MSF an umbrella with both axes (packaging extensions + event-timeline extensions) modular. **First time a moq-wg PR's spec restructuring is shaped openly in a 3-author exchange (wilaw + gwendalsimon + suhasHere) rather than via interim or chair direction.**
- **First MOQT cross-pollination into 3GPP SA4 standardization**: yu you's May 8 announcement places MOQT in the FS_Q4RTC_MED 3GPP study (S4-261065 input document). MOQT has previously been informational at Demuxed, IETF Hackathon, Mile High Video, and NAB — but not at 3GPP. **Nokia maintains an in-house MOQT v17 implementation** that has not been disclosed before, sitting alongside the public moq-rs/moq-js/moq-dev/moqtail/moxygen/imquic/libquicr/quiche-moq stack. SA4 Montreal #136 is May 11–15, so the PoC will be presented next week. **Pattern signal**: MOQT is reaching 3GPP attention while the IETF WG is still in draft-17.
- **Cullen Fluffy Jennings's May 8 reply is the first material on-list pushback against Ian Swett's May 5 framing of subgroup-design topics as closed**: Ian had backed afrind's *"we've been at this four years and no one has needed it"* dismissal of varint-vs-fixed-width tweaks. Cullen's pushback re-opens the priority-encoding question by pointing out the prioritization has always been multi-field (object ID + group ID + subscriber priority + publisher priority), not single-byte. This tightens the topic for the May 12 MOQ Town Hall (Will Law / Dan Rayburn) and likely re-enters the editorial backlog before draft-18 cutoff.
- **moq-dev/moq has the largest open-PR backlog in repo history at +3582/−63 across 3 unmerged PRs** (#1374 Lite05 DATAGRAMS +1615/−7, #1388 LOC frame format +799/−17, #1389 stats aggregation +1168/−39). All 3 are Claude-Code-generated. **Day +4 since #1374 opened**, Day +1 since #1388/#1389. The pattern of *opening major design-PRs without immediately merging them* contrasts with Luke's typical 1-day merge-then-ship cadence on smaller PRs. Possible interpretation: he's accumulating review feedback before merging the wire-level Lite05 changes, since #1388 (LOC) and #1389 (stats) both depend on the moq-lite session model.
- **Interop matrix two-day excursion from 20→19→20 is statistical noise, not a regression**: PR #145 (moqtail wholesale draft-16 migration, May 4 19:23 UTC) remains the only structural cause for the May 5 −4 drop from 24 → 20; subsequent May 6/7/8 readings (20/20/19) and now May 9 (20) are walking around the new floor at 20±1. Both PR #1341 (moq-mux backport, internal hang-catalog only) and PR #193 (moqtail upstream FETCH, **still open Day +3**) have not produced matrix movement. **The matrix is now stable at 20 pass for 5 of 6 May-weekday readings**.

---

# 2026-05-08 — moq-dev/moq day-3 burst: revert-of-revert + LOC frame format + stats aggregation; interop floor breaks downward to 19/72/14

**TL;DR**:
- **moq-dev/moq day-3 burst (Luke 17:42–18:24 UTC May 7)** — **PR #1387 "Revert the revert" MERGED** May 7 17:47 UTC (+167/−177) un-reverting yesterday's PR #1385: PR #1356 (`insert_track` takes `TrackConsumer`) re-lands. Body: *"Actually fix the issue by incrementing the dynamic count when cloning."* **First merge → revert → revert-of-revert cycle on `main`** in moq-dev/moq's history (PR #1356 May 5 → #1385 May 6 → #1387 May 7, all within 44 hours). **PR #1386 (@moq/watch network stats from QUIC connection) MERGED** May 7 18:17 UTC (+72/−177); resolves Firefox-`navigator.connection`-unavailable gap.
- **moq-dev/moq lands two large new feature PRs (both Luke, both Claude-Code-generated)**: **PR #1388 OPENED** May 7 17:42 UTC (+799/−17) — *Add Low Overhead Container (LOC) frame format support* — new `moq-loc` Rust crate + `@moq/loc` JS package with full encode/decode for the LOC wire format from [[moq-loc|draft-ietf-moq-loc]], wired into `moq-mux`, hang catalog (`Container::Loc { timescale }`), and watch-player audio/video decoders + MSE backends. **First time moq-dev/moq adopts an IETF-spec container format alongside its native moq-lite/Hang stack.** **PR #1389 OPENED** May 7 18:23 UTC (+1168/−39) — *Add stats aggregation and publishing for moq-lite sessions* — per-broadcast and per-prefix stats published as `.stats/<level>/<name>` JSON broadcasts (1Hz snapshot) on configurable origin; introduces `Path::is_hidden()` filtering so stats infrastructure doesn't generate its own stats traffic. **Same problem space that the May 5 housekeeping wave closed PR #853 (fcancela observability) for — Luke's reformulation lands as moq-bot effectively re-opens that domain in his own design.**
- **Implementations**: moq-dev/moq day-3 burst — PR #1386 + PR #1387 MERGED, PR #1388 + PR #1389 OPENED (huge feature-PR pair). PR #1374 (Lite05 DATAGRAMS) updated May 7 19:25 UTC, **still open Day +3**. moq-wg/msf — PR #133 (Suhas SCTE-35 + CEA-608/708, +259/0, opened Feb 27) gets May 7 11:50 UTC comment from **avelad** suggesting *"this should be separated into 3 PRs, one for CEA, one for SCTE-35, and one for IMSC1 and WebVTT"*. moq-transport — afrind comment on Issue #1622 (May 7 18:53 UTC): *"Perhaps we want to use the Request ID slot to convey a Group ID when sent on an individual subscription or fetch stream."* moqtail completely quiet (no commits or PR updates May 7). cloudflare/moq-rs Day +25 quiet; google/quiche moqt Day +3 quiet; video-dev/moq-js, birneee/quiche_moq, Eyevinn repos all quiet. Quicr/cat-rs (newly open-sourced May 6) — May 7 04:07 UTC commit *"Security hardening: fix all audit findings"*.
- **Interop**: **19/72/14** — **−1 pass / +1 fail** vs 4 prior days at 20/71/14. **Breaks the 4-day floor downward**; new post-Apr-17 low (prior floor was 20). Most plausible cause: moqtail PR #193 ([4/n] upstream FETCH on cache miss) still open (no merge), so this is unlikely to be moqtail-relay rebuild — more likely natural variance or a different image rebuild. The previous `19` reading was the **early Apr 17–21 floor** before the post-NAB recovery wave.

**Operation**: Update
**Sources**:
- Slack: `#moq` — **no new posts** since [[suhas-nandakumar]]'s May 6 17:49 CEST CAT4MOQ + Will Law's May 6 09:44 CEST MOQ Town Hall announcement. `#moq-rs`, `#moq-js`, `#libquicr` all unchanged.
- GitHub moq-wg repos:
  - **moq-transport**: No new commits or merges in May 7 06:00 UTC → May 8 06:00 UTC window. Open PRs #1621/#1618/#1617/#1613/#1544 received label/timestamp pings on May 7 18:13–18:37 UTC (no code pushes). PR/Issue #1455 (Magnus Westerlund's *Security Consideration Extension*) state remains CLOSED, May 7 timestamp ping. **Issue #1622 (ianswett *Request ID in GOAWAY isn't useful*)**: [[alan-frindell]] new comment May 7 18:53 UTC — *"Perhaps we want to use the Request ID slot to convey a Group ID when sent on an individual subscription or fetch stream."* Reframes the GOAWAY-Request-ID slot as potentially repurposable for per-stream Group ID rather than removing it.
  - **moq-wg/msf — PR #133 (Suhas SCTE-35 + CEA-608/708)** received first new comment in 12 days. **avelad** (Alvaro Velad / Google) May 7 11:50 UTC: *"Perhaps this should be separated into 3 PRs, one for CEA, one for SCTE-35, and one for IMSC1 and WebVTT?"* — first review-process pushback from a new reviewer; PR has been open since Feb 27 with periodic updates, current shape +259/0.
  - **moq-wg/secure-objects, loc, cmsf, catalog-format, privacy-pass**: All quiet on `main`.
- GitHub implementations:
  - **moq-dev/moq** (day-3 burst, all [[luke-curley]]):
    - **PR #1387 MERGED** May 7 17:47:35 UTC (+167/−177) — *Revert the revert*. Body one-liner: *"Actually fix the issue by incrementing the dynamic count when cloning."* **Un-reverts PR #1385's revert of PR #1356.** Net effect: the May 5 `insert_track`-takes-`TrackConsumer` change is back in `main`, with the underlying clone-counting bug now fixed in-place rather than by reverting the API change. Cycle: PR #1356 merged May 5 22:15 UTC → reverted via #1385 May 6 22:08 UTC (−24h) → reverted-back via #1387 May 7 17:47 UTC (+19h 39m). **First time on `main` that an immediate revert is itself reverted within 24 hours.**
    - **PR #1386 MERGED** May 7 18:17:23 UTC (+72/−177) — *@moq/watch: source network stats from the connection, not navigator*. Final shape +72/−177 (vs opened-shape +88/−130 — net deletes more code than originally drafted). Resolves Firefox-`navigator.connection`-unavailable gap. Second Firefox-compat PR to land in 3 days; sibling PR #1307 (Lite03+ via legacy SETUP) **still open**.
    - **PR #1388 OPENED** May 7 17:42:06 UTC (+799/−17, **OPEN**) — *Add Low Overhead Container (LOC) frame format support*. **First adoption of a non-Hang IETF media container in moq-dev/moq.** New `moq-loc` Rust crate + `@moq/loc` JS package implementing encode/decode for the [[moq-loc|draft-ietf-moq-loc]] wire format; QUIC-style varint property block (delta-encoded type IDs 0x06=timestamp, 0x08=timescale) followed by raw codec payload. **Catalog integration**: hang catalog gains `Container::Loc { timescale }` (default 1,000,000 µs); audio source selection prioritizes LOC after legacy, before CMAF. Watch player audio/video decoders + MSE backends instantiate the appropriate LOC decoder based on catalog config. Per-frame timescale (0x08 property) overrides catalog default. Body marked *"🤖 Generated with Claude Code"*.
    - **PR #1389 OPENED** May 7 18:23:35 UTC (+1168/−39, **OPEN**) — *Add stats aggregation and publishing for moq-lite sessions*. New `Stats` module (`rs/moq-lite/src/stats.rs`); per-broadcast and per-prefix stats published as `.stats/<level>/<name>` JSON broadcasts (1Hz snapshot, atomic counters with `Relaxed` ordering). **Hidden-path filtering**: new `Path::is_hidden()` (segments starting with `.`) so stats infrastructure doesn't recursively generate its own stats traffic; `OriginConsumer::announced()` filters hidden paths, complementary `announced_hidden()` exposes them. New `StatsConfig` in moq-relay (`name` + `levels`). Per-broadcast RAII guards (`PublisherStats`/`SubscriberStats`/`PublisherTrack`/`SubscriberTrack`) record open/close, frames, bytes, groups. **Same problem domain as the May 5-closed PR #853** (fcancela's "Minimal observability metrics", +1261/−38) — Luke's reformulation lands as a 1168-line opening within 2 days. Body marked *"🤖 Generated with Claude Code"*.
    - **PR #1374 (Lite05 DATAGRAMS) updated** May 7 19:25 UTC — still **open**, Day +3 since open. No movement towards merge.
    - **PR #1338 (chore: release, moq-bot) updated** May 7 18:32 UTC — auto-bumped after #1387 + #1386 merges; release line now includes the day-1 revert + day-3 revert-of-revert net no-op + Firefox stats fix.
    - **PR #853 (fcancela observability) — note**: closed-not-merged on May 5; received an automated cross-reference timestamp ping May 7 17:50 UTC when PR #1389 opened (PR #1389 occupies adjacent design space). State remains CLOSED.
  - **moqtail/moqtail**: **completely quiet day** — no new commits, no PR updates, no new issues. PR #193 [4/n] (sharmafb upstream FETCH on cache miss, +248/−132, OPENED late May 6) remains untouched 24h+ later.
  - **cloudflare/moq-rs**: No new commits since Apr 13 (Day +25 of upstream-fork quiet).
  - **video-dev/moq-js**: No new commits since Apr 16.
  - **google/quiche** (`quiche/quic/moqt`): No new commits since May 5 01:02 UTC `1ceadc7` Vasiliev *"Rewrite MOQT control message parser"* — Day +3 quiet.
  - **birneee/quiche_moq**: No new commits since Mar 13.
  - **Eyevinn/moqlivemock + warp-player**: No new commits since the May 5 v0.8.0 release.
  - **Eyevinn/moqtransport**: No new commits.
  - **Quicr/cat-rs** (newly open-sourced May 6): May 7 04:07:33 UTC commit `1e4423e` *"Security hardening: fix all audit findings"* by Suhas. Continues post-open-source polish; Day +1 of the public maintenance.
- Mailing list: **Quiet for 3rd consecutive day**. No new messages on May 6 or May 7. Cullen Jennings's *"Request Synchronization Use Case"* thread (May 1) and Magnus Westerlund's three May 4 framing messages now sit unanswered for **7 days** and **4 days** respectively. **No on-list announcement** posted for the new MSFTS draft (`draft-gregoire-moq-msfts-00`, posted to Datatracker May 6) — Day +2 since draft.
- IETF Datatracker: **No new draft revisions**. WG state: transport-17, msf-00, loc-02, secure-objects-00 (-01 substantively ready in repo, **still not on Datatracker**), privacy-pass-02, cmsf-00. Notable individual: lite-04 (Apr 9, despite Lite05 in moq-dev/moq PR #1374), nmsf-01 (Apr 7), qlog-moq-events-06 (Mar 16), gregoire-moq-msfts-00 (May 6, Day +2).
- Interop runner: **19 pass / 72 fail / 14 skip** (105 tests, 2026-05-08 00:38 UTC report). **−1 pass / +1 fail vs May 7 / May 6 / May 5 / May 4 (all 20/71/14)**. **Breaks the 4-day floor downward** — new post-NAB low. Walking arc: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → **19**. moqtail PR #193 (upstream FETCH, OPEN since May 6) **did not merge** so this isn't a moqtail-relay rebuild effect; more likely natural variance or a different image's rebuild. **The previous `19` reading was the early Apr 17–21 floor**; the matrix has now returned to that depth.
- MoQ Monthly: No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30 / May 1). **Day +7 since #1**.
- tobbee/moq-llm-wiki: No new open issues. (3 issues remain closed: #1, #2, #3.)

**Pages updated**: discussions-2026-05.md (top-level "May 7 06:00 UTC → May 8 06:00 UTC" section: moq-dev/moq day-3 burst with revert-of-revert + LOC frame + stats aggregation; msf PR #133 review pushback; moq-transport Issue #1622 afrind comment; mailing list quiet day-3; cat-rs security hardening), moq-dev.md (header bump + "May 7 → May 8" section: PR #1386 + PR #1387 merged, PR #1388 + PR #1389 opened), moq-loc.md (added "Implementation tracking" note for PR #1388 in moq-dev/moq), interop-runner.md (May 8 row + narrative paragraph: floor breaks down to 19), interop-status.md (May 8 reading note: 19/72/14, post-NAB new low), index.md (last_updated bump), log.md.

**Key findings**:
- **First merge → revert → revert-of-revert cycle on `main` in moq-dev/moq's history**: PR #1356 (May 5 22:15 UTC, `insert_track` takes `TrackConsumer`) → PR #1385 (May 6 22:08 UTC, revert) → **PR #1387 (May 7 17:47 UTC, "Revert the revert")**. Total cycle 43h 32m. Yesterday's wiki entry framed PR #1385 as a "first merge-then-revert-within-24h" event; today it's reframed as a *transient* revert. The actual fix lands in-place: *"Actually fix the issue by incrementing the dynamic count when cloning."* The `TrackConsumer::produce()` removal from PR #1300 is again gone from the codebase. **Pattern signal**: Luke is comfortable using `main` for fast iteration on type-level cleanup, including reverting and un-reverting within 24h windows.
- **moq-dev/moq adopts LOC frame format support — first non-Hang container format alongside CMAF/moq-lite native stack**: PR #1388 (+799/−17) brings full encode/decode for [[moq-loc|draft-ietf-moq-loc]] frames into both Rust (`moq-loc` crate) and JS (`@moq/loc` package). Hang catalog gains `Container::Loc { timescale }`. **Audio source selection now prioritizes LOC ahead of CMAF** (after legacy). This positions moq-dev/moq for direct interop with [[moqtail]] and [[moqlivemock]]'s LOC paths. Significant strategic shift: Luke previously treated Hang as the canonical media layer above moq-lite — adopting LOC inline brings the IETF-aligned media container into the same stack rather than relying on shim/conversion. **First IETF-spec container format adopted by moq-dev/moq.**
- **moq-dev/moq stats aggregation reformulates the closed PR #853 (fcancela observability) at 1168 lines**: PR #1389 (Luke, +1168/−39) opens stats infrastructure 2 days after the May 5 housekeeping wave closed PR #853 (+1261/−38) without merging. Domain overlap is direct: per-broadcast and per-session counters (broadcasts, subscriptions, bytes, frames, groups) with relay-side aggregation. Luke's reformulation introduces three novel mechanisms: (1) **stats published as in-band `.stats/<level>/<name>` MoQ broadcasts** (subscribe to your own stats stream rather than scraping Prometheus); (2) **`Path::is_hidden()` filtering** so the stats system itself doesn't generate stats traffic recursively; (3) **per-prefix-level bucketing** (configurable depth) for hierarchical aggregation. Both PRs are Claude-Code-generated. The pattern of *closing a 13-month-old observability PR and opening a fresh maintainer-authored design 2 days later* is the second time this contributor-→-maintainer-rewrite pattern has appeared (after the Apr 30 Lite05 design absorbing earlier contributor-FETCH-API ideas).
- **avelad opens MSF PR #133 review wedge — first review-process pushback in 70 days**: Suhas's SCTE-35 + CEA-608/708 PR has been open since Feb 27 (70+ days) accumulating updates without a substantive review challenge. Alvaro Velad (Google, Shaka Player engineer) joins May 7 11:50 UTC: *"Perhaps this should be separated into 3 PRs, one for CEA, one for SCTE-35, and one for IMSC1 and WebVTT?"* — process suggestion, not technical pushback, but the first concrete reviewer engagement after Will Law's Apr 27 round. The PR adds 4 separable concerns (accessibility metadata, SCTE-35 timeline events, IMSC1 captions, WebVTT) — a 4-way split would change the merge cadence considerably. **First moq-wg/msf review activity from a Google engineer in this PR thread.**
- **afrind reframes ianswett's GOAWAY-Request-ID-removal proposal as repurposable Group-ID slot**: Issue #1622 was opened Apr 30 by ianswett arguing *"Request ID in GOAWAY isn't useful"* (request IDs are not the right primitive in MoQ; HTTP-style stream IDs would be HTTP, not MoQ). afrind's May 7 18:53 UTC reply: *"Perhaps we want to use the Request ID slot to convey a Group ID when sent on an individual subscription or fetch stream."* — repurposes the wire field for a different per-stream identifier rather than removing it. The competing fronts (Vasiliev's Apr 30 PR #1559 hesitation, the Required Request ID removal in PR #1615, GOAWAY's leftover Request-ID use) suggest the editorial team is converging on **per-stream identifier signalling** as a subgroup of the Request-ID-cleanup direction. **First substantive afrind comment on Issue #1622 since the original Apr 30 *"trivial to put in goaway"* reply.**
- **Interop runner breaks the 4-day floor**: 19/72/14 vs 4 prior days at 20/71/14. PR #193 (moqtail upstream FETCH) **did not merge** May 7 — yesterday's wiki noted it as the next candidate to move the matrix once `moqtail-relay` rebuilds, but the rebuild hasn't happened. The likely cause is therefore **another image's rebuild** or natural per-run variance. The 19 reading matches the Apr 17–21 floor exactly, suggesting the post-NAB recovery wave's gains have all been given back. **The matrix is now at the same passing-test count as 22 days ago.** Notable that no on-`main` wire-format change in moq-transport occurred May 7 — the regression is in implementation pairs.
- **moq-dev/moq is producing the largest single-day Claude-Code-generated PR pair in repo history**: PR #1388 (+799) + PR #1389 (+1168) both opened ~40 minutes apart (17:42 UTC and 18:23 UTC). Both bodies tagged *"🤖 Generated with Claude Code"*. Neither is merged yet; combined +1967/−56. **Second Claude-Code-generated PR pair within 7 days** after the May 5 PR #1378 (+295/−240) + PR #1374 (+1615/−7) Lite05 design pair. Cumulative Claude-Code-generated diff in moq-dev/moq's recent history is now **>4000 lines added** across 4 PRs in a 4-day window.

---

# 2026-05-07 — New MSFTS draft (MPEG-2 TS over MoQ) lands; moq-dev/moq evening burst includes 24h revert; moqtail upstream-FETCH series merges; CAT4MOQ Rust lib open-sourced; MOQ Town Hall scheduled

**TL;DR**:
- **NEW individual draft `draft-gregoire-moq-msfts-00`** submitted to Datatracker May 6 — *MPEG-2 Transport Stream Packaging for Media Over QUIC Transport*, 21 pages, by **Paul Gregoire** (Red5) + **[[gwendal-simon]]** (Synamedia). Registers the **`m2ts`** packaging value alongside CMSF/LOC under the [[moq-msf|MSF]] umbrella; defines 10 m2ts-specific catalog fields (188/192-octet packets, PMT/PCR/SCTE-35 PIDs, PSI interval, timestamp modes, `initData`). **First non-CMAF, non-LOC packaging format** for MSF — extends MoQ to broadcast/contribution workflows. First MoQ contribution from Paul Gregoire (moqxr maintainer); Gwendal's first IETF-side artifact after the late-April spec/impl cross-pollination wave. **No mailing-list announcement yet.**
- **moq-dev/moq evening burst day-2**: [[luke-curley]] merges PR #1382 (moq-mux test fixtures), PR #1383 (`@moq/watch` broadcast-flap fix), and **PR #1385 reverting yesterday's PR #1356 (`insert_track` takes `TrackConsumer`) within 24 hours of merge** — first merge-then-revert-within-24h on `main` since the Apr 30 → May 2 fetch_group cycle. Opens PR #1386 (`@moq/watch` source network stats from QUIC connection, not `navigator.connection`) — second Firefox-compatibility-affecting PR alongside still-open PR #1307. Issue #1384 opens (`@moq/signals` improvements). PR #1374 (Lite05 DATAGRAMS) unmoved, Day +2.
- **moqtail upstream-FETCH 3-PR series MERGED in 27 minutes**: [[zafer-gurel]] lands sharmafb's #186 + #188 + #187 (merge order 1→3→2) on May 6 14:31–14:58 UTC, plus davemevans's PR #179 Firefox docs at 15:04 UTC. **sharmafb opens PR #193 [4/n]** (+248/−132) at 23:11 UTC as the capstone — actual upstream FETCH on cache miss, with `fetch_requests` map split into incoming/outgoing and publisher-track-alias forwarding. **Second consecutive day of non-maintainer merges** on `main` (after thexeos's co-authored #191 May 5).
- **Implementations**: moq-dev/moq merges 3 PRs (#1382 +3/−0, #1383 +15/−5, **#1385 revert +160/−117**) + opens PR #1386 + Issue #1384. moqtail merges 4 PRs (#186 +15/0, #187 +71/−6, #188 +154/−8, #179 +11/−2) + opens PR #193 [4/n] +248/−132. moq-wg/secure-objects: **first commits in many weeks** (Suhas Nandakumar, 2 commits May 6 13:30–13:45 UTC, diagram fix via PR #87 — no normative change). cloudflare/moq-rs Day +24 fork quiet; google/quiche moqt Day +2 post-Vasiliev rewrite quiet; video-dev/moq-js, birneee/quiche_moq, Eyevinn repos all quiet.
- **Interop**: 20/71/14 — flat for **3rd consecutive day** at the Apr 17–21 floor. PR #1341 moq-mux backport (merged May 6 01:20 UTC) was the candidate to move the matrix on May 7 — **no movement observed**, suggesting hang catalog/init shape is internal to moq-dev not a moq-transport wire change.

**Operation**: Update
**Sources**:
- Slack: `#moq` — **2 new posts** (first activity since May 5):
  - [[suhas-nandakumar]] May 6 17:49 CEST: CAT4MOQ implementation update — `catapult` (C++) and **newly open-sourced `cat-rs` (Rust)** at [Quicr/cat-rs](https://github.com/Quicr/cat-rs). Both up to date with C4M spec, full CAT token + DPoP support. **First Rust CAT4MOQ implementation in the open**.
  - **Will Law (Akamai) May 6 09:44 CEST**: Dan Rayburn hosting **MOQ Town Hall Zoom session May 12 at 1pm ET** ([LinkedIn announcement](https://www.linkedin.com/posts/danrayburn_moq-openmoq-streamingmedia-share-7457463529865113602-KstM)). Open to all — first public-facing moderated MoQ town hall (vs IETF interim or Demuxed talks).
  - `#moq-rs` (C09CG9V7A2Y), `#moq-js` (C09BZ7KH0BZ), `#libquicr` (C08ER7J16BF) all unchanged.
- GitHub moq-wg repos:
  - **moq-transport**: No new commits, merges, or new issues in May 6 06:00 UTC → May 7 06:00 UTC window. Only PR #1604 timestamp ping (label/state, no new comment after [[alan-frindell]]'s May 5 reframing).
  - **moq-wg/secure-objects**: **First main-branch activity in many weeks**. Commits `8d789cf` (May 6 13:30 UTC, [[suhas-nandakumar]]) *Fix encryption/decryption diagrams to match SECURE_OBJECT_AAD structure* and `68f9f0b` (May 6 13:45 UTC) merge of PR #87 from `pic-fix` branch. **Diagram-only fix**, no normative change. secure-objects-01 substantive draft remains **not on Datatracker**.
  - **moq-wg/loc — Issue #19 unchanged**: kixelated's May 5 22:14 UTC self-reply remains the most recent; no LOC ecosystem engagement yet.
  - **moq-wg/msf, cmsf, catalog-format, privacy-pass**: No new commits or PRs.
- GitHub implementations:
  - **moq-dev/moq** (evening burst day-2):
    - **PR #1382 MERGED** May 6 20:03 UTC (+3/−0) — *Unignore moq-mux test fixtures*. Test-fixture inclusion fix following PR #1341 backport.
    - **PR #1383 MERGED** May 6 21:09 UTC (+15/−5) — *@moq/watch: don't tear down a broadcast when an unrelated path flaps*. Targeted TS `watch` fix for spurious tear-downs.
    - **Issue #1384 OPENED** May 6 20:41 UTC — *@moq/signals improvements*. Tracks reactive-signals layer cleanup.
    - **PR #1386 OPENED** May 6 21:51 UTC (+88/−130, **OPEN**) — *@moq/watch: source network stats from the connection, not navigator*. Replaces `navigator.connection` (Firefox doesn't expose) with QUIC-connection-sourced stats. Second Firefox-compatibility PR after #1307.
    - **PR #1385 MERGED** May 6 22:08 UTC (+160/−117) — *Revert "moq-lite: switch insert_track to take TrackConsumer (#1356)"*. Body: standard auto-generated revert (*"This reverts commit `b611acd1`."*). **Backs out PR #1356 ~24 h after May 5 22:15 UTC merge**. No follow-up issue explaining the regression.
    - **PR #1338 updated** May 6 22:24 UTC — `chore: release` (moq-bot[bot]). Auto-bumped, will drop PR #1356 from staging release line.
    - **PR #1358 updated** May 6 21:32 UTC — Origin poll-driven rewrite, still open.
    - **PR #1149 updated** May 6 19:06 UTC — catalog registry, still open.
    - **Issue #1364 CLOSED** May 6 06:00 UTC — Dan Rossi's *"Cloudflare Relay"* question. No comment on close.
    - **PR #1374 (Lite05 DATAGRAMS)** — no movement (Day +2).
    - **PR #1307 (Firefox legacy-SETUP fallback)** — no movement.
  - **moqtail/moqtail** (sharmafb upstream-FETCH series merges + capstone opens):
    - **PR #186 MERGED** May 6 14:31 UTC by zafergurel (+15/0) — *[upstream fetches] Add command-line args for FETCH upstream timeout and gap limit [1/n]* (sharmafb / Aman Sharma).
    - **PR #188 MERGED** May 6 14:56 UTC (+154/−8) — *[upstream fetches] Function to send upstream fetch [3/n]*. **Merged before #187** ([2/n] plumbing PR).
    - **PR #187 MERGED** May 6 14:58 UTC (+71/−6) — *[upstream fetches] Plumbing to forward FETCH data received from upstream [2/n]*. **Merge order 1 → 3 → 2** (likely cherry-pick / linearization).
    - **PR #179 MERGED** May 6 15:04 UTC (+11/−2) — *docs: add instructions for Firefox testing using private CA* (davemevans / David Evans, opened Apr 29).
    - **PR #192 OPENED** May 6 15:05 UTC by github-actions[bot] — `[ci] release`.
    - **PR #193 OPENED** May 6 23:11 UTC by sharmafb (+248/−132, **OPEN**) — *[upstream fetches] Finish implementation of sending FETCH requests upstream for cache misses [4/n]*. Upstream fetch on cache miss; splits `fetch_requests` into incoming/outgoing maps; uses publisher's track alias for upstream FETCH so response stream resolves correctly. **4-terminal manual test plan in PR body.**
    - **Commit `ccf9d2e`** May 6 08:59 UTC by Ali C. Begen — *docs: update reference*.
  - **cloudflare/moq-rs**: No new commits since Apr 13 (Day +24 of upstream-fork quiet).
  - **video-dev/moq-js**: No new commits since Apr 16.
  - **google/quiche** (`quiche/quic/moqt`): No new commits since May 5 01:02 UTC `1ceadc7` Vasiliev *"Rewrite MOQT control message parser"* — Day +2 quiet.
  - **birneee/quiche_moq**: No new commits since Mar 13.
  - **Eyevinn/moqlivemock + warp-player**: No new commits since the May 5 v0.8.0 release.
  - **Eyevinn/moqtransport**: No new commits.
- Mailing list: **Quiet for 2nd consecutive day**. No new messages on May 6 or May 7. Cullen's *"Request Synchronization Use Case"* thread (May 1) and Magnus Westerlund's three May 4 framing messages now sit unanswered for **6 days** and **3 days** respectively. **No announcement message** posted for the new MSFTS draft. The "Knowing the start of a Subgroup" thread is dormant since [[alan-frindell]]'s twin May 5 pushback messages.
- IETF Datatracker: **NEW individual draft `draft-gregoire-moq-msfts-00`** posted May 6 (21 pages, MPEG-2 TS packaging, Gregoire/Simon). All WG drafts unchanged: transport-17, msf-00, loc-02, secure-objects-00 (-01 still **not** on Datatracker), privacy-pass-02, cmsf-00. Other notable individual drafts unchanged (moq-lite-04 Apr 9, nmsf-01 Apr 7, qlog-moq-events-06 Mar 16, moq-probe-00 Mar 16, moq-largest-group-00 Mar 22). `media-interop` no longer in listing (Apr 23 expiry).
- Interop runner: **20 pass / 71 fail / 14 skip** (105 tests, 2026-05-07 00:38 UTC report). **Flat vs. May 6** (also 20/71/14). **Three consecutive days at the Apr 17–21 floor**. Walking arc: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → **20**. PR #1341 (moq-mux backport, merged May 6 01:20 UTC) was the most plausible candidate to move the matrix in this report — **no movement observed**, suggesting catalog/init shape change is internal to moq-dev/hang not a moq-transport wire change. moqtail PR #193 (upstream FETCH on cache miss) opens late May 6 — could affect May 8 matrix once `moqtail-relay` rebuilds.
- MoQ Monthly: No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30 / May 1). Day +6 since #1.
- tobbee/moq-llm-wiki: No new open issues. (3 issues remain closed.)

**Pages updated**: discussions-2026-05.md (top-level "May 6 06:00 UTC → May 7 06:00 UTC" section added with MSFTS draft / moq-dev evening burst / moqtail upstream-FETCH series / secure-objects diagram fix / mailing list quiet / Slack CAT4MOQ + Town Hall sub-sections), moq-dev.md (header bump + "May 6 → May 7" section: PR #1382/#1383 merged, PR #1385 revert of #1356, PR #1386 opened, Issue #1384 opened), moqtail.md (header bump + "May 6" section: PR #186/#187/#188/#179 merged, PR #193 [4/n] capstone opened), interop-runner.md (May 7 row + narrative paragraph), interop-status.md (May 7 reading, third-day-at-floor note, PR #1341 no-effect observation), moq-msf.md (added MSF Packaging Extensions section listing CMSF + new MSFTS), index.md (last_updated bump + MSFTS mention in individual drafts list), log.md.

**Key findings**:
- **First non-CMAF, non-LOC packaging extension to MSF**: `draft-gregoire-moq-msfts-00` registers `m2ts` packaging alongside `cmaf` (CMSF) and the LOC bytestream form. The 192-octet variant accommodates the M2TS source-packet form (4-byte timestamp prefix), and **SCTE-35 PID is explicitly modeled**, signaling intent to support ad-insertion / splice points end-to-end. Co-authored by [[gwendal-simon]] (also [PR #1378 SWITCH for client-side ABR](https://github.com/moq-wg/moq-transport/pull/1378) author) — his first IETF-side artifact, suggesting the late-April spec/impl cross-pollination wave is producing concrete spec contributions. **First MoQ draft from Paul Gregoire (Red5)**, who also maintains [`moqxr`](https://github.com/mondain/moqxr) — extends the MoQ author base into the broadcast-streaming community. **No mailing-list announcement yet** — the WG hasn't been notified on-list.
- **First merge-then-revert-within-24h on `main` since the Apr 30 → May 2 fetch_group cycle**: PR #1356 (`insert_track` takes `TrackConsumer`) merged May 5 22:15 UTC, **reverted via PR #1385 May 6 22:08 UTC** — exactly 23 h 53 min. The PR description is auto-generated revert text; no follow-up issue explains the regression that prompted the pull-back. The release-train PR #1338 auto-bumped 16 minutes after the revert, so the next moq-lite release will not include the type-level cleanup. **The post-Lite04 deprecation queue (PR #1378 +295/−240) is therefore not 100% complete** as the wiki implied yesterday — `TrackConsumer::produce()` from #1300 is back in.
- **moqtail contributor base widening visibly**: 4 of 5 merges on `main` in the May 5 → May 6 window have non-maintainer authorship (thexeos co-authoring #191 on May 5; sharmafb authoring #186/#187/#188 on May 6; davemevans authoring #179 on May 6). Only Ali C. Begen's `ccf9d2e` "docs: update reference" and the bot release PRs are maintainer-internal. **First time in moqtail's history that 3 different external contributors land code on `main` within a 48-hour window.** PR #193 [4/n] +248/−132 will likely be the largest sharmafb contribution when it merges.
- **moqtail completes a key relay capability in contributor-led increments**: upstream FETCH on cache miss is a textbook CDN-relay primitive (a relay that can fetch absent groups from origin rather than serving only what's locally cached). PR #186/#187/#188/#193 implement it as a 4-PR chain. **First example of a non-trivial relay feature being shipped to moqtail by an external contributor.** The 4-terminal manual test setup in PR #193's body documents the testing approach reproducibly.
- **secure-objects shows life signs but only diagram-level**: 2 commits on `main` (Suhas Nandakumar) merge a `pic-fix` branch correcting the encryption/decryption figure to match the SECURE_OBJECT_AAD structure. **No normative change.** The substantive secure-objects-01 draft (containing the SFRAME RFC reference, additional test vectors, en-dash fix from open PRs #83/#84/#85) **remains not on Datatracker** as of May 7. Suhas's parallel May 6 17:49 CEST Slack post about the cat-rs CAT4MOQ open-source release suggests a coherent Cisco/Quicr push around the broader CAT4MOQ + secure-objects axis.
- **CAT4MOQ Rust impl `cat-rs` open-sourced** ([Quicr/cat-rs](https://github.com/Quicr/cat-rs)) — first Rust CAT4MOQ client-side implementation. Pairs with the existing C++ `catapult` to give the [[moq-privacy-pass|privacy-pass]] / CAT4MOQ track its first cross-language client-side coverage. Both libraries claim full CAT token + DPoP support per spec. **Notable framing**: Suhas's Slack post explicitly invites feedback ("Please give them a try and let us know") — solicitation of community testing, not just announcement.
- **First public-facing MoQ town hall scheduled**: Dan Rayburn (StreamingMediaBlog analyst) hosting a **May 12 1pm ET Zoom** Town Hall, open to all. Distinct from IETF interim format — frames as "promote your project or service, or debate the nuances of MOQT". Will Law (Akamai) is the messenger. Falls 6 days from the next regular WG cadence; slot timing (1pm ET / 19:00 CEST / 17:00 UTC / 10am PT) hits both EU and US working hours. **First non-IETF-organized MoQ public event of the year.**
- **Interop runner three consecutive days at floor**: 20/71/14 unchanged. PR #1341 (moq-mux backport, merged May 6 01:20 UTC) **did not move the matrix** — the catalog `Container::Cmaf { init: Bytes }` schema change is internal to moq-dev's hang format, so moq-transport wire interop is preserved as designed. The post-PR #145 image-rebuild floor at 20 pass continues to be the new normal until pair-level fixes land. moqtail PR #193 (upstream FETCH +248/−132) is the next candidate to potentially move the matrix when `moqtail-relay` rebuilds with merge.

---

# 2026-05-06 — Luke's biggest single-day merge run on moq-dev/moq; moqtail-ts polish; afrind closes door on Subgroup-ID/varint reopening; interop flat at floor

**TL;DR**:
- **moq-dev/moq lands seven PRs in a ~9-hour window** — capped by the **+2588/−3594 PR #1341 moq-mux backport from `dev` to `main`** (82 files; net deletion ~1000 lines, all per-codec feature flags removed, dual `OrderedConsumer`/`Consumer` API collapsed into single `Consumer<F: Container>`). Other merges: PR #1378 API tightening (+295/−240), PR #1380 Origin API renames (port from #1358), PR #1379 Windows DNS fix, PR #1377 TOML config string-or-array, PR #1356 insert_track-takes-TrackConsumer, PR #1381 OG image. **PR #1307 OPENED**: legacy-SETUP fallback so Firefox can negotiate Lite03+ without ALPN selection. PR #1374 (Lite05 DATAGRAMS) **still open**.
- **mailing list**: [[alan-frindell]] enters "Knowing the start of a Subgroup" thread with two replies in 6 minutes — pushes back on revisiting Subgroup ID width (*"we've already been over this ground"*) and on a broader varint audit (Group/Object IDs are also varints + part of priority scheme); on track-starts: *"we've been at this four years and no one has needed it."* Combined with Ian Swett's May 3 FIRST_OBJECT-bit decision, the editorial direction now signals **subgroup-design topics are closed for draft -18**. Cullen's request-sync framing remains unanswered for a 5th day. moqtail merges per-subscription early-discard (#189) + isValidTrackAlias BigInt fix (#191, co-authored by thexeos closing #156). moq-wg/loc — Luke OPENS Issue #19 *"How do you encode LOC Private Properties?"* — argues LOC needs its own version/encoding contract rather than borrowing moq-transport's. PR #1378 SWITCH (gwendalsimon) gets 2 commits reassigning message type 0x12 → 0x1F → 0x1B.
- **Implementations**: moq-dev/moq merges 7 PRs (PR #1341 +2588/−3594, PR #1378 +295/−240, others smaller); PR #1307 OPENED Firefox legacy-SETUP fallback. moqtail merges PR #189/#191/#190 (`moqtail-ts` polish + release); PR #156 closed in favor of #191. cloudflare/moq-rs Day +23 fork quiet; google/quiche moqt Day +1 quiet (post-Vasiliev rewrite); video-dev/moq-js, birneee/quiche_moq, Eyevinn repos all quiet.
- **Interop**: 20/71/14 — **flat vs May 5** (also 20/71/14). Two consecutive days at the Apr 17–21 floor; no recovery from yesterday's −4 regression.

**Operation**: Update
**Sources**:
- Slack: `#moq` — **no new posts** since [[torbjorn-einarsson]]'s May 5 06:43 CEST moqlivemock + warp-player MSF/LOC/WebCodecs/moq-mi announcement (3 clap reactions are the only post-Slack-MCP-probe activity). `#moq-rs` (C09CG9V7A2Y), `#moq-js` (C09BZ7KH0BZ), `#libquicr` (C08ER7J16BF) all unchanged.
- GitHub moq-wg repos:
  - **moq-transport**: No new commits or merged PRs in the May 5 06:00 UTC → May 6 06:00 UTC window.
    - **PR #1378 (gwendalsimon SWITCH for client-side ABR) updated** May 5 09:55–09:59 UTC with 2 commits: `c301893` *fix(switch): change SWITCH message type from 0x12 to 0x1F* + `77e5326` *fix(switch): change SWITCH message type to 0x1B*. Two consecutive code-point assignments in 4 minutes — final SWITCH type **0x1B**. Open since Nov 24, 2025; received its first push in months as the Joining-FETCH-vs-SWITCH design space heats up.
    - **PR #1604 (martinduke Joining FETCH with subscription) — afrind comment** May 5 16:36:31 UTC: *"Luke indicated in another issue a case where you want future SUBSCRIBE groups > FETCH current group > SUBSCRIBE current group. But that also can't be expressed in any form in MOQ today."* Frames the priority-overlap concern as an open spec gap rather than a blocker.
    - Open PR slate unchanged: #1627, #1604, #1617, #1615, #1625, #1607, #1544, #1623, #1618, #1621, #1591, #1605, **#1378 (now active)**, #1613.
  - **moq-wg/loc — Issue #19 OPENED** May 5 22:12:11 UTC by **kixelated** ([[luke-curley]]) — *"How do you encode LOC Private Properties?"*. Body: *"The encoding of LOC Public Properties depend on the moq-transport version, but it's how are we supposed to encode private properties? I don't know the version, nor will it be the same between an arbitrary publisher/subscriber with a relay in the middle."* Self-comment May 5 22:14:17 UTC: *"Based on `vi64` I can guess that moq-transport-17 encoding is being used, but LOC itself is going to have to specify a specific version/encoding for anything in the payload."* **Direct conceptual challenge to LOC's "borrow moq-transport's encoding" stance**; intersects with #1550 (Properties Type collision moq-16 ↔ loc-01) at a deeper architectural layer.
  - **moq-wg/secure-objects, msf, cmsf, catalog-format, privacy-pass**: No new activity since the May 1 secure-objects editorial wave. Open secure-objects PRs remain #83 (SFRAME RFC ref), #84 (test vectors), #85 (en-dash fix). draft-ietf-moq-secure-objects-01 still **not** on Datatracker.
- GitHub implementations:
  - **moq-dev/moq** (biggest single-day merge run since Apr 29–30):
    - **PR #1377 MERGED** May 5 17:17:23 UTC (+52/−1, closes #1376) — *fix(config): accept single string or array for TOML list fields*. `serde_with::OneOrMany<_, PreferMany>` on `server.tls.{cert,key,generate,root}`, `tls.root`, `web.https.root`, `auth.tls.root`, `auth.domains`. Production-fixing config PR.
    - **PR #1380 MERGED** May 5 18:51:38 UTC (+130/−127). *moq-lite: port Origin API renames from #1358*. Stacked on #1378. Ports public-API renames without merging the substrate change. `OriginProducer::publish_only` → `scope`; `OriginConsumer::consume_only` → `scope`; `OriginConsumer::try_consume_broadcast` → `get_broadcast`; `OriginProducer::consume_only` and `try_consume_broadcast` dropped.
    - **PR #1379 MERGED** May 5 19:22:22 UTC (+110/−11). *Fix DNS resolution to prefer matching address family*. New `pick_addr()` selects DNS entry whose family matches local socket; falls back to first entry. **Cross-platform stability fix** for Windows `AddrNotAvailable` errors.
    - **PR #1381 MERGED** May 5 20:03:32 UTC — OG image dimensions. Cosmetic.
    - **PR #1378 MERGED** May 5 20:08:31 UTC (+295/−240, 20 files). *moq-lite: tighten public API surface and remove deprecated methods*. Crate-private `ALPN_*` / `MAX_HOPS` / coding module / encode_params!/decode_params! macros; re-export `DecodeError`/`EncodeError`/`BoundsExceeded` from crate root. Drops deprecated `TrackProducer::close`, `poll_next_group`, `next_group` (alias), `FrameProducer::write_chunk`, `OriginProducer/OriginConsumer::consume_broadcast`. Renames `next_group_ordered` → `next_group`. Adds `Origin::new(id)`. `cargo test -p moq-lite --lib` 278/278 pass. **🤖 Generated with Claude Code.** Largest API-surface tightening of the moq-lite cycle.
    - **PR #1356 MERGED** May 5 22:15:50 UTC (+117/−160). *moq-lite: switch insert_track to take TrackConsumer*. Removes `TrackConsumer::produce()` from #1300 (added as workaround). Adds `TrackConsumer::weak()` (`pub(crate)`).
    - **PR #1341 MERGED** May 6 01:20:29 UTC (+2588/−3594, **82 files**) — *moq-mux backport + dual-API cleanup*. **Largest moq-dev/moq merge of the post-NAB period.** Backports `moq-mux` structural refactor from `dev`; module reorg `moq_mux::{import,export,container,convert}`; catalog-side `Container::Cmaf { init: Bytes }`; **all codec support always compiled (no per-codec feature flags)**; lazy track creation; `Decoder` → `Framed` rename; `convert::cmaf::Convert` + `convert::hang::Convert`. Final cleanup commit `5e6d5a3` collapses dual APIs in `moq_mux::export`: `OrderedConsumer<F: ContainerFormat>` → `Consumer<F: Container>`; `ContainerFormat` trait → `container::Container` trait; `OrderedFrame` → `container::Frame`; `OrderedMuxer<F>` → `Muxed`; `export::Cmaf { timescale }` → `container::Cmaf { trak }`. **Net deletion ~1000 lines** despite being a backport. **ksletmoe-aws's #1359 effectively flowed back via this merge** in a different shape.
    - **PR #1307 OPENED / updated** May 5 21:45 UTC (+150/−13, still open) — *moq-lite: negotiate Lite03+ via legacy SETUP when ALPN is unavailable*. **Direct Firefox-WebTransport-compatibility fix.** Firefox can never pick `moq-lite-03/04` since WebTransport doesn't expose ALPN selection; previous fallback only advertised `[Lite02, Lite01, Draft14]`. Extends fallback to advertise every supported moq-lite version in draft-14 SETUP versions list.
    - **PR #853 + PR #856 CLOSED unmerged** May 5 21:45 UTC — fcancela's *"Minimal observability metrics"* (+1261/−38) and ac-freeman's *"WIP: Delivery timeout"* (+225/−54). Multi-year-old housekeeping retire from before the moq-lite split.
    - **PR #1374 (Lite05 DATAGRAMS) updated** May 5 16:17 UTC — still **open**. Today's merges (#1378, #1380, #1377) reduce surrounding API surface area.
    - **PR #1371 (cross-broadcast track refs) updated** May 5 16:07 UTC — still open.
    - **PR #1338 (chore: release, moq-bot) updated** May 5 22:37 UTC — staging the next moq-lite release line.
  - **moqtail/moqtail** (`moqtail-ts` polish day):
    - **PR #189 MERGED** May 5 13:40:06 UTC by zafergurel (+18/−4) — *feat(moqtail-ts): set early discard policy per subscription*. Refines May 4 PR #184's lib-wide `setEarlyDiscardPolicy` API to per-subscription scope.
    - **PR #191 MERGED** May 5 14:00:08 UTC by zafergurel (+51/−4, closes #156, **co-authored by @thexeos**) — *fix(moqtail-ts): adds isValidTrackAlias validator*. Fixes a **BigInt-falsy bug** — `if (!trackAlias)` returns true for `0n`, so the relay's first-assigned `trackAlias = 0` was treated as missing. Single canonical `isValidTrackAlias` type guard consolidates 3 prior inconsistent checks. **First moqtail-ts merge with a non-maintainer co-author.**
    - **PR #156 CLOSED unmerged** May 5 14:01:57 UTC (thexeos's strict-undefined-check approach, superseded by zafergurel's broader fix in #191 with attribution preserved).
    - **PR #190 MERGED** May 5 14:04:21 UTC by github-actions[bot] — *[ci] release*. Cuts next moqtail release line capturing #189 + #191.
    - **PR #179 (davemevans Firefox docs) updated** May 5 10:04 UTC — still open.
    - **PRs #186/#187/#188** (sharmafb upstream-FETCH 3-PR series) — all 3 still open, no movement.
  - **cloudflare/moq-rs**: No new commits since Apr 13 (Day +23 fork quiet).
  - **video-dev/moq-js**: No new commits since Apr 16.
  - **google/quiche** (`quiche/quic/moqt`): No new commits since the May 5 01:02 UTC `1ceadc7` Vasiliev *"Rewrite MOQT control message parser"* — Day +1 of post-rewrite quiet.
  - **birneee/quiche_moq**: No new commits since Mar 13.
  - **Eyevinn/moqlivemock + warp-player**: No new commits since the May 5 04:15 UTC v0.8.0 release.
  - **Eyevinn/moqtransport**: No new commits.
- Mailing list:
  - **"Knowing the start of a Subgroup"** — 2 new May 5 messages, both from [[alan-frindell]]:
    - **[[alan-frindell]] May 5 16:56 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/ikxGhCS3LMvDeEA9YjKF_zPqgBY/)) — replies to Luke Curley's May 4 b-frame use-case. *"We've already been over this ground and I don't see any need to revisit the size of the subgroup ID field."* Counter-frames prioritization argument: *"Group IDs and Object IDs are varints and are also part of the priority scheme, so 'we only have 1 byte for prioritization' is already the wrong place to start from."* Concedes editorial gap on mixed subgroup/datagram priority specification but tags it as tertiary.
    - **[[alan-frindell]] May 5 17:02 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/-VFBqpRny-7ZehuT7nD20x4GiXg/)) — replies to a Cullen suggestion about addressing track/group/subgroup starts simultaneously. Splits the problem: **group starts** already solved (Object ID = 0 or Gap header); **track starts** non-trivial (publishers can lose state between instances, but *"we've been at this four years and no one has needed it"*); **subgroup-ID priority overlap** dismissed via Group/Object ID varint argument.
  - **REWIND consensus**: No chair-summary message. Cullen's *"Request Synchronization Use Case"* thread (May 1) and Magnus Westerlund's three May 4 framing messages remain unanswered for a 5th day.
- IETF Datatracker: No new draft versions. WG state: transport-17, msf-00, loc-02, secure-objects-00 (-01 substantively ready in repo, **still not on Datatracker**), privacy-pass-02, cmsf-00. Notable individual: lite-04 (Apr 9, despite Lite05 in moq-dev/moq PR #1374), nmsf-01 (Apr 7), qlog-moq-events-06 (Mar 16), media-interop-03 (expired Apr 23, no -04), subscribe-rewind-02.
- Interop runner: **20 pass / 71 fail / 14 skip** (105 tests, 2026-05-06 00:36 UTC report). **Flat vs. May 5 00:37 UTC** (also 20/71/14). Walking arc: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → **20**. Two consecutive days at the Apr 17–21 floor reading. PR #1341 (moq-mux backport) merged May 6 01:20 UTC — **after** this run, so its effect could appear in May 7. Other moq-dev/moq merges are API/config/platform fixes (no wire-format changes), so wire interop should be preserved.
- MoQ Monthly: No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30 / May 1). Day +5 since #1 publication.
- tobbee/moq-llm-wiki: No new open issues. (3 issues remain closed: #1, #2, #3.)

**Pages updated**: discussions-2026-05.md (top-level "May 5 06:00 UTC → May 6 06:00 UTC" section added), moq-dev.md (header bump + "May 5 → May 6" section: 7 PRs merged incl. PR #1341 moq-mux backport, PR #1307 Firefox fallback opened), moqtail.md (header bump + "May 5" section: PR #189 + #191 + #190 merged, PR #156 closed in favor of #191), interop-status.md (20/71/14 flat day note + post-PR-#145 narrative), interop-runner.md (May 6 row added + narrative paragraph), index.md (last_updated bump), log.md.

**Key findings**:
- **Luke's biggest single-day merge run since Apr 29–30**: 7 PRs merged on `main`, capped by the +2588/−3594 PR #1341 `moq-mux` backport. Despite being a backport, the merge **net-deletes ~1000 lines** because all per-codec feature gates evaporate and the dual `OrderedConsumer`/`Consumer` APIs collapse into a single `Consumer<F: Container>`. ksletmoe-aws's #1359 (closed unmerged on May 4) **effectively flowed back into the codebase** through this `dev`-branch backport in a different shape — first time that pattern is visible in moq-dev/moq's history.
- **moq-lite API tightening completes the post-Lite04 deprecation queue**: PR #1378 (+295/−240) drops every deprecated method accumulated since Lite03, makes `ALPN_*` / `MAX_HOPS` / coding module crate-private, and re-exports the minimum-viable error types from the crate root. Combined with PR #1380 (Origin API renames) and PR #1356 (`insert_track` takes `TrackConsumer`), the moq-lite public API is now in its **cleanest pre-Lite05 state**. The next merge can be PR #1374 (Lite05 DATAGRAMS) without dragging deprecated naming forward.
- **Firefox compatibility front opens via PR #1307**: Firefox's WebTransport doesn't expose an ALPN selection API, so it has been stuck on Lite02 for the post-Lite03 era. PR #1307 extends the legacy SETUP path (bare `moql` ALPN) to advertise every supported moq-lite version in the draft-14 SETUP versions list. **First moq-dev/moq PR addressing a known browser-platform compatibility gap that doesn't require browser-vendor changes.**
- **afrind closes the door on Subgroup-ID/varint reopening**: Two replies in 6 minutes turn back both fronts of Mo Zanaty's May 4 04:24 UTC varint-vs-fixed-width audit call. Combined with Ian Swett's May 3 22:38 UTC FIRST_OBJECT-bit decision, the editorial direction is clear: **subgroup-design topics are closed for draft -18**; reopening would need fresh on-list advocacy. Notable specific framing: *"we've been at this four years and no one has needed it"* on Track-start markers — a strong "demonstrated need only" stance from the editor.
- **Luke (kixelated) opens new LOC architectural front via Issue #19**: Argues LOC needs its own version/encoding contract for private properties rather than implicitly inheriting moq-transport's wire version — particularly because the publisher/subscriber pair may not even agree on the wire-version when a relay bridges them. Conceptually adjacent to the existing #1550 (Properties Type collision moq-16 ↔ loc-01) but at a deeper layer. **First LOC issue from the moq-dev/moq maintainer in a multi-week window.**
- **moqtail-ts polish + first non-maintainer co-author**: PR #191 (isValidTrackAlias) absorbs thexeos's PR #156 (strict-undefined-check approach), preserving credit via Co-Authored-By. **Establishes a template for the moqtail maintainer team to merge externally-proposed-but-broader-fix-warranted PRs**: replace with the broader fix, close the original PR, credit the original author. Useful pattern as moqtail's contributor base widens (sharmafb's 3-PR upstream-FETCH series is the next contributor-led thread to watch).
- **Interop runner two consecutive days at floor**: 20/71/14 unchanged. The post-moqtail-PR-#145 image-rebuild state appears to be the new normal until pair-level fixes land. Today's seven moq-dev/moq merges are **non-wire** (API, config, DNS, OG image), so no further matrix shift expected on those rebuilds. PR #1341 (moq-mux backport) merged 44 minutes after the May 6 00:36 UTC report — its effect would appear in May 7.

---

# 2026-05-05 — moqtail draft-16 umbrella merges; moq-lite Lite05 opens; interop major regression

**TL;DR**:
- **moqtail PR #145 (umbrella draft-16) finally MERGED** into `main` after being open since Mar 6 — 216 files, +17,114/−11,744. PR #182 (drop draft-14 docs) merges 49 min later — moqtail is now a single-draft (draft-16) project. Mailing list "Knowing the start of a Subgroup" thread surfaces 3 implementer voices asking "why >256 subgroups?"; Magnus Westerlund returns to list with 3 messages reframing request-sync as problem-solving and pointing at London.
- **Implementations**: moqtail PR #145 MERGED (+17,114/−11,744 across 216 files); PR #181/#182/#184 MERGED; sharmafb opens 3-PR upstream-FETCH series #186/#187/#188 (+240/−14). moq-dev/moq Luke OPENS PR #1374 introducing **Lite05 wire version** (ALPN `moq-lite-05`, +1615/−7 across 21 files, new DATAGRAMS control stream + QUIC datagram delivery). google/quiche +1 moqt commit (Vasiliev: rewrite control message parser) — first since Apr 22. Eyevinn moqlivemock + warp-player coordinated **v0.8.0** (HEVC LOC, WebCodecs LOC, namespace filtering, Safari wt.closed fix). cloudflare/moq-rs Day +22 quiet, video-dev/moq-js, birneee/quiche_moq quiet.
- **Interop**: 20/71/14 — **−4 pass / +4 fail vs May 4** (24/67/14). Largest single-day regression since Apr 17 floor. Most plausible cause: moqtail-relay image rebuild after PR #145 wholesale draft-14→draft-16 migration.

**Operation**: Update
**Sources**:
- Slack: `#moq` (broke 7-day silence) — yuyou May 4 08:47 CEST (London June interim venue question), Martin Duke May 4 16:19 CEST ("yes"), [[torbjorn-einarsson]] May 5 06:43 CEST announces moqlivemock + warp-player MSF/LOC/WebCodecs/moq-mi update with demo URL `https://moqlivemock.demo.osaas.io`. `#moq-rs` / `#moq-js` / `#libquicr` quiet.
- GitHub moq-wg repos:
  - **moq-transport**: No new commits, no new PRs opened, no merges in May 4 06:00 UTC → May 5 06:00 UTC window. Open PRs unchanged: #1627, #1604, #1617, #1615, #1625, #1607, #1544, #1623, #1618, #1621, #1591, #1605, #1378, #1613.
  - **moq-wg/secure-objects**: No new activity since May 1 wave. Open PRs remain #83, #84, #85.
  - **moq-wg/msf, loc, cmsf, catalog-format, privacy-pass**: No new activity.
- GitHub implementations:
  - **moq-dev/moq** (Lite05 day):
    - **PR #1374 OPENED** May 4 22:57:32 UTC by [[luke-curley]] — *moq-lite: add DATAGRAMS control stream + QUIC datagram delivery (Lite05)* (+1615/−7 across 21 files, both Rust + TS). New wire version `Lite05` / `DRAFT_05`, ALPN `moq-lite-05`, code `0xff0dad05`. New `DATAGRAMS` bidi control stream `0x6` parallel to `SUBSCRIBE` sharing `subscribe_id` namespace. QUIC datagram body: `subscribe_id (i) | sequence (i) | payload (b)`, payload capped at 1200B. 33ms publisher-side cache with per-subscriber `max_latency` filter. Public API: `TrackProducer.write_datagram` / `append_datagram`, `TrackConsumer.subscribe_datagrams` → `DatagramsConsumer`. JS: `Track.writeDatagram` / `appendDatagram` / `recvDatagram` / `skipDatagramsToLatest`. **Spec draft section + Lite05 changelog entry live in the separate `moq-wg/moq-drafts` repo** (not the source-code monorepo). 17 new Rust tests, 12 new TS tests; manual relay round-trip + Lite04↔Lite05 cross-version sanity still pending. Body marked *"🤖 Generated with Claude Code"*.
    - **PR #1359 CLOSED unmerged** May 4 21:25 UTC — ksletmoe-aws's *unify Consumer across container formats* did not land in the form opened (~+1002/−1173 across 14 files).
    - **PR #1356 updated** May 4 23:10 UTC by [[luke-curley]] — *moq-lite: switch insert_track to take TrackConsumer* (+39/−93). Removes `TrackConsumer::produce()` from #1300; adds `TrackConsumer::weak()`.
    - **PR #1373 updated** May 4 22:25 UTC by skirsten — playback stalls / frame-rate beating fix (still open, follow-up to PR #1367).
    - **PR #1341 updated** May 4 22:24 UTC by [[luke-curley]] — fMP4 / CMAF passthrough refactor (+3808/−2025 across 79 files; module reorg `moq_mux::import` → `moq_mux::producer`, removed feature gates, base64 ftyp+moov in catalog).
    - **PR #1338 updated** May 4 21:47 UTC — `chore: release` (moq-bot staging release).
  - **moqtail/moqtail** (umbrella merge day):
    - **PR #145 MERGED** May 4 19:23:22 UTC by **zafergurel** — *feat: draft-16 compatibility* (+17,114/−11,744 across 216 files). Body: *"Here is a substantial PR thanks to the huge difference between draft-14 and draft-16."* New ALPN-based ClientSetup/ServerSetup negotiation (#132). Two new demo apps: `apps/client-js` (browser subscriber) + `apps/meet` (WebRTC-over-MoQ video conferencing). Renamed `request_id` → `max_request_id` (#146). MessageParameter typed parameters (#153). Track Extensions + Object Extensions (#155). Unified request ID registry (#163).
    - **PR #181 MERGED** May 4 19:39:57 UTC by zafergurel — *refactor: clean up object status values* (closes Issue #117).
    - **PR #182 MERGED** May 4 20:12:09 UTC by zafergurel — *docs: remove draft 14 texts*. **moqtail formally drops draft-14 documentation** ~30 minutes after umbrella draft-16 lands.
    - **PR #184 MERGED** May 4 21:21:20 UTC by zafergurel — *feat: add setEarlyDiscardPolicy to moqtail-ts API* (+85/−38). New developer-facing API to cancel slow subgroup streams after configurable timeout.
    - **README updated** May 4 20:27 UTC by **Ali C. Begen** (`1d39865`) — first co-maintainer commit on `main` in this window.
    - **CI release commits** (#173, #183, #185) bumped versions on `main`.
    - **PR #186 OPENED** May 4 21:37:33 UTC by **sharmafb** (Aman Sharma) — *[upstream fetches] Add command-line args for FETCH upstream timeout and gap limit [1/n]* (+15/0).
    - **PR #187 OPENED** May 5 02:35:51 UTC by **sharmafb** — *[upstream fetches] Plumbing to forward FETCH data received from upstream [2/n]* (+71/−6).
    - **PR #188 OPENED** May 5 02:50:23 UTC by **sharmafb** — *[upstream fetches] Function to send upstream fetch [3/n]* (+154/−8).
  - **google/quiche** (`quiche/quic/moqt`): **First commit since Apr 22** (Day +13 quiet ended) — `1ceadc7` May 5 01:02:22 UTC *"Rewrite MOQT control message parser"* by Vasiliev.
  - **cloudflare/moq-rs**: No new commits since Apr 13 (Day +22 of upstream-fork quiet).
  - **video-dev/moq-js**: No new commits since Apr 16.
  - **birneee/quiche_moq**: No new commits since Mar 13.
  - **Eyevinn/moqlivemock** (v0.8.0 release): `d174037` May 5 03:59 UTC *chore: bump version to 0.8.0*; `77d67b0` May 3 22:13 UTC *feat(catalog): expose accurate per-packaging bitrate*; `2d08ea1` May 3 21:20 UTC *feat(loc): add HEVC support for LOC packaging* (closes Issue #23 via PR #76).
  - **Eyevinn/warp-player** (v0.8.0 release): `05ded99` May 5 04:15 UTC *chore: bump version to 0.8.0*; `421e8da` May 5 03:54 UTC *docs: cover MSF catalog and WebCodecs LOC pipeline in README and CLAUDE.md*; `48378e9` May 3 21:32 UTC *feat(loc): add HEVC support to WebCodecs LOC pipeline*; `f154020` May 3 20:56 UTC *fix(transport): handle wt.closed rejection so Safari doesn't flag it*; `95a653d` May 3 20:36 UTC *feat(ui): add engine legend, mute toggle, and namespace filtering*.
- Mailing list:
  - **"Knowing the start of a Subgroup"** thread — 4 new May 4 messages:
    - **[[ian-swett]] May 4 16:56 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/dpfivbI043m20hxziKNBYN38V2I/)) — replies to Mo Zanaty: limiting Subgroup ID to single byte is *"a very appealing change"*, but flags trade-off (256-Object/Group cap when doing Object-per-Subgroup without datagrams). References Issue #1405. Reiterates concern about Subgroup ID + Priority overlap as prioritization mechanisms.
    - **[[mo-zanaty]] May 4 17:36 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/xShnVHc5vXqEBrhUfU8czjTnkkU/)) — proposes single-object stream workaround (multiple objects with id=0 + reset) plus a specialized header format for single-object streams resembling datagrams. *"If stream-per-object can be done without consuming many Subgroup IDs, a single byte for Subgroup ID would suffice."*
    - **[[suhas-nandakumar]] May 4 17:40 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/JHLULNLlNJ-o_RikD_XB8Ba-2-4/)) — *"Is there a use-case where we need more than 256 subgroups and needs to be considered for prioritization? I cannot think of one but appreciate inputs from others."*
    - **[[luke-curley]] May 4 20:00 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/tPHPb_3nf893KMqICMIUJqE0NFI/)) — *"What are the use-cases for a sub-group per object/datagram? I think for media, it would be sending each b-frame as a separate sub-group."*
  - **"Request Synchronization Use Case"** thread — 3 new May 4 messages:
    - **[[magnus-westerlund]] May 4 10:04 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/bSQf02Wcdvul4VNWro4_WikggSM/)) — replies to Cullen's May 1 framing. Clarifies WG poll was about whether request synchronization needed resolution in draft-18, with intent to defer to London. *"The discussion also indicated that there are some different views on why a request synchronization mechanism is needed."* Proposes two paths: state explicitly that capability remains, or retain `required_request_id` in -18 with notes documenting issues. **Frames as problem-solving, not removal of consensus.**
    - **[[magnus-westerlund]] May 4 10:15 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/UoDRMucPSFVAKzwJPeKVex1f0Io/)) — asks Cullen to detail three scenarios: Swap Tracks (REQUEST_UPDATE forward-flag vs new subscriptions), Client Side ABR (REQUEST_UPDATE / new subscriptions / SWITCH), Pause/Unpause (questions whether reorder-via-REQUEST_UPDATE is achievable; *"requests will be delivered and processed in the order transmitted"*).
    - **[[luke-curley]] May 4 17:10 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/6X8WPyp6GXcTVnMgN8D1aozmEbc/)) — identifies **deadlock concern with draft-17 `required_request_id`**: *"if either side RESETs a request, it can cause a deadlock. The peer may never learn about a specific request_id referenced via a required_request_id so it will block."* Says the issue is *"addressable"*.
  - **"Re: Minutes from Interim meeting 27 of April 2026"** — **[[magnus-westerlund]] May 4 07:59 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/ykbgFMG2I4KaMtzhlah8gc1u1rQ/)) — responds to Cullen on minutes quality. *"For keeping the arguments more easily available we should in fact have more discussion over email as there the full argumentation would be available in the mail archive."*
- IETF Datatracker: No new draft versions. WG state: transport-17, msf-00, loc-02, secure-objects-00 (-01 substantively ready in repo, **still not on Datatracker**), privacy-pass-02, cmsf-00. Notable individual: lite-04 (Apr 9, despite Lite05 introduction in moq-dev/moq PR #1374), nmsf-01 (Apr 7).
- Interop runner: **20 pass / 71 fail / 14 skip** (105 tests, 2026-05-05 00:37 UTC report). **−4 pass / +4 fail vs May 4 00:38 UTC's 24/67/14**. Largest single-day regression since Apr 17 floor (also 20). Walking arc: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → **20**. Most plausible cause: moqtail PR #145 merged into `main` May 4 19:23 UTC — image rebuilds for `moqtail-relay` and `moq-dev-rs` / `moq-dev-js` likely flipping multiple pairs to fail.
- MoQ Monthly: No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30 / May 1). Day +4 since #1 publication.
- tobbee/moq-llm-wiki: No new open issues. (3 issues remain closed: #1, #2, #3.)

**Pages updated**: discussions-2026-05.md (top-level "May 4 06:00 UTC → May 5 06:00 UTC" section added covering moqtail umbrella merge + Lite05 + mailing list + Slack + Eyevinn v0.8.0 + interop regression), moqtail.md (header + new "May 4" section: PR #145 merged, draft-14 docs removed, setEarlyDiscardPolicy, sharmafb upstream-FETCH 3-PR series), moq-dev.md (header + new "May 4 → May 5" section: PR #1374 Lite05, PR #1359 closed, PR #1356/#1373/#1341 updated), moqlivemock.md (header bump to v0.8.0, packaging formats now CMSF/LOC/MSF/moq-mi, both moqlivemock and warp-player at v0.8.0), moq-lite.md (Lite05 banner added at top), interop-status.md (20/71/14, regression note), interop-runner.md (May 5 row added, narrative paragraph appended), index.md (last_updated bump), log.md.

**Key findings**:
- **moqtail's 2-month draft-16 migration completes**: PR #145 (umbrella draft-16) was opened Mar 6 and merged May 4 19:23 UTC after 29 commits and 216 files of churn. Combined with PR #182 (remove draft-14 docs) merged 49 minutes later, **moqtail is now a single-draft (draft-16) project on `main`**. This is the largest moqtail merge in the project's history. Concurrently, the team has already started building draft-16-specific features on top — sharmafb's 3-PR upstream-FETCH series and zafergurel's `setEarlyDiscardPolicy` API both opened/merged the same day.
- **moq-lite Lite05 wire-version increment**: Luke's PR #1374 adds the first wire-version increment in moq-lite since Lite04 was the baseline. The DATAGRAMS control stream + QUIC datagram body design intentionally encodes a `sequence` field that Lite05 doesn't use — *"so a future moq-transport adapter can reuse the same encoding."* This is forward-looking spec engineering: the unreliable delivery design is being defined in moq-lite first, with a clear extension hook for adoption into moq-transport later. Notable that the spec text lives in `moq-wg/moq-drafts` (a separate repo) rather than being merged into draft-lcurley-moq-lite-05 on Datatracker — suggests a different publication cadence.
- **Magnus Westerlund returns to the list with substance**: Three messages in a single day (Apr 27 interim minutes, Cullen's request-sync framing × 2). His framing on request-synchronization explicitly resists Cullen's "removal of consensus" reading — *"problem-solving"*. Asks Cullen to detail three concrete scenarios (Swap Tracks / Client Side ABR / Pause/Unpause). London (June 9–12) appears now firmly framed as the venue where this gets resolved, with the mailing list as the primary preparation surface — Magnus explicitly: *"we should in fact have more discussion over email as there the full argumentation would be available in the mail archive."*
- **Subgroup-ID-as-single-byte gains traction**: The May 4 thread surfaces 3 implementer voices (Ian Swett, Suhas Nandakumar, Luke Curley) asking the same question — *"why do we need >256 subgroups?"* — with no use case offered. Mo Zanaty's varint-vs-fixed-width audit thread (opened May 4 04:24 UTC) is now feeding directly into PR-shaped change proposals. Likely London agenda item.
- **Interop runner regression coincides with moqtail umbrella merge**: 24 → 20 pass / 67 → 71 fail. The proximate cause is most likely the moqtail-relay image rebuild after PR #145 — the wholesale draft-14→draft-16 migration would change wire-level behavior on every moqtail × {moq-dev, moq-rs, moqx, moxygen, ...} pair. Pair-level diff inspection warranted to confirm. moq-dev/moq PR #1374 (Lite05) was opened May 4 22:57 UTC and is **not yet merged**, so the May 5 regression cannot be attributed to it.
- **Eyevinn coordinated v0.8.0 release**: Both moqlivemock and warp-player bumped to v0.8.0 May 4–5, with HEVC for LOC, WebCodecs LOC pipeline, accurate per-packaging bitrate in catalog, namespace filtering UI, mute toggle, and a Safari `wt.closed` rejection fix. Tobbe's Slack announcement makes this the most expansive Eyevinn-side release of the cycle: now spans CMSF + LOC + MSF + moq-mi, and exercises both MSE and WebCodecs rendering paths.

---

# 2026-05-04 — ianswett opens competing-design Issue #1627 to martinduke's PR #1604

**TL;DR**:
- **ianswett opens Issue #1627 ("SUBSCRIBE with Joining Fetch")** as a competing-design alternative to martinduke's PR #1604; fixes the same four issues (#1039/#1313/#1602/#1612) by adding two new modes to SUBSCRIBE instead of carrying Joining FETCH on the SUBSCRIBE stream. Mailing list reignites — ianswett announces decision to proceed with FIRST_OBJECT bit (PR #1618), backing the May 1 PR #1608 closure on-list; Mo Zanaty broadens scope by calling for varint-vs-fixed-width audit ("Subgroup ID could be a single byte"). Weekly GitHub digest sent May 3.
- **Implementations**: moq-dev/moq PR #1373 OPENED by skirsten (`@moq/watch` playback stall + frame-rate beating fix, closes #1367) supersedes skirsten's own PR #1367 two days after opening; PR #1359 (ksletmoe-aws Consumer unify) revised. moqtail PR #145 (umbrella draft-16) gets 3 commits (two race-condition fixes bracketing a logging refactor). cloudflare/moq-rs Day +21 fork quiet; google/quiche moqt Day +12; video-dev/moq-js, birneee/quiche_moq quiet.
- **Interop**: 24/67/14 — flat vs May 3 (post-revert run shows net-zero matrix change).

**Operation**: Update
**Sources**:
- Slack: `#moq` — no new posts since Apr 27 18:50 CEST (Day +7). `#moq-rs` / `#moq-js` / `#libquicr` quiet.
- GitHub moq-wg repos:
  - **moq-transport**:
    - **Issue #1627 OPENED** May 3 07:40:15 UTC by [[ian-swett]] — *"SUBSCRIBE with Joining Fetch"*. Body: *"A different take on #1604 that adds two new modes to SUBSCRIBE instead of allowing Joining FETCH to be sent on the SUBSCRIBE stream."* Notes: removable Request ID once #1615 lands; needs text on FETCH_HEADER stream behavior on Subscription cancel; needs prioritization clarification. **Fixes #1039, #1313, #1602, #1612** — same four-issue closure target as [[martin-duke]]'s PR #1604, framed as a competing simpler design.
    - **PR #1604 (Joining FETCH with subscription) — comments by ianswett** May 3 06:39 + 06:42 UTC. First comment replies to gwendalsimon's Apr 16 SWITCH-relay-proactive-FETCH framing: *"This conversation makes me think using a single message would be better."* Second on prioritization concern: *"I don't think there's a compelling use case for updating the priority separately. You're issuing a message to Join a Track."* Both ~1 hour before opening Issue #1627.
    - **No new commits or merged PRs** in the May 3 06:00 → May 4 06:00 UTC window.
  - **moq-wg/secure-objects**: No new activity since May 1 editorial wave. Open PRs remain #83 (SFRAME RFC ref), #84 (test vectors), #85 (en-dash fix).
  - **moq-wg/msf, loc, cmsf, catalog-format, privacy-pass**: No new activity.
- GitHub implementations:
  - **moq-dev/moq**:
    - **PR #1373 OPENED** May 3 16:53:49 UTC by **skirsten** (+146/−144 across 6 files, *@moq/watch: fix playback stalls and frame-rate beating*, **closes #1367**). Body terse: *"Detailed description of both fixes is in the commits."* Same author as the May 1 PR #1367 (pull-mode renderer for 144Hz+ Chrome) — effectively a rewrite that supersedes #1367. coderabbitai bot review (May 3 17:02): *"No actionable comments were generated."* skirsten now has 4 PRs in the May 1–3 window (#1349 + #1365 merged; #1367 + #1373 open with #1373 superseding).
    - **PR #1359 revised** May 3 04:30 UTC by **ksletmoe-aws** — now +1002/−1173 across 14 files (vs. earlier reading). Author summary: *"Replace the two separate consumer implementations (Legacy and CMAF) with a single generic `Consumer` class that accepts a `ContainerFormat` strategy for frame parsing. This mirrors the Rust `moq-mux` `Consumer<F: Container>` pattern... Additionally, add a `sequential` delivery mode flag to fix audio stuttering caused by inter-group serialization."* Presumably addresses Luke's May 2 nits about `Frame`/`DecodedFrame` reuse and avoiding `Legacy.LegacyFormat`.
    - **No merges in window.** Open: PR #1370 (metapox), #1371 (Luke), #1367 (skirsten), #1373 (skirsten), #1359 (ksletmoe-aws), #1362 (Qizot), #1356/#1358/#1341 (Luke).
  - **moqtail/moqtail**:
    - **PR #145 (DRAFT: draft-16) updated** with 3 new commits May 3:
      - `6f79910` 18:10 UTC *fix: fixes a race condition*
      - `ee9f7e0` 19:02 UTC *refactor: proper logging for moqtail-ts*
      - `ad78f25` 23:39 UTC *fix: fixes a race condition*
      Now at 29 commits, +17187/−11733, 240 files vs. main. Two race-condition fixes ~5.5 hours apart bracket the logging refactor. Still not landed on `main`.
  - **cloudflare/moq-rs**: No new commits since Apr 13 (Day +21 of upstream-fork quiet).
  - **video-dev/moq-js**: No new commits since Apr 16.
  - **google/quiche** (`quiche/quic/moqt`): No new commits since Apr 22 (Day +12).
  - **birneee/quiche_moq**: No new commits since Mar 13.
- Mailing list:
  - **[[ian-swett]] May 3 22:38 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/dL1-WD_iTNa4WR-dHfZrHPKhNXA/)) "Re: Knowing the start of a Subgroup" — thanks Mo Zanaty, **announces decision to proceed with the bitfield approach (FIRST_OBJECT bit, PR #1618)**. Reservation: *"having both Subgroup ID and Priority serve as methods for prioritizing objects within a group"* — Subgroup ID creates a much larger namespace than the agreed single-byte priority. Effectively closes the design dispute on-list.
  - **[[mo-zanaty]] May 4 04:24 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/_OwGvDKV9OaYxgOc6tJH7osmn3I/)) "Re: Knowing the start of a Subgroup" — replies broadening the topic: proposes reconsidering varints across the spec ("Subgroup ID could be a single byte"), recommends a **broader review of all variable-length integer fields** to determine whether they genuinely require varint encoding. **First explicit on-list call for a varint-vs-fixed-width audit.**
  - **Repository Activity Summary Bot May 3** ([msg](https://mailarchive.ietf.org/arch/msg/moq/umr1H3WzgiNKptknCbeSZHCNCCg/)) — weekly GitHub digest. moq-transport: *"3 new issues, 12 issues received 15 comments, 14 issues closed, 10 PRs."* Notable: PR #1625 (Magnus Security), PR #1615 (Remove RRID, *"Merge Ready"*), PR #1608 (6 comments), PR #1607 (Largest Available Group filter). For warp-streaming-format: *"2 PRs incl. SCTE-35 + CEA-608/708 accessibility fields and initial zapping specifications"* — first wiki-visible mention of warp-streaming-format SCTE-35/CC PR work.
  - **REWIND consensus**: Day +3 since May 1 deadline without chair-summary message. Cullen's *"Request Synchronization Use Case"* thread (May 1) still no replies.
- IETF Datatracker: No new draft versions. WG state: transport-17, msf-00, loc-02, secure-objects-00 (-01 substantively ready but not yet published despite the May 1 merge wave), privacy-pass-02, cmsf-00. Notable individual: lite-04 (Apr 9), nmsf-01 (Apr 7).
- Interop runner: **24 pass / 67 fail / 14 skip** (105 tests, 2026-05-04 00:38 UTC report). **Flat vs. May 3 00:38 UTC** (also 24/67/14). Walking arc since Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → **24**. The May 2 21:18 UTC PR #1372 revert (Luke pulling fetch_group + Subscription API) presumably reached this run, so any restoration-effect is already baked in.
- MoQ Monthly: No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30 / May 1). Day +3 since #1 publication.
- tobbee/moq-llm-wiki: No new open issues.

**Pages updated**: discussions-2026-05.md (top-level "May 3 06:00 UTC → May 4 06:00 UTC" section added), moq-dev.md (May 3 → May 4 section: PR #1373 opened superseding #1367, PR #1359 revised), moqtail.md (PR #145 commit log extended), interop-status.md (24/67/14, flat day note), interop-runner.md (history table extended), index.md (last_updated bump), log.md.

**Key findings**:
- **Joining FETCH redesign now has two competing live proposals** in the moq-transport repo: Martin Duke's PR #1604 (carry Joining FETCH on the SUBSCRIBE stream) vs. Ian Swett's brand-new Issue #1627 (collapse Joining FETCH into new SUBSCRIBE modes). Both target the same four issues (#1039 / #1313 / #1602 / #1612). Issue #1627 was opened ~1 hour after Ian's *"single message would be better"* comment on PR #1604, making it explicit that he wants the alternative shape considered. Resolution will likely surface in London hybrid-interim agenda.
- **Subgroup-start design is on-list-confirmed**: Ian Swett's May 3 22:38 UTC message converts the May 1 PR #1608 closure into an on-list direction statement — FIRST_OBJECT bit (PR #1618) is the WG path forward. That removes ambiguity from the closed dispute.
- **Mo Zanaty has opened a new design front**: a broader varint vs. fixed-width audit. This is the first time the spec's encoding-class choices have been challenged as a design topic on-list, separate from any specific message. Could be picked up at London if anyone champions it.
- **moq-dev/moq external-contributor velocity**: skirsten alone has 4 PRs in 3 days (#1349 catalog merged, #1365 AudioContext merged, #1367 pull-mode + #1373 superseding-fix open). ksletmoe-aws is now in active revision turn-around. metapox has the open PriorityQueue bug-with-fix-offer (#1370). Luke's repo has clearly transitioned from solo-development to multi-contributor activity in the post-NAB window.
- **Interop runner flat-day**: the May 2 PR #1372 revert (Luke removing the partial fetch_group / Subscription API merged Apr 30) didn't move the matrix needle — net zero from May 3 to May 4. The walking arc has stabilized at 24 pass for 2 consecutive days, with one excursion to 25 on May 2.
- **Slack signal-to-noise**: 7 days of silence on `#moq` after the Apr 27 interim. The mailing list and GitHub are the only active surfaces — Slack as a coordination channel is absent post-interim.

---

# 2026-05-03 — Luke reverts the FETCH-path API; metapox files first fix-with-PR

**TL;DR**:
- **Luke reverts PR #1357 (fetch_group + TrackDynamic) and PR #1348 via PR #1372** — *"FETCH isn't hooked up yet, the breaking API change isn't worth it; the API also wasn't quite right."* Three days after PR #1357 was framed as the first track-level FETCH path API. moq-transport quiet (no new PRs/commits); REWIND consensus chair-summary message still absent (Day +2 since deadline); MoQ Monthly archive shows #1 dated Apr 30 not May 1 (minor adjustment).
- **Implementations**: moq-dev/moq PR #1372 MERGED (revert); PR #1371 OPENED by Luke (hang cross-broadcast track refs, +PathRelative type); **metapox OPENS PR #1370** (PriorityQueue not updating in-flight groups on SUBSCRIBE_UPDATE) — detailed bug report citing draft-13 §6.1 with working fix in their fork (camera-focus switch latency) and offer to submit. PR #1369 (sidsethupathi moq-gst EOS) MERGED. moqtail PR #180 (separate stream for SUBSCRIBE_NAMESPACE, +1150/−488) MERGED into `draft-16` branch ~10 hours BEFORE moq-transport PR #1542 itself merged. cloudflare/moq-rs, video-dev/moq-js, google/quiche, birneee/quiche_moq quiet.
- **Interop**: 24/67/14 — first regression after 4-day +1/day recovery streak (−1 pass / +1 fail vs May 2's 25/66/14).

**Operation**: Update
**Sources**:
- Slack: `#moq` — no new posts since Apr 27 18:50 CEST. `#moq-rs` / `#moq-js` / `#libquicr` quiet.
- GitHub moq-wg repos:
  - **moq-transport**: No new commits or PRs in the May 2 → May 3 06:00 UTC window. Issue #1313 (ianswett "Joining FETCH as a separate control message creates edge cases and feature gaps") got a comment May 3 06:00 UTC.
  - **moq-wg/secure-objects**: No new activity. Open PRs remain #83 (SFRAME RFC ref), #84 (test vectors), #85 (en-dash fix) — all editorial polish.
  - **moq-wg/msf, loc, cmsf, catalog-format, privacy-pass**: No new activity.
- GitHub implementations:
  - **moq-dev/moq** (busy day):
    - **PR #1372 MERGED** May 2 21:18:50 UTC by [[luke-curley]] — *Revert moq-lite FETCH/Subscription API changes*. **Reverts PR #1357 (fetch_group + TrackDynamic, merged Apr 30 00:01 UTC) and PR #1348 (Subscription model API for FETCH readiness).** Body: *"FETCH isn't hooked up yet, so the breaking API change isn't worth it; the API also wasn't quite right."* Hop-based clustering (PR #1322) and per-frame buffer changes (PR #1353) preserved. **Notable U-turn — PR #1357 was just three days old and described as "first track-level FETCH path API" in the Apr 30 wiki entry.**
    - **PR #1371 OPENED** May 2 20:28:59 UTC by [[luke-curley]] — *hang: cross-broadcast track references in renditions*. New `PathRelative` type + `Path::resolve` in moq-lite Rust + mirror `resolveBroadcast` for `@moq/hang`. Lets a downstream catalog reference tracks in another broadcast without republishing bytes. Body explicitly notes *"🤖 Generated with Claude Code"*.
    - **PR #1370 OPENED** May 2 15:28:56 UTC by **metapox** — *fix(lite): PriorityQueue does not update in-flight groups on SUBSCRIBE_UPDATE*. Detailed bug report citing draft-ietf-moq-transport-13 §6.1: *"When subscriber priority is changed, a best effort SHOULD be made to apply the change to all objects that have not been sent."* `PriorityQueue::insert()` copies the `track` value at insertion time; `SUBSCRIBE_UPDATE` doesn't refresh in-flight groups. Real-world impact: *"Switching camera focus via SUBSCRIBE_UPDATE takes several seconds because old groups from the previously-focused camera continue to be served at high priority."* Proposed fix: `subscription_id` on `PriorityItem`, `update_subscription()` API, wider quinn priority spread `index * 64`, priority-aware `write_all` via `tokio::select!` with `priority.next()`. metapox: *"We have a working implementation in our fork and can submit a PR if interested."* References Issues #699 (priority tie-breaking) + #1363 (own JS SUBSCRIBE_UPDATE issue from Apr 30). **First substantive bug-report-with-fix-offer from metapox.**
    - **PR #1369 MERGED** May 2 14:53:33 UTC by [[luke-curley]] (sidsethupathi author, +39/−2, *moq-gst: fix moqsink eos*). Lands ~11.5 hours after open. **sidsethupathi's second merged PR** after #1294 (Apr 12).
  - **moqtail/moqtail**:
    - **PR #180 MERGED** May 1 12:45:51 UTC by **zafergurel** (+1150/−488, *feat: separate stream for subscribe_namespace*) into the `draft-16` branch. Reviewer: DenizUgur. **moqtail merged the impl-side SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split design ~10 hours BEFORE moq-transport PR #1542 itself merged May 1 22:59 UTC.** Still on `draft-16` branch (PR #145 umbrella tracker still not landed on `main`).
  - **cloudflare/moq-rs**: No new commits since Apr 13.
  - **video-dev/moq-js**: Quiet since Apr 21.
  - **google/quiche** (`quiche/quic/moqt`): No new commits since Apr 22.
  - **birneee/quiche_moq**: No new commits since Mar 13.
- Mailing list: **No new on-list messages May 2-3 visible.** Cullen's *"Request Synchronization Use Case"* thread (May 1) has had no replies. The "Knowing the start of a Subgroup" thread is quiet. **The REWIND consensus deadline message-of-record from a chair has still not appeared on the list as of May 3 06:00 UTC.**
- IETF Datatracker: No new draft versions. WG state: transport-17, msf-00, loc-02, secure-objects-00 (-01 substantively ready but not yet published), privacy-pass-02, cmsf-00. Notable individual: lite-04 (Apr 9), nmsf-01 (Apr 7).
- Interop runner: **24 pass / 67 fail / 14 skip** (105 tests, 2026-05-03 00:38 UTC report). **First regression after 4-day +1/day recovery streak**: −1 pass / +1 fail vs May 2's 25/66/14. Walking arc since the Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → **24**. Most plausible cause: a moqtail `draft-16` branch image rebuild after PR #180 merged.
- MoQ Monthly: Archive page now shows #1 (*"NAB, interoperability, and a whole lot of catching up"*) dated **April 30** rather than May 1. The *publish* email may have arrived May 1 but the archive entry is dated Apr 30 — minor cleanup vs May 2 wiki entry.
- tobbee/moq-llm-wiki: No new open issues. (3 issues all closed: #1 OpenMOQ, #2 broken interop-runner links, #3 factual corrections.)

**Pages updated**: discussions-2026-05.md (top-level "May 2 → May 3" section added), moq-dev.md (May 2 → May 3 section: PRs #1369 merged, #1370/#1371 opened, #1372 merged-as-revert), moqtail.md (PR #180 status updated to MERGED), interop-status.md (24/67/14), interop-runner.md (history table extended + May 3 narrative), index.md (last_updated bump), log.md.

**Key findings**:
- moq-dev/moq: Luke's PR #1372 reverts PR #1357 (fetch_group + TrackDynamic) just three days after merging it, with the candid rationale that *"FETCH isn't hooked up yet, the breaking API change isn't worth it; the API also wasn't quite right"*. The Apr 30 wiki entry framed PR #1357 as the *"first track-level FETCH path API"* — that framing is now stale; track-level FETCH path remains unimplemented in `moq-dev/moq`.
- metapox PR #1370 is the most concrete external-contributor bug report on `moq-dev/moq` to date: cites the draft normatively, has a working fix, identifies a real user-visible regression (camera-focus switching takes seconds under bandwidth pressure), and offers to submit. Tracks Issue #699 (priority tie-breaking) which has been open since 2025.
- moqtail PR #180 lands the SUBSCRIBE_NAMESPACE / SUBSCRIBE_TRACKS split design **before** the corresponding moq-transport PR #1542 merged. moqtail's `draft-16` branch is now ahead of the moq-transport `main` on this design point.
- Interop runner regression breaks the 4-day +1/day recovery streak. The May 2 21:18 UTC PR #1372 (Luke's revert) happened after the May 3 00:38 UTC report, so its effect — possibly partially restoring functionality that broke when PR #1357 landed — would only show up in May 4's run.
- Mailing list silence on REWIND consensus continues. Day +2 since the May 1 deadline without a chair-summary message; Cullen's framing (option-#1, willing to "punt to London") remains the only on-list interpretation.

---

# 2026-05-02 — PR #1542 NAMESPACE split MERGED; secure-objects wave concludes; MoQ Monthly #1

**TL;DR**:
- **PR #1542 (SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split) MERGED** — most structural moq-transport merge of the post-interim wave; closes Issue #1458. New Issue #1626 (sharmafb, QMUX version negotiation) — afrind: *"TLS ALPN moqt-18 implies qmux-01"* (first concrete framing for draft-18). PR #1608 formally CLOSED in favor of #1618. **REWIND consensus call deadline reached without chair-summary message**; Cullen opens "Request Synchronization Use Case" thread (3 use cases — track swap, ABR, pause/unpause), willing to *"punt to London"*.
- **MoQ Monthly #1 PUBLISHED May 1** by Mike English — first since #0 (Mar 4); names draft-18 as next interop target, calls Safari 26.4 → WebTransport Baseline, **explicitly cites this wiki** (`tobbee.github.io/moq-llm-wiki/`) and Tobbe's moqlivemock update.
- **Implementations**: secure-objects editorial wave concludes May 1 — PRs #82 (padding, fixes #54), #77 (threat model, fixes #49), #86 (fan-out, fixes #49) all MERGED. moq-dev/moq quiet day for Luke (PR #1366 flake bump, PR #1368 doc-note merged) but two new contributor PRs OPENED — skirsten PR #1367 (pull-mode renderer for 144Hz+ Chrome) + sidsethupathi PR #1369 (moqsink EOS fix, second sidsethupathi PR). moqtail, cloudflare/moq-rs, video-dev/moq-js, google/quiche, birneee/quiche_moq quiet.
- **Interop**: 25/66/14 (+1 vs May 1) — recovery now +1/day for **4 consecutive days**.

**Operation**: Update
**Sources**:
- Slack: `#moq` — no new posts since Apr 27 18:50 CEST. `#moq-rs` / `#moq-js` / `#libquicr` quiet.
- GitHub moq-wg repos:
  - **moq-transport**:
    - **PR #1542 MERGED** May 1 22:59:13 UTC by [[alan-frindell]] (+215/−135, *Split SUBSCRIBE_NAMESPACE into SUBSCRIBE_NAMESPACE and SUBSCRIBE_TRACKS*). Replaces single SUBSCRIBE_NAMESPACE (0x11) with **SUBSCRIBE_NAMESPACE (0x50)** for namespace discovery + **SUBSCRIBE_TRACKS (0x51)** for track subscriptions; removes SUBSCRIBE_NAMESPACE_OPTIONS + BOTH mode; adds **TRACK_NAMESPACE_PREFIX (0x34)** for prefix changes via REQUEST_UPDATE. Approvals: ianswett (Mar 9), vasilvv (Apr 27), suhasHere (final May 1 18:32:48 UTC on commit `4aa849a`). **Closes Issue #1458** — one of the longest-standing draft-17 design splits. moqtail PR #180 (zafergurel) had already been opened against the post-Apr-29 split design.
    - **Issue #1626 OPENED** May 1 23:50:05 UTC by **sharmafb** (Suhas Sathyanarayana): *"Version negotiation for QMUX"* — body: *"We have an idea of how version negotiation works for MoQ-over-HTTP/3 and how it works for MoQ-over-QUIC, but do we know how it's going to work for MoQ-over-QMUX?"* afrind reply May 2 02:19:30 UTC: *"We discussed quite a bit last IETF. The plan is to say something like TLS ALPN moqt-18 implies qmux-01"*. **First explicit statement of the QMUX/transport ALPN coupling for draft-18.**
    - **PR #1608 formally CLOSED** May 1 18:35 UTC by [[alan-frindell]] (*"Closing in favor of 1618"*) — confirms FIRST_OBJECT bit (PR #1618) as the WG-adopted answer to "Knowing the start of a Subgroup".
  - **moq-wg/secure-objects** — **Editorial wave concludes May 1 21:05–21:33 UTC**:
    - **PR #82 MERGED** May 1 21:05:19 UTC by [[fluffy]] (suhasHere author, +66/0, *Add padding property for byte boundary alignment*). **Closes Issue #54** (fluffy Nov 2025).
    - **PR #77 MERGED** May 1 21:06:12 UTC self-merged by [[fluffy]] (+50/0, *describe threat model*). Mostly fixes Issue #49.
    - **PR #78 CLOSED** unmerged May 1 21:29 UTC (the *"DO NOT MERGE YET"* fan-out PR, superseded).
    - **PR #86 OPENED + MERGED** May 1 21:27:42 → 21:33:18 UTC (~6 minutes) by [[fluffy]] → suhasHere (+27/0, *Explain Fan Out Attack*, *"This replaces PR#78 and is part of Fixes #49"*). **Closes Issue #49.**
    - Open PRs remaining: #83 (SFRAME RFC ref), #84 (test vectors), #85 (en-dash fix). All polish — secure-objects substantively at -01 release line, but **draft-ietf-moq-secure-objects-01 has NOT yet been published on Datatracker.**
  - **moq-wg/msf, loc, cmsf, catalog-format**: No new activity.
- GitHub implementations:
  - **moq-dev/moq**:
    - **PR #1366 MERGED** May 1 14:58 UTC — flake.lock bump.
    - **PR #1368 MERGED** May 1 18:08:59 UTC by [[luke-curley]] (+1/−1) — single-line doc note: Cloudflare doesn't support both `reload` AND `latency=real-time`.
    - **PR #1367 OPENED** May 1 15:17:12 UTC by **skirsten** (+46/−4, *@moq/watch: add pull mode to video renderer*). Fixes 120fps over-render on Chrome with 144Hz+ monitors via recursive rAF; adds `mode: "push" | "pull"` prop. Fourth skirsten PR after #1349, #1355, #1365.
    - **PR #1369 OPENED** May 2 03:27:40 UTC by **sidsethupathi** (Sid Sethupathi, MLB) (+39/−2, *moq-gst: fix moqsink eos*). Fixes the gst-launch pipeline so EOS from `num-buffers` is honored. **Second sidsethupathi PR** after #1294 (Apr 12).
  - **moqtail/moqtail**: No new activity since Apr 30 PR #178 merge + PR #180 open.
  - **cloudflare/moq-rs**: No new commits since Apr 13.
  - **video-dev/moq-js**: Quiet since Apr 21.
  - **google/quiche** (`quiche/quic/moqt`): No new commits since Apr 22.
  - **birneee/quiche_moq**: No new commits since Mar 13.
- Mailing list:
  - **Cullen Fluffy Jennings opens new thread "Request Synchronization Use Case"** May 1 16:10:06 -0600 (22:10:06 UTC) ([msg](https://mailarchive.ietf.org/arch/msg/moq/YIkbDmf8BZ0Dx41j8QJ7nj0BZMU/)). Three use cases: (1) swap tracks in video conference, (2) client-side ABR, (3) rapid pause/unpause. Key quotes: *"the chairs are going to treat this as we no longer have the consensus we had on drafts up to -17"*, *"reopening base issues about what the requirements are is not helpful"*, *"I would have objected to bidi if it did not have a way to synchronize"*, *"I'm fine with punting this to London."* No replies as of May 2 04:00 UTC.
  - **REWIND Consensus Call deadline (May 1, 2026)**: **No chair-summary message on the list as of May 2 04:00 UTC.** Magnus Westerlund / Suhas Nandakumar / Alan Frindell have not yet posted an interpretation of the split outcome. Cullen's "Request Synchronization Use Case" thread is his framing of the situation absent a chair message.
  - "Knowing the start of a Subgroup" thread: ~1 additional Cullen reply on May 1; PR #1608 formally closed same day.
- IETF Datatracker: No new draft versions. WG state: transport-17, msf-00, loc-02, secure-objects-00 (-01 imminent post-wave but not yet published), privacy-pass-02, cmsf-00. Notable individual: lite-04 (Apr 9), nmsf-01 (Apr 7).
- Interop runner: **25 pass / 66 fail / 14 skip** (105 tests, 2026-05-02 00:37 UTC report). +1 pass / -1 fail vs May 1's 24/67/14. Recovery now +1/day for **4 consecutive days** from the Apr 17 floor.
- **MoQ Monthly #1 PUBLISHED May 1, 2026** by Mike English — first issue since #0 (Mar 4 2026). ~3,500 words. Title: *"NAB, interoperability, and a whole lot of catching up"*. Covers NAB 2026 (Qualabs/Ateme/EZDRM C2PA+DRM+MoQ on Cloudflare; Oracle Video@Edge multi-vendor with Ateme/Broadpeak/Cloudflare/Bitmovin; Wowza OBS→Shaka via CMSF; Norsk native MoQ), names **draft-18 as next interop target**, Safari 26.4 → WebTransport Baseline, OpenMOQ/aiomoqt/Vindral activity, Streaming Tech Sweden May 21 Stockholm, **IETF MoQ Interim June 9–12 London (Cloudflare hosting)**. **Explicitly cites this wiki** at `tobbee.github.io/moq-llm-wiki/`: *"Torbjörn is also running an experiment using Andrej Karpathy's LLM Wiki concept to build a living MoQ ecosystem reference"*; spec-section reference: *"For a current summary of all active drafts and their status, the MoQ LLM Wiki has a useful table."* Tobbe's moqlivemock update also called out by name.
- tobbee/moq-llm-wiki: No new open issues.

**Pages updated**: discussions-2026-05.md (top-level "May 1 → May 2" section added), moq-transport.md (PR #1542 to Recently Merged, new Issue #1626, PR #1608 formally closed), moq-secure-objects.md (PRs #82/#77/#86 wave wraps, Issues #49 + #54 closed), moq-dev.md (May 1–2 doc fix + new contributor PRs), interop-status.md (25/66/14), interop-runner.md (history table extended), mike-english.md (MoQ Monthly #1 callout), index.md (last_updated bump), log.md.

**Key findings**:
- moq-transport: PR #1542 lands the SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split, the most structural merge of the post-interim wave. Closes Issue #1458 (~1.5 month old). moqtail PR #180 already prepares for this on the impl side.
- secure-objects: 30-hour editorial wave wraps. 8 PRs merged across Apr 29 → May 1 (#75, #76, #79, #80, #82, #77, #86 + commit 87a95f77 AAD simplification); 7 issues closed (#49, #54, #58, #61, #70, #71, #74). Open work is all polish. -01 not yet on Datatracker but substantively ready.
- QMUX version negotiation surface (Issue #1626) opens — afrind's *"TLS ALPN moqt-18 implies qmux-01"* note is the first concrete framing for draft-18.
- REWIND consensus deadline reached without a chair conclusion. Cullen's "Request Synchronization Use Case" reframes the post-call situation as a regression of pre-interim consensus, willing to punt to London.
- moq-dev contributor base widening: skirsten's 4th PR + sidsethupathi's 2nd; both external. Luke quiet on his own PRs (only flake bump + 1-line doc fix on May 1).
- MoQ Monthly #1 cites this wiki by URL — first external publication acknowledgement of the wiki experiment. Names draft-18 as next interop target (matching the moq-transport editorial wave's trajectory).

---

# 2026-05-01 — Editorial wave culminates; secure-objects 30-hour cleanup wave

**TL;DR**:
- **PR #1534 (REDIRECT) MERGED** by afrind, closes Issue #1481. PR #1624 (LOC properties registry) MERGED, closes Issue #1550 (cross-draft 0x02/0x04 collision saga). afrind contests ianswett's Issue #1622 walk-back of PR #1559 (Request ID in GOAWAY). Mailing list "Knowing the start of a Subgroup" expands 3→10 messages — Mo Zanaty calls PR #1608 a *"footgun for devs"* with concrete AV1 example; Luke proposes 0-indexed per-subgroup counter as a third design.
- **secure-objects MASSIVE editorial wave** — 4 PRs MERGED (#79 fixed-width int AAD, #80 Publisher Priority in E2E, #75 track-extension guidance, #76 32-bit Object ID nonce), 5 issues CLOSED (#74 Track Properties → option #1 = no E2E, #58, #61, #70, #71), 6 PRs OPENED (#77/#78/#82-#85), direct commit removes Track Namespace + Track Name from AAD. -01 substantively ready, not yet on Datatracker.
- **Implementations**: moqtail PR #178 (relay scheduling algorithm, +455/−62) MERGED — **first draft-17-specific feature merged**; PR #180 OPENED (+1150/−488, separate stream for SUBSCRIBE_NAMESPACE) — first impl adopting post-Apr-29 split. moq-dev/moq PR #1365 (skirsten AudioContext) MERGED; ksletmoe-aws PR #1359 self-summary + apology; new Issue #1364 (danrossi Cloudflare relay bug). cloudflare/moq-rs, video-dev/moq-js, google/quiche, birneee/quiche_moq quiet.
- **Interop**: 24/67/14 (+1 vs Apr 30); draft-cenzano-moq-media-interop-03 EXPIRED Apr 23 with no -04 published.

**Operation**: Update
**Sources**:
- Slack: `#moq` — no new posts since Apr 27 18:50 CEST. `#moq-rs` / `#moq-js` / `#libquicr` quiet.
- GitHub moq-wg repos:
  - **moq-transport**:
    - **PR #1534 MERGED** May 1 01:11:59 UTC by afrind (+50/−1, *Add REDIRECT for request errors and established subscriptions*). Lands both: REDIRECT error code on REQUEST_ERROR + standalone REDIRECT message for established subscriptions. **Closes Issue #1481** (per-track move).
    - **PR #1624 MERGED** Apr 30 18:10:18 UTC by afrind (+11/0, *Add provisional registry for LOC properties*, suhasHere). Closes Issue #1550 (cross-draft 0x02/0x04 collision saga). Provisional IANA registry coordinates LOC + MOQT codepoints.
    - **Issue #1622** *"Request ID in GOAWAY isn't useful"* (ianswett) — afrind counter Apr 30 18:31:57 UTC: *"trivial to put the request ID in goaway, and might be useful. If nothing else it can speed up retry when a new request is racing a GOAWAY."* PR #1623 (revert) now contested. First explicit pushback against the walk-back.
    - **PR #1607** (Largest Available Group filter, vasilvv) — suhasHere counter Apr 30 03:57 UTC on Luke's Apr 24 catalog use-case: *"NGR is not used for catalog typically. Also if new group generates the same catalog, it is application problem."* Stays in CHANGES_REQUESTED.
    - **PR #1544** (0-RTT, ianswett) — 6 inline reply/suggestion comments Apr 30 02:12-02:29 UTC working through Thomson's rewrite (already captured in Apr 30 entry).
  - **moq-wg/secure-objects** — **MASSIVE editorial wave Apr 29 → May 1**:
    - **PR #79** MERGED May 1 03:02:45 UTC (suhasHere, *Use fixed-width integers for AAD and nonce formation to avoid varint ambiguity*). Closes Issue #58.
    - **PR #80** MERGED May 1 03:04:41 UTC (suhasHere, *Add Publisher Priority to E2E authenticated data*). Closes Issue #71.
    - **PR #75** MERGED May 1 03:24:17 UTC (fluffy, *guidance on track extentions*).
    - **PR #76** MERGED May 1 03:24:52 UTC (fluffy, *Explain 32-bit object ID nonce limitation*). Closes Issue #70.
    - Commit `87a95f77` (suhasHere May 1 03:17:34 UTC): *"Remove Track Namespace and Track Name from AAD structure"* — landed via direct commit after PR #81 was closed unmerged. **Most consequential wire-format change of the wave.**
    - Commit `56248619` (suhasHere May 1 03:01:33 UTC): *"make object id 32 bits"*.
    - **Issue #74** *"Authentication of Track Properties"* CLOSED May 1 03:24:18 UTC by suhasHere/fluffy with consensus: option #1 — *"Don't provide end to end security for track properties. Applications will just add properties that need end to end security as object properties to first object of the group."*
    - 6 new open PRs: #77 (threat model, fluffy, fixes #49), #78 (fan-out attack DO-NOT-MERGE, fluffy), #82 (padding for byte boundary, suhasHere, fixes #54), #83 (SFRAME RFC ref, fluffy), #84 (test vectors, fluffy), #85 (dash fix, fluffy).
    - PR #81 (Simplify SECURE_OBJECT_AAD) CLOSED unmerged May 1 03:19:20 UTC, but the change landed via commit 87a95f77.
  - **moq-wg/msf, loc, cmsf, catalog-format**: No new activity since Apr 29 wave.
- GitHub implementations:
  - **moq-dev/moq**:
    - **PR #1365 MERGED** May 1 01:38:38 UTC (skirsten, *@moq/watch: expose AudioContext on the audio backend*, +11/0). Completes the Hang/moq-watch audio-handling polish (after PRs #1349 + #1355) for browser autoplay constraints.
    - **PR #1359** (ksletmoe-aws OrderedConsumer refactor) — author self-summary Apr 30 21:16:33 UTC + apology Apr 30 22:10:45 UTC for messy commit history; Luke Apr 30 22:29:47 UTC: *"No worries, I'll take a look at it soon."* PR remains open.
    - **Issue #1364** *"Cloudflare Relay"* opened Apr 30 14:20:51 UTC by danrossi — moq-js can't connect to Cloudflare draft-14/draft-07 relays. CodeRabbit auto-flagged as possible duplicate of #586. Same class of friction as Issue #1346 (kubo6472).
  - **moqtail/moqtail**:
    - **PR #178 MERGED** Apr 30 12:23:13 UTC by zafergurel (+455/−62, *feat: implementation of the scheduling algorithm in the relay*). **First draft-17-specific feature merged.** Closes Issue #176.
    - **PR #180 OPENED** Apr 30 18:51:59 UTC by zafergurel (+1150/−488, *feat: separate stream for subscribe_namespace*) against `draft-16` branch. Major refactor anticipating moq-transport PR #1542 split. **First moqtail PR adopting the post-Apr-29 SUBSCRIBE_NAMESPACE split design.**
  - **cloudflare/moq-rs**: No new commits since Apr 13.
  - **video-dev/moq-js**: Quiet since mid-March.
  - **google/quiche** (`quiche/quic/moqt` dir): No new commits since Apr 22.
- Mailing list:
  - **"Knowing the start of a Subgroup"** thread (Apr 29 → Apr 30): expanded from 3 messages to 10 with 7 Apr 30 additions. Magnus Westerlund, Ian Swett follow-up, Luke Curley (proposes 0-indexed per-subgroup counter as third design alternative — *"only helps REWIND for the first object… you still need a plan to handle the rest of the gaps"*), Alan Frindell, Suhas Nandakumar, Luke follow-up, **Mo Zanaty Apr 30 22:06 UTC** (endorses #1618 over #1608 with concrete AV1 temporal-layering example showing frame numbers ≠ layer numbers; calls #1608 *"a footgun for devs to screw up"*; *"even the working group fell into this trap"*; on subgroup-vs-datagram tie-breaking: *"subgroup wins"*).
  - **REWIND Consensus Call**: deadline reached today (May 1, 2026). Chair Magnus Westerlund will need to interpret a split outcome (Cullen explicit option-#1, Luke + Ian-individually for option-3 with CurrentGroupFill, Martin Duke compromise-floor, Gwendal Simon live-streaming pushback). No new messages on this thread Apr 30 – May 1.
- IETF Datatracker: No new draft versions. WG state: transport-17, msf-00, loc-02, secure-objects-00 (wave indicates -01 imminent), privacy-pass-02, cmsf-00. Notable individual: lite-04 (Apr 9), nmsf-01 (Apr 7).
- Interop runner: **24 pass / 67 fail / 14 skip** (105 tests, 2026-05-01 00:40 UTC report). +1 pass / -1 fail vs Apr 30's 23/68/14. Gradual recovery from Apr 17 regression continues.
- MoQ Monthly: Still only #0 (March 4 2026); no #1 yet.
- tobbee/moq-llm-wiki: No new open issues.

**Pages updated**: discussions-2026-05.md (created), discussions-2026-04.md, moq-transport.md, moq-secure-objects.md, moq-dev.md, moqtail.md, interop-status.md, moq-media-interop.md (marked EXPIRED), index.md, log.md.

**Key findings**:
- moq-transport: REDIRECT lands (PR #1534) — completes the Feb-9-Issue-#1481 → May-1-merge editorial cycle. LOC properties registry lands (PR #1624) — closes the cross-draft #1550 collision saga.
- secure-objects: First substantive activity since draft-00 (Mar 2). Wave decided track-property authentication scope (Issue #74 option #1: not in scope), simplified AAD structure (Track Namespace + Track Name removed), nailed down 32-bit Object-ID nonce, brought publisher priority under AEAD. -01 release imminent.
- "Knowing the start of a Subgroup" debate is now 3-way: PR #1608 (closed but ianswett still backs), PR #1618 (FIRST_OBJECT bit, APPROVED, Cullen + Mo Zanaty support), Luke's per-subgroup counter (newly proposed Apr 30).
- Request ID in GOAWAY contested: afrind pushes back on ianswett's walk-back. PR #1623 needs WG resolution.
- moqtail jumps to draft-17 features: PR #178 merged with §7.2 prioritization scheduling. PR #180 already prepares for SUBSCRIBE_NAMESPACE split.
- moq-dev Hang audio polish complete: skirsten's PR #1365 (AudioContext exposure) closes the autoplay-policy gap left by PRs #1349 and #1355.
- media-interop draft EXPIRED Apr 23 with no -04. LOC media-interop testing relies on what's already implemented; document marked outdated.

---

# 2026-04-30 — Editorial wave continues; ianswett walks back PR #1559

**TL;DR**:
- **PR #1619 (NAMESPACE response name fix) MERGED**; PR #1593 CLOSED unmerged (OBE'd by #1618); Issue #1365 ABR-grouping CLOSED as NotTransport. ianswett walks back his own PR #1559 — opens Issue #1622 + PR #1623 (Remove Request ID from GOAWAY). suhasHere opens PR #1624 (LOC properties registry) + PR #1625 (rebased Magnus security considerations). PR #1542 / #1534 / #1620 / #1618 all reach APPROVED.
- **Mailing list**: new thread "Knowing the start of a Subgroup" (Ian/Alan/Cullen) splits WG between #1608 and #1618 designs; Cullen casts first explicit option-#1 REWIND ballot vote.
- **Implementations**: moq-dev/moq Luke MERGES four PRs — #1357 (fetch_group + TrackDynamic — *first track-level FETCH path API*), #1350 (mTLS HTTPS), #1349 (skirsten static catalog), #1360 (jemalloc into moq-native). Qizot replaces #1354 with #1362 (audio encoder reconfiguration); ksletmoe-aws expands #1359 from CMAF-specific fix to generic OrderedConsumer refactor (+971/−...) per Luke's suggestion; metapox opens Issue #1363 (JS Subscriber lacks SUBSCRIBE_UPDATE). moqtail opens PR #178 (relay scheduling, +455/−62) + PR #179 (Firefox private-CA docs, new contributor davemevans). cloudflare/moq-rs, video-dev/moq-js, google/quiche, birneee/quiche_moq quiet.
- **Interop**: 23/68/14 — unchanged from Apr 29; the four moq-dev/moq merges all landed after the Apr 30 00:38 UTC run.

**Operation**: Update
**Sources**:
- Slack: MCP working. `#moq` — no new posts since Apr 27 18:50 CEST. `#moq-rs` / `#moq-js` / `#libquicr` quiet.
- GitHub moq-wg repos:
  - **moq-transport** — **PR-merge + new-PR + new-issue activity continuing the post-interim editorial wave** (Apr 29 17:29 → Apr 30 06:00 UTC):
    - **PR #1619 MERGED** Apr 29 20:44:21 UTC by [[ian-swett]] (+1/−1, *Fix SUBSCRIBE_NAMESPACE response message name*, fixes #1616, label: `Editorial`). Approved by ianswett at Apr 29 20:44:14 UTC. Closes Issue #1616 (mope-life's Apr 28 inconsistency report).
    - **PR #1593** (*RFC: Allow framing single Objects without Subgroup ID*, ianswett, opened Apr 2) **CLOSED unmerged** Apr 29 17:29:35 UTC by [[ian-swett]]. The PR proposed a fundamentally different approach (OBJECT_STREAM type that omits Subgroup ID + Object Length, FETCH_HEADER moved 0x05→0x50). afrind's Apr 3 review pushback (*"This doesn't make any sense. Datagrams and FETCH_HEADER never appear in the same context. … there's already a way to omit the subgroup id in single-object subgroups -- set the mode bits to '01' and the sg-id == object id."*) plus the WG's Apr 27 interim disposition on PR #1608 made #1593 OBE. The "knowing the start of a Subgroup" problem is now being addressed by **PR #1618** (FIRST_OBJECT bit) instead.
    - **Issue #1365 CLOSED** Apr 30 01:46:16 UTC by [[ian-swett]] (*"If you can't deliver an entire Group, should you send any Objects for a Track?"*, ianswett, Nov 6 2025). ianswett's Apr 23 17:00 UTC closing comment: *"I'm inclined to close this with no action right now or declare it as NotTransport since it's something Sender side ABR would need to do."* Final closure delayed until Apr 30, but ultimately the existing DELIVERY_TIMEOUT and Data-Forwarding-prioritization text were judged sufficient. **ABR-grouping decision deferred to "sender-side ABR" extension territory** rather than a transport feature.
    - **Issue #1622 OPENED** Apr 30 00:52:40 UTC by [[ian-swett]] (label `Handshake and Session`): *"Request ID in GOAWAY isn't useful"*. Body: *"After more thought (yes I approved #1559), I don't think the Request ID in GOAWAY is actionable in MoQ. My intuition was 'We have a Stream ID in HTTP/3, so we should have one in MoQ'. But MoQ is not HTTP, and that's intentional. … Now that we're removing Required Request ID (#1615) and we've already removed Request ID flow control, GOAWAY is one of the two remaining uses of Request ID (the other is Joining Fetch). Filing this now because #1559 landed relatively recently (hasn't even been published in a draft) to address #1549. … @vasilvv noted reluctance to relying on Request ID on the PR as well, but I think we all thought this would be useful at the time."* **Walks back PR #1559 (which ianswett himself approved).** Triggered by ianswett's Apr 29 18:10 UTC comment on PR #1617: *"I think we should remove Request ID from GOAWAY entirely, since I don't think it has much practical value."*
    - **PR #1623 OPENED** Apr 30 01:38:30 UTC by [[ian-swett]] (+0/−10, *Remove Request ID from GOAWAY*, label `Handshake and Session`). Body: *"Reverts #1559. Fixes #1622. Related to #1617 which adds GOAWAY for individual Requests."* Pure-removal patch (no additions). Pairs with PR #1615 (RRID removal) and the Apr 27 interim direction toward removing per-request Request ID semantics.
    - **PR #1624 OPENED** Apr 30 05:17:57 UTC by [[suhas-nandakumar]] (+11/0, *Add provisional registry for LOC properties*, fixes #1550). Tiny fix that addresses the LOC property-type collision (#1550 — Properties Type collision between moq-16 and loc-01) by adding a provisional IANA registry.
    - **PR #1625 OPENED** Apr 30 05:59:02 UTC by [[suhas-nandakumar]] (+132/−1, *Rebased and Update Security Considerations PR from Magnus Westerlund*). Body: *"This PR adds a few fixes and addition to @gloinul PR #1455"*. Rebases and extends Magnus Westerlund's long-parked Security Considerations PR. Self-comment Apr 30 06:00:12 UTC: *"@gloinul please give it a read and let me know if this is heading in the right direction"*.
    - **PR #1542** (Split SUBSCRIBE_NAMESPACE) — [[suhas-nandakumar]] **APPROVED** Apr 29 17:52:16 UTC after a brief comment thread (17:51-17:52 UTC). This is a second approval after Vasilvv's pre-interim approval. PR is now ready to merge.
    - **PR #1534** (REDIRECT) — [[suhas-nandakumar]] **APPROVED** Apr 29 17:56:52 UTC with one suggestion-text patch (`Track Namespace`/`Track Name Length`/`Track Name` formatting). Now has Vasilvv (Apr 27 23:01 UTC) + suhasHere approvals.
    - **PR #1620** (Clarify Joining FETCH unaffected by fwd→0) — [[ian-swett]] **APPROVED** Apr 29 20:40:08 UTC. Two approvals → ready to merge.
    - **PR #1618** (FIRST_OBJECT bit) — [[ian-swett]] inline comment Apr 29 20:48:19 UTC: *"Ideally, I'd like this to be required, which was a perk of my other proposal to force the Subgroup ID==First Object ID"*. Then a long Apr 29 20:54-22:04 UTC issue-level comment quoting yuyou, explaining why ianswett still prefers his closed PR #1608: *"I looked at #1618 and I think this approach has some benefits: 1) It's required that one use it. 2) You can tell when you Don't have the first Object of a Subgroup."* afrind reply Apr 29 22:25 UTC: *"An original publisher really ought to know if it's the beginning or not. A relay should know then either because it just received this information or by caching it. … its primary value is to know when it's safe to serve the beginning of a subgroup from cache vs going upstream."* [[suhas-nandakumar]] **APPROVED** Apr 29 23:45:55 UTC: *"Looks fine to me"* with one inline note (*"if the subscriber/relay uses object status to make decision, this is at the same level. Whatever, we say there should be said here too or atleast they both should match"*). PR ready to merge.
    - **PR #1608** (Subgroup ID = first Object Id, CLOSED Apr 28) — saw two new ianswett summary comments Apr 29 20:54 + 22:04 UTC re-litigating the closure on the issue track, posting the full text of yuyou's earlier objection as context. afrind's Apr 28 closure stands.
    - **PR #1607** (Largest Available Group filter) — saw a new [[suhas-nandakumar]] reply Apr 30 03:57:02 UTC pushing back on Luke's catalog-track use case from Apr 24 23:10 UTC: *"NGR is not used for catalog typically. Also if new group generates the same catalog, it is application problem. Regardless, fetching existing catalog seems a fine solution."* — keeps PR #1607 in CHANGES_REQUESTED state.
    - **PR #1544** (0-RTT) — significant editorial activity Apr 28 → Apr 30. After [[martin-thomson]]'s Apr 28 01:30 UTC substantive rewrite of the introductory sentences, [[ian-swett]] posted **6 inline reply/suggestion comments** Apr 30 02:12-02:29 UTC working through Thomson's rewrite: defending the gRPC-style "client declares request as safe" 0-RTT-WT path (*"Technically I could 0-RTT a WebTransport session if I declare my request as safe in the client library."*); two suggested-text patches around cache-expiry semantics for replayed objects; and a rewrite for the resource-exhaustion mitigation (*"Relays MAY defer initiating upstream subscriptions until the handshake is complete or reject 0-RTT entirely to mitigate resource exhaustion from replayed packets."*). [[martin-thomson]] replied Apr 30 03:25:32 UTC: *"Do you have a specific response code that a relay could use so that the client can know that this was something that can be retried? Or is it always possible to retry a subscription? Surely there are classes of rejection that are permanent and others that are temporary."* Plus a follow-up review Apr 30 03:27:15 UTC. The 0-RTT review is now in serious dialogue.
    - **PR #1617** (per-request GOAWAY) — ianswett comment Apr 29 18:10 UTC: *"I think we should remove Request ID from GOAWAY entirely, since I don't think it has much practical value."* — directly motivated PR #1623.
    - **Issue #1453** (Send Rate parameter, wilaw) — labeled `Parked` by [[ian-swett]] Apr 30 01:52:15 UTC. ianswett's Mar 30 closing comment: *"I'm increasingly unsure if we want to add this as a client controlled feature, at least now. … we might want to park this until someone implements and deploys Netflix style pacing that uses MoQ."*
  - **msf, loc, secure-objects, cmsf, catalog-format, privacy-pass**: no activity.
- Implementation repos:
  - **moq-dev/moq** — **four merges + Qizot replaces #1354 with #1362 + ksletmoe-aws pivots #1359 to a generic refactor + new external bug**:
    - **[PR #1357](https://github.com/moq-dev/moq/pull/1357) MERGED** Apr 30 00:01:46 UTC by [[luke-curley]] (final +427/−133, *moq-lite: add fetch_group API + TrackDynamic*). **First FETCH path API at the track level lands.** New `TrackConsumer::fetch_group(seq) -> Result<GroupConsumer>` with cache-hit / cache-miss-no-handler / cache-miss-with-handler branches. Concurrent fetches for the same sequence share the in-flight group. New `TrackProducer::dynamic() -> TrackDynamic` mirrors `BroadcastProducer::dynamic()`. New `TrackDynamic::poll_requested_group` / `requested_group` yields `GroupProducer` for the publisher to fill. 8 new unit tests in `rs/moq-lite/src/model/track.rs`. `cargo test --workspace` = 290 moq-lite tests pass (up from 282). **Wire-side FETCH hookup (`lite::ControlType::Fetch`, `ietf::run_fetch_stream`) intentionally still returns errors — captured here as a clean follow-up.**
    - **[PR #1350](https://github.com/moq-dev/moq/pull/1350) MERGED** Apr 29 16:46:18 UTC by [[luke-curley]] — *moq-relay: authenticate HTTPS callers via the cluster mTLS CA*. The CodeRabbit-flagged 🟠 Major (CORS+browser-readable-GET) noted in the Apr 28 log was apparently resolved offline (no follow-up review thread visible) and the PR merged. **mTLS HTTPS auth lands.**
    - **[PR #1349](https://github.com/moq-dev/moq/pull/1349) MERGED** Apr 29 16:08:52 UTC by [[luke-curley]] (skirsten's *@moq/watch: add static catalog format*). Third catalog mode lands — `<moq-watch catalog-format="static">` plus writable `Signal<Catalog.Root | undefined>` for `Broadcast.catalog`.
    - **[PR #1360](https://github.com/moq-dev/moq/pull/1360) MERGED** Apr 29 16:29:05 UTC by [[luke-curley]] (+29/−10, *moq-native: relocate jemalloc helper; wire it into moq-boy*). **moq-boy now production-instrumented for jemalloc heap profiling at 6+ instances.**
    - **PR #1361 OPENED+CLOSED** Apr 29 16:17 UTC → 16:29 UTC by [[luke-curley]] — *moq-native: move jemalloc profiling helper from moq-relay*. Replaced by PR #1360 (broader scope including HTTPS mTLS) — closed superseded.
    - **[PR #1354](https://github.com/moq-dev/moq/pull/1354) CLOSED unmerged** Apr 29 16:54:30 UTC by Qizot. Qizot's closing comment: *"This was wrong approach, we should have reconfigured the encoder instead."* Replaced by **PR #1362 OPENED** Apr 29 17:04:41 UTC by Qizot (+40/−17, *Add audio encoder reconfiguration*). New approach: when iOS Safari mismatch is detected (worklet's `channelCount` resolves to 2 but `onmessage` receives mono), the encoder is **reconfigured** rather than padding the AudioData. Cleaner solution. Open and under CodeRabbit review.
    - **[PR #1359](https://github.com/moq-dev/moq/pull/1359) — TITLE CHANGED** from *"fix(watch): process CMAF groups sequentially in WebCodecs decoder"* to *"feat(hang): unify OrderedConsumer across container formats"*. Now **+971/−...** (was +64/−67). After Luke's Apr 28 23:00 UTC review comment: *"I think we need a generic `OrderedConsumer`. The problem is that `recvGroup` (and MoQ in general) returns groups out-of-order. The idea behind `OrderedConsumer` is that we skip groups based on the target latency, which requires timestamp information unfortunately."* and Apr 29 00:29 UTC: *"On the Rust side, I made an interface to parse the timestamp out of each frame. Then OrderedConsumer can be reusable."* — ksletmoe-aws (Karl Sletmoe, AWS) **rewrote the PR as a generic `OrderedConsumer<F: Container>` refactor** that unifies Legacy + CMAF containers behind a `ContainerFormat` strategy interface. Mirrors the Rust `moq-mux` `Consumer<F: Container>` pattern. New files: `container/format.ts`, `container/consumer.ts`, `container/cmaf/format.ts`, `container/consumer.test.ts` (25 tests). 4 watch decoders migrated. Apr 30 01:43 UTC ksletmoe-aws addressed CodeRabbit nitpicks.
    - **Issue #1363 OPENED** Apr 30 00:43:26 UTC by **metapox** (taku): *"feat(lite): JS Subscriber lacks SUBSCRIBE_UPDATE support for dynamic priority changes"*. Concrete use case: multi-camera streaming where the viewer switches focus between cameras; each camera has a subscription, and the focused one should get higher priority — but the close→re-subscribe path causes a 1s keyframe-wait gap on every switch, while SUBSCRIBE_UPDATE would be seamless. **Rust subscriber already handles this** via `TrackSubscriber::update()`. JS subscriber is missing the equivalent. Issue includes a proposed implementation in three files (track.ts adds priority Signal + updatePriority; lite/subscriber.ts watches for priority changes and sends SubscribeUpdate; lite/publisher.ts applies received priority). Tested in metapox's [moq-multicam](https://github.com/metapox/moq-multicam) app. Fork: https://github.com/metapox/moq/tree/feat/subscribe-update-api. Total diff: 30 inserts/4 deletes across 3 files. Second time metapox surfaces a moq-lite/JS issue (after Apr 27 #1351 false-alarm).
    - **PR #1356 / #1358 / #1341**: still OPEN, no new substantive activity.
  - **moqtail/moqtail** — **two new PRs Apr 29 morning**:
    - **[PR #178](https://github.com/moqtail/moqtail/pull/178) OPENED** Apr 29 08:54:49 UTC by **zafergurel** (+455/−62, *feat: implementation of the scheduling algorithm in the relay*). Body: *"This PR implements the scheduling algorithm in the relay defined in the draft. Look at the comments for a detailed explanation of how priorities are computed based on the subscriber and publisher priorities."* Implements draft-17's prioritization scheduling at the relay layer.
    - **[PR #179](https://github.com/moqtail/moqtail/pull/179) OPENED** Apr 29 09:44:42 UTC by **davemevans** (David Evans, +11/−2, *docs: add instructions for Firefox testing using private CA*). Firefox-specific HTTP/3 trust-quirk workaround (`network.http.http3.disable_when_third_party_roots_found`). **First moqtail PR from David Evans** (new external contributor). Notably moqtail's umbrella PR #145 (zafergurel) for draft-16 onto `main` remains open.
  - **cloudflare/moq-rs**, **video-dev/moq-js**, **google/quiche (moqt)**, **birneee/quiche_moq**: No new activity. (google/quiche has many non-moqt commits Apr 27-30 in adjacent QUIC/MASQUE areas; nothing under `quiche/quic/moqt/`.)
- Mailing list — **two new threads / six new messages Apr 28–30**:
  - **[[ian-swett]] Apr 29** ([msg](https://mailarchive.ietf.org/arch/msg/moq/S4SA8G1Brd807AaMfD_H-WSsvcI/)): *"[Moq] Knowing the start of a Subgroup"* — **NEW THREAD**. Re-litigates the closed PR #1608 vs. open PR #1618 design choice on the list. ianswett still prefers his closed-PR-#1608 approach (Subgroup ID == first Object ID): mandatory, plus enables receivers to detect when they don't have the first Object. Notes #1618 (FIRST_OBJECT bit) is *"less effective"*. Maintains compatibility with Subgroups arriving on separate streams as a core requirement. **Asks for community feedback, particularly from those with concerns about #1608.**
  - **[[alan-frindell]] Apr 29** ([msg](https://mailarchive.ietf.org/arch/msg/moq/znrcAgMSZf1dbppkvGD1KiXY7J8/)): *"Re: Knowing the start of a Subgroup"* — supports #1608 over #1618. *"It's not clear to me why that's a problem"* (re removing application surface). Notes that *Mo, Cullen, Magnus, and Suhas objected during the Monday interim meeting*, and **explicitly asks them to provide examples of what would be broken by #1608**.
  - **Cullen Fluffy Jennings Apr 30 ~14:00 MDT** ([msg](https://mailarchive.ietf.org/arch/msg/moq/W6043G0SUOKJSXR7MXcwBajURMM/)): *"RE: Knowing the start of a Subgroup"* — three critiques of #1608: (1) *"mirror existing end-marker logic — publishers should explicitly signal the start of tracks, groups, and subgroups when known"*; (2) implementation feasibility — *"I'm just not seeing how it works in this case"* re. catalogs needing stable Subgroup IDs while incrementing object IDs within groups; (3) opposes the conflation of Subgroup ID with first Object ID — prefers explicit signaling rather than *"pinning to very weird implicit signaling"*. Clearly favors the **#1618 FIRST_OBJECT-bit approach** over #1608.
  - **[[ian-swett]] Apr 29 17:27 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/CpykRsXJqj0R8AtaH4qE_t9echw/)): *"Re: Consensus call on way forward on REWIND"* — clarifies his Apr 28 02:03 UTC CurrentGroupFill endorsement was *"his individual position"* as an editor, not an editorial mandate. Endorses *"some variant of option 3"* (use REWIND as basis for a PR), specifically afrind's CurrentGroupFill proposal as *"a strict improvement on the current draft"*. Reiterates: *"I'm open to some variant of REWIND, but not very optimistic that we'll get consensus on anything more complex than CurrentGroupFill."* Direct response to chair Magnus's Apr 28 10:49 UTC "please state explicit positions" intervention.
  - **Cullen Fluffy Jennings Apr 29 ~14:54 MDT** ([msg](https://mailarchive.ietf.org/arch/msg/moq/n_EDW8ZW62N-mtZlyXrth_nhepc/)): *"Re: Consensus call on way forward on REWIND"* — explicitly endorses **option #1**: *"I support option #1. I do not think we should not take on Rewind until we have MoQT wrapped up."* Adds: *"when the working group eventually addresses this topic, we need to start with the use case we are trying solve."* **First explicit option-#1 ballot vote on the list.**
  - **Magnus Westerlund (chair) Apr 29** ([msg](https://mailarchive.ietf.org/arch/msg/moq/RmNpJ7bcFGxCpGNYG3dBTrfj7HY/)): *"Re: Minutes from Interim meeting 27 of April 2026"* — notes Martin Duke submitted a correction to the AI-generated summary's representation of his technical argument. Magnus expresses **satisfaction with AI-assisted minutes** overall. Invites group feedback on whether participants' points were "fairly represented".
  - **Pre-interim list activity not previously logged** (Apr 27): **Mo Zanaty Apr 27 14:43 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/BSTWelz12xXk6wz6PCu96weVXHI/)): *"1608 is a major change to the core data model that makes subgroups semantically meaningless, as they would encode transport irregularities that destroy the app's semantic meaning."* Argues subgroup IDs are meaningful video-layer identifiers (LOC use case), and proposes alternative subgroup-header type values. **[[alan-frindell]] Apr 27 16:04 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/RXvgdx51hdu08F9xd4Lwuu_GRn0/)) reply: *"Do you have an application that uses subgroup IDs with specific semantic values that would break if this change were adopted? Can you explain how it works?"* — establishing the burden of proof shift that ultimately led to PR #1608's closure.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9). draft-ietf-moq-transport-17 still the latest WG transport draft.
- Interop runner: **Apr 30 00:38 UTC run = 23 / 68 / 14** — **unchanged from Apr 29**. Walking arc since draft-17 publication: 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23. The four moq-dev/moq merges (#1357, #1350, #1349, #1360) all merged after the Apr 30 00:38 UTC run, so they couldn't have shifted the matrix yet. The two interim spec PR merges (#1611, #1609) are spec-only.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: None open (3 closed).

**Pages updated**: discussions/discussions-2026-04.md, drafts/moq-transport.md, implementations/moq-dev.md, implementations/moqtail.md, interop/interop-runner.md, index.md

**Key findings**:

*Editorial wave continues at full pace; ianswett shifts attention from PR #1608/#1618 to GOAWAY Request ID removal.* The Apr 29-30 work pattern mirrors the Apr 28-29 wave but with new structural targets. ianswett's Apr 29 18:10 UTC review comment on PR #1617 (per-request GOAWAY) — *"I think we should remove Request ID from GOAWAY entirely"* — turned into Issue #1622 within hours, then PR #1623 (a pure-removal patch reverting his own #1559 from earlier in the cycle). With **PR #1615 removing Required Request ID** and **PR #1623 about to remove the GOAWAY use of Request ID**, the only remaining use of Request ID across the whole protocol becomes Joining FETCH. The cleanup arc that started at the interim is now drilling into specific control-message dependencies. ianswett walking back his own approval of #1559 — *"yes I approved #1559"* — is unusual editorial honesty and a useful signal that the WG's Apr 27 RRID-removal decision is reshaping how editors think about adjacent uses of Request ID.

*PR #1608 vs PR #1618 design dispute moves to the IETF list.* Both ianswett and afrind posted to the list Apr 29 defending the **closed PR #1608 approach** (Subgroup ID == first Object ID) over the open PR #1618 (FIRST_OBJECT bit). afrind asks the four objectors at the interim (Mo, Cullen, Magnus, Suhas) to *"provide examples of what would be broken by #1608"*. Mo's Apr 27 list message (now surfaced into the wiki record): *"1608 is a major change to the core data model that makes subgroups semantically meaningless, as they would encode transport irregularities"*. Cullen's Apr 30 list reply: prefers explicit signaling, *"pinning to very weird implicit signaling"* is the wrong direction. Net: the WG decided in the interim, but two of the four authors are publicly relitigating the decision on the list. Meanwhile **PR #1618 itself reached APPROVED state Apr 29 23:45 UTC from suhasHere** — so the implementation is moving forward in parallel. The list discussion's outcome may amount to "let #1618 land, but document the FIRST_OBJECT semantics carefully so it constrains future relay behavior."

*Cullen casts the first explicit "option #1" REWIND ballot.* After chair Magnus's Apr 28 10:49 UTC "please state explicit positions" intervention, Cullen Fluffy Jennings posts the most clear-cut response yet: *"I support option #1. I do not think we should not take on Rewind until we have MoQT wrapped up."* (Note the double-negative — Cullen means "we should not take on REWIND until MoQT wraps up"; option #1 = no action.) ianswett's Apr 29 reply clarifies his Apr 28 CurrentGroupFill endorsement was an "individual position" (option 3 with afrind's filter). **The May 1 deadline is in 1 day.** With at least one explicit option-#1 vote (Cullen) and several strong option-3-with-CurrentGroupFill positions (Luke, Ian Swett), and Martin Duke's compromise-floor framing, the chair will need to interpret a split outcome. Gwendal's Apr 28 push-back on Joining FETCH removal isn't yet on the ballot.

*Luke's FETCH-readiness API lands; the moq-lite-fetch branch is fully scaffolded.* PR #1357 merging at Apr 30 00:01 UTC is the **first FETCH-path API merge** at the moq-lite track-consumer level. Combined with the still-open #1356 (TrackConsumer-by-value insert_track), #1358 (Origin rewrite), and PR #1348 (Subscription model API, also in flight), the model layer is now FETCH-aware. The wire-side hookup is still TODO (`lite::ControlType::Fetch` returns errors, `ietf::run_fetch_stream` Standalone returns "not supported"), but Luke's stated approach is to land each subsystem independently. Pairs with his Apr 27 issue #1614 (JOINING FETCH prioritization) — Luke wants the API design fully settled before wire-format work begins. **moq-relay also gets mTLS HTTPS auth** (PR #1350 merged) and **moq-boy gets jemalloc heap profiling** (PR #1360 merged) — the operational instrumentation continues alongside the protocol work.

*Luke + ksletmoe-aws redesign PR #1359 from a fix into a generic OrderedConsumer refactor.* The original ksletmoe-aws fix (CMAF-specific decoder ordering) was rewritten — at Luke's suggestion — into a **generic `OrderedConsumer<F: Container>` pattern** mirroring Rust's `moq-mux::Consumer<F: Container>`. The PR went from +64/−67 (a one-file fix) to +971/−... (a 13-file refactor including 25 unit tests). This is **the first instance of a moq-dev/moq external contributor's PR being expanded in scope at the maintainer's request**, in this case to align JS-side architecture with the Rust side. AWS's Karl Sletmoe followed Luke's lead and redesigned the work — concrete sign of the AWS contribution becoming a genuine collaborative effort rather than a one-off bug fix.

*moqtail starts implementing draft-17 features (relay scheduling, +455 LOC).* Zafer Gurel's PR #178 (relay scheduling algorithm per the draft) is the **first moqtail PR implementing a draft-17-specific feature** rather than chasing draft-16 conformance. With draft-16 work still ongoing on the integration branch and umbrella PR #145 still open against `main`, the relay-side scheduling work appears to be running in parallel. David Evans's PR #179 (Firefox private-CA docs) is moqtail's first PR from a new external contributor since Feb. Both are live signals that moqtail is widening its contributor surface.

*Interop matrix unchanged at 23/68/14.* No movement Apr 29 → Apr 30. The four moq-dev/moq merges (PRs #1357, #1350, #1349, #1360) all landed after the Apr 30 00:38 UTC run, so the next run will be the first to reflect them. Expect a possible matrix shift in the Apr 30 → May 1 window from `moq-dev-rs` / `moq-dev-js` image rebuilds.

---

# 2026-04-29 — Post-interim editorial wave; afrind 9-PR burst in 8 hours

**TL;DR**:
- **afrind 9-PR wave in ~8 hours**: PR #1611 (PUBLISH_OK removal) + PR #1609 (Joining FETCH fwd race → request error) MERGED; PR #1608 (Subgroup ID = first Object ID) CLOSED unmerged, replaced by PR #1618 (FIRST_OBJECT bit per yuyou's review-comment template); five new afrind PRs opened (#1617 individual GOAWAY, #1618, #1619, #1620, #1621 forbid LARGEST_OBJECT lying). PR #1615 (RRID removal) now unblocked.
- Chair Magnus asks for **explicit ballot positions** with 3 days left; Gwendal Simon pushes back on Joining FETCH removal from a live-streaming-deployment perspective; Ian Swett endorses CurrentGroupFill (option-3 floor); minutes from interim-14 published.
- **Implementations**: moq-dev/moq merges #1352 (announcement-less relay handling, resolves #1346) + #1353 (per-frame buffer, +346/−146) + #1355; five new Luke PRs (#1356–#1360, including #1358 Origin rewrite +994/−1289); first AWS-affiliated PR (ksletmoe-aws #1359, CMAF passthrough); Qizot #1354 (audio encoder); moq-boy now in production at 6+ instances. cloudflare/moq-rs, video-dev/moq-js, moqtail, google/quiche, birneee/quiche_moq quiet.
- **Interop**: 23/68/14 (+1 vs Apr 28); back to Apr 24/27 reading.

**Operation**: Update
**Sources**:
- Slack: MCP working. `#moq` — no new posts since Apr 27 18:50 CEST (Giovanni Marzot's 😞). `#moq-rs` / `#moq-js` / `#libquicr` quiet.
- GitHub moq-wg repos:
  - **moq-transport** — **9-PR wave from afrind over ~8 hours** (5 new + 2 merges + 1 close + duplicate-closure):
    - **PR #1611 MERGED** Apr 29 00:04:05 UTC by [[alan-frindell]] (+11/−30, *Remove PUBLISH_OK message type, make it a REQUEST_OK alias*, fixes #1598). Wire-format change: removes the `PUBLISH_OK` code point. Approvals from [[ian-swett]] (Apr 27 19:39 UTC, post-interim greenlight), Suhas Sathyanarayana (`@sharmafb`, Apr 28 23:42 UTC), `@sandarsh` (Apr 28 23:55 UTC). Closes Issue #1598.
    - **PR #1609 MERGED** Apr 29 00:03:07 UTC by [[alan-frindell]] (+3/−2, *Joining Fetch forward state mismatch is a request error*, fixes #1601). Approvals from [[ian-swett]], `@sharmafb`, `@sandarsh`. **Unblocks PR #1615** per afrind's Apr 28 21:17 UTC comment: *"Removing RRID creates races between REQUEST_UPDATE FWD=1 and Joining FETCH (rejoining a paused subscription). At least #1609 is required, so it's a request rather than a session error."*
    - **PR #1608 CLOSED unmerged** Apr 28 21:19 UTC. afrind: *"Discussed 4/27: The working group didn't think this was the right approach, but agreed we need a way to know if a subgroup contains the beginning."* Issue #1405 stays open. yuyou's Apr 28 07:29 UTC review comment on #1608 anticipated the FIRST_OBJECT bit alternative: *"To solve the original problem of identifying the first Object ID, may it be an alternative approach to explicitly signal the starting Object ID in the Subgroup header instead of tying it to the Subgroup ID field. By keeping the Subgroup ID logically decoupled from the Object ID, publishers can maintain consistent data structures."*
    - **PR #1617 OPENED** Apr 28 16:21 UTC by [[alan-frindell]] (+85/−73): *Allow GOAWAY on request streams to migrate individual requests* (fixes #1481 — fluffy's Feb 9 issue). Per-request GOAWAY with zero-length URI for client; on receipt the endpoint re-issues that request on a session at the specified URI and closes the old stream.
    - **PR #1618 OPENED** Apr 28 21:33 UTC by [[alan-frindell]] (+20/−10): *Add FIRST_OBJECT bit to SUBGROUP_HEADER type*. *"Add bit 6 (0x40) to signal that the subgroup contains the first object published in the subgroup by the original publisher. The type format expands from 0b00X1XXXX to 0b0XX1XXXX. All valid type values still fit in a 1-byte varint."* **The replacement for PR #1608**, honoring yuyou's alternative-approach comment.
    - **PR #1619 OPENED** Apr 28 22:05 UTC by [[alan-frindell]] (+1/−1): *Fix SUBSCRIBE_NAMESPACE response message name* (fixes #1616). Implements afrind's Apr 28 03:43 UTC commitment to mope-life.
    - **PR #1620 OPENED** Apr 28 23:25 UTC by [[alan-frindell]] (+2/0): *Clarify Joining FETCH is unaffected by fwd changing to 0* (fixes #1612).
    - **PR #1621 OPENED** Apr 28 23:50 UTC by [[alan-frindell]] (+8/−1): *Forbid relays from lying about LARGEST_OBJECT* (fixes #1386 — ianswett's Dec 7 2025 issue). *"If we want to serve cached objects in response to SUBSCRIBE, lying is not the correct approach."*
    - **Issue #1602** (martinduke, Joining Fetch should be on the SUBSCRIBE/PUBLISH stream) **CLOSED** Apr 28 23:31 UTC by afrind as **duplicate of #1313** (ianswett's Joining-FETCH-as-separate-control-message issue from Oct 15).
    - **PR #1615** (Remove Required Request ID) — still OPEN. afrind's Apr 28 21:17 UTC comment confirms PR #1609 was the precondition; now unblocked.
  - **msf, loc, secure-objects, cmsf, catalog-format, privacy-pass**: no activity.
- Implementation repos:
  - **moq-dev/moq** — two interim PRs land plus a wide push from Luke and external contributors:
    - **PR #1352 MERGED** Apr 29 01:32:29 UTC (+10/−2, *Handle relays without announcement subscription support*) — final size grew by 4 lines vs the original +6/0 after the CodeRabbit suffix-match-false-positive fix. Issue #1346 (kubo6472's cross-impl Cloudflare-relay catalog-discovery friction) effectively resolved at the moq-lite layer.
    - **PR #1353 MERGED** Apr 29 01:49:24 UTC (+347/−147, *moq-lite: per-frame buffer + BufMut producer to cut relay memory*) — production-profiled memory optimization (~234 MB / ~254 MB / ~446 MB attribution) lands. **First memory-cost-per-connection optimization to land in moq-relay.**
    - **PR #1355 MERGED** Apr 28 20:04:23 UTC by [[luke-curley]] (author Qizot, +7/−2): *Add encoder's AudioContext sampleRate override*. Routine.
    - **PR #1356 OPENED** Apr 28 16:11 UTC (+27/−86): *moq-lite: switch insert_track to take TrackConsumer*. Removes `TrackConsumer::produce()` (added in #1300 as a workaround).
    - **PR #1357 OPENED** Apr 28 16:33 UTC (+319/−24): *moq-lite: add fetch_group API + TrackDynamic*. New `TrackConsumer::fetch_group(seq) -> Result<GroupConsumer>` first-class FETCH path. *"The breaking API change is captured here so the wire-side hookup (lite ControlType::Fetch, ietf::run_fetch_stream) can land as a clean follow-up."*
    - **PR #1358 OPENED** Apr 28 19:20 UTC (+994/−1289): *moq-lite: rewrite Origin as a poll-driven, conducer-based model*. Massive rewrite: replaces `OriginNode`/`NotifyNode` tree, per-publish `web_async::spawn` cleanup, and per-consumer `mpsc` fan-out with a flat `HashMap<PathOwned, Entry>` behind a `Mutex` + per-consumer queues + `conducer::Waiter`.
    - **PR #1360 OPENED** Apr 28 23:55 UTC (+29/−10): *moq-native: relocate jemalloc helper; wire it into moq-boy*. Wires `moq-boy` for jemalloc heap profiling — *"its 6 production instances..."* — **moq-boy is now in production at 6+ instances**.
    - **External — PR #1359 OPENED** Apr 28 21:22 UTC by **ksletmoe-aws** (Karl Sletmoe, AWS) (+64/−67): *fix(watch): process CMAF groups sequentially in WebCodecs decoder*. Concrete bug exposed by CMAF passthrough where each group is one moof+mdat blob — concurrent `effect.spawn()` per MoQ group caused issues. **First moq-dev/moq PR from an AWS contributor.**
    - **External — PR #1354 OPENED** Apr 28 07:23 UTC by **Qizot** (+21/−11): *Fix missing channel samples for audio encoder*. iOS Safari WebCodecs/getUserMedia mismatch — `channelCount` resolves to 2 but the encoder receives mono audio.
    - **PR #1350** (mTLS for HTTPS callers) — still OPEN, last activity Apr 27 23:33 UTC. The CodeRabbit-flagged 🟠 Major (CORS+browser-readable-GET) hasn't been addressed.
    - **Issues #1310/#1328** (beeequeue, JS tooling) — substantive Luke replies Apr 28→Apr 29 about Vite-specific URL resolution.
  - **cloudflare/moq-rs**, **video-dev/moq-js**, **moqtail/moqtail**, **google/quiche (moqt)**, **birneee/quiche_moq**: No activity in the window.
- Mailing list — **Four new messages Apr 28** continuing the REWIND thread plus interim minutes:
  - **[[luke-curley]] Apr 28 08:43 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/itiruoCeL0utBXju20PDtPVcAvs/)): Three paths for merging CurrentGroup proposals — (1) status quo with Joining FETCH, (2) replace Joining FETCH with REWIND or modified SUBSCRIBE with `Start_Group` parameter, (3) remove Joining FETCH entirely. Personal preference for option 2.
  - **Gwendal Simon (Synamedia) Apr 28 10:38 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/FQ1tdKIZTGeWxySc6qhF7YIbFu0/)): **Pushes back on Joining FETCH removal.** *"Joining FETCH was added via explicit WG consensus to address live streaming requirements"*. Argues CurrentGroupFill addresses the current group only while Joining FETCH enables fast buffer filling at join (multiple past groups). **Alternative**: proactive past-object inline delivery on SUBSCRIBE/PUBLISH; a parameter in SUBSCRIBE_OK communicates `[Start_Group, Live_Edge)`, eliminating subscriber round trip. First substantive defense of Joining FETCH from a live-streaming-deployment perspective.
  - **Magnus Westerlund (chair) Apr 28 10:49 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/NnfEdDCSLHCPweWJaW_Rw5_rJfA/)): **Chair note** — difficulty interpreting consensus because participants have discussed numerous related topics without clearly stating positions on the actual consensus question. Requests explicit ballot positions. With **3 days left until the May 1 ballot deadline**, the consensus call is at risk of producing no clear outcome.
  - **Magnus Westerlund Apr 28 12:34 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/s2UNChEeHEiuekdHBWE3KuxeS88/)): *"Minutes from Interim meeting 27 of April 2026"* — formally publishes the interim-14 minutes on the datatracker.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9). draft-ietf-moq-transport-17 still the latest WG transport draft.
- Interop runner: **Apr 29 00:38 UTC run = 23 / 68 / 14** — **+1 pass from Apr 28 (22/69/14)**, back to the Apr 24 / Apr 27 reading. Walking arc: 22 → 23 → 24 → 22 → 23 → 22 → 23. The two interim-PR merges (#1611, #1609) are spec-only; the moq-dev/moq merges (#1352, #1353, #1355) merged after the Apr 29 00:38 UTC run. Most likely a flaky test or an upstream image rebuild.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: None open (3 closed).

**Pages updated**: discussions/discussions-2026-04.md, drafts/moq-transport.md, implementations/moq-dev.md, interop/interop-runner.md, index.md

**Key findings**:

*Editorial-cleanup wave is the dominant story.* afrind opened **5 new PRs and merged 2 in ~8 hours** (Apr 28 16:21 UTC → Apr 29 00:04 UTC). The volume is unusually concentrated. Three of the new PRs implement specific interim-14 outcomes; two close longer-running 2025-era design issues (#1481 individual-track GOAWAY; #1386 LARGEST_OBJECT lying). The merge wave is conspicuously **all-afrind on the new-PR side** (5/5), with concurring approvals from `@sharmafb` (Suhas Sathyanarayana, who's been driving recent reviews) and `@sandarsh`. PR #1615 (RRID removal) is the sole interim-driven PR not yet merged — **now unblocked** because afrind's stated precondition (PR #1609) merged Apr 29 00:03 UTC.

*PR #1608 → PR #1618 design pivot driven by yuyou's review comment.* The "Subgroup ID = first Object ID" approach was closed unmerged after WG pushback at the interim. yuyou's Apr 28 07:29 UTC review comment on #1608 is now the **template for the replacement design** (PR #1618): explicitly signal the first-Object property via a header bit rather than encoding it in the Subgroup ID. The header type byte gains bit 6 (0x40), expanding the format from `0b00X1XXXX` to `0b0XX1XXXX` while still fitting in a 1-byte varint. This is the cleanest "WG identified the requirement, then someone unrelated to the original PR proposed a better mechanism" sequence in the wiki record so far this month.

*REWIND consensus call enters chair-arbitration territory.* With 3 days to the May 1 ballot deadline, chair Magnus Westerlund posted an unusual mid-thread intervention asking participants to **state explicit ballot positions** rather than continuing the design debate. Gwendal Simon's same-day message **defends Joining FETCH from a live-streaming-deployment perspective** — the first substantive pushback on the Luke + Ian "remove Joining FETCH" framing. Gwendal's proactive-past-object-delivery proposal (a parameter in SUBSCRIBE_OK communicating `[Start_Group, Live_Edge)`) is a third structural option that the thread hadn't surfaced before. The ballot may produce no clear outcome under these conditions.

*moq-dev/moq external contributor base widening rapidly.* Four of the last 12 PRs/issues come from non-Luke contributors: `Qizot` (audio-encoder, iOS Safari), `ksletmoe-aws` (Karl Sletmoe / AWS, CMAF passthrough decoder), `skirsten` (static catalog), `kubo6472` (cross-impl Cloudflare bug). The AWS PR is the **first moq-dev/moq PR from an AWS-affiliated contributor**. Combined with the moq-boy production-profile context in PR #1360 (*"its 6 production instances"*), Luke's stack is now seeing both production deployment scaling and external contribution at a scale not seen earlier in 2026.

*moq-lite-fetch readiness API takes shape.* Three PRs in flight build the FETCH path at the model layer: PR #1348 (Subscription API, Apr 26), #1356 (insert_track takes TrackConsumer), #1357 (fetch_group + TrackDynamic). Luke explicitly states the design pattern in #1357: *"The breaking API change is captured here so the wire-side hookup (lite ControlType::Fetch, ietf::run_fetch_stream) can land as a clean follow-up."* This is unusual scaffolding-first-then-wire ordering — Luke wants the API surface settled before FETCH semantics are implemented on the wire. Pairs with his Apr 27 issue #1614 spec-side argumentation about JOINING FETCH prioritization.

*Interop matrix +1 to 23/68/14.* Recovery from Apr 28's 22/69/14 dip. Neither the spec merges (#1611, #1609) nor the moq-dev/moq merges (#1352, #1353, #1355) explain it — the latter merged after the Apr 29 00:38 UTC interop run. Most likely a flaky test or upstream image rebuild. The matrix continues to walk between 22 and 24 since draft-17 publication; no new ground broken in either direction.

---

# 2026-04-28 — Interim-14 day; WG decision REMOVE Required Request ID

**TL;DR**:
- **interim-2026-moq-14 takes place** Apr 27 16:30 UTC. Headline WG decision: **REMOVE Required Request ID** from draft-18 (ianswett opens PR #1615 +3/−52, vasilvv approves within hours). Make-before-break work deferred to London hybrid interim in June. PR #1608 closed at the interim with WG agreement that the requirement (knowing the start of a subgroup) needs a different mechanism. Martin Thomson joins PR #1544 (0-RTT) review with a substantive rewrite — first time on a moq-transport PR.
- **Mailing list**: REWIND consensus thread re-erupts (9 messages Apr 27-28) — Luke + Ian Swett favor CurrentGroupFill; Martin Duke defends best-effort REWIND; Gwendal Simon pushes back on Joining FETCH removal. Chair Magnus asks for explicit ballot positions.
- **Implementations**: Luke's moq-relay big day — three open PRs in <2 hours after interim: PR #1350 (mTLS HTTPS, +351/−18), PR #1352 (announcement-less relay, +6/0, resolves Apr 24 kubo6472 bug), PR #1353 (per-frame buffer, +346/−146, production-profiled memory optimization on a 66-connection 4 GB box). cloudflare/moq-rs, video-dev/moq-js, moqtail, google/quiche, birneee/quiche_moq quiet.
- **Interop**: 22/69/14 (−1 vs Apr 27); back to the Apr 21–23 plateau.

**Operation**: Update
**Sources**:
- Slack: MCP working. `#moq` — two new posts since the Apr 27 log entry, both during the interim itself: [[alan-frindell]] Apr 27 16:32 UTC ("Interim starting now. Small number of participants so far...") and Giovanni Marzot Apr 27 16:50 UTC (single 😞 emoji). `#moq-rs` / `#moq-js` / `#libquicr` quiet.
- GitHub moq-wg repos:
  - **moq-transport**:
    - **PR #1615 OPENED** Apr 27 19:48 UTC by [[ian-swett]] (+3/−52, *Remove Required Request ID*, label `Control Messages`). Body: *"Fixes #1603. Removes 'Required Request ID'. Does not remove Request ID, because it is used by Joining Fetch and GOAWAY."* **[[victor-vasiliev]] APPROVED** within hours. Direct implementation of the interim decision.
    - **Issue #1603 closed-pending**: [[ian-swett]] Apr 27 18:42 UTC summary comment: *"From today's interim: Conclusion was to remove required-request-id from draft 18 and fix Joining Fetch (if necessary?). Those who believe some functionality in this space is useful, such as for make-before-break, should explore those use cases in more detail and further describe what, if any, dependency structure between requests is needed in MoQ. Tentative plan is to discuss these at the London hybrid interim in June."* Make-before-break work pushed to London (interim-2026-moq-08–11, June 11-12).
    - **PR #1611** (PUBLISH_OK removal): [[ian-swett]] Apr 27 19:39 UTC review APPROVED with body *"Reminder to retarget this."* — proceeds with retarget post-interim.
    - **PR #1608** (Subgroup ID = first Object Id): [[ian-swett]] Apr 27 18:36 UTC summary of interim feedback: *"1) People agreed it was important to know what the start Object ID of the Subgroup (and possibly Group?) 2) People had different concerns about restricting the Subgroup ID to be starting Object ID at the Original Publisher. 3) There was some confusion about both this proposal and what is possible in today's Object model in terms of publishing Objects in a subgroup 'out of order'."* — no merge yet, more iteration needed. **Issue #1405 ("Single Object Subgroups don't need a Subgroup ID")** received the same comment Apr 27 18:36 UTC.
    - **PR #1534** (REDIRECT): [[victor-vasiliev]] APPROVED Apr 27 23:01 UTC after interim. afrind's Cloudflare/Google relay-caching alignment loop ("Cacheable up to retry interval?") still unresolved in pushed text but no longer blocking review.
    - **PR #1542** (SUBSCRIBE_NAMESPACE split): Pre-interim review pass concluded in early hours of Apr 27 (already covered Apr 27 log). [[victor-vasiliev]] APPROVED Apr 27 04:00 UTC. Several afrind responses Apr 27 05:07–05:13 UTC. Looks close to merge.
    - **PR #1544** (0-RTT): Forward-secrecy text removal sequence — [[ian-swett]] Apr 27 19:42 UTC: *"I think I took that from HTTP/3 or the early data draft? Should I remove this?"*; [[victor-vasiliev]] Apr 27 22:08 UTC: *"I don't see text like that in RFC 8470. Let's just remove it?"*; [[ian-swett]] Apr 28 01:28 UTC removed it via suggestion patch. Then **[[martin-thomson]]** (well-known IETF figure, IAB chair / TLS WG / former QUIC chair) joined the review at Apr 28 01:46 UTC with a substantive rewrite suggestion for the introductory sentences: rewriting "QUIC 0-RTT provides the option for a client to initiate transactions immediately after attempting to establish a connection..." and clarifying the WebTransport restriction.
    - **Issue #1614 OPENED** Apr 27 19:11 UTC by [[luke-curley]] (split from #1358): *"(JOINING) FETCH + SUBSCRIBE prioritization"*. Body: *"as it stands in the current draft, it's implementation specific how to prioritize these two requests. Ideally, we want the JOINING FETCH first... However, this doesn't work properly when NextGroup starts. The higher priority JOINING FETCH takes precedence over order=DESC."* Concrete TTV math. Concludes: *"Basically, we need order=DESC support for JOINING FETCH. Either some way of prioritizing between the SUBSCRIBE + JOINING FETCH, or cancelling the JOINING FETCH if the next group starts (kinda gross), or add back the LargestGroup filter (pls)."* Self-comment Apr 27 19:16 UTC: *"Effectively, I want to race to determine if it's faster to: Download all of the current group (at network speed), or Wait for the next group. SUBSCRIBE filter=CurrentGroup order=DESC does this perfectly. I don't think it's possible in the current draft."*
    - **Issue #1616 OPENED** Apr 28 03:09 UTC by **mope-life** (Dustin Ross, new contributor): *"Both PUBLISH_NAMESPACE and NAMESPACE are responses to SUBSCRIBE_NAMESPACE"*. Spotted a textual inconsistency in §1588-1592 vs §3404-3408 of draft-ietf-moq-transport.md. afrind Apr 28 03:43 UTC: *"It should only be NAMESPACE since draft-16. We will clean this ul[sic]."* Editorial cleanup item.
    - Other interim agenda PRs (#1604 / #1605 / #1607 / #1591 / #1378): no new substantive comments. PR #1607 received a non-text [[luke-curley]] COMMENTED review at Apr 27 19:40 UTC.
  - **msf**:
    - **PR #133** ([[suhas-nandakumar]], "Add SCTE-35 support and CEA-608/708 accessibility fields", fixes #95) — suhas pinged @wilaw Apr 27 19:19 UTC after pushing fixes for Will's earlier feedback.
    - **PR #122** ([[suhas-nandakumar]], "initial text on zapping", fixes #110, +2627/0) — suhas pinged @wilaw Apr 27 18:56 UTC requesting another review pass.
  - **loc, secure-objects, cmsf, catalog-format, privacy-pass**: no activity.
- Implementation repos:
  - **moq-dev/moq** — three new PRs from [[luke-curley]] in <2 hours after the interim, plus an external opener:
    - **PR #1350 OPENED** Apr 27 22:24 UTC (+351/−18) — *moq-relay: authenticate HTTPS callers via the cluster mTLS CA*. The QUIC server already short-circuits to `AuthToken::unrestricted()` when a peer presents a client cert signed by `--server-tls-root`, but the HTTPS web server (`/announced`, `/fetch`, `/ws/*`) didn't. New `MtlsAcceptor` wraps `RustlsAcceptor`, installs `WebPkiClientVerifier` with `.allow_unauthenticated()`, and a per-connection tower middleware (`SetMtlsExtension`) injects an `Option<MtlsPeer>` request extension. SIGUSR1 cert hot-reload preserved on the mTLS path. CodeRabbit flagged a 🟠 Major issue: combined with `CorsLayer::allow_origin(Any)`, an arbitrary website could read `/announced` and `/fetch` through a browser that auto-selects or has approved a matching client cert. Luke posted six self-review comments Apr 27 23:15–23:28 UTC — same self-review pattern as PR #1343.
    - **PR #1352 OPENED** Apr 27 23:59 UTC (+6/0) — *Handle relays without announcement subscription support*. **Direct response to issue #1346** (kubo6472's Apr 24 cross-impl Cloudflare-relay catalog-discovery bug). Changes `announced` getter type from `Set<Path.Valid>` to `Set<Path.Valid> | undefined`; when connecting to `mediaoverquic.com` the system explicitly sets `announced` to `undefined` and treats it as `reload=false`, preventing indefinite waiting for announcements that will never arrive. CodeRabbit flagged hostname-suffix matching false-positive risk; Luke pushed a fix at Apr 28 00:07 UTC.
    - **PR #1353 OPENED** Apr 28 00:27 UTC (+346/−146) — *moq-lite: per-frame buffer + BufMut producer to cut relay memory*. **Production-profiled memory optimization** — Luke profiled a relay with ~66 connections at 2.7 GB RSS on a 4 GB box, attributing ~234 MB to per-chunk `Bytes` headers, ~254 MB to retained frame state, and ~446 MB to quinn's reassembly arena that was being pinned by held `Bytes`. Replaces `FrameState.chunks: Vec<Bytes>` with `FrameBuf` — a single Arc-shared, fixed-capacity heap allocation per frame. `FrameProducer` now `impl bytes::BufMut` so the receive path writes quinn stream bytes directly into the pre-allocated buffer via `read_buf`. `FrameConsumer` tracks a byte cursor and materializes transient `Bytes` views via `Bytes::from_owner(buf.clone()).slice(..)`. Net effect: one memcpy, no per-chunk Bytes headers, no quinn-arena pinning.
    - **Issue #1351 OPENED+CLOSED** Apr 27 23:15 UTC → Apr 28 00:10 UTC by **metapox** (taku): *"Container.Legacy.Consumer.next() returns undefined after 20-60 frames with multiple concurrent tracks"*. Reported against `@moq/hang` 0.2.4 + `@moq/lite` 0.2.2 against `moq-relay` 0.10. Luke replied Apr 27 23:18 UTC: *"recvGroup() should only return undefined when the track has finished. Can you verify this is not happening? Yeah, I need more information, this should never happen."* metapox followed up Apr 28 00:08 UTC: *"After further investigation, I was unable to reproduce this issue in a clean environment. Both recvGroup() and Container.Legacy.Consumer work correctly with multiple groups and 200+ frames. The original report was likely caused by an unstable publisher on my side. Sorry for the noise — feel free to close this."* — false-alarm closure.
    - **PR #1349** (skirsten static catalog) — no new pushed code, last activity Apr 28 01:27 UTC (CodeRabbit re-review).
    - **PR #1348** (moq-lite-fetch Subscription model) — no new pushed code, last activity Apr 28 00:27 UTC.
    - No new merges to `main` since Apr 26 (PRs #1340 + #1343).
  - **cloudflare/moq-rs**, **video-dev/moq-js**, **moqtail/moqtail**, **google/quiche (moqt)**, **birneee/quiche_moq**: No activity in the window.
- Mailing list — **The "Consensus call on way forward on REWIND" thread RE-ERUPTS** (9 messages Apr 27 06:55 UTC → Apr 28 02:03 UTC). Magnus Westerlund's Apr 16 consensus call (ballot deadline May 1) had been quiet for 9 days; the interim discussion pushed the design debate back onto the list:
  - **Suhas Nandakumar Apr 27 06:55 UTC** (replying to Gwendal Simon's earlier ABR-switching argument): *"IIUC REWIND was not addressing this use-case. Looks like the switch needs continuous groups with no gaps as it expects Relay to have cached the objects. REWIND does give up if there are gaps."*
  - **Luke Curley Apr 27 08:33 UTC**: *"Imagine if HTTP operated based on the cache state... a HTTP server was allowed to return a partial response with byte range 68-419."* Argues against cache-state-dependent behavior; would support REWIND if it required best-effort upstream retrieval.
  - **Gwendal Simon (Synamedia) Apr 27 16:12 UTC**: Acknowledges Luke's feedback re PR #1378. *"REWIND delivery begins at the start of the latest gap-free run of Groups, skipping earlier Groups with gaps."* Notes SWITCH has stricter requirement: *"for every Group in the range, if available on current Track, must be available on target Track"*. Symmetric gaps OK. Commits to updating #1378 with explicit cache-continuity condition.
  - **Martin Duke Apr 27 12:23 UTC**: Defends best-effort design. *"The 'best-effortness' of REWIND is critical to the design, and is consistent with what I briefed in Boulder."*
  - **Luke Curley Apr 27 12:46 UTC**: Reiterates HTTP analogy + supports PR #1607 (Largest Available Group filter) instead.
  - **Martin Duke Apr 27 12:52 UTC**: Compromise proposal — *"would you accept something that is still best-effort (i.e. the publisher MAY refuse based on its cache state) but does not preclude the relay doing something more aggressive"* (best-effort floor, allow more aggressive).
  - **Luke Curley Apr 27 13:18 UTC**: Agrees: *"A relay MUST deliver objects within a sub-group in order (SUBSCRIBE semantics). Otherwise, the relay MUST skip the remainder of the sub-group."*
  - **Luke Curley Apr 27 13:32 UTC** (clarification): Fragmented-cache options — relay may serve partial sub-groups, request upstream via REWIND/FETCH, or skip sub-groups entirely. *"Relays must deliver objects within sub-groups in order per SUBSCRIBE semantics. If unable to maintain order, the relay must skip the remainder of that sub-group. Skipping entire groups will negatively impact user experience, similar to a FETCH returning an error."*
  - **Ian Swett Apr 28 02:03 UTC**: *"I'm open to some variant of REWIND, but not very optimistic that we'll get consensus on anything more complex than CurrentGroupFill."* Endorses CurrentGroupFill (Alan Frindell's sketched alternative) — *"the main rationale for pursuing more complex solutions like REWIND would be enabling removal of the Joining Fetch mechanism entirely"*. Would support removing Joining Fetch if CurrentGroupFill adopted, but uncertain about WG support.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9). draft-ietf-moq-transport-17 still the latest WG transport draft.
- Interop runner: **Apr 28 00:37 UTC run = 22 / 69 / 14** — **−1 pass from Apr 27 (23/68/14)**, regressing back to the Apr 21–23 / Apr 26 plateau. The walking arc since draft-17 publication: 22 → 23 → 24 → 22 → 23 → 22. Most plausible cause: flaky test or an upstream image rebuild. moq-dev/moq's Apr 27 PRs (#1349, #1350, #1352, #1353) are all still **open**, so they shouldn't have rebuilt the docker image. moqtail's draft-16 work also remains on a branch.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: None open (3 closed).

**Pages updated**: discussions/discussions-2026-04.md, discussions/interim-meetings.md, drafts/moq-transport.md, implementations/moq-dev.md, interop/interop-runner.md, index.md

**Key findings**:

*Interim outcome on RRID: REMOVE.* The biggest spec decision of the interim is now in the editor's copy as PR #1615 ([[ian-swett]], Apr 27 19:48 UTC, +3/−52). [[victor-vasiliev]] approved within hours. Required Request ID is being **removed from draft-18**, not flow-controlled (Alan's PR #1613) or restructured (Martin's PR #1604 — joining FETCH on SUBSCRIBE stream). The structural-fix camp won the conceptual argument: RRID's use cases (make-before-break, dependency ordering) didn't justify keeping the field in the wire format. Make-before-break design work is **deferred to the London hybrid interim in June** (interim-2026-moq-08–11, June 11-12). Net: PR #1604 and PR #1613 both lose their headline justification; #1615 lands the simplest possible resolution. Request ID itself stays — Joining FETCH and GOAWAY still need it.

*REWIND consensus thread breaks the dam.* After 9 calendar days of post-Apr-16-consensus-call silence, the thread re-erupted with 9 messages over 19 hours during/after the interim. Two crystallizing positions: (a) **Luke Curley + Ian Swett favor CurrentGroupFill** — the simpler band-aid Alan sketched on Apr 17, no relay-side backfill, just current-group-with-fill semantics. Ian states explicitly that *"I'm open to some variant of REWIND, but not very optimistic that we'll get consensus on anything more complex than CurrentGroupFill"* and would support removing Joining Fetch entirely if CurrentGroupFill landed. (b) **Martin Duke defends REWIND's best-effort semantics** as critical to the design, but accepts a compromise framing: best-effort floor, allow relays to do something more aggressive. The HTTP-style "publisher MUST attempt upstream retrieval" framing Luke initially pushed has been **weakened to a sub-group-ordering MUST** that Luke agreed to. Suhas raised a structural challenge: REWIND can't handle gapped caches, which Gwendal's PR #1378 SWITCH does. Gwendal committed to updating SWITCH with an explicit cache-continuity condition. The May 1 consensus-call deadline is now 3 days away.

*moq-relay big day from Luke: mTLS for HTTPS, announcement-less relay handling, per-frame buffer.* Three open PRs in <2 hours after the interim, two of which directly address operational reality. **PR #1350** (mTLS HTTPS, +351/−18) closes the gap between the QUIC server's mTLS short-circuit and the HTTPS REST surface (`/announced`, `/fetch`, `/ws/*`) — important for any cluster-internal HTTPS callers (e.g., a control plane behind the same mTLS root). CodeRabbit flagged the CORS/browser-readable-GET issue; not yet addressed. **PR #1352** (announcement-less relay, +6/0) is a tiny but operationally significant patch — directly resolves the Apr 24 kubo6472 cross-impl bug (issue #1346) by hardcoding `mediaoverquic.com` as a relay that doesn't support announcement subscriptions and short-circuiting the indefinite-wait logic. (CodeRabbit flagged the suffix-match false-positive, fixed.) **PR #1353** (per-frame buffer, +346/−146) is a **production-profiled memory optimization** — Luke's profiling on a real ~66-connection relay attributed ~234 MB to per-chunk `Bytes` headers and ~446 MB to pinning quinn's reassembly arena, then rewrote frame storage to a single `Arc<FrameBuf>` per frame with `BufMut`-driven direct writes. Together these three PRs continue the Apr 26 SaaS-multi-tenancy push (slug routing + wait_for_broadcast) by tackling the next layer down: HTTPS auth, peer-impl differences, and memory cost-per-connection.

*Issue #1346 (kubo6472) closed in PR by mode rather than fix.* The cross-impl Cloudflare-relay catalog-discovery friction the user reported Apr 24 is now resolved in moq-lite via **explicit knowledge** that `mediaoverquic.com` doesn't support `SUBSCRIBE_NAMESPACE`. Strictly, moq-lite stops *waiting for the announcements that will never arrive*; the underlying interop gap (Cloudflare moq-rs not implementing announcement subscriptions) is unchanged. From Luke's side this is a pragmatic move — preserves the user-visible behavior of `<moq-watch catalog-format=msf>` against a Cloudflare endpoint at the cost of hardcoding a single relay URL into the moq-lite source.

*Martin Thomson joins PR #1544 review.* Martin Thomson (former QUIC WG chair, IAB member, very senior IETF security/transport reviewer) posted a substantive rewrite suggestion on the 0-RTT introductory text at Apr 28 01:46 UTC. First time on a moq-transport PR within April 2026's wiki record. PR #1544 had been parked since Mar 8 with only ianswett activity; Vasilvv started reviewing Apr 27, and now Thomson. The review is becoming serious and the security-considerations text needs a rewrite before merge — not surprising for 0-RTT but a notable widening of the reviewer pool.

*Interop matrix walks back into the plateau at 22/69/14.* Apr 28 = 22/69/14, −1 from Apr 27. Five-day arc: 22 → 23 → 24 → 22 → 23 → 22. None of moq-dev/moq's Apr 27 PRs have merged to `main`, so docker images shouldn't have rebuilt. Most likely a flaky test or an unrelated impl rebuild. The matrix neither at the Apr 25 peak (24) nor at the Apr 19–20 trough (18) — stuck at the post-draft-17 plateau.

---

# 2026-04-27 (deep-dive) — Wire-format diff across moq-transport draft-14/16/17

**TL;DR**:
- User query: scrutinize Group/Subgroup/Object encoding and stream/channel framing across draft-14, -16, -17. Conceptual data model is **stable across 14/16/17**; **draft-15/16 was the wire-format upheaval** (bit-flag Type fields, FETCH redesigned with delta encoding); **draft-17** is mostly rename + the bidi-stream-per-request architecture change.
- New page `concepts/streams-and-framing.md`; major rewrites of `subgroups-and-objects.md` and `track-properties.md`; downloaded the missing draft-16 source.
- **Implementations**: n/a — research-only deep-dive, no impl activity inspected.
- **Interop**: n/a — research-only deep-dive, no runner check.

**Operation**: User query — "Scrutinize the concepts page and the description of the groups, subgroups, objects for their definitions and encoding. … description of any differences between draft 14, 16, 17. The same goes for channels and streams."

**Sources read**:
- `sources/ietf-drafts/draft-ietf-moq-transport-14.txt`
- `sources/ietf-drafts/draft-ietf-moq-transport-17.txt`
- `sources/ietf-drafts/draft-ietf-moq-transport-16.txt` (downloaded fresh from `https://www.ietf.org/archive/id/draft-ietf-moq-transport-16.txt` — this version was missing from the local source mirror).

**Sections compared** in each draft: §1.3 Stream Management Terms, §2 Object Data Model (incl. §2.1 Objects, §2.2 Subgroups, §2.3 Groups, §2.4 Track Naming, §2.5 Extension Headers/Properties), §10.1 Track Alias, §10.2 Objects, §10.2.1 Object Status / Extension Headers / Properties, §10.3 Datagrams, §10.4 Streams (incl. §10.4.2 Subgroup Header and the FETCH per-Object format).

**Pages updated**:
- `concepts/subgroups-and-objects.md` — major rewrite. Now contains version-by-version wire-format diagrams for SUBGROUP_HEADER + Object, OBJECT_DATAGRAM, and FETCH per-Object header across 14/16/17, plus a delta-encoding summary table covering Group ID / Subgroup ID / Object ID / Publisher Priority / Properties on each stream type. Calls out PR #1586 (FETCH delta encoding, merged Apr 27) and PR #1608 (Subgroup ID = first Object ID).
- `concepts/track-properties.md` — added the "Naming Evolution" table (Object Extension Headers → Extension Headers → Properties), the delta-encoded KVP Type rule new in draft-16, and draft-17's reserved application-private code-point ranges.
- `concepts/streams-and-framing.md` — **new page**. Covers the bidi-stream architecture change in draft-17 (control stream → SETUP unidirectional pair + bidi-per-request), the unidirectional Stream-Type code-point table (`0x05` FETCH, `0x10..0x1D` SUBGROUP, `0x2F00` SETUP), the OBJECT_DATAGRAM bit-flag layout, and the Stream Cancellation reset-code registry across 14/16/17.
- `index.md` — added [[streams-and-framing]] to Protocol Concepts; tagged subgroups-and-objects and track-properties with their version-diff scope.

**Sources mirror updated**: added `draft-ietf-moq-transport-16.txt` (237 KB, 4988 lines) — the previously-missing intermediate version.

**Key findings (synthesized)**:

1. **Conceptual data model is stable across 14/16/17.** Track / Group / Subgroup / Object definitions are essentially the same. Wording polish in 16/17 only — the only substantive changes are: (a) the three-state Object existence model added in 16; (b) Track Namespace gaining an explicit on-wire structure in 16, then the lower bound dropping from 1 to 0 fields in 17; (c) "forwarding preference" moving from Track-level (14) to per-Object (16+).

2. **draft-15/16 was the wire-format upheaval.** SUBGROUP_HEADER and OBJECT_DATAGRAM Type fields moved from enumerated values to bit-flag layouts, gaining the `DEFAULT_PRIORITY` flag that lets Publisher Priority be inherited from the subscription. Extensions wrapped in a named `Extensions { Length, Headers }` struct. Subgroup ID encoding moved to a 2-bit `SUBGROUP_ID_MODE` field. **FETCH per-Object header was completely redesigned**: a single `Serialization Flags` varint gates the presence of every field and supports delta encoding from the prior Object, with two reserved values `0x8C` / `0x10C` for End-of-Non-Existent-Range / End-of-Unknown-Range. **Object Status was removed from FETCH responses** and SUBSCRIPTION-only thereafter. KVP types delta-encoded.

3. **draft-17 is mostly a rename + cleanup, with one big architectural change.** Wire-byte layout of subgroup objects, datagrams, and FETCH per-Object framing is *byte-identical* to draft-16. The data-plane changes are: `Extension Headers` → `Properties` everywhere (including the bit name in the Type field); `(i)` → `(vi64)` annotation backed by a self-contained varint definition (§1.4.1) that **extends the integer range from RFC-9000's 2⁶²−1 to 2⁶⁴−1** via a new 9-byte encoding (prefix `11111111`), omits the 7-byte length, and reserves `11111100` as invalid (PR #1595). The architectural change is **bidirectional-stream-per-request**: SETUP moves from a single bidi control stream to a pair of unidirectional control streams (new code point `0x2F00`), and SUBSCRIBE / PUBLISH / FETCH / PUBLISH_NAMESPACE / SUBSCRIBE_NAMESPACE / TRACK_STATUS each open their own bidirectional request stream. Plus a new normative datagram check (`STATUS + PROPERTIES` with non-Normal status → PROTOCOL_VIOLATION) and a clarification of "prior Object" semantics across End-of-Range markers in FETCH.

4. **PR #1586 (merged Apr 27 2026, into post-17 main, +32/−23)** is a textual cleanup of the FETCH-response delta-encoding rule already introduced in draft-16. Final normative wording: *"If the Group ID Delta field is present, the Object ID is the value of Object ID Delta if present. When the Group ID Delta field is not present, the Object ID is the prior Object's ID plus the Object ID Delta if present."* Closes Martin Duke's long-running #877 "Pack the bits". Not a redesign of the draft-16 Serialization Flags scheme.

# 2026-04-27 (interim) — Pre-interim editor warm-up; moq-dev opens FETCH-readiness PR

**TL;DR**:
- PR #1586 (FETCH delta encoding) merges, closing Martin's long-running #877 "Pack the bits".
- Pre-interim review pass: Suhas on #1542 (SUBSCRIBE_NAMESPACE/TRACKS split, 7 inline comments), Vasilvv on #1534 (REDIRECT) and #1544 (0-RTT).
- **Implementations**: moq-dev/moq merges PR #1340 (+182/−5, `wait_for_broadcast`) and PR #1343 (+283/−26, subdomain slug routing); opens **FETCH-readiness PR #1348** (+1049/−471). External PR #1349 from skirsten (+196/−13) adds `static` catalog mode to `<moq-watch>`. cloudflare/moq-rs, video-dev/moq-js, moqtail, google/quiche, birneee/quiche_moq all quiet.
- **Interop**: 23/68/14 (+1 vs Apr 26, −1 below Apr 25 high of 24/67/14).

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

# 2026-04-26 — Pre-interim lull; moqtail absorbs two big draft-16 merges

**TL;DR**:
- moq-wg spec side completely quiet — interim agenda PRs all silent ahead of the Apr 27 meeting.
- moq-dev issue #1346 root-caused as Firefox/GPU/driver, **not** a moq-lite or @moq/watch defect.
- **Implementations**: moqtail draft-16 branch lands PR #168 (+1094/−443, FETCH wire format) + PR #169 (+994/−593, Message Parameters migration) — ~2.1k LOC combined, largest moqtail draft-16 day since Apr 14–16. moq-dev/moq merges PR #1345 (+108/0, Python examples) and dependabot PR #1347 (rustls bump). cloudflare/moq-rs, video-dev/moq-js, google/quiche, birneee/quiche_moq quiet.
- **Interop**: 22/69/14 (−2 vs Apr 25 high of 24/67/14; back to the Apr 21–23 plateau).

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

# 2026-04-25 — Luke joins the pre-interim spec debate; interop new April high

**TL;DR**:
- Luke Curley posts three substantive comments in 52 minutes (#1603 RRID DoS, #1607 LargestGroup filter, #1358 JOINING FETCH priority) — strongest pro-#1607 advocacy yet, with concrete Twitch TTV math (333 ms median startup gain).
- Correction: PR #1610 (REQUEST_OK textual aliases) was actually **merged Apr 23**, not still open as Apr 24 log claimed; unblocks #1611 (PUBLISH_OK removal). Apr 27 interim slides posted; Vasilvv to present a **third RRID alternative** beyond #1604/#1613.
- **Implementations**: moq-dev/moq PR #1343 (+248/−27, subdomain slug routing) still open with unresolved 🔴 Critical WS auth-handler bypass; dependabot PR #1347 opened (rustls bump); Issue #1346 (first external @moq/watch + MSF cross-impl bug) opened by @kubo6472. cloudflare/moq-rs, video-dev/moq-js, moqtail, google/quiche, birneee/quiche_moq all quiet.
- **Interop**: 24/67/14 — new April high; second consecutive day of improvement (22 → 23 → 24).

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

# 2026-04-24 — Hop-based clustering lands on moq-dev; RRID design forks

**TL;DR**:
- Alan opens **PR #1613 (MAX_REQUEST_UPDATES flow control)** as second answer to Martin's RRID DoS escalation; debate now three-way (#1603 + #1604 + #1613). Alan hints fwd=1 precondition on JOINING FETCH may be relaxed (#1612, "I wonder if we should just allow fwd=0").
- **Implementations**: moq-dev/moq merges **PR #1322 (hop-based clustering, +961/−979)** — biggest Claude-Code-authored moq-dev landing to date; breaking change for moq-lite/moq-relay. moqtail PR #168 finalizes draft-16 FETCH-object wire format in author comment (rebase pending). cloudflare/moq-rs, video-dev/moq-js, google/quiche, birneee/quiche_moq quiet.
- **Interop**: 23/68/14 (+1 after three days flat; matches Apr 15–16 baseline; coincides with hop-clustering merge).

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

# 2026-04-23 (evening) — moq-transport editor wave ahead of Apr 27 interim

**TL;DR**:
- Largest single-day moq-transport activity since draft-17: **PR #1606 merged** (stream reset codes, fixes #1581, first post-draft-17 merge); **PRs #1608, #1609, #1610, #1611 all opened** by Alan/Ian.
- Martin Duke escalates **#1603 with a DoS argument** — RRID multiplies via REQUEST_UPDATE; proposes eliminating RRID and moving Joining FETCH to the SUBSCRIBE stream (per PR #1604). Suhas marks **CHANGES_REQUESTED on PR #1607** — first hard blocker since the PR opened.
- **Implementations**: cloudflare/moq-rs PR #165 (+30/0, Semgrep CI scanning) opened by Cloudflare App&ProdSec; moq-dev/moq PR #1345 (+108/0, Python clock + announced examples) opened by Luke. moqtail PR #168 has rebase commits but no substantive changes; video-dev/moq-js, google/quiche, birneee/quiche_moq quiet.
- **Interop**: 22/69/14 — flat (no new run for Apr 24 yet at check time; last run Apr 23 00:35 UTC).

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

# 2026-04-23 (morning) — MSF InitTracks reverted; Apr 27 interim agenda published

**TL;DR**:
- **MSF PR #154 merges Will Law's revert of InitTracks** (−170 lines); MSF reverts to statically declared inits + AVC3 self-init segments for mid-stream changes. Luke opens **MSF #155 "Sequence aligned groups are too restrictive"** challenging §4.2 group alignment.
- Ian Swett review wave (~50 min) on three moq-transport PRs ahead of interim: **#1606 APPROVED**, #1605 first real review, #1607 Subgroup-ID-as-first-Object-ID inline suggestion. Apr 27 interim agenda published (16:30 UTC, "all editor time").
- **Implementations**: moq-dev/moq four-PR burst from Luke — PR #1339 merged (+5/−5, JS version bump), PR #1340 opened (+182/−5, `wait_for_broadcast`), PR #1341 opened (+748/−1145, media-producer refactor), PR #1343 opened (+226/−37, subdomain routing), PR #1344 merged (+31/0, catalog-format docs). cloudflare/moq-rs, video-dev/moq-js, google/quiche, moqtail (only Issue #177), birneee/quiche_moq quiet.
- **Interop**: 22/69/14 — flat third consecutive day; 1 short of Apr 16 baseline.

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

# 2026-04-22 — moq-rs datagram rate restored; interop +2 again

**TL;DR**:
- Luke argues for static-init or annexb on MSF #153 (two comments) — reopens the simplification path alongside Will Law's `inits[]` proposal and Vasiliev's original remove-`initTrack` stance.
- google/quiche moqt session-parameter API motivation cites partial-object delivery on the relay — ties directly to the partial-cache debate Luke opened on moq-transport PR #1607 on Apr 19.
- **Implementations**: cloudflare/moq-rs +5 commits on PR #157 (forwarding-path repair; **datagram rate restored 1/sec → 50/sec**, fixing earlier regression). google/quiche moqt +2 commits (session-parameter API + `moqt_messages.h` cleanup). moqtail PR #175 merged (+47/−42, inactivity timeout 1 s → 5 s); new Issue #176 (draft-16 §7.2 scheduling not yet implemented). moq-dev/moq, video-dev/moq-js, birneee/quiche_moq quiet.
- **Interop**: 22/69/14 — second consecutive +2 day (18 → 20 → 22); 1 short of Apr 16 baseline.

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
