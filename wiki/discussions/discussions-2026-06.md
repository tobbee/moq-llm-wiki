---
title: "Discussions - June 2026"
tags: [discussions, slack, github]
date: 2026-06-01
last_updated: 2026-06-07
status: current
---

Summary of active discussions in the MOQ ecosystem during June 2026.

# Activity (June 4 06:00 UTC → June 7 19:00 UTC) — **London interim agenda PUBLISHED (Martin Duke June 5, "shifted more time to MOQT blockers"); DTS consensus readout flips to "separate WG extension document" (draft-ietf-moq-dts4moq) — Cullen Jennings contests June 6; Tobbe ships MSF/CMSF catalog validator (CUE) that finds draft-01 bugs → files MSF PR #177 + CMSF PR #23; Kota Yatagai debuts Moqtopus (C++/MsQuic Unreal Engine client); thibmeu opens 2 privacy-pass issues; moq-dev/moq adds moq-hls gateway + VP8/VP9 + moq-gst maturation; interop drops to 41 → 37 → 38 pass**

**TL;DR**:
- **London interim (June 11-12) agenda is now PUBLISHED on Datatracker**. [[martin-duke|Martin Duke]] posts *"New Agenda for London"* June 5 — *"The revised agenda is posted… shifted a bit more time to MOQT blockers"* — and [[mike-english|Mike English]] posts *"London interim details"* (logistics/remote). **Day-1 ([interim-08](https://datatracker.ietf.org/doc/agenda-interim-2026-moq-08-moq-01/), June 11, 0900-1700 BST) is now almost entirely MOQT-blocker time**: Concurrent Subscribe (Ian, [#1633](https://github.com/moq-wg/moq-transport/issues/1633)), Object Range Filters (Mo, [PR #1518](https://github.com/moq-wg/moq-transport/pull/1518)), Joining FETCH (Alan+Mo, [PR #1642](https://github.com/moq-wg/moq-transport/pull/1642)), Request Blocking (Alan, [#1519](https://github.com/moq-wg/moq-transport/issues/1519)), **two "Other MOQT Issues" blocks (Alan+Ian, 1330-1430 + 1500-1600)**, and **SWITCH/DTS Implementation Lessons (Ali, 1600-1700)** demoted to the day's tail. **Day-2 ([interim-10](https://datatracker.ietf.org/doc/agenda-interim-2026-moq-10-moq-01/)/[-11](https://datatracker.ietf.org/doc/agenda-interim-2026-moq-11-moq-01/), June 12) is still conditional** on the SWITCH/DTS outcome — both branches keep MSF/CMSF (Will), Privacy Pass (Suhas), Secure Objects (Cullen), LOC (Mo); the not-incorporated branch adds CDN Provisioning (Mike) + MSFTS (Gwendal). **[[moq-locmaf|LOCMAF]] and catalog-format are not on either agenda.**
- **DTS consensus readout flips to "separate WG extension document" — and Cullen Jennings contests it**. The chairs' readout of the [June-4-close DTS/SWITCH consensus call](https://mailarchive.ietf.org/arch/msg/moq/r2Muds4cEbN7SGFsWzFo_29NL-s/) concludes there is *"strong consensus for DTS to be adopted as an extension described by a WG document"* — **not** integrated into the base [[moq-transport]] draft — and invites [[will-law|Will Law]] to publish his `wilaw/dts4moq` repo as a new WG document **`draft-ietf-moq-dts4moq`** at his earliest opportunity (*"it is possible that the document later reaches a state where it could be merged into MOQT"*). **[[cullen-jennings|Cullen Jennings]] June 6 pushes back**: *"How did you reach the conclusion that there is consensus this should be an extension instead of in the MoQT draft?"* — a **reversal** of the trajectory the wiki tracked (Cullen's May 27 base-spec-PR preference + wilaw's [PR #1638](https://github.com/moq-wg/moq-transport/pull/1638) base-spec integration, still OPEN). The readout lands closer to Magnus Westerlund's original separate-draft proposal; Cullen, who argued *against* a separate draft, is now the dissenting voice on the process question.
- **Implementations**: **[[moq-dev|moq-dev/moq]] ~20 merges + several OPEN (June 4→7, all kixelated)** — **new [PR #1626](https://github.com/moq-dev/moq/pull/1626) "Add moq-hls: HLS / LL-HLS gateway"** (+1695/−49, OPEN), **VP8/VP9 codecs** ([PR #1625](https://github.com/moq-dev/moq/pull/1625) moq-mux + [PR #1632](https://github.com/moq-dev/moq/pull/1632) gstreamer), **moq-gst maturation** (#1627 dynamic catalog follow, #1633 pad-pump refactor, #1646 backwards-timestamp fix), **moq-net reshape** (#1631 Track→TrackInfo+async TrackConsumer, #1634 one subscription + N concurrent fetches, #1640 RAII announcements), **[PR #1637](https://github.com/moq-dev/moq/pull/1637) moq-json JSON Merge Patch** for catalog snapshot/delta, **moq-lite-05 [PR #1648](https://github.com/moq-dev/moq/pull/1648)** (add TRACK stream, drop SUBSCRIBE_OK/FETCH_OK — supersedes #1609) + **[PR #1601](https://github.com/moq-dev/moq/pull/1601) MERGED** (FETCH past groups), relay [#1628 GOAWAY drain](https://github.com/moq-dev/moq/pull/1628) + [#1630 TLS cert reload](https://github.com/moq-dev/moq/pull/1630) OPEN. **[[openmoq|openmoq/moqx]]**: afrind **[PR #386](https://github.com/openmoq/moqx/pull/386) MERGED** (per-session auth filters replace session-keyed grants map) + multithread stack #361/#362/#363 still OPEN; gmarzot+TimEvens static-Boost build fixes; peterchave auto-regression-test CI [#379](https://github.com/openmoq/moqx/pull/379) MERGED. **[[quiche-moq|google/quiche moqt]]**: 3 vasilvv commits June 5-6 (MoqtControlMessageQueue factoring + "has first object in subgroup" header bit). **[[moqlivemock]] v0.11.0 + [[warp-player|Eyevinn/warp-player]] v0.11.0** ship MSF/CMSF draft-01 catalogs (+ LOCMAF 0.2 in mlm). **NEW [[Eyevinn/msf-catalog-validator]]** (Tobbe). **[[moqtail|moqtail/moqtail]]**, **[[moq-rs|cloudflare/moq-rs]]** (PR #167/#171 untouched), **[[moq-js|video-dev/moq-js]]** (PR #72 OPEN), **[[imquic|meetecho/imquic]]** (PR #27 updated June 5), **[[mondain]]/moqxr** (TilsonJoji SRT PR #14 OPEN), **mondain/moq2ts** quiet.
- **Interop**: **38 / 137 pass/fail** at [2026-06-07 00:49:07 UTC](https://englishm.github.io/moq-interop-runner/results/2026-06-07_004907/report.html) (draft-18 target) — sequence **June 5 41 → June 6 37 → June 7 38**, a **−13 to −16 drop from June 4's 54**; total slips 177 → 176. **Version breakdown still 0 at target · 0 ahead · 176 behind** — **no impl has registered draft-18** (Nokia's announced v17/v18 relay not yet registered; moqlivemock now shows draft-16/14). **20 consecutive daily reports (May 19-Jun 7)** = new longest cadence streak. **London interim 4 days away (hackathon/interop June 9-10, formal sessions June 11-12)**.

## London interim agenda PUBLISHED — Day-1 is MOQT-blocker time, DTS/SWITCH demoted

[[martin-duke|Martin Duke]]'s June 5 *"New Agenda for London"* message (*"The revised agenda is posted… I shifted a bit more time to MOQT blockers"*) and [[mike-english|Mike English]]'s June 5 *"London interim details"* (arrival/remote logistics) finalize the structure for the June 11-12 in-person interim at Cloudflare's London office. The Datatracker agendas:

**Day-1 — [interim-2026-moq-08](https://datatracker.ietf.org/doc/agenda-interim-2026-moq-08-moq-01/) (June 11, 0900-1700 BST):**

| Time (BST) | Item | Presenter | Ref |
|---|---|---|---|
| 0930-0945 | Administrivia | — | |
| 0945-1015 | Concurrent Subscribe | Ian | [#1633](https://github.com/moq-wg/moq-transport/issues/1633) |
| 1030-1045 | Object Range Filters | Mo | [PR #1518](https://github.com/moq-wg/moq-transport/pull/1518) |
| 1045-1145 | Joining FETCH | Alan + Mo | [PR #1642](https://github.com/moq-wg/moq-transport/pull/1642) |
| 1145-1230 | Lunch (Tongyu demo) | — | |
| 1230-1330 | Request Blocking | Alan | [#1519](https://github.com/moq-wg/moq-transport/issues/1519) |
| 1330-1430 | Other MOQT Issues | Alan + Ian | |
| 1430-1445 | Next Interim Planning | Martin | |
| 1500-1600 | Other MOQT Issues (cont.) | Alan + Ian | |
| 1600-1700 | SWITCH/DTS Implementation Lessons | Ali | |

**Day-2 — [interim-10](https://datatracker.ietf.org/doc/agenda-interim-2026-moq-10-moq-01/) (morning) + [interim-11](https://datatracker.ietf.org/doc/agenda-interim-2026-moq-11-moq-01/) (afternoon), June 12** — still flagged *"dependent on the outcome of the SWITCH consensus call"*. Morning: Interop Report (Mike) + DOS Design-team readout (Mike, [[moq-relay-dos|draft-englishm-moq-relay-dos]]) + conditional SWITCH Issues (Gwendal) / DTS Issues (Will). Afternoon has two branches; **both keep MSF/CMSF (Will), Privacy Pass (Suhas), Secure Objects (Cullen), LOC update (Mo)**; the *incorporated* branch adds Top-N DDOS (Cullen) + Top-N issues (Mo) + Top-N Implementation (Suhas); the *not-incorporated* branch adds **CDN Provisioning (Mike) + MSFTS (Gwendal)**.

**Structural read**: Martin's *"shifted more time to MOQT blockers"* is visible — Day-1 gives Alan+Ian **two hour-long "Other MOQT Issues" blocks** to triage the 14-item draft-18 errata/design backlog, while **SWITCH/DTS is reduced to a 1-hour Ali "Implementation Lessons" report at the very end of Day-1**, no longer the centerpiece it was at the May 26 interim. **LOCMAF (Tobbe) and catalog-format do not appear on either agenda** — the LOCMAF initData-carriage discussion would surface, if at all, under Will's MSF/CMSF slot.

## DTS consensus readout — "extension WG document", and the Cullen reversal

The chairs' readout of the [DTS/SWITCH consensus call](https://mailarchive.ietf.org/arch/msg/moq/r2Muds4cEbN7SGFsWzFo_29NL-s/) (opened May 21, closed June 4) concludes:

- **DTS: adopt as an extension described by a WG document** — *"strong consensus for DTS to be adopted as an extension described by a WG document"*, **not** integrated into the base [[moq-transport]] draft. [[will-law|Will Law]] is invited to publish his [`wilaw/dts4moq`](https://github.com/wilaw/dts4moq) repo as the new WG document **`draft-ietf-moq-dts4moq`** at his earliest opportunity; the readout leaves the door open: *"it is possible that the document later reaches a state where it could be merged into MOQT."*

**[[cullen-jennings|Cullen Jennings]] June 6 challenges the readout**: *"How did you reach the conclusion that there is consensus this should be an extension instead of in the MoQT draft?"* This is a **180° turn from the trajectory the wiki tracked**: through late May the on-list votes (Will Law, Gwendal, Nokia, Ali Begen) favored **integration into MOQT**, and Cullen explicitly argued *against* a separate draft (May 27: *"I disagree it should be done as a separate draft… it should be worked as a PR that can be discussed in context"*), prompting wilaw's base-spec [PR #1638](https://github.com/moq-wg/moq-transport/pull/1638). The chairs' readout instead lands on a **separate document** (closer to Magnus Westerlund's original proposal), leaving PR #1638's base-spec integration path superseded-in-direction and Cullen as the dissenting voice on the *process* question. **Carry-forward**: `draft-ietf-moq-dts4moq` is invited but **not yet submitted** to Datatracker as of June 7; the June-12 "DTS Issues (Will)" slot is conditional on this outcome and may now reopen the extension-vs-base-spec question on the floor. (See [[interim-meetings]] for the full vote-tally history.)

## Tobbe ships MSF/CMSF catalog validator (CUE) — finds draft-01 bugs

[[tobbe-einarsson|Torbjörn Einarsson]] announces on `#moq` (June 5 10:44 CEST) a **catalog validator for [[moq-msf|MSF]]/[[moq-cmsf|CMSF]] draft-01**: *"I made a validator for MSF/CMSF catalogs based on the new draft-01. It found a number of issues in the drafts, but should be generally useful. Based on a schema in CUE with some extra code to generate user-friendly error messages."* — live at [moqlivemock.demo.osaas.io/msf-catalog-validator](https://moqlivemock.demo.osaas.io/msf-catalog-validator/), source at [Eyevinn/msf-catalog-validator](https://github.com/Eyevinn/msf-catalog-validator). The validator was built fast (4 PRs merged June 4-5: LOCMAF packaging + bitrate-not-required-for-non-A/V fix, web UI with examples + schema view + Prism highlighting, strict validation *against draft-01 definitions rather than examples*).

**The validator immediately produced spec errata**: Tobbe files **[moq-wg/msf PR #177](https://github.com/moq-wg/msf/pull/177)** *"Fix version in examples and minor typos in draft-01"* (+24/−24) and **[moq-wg/cmsf PR #23](https://github.com/moq-wg/cmsf/pull/23)** *"Fix version examples and minor typos in draft-01"* (+5/−5), both OPEN June 4. **Significance**: this is the first time a wiki-maintainer-built tool feeds errata directly back into the WG specs it validates — and it confirms the [[moq-transport|June-4 thesis]] that draft-01/draft-18 examples are carrying machine-detectable inconsistencies that an unhurried review would have caught. Tobbe's [[moqlivemock]] v0.11.0 + [[warp-player|Eyevinn/warp-player]] v0.11.0 (both released June 4) move Eyevinn's stack onto MSF/CMSF draft-01 catalogs, with [[moq-locmaf|LOCMAF]] 0.2 implemented alongside 0.1 in moqlivemock.

## Kota Yatagai debuts Moqtopus; interop spreadsheet → automated runner

On `#moq` June 4 16:44 CEST, **Kota Yatagai** announces **[Moqtopus](https://github.com/kota-yata/Moqtopus)** — *"a C++ client based on MsQuic for use in Unreal Engine. I'll finish the work needed to support draft-18 in time for the interop."* — a new game-engine-targeted MoQ client (Kota also authored the [[moqintosh|Moqintosh]] iOS client). Kota also asks whether the **MoQ interop spreadsheet** is still maintained (*"kota's moqtail is no longer chasing new drafts so I'll delete the record"*). **[[mike-english|Mike English]] confirms the automated [[interop-runner]] is intended to replace the spreadsheet** (*"we can be more precise and accurate about… exactly which versions of each implementation support what features"*), notes the initial test set was *"intentionally small"* and **more test cases are coming next week** (open to ordering suggestions), and points to a new `#moq-interop-runner` channel. [[alan-frindell|Alan Frindell]] asks *"Are there new test cases coming?"* — the answer being yes. This is the first explicit statement that the spreadsheet is being retired in favor of the runner, and that the runner's coverage will broaden right after London.

## thibmeu opens privacy-pass design issues

[[thibault-meunier|Thibault Meunier]] (Cloudflare; privacy-pass author) opens **2 issues on [moq-wg/privacy-pass](https://github.com/moq-wg/privacy-pass/issues)** June 5: **[#14](https://github.com/moq-wg/privacy-pass/issues/14)** *"MOqTokenChallenge should be base64 encoded"* and **[#15](https://github.com/moq-wg/privacy-pass/issues/15)** *"Find how to pass MoQTokenChallenge in reply to a SETUP closure without using ReasonPhrase"*. These are the **issuer-aware challenge-reply concerns** thibmeu raised in his May 30 review of cloudflare/moq-rs [PR #169](https://github.com/cloudflare/moq-rs/pull/169), now filed against the [[moq-privacy-pass|privacy-pass-auth]] draft itself — moving the challenge-reply wire question from cross-impl review into the WG draft's own issue tracker ahead of the June-12 Privacy Pass slot.

## moq-transport: EXPIRES + sharmafb editorial PRs merge; 3 new design issues

The June-2/3 normative work largely lands: **[PR #1640](https://github.com/moq-wg/moq-transport/pull/1640) EXPIRES (martinduke) MERGED** June 4, **sharmafb [PR #1645](https://github.com/moq-wg/moq-transport/pull/1645)/[#1648](https://github.com/moq-wg/moq-transport/pull/1648)/[#1649](https://github.com/moq-wg/moq-transport/pull/1649) all MERGED** June 4, **[PR #1476](https://github.com/moq-wg/moq-transport/pull/1476)** *"Delivery timeouts are both Track and Object Properties"* (afrind) **MERGED** June 5 (closes [#606](https://github.com/moq-wg/moq-transport/issues/606)). Tim Evens's [#1641](https://github.com/moq-wg/moq-transport/issues/1641) (PUBLISH_DONE wording) + martinduke's [#1639](https://github.com/moq-wg/moq-transport/issues/1639) (EXPIRES) auto-CLOSE; ianswett's **[PR #1451](https://github.com/moq-wg/moq-transport/pull/1451)** *"Allow multiple Subscriptions to a Track"* **CLOSED** June 6 (folded into the Concurrent Subscribe discussion). **3 new design issues OPEN**: **[#1650](https://github.com/moq-wg/moq-transport/issues/1650)** (afrind, *"Forward Handling SHOULD set Forward=1 upstream is too strong"*), **[#1651](https://github.com/moq-wg/moq-transport/issues/1651)** (martinduke, *"How does GROUP_ORDER interact with PUBLISH?"*), **[#1652](https://github.com/moq-wg/moq-transport/issues/1652)** (Kostya Vasilyev, *"SETUP - extensions negotiation"*). The fill-replacement [PR #1642](https://github.com/moq-wg/moq-transport/pull/1642) + DTS [PR #1638](https://github.com/moq-wg/moq-transport/pull/1638) remain OPEN into the Day-1 Joining-FETCH and SWITCH/DTS slots. **[[quiche-moq|google/quiche moqt]]** continues structural refactor June 5-6 (`8a11928a` + `6b6a9b74` factoring control-message queueing into a `MoqtControlMessageQueue` class; `f3ce1892` *"Support the 'has first object in the subgroup' bit in the subgroup header"*).

# Activity (June 3 06:00 UTC → June 4 06:00 UTC) — **draft-ietf-moq-cmsf-01 PUBLISHED on Datatracker June 3 (2nd WG draft to land in 2 days); LOCMAF Slack thread engages afrind + wilaw on initData carriage; sharmafb editorial sprint files 5 draft-18 issues/PRs in 18 min; openmoq/moqx paul-mondain CAT token PR #264 MERGES after 33 days; google/quiche moqt starts draft-19 wire prep (new varint, CLIENT/SERVER SETUP merge); moq-dev/moq ~12 merges incl. voice-AI latency range; 2 new external contribs (arielmol SCTE-35, vipyne AI-voice flush); interop 177/54/122/0 (−3 pass)**

**TL;DR**:
- **[[moq-cmsf|draft-ietf-moq-cmsf-01]] PUBLISHED on Datatracker June 3** by [[will-law|Will Law]] (Akamai) — **2nd MoQ WG draft revision in 2 days** (MSF -01 June 2 → CMSF -01 June 3). Final pre-submission clean-up was [moq-wg/cmsf PR #22](https://github.com/moq-wg/cmsf/pull/22) MERGED June 3 11:32 UTC *"Fix I-D nits"* (+7/−6). wilaw also posts "MSF updates" + "CMSF updates" announcement messages to the IETF MoQ mailing list — first per-spec author-led list updates from wilaw the wiki has tracked.
- **[[moq-locmaf|LOCMAF]] Slack thread engages afrind + wilaw on initData carriage**. [[tobbe-einarsson|Torbjörn Einarsson]] announces [LOCMAF -00](https://www.ietf.org/archive/id/draft-einarsson-moq-locmaf-00.html) at June 3 08:51 CEST citing msf draft-01's new `initData` catalog references + catalog compression as enablers; [[alan-frindell|afrind]] 18:13 CEST asks *"Have we considered init data as a track property?"*, then 20:06 CEST *"InitData as a separate subgroup?"*, then 22:00 CEST *"Only Publish the init subgroup in groups where it changed."*. [[will-law|wilaw]] 21:37 CEST responds *"we have added the init structure in MSF as an extensible scheme. if the init is not going to change for the life of the track, then we could add indeed add it as a defined track property… Currently we do not allow track init properties to change once publish has begun."* **5-reply thread surfaces 3-way design space**: catalog-referenced vs track-property vs per-group-subgroup. Promotes the stale [moq-msf Issue #153](https://github.com/moq-wg/msf/issues/153) ("initTrack does not work") to active design engagement within 12h of LOCMAF announcement.
- **moq-transport: sharmafb (Cisco) 5-item editorial sprint June 3 21:09-21:27 UTC** (18-minute window): **[PR #1645](https://github.com/moq-wg/moq-transport/pull/1645)** *"Change PUBLISH_OK = 0x1E in table"* (PUBLISH_OK was removed); **[Issue #1646](https://github.com/moq-wg/moq-transport/issues/1646)** *"Application-specific property codepoints conflict"* (§2.5 reserves 0x38-0x3F vs §15.8 reserves 0x78-0x7F); **[Issue #1647](https://github.com/moq-wg/moq-transport/issues/1647)** *"TIMESTAMP and SUBGROUP_DELIVERY_TIMEOUT have same value"*; **[PR #1648](https://github.com/moq-wg/moq-transport/pull/1648)** *"Soften one mandatory response for a REQUEST_UPDATE"*; **[PR #1649](https://github.com/moq-wg/moq-transport/pull/1649)** *"Modify text about PUBLISH_DONE on a control stream"* (companion to Tim Evens's [#1641](https://github.com/moq-wg/moq-transport/issues/1641)). Plus **[Issue #1644](https://github.com/moq-wg/moq-transport/issues/1644)** by kixelated *"Duplicate Track Properties on repeated SUBSCRIBE_OK / FETCH_OK"* — same gap that moq-lite-05 PR #1609 already addresses via TRACK_INFO Track Stream. **draft-18 errata-style issues now outpace design-issue resolution**: 5 of 5 sharmafb items are wire-table-vs-text/codepoint-collision-style. **[[google-quiche|google/quiche moqt]] starts draft-19 wire prep**: vasilvv 3 commits June 3 — `4096d2e3` *"Switch MOQT to using new varint format"*, `8427f949` *"Use delta encoding for Subscribe Filters of type Absolute Range"*, `96c9a9c0` *"Merge CLIENT_SETUP and SERVER_SETUP into a single control message"*. First sustained draft-19 wire-prep work the wiki has tracked from any impl.
- **Implementations**: **[[moq-dev|moq-dev/moq]] ~12 merges + 7 OPEN cycle** (June 3 ~05:00 → June 4 ~05:00 UTC, all kixelated unless noted). Highlights: **[PR #1620](https://github.com/moq-dev/moq/pull/1620) OPEN** *"feat(watch): latency range with buffered playback"* — reframes playback latency as a range `[min, max]` unifying live and buffered playback into one mechanism, **unblocks voice-AI/TTS use cases** ([pipecat-ai/pipecat#4629](https://github.com/pipecat-ai/pipecat/pull/4629)) where the response is written *faster than real-time*. **2 new external contributors in 24h**: **arielmol [PR #1617](https://github.com/moq-dev/moq/pull/1617) OPEN** SCTE-35 from MPEG-TS into a new `data` catalog track (first broadcast-ad-marker plumbing in moq-dev/moq); **vipyne [Issue #1614](https://github.com/moq-dev/moq/issues/1614) + [PR #1615](https://github.com/moq-dev/moq/pull/1615) OPEN** AudioProducer Python flush/cancel for AI voice agent interruption use cases. Together PR #1620 + #1615 + #1617 = **3 PRs adding new use-case verticals in 24h**: AI-voice playback, AI-voice ingest, broadcast-ad-marker carriage. Plus watch refactor (PR #1591 Computed signals MERGED, PR #1592 inputs-vs-outputs MERGED, PR #1588 stop downloads when muted/paused/off-screen), CI release pipeline shakedown (PR #1619/#1622/#1623), moq-net per-control-stream task (PR #1621), apt keyring rename (PR #1611). **[[openmoq|openmoq/moqx]]**: **paul-mondain CAT token [PR #264](https://github.com/openmoq/moqx/pull/264) MERGED June 3 22:57 UTC** after 33 days OPEN (+1807/−13, 20f) — first openmoq/moqx external-contrib-driven auth path now landed in `main`. Plus **Tim Evens [PR #376](https://github.com/openmoq/moqx/pull/376) + [PR #377](https://github.com/openmoq/moqx/pull/377) MERGED** (Debian bookworm + macOS Apple Clang 21); **gmarzot [PR #370](https://github.com/openmoq/moqx/pull/370) MERGED** folly XLOG. **afrind opens 3 new issues**: **[#380](https://github.com/openmoq/moqx/issues/380)** standard token type values; **[#381](https://github.com/openmoq/moqx/issues/381)** auth for MOQT peers; **[#382](https://github.com/openmoq/moqx/issues/382)** Draft-18 updates for relay behavior (priority-ranked sub-issues = draft-18 catch-up backlog scoped). **[[mondain]]/moqxr**: **[PR #14](https://github.com/mondain/moqxr/pull/14) OPEN** by **TilsonJoji (new external contributor)** *"Add SRT MPEG-TS ingest with fMP4 repackaging and MoQ object publishing"* — first MoQ-side SRT ingest path in the openmoq orbit. **[[quiche-moq|google/quiche moqt]]**: vasilvv 3 draft-19 wire-prep commits (see above). **[[moq-rs|cloudflare/moq-rs]]**: PR #167 + PR #171 untouched. **[[moqtail|moqtail/moqtail]]**, **[[moq-js|video-dev/moq-js]]** (PR #72 OPEN), **[[imquic|meetecho/imquic]]** (PR #27 OPEN, updated June 3 17:14 UTC), **[[moqintosh|t-gazzy/Moqintosh]]**, **[[moqlivemock]]** (PR #90 dependabot quic-go bump), Eyevinn/warp-player, Eyevinn/moqtransport, **[[quiche-moq|birneee/quiche_moq]]**, Quicr/cat-token all quiet.
- **Interop**: **177 / 54 / 122 / 0** at [2026-06-04 00:55:39 UTC](https://englishm.github.io/moq-interop-runner/results/2026-06-04_005539/report.html) — **−3 pass vs June 3** (57 → 54, 32.2% → 30.5%, **−1.7pp**), reverses Jun 3's +6 jump symmetrically; skip drops 1 → 0; **17-day cadence streak (new longest the wiki has tracked)**. Version breakdown still **0 at target · 0 ahead · 177 behind** — impl-registration drift unchanged. **Slack signal June 2 09:18 UTC by Yu You (Nokia)**: *"we are in the process to host a remote relay for the interop. we have the support of v17 and v18 (basic ones with current interop test cases) for testing"* — first announced impl-side v18 endpoint, would close the 0-at-target gap if registered. **London hackathon 5 days away**.

## draft-ietf-moq-cmsf-01 PUBLISHED — 2nd WG draft in 2 days

[[will-law|Will Law]]'s CMSF -01 lands on Datatracker June 3, **187 days after -00** (Dec 2025). The 2-day MSF→CMSF publication cluster aligns the two streaming-format specs for the **London Day-2 35-min MSF/CMSF Will Law slot**.

**Mailing-list announcements June 3** by wilaw:
- *"MSF updates"* — companion narrative to MSF -01 (the [134-day-saga draft that landed June 2](#draft-ietf-moq-msf-01-published-—-134-day-saga-closes))
- *"CMSF updates"* — companion narrative to CMSF -01

First wilaw-authored per-spec mailing-list update tracked by the wiki — historically he announces draft revisions via Slack rather than email. The June 3 list posts pair CMSF -01 with MSF -01 as a coordinated London-cycle update.

## LOCMAF Slack thread — initData carriage as 3-way design space

Under Tobbe's [[moq-locmaf|LOCMAF -00]] announcement on `#moq` June 3 08:51 CEST, **5 substantive replies through 22:00 CEST** form the first cross-author engagement on the new individual draft:

| When | Author | Substance |
|------|--------|-----------|
| 08:51 CEST | [[tobbe-einarsson|Torbjörn Einarsson]] | Announcement of LOCMAF -00; cites msf draft-01 `initData` references + catalog compression as enablers for the reduced-complexity v0.2 design |
| 18:13 CEST | [[alan-frindell|afrind]] | *"Have we considered init data as a track property?"* |
| 19:14 CEST | Tobbe | Replies: msf -01 introduces `initData` type currently only `"inline"`, but extensible to a track reference; links [moq-msf Issue #153](https://github.com/moq-wg/msf/issues/153) |
| 20:06 CEST | afrind | *"InitData as a separate subgroup?"* |
| 21:37 CEST | [[will-law|wilaw]] | *"As Torbjorn mentioned, we have added the init structure in MSF as an extensible scheme. if the init is not going to change for the life of the track, then we could add indeed add it as a defined track property. Adding it as a subgroup would be wasteful, as you would have to continually re-send it. Currently we do not allow track init properties to change once publish has begun."* |
| 22:00 CEST | afrind | *"Only Publish the init subgroup in groups where it changed."* |

The thread **surfaces 3-way design space for initData carriage**:
1. **Catalog-referenced** (msf -01's `inline` type extended to a track reference) — Tobbe's interpretation
2. **Track property** (afrind suggestion, wilaw seconds for steady-state immutability)
3. **Per-group subgroup with only-when-changed delivery** (afrind suggestion, key-rotation case)

**Significance**: First substantive cross-author engagement on LOCMAF, **counter-signal to the "individual drafts sit with no engagement" pattern**. Promotes the stale [moq-msf Issue #153](https://github.com/moq-wg/msf/issues/153) ("initTrack does not work") to active design engagement. Likely surfaces at the **London Day-2 35-min MSF/CMSF Will Law slot** as a structured design discussion of init carriage that also affects [[moq-cmsf|CMSF]] (full CMAF chunks) and [[moq-loc|LOC]] (self-initializing per-object).

## sharmafb 5-item draft-18 editorial sprint

[[suhas-sathyanarayana|sharmafb]] (Cisco; not to be confused with Suhas Nandakumar) files **5 contributions in 18 minutes June 3 21:09-21:27 UTC**, all draft-18 errata-style:

| Item | Subject |
|------|---------|
| [PR #1645](https://github.com/moq-wg/moq-transport/pull/1645) | *"Change PUBLISH_OK = 0x1E in table"* — PUBLISH_OK message type was removed but its table row remained |
| [Issue #1646](https://github.com/moq-wg/moq-transport/issues/1646) | *"Application-specific property codepoints conflict"* — §2.5 reserves 0x38-0x3F + 0x3800-0x3FFF for application use, but §15.8 reserves 0x78-0x7F. Direct codepoint collision |
| [Issue #1647](https://github.com/moq-wg/moq-transport/issues/1647) | *"TIMESTAMP and SUBGROUP_DELIVERY_TIMEOUT have same value"* — §15.8 codepoint collision |
| [PR #1648](https://github.com/moq-wg/moq-transport/pull/1648) | *"Soften one mandatory response for a REQUEST_UPDATE"* — §10.9.1 already allows coalesced failed updates to produce only one REQUEST_ERROR |
| [PR #1649](https://github.com/moq-wg/moq-transport/pull/1649) | *"Modify text about PUBLISH_DONE on a control stream"* — companion to Tim Evens's [Issue #1641](https://github.com/moq-wg/moq-transport/issues/1641) |

**Combined with [Issue #1644](https://github.com/moq-wg/moq-transport/issues/1644)** by kixelated June 3 15:55 UTC *"Duplicate Track Properties on repeated SUBSCRIBE_OK / FETCH_OK"* (the moq-transport-side surfacing of the same gap that moq-lite-05 PR #1609 already addresses with TRACK_INFO Track Stream `0x6`), the **draft-18 errata + design issue load now stands at 14 active items** (6 normative PRs OPEN + 8 design issues OPEN) heading into London Day-1 0900-1045 "MOQT Issues" 180-min slot — **infeasible to ship all 6 PRs on the floor**; chairs will likely defer pure-editorial items (PUBLISH_OK code change [#1645](https://github.com/moq-wg/moq-transport/pull/1645) + PUBLISH_DONE wording [#1649](https://github.com/moq-wg/moq-transport/pull/1649)) to editor discretion, leaving DTS + EXPIRES + Fill as the substantive merges-on-floor candidates.

## google/quiche moqt starts draft-19 wire prep in earnest

**3 vasilvv commits June 3** (03:08 — 10:58 UTC) all directly altering MOQT wire shape:

| SHA | When | Subject |
|-----|------|---------|
| `4096d2e3` | 03:08 UTC | *"Switch MOQT to using new varint format"* — draft-19 wire bump |
| `8427f949` | 03:22 UTC | *"Use delta encoding for Subscribe Filters of type Absolute Range"* — wire compaction |
| `96c9a9c0` | 10:58 UTC | *"Merge CLIENT_SETUP and SERVER_SETUP into a single control message"* — handshake simplification |

Plus martinduke `52de014c` June 2 22:45 UTC (MoqtResponseCallback MessageParameters in REQUEST_OK) + `c25d5258` June 3 15:30 UTC (ASAN fix).

**First sustained draft-19 wire-prep work** the wiki has tracked from any impl — up until now quiche moqt commits since May 14 have been refactor work (stream-class factoring + subscription publisher extraction). With vasilvv pivoting to wire-format changes, **the implementation track for draft-19 is now open** — moq-transport spec text changes for these will likely surface at London.

## openmoq/moqx — PR #264 paul-mondain CAT token MERGED after 33 days OPEN

**[paul-mondain PR #264](https://github.com/openmoq/moqx/pull/264) MERGED June 3 22:57 UTC** — the largest single moqx merge so far (+1807/−13, 20 files). Adds **opt-in CAT-style token authentication** with per-service auth config block, internal signed CWT/HMAC token verifier for `exp`/`moqt`/`moqt-reval` claims, AUTHORIZATION_TOKEN credential validation, and authorization checks on PUBLISH_NAMESPACE/PUBLISH/SUBSCRIBE_NAMESPACE/SUBSCRIBE/FETCH/TRACK_STATUS. Preserves existing relay peering token behavior.

**Cross-impl auth status June 4**: 3 cross-impl auth-relay-path PRs were open in parallel — openmoq/moqx PR #264 (paul-mondain CAT, OPEN since May 1) + cloudflare/moq-rs PR #169 (englishm-cloudflare AuthHook design) + cloudflare/moq-rs PR #171 (suhasHere C4M implementation). **PR #264 lands first**; PRs #169/#171 still OPEN and untouched June 3-4. Combined with [PR #286](https://github.com/openmoq/moqx/pull/286) (paul-mondain Catapult submodule wiring, stacked on #264) still OPEN, the openmoq/moqx auth story still has one more stack-on-top to land before complete.

**afrind opens 3 new issues June 3 23:09-23:43 UTC**:

- **[Issue #380](https://github.com/openmoq/moqx/issues/380)** *"auth: use standard token type values"* — *"Now we support cat4moq, but allow the operator to configure the token type. We should use whatever the spec defines."* (filed ~10 min after PR #264 merge)
- **[Issue #381](https://github.com/openmoq/moqx/issues/381)** *"auth: how does it work for MOQT peers?"* — relay-peer auth bypass / inter-relay token presentation question
- **[Issue #382](https://github.com/openmoq/moqx/issues/382)** *"Draft-18 updates for relay behavior"* — priority-ranked sub-issues including NAMESPACE_TOO_LARGE error+reset enforcement, SUBSCRIBE_NAMESPACE stream closure semantics, plus *"see what's coming from upstream into moxygen/relay/MoQRelay and moxygen/relay/MoQCache -- we likely need to port these over"*. **First openmoq/moqx draft-18 catch-up backlog scoped as a tracking issue**.

## TilsonJoji emerges at mondain/moqxr — SRT MPEG-TS ingest

**[mondain/moqxr PR #14](https://github.com/mondain/moqxr/pull/14) OPEN by TilsonJoji** (new external contributor; OPEN June 1, last updated June 3 17:51 UTC) *"Add SRT MPEG-TS ingest with fMP4 repackaging and MoQ object publishing"* — first MoQ-side SRT ingest path in the openmoq orbit. Parallel to [moq-dev/moq PR #1587](https://github.com/moq-dev/moq/pull/1587) (MPEG-TS over MoQ via mpeg2ts crate) + [mondain/moq2ts](https://github.com/mondain/moq2ts) (MSFTS demonstrator). **The mondain ecosystem now spans 3 MPEG-TS-adjacent paths**: moqxr (SRT MPEG-TS ingest), moq2ts (MSFTS demonstrator), and the moqxr-as-SDK link target.

## moq-dev/moq voice-AI / TTS use case lands at the player

**[PR #1620](https://github.com/moq-dev/moq/pull/1620) OPEN by kixelated** *"feat(watch): latency range with buffered playback"* (+726/−75, 14 files) **reframes playback latency in `@moq/watch` as a range `[min, max]`**. The PR body opens:

> Reframes playback latency in `@moq/watch` as a **range** `[latency-min, latency-max]`, unifying live (minimize-latency) and buffered playback into a single mechanism. This unblocks voice-AI / TTS use cases (e.g. [pipecat-ai/pipecat#4629](https://github.com/pipecat-ai/pipecat/pull/4629)) where a response is written *faster than real-time* with future timestamps and should be buffered and played at the encoded pace, rather than the player aggressively minimizing latency and skipping ahead.

> Latency was never really a single point — it's a range, and "minimize latency" is just the degenerate case where the range collapses (`max == min`).

The sync reference (wall-clock anchor) is re-anchored (skipped forward) **only when** keeping it would push latency past the bounds. Pairs with **[PR #1615](https://github.com/moq-dev/moq/pull/1615)** by **vipyne (new external contributor)** addressing the ingest side: AudioProducer (Python) flush/cancel primitive for real-time interruption (AI voice agents). Together with **[PR #1617](https://github.com/moq-dev/moq/pull/1617)** by **arielmol (new external contributor)** *"Ingest SCTE-35 from MPEG-TS into a data catalog track"* (broadcast-ad-marker plumbing), moq-dev/moq adds **3 new use-case verticals in 24h**: AI-voice playback (PR #1620), AI-voice ingest (PR #1615), broadcast-ad-marker carriage (PR #1617).

## Yu You (Nokia) announces v17+v18 remote relay for interop

[[yu-you|Yu You]] (Nokia) Slack `#moq` June 2 09:18 CEST: *"we are in the process to host a remote relay for the interop. we have the support of v17 and v18 (basic ones with current interop test cases) for testing."* — **first impl-side v18 endpoint announcement** as pre-London infrastructure addition. If registered with the interop runner, this would be the **first impl-registered v18** entry, finally closing the runner's 0-at-target gap. Pairs with Yu You's earlier May 29 mailing-list YES vote on DTS adoption (with measured Nokia implementation benefit numbers) as continued Nokia engagement across spec consensus + production deployment.

# Activity (June 2 06:00 UTC → June 3 06:00 UTC) — **draft-ietf-moq-msf-01 PUBLISHED on Datatracker June 2 (Day +134 saga closes); draft-einarsson-moq-locmaf-00 NEW individual draft by Tobbe + Hugo Björs; afrind opens transport [PR #1642](https://github.com/moq-wg/moq-transport/pull/1642) replacing Joining Fetch with Subscription Fill; Tim Evens (Cisco) emerges as new cross-repo contributor (transport Issue #1641 + openmoq/moqx PRs #376/#377); moq-dev/moq ~14 merges incl /health endpoint + moq-lite-05 wire-feature triple + MPEG-TS fMP4 close-out; interop 177/57/119/1 new May+June high 32.2% (+6 pass)**

**TL;DR**:
- **[[moq-msf|draft-ietf-moq-msf-01]] PUBLISHED June 2 on Datatracker** by [[will-law|Will Law]] (Akamai) + [[suhas-nandakumar|Suhas Nandakumar]] (Cisco) — first MSF revision in **134 days** (since -00 Jan 19 2026); ends the 5-day slippage saga of wilaw's May 27 Slack *"Friday"* pledge. Final pre-submission clean-up was [moq-wg/msf PR #176](https://github.com/moq-wg/msf/pull/176) by wilaw (June 2 11:18 UTC, −7/1f, *"Remove unused RFC references and SCTE35 entry"*). Companion **[moq-wg/cmsf PR #21](https://github.com/moq-wg/cmsf/pull/21)** (+69/−20, MERGED 13:54 UTC, closes [#20](https://github.com/moq-wg/cmsf/issues/20)) updates CMSF's MSF reference from -00 → -01.
- **[[moq-locmaf|draft-einarsson-moq-locmaf-00]] NEW individual draft submitted June 2** by **[[tobbe-einarsson|Torbjörn Einarsson]] (Eyevinn) + Hugo Björs (KTH)** — *"Low Overhead CMAF for Media over QUIC (LOCMAF)"* — compact wire format carrying CMAF chunk metadata as tagged fields while preserving sample data unchanged; receiver reconstructs functionally equivalent CMAF chunks for MSE/EME playback. **First IETF artifact from the wiki maintainer**. Slots between [[moq-loc|LOC]] (strips fMP4 overhead but loses MSE/EME) and [[moq-cmsf|CMSF]] (keeps CMAF semantics at full chunk size) — compact-fMP4 carrier the player reconstructs to a CMAF chunk in browser memory before handing to MSE.
- **[moq-transport PR #1642](https://github.com/moq-wg/moq-transport/pull/1642) OPEN June 2 17:01 UTC by [[alan-frindell|afrind]]** *"Replace Joining Fetch with Subscription Fill, add Current Group"* (+188/−148, 1f) — **structural redesign**: Joining Fetch removed entirely; new subscription filter types **AbsoluteStartFill (`0x5`), AbsoluteRangeFill (`0x6`), CurrentGroup (`0x7`), RelativeStartFill (`0x8`)**; new FillDescending (`0x3`) group order; new Current Group Delivery + Fill Semantics sections; publisher opens single fill fetch stream (FETCH_HEADER reusing subscription Request ID) for past objects while delivering current/future via subscribe subgroups/datagrams. **Replaces [[ian-swett|ianswett]]'s [PR #1627](https://github.com/moq-wg/moq-transport/pull/1627)** (OPEN since May 3, ianswett auto-CLOSES it June 3 00:16 UTC, 30 days OPEN). Plus 2 new draft-18 design issues — **[Issue #1641](https://github.com/moq-wg/moq-transport/issues/1641)** by Tim Evens (Cisco) on PUBLISH_DONE control-stream-vs-request-stream wording (afrind reply *"Request streams are considered 'control' streams in most of the text, but we can probably crisp this up"*); **[Issue #1643](https://github.com/moq-wg/moq-transport/issues/1643)** by afrind on bidi-stream FIN semantics. **London Day-1 0900-1045 MOQT Issues 180-min slot now has 3 normative-text deliverables (DTS [PR #1638](https://github.com/moq-wg/moq-transport/pull/1638) + EXPIRES [PR #1640](https://github.com/moq-wg/moq-transport/pull/1640) + Fill [PR #1642](https://github.com/moq-wg/moq-transport/pull/1642)) + 4 design-issue threads** — will require triage.
- **Implementations**: **[[moq-dev|moq-dev/moq]] another ~14-merge cycle** (June 2 20:00 UTC → June 3 04:00 UTC, all kixelated): **[PR #1604](https://github.com/moq-dev/moq/pull/1604) `/health` load-shedding endpoint** (+905/−5, 11f, first explicit production-CDN feature); **moq-lite-05 wire-feature triple** ([PR #1595](https://github.com/moq-dev/moq/pull/1595) MERGED Frame Start in FETCH + [PR #1601](https://github.com/moq-dev/moq/pull/1601) OPEN TrackConsumer::fetch + [PR #1609](https://github.com/moq-dev/moq/pull/1609) OPEN TRACK_INFO Track Stream `0x6`); **MPEG-TS fMP4 export close-out** ([PR #1590](https://github.com/moq-dev/moq/pull/1590) out-of-band avc1/hvc1 + [PR #1593](https://github.com/moq-dev/moq/pull/1593) AAC esds in fMP4); **API ergonomics** ([PR #1606](https://github.com/moq-dev/moq/pull/1606) ergonomic `subscribe(None)`); **release + dependency wave** (PR #1607 0.12.7 + PR #1596/#1598/#1599/#1602/#1603). moq-lite-05 now has **5 wire features in 7 days** (deflate + AnnounceOk + Frame Start + TrackConsumer::fetch + TRACK_INFO Track Stream) — the most active wire-protocol evolution venue in the ecosystem. **[[openmoq|openmoq/moqx]]**: **Tim Evens (Cisco) emerges as new external contributor** — [PR #376](https://github.com/openmoq/moqx/pull/376) OPEN Debian bookworm + CPM (+92/−31, 5f); [PR #377](https://github.com/openmoq/moqx/pull/377) OPEN macOS Apple Clang 21 fmt workaround (+21/−6, 2f). Same TimEvens filing transport Issue #1641 — cross-repo emergence Day +1 of activity. **3rd Cisco contributor reaching mainline moq-wg artifacts** alongside Suhas Nandakumar + Mo Zanaty. **[[moq-rs|cloudflare/moq-rs]]**: PR #167 minor refresh June 3 05:37 UTC; #169/#170/#171 untouched. **[[mondain]]**, **[[moqtail|moqtail/moqtail]]**, **[[moq-js|video-dev/moq-js]]** (PR #72 OPEN), **[[imquic|meetecho/imquic]]** (PR #27 OPEN), **[[google-quiche|google/quiche moqt]]**, **[[quiche-moq|birneee/quiche_moq]]**, **[[moqintosh|t-gazzy/Moqintosh]]**, **[[moqlivemock]]**, Eyevinn/warp-player, Eyevinn/moqtransport all quiet.
- **Interop**: **177 / 57 / 119 / 1** at [2026-06-03 00:56:06 UTC](https://englishm.github.io/moq-interop-runner/results/2026-06-03_005606/report.html) — **+6 pass vs June 2** (51 → 57, 28.8% → 32.2%, **+3.4pp**), **first 32%+ pass rate since cadence recovery May 19**, largest single-day pass-count jump since the May 19 cadence recovery; **16-day cadence (new longest streak the wiki has tracked)**. Version breakdown still **0 at target · 0 ahead · 177 behind** — impl-registration drift unchanged; the +6 jump comes from **better cross-version compatibility behavior** not registration-side closure. **London hackathon 6 days away**.

## draft-ietf-moq-msf-01 PUBLISHED — 134-day saga closes

[[will-law|Will Law]]'s May 27 Slack pledge *"I plan to release a new draft this Friday ahead of the London interop"* (May 29 UTC) **finally lands on Datatracker June 2** after 4 days of slippage:

| Date | Status | Notes |
|------|--------|-------|
| 2026-05-27 12:30 UTC | Pledge | wilaw Slack: *"this Friday"* (May 29) |
| 2026-05-29 EOD | **Day +130, slip 1** | No submission |
| 2026-05-30 EOD | **Day +131, slip 2** | No submission |
| 2026-05-31 EOD | **Day +132, slip 3** | No submission |
| 2026-06-01 EOD | **Day +133, slip 4** | No submission |
| 2026-06-02 ~13:54 UTC | **Day +134, submitted** | -01 lands; CMSF reference bump merged shortly after |

**The 5-day slippage was real but contained**: only ~3 trailing editorial PRs landed between announced ETA (May 29) and actual submission (June 2): PR #173 normative refs (May 29), PR #174 timestamp rounding (May 29), PR #171 parent namespace (May 30), PR #159/#165/#175 (June 1 burst), PR #176 RFC refs clean-up (June 2). The longer cycle absorbed Issue #163 version-string fix (PR #175 June 1) + RFC reference clean-up (PR #176 June 2) that would otherwise have needed a -02.

**MSF -01 cadence**: 134 days from -00 (Jan 19) to -01 (June 2). **Sets MSF's publication tempo as ~4 months per revision** — slower than moq-transport (-17 → -18 in 49 days) but consistent with MSF being a packaging-format spec rather than a wire-protocol spec.

**18 wilaw events May 24-June 2** (largest single-contributor MSF push since draft adopted) all absorbed into -01:
- PR #157 (suhasHere group numbering)
- PR #159 (suhasHere catalog compression)
- PR #165 (wilaw bitrate properties + mandatory audio/video fields)
- PR #166 (wilaw typed-object initDataList; Tobbe's design adopted)
- PR #167 (wilaw targetBuffer; closes kixelated's Issue #150)
- PR #168 (wilaw catalog object specs + numbering)
- PR #171 (wilaw parent namespace for clone tracks)
- PR #173 (wilaw normative reference update)
- PR #174 (wilaw timestamp rounding)
- PR #175 (wilaw version-string)
- PR #176 (wilaw RFC refs + SCTE35 removal)

## draft-einarsson-moq-locmaf-00 — First IETF artifact from the wiki maintainer

[[tobbe-einarsson|Torbjörn Einarsson]] (Eyevinn Technology) + Hugo Björs (KTH) submit **draft-einarsson-moq-locmaf-00** *"Low Overhead CMAF for Media over QUIC (LOCMAF)"* June 2 on Datatracker. Per abstract: *"LOCMAF defines a compact wire format that enables streaming low-latency CMAF media over MoQ Transport with significantly reduced per-object overhead. The format carries CMAF chunk metadata as tagged fields while preserving sample data unchanged, with the receiver reconstructing functionally equivalent CMAF chunks suitable for MSE/EME playback pipelines."*

**Design position**: slots between LOC (lean container, no MSE/EME compat) and CMSF (full CMAF chunks). LOCMAF's distinguishing choice: **carry CMAF chunk metadata as tagged fields**, **preserve sample data unchanged**, **reconstruct CMAF chunk receiver-side** — transparent to MSE/EME consumers (the player still sees standard CMAF chunks) while removing redundant box headers from the wire.

**Motivation**: Eyevinn's existing CMAF-based pipeline (HLS/DASH origins + low-latency CMAF chunked encoding) needs a MoQ wire shape that doesn't force re-architecting the player-side MSE/EME glue. LOCMAF preserves that. Also resolves Tobbe's May 23 [moq-wg/msf Issue #153](https://github.com/moq-wg/msf/issues/153) Point 4 (*"AVC3 doesn't resolve the mid-stream-change question because Safari (notably for FairPlay DRM) requires `avc1`/`hvc1` sample entries"*) by allowing parameter sets out-of-band as tagged fields.

**See** [[moq-locmaf|the new wiki page for moq-locmaf]] for details.

## afrind PR #1642 — Joining Fetch removed, Subscription Fill introduced

afrind's [PR #1642](https://github.com/moq-wg/moq-transport/pull/1642) (+188/−148, 1f) **structurally redesigns MOQT's past-object retrieval**:

**Removed**:
- Joining Fetch types
- Joining Fetches section
- Joining Fetch Range Calculation
- Joining Location
- INVALID_JOINING_REQUEST_ID error code

**Added** (new subscription filter types):
- AbsoluteStartFill (`0x5`)
- AbsoluteRangeFill (`0x6`)
- CurrentGroup (`0x7`)
- RelativeStartFill (`0x8`)
- FillDescending (`0x3`) group order (descending for fill, ascending for subscribe)

**Added** (new sections):
- **Current Group Delivery** — publisher subgroup ordering + relay object accounting requirements, applies to any filter covering current group
- **Fill Semantics** — defines fill fetch stream behavior

**Modified**:
- Standalone Fetch fields inlined directly into FETCH wire format
- LARGEST_OBJECT serves as fill boundary in SUBSCRIBE_OK
- FILL_TIMEOUT extended to apply in SUBSCRIBE messages with fill filter types
- REQUEST_UPDATE with a fill filter type opens a new fill fetch stream using the REQUEST_UPDATE's Request ID
- Fill filter types + CurrentGroup disallowed in PUBLISH_OK (stale LARGEST_OBJECT); recommends `forward=0` + REQUEST_UPDATE pattern instead

**Publisher behavior**: opens a single fill fetch stream (FETCH_HEADER reusing the subscription's Request ID) for past objects while delivering current/future via subscribe subgroups/datagrams.

**Replaces [[ian-swett|ianswett]]'s [PR #1627](https://github.com/moq-wg/moq-transport/pull/1627)** *"SUBSCRIBE with Joining Fetch"* OPEN May 3 → CLOSED June 3 00:16 UTC (30 days OPEN). The architectural simplification (one filter dimension instead of two request types) and FillDescending group order directly answer ianswett's [Issue #1614](https://github.com/moq-wg/moq-transport/issues/1614) "(JOINING) FETCH + SUBSCRIBE prioritization".

## Tim Evens (Cisco) emerges as new cross-repo contributor

Tim Evens files **3 contributions across 2 repos within ~18h June 2 06:19 UTC → June 3 05:09 UTC**:

| Repo | PR/Issue | When | Subject |
|------|----------|------|---------|
| moq-wg/moq-transport | [Issue #1641](https://github.com/moq-wg/moq-transport/issues/1641) | June 2 06:19 UTC | *"Publish DONE, control stream or request stream?"* (draft-18 wording inconsistency) |
| openmoq/moqx | [PR #376](https://github.com/openmoq/moqx/pull/376) | June 2 23:42 UTC | *"Fix Debian bookworm builds and switch deps to CPM"* (+92/−31, 5f) |
| openmoq/moqx | [PR #377](https://github.com/openmoq/moqx/pull/377) | June 3 05:09 UTC | *"fix macOS deps build with Apple Clang 21+ and tidy sanitizer flags"* (+21/−6, 2f) |

**Cisco footprint across MoQ now spans 3 named individuals + 2 implementations + 4 specs**:

| Contributor | Specs | Implementations |
|-------------|-------|----------------|
| Suhas Nandakumar | cmsf, msf, secure-objects, privacy-pass | cloudflare/moq-rs (PR #167 + #171) |
| Mo Zanaty | loc (draft author), agenda | — |
| Tim Evens | moq-transport draft-18 design (#1641) | openmoq/moqx (#376, #377) |

**Structurally the most distributed corporate presence in the MoQ ecosystem.** Tim Evens's emergence in the same week as the multi-thread sprint stack (PR #361-#365 OPEN) + Suhas's C4M AuthHook (PR #171 OPEN) means **multi-author multi-corporation collaboration on openmoq/moqx is now visible in main-branch PR list** — distinct from the kixelated-solo pattern at moq-dev/moq.

## moq-dev/moq operational milestone — `/health` endpoint

[PR #1604](https://github.com/moq-dev/moq/pull/1604) (+905/−5, 11f) adds an unauthenticated `GET /health` to moq-relay's existing web server:

- **Returns**: `200 ok` when every configured threshold passes; `503 overloaded` + one plain-text line per breached threshold when any threshold breaches
- **No thresholds configured**: pure liveness probe
- **Metrics**: cross-platform [`sysinfo`](https://crates.io/crates/sysinfo) crate; load-average flag Unix-only
- **Config** under `[web.health]` with matching `--web-health-*` flags + `MOQ_WEB_HEALTH_*` env vars:
  - `cpu` — global CPU usage (`75` or `75%`)
  - `ram` — memory usage (`80%` of total or `32GB`/`32GiB` absolute used)
  - `rx` / `tx` — aggregate throughput (unit required; lowercase `b` = bits, uppercase `B` = bytes)

**First explicit production-CDN load-shedding feature** in any tracked MoQ implementation. Pairs with PR #1571 May 31 (externalized `--cluster-connect-api` peer list) + PR #1574 May 31 (per-auth-root presence-based billing). Together: **moq-dev/moq is now structurally a production CDN substrate** with load-balancer integration, peer-list externalization, presence billing, and the moq-pro pattern consolidated.

## moq-lite-05 wire-feature triple — pace continues

Counting from PR #1518 (Lite05Wip variant May 27) the wire-feature additions in 7 days are:

1. **PR #1531** May 28 — `Compression` codec field in SUBSCRIBE_OK (deflate compression)
2. **PR #1573** June 1 — `AnnounceOk` message (responder origin + initial active count)
3. **PR #1595** June 3 — `Frame Start (i)` field in FETCH (resume mid-group)
4. **PR #1601 OPEN** June 3 — `TrackConsumer::fetch` first-class single-group FETCH
5. **PR #1609 OPEN** June 3 — `TRACK_INFO` Track Stream `0x6` (immutable props off SUBSCRIBE_OK)

**All gated on `Lite05Wip`** so default ALPN/Versions don't advertise — opt-in for testing without disrupting Lite04 default negotiation.

**moq-lite-05 is structurally the most active wire-protocol evolution venue in the MoQ ecosystem** — 5 wire features in 7 days outpaces moq-transport's draft-18 → draft-19 prep both in feature count and merge cadence.

---

# Activity (June 1 06:00 UTC → June 2 06:00 UTC) — **wilaw [moq-transport PR #1638 DTS](https://github.com/moq-wg/moq-transport/pull/1638) OPEN as PR-against-transport-18 (consensus-decided design lands as base-spec PR per Cullen's preference); 3 MSF PRs MERGED (compression #159, bitrate #165, string-version #175) while MSF -01 still NOT submitted Day +134; moq-dev/moq 14 merges + 6 OPEN including MPEG-TS bridge PR #1587 (matches MSFTS/moq2ts) + moq-lite-05 AnnounceOk MERGED + per-track timescale (long-pending #1439) MERGED + qmux version mapping (long-pending #1513) MERGED + subscribe_track async (long-pending #1540) MERGED; cloudflare/moq-rs PR #171 AuthHook + C4M implementation OPEN by suhasHere (+2090/-15, implementation of design proposal #169); mondain/moq2ts MSFTS demonstrator publicly announced on Slack with cross-platform CI build workflow; Martin Duke asks #moq if anyone wants draft-16 interop at London, Alan Frindell + Mike English confirm 14/16/18 multi-version support; google/quiche 2 commits (FETCH stream + RemoteTrack refactor); openmoq/moqx afrind multi-thread relay sprint continues with 5 OPEN PRs; interop 177/51/125/1 first draft-18 target run (-3 pass, 0 at target · 0 ahead · 177 behind reflects impl-registration vs draft-version drift)**

**TL;DR**:
- **[moq-transport PR #1638](https://github.com/moq-wg/moq-transport/pull/1638) OPEN June 1 11:06 UTC by [[will-law|wilaw]]** *"Add Dynamic Track Switching (DTS)"* (+147/−0, 1 file, fixes [#259](https://github.com/moq-wg/moq-transport/issues/259)) — **DTS lands as a PR-against-moq-transport-18 base spec**, the integration path Cullen Jennings May 27 explicitly preferred (*"I disagree it should be done as a separate draft. I think it should be worked as a PR that can be discussed in context"*) against Magnus Westerlund's separate-Internet-Draft proposal. **The consensus-decided design** from the May 26-Jun 4 mailing-list call (Will Law / Gwendal Simon / Yu You-Nokia / Ali Begen = 4 YES votes) **now has concrete normative text staged for merge**, adds a new `SWITCHING-SET-ASSIGNMENT` parameter, details subscriber operations + relay behavior + bandwidth allocation algorithm. **8 days before London Day-1 0900-1045 "MOQT Issues" slot**, the DTS thread shifts from list-debate to PR-review.
- **[[moq-msf|MSF]] 3 PRs MERGED June 1** (the trailing editorial work for -01 finally completes): **[PR #159](https://github.com/moq-wg/msf/pull/159) MERGED 09:42 UTC** *"Add catalog compression support via Track/Object Properties"* by [[suhas-nandakumar|suhasHere]] (+114/−4, fixes [#144](https://github.com/moq-wg/msf/issues/144) "Compression for the catalog" by vasilvv that was 21 days OPEN); **[PR #165](https://github.com/moq-wg/msf/pull/165) MERGED 09:33 UTC** *"Update bitrate and related properties in draft"* by [[will-law|wilaw]] (+51/−25 — adds Maximum GOP Duration / Maximum Group Duration / Average Bitrate track properties, makes sample_rate+channels required for audio, codec+width+height required for video, redefines bitrate as maximum); **[PR #175](https://github.com/moq-wg/msf/pull/175) MERGED 13:28 UTC** *"Change version type from Number to String in MSF"* by wilaw (+19/−16, fixes [#163](https://github.com/moq-wg/msf/issues/163) "Version should carry draft info for interop until released"). With these merged, the last remaining MSF PR from wilaw's May 24-27 sprint (PR #165) finally lands; only [PR #156](https://github.com/moq-wg/msf/pull/156) (suhasHere "MOQT Object to Stream mapping implementation-specific") + [PR #169](https://github.com/moq-wg/msf/pull/169) (wilaw MOQT mapping clarification) remain OPEN. **MSF -01 STILL NOT submitted to Datatracker — Day +134** since -00 (Jan 19 2026). 5th consecutive day of slippage on wilaw's May 27 Slack "Friday" pledge.
- **[[moq-dev|moq-dev/moq]] — kixelated 14-merge + 6-OPEN burst June 1-2** (clearing pre-London backlog including 3 long-pending PRs):
  - **[PR #1587](https://github.com/moq-dev/moq/pull/1587) OPEN Jun 2 02:25 UTC** *"moq-mux: add MPEG-TS (transport stream) import and export"* (+1548/−2, 15f) — **bridges MoQ ↔ MPEG-2 TS via new `container/ts` demux/mux**, enables `ffmpeg -f mpegts - | moq-cli publish` and `moq-cli subscribe --format ts | ffplay -` without transcode. Single `mpeg2ts` crate handles both directions, codecs H.264/H.265/AAC. **Aligns with [[mondain|Paul Gregoire]]'s [[moq-msfts|MSFTS draft]] + [mondain/moq2ts](https://github.com/mondain/moq2ts) C++ demonstrator** announced same day. **CLAUDE.md update**: "prefer maintained third-party crate over hand-rolling non-core functionality" — first explicit codebase architectural note about scope discipline.
  - **[PR #1573](https://github.com/moq-dev/moq/pull/1573) MERGED Jun 1 16:09 UTC** moq-lite-05 AnnounceOk (was OPEN in June 1 entry; merged ~13h after open into `dev` branch).
  - **[PR #1540](https://github.com/moq-dev/moq/pull/1540) MERGED Jun 1 15:34 UTC** *"moq-net: make subscribe_track async, blocking on SUBSCRIBE_OK"* (+1221/−632, 55f) — **long-pending since May 29** (4 days OPEN); reshapes `subscribe_track` so subscription resolves once publisher confirms via SUBSCRIBE_OK, separates `Subscription` (subscriber wire params) from `Track` (publisher immutable properties), concurrent subscribers coalesce. Picks up the idea started in **[PR #1439](https://github.com/moq-dev/moq/pull/1439) MERGED 19:13 UTC** "Add per-track timescale and frame timestamps to moq-lite" — **even longer-pending PR** that finally lands.
  - **[PR #1513](https://github.com/moq-dev/moq/pull/1513) MERGED 19:03 UTC** *"moq-net: map MoQ versions to required qmux versions"* — concrete code for the WG-decided qmux pinning table (moq-transport-18 must ride on qmux-01, 14-17 on qmux-00, moq-lite unconstrained). Long-pending since May 28.
  - **[PR #1581](https://github.com/moq-dev/moq/pull/1581) MERGED Jun 2 02:25 UTC** *"relay: unified --auth-api"* (+576/−24, 6f) — one HTTP call returns key + public + alias, supports MoQ CDN dashboard ([moq-dev/moq-pro#47](https://github.com/moq-dev/moq-pro/pull/47)) giving each project a stable id plus an editable vanity path. **Continues moq-pro pattern**: external API resolves `demo` → `x7k2qp` server-side; relay stays topology-agnostic.
  - Plus **[PR #1585](https://github.com/moq-dev/moq/pull/1585)** moq-net per-track cache age in SUBSCRIBE_OK + reconcile draft field order + port timescale to js/net; **[PR #1586](https://github.com/moq-dev/moq/pull/1586)** libmoq `moq_error()` exposed; **[PR #1579](https://github.com/moq-dev/moq/pull/1579)** don't advertise illegal `qmux-00.moqt-18` pair; **[PR #1580](https://github.com/moq-dev/moq/pull/1580)** WebSocket keep-alive on client path; **[PR #1582](https://github.com/moq-dev/moq/pull/1582)** re-export Hang from `@moq/publish`/`@moq/watch`; **[PR #1576](https://github.com/moq-dev/moq/pull/1576)** split TrackConsumer into track handle + TrackSubscriber; **[PR #1577](https://github.com/moq-dev/moq/pull/1577)** shrink moq-ffi + libmoq staticlibs with LTO; **[PR #1584](https://github.com/moq-dev/moq/pull/1584)** prefer esm.sh over jsDelivr for no-build CDN usage; **[PR #1589](https://github.com/moq-dev/moq/pull/1589)** moq-boy exit non-zero on reconnect give-up.
  - **OPEN follow-ons**: **[PR #1590](https://github.com/moq-dev/moq/pull/1590)** out-of-band avc1/hvc1 in MPEG-TS export; **[PR #1588](https://github.com/moq-dev/moq/pull/1588)** decouple download gating from Renderer; **[PR #1591](https://github.com/moq-dev/moq/pull/1591)** Computed derived signals; **[PR #1592](https://github.com/moq-dev/moq/pull/1592)** `@moq/watch` component signals inputs vs outputs; **[PR #1583](https://github.com/moq-dev/moq/pull/1583) OPEN** by external contributor nuts-rice "js: add Opus dtx for voice WIP".
- **[[moq-rs|cloudflare/moq-rs]] [PR #171](https://github.com/cloudflare/moq-rs/pull/171) OPEN June 1 18:40 UTC by [[suhas-nandakumar|suhasHere]]** *"Add pluggable AuthHook trait and C4M token authentication"* (+2090/−15, 30 files) — **implementation of [PR #169 design proposal](https://github.com/cloudflare/moq-rs/pull/169)** from May 28; adds **2 new crates** (`moq-auth` AuthHook trait + AllowAll/KeyValue/Logging hooks + auth types; `moq-auth-cat` C4M hook with signature verification, claims validation, MOQT scope matching), parses AUTHORIZATION TOKEN from CLIENT_SETUP, calls `on_setup` at session establishment (fail-closed), `on_request` before Publish/Subscribe/TrackStatus, CLI flags `--auth-shared-secret` + `--auth-cat-public-key`. **First concrete cross-impl auth implementation engagement** after May 30 thibmeu 8-comment review burst on PR #169 — Suhas advances from trait proposal to working implementation within ~4 days. PR #169 itself remains OPEN; PR #170 (Manish draft-16 rewrite) untouched Day +3.
- **Slack #moq — London draft-version coordination breaks** May 28-Jun 1 7-day silence:
  - **[Paul Gregoire](https://quicdev.slack.com/archives/C046V0QF3CK/p1780343010581179) June 1 19:43 UTC**: *"Created a demonstrator for the msfts draft https://github.com/mondain/moq2ts — only works with one relay that I know of at this time, but no one should be surprised by that"* — first publicly-announced reference implementation of [[moq-msfts|draft-gregoire-moq-msfts-00]] (the MSFTS individual draft Paul co-authored with Gwendal Simon, submitted May 6).
  - **[Martin Duke](https://quicdev.slack.com/archives/C046V0QF3CK/p1780353831190279) June 1 22:43 UTC**: *"Is anyone coming to London interested in draft-16 interop? There is no way we're going to be done with draft-18 migration, but if everyone else will be we might as well break -16."* — reactions: gb (1), face_with_monocle (1). **First London-week multi-version-strategy question**.
  - **[Alan Frindell](https://quicdev.slack.com/archives/C046V0QF3CK/p1780365027174379) June 2 01:50 UTC**: *"moxygen will have support for 14 and 16, and hopefully enough 18 to get some interop"* — **3-version simultaneous support** (14, 16, 18) for openmoq/moqx-stack.
  - **[Mike English](https://quicdev.slack.com/archives/C046V0QF3CK/p1780367301774199) June 2 02:28 UTC**: *"moq-rs will also have instances of 14, 16, and a small start on 18 for people to test against."* + *"I'm also feeling like 18+ might be where we finally start on proper multi-version support"* — **first explicit framing of draft-18 as a multi-version-support inflection point** for cloudflare/moq-rs.
  - **Carry-forward**: 4 impl-team responses to Martin Duke's call within 6 hours = London 2026 will exercise **(14, 16, 17, 18) × N-impls cross-version matrix manually**, beyond the automated runner; this is the first explicit pre-London coordination on how many drafts the hackathon should actually try to interop against, vs. unilateral "everyone's on 18" assumption.
- **Implementations**: see TL;DR above for [[moq-dev|moq-dev/moq]] (14 merges + 6 OPEN), [[moq-rs|cloudflare/moq-rs]] (PR #171). **[[mondain|mondain/moq2ts]]** (created May 21, language: C++) — surge June 1-2 (~9 commits) on cross-platform CI build workflow (Linux/macOS/Windows via GitHub Actions, AppImage + macdeployqt + windeployqt packaging), ffmpeg 8 + Qt qsizetype build fixes, native AVCaptureSession publish on macOS (libav/avfoundation hangs); links against prebuilt moqxr publisher SDK (pinned `MOQXR_VERSION=v0.3.2`) for relay-capable builds. **[[mondain|mondain/moqxr]]** 3 commits June 1 by [[paul-mondain|Paul Gregoire]] packaging the publisher static library + bundling picoquic/picotls dependencies for the SDK consumer path (enables moq2ts above to link standalone). **[[openmoq|openmoq/moqx]]** [[alan-frindell|afrind]] multi-thread relay sprint continues June 1 — [PR #361](https://github.com/openmoq/moqx/pull/361) `relay_thread` config + allow > 1 thread, [PR #362](https://github.com/openmoq/moqx/pull/362) isolate relay state on dedicated executor for multiple I/O threads, [PR #363](https://github.com/openmoq/moqx/pull/363) MultiThread relay test mode, [PR #364](https://github.com/openmoq/moqx/pull/364) cache as passive subscriber of primary forwarder, [PR #365](https://github.com/openmoq/moqx/pull/365) per-thread local forwarder data path (`use_local_forwarders`) — **5-PR stack OPEN simultaneously** for the `threads > 1` production-deployment milestone. Plus [PR #371](https://github.com/openmoq/moqx/pull/371) bpf reuseport refinement MERGED, [PR #370](https://github.com/openmoq/moqx/pull/370) by gmarzot folly XLOG init OPEN. **[[google-quiche|google/quiche moqt]]** breaks Day +5 silence — **2 commits June 1** by [[martin-duke|martinduke]]: `3b9d5450` 17:28 UTC *"Move parameter handling from session to RemoteTrack"* + `0b92a8b4` 17:34 UTC *"Get rid of MoqtUpstreamFetch::LocationIsValid because FETCH streams are diff-encoded; Malformed Tracks are no longer possible to encode in a FETCH stream"*. **[[moqtail|moqtail/moqtail]]**, **[[moq-js|video-dev/moq-js]]** (PR #72 still OPEN), **[[imquic|meetecho/imquic]]** (PR #27 still OPEN, last update Jun 1 13:15), **[[quiche-moq|birneee/quiche_moq]]**, **[[moqintosh|t-gazzy/Moqintosh]]**, **[[moqlivemock]]**, **Eyevinn/warp-player**, **Eyevinn/moqtransport** all quiet.
- **Interop**: **177 / 51 / 125 / 1** at [2026-06-02 00:50:22 UTC](https://englishm.github.io/moq-interop-runner/results/2026-06-02_005022/report.html) — **first run at new draft-18 target** following PR #68 merge June 1 05:21 UTC. **−3 pass vs June 1** (54 → 51, 30.5% → 28.8%, **−1.7pp**); **15 consecutive days of daily reports** (May 19-Jun 2), longest cadence streak the wiki has tracked. Version breakdown shifts to **0 at target · 0 ahead · 177 behind** — **NO impl is registered with the runner as advertising draft-18** even though [[moq-dev|moq-dev/moq]], [[mondain|mondain/moqxr]], and [[imquic|meetecho/imquic]] have draft-18 code in main. **Drift between runner-registered-version and impl-main-branch-version** is now the visible structural gap (Martin Duke's Slack question 4h later is the implementer-side response). **London hackathon 7 days away**.

## moq-transport PR #1638 — Dynamic Track Switching lands as base-spec PR

### Will Law opens DTS PR against moq-transport-18 June 1 11:06 UTC

[PR #1638](https://github.com/moq-wg/moq-transport/pull/1638) *"Add Dynamic Track Switching (DTS)"* by [[will-law|wilaw]] — **+147 / −0, 1 file**, fixes [Issue #259](https://github.com/moq-wg/moq-transport/issues/259):

> Adds the Dynamic Track Switching (DTS) feature, detailing subscriber operations, relay behavior, and bandwidth allocation algorithm. Adds a new SWITCHING-SET-ASSIGNMENT parameter.

**Context — consensus call disposition**:
- **May 26**: Will Law explicit YES on adoption + integration into moq-transport-18 (mailing list).
- **May 27**: Cullen Jennings explicit YES, prefers PR-against-moq-transport-18 over separate companion RFC: *"I disagree it should be done as a separate draft. I think it should be worked as a PR that can be discussed in context"*.
- **May 27**: Gwendal Simon (SWITCH co-author) 4-point structured rebuttal of Martin Duke's "Thoughts on SWITCH" framing — down-switch is 4 messages not 3 with break-before-make hard-freeze; up-switch N+k group selection needs relay-side info; SWITCH is additive not replacive; 4 implementations exist.
- **May 28**: Gwendal Simon YES on adoption + YES on integration with DTS reservations.
- **May 29**: Yu You (Nokia) YES + YES with measured benefit numbers ("my team has already implemented both").
- **May 29**: Ali Begen (MOQtail co-author) YES + YES with "if necessary" framing on separate-RFC fallback ("my team has already implemented both in MOQtail and plans to share implementation results").
- **June 4**: consensus call formal close.

**Tally heading into close**: 4 YES + 0 NO with 3 of 4 SWITCH co-authors + Nokia implementation report = consensus call substantively decided 14 days before close. PR #1638's structural choice (PR-against-transport-18 base spec instead of separate companion Internet-Draft) matches **Cullen's preference and the implementer pattern** (MOQtail + Nokia both implemented DTS as integrated transport feature, not as separate spec) rather than Magnus Westerlund's separate-Internet-Draft proposal that would have given the WG more rev-cycle flexibility.

**Wider impact**:
- London Day-1 0900-1045 "MOQT Issues" 180-min slot now structurally anchored around: **bidi-stream-credit** ([Issue #1637](https://github.com/moq-wg/moq-transport/issues/1637) martinduke May 29) + **request-blocking design** ([Issue #1519](https://github.com/moq-wg/moq-transport/issues/1519) vasilvv since Mar 2) + **DTS PR #1638** (wilaw June 1) + **EXPIRES extension** ([Issue #1639](https://github.com/moq-wg/moq-transport/issues/1639) + [PR #1640](https://github.com/moq-wg/moq-transport/pull/1640) martinduke June 1 19:50/22:14 UTC).
- DTS PR #1638 + EXPIRES PR #1640 are the **two normative-text deliverables** for London Day-1; the others are issue-level discussion.

## moq-rs PR #171 — AuthHook trait + C4M implementation lands

### Suhas Nandakumar opens implementation PR June 1 18:40 UTC

[PR #171](https://github.com/cloudflare/moq-rs/pull/171) *"Add pluggable AuthHook trait and C4M token authentication"* by [[suhas-nandakumar|suhasHere]] — **+2090 / −15, 30 files**:

> This PR is an implementation of [#169](https://github.com/cloudflare/moq-rs/pull/169). Adds intra-scope authorization to the relay via a pluggable AuthHook trait, with a C4M (CAT for MoQ) implementation using the cat-token crate.

**New crates**:
- **`moq-auth`** — AuthHook trait, AllowAll/KeyValue/Logging hooks, auth types
- **`moq-auth-cat`** — C4M hook: signature verification, claims validation, MOQT scope matching

**Relay integration**:
- Parses AUTHORIZATION TOKEN from CLIENT_SETUP (USE_VALUE wire format)
- Calls `on_setup` at session establishment (fail-closed)
- Calls `on_request` before Publish/Subscribe/TrackStatus operations
- CLI: `--auth-shared-secret` (token type 0) and `--auth-cat-public-key` (C4M, requires `--features auth-cat`)

**Why this matters**:
- **First concrete cross-impl auth implementation engagement** after May 30 thibmeu 8-comment review burst on PR #169.
- The PR text includes end-to-end test plans for **both** shared-secret and C4M auth — Suhas demonstrates working code rather than gating on PR #169 design-discussion closure.
- The thibmeu review on PR #169 critiqued the trait surface for accommodating Privacy Pass challenge-reply (issuer-aware) — PR #171's implementation **does not** yet address that pivot; Suhas chose to ship the verify-callback shape and let Privacy Pass adapt or extend later. **Design vs implementation cleavage** now visible: PR #169 stays open as design-discussion forum, PR #171 stays open as concrete implementation to test against.
- **Cross-impl significance**: openmoq/moqx has been driving CAT token auth via PR #264 (paul-mondain) + PR #286 (Catapult submodule) since May 1; cloudflare/moq-rs PR #171 is the **second relay implementation of CAT auth** under the C4M framing, structurally parallels rather than reuses openmoq/moqx's pattern.

**Carry-forward**: London Day-1 PRIVACY_PASS slot (paired with [[moq-privacy-pass]] draft-02 advance) now has **two concrete relay implementations** (openmoq/moqx CAT + cloudflare/moq-rs C4M) plus thibmeu's pending Privacy Pass critique on PR #169 — three vectors of auth-implementation experience to inform draft-19 design.

## mondain/moq2ts — MSFTS demonstrator announced

### Paul Gregoire publicly announces moq2ts on #moq June 1 19:43 UTC

[mondain/moq2ts](https://github.com/mondain/moq2ts) (C++, created May 21 2026, "MOQ + M2TS") — first publicly-announced reference implementation of [[moq-msfts|draft-gregoire-moq-msfts-00]]:

> Created a demonstrator for the msfts draft https://github.com/mondain/moq2ts — only works with one relay that I know of at this time, but no one should be surprised by that 😉

**Surge May 31-Jun 2 (~9 commits)**:
- **Cross-platform CI build workflow** (`8306eee9` June 1 19:50 UTC) — Linux/macOS/Windows via GitHub Actions, AppImage via linuxdeploy + macdeployqt + windeployqt+ldd packaging.
- **Real relay-capable binaries by linking moqxr SDK** (`5721c914` June 1 22:34 UTC) — links against prebuilt openmoq publisher SDK pinned `MOQXR_VERSION=v0.3.2`, Linux wraps archives in `--start-group` to resolve circular picohttp/picoquic deps.
- **ffmpeg 8 + Qt qsizetype build fixes** (`7c143817` 22:56 UTC, `aef64cd0` 23:29 UTC) — `avio_alloc_context` const-buffer change for ffmpeg 8 + cross-version compat via `LIBAVFORMAT_VERSION_MAJOR` check.
- **Native AVCaptureSession publish on macOS** (`8f281a43` June 2 00:29 UTC) — libavdevice/avfoundation hangs in `avformat_open_input` because it does not pump AVCaptureSession run loop from worker thread; uses native AVCaptureSession directly for preview + publish paths (uyvy422→BGRA in delegate, audio as packed/planar PCM).
- **README/DEVELOPER refresh for current MSF + MSFTS catalog** (`06a17f7a` + `4e377e17` June 1 19:31-19:34 UTC) — documents `mediatimeline` MSF type for the timeline side-track + compact `[mediaTimeMs,[groupId,objectId],wallclockMs]` record array.

**Synchronicity**: same June 2 02:25 UTC window, **[[moq-dev|moq-dev/moq]] [PR #1587](https://github.com/moq-dev/moq/pull/1587)** opens MPEG-TS import/export support for `moq-mux` via single `mpeg2ts` crate — both **moq2ts** (C++/MSFTS draft-specific) and **moq-dev/moq PR #1587** (Rust/codec-agnostic) advance MPEG-TS↔MoQ bridging within the same 24-hour window. **First concrete cross-impl MPEG-TS interop substrate**.

**Carry-forward**: with mondain/moqxr SDK packaging (`a8ad5f9d`/`deea689f`/`d43d9804` June 1) + moq2ts CI builds linking against it + moq-dev/moq PR #1587 import/export, MSFTS as a streaming-format becomes **the second concrete MoQ-side MPEG-2 TS path** (after [[implementations#moqlivemock|moqlivemock]] catalog work) — directly relevant to London Day-2 35-min MSF/CMSF/MSFTS slot.

## Slack #moq — Martin Duke draft-16-or-18 London poll

### Martin Duke poses draft-version question June 1 22:43 UTC

[Martin Duke Slack #moq June 1 22:43 UTC](https://quicdev.slack.com/archives/C046V0QF3CK/p1780353831190279):

> Hi, is anyone coming to London interested in draft-16 interop? There is no way we're going to be done with draft-18 migration, but if everyone else will be we might as well break -16.

Reactions: 🇬🇧 (1), 🧐 (1).

**Responses** (within ~6h):
- [Alan Frindell June 2 01:50 UTC](https://quicdev.slack.com/archives/C046V0QF3CK/p1780365027174379): *"moxygen will have support for 14 and 16, and hopefully enough 18 to get some interop"*.
- [Mike English June 2 02:28 UTC](https://quicdev.slack.com/archives/C046V0QF3CK/p1780367301774199): *"moq-rs will also have instances of 14, 16, and a small start on 18 for people to test against."* + [02:29 UTC](https://quicdev.slack.com/archives/C046V0QF3CK/p1780367365497759): *"I'm also feeling like 18+ might be where we finally start on proper multi-version support"*.

**Cumulative London-week version inventory** (from these 3 responses):
| Impl | -14 | -16 | -17 | -18 |
|---|---|---|---|---|
| moxygen (openmoq/moqx) | ✓ | ✓ | — | partial |
| moq-rs (cloudflare) | ✓ | ✓ | — | partial |
| moq-dev/moq | — | ✓ | ✓ | ✓ (main) |
| moqxr (mondain) | — | — | — | ✓ (main) |
| imquic (meetecho) | — | — | ✓ | partial |
| moqtail | ✓ | — | — | — |

**Why this matters**:
- **Draft-18 was published May 12 — 21 days before London** but no impl has full draft-18 conformance as of June 2; the partials are sufficient for **some** interop only.
- **Martin Duke's question reframes the matrix**: not "everyone migrates to 18 by London" but "**how many drafts do we actually run cross-impl interop against at London**". The default expectation appears to be 14 + 16 + partial 18 = 3-version matrix during London week.
- **Mike English's "multi-version support" comment is a structural signal**: until now, MoQ impl strategy has been "track latest draft, migration is best-effort per-impl"; Mike is signaling that **draft-18 may be the version where multi-version support becomes a deliberate impl feature**, not just a side effect of slow migration. This would echo HTTP/2 multi-version support patterns where impls keep older draft codepaths intentionally to support stragglers.

**Carry-forward**: the interop runner is automated-version-locked (one target per matrix run); London Day-week interop is **manual** and operator-driven. Mike's PR #68 draft-18 target bump landed June 1, but **the matrix is now structurally ahead of every impl** (0 at target · 0 ahead · 177 behind) — which gives the manual London interop work latitude to exercise 14/16/18 cross-version freely without contradicting the automated matrix.

# Activity (May 31 06:00 UTC → June 1 06:00 UTC) — **interop runner PR #68 MERGED draft-18 target bump (the matrix-shape lever the wiki has been tracking 14 days); MoQ Monthly #2 published ending Day-+31 silence with London framing + Dan Rayburn town hall + CacheFly/Red5 CDN beta; moq-dev/moq cluster-mesh infrastructure burst (5 merges + 1 OPEN in 12h, externalizes peer-list to operator-owned endpoint + deterministic FNV-1a route tie-break + per-auth-root billing); openmoq/moqx afrind PR #359 fixes relay shutdown hang; mondain/moqxr 2 cancellable-flush commits; moq-wg + mailing list + Slack all quiet; interop 177/54/122/0 (+2 pass, 30.5%, 14-day cadence longest streak, 5-day monotonic uptick to new May+June high, first 30%+ pass rate)**

**TL;DR**:
- **englishm-cloudflare merges [interop runner PR #68 "Update interop target to draft-18"](https://github.com/englishm/moq-interop-runner/pull/68) June 1 05:21:25 UTC — 14 days after OPEN** (May 18 21:01 UTC). **First matrix-shape change since [PR #71](https://github.com/englishm/moq-interop-runner/pull/71) (moqx docker adapter, May 25)** and **first interop-target version bump since matrix inception**. The June 1 00:49 UTC report still shows `draft-16` as the target (PR merged ~4.5h after report cut), so the **June 2 report will be the first run targeting draft-18**. Three implementations (**moq-dev/moq, mondain/moqxr, meetecho/imquic**) have been on draft-18 main for 2-3 weeks; the matrix is finally catching up. **London hackathon 8 days away** — only structural matrix-shape lever the wiki had been tracking lands precisely in the pre-London window.
- **[MoQ Monthly #2](https://buttondown.com/moqmonthly/archive/moq-monthly-2/) published May 31 by [[mike-english|Mike English]]** — *"A new draft, an industry town hall, and London next week"*. **Ends Day-+31 silence** since #1 (Apr 30); cadence reasserted just before London. Coverage: **Draft-18 publication May 12** (unified URI schemes, separated subscription messages, reserved namespaces for extensions); **London interim June 9-12** at Cloudflare's office; WGLC targeted after July Vienna plenary, IESG publication Dec 2026; **Dan Rayburn town hall May 12** (commercial-interest signal); **Streaming Tech Sweden May 21** featured Vindral + SVT production implementations; **Luke Curley's "MoQ Boy"** Game Boy emulator demo; **CDN signal**: Fastly positioning Apr 15, **CacheFly + Red5 announce MoQ beta for summer 2026**, Cloudflare + Akamai existing initiatives; **3 ACM Multimedia Systems 2026 papers** from Özyeğin University researchers; **new MPEG-2 TS + neural video codec drafts**; **Jan Ozer comprehensive overview** at Streaming Learning Center; upcoming **FOKUS Media Web Symposium (June 16-17, Berlin)**, **CommCon 2026 (June 9-11, Düsseldorf)**, **RTC.ON 2026 (Sep 16-18, Kraków)**.
- **moq-dev/moq — kixelated cluster-mesh infrastructure burst May 31 17:51 UTC → June 1 03:20 UTC**. **5 merges + 1 OPEN in ~12 hours**: **[PR #1569](https://github.com/moq-dev/moq/pull/1569) MERGED 17:51 UTC** *"relay: dedup mesh dials with a URL-order tiebreaker"* (+30/−2) — gossip-discovered peers only dialed by the lexicographically-smaller node, eliminates redundant outbound dial per pair. **[PR #1570](https://github.com/moq-dev/moq/pull/1570) MERGED 19:26 UTC** *"moq-net: deterministic route tie-break for equal-length paths"* (+83/−18) — FNV-1a `(hop_count, hash)` lex compare so every node converges on the same winner across rolling deploys (DefaultHasher explicitly not stable across Rust versions). **[PR #1571](https://github.com/moq-dev/moq/pull/1571) MERGED June 1 00:22 UTC** *"moq-relay: add `--cluster-connect-api` and split cluster identity from gossip"* (+874/−150, 10f) — **externalizes peer-list source** to an `http(s)` URL or local file returning bare JSON array of hostnames, polled with `Cache-Control` semantics + ETag/Last-Modified conditional revalidation + fail-static on error. Re-adds `--cluster-node <self-url>` for identity; `--cluster-mesh` becomes boolean gossip toggle (breaking change to recent flag from PR #1504). **Relay stays topology-agnostic**: all routing decisions live in whatever service answers the endpoint (the `/cluster/connect` endpoint itself lives in moq-pro). **[PR #1572](https://github.com/moq-dev/moq/pull/1572) MERGED 01:11 UTC** *"simplify cluster-connect-api polling onto the HTTP cache"* (+38/−93) — rebases #1571 onto `dev`, delegates freshness to existing `http-cache-reqwest` middleware instead of hand-parsing `Cache-Control` (net −58 LOC). **[PR #1574](https://github.com/moq-dev/moq/pull/1574) MERGED 03:20 UTC** *"moq-relay: count connected sessions per auth root for billing"* (+355/−43, 3f) — new `sessions.json` (external) + `internal/sessions.json` (internal) stats tracks mapping auth root → `{sessions, sessions_closed}` for **presence-based billing regardless of data flow** (idle authenticated session billable, derived from `(broadcast, session)` atomics is not). **[PR #1573](https://github.com/moq-dev/moq/pull/1573) OPEN 02:47 UTC** *"moq-lite-05: add AnnounceOk message (responder origin + initial active count)"* (+493/−36, 16f) targeting `dev` — **second concrete moq-lite-05 wire feature after [PR #1531 deflate compression](https://github.com/moq-dev/moq/pull/1531) May 28**: publisher sends `AnnounceOk` once after reading `AnnounceInterest`, reports responder's origin id **once** (replaces per-Announce trailing-hop redundancy) + `active: N` count followed by `N` initial `Announce::Active` (discrete initial-set boundary, successor to `AnnounceInit`); enables `connect()` to **block until initial set has landed** via new `SyncLatch`, closes startup race where synchronous `get_broadcast()` post-connect could miss broadcasts live-but-not-yet-gossiped. JS mirror lands the same wire change.
- **Implementations**: **[[moq-dev|moq-dev/moq]]** see above (5 merges + 1 OPEN; PR #1575 chore-release closes #1557; dependabot #1565/#1567/#1568 docker/setup-buildx/flake-checker bumps merged). **[[openmoq|openmoq/moqx]]** — **[[alan-frindell|afrind]] [PR #359](https://github.com/openmoq/moqx/pull/359) MERGED May 31 22:08 UTC** *"relay: fix shutdown hang when sessions hold lingering server refs"* (+31/−0, 5f) — main() now owns `IOThreadPoolExecutor` via `unique_ptr`, servers hold raw pointer; explicit stop + clear before joining IO pool to prevent `QuicServer::shutdown` posting to dead worker EVBs (would hang shutdown until 10s watchdog fired). `MoqxRelayServer::stop()` + `MoqxPicoRelayServer::stop()` made idempotent via `context_` sentinel. Plus 2 sync-bot moxygen merges ([PR #357](https://github.com/openmoq/moqx/pull/357) `b3fc363` 10:35 UTC + [PR #358](https://github.com/openmoq/moqx/pull/358) `e282ba6` 14:46 UTC). **[[mondain|mondain/moqxr]]** 2 commits June 1 by [[paul-mondain|Paul Gregoire]]: `ced45c85` 03:38 UTC *"Make publish_live_objects cancellable via close() stop flag"* + `c18924cc` 03:44 UTC *"Bound the publish_live_objects graceful flush on stop"* — incremental shutdown/cancellation polish. **[[moq-rs|cloudflare/moq-rs]]** quiet Day +2 since 8-thibmeu review burst May 30; PR #169 AuthHook and PR #170 (Manish draft-16 rewrite) both untouched. **[[google-quiche|google/quiche moqt]]** Day +2 silent. **[[moqtail|moqtail/moqtail]]**, **[[moq-js|video-dev/moq-js]]** (PR #72 still OPEN), **[[imquic|meetecho/imquic]]** (PR #27 still OPEN), **[[quiche-moq|birneee/quiche_moq]]**, **[[moqintosh|t-gazzy/Moqintosh]]**, **[[moqlivemock]]**, **Eyevinn/warp-player**, **Eyevinn/moqtransport** all quiet.
- **Interop**: **177 / 54 / 122 / 0** at [2026-06-01 00:49:16 UTC](https://englishm.github.io/moq-interop-runner/results/2026-06-01_004916/report.html) — **+2 pass vs May 31** (52 → 54, 29.4% → 30.5%, **+1.1pp**). **First 30%+ pass rate since cadence recovery May 19**. **14 consecutive days of daily reports** (May 19-Jun 1), longest cadence streak the wiki has tracked. Rolling 5-day band 50-54, trajectory 49 → 50 → 52 → 54 = **5-day monotonic uptick continues** (counting May 28→Jun 1: 46 → 49 → 50 → 52 → 54, +8 pass over 5 days). Target at report time still **draft-16** but **PR #68 MERGED ~4.5h after report cut** — June 2 will be the first draft-18 run. **London hackathon 8 days away**.

## Interop runner — PR #68 MERGED draft-18 target bump

### Mike English (englishm-cloudflare) merges PR #68 June 1 05:21:25 UTC

[PR #68](https://github.com/englishm/moq-interop-runner/pull/68) *"Update interop target to draft-18"* — **14 days OPEN → MERGED**:

- **OPENED**: May 18 21:01 UTC (Slack announcement same day: *"Working through some CI issues, and then I'll be bumping the interop target in the automated interop test runner to draft-18, too"*).
- **MERGED**: June 1 05:21:25 UTC by englishm-cloudflare (Mike English, Cloudflare/interop runner maintainer).
- **Diff**: 1 file, +1/−1 (the target version string in the config).
- **Single commit**: `f6db6cec` May 18 20:57 UTC — i.e. the actual change has been ready for 14 days; the merge was gated on CI infrastructure stabilization (May 19 PR #69 per-test timeout fix → matrix cadence resumes; May 25 PR #71 moqx docker adapter; subsequent 13 daily reports).

**Why this matters**:
- **First matrix-shape change since PR #71** May 25 (moqx docker adapter): 7 days of "matrix shape unchanged at 177 tests" since the last lever moved.
- **First interop-target version bump since matrix inception** — the matrix has tracked draft-14, draft-15, draft-16 over the past months as implementations updated; this is the first time the matrix's *target version* steps forward.
- **Catches up to three implementations on draft-18 main**: [[moq-dev|moq-dev/moq]] (PR #1418 May 18), [[mondain|mondain/moqxr]] (8 commits May 19-20), [[imquic|meetecho/imquic]] (May 20 09:25 UTC). The structural gap (matrix-on-draft-16 vs three impls-on-draft-18) **closes precisely 8 days before London**.
- **Expected June 2 matrix impact**: Version breakdown of 177 tests was **97 at target (draft-16) · 8 ahead (draft-17) · 72 behind (draft-14)** under the draft-16 target. Under a draft-18 target, the "at target" / "ahead" / "behind" decomposition will shift: implementations on draft-18 are now "at target" (previously "ahead"), draft-17 becomes "behind" (previously "ahead"), draft-16 becomes "behind" (previously "at target"). Whether this nets pass-count up or down depends on whether the matrix harness counts cross-version pairings as expected-fail or genuine-fail.

**Carry-forward**: with 14 consecutive days of daily cadence and a +8 pass count over 5 days under the old target, the matrix has clearly stabilized; the draft-18 bump introduces a one-time shape change whose impact will only show on June 2. **No further structural levers remain** in the matrix before London — only individual-impl draft-18-conformance fixes can move pass counts now.

**Carry-forward (London Day-2 slot)**: [Mike's May 27 Slack request for streaming-format-level automated interop](https://github.com/englishm/moq-interop-runner/issues/32) (MSF/CMSF/LOC matrix beyond wire-protocol matrix) is now the next structural feature request on the runner, downstream of the draft-18 target landing — Mike signaled interest, no implementation has started.

## MoQ Monthly #2 — newsletter cadence reasserts before London

### Mike English publishes MoQ Monthly #2 May 31

[MoQ Monthly #2](https://buttondown.com/moqmonthly/archive/moq-monthly-2/) — *"A new draft, an industry town hall, and London next week"*:

- **Cadence**: #0 (Mar 3) → #1 (Apr 30, Day +58) → **#2 (May 31, Day +31)** — cadence shortened from 58 days to 31 days, closing toward true monthly cadence.
- **Timing relative to London**: published 8 days before London hackathon (June 9), 9 days before interim Day-1.

**Coverage**:

1. **Draft-18 publication May 12** — unified URI schemes, separated subscription messages, reserved namespaces for extensions. WGLC after July Vienna plenary; IESG publication December 2026.
2. **London interim June 9-12** at Cloudflare's office.
3. **Industry signal**:
   - **Dan Rayburn town hall May 12** (commercial-interest indicator outside IETF).
   - **Streaming Tech Sweden May 21** featured production implementations by **Vindral** and **SVT**.
   - **Luke Curley's "MoQ Boy"** Game Boy emulator demo (low-latency capabilities + resource management showcase).
4. **CDN ecosystem growth**:
   - **Fastly** published positioning April 15.
   - **CacheFly + Red5** announced **MoQ beta for summer 2026**.
   - Cloudflare + Akamai existing initiatives.
5. **Research & standards**:
   - **3 ACM Multimedia Systems 2026 papers** from Özyeğin University researchers (Ali Begen's group).
   - New layering drafts for MPEG-2 Transport Stream ([[moq-msfts]]) and neural video codecs ([[moq-nmsf]]).
   - **Jan Ozer comprehensive overview** at Streaming Learning Center.
6. **Upcoming events**:
   - **FOKUS Media Web Symposium** (June 16-17, Berlin) — right after London week.
   - **CommCon 2026** (June 9-11, Düsseldorf) — **overlaps London Day-1/2**.
   - **RTC.ON 2026** (Sep 16-18, Kraków).

**Significance for wiki**: First MoQ Monthly issue covering the wiki-tracked May 2026 window in retrospective form — gives third-party validation of the activity the wiki recorded in 2026-05 discussions (the Dan Rayburn town hall, Luke's MoQ Boy demo, the SVT/Vindral Streaming Tech Sweden coverage). The **CacheFly + Red5 MoQ beta** is new ecosystem signal the wiki had not yet captured.

**Carry-forward**: MoQ Monthly's revived cadence positions it as a per-London-cycle external news source — #3 (June 30?) would cover the London interim outcomes in retrospective.

## moq-dev/moq — cluster-mesh infrastructure burst May 31 → June 1

5 merges + 1 OPEN in ~12 hours by kixelated. Theme: **externalize cluster topology to an operator-owned endpoint + deterministic route tie-break + per-auth-root billing + moq-lite-05 AnnounceOk wire feature**.

### Mesh-dial dedup + deterministic route tie-break

- **[PR #1569](https://github.com/moq-dev/moq/pull/1569) MERGED May 31 17:51 UTC** *"relay: dedup mesh dials with a URL-order tiebreaker"* (+30/−2). Gossip-discovered peers dialed only if URL sorts after self (`peer > self_url`). Lexicographically-smaller node is client, larger is server. Inbound connection still arrives for the skipped side. Bidirectional cluster session means one connection suffices; eliminates redundant outbound dial per pair. Replaces old `peer == self_url` self-skip. Scope: gossip only — explicit `--cluster-connect` always dials, passive-rendezvous via static path.
- **[PR #1570](https://github.com/moq-dev/moq/pull/1570) MERGED 19:26 UTC** *"moq-net: deterministic route tie-break for equal-length paths"* (+83/−18). When two announcements compete for the same broadcast path with equal hop counts, the old code kept whichever arrived most recently (arrival order differs per node → relays in a cluster could pick different routes and flap). New `route_key(name, hops) -> (usize, u64)` returns `(hop_count, FNV-1a hash over name + hop chain)`; lex compare, lowest hash wins on tie. **FNV-1a instead of `DefaultHasher`** because std's output is *explicitly not stable across Rust versions* — during rolling deploys, mismatched binaries must still agree on a route. Mixing the broadcast name in spreads equal-length routes across upstreams instead of funneling onto one. On exact key tie, incumbent stays (no churn).

### Cluster-connect-api: externalize peer-list to operator endpoint

- **[PR #1571](https://github.com/moq-dev/moq/pull/1571) MERGED June 1 00:22 UTC** *"moq-relay: add `--cluster-connect-api` and split cluster identity from gossip"* (+874/−150, 10f). New `--cluster-connect-api` flag accepts an `http(s)` URL or local file path returning bare JSON `["a.pop.example", "b.pop.example"]`. Reconciles dials at runtime: new peers dialed, dropped peers aborted. Composes with static `--cluster-connect` (never reconciled away) and gossip. HTTP polled with `Cache-Control` semantics (`max-age` + `stale-while-revalidate`); conditional revalidation (ETag / Last-Modified); fail-static on error. File re-read when mtime changes. The relay's `--cluster-node` value is sent as `?node=`, the cluster mTLS client cert identifies the caller, so the endpoint can return per-node peer lists.
  - **Re-adds `--cluster-node <url>`** as relay's own identity (used for `?node=` query parameter and as the address gossip advertises).
  - **`--cluster-mesh` becomes boolean gossip toggle** (was URL). Enabling without `--cluster-node` errors at startup. **Breaking change to a recently-added flag** (originally added in [PR #1504](https://github.com/moq-dev/moq/pull/1504) May 24).
  - **The `/cluster/connect` endpoint itself (proprietary routing over node inventory) lives in moq-pro**. moq-dev/moq stays topology-agnostic; all routing decisions move out to whatever service answers the endpoint.
- **[PR #1572](https://github.com/moq-dev/moq/pull/1572) MERGED June 1 01:11 UTC** *"simplify cluster-connect-api polling onto the HTTP cache"* (+38/−93). PR #1571 hand-rolled `stale-while-revalidate` parsing; #1572 rebases onto `dev` and delegates to existing `http-cache-reqwest` middleware. Net **−58 LOC**. PR body documents the crate landscape check (`http-cache` 0.21.0 = RFC 7234 only; `http-cache` 1.0.0 alpha-only; `moka` dropped background threads in 0.12). Re-checks endpoint on fixed 30s cadence; cached list served with no network round-trip while fresh; conditional GET when stale; serves stale on revalidation failure.

### Per-auth-root billing

- **[PR #1574](https://github.com/moq-dev/moq/pull/1574) MERGED 03:20 UTC** *"moq-relay: count connected sessions per auth root for billing"* (+355/−43, 3f). Presence-based billing needs to know how many sessions are connected to a node keyed by **auth root**. Existing per-broadcast stats only tracked subscriptions + per-`(broadcast, session)` sentinel; node-level session count not derivable. Two new stats tracks: `sessions.json` (external) + `internal/sessions.json` (internal), each a JSON object mapping auth root → `{sessions, sessions_closed}`. Counts presence **regardless of data flow** — guard created in relay's connection handler where `token.root` is known, held for whole connection. RAII `SessionStats` guard via new `StatsHandle::session(root)`. Example: `{"acme": {"sessions": 3, "sessions_closed": 1}, "globex": {"sessions": 1, "sessions_closed": 0}}`.

### moq-lite-05 AnnounceOk wire feature

- **[PR #1573](https://github.com/moq-dev/moq/pull/1573) OPEN June 1 02:47 UTC** *"moq-lite-05: add AnnounceOk message (responder origin + initial active count)"* (+493/−36, 16f) targeting `dev`. New `AnnounceOk` message on the announce stream, sent once by publisher right after reading `AnnounceInterest` and before any `Announce`. Two purposes:
  1. **Reports responder's origin id once** instead of stamping it onto trailing hop of every `Announce`. In Lite05, node no longer stamps its *own* origin; **receiver** stamps the *remote* sender's origin (from `AnnounceOk`) on receipt. Stored hop chain byte-identical to Lite04 (loop detection / shortest-path selection unchanged).
  2. **Reports `active: N`** count of currently-active broadcasts, followed by exactly `N` initial `Announce::Active`. Gives announce stream a **discrete initial-set boundary** (the successor to `AnnounceInit`).
- **Enables connect-blocking**: lets `connect()` block until initial set has landed via new `SyncLatch` (fires once every announce-prefix stream has its initial set; generalized across `AnnounceInit` Lite01/02 + `AnnounceOk + N` Lite05; Lite03/04 have no boundary and resolve immediately). Closes startup race where synchronous `get_broadcast()` post-connect could miss broadcasts live-but-not-yet-gossiped.
- **Opt-in**: `Lite05Wip` is not advertised over ALPN or default version set; nothing negotiates by default. **Second concrete moq-lite-05 wire feature** after [PR #1531](https://github.com/moq-dev/moq/pull/1531) deflate compression (May 28).
- **JS mirror**: `@moq/net` mirrors the wire, but does NOT add connect-blocking — JS `Connection` is pull-based (`announced()` opens stream lazily, `consume(path)` subscribes directly without consulting announcements), so synchronous `get_broadcast()` race doesn't exist there.
- **IETF draft / spec being updated separately**.

**Pattern**: PR #1573 demonstrates the **[PR #1518](https://github.com/moq-dev/moq/pull/1518) Lite05Wip unadvertised version variant** working exactly as intended: features can land gated without wire exposure (no peer negotiates Lite05Wip yet because it's omitted from `ALPNS` and `Versions::all()`). Same gating model as PR #1531 deflate.

## openmoq/moqx — afrind PR #359 relay shutdown hang fix

[PR #359](https://github.com/openmoq/moqx/pull/359) MERGED May 31 22:08 UTC by afrind *"relay: fix shutdown hang when sessions hold lingering server refs"* (+31/−0, 5f):

> *"main() now owns the IOThreadPoolExecutor via unique_ptr (servers hold a raw pointer) and explicitly stops + clears servers before joining the IO pool. Previously, lingering shared_ptr<MoQServerBase> refs from in-flight sessions or coroutines could delay ~MoqxRelayServer past the executor's destruction, leaving QuicServer::shutdown to post to dead worker EVBs and hang shutdown until the 10s watchdog fired."*

- `MoqxRelayServer::stop()` + `MoqxPicoRelayServer::stop()` made **idempotent** using `context_` as sentinel — `~MoqxRelayServer` no-op once main has already stopped the server.
- Follows the **May 28 [PR #351](https://github.com/openmoq/moqx/pull/351)** *"relay: IOThreadPoolExecutor owned exclusively by main"* (multi-thread sprint Day 2) — completes the ownership model with explicit shutdown ordering.
- Plus 2 automated moxygen submodule sync merges: [PR #357](https://github.com/openmoq/moqx/pull/357) `b3fc363` MERGED May 31 10:35 UTC + [PR #358](https://github.com/openmoq/moqx/pull/358) `e282ba6` MERGED 14:46 UTC.

**Carry-forward**: afrind's multi-thread sprint Days 1-3 was May 27-29 (22 events). May 30-31 was quieter (2 sync-bot merges May 30 + this PR #359 + 2 sync-bot merges May 31). With **London hackathon 8 days away**, PR #331 (`relay_thread` config + allow > 1 thread) remains the only PR-merge-away gate from `threads > 1` being usable in production.

## mondain/moqxr — Paul Gregoire cancellable graceful flush

2 commits June 1 by Paul Gregoire:

- **`ced45c85` June 1 03:38:17 UTC** *"Make publish_live_objects cancellable via close() stop flag"*.
- **`c18924cc` June 1 03:44:35 UTC** *"Bound the publish_live_objects graceful flush on stop"*.

Continues the May 30 `21b791a8` *"Fix live object catalog ordering and stop wakeup"* (+53/−7) shutdown-polish theme. Incremental hardening of mondain/moqxr's live-object publishing path for clean shutdown.

## Mailing list — weekly digest only, weekend silence

Single message May 31 03:01:31 UTC: **[Weekly github digest (Media Over QUIC Activity Summary)](https://mailarchive.ietf.org/arch/msg/moq/lc96WVrbH-YeKVsrVzquaLHUNbI/)** from Repository Activity Summary Bot. Auto-summary of moq-wg repo activity:

- **moq-transport**: 1 new issue (Issue #1637 *"What does MOQT do without bidi stream credit?"* + 4 ianswett/martinduke comments; 2 other issues received commentary).
- **moq-wg/msf**: 1 new issue (*"Reference the latest version of LOC"*) + 17 new comments across 10 existing issues + **8 issues closed** + 9 new PRs (timestamp rounding, buffer properties, init data, bitrate, compression).

**No substantive on-list MoQ discussion May 31 or June 1**. Weekend mailing-list silence persists into a 3rd day (May 30 / 31 / Jun 1). Ali Begen's May 29 YES vote on SWITCH/DTS remains the latest substantive thread.

## IETF Datatracker — no new revisions

**No new drafts published May 31 or June 1**. WG document state unchanged from May 31:

- **draft-ietf-moq-transport-18** (Day +20 since May 12)
- **draft-ietf-moq-msf-00** (**Day +133 since Jan 19**; wilaw's May 27 Slack "Friday" pledge for -01 still unfulfilled into 4th consecutive day; editorial work on `main` complete — PR #166/167/168/171/173/174 all MERGED — only `xml2rfc` submission remains)
- **draft-ietf-moq-loc-02**
- **draft-ietf-moq-secure-objects-00** (PR #88 still OPEN staging test vectors for -01)
- **draft-ietf-moq-privacy-pass-auth-02**
- **draft-ietf-moq-cmsf-00** (Issue #122 *"initial text on zapping"* Gwendal-vs-Suhas editorial debate from May 30 unresolved)

Individual drafts also unchanged.

## Slack — all quiet

**No new messages May 31 or June 1** across `#moq`, `#moq-rs`, `#moq-js`, `#libquicr`, `#moq-interop-runner`. The afrind self-fetch thread (May 28) and Lorenzo moq-mi/LOC thread (May 27) remain the latest substantive Slack discussion.

## tobbee/moq-llm-wiki — no open issues
