---
title: "Discussions - October 2026"
tags: [discussions, slack, github]
date: 2026-10-02
last_updated: 2026-10-04
status: current
---

Summary of active discussions in the MOQ ecosystem during October 2026. The late-September run-up lives in [[discussions-2026-09]].

# Activity (Oct 3 → Oct 4) — **moq-dev ships the queued 0.17.0 relay train and a day-long media-pipeline merge wave; the interop runner's Oct-3 cut confirms the moq-dev-rs recovery predicted the day before. Spec text quiet.**

A quiet day on the spec (draft-22 stands; no WG merges), but the two things the previous entry flagged as pending both resolved: **moq-dev/moq cut the 0.17.0 release train** it had queued, and the **Oct-3 interop nightly** — the first cut to carry runner #133/#134 — showed the moq-dev-rs relay recovering as expected. Slack was not checked this run.

## Spec / WG: two editorial PRs, no merges

No `moq-wg` merges since draft-22's `#1965` (Oct-1). Two new moq-transport PRs opened, both pre-Seattle cleanup:

- [#1966](https://github.com/moq-wg/moq-transport/pull/1966) ([[alan-frindell|afrind]], Oct-3 00:03) *"Restrict GOAWAY on a request stream to the request receiver"* (Fixes [#1655](https://github.com/moq-wg/moq-transport/issues/1655)) — only the receiver of a request can usefully send a GOAWAY on its stream, so a GOAWAY received *by* the receiver becomes a `PROTOCOL_VIOLATION`, and the request sender is named as the endpoint that re-issues elsewhere.
- [#1967](https://github.com/moq-wg/moq-transport/pull/1967) (thexeos, Oct-3 03:08) *"Fill Semantics: describe 'no Location Filter' as Type 0x00 instead of 'zero-length'"* — an editorial leftover from [#1953](https://github.com/moq-wg/moq-transport/pull/1953): a `LOCATION_FILTER` no longer has a length, so the old "zero-length filter" wording in Fill Semantics is restated as Type 0x00 (None). No wire change.
- **Datatracker** had no new MoQ submission (transport-22 remains newest); the **mailing list** had no message newer than Oct-2 (no new weekly GitHub digest since Sep-13, still no *"Draftification"* replies ahead of the Oct-13 deadline); **[[moq-monthly|MoQ Monthly]]** is still at #2.

## Implementations: moq-dev ships 0.17.0 and a media-pipeline merge wave

- **[[moq-dev|moq-dev/moq]]** cut the **0.17.0 release train** on Oct-3 evening (release PR [#4596](https://github.com/moq-dev/moq/pull/4596) merged 19:18 UTC): **moq-relay v0.17.0** (20:10), **moq-cli v0.14.0**, **libmoq v0.6.10**, **moq-gst v0.4.10**, **obs-moq v0.6.10**, **moq-ffi v0.4.10**. 0.17.0 is API-breaking: it **removes cluster gossip discovery** ([#4601](https://github.com/moq-dev/moq/pull/4601), `--cluster-mesh` refused), **hard-forks quinn in-tree as `moq-quic`** ([#4617](https://github.com/moq-dev/moq/pull/4617)), and folds in the pre-Seattle conformance work already tracked on [[moq-dev]] — per-request `NOT_SUPPORTED` decode for drafts 14–22 ([#4610](https://github.com/moq-dev/moq/pull/4610)) and the moxygen-compatibility line ([#4253](https://github.com/moq-dev/moq/pull/4253)).
  - Alongside the release, ~25 merges landed Oct-3, mostly in the TS/media pipeline: [#4723](https://github.com/moq-dev/moq/pull/4723) moves catalog/media imports into media namespaces (+5,051/−4,525), [#4750](https://github.com/moq-dev/moq/pull/4750) counts **TR 101 290** errors of a TS feed at import (+1,169/−245), [#4729](https://github.com/moq-dev/moq/pull/4729) rate-limits catalog-estimate updates (+744/−60), [#4733](https://github.com/moq-dev/moq/pull/4733) refuses damaged TS units without ending ingest (+630/−104), [#4735](https://github.com/moq-dev/moq/pull/4735) reassembles interleaved RTMP chunk streams independently (+579/−80), [#4749](https://github.com/moq-dev/moq/pull/4749) optimizes X11 capture with shared memory (+680/−153), and [#4739](https://github.com/moq-dev/moq/pull/4739) resumes reclaimed tracks past the cached group floor.
- **[[moqtail]]** merged [#394](https://github.com/moqtail/moqtail/pull/394) *"reset downstream FETCH on malformed upstream track"* (+30/−3) — the robustness fix tracked as open in the prior entry — plus npm dependency bumps ([#396](https://github.com/moqtail/moqtail/pull/396), [#384](https://github.com/moqtail/moqtail/pull/384)).
- **Quiet**: [[moq-rs]], [[moq-js]], [[imquic]], [[libquicr]], birneee, [[shaka-player]], [[openmoq|OpenMOQ]], all Eyevinn repos. [[quiche-moq|google/quiche]] had no new moqt-dir commit (newest is the Oct-1 STOP_SENDING-on-`Reset()` change already logged).

## Interop: the Oct-3 cut confirms the moq-dev-rs recovery

The **Oct-3 00:25 nightly** is the first cut to carry runner [#133](https://github.com/englishm/moq-interop-runner/pull/133)/[#134](https://github.com/englishm/moq-interop-runner/pull/134), both merged Oct-2:

- **[2026-10-03 00:25:32 UTC](https://englishm.github.io/moq-interop-runner/results/2026-10-03_002532/report.html): 477 cells / 234 pass / 241 fail / 2 skip** (49.1%). The matrix grew **+14 cells** (463 → 477): #133's **libquicr → draft-18** bump added 18 `libquicr`-relay cells in `remote-quic`/`remote-webtransport` modes (against imquic, moq-playa, moq-rs-draft-18, moq5, moqlivemock, moqtopus, moqx, quic-zig, xquic-draft-18) while dropping the four dead moq-rs-draft-14/xquic → libquicr remote cells.
- **moq-dev-rs recovered +8 pass cells** (31 → 39 pass; 55 → 47 fail): #134's adapter fix for moq-relay 0.15's `--server-bind` → `--listen` rename cleared part of the docker block that had been red since Sep-24, exactly as the prior entry predicted.
- **Still targets draft-18.** stitcher-moq's client is now on moq-tokio 0.19.20 (moqt-14–22 capable) via #134, but the nightly runs every endpoint at draft-18, so **no moqt-22 cells appear yet**. Runner [#135](https://github.com/englishm/moq-interop-runner/pull/135)/[#136](https://github.com/englishm/moq-interop-runner/pull/136)/[#137](https://github.com/englishm/moq-interop-runner/pull/137) remain open. See [[interop-runner]].

# Activity (Oct 2 evening → Oct 3) — **The MOQT editors post the Seattle issue triage, the interop runner finally gets its moq-dev-rs adapter fix and a moqt-22 endpoint, and moq-dev reworks its branch model.**

A quiet day on the spec text itself (draft-22 stands), but two things firmed up the pre-Seattle picture: the editors turned Duke's Oct-1 request into a concrete **23-issue priority list**, and the interop runner merged the two PRs that had been blocking a draft-22 endpoint and the moq-dev-rs relay. Slack was not checked this run.

## The editors' Seattle issue triage: 23 priority issues

[[alan-frindell|afrind]] posted *"List of issues to discuss at the hybrid interim"* (list, Oct-2, [permalink](https://mailarchive.ietf.org/arch/msg/moq/npO6unCi6tX2QsCmXDR47DQ4Gqg/)) — the detailed issue/PR breakdown [[martin-duke|Duke]] asked the MOQT editors for when he announced the agenda. It names **23 priority issues** for the Wed/Thu MOQT-issues blocks, roughly a third of the open backlog, and asks the WG to read and discuss them asynchronously beforehand.

- The 23: [#869](https://github.com/moq-wg/moq-transport/issues/869) (limiting subscription resource consumption), [#899](https://github.com/moq-wg/moq-transport/issues/899) (multi-range FETCH), [#1316](https://github.com/moq-wg/moq-transport/issues/1316) (VOD support), [#1352](https://github.com/moq-wg/moq-transport/issues/1352) (SUBSCRIBE forward parameter), [#1354](https://github.com/moq-wg/moq-transport/issues/1354) (dedicated SWITCH message), [#1582](https://github.com/moq-wg/moq-transport/issues/1582), [#1678](https://github.com/moq-wg/moq-transport/issues/1678), [#1704](https://github.com/moq-wg/moq-transport/issues/1704), [#1720](https://github.com/moq-wg/moq-transport/issues/1720), [#1743](https://github.com/moq-wg/moq-transport/issues/1743), [#1792](https://github.com/moq-wg/moq-transport/issues/1792), [#1828](https://github.com/moq-wg/moq-transport/issues/1828), [#1857](https://github.com/moq-wg/moq-transport/issues/1857) (metadata scope), [#1875](https://github.com/moq-wg/moq-transport/issues/1875), [#1897](https://github.com/moq-wg/moq-transport/issues/1897), [#1933](https://github.com/moq-wg/moq-transport/issues/1933), [#1934](https://github.com/moq-wg/moq-transport/issues/1934), [#1941](https://github.com/moq-wg/moq-transport/issues/1941), [#1947](https://github.com/moq-wg/moq-transport/issues/1947), [#1951](https://github.com/moq-wg/moq-transport/issues/1951), [#1958](https://github.com/moq-wg/moq-transport/issues/1958) (stale Largest Object), [#1959](https://github.com/moq-wg/moq-transport/issues/1959) (standalone-FETCH relative filters) and [#1962](https://github.com/moq-wg/moq-transport/issues/1962) (FILL_PARAMETERS).
- The rest of the backlog: **~34 editorial/design issues awaiting a PR, 11 with an open PR under review, and ~20 non-transport / parked / blocked.** Several of the 23 are already on the [[moq-transport]] tracker from the Sep-30→Oct-1 pre-Seattle labelling pass.
- Duke also circulated a *"Food Allergies"* note (Oct-2) for in-person Seattle attendees — logistics only. See [[interim-meetings]].
- **Datatracker** had no new MoQ submission (transport-22 remains newest); **[[moq-monthly|MoQ Monthly]]** is still at #2; no new liaisons or minutes.

## Interop runner: the two blocking PRs merge

Both PRs that the [[interop-runner]] page had been tracking as pending merged on **Oct-2 afternoon**, so the next nightly cut is the first to carry a draft-22 endpoint *and* a working moq-dev-rs relay:

- [#134](https://github.com/englishm/moq-interop-runner/pull/134) ([[steven-riedl|riedlse]], merged 17:13 UTC) moves the `stitcher-moq` client to **moq-tokio 0.19.20** (MoQT 14–22, no moq-lite), refreshes the registry, and — crucially — folds in the **moq-dev-rs adapter fix** for the `--server-bind` → `--listen` rename that had failed all 18 docker cells against that relay since Sep-24.
- [#133](https://github.com/englishm/moq-interop-runner/pull/133) (RichLogan, merged 17:10 UTC) bumps [[libquicr]] from draft-14 to **draft-18**.
- Still open: [#135](https://github.com/englishm/moq-interop-runner/pull/135) (namespace-lifecycle test), [#136](https://github.com/englishm/moq-interop-runner/pull/136) (Nokia relay WT URL back to https), and [#137](https://github.com/englishm/moq-interop-runner/pull/137) (Oct-3, pin [[aiomoqt]] 0.12.0a1, one dual-transport relay adapter, newest-first drafts).
- **No new cut yet**: the Oct-3 nightly had not published by ~01:00 UTC; the last cut is still Oct-2 00:28 (463 / 227 / 235 / 1, 49.0%).

## Implementations: moq-dev reworks its branch model; libquicr and openmoq churn

- **[[moq-dev|moq-dev/moq]]** executed a planned **branch flip** on Oct-2 — *"trunk is main, releases ship from release"* ([#4737](https://github.com/moq-dev/moq/pull/4737), [#4727](https://github.com/moq-dev/moq/pull/4727), [#4730](https://github.com/moq-dev/moq/pull/4730), plus CI follow-ups [#4738](https://github.com/moq-dev/moq/pull/4738)/[#4740](https://github.com/moq-dev/moq/pull/4740)/[#4742](https://github.com/moq-dev/moq/pull/4742)/[#4743](https://github.com/moq-dev/moq/pull/4743)). This is a repo-workflow change (dev→main, main→release), not a protocol change, and there is no new release (still the Sep-30 batch). Alongside it, conformance/net churn continued: [#4726](https://github.com/moq-dev/moq/pull/4726) validates monotonic `hang` group starts, [#4698](https://github.com/moq-dev/moq/pull/4698) hands a subscriber's cursors to a park's cache, plus ~20 fresh open PRs including [#4731](https://github.com/moq-dev/moq/pull/4731) (edge/core cluster roles over TLS qmux), [#4729](https://github.com/moq-dev/moq/pull/4729) (rate-limit catalog estimate updates) and [#4712](https://github.com/moq-dev/moq/pull/4712) (untimed-frames planning).
- **[[libquicr]]** merged [#978](https://github.com/Quicr/libquicr/pull/978) (always fire `OnNewConnection` first) and [#948](https://github.com/Quicr/libquicr/pull/948) (stream-threading fixup); [#979](https://github.com/Quicr/libquicr/pull/979)/[#981](https://github.com/Quicr/libquicr/pull/981)/[#982](https://github.com/Quicr/libquicr/pull/982) are open docs/threading PRs.
- **[[openmoq|OpenMOQ]]**: moqx [#785](https://github.com/openmoq/moqx/pull/785) syncs moxygen (changelog PR #784 open); moqxr merged [#46](https://github.com/openmoq/moqxr/pull/46) *"Add DATAGRAM advertisement"* (+534/−3).
- **Quiet**: [[moq-rs]], [[moq-js]], [[moqtail]], [[imquic]], birneee, [[shaka-player]], all Eyevinn repos. [[quiche-moq|google/quiche]]'s only moqt commit (STOP_SENDING on `Reset()`) was already captured above.

# Activity (Sep 30 → Oct 2) — **draft-22 lands eleven days before Seattle interop, carrying one wire change that the "identical to -20" framing left out. Draft-14 starts leaving the interop matrix, and the auth design team gets its own channel.**

The spec side moved in a single evening: on **Thu Oct-1** [[alan-frindell|afrind]] merged three PRs between 18:15 and 21:31 UTC, tagged `draft-ietf-moq-transport-22` at 21:33, and the datatracker posted it at 21:36. He then spent the next hour labelling issues for Seattle. The interop runner shed its first draft-14 cells. On Slack, [[imquic]] became the first relay with public draft-20/21 support, and testing found bugs in it within hours.

## draft-22 is published, and it is not quite wire-identical to -20

[`draft-ietf-moq-transport-22`](https://datatracker.ietf.org/doc/draft-ietf-moq-transport/22/) (165 pages, expires 2027-04-04) is the Seattle interop target named at [[interim-meetings|interim-24]] together with draft-18. Release notes are [PR #1965](https://github.com/moq-wg/moq-transport/pull/1965) (afrind, approved by [[suhas-nandakumar|Suhas]]).

- **One control-plane change.** `LOCATION_FILTER` (0x21) replaces its Length field with an explicit **Location Filter Type** ([#1953](https://github.com/moq-wg/moq-transport/pull/1953), [[ian-swett|Swett]], merged Oct-1 18:17 UTC). The types are 0x00 none, 0x01 relative start, 0x02 absolute start, 0x03 + group end, 0x04 absolute range, 0x05 Next Object; any other value is a `PROTOCOL_VIOLATION`. A draft-20/21 decoder will misread it. [[martin-duke|Duke]]'s Sep-21 *"-22 is functionally identical to -20 except the ALPN"* therefore holds everywhere except this one parameter.
- **Everything else is editorial**, most of it merged on `main` from Sep-6 to Sep-11 and held out of the move-only -21. The last piece was [#1946](https://github.com/moq-wg/moq-transport/pull/1946) (afrind, +243/−190, merged 18:15 UTC after vasilvv's approval four minutes earlier). It restructures Publisher and Namespace Discovery: a Namespace Prefix Matching section, `SUBSCRIBE_TRACKS` moved under Publishing and Receiving Tracks, and a ladder diagram. Per the PR, 2,343 of 2,379 sentences are unchanged.
- **Not in -22**: Zero-length Track Names ([#1954](https://github.com/moq-wg/moq-transport/pull/1954)) and `DEFAULT PUBLISHER PRIORITY` as a parameter ([#1957](https://github.com/moq-wg/moq-transport/pull/1957)), both approved, plus `INCLUDE_PAYLOAD` ([#1955](https://github.com/moq-wg/moq-transport/pull/1955)), the FETCH relative-filter ban ([#1960](https://github.com/moq-wg/moq-transport/pull/1960)) and Filter Sets ([#1894](https://github.com/moq-wg/moq-transport/pull/1894)).

Full itemisation in [[moq-transport]].

## WG tracker: three merges, then a pre-Seattle triage pass

- **New issues.**
  - [#1962](https://github.com/moq-wg/moq-transport/issues/1962) ([[lorenzo-miniero|Miniero]], Sep-30) asks how `FILL_PARAMETERS` works with `SUBSCRIBE_TRACKS`. afrind: the publisher should act as if a `SUBSCRIBE` had carried them, echo them in `PUBLISH` and open a fill fetch stream. He concedes the text is unclear and is *"not sure if it actually will work."*
  - [#1963](https://github.com/moq-wg/moq-transport/issues/1963) and [#1964](https://github.com/moq-wg/moq-transport/issues/1964) ([[martin-duke|Duke]], Oct-1) cover parameter restrictions. Delivery timeouts in `REQUEST_UPDATE` and *"any SUBSCRIBE parameter"* in `SUBSCRIBE_TRACKS` (which would include `RENDEZVOUS_TIMEOUT`) need limits, and `EXPIRES` should be allowed in every `_OK`.
- **Seattle prep, Oct-1 18:45–19:18 UTC.**
  - afrind marked [#1948](https://github.com/moq-wg/moq-transport/issues/1948) (NEW_GROUP_REQUEST far-future ID), [#1889](https://github.com/moq-wg/moq-transport/issues/1889) (pause-mechanism interaction: core, or the Top-N/SSTS extension docs?) and [#1850](https://github.com/moq-wg/moq-transport/issues/1850) (payload-compression properties) **BLOCKED** with "discuss in Seattle?".
  - On the Quint-found stale Largest Object bug ([#1958](https://github.com/moq-wg/moq-transport/issues/1958)): *"let's make a PR to have something to discuss with the wg in Seattle."*
  - On [#1959](https://github.com/moq-wg/moq-transport/issues/1959), Swett's point that a FETCH *end* may also need a live Largest Object puts the premise of [#1960](https://github.com/moq-wg/moq-transport/pull/1960) in doubt.
  - [[mo-zanaty|Zanaty]] and afrind debated multi-range FETCH ([#899](https://github.com/moq-wg/moq-transport/issues/899)). Zanaty pointed out that multi-range location filters would bring back the Length field that #1953 just removed.
- **Metadata scope ([#1857](https://github.com/moq-wg/moq-transport/issues/1857))**: michalhosna (Sep-30) argues that mid-group relays never see object 0, so `SUBGROUP_`/`OBJECT_DELIVERY_TIMEOUT` silently fall back to the Track value. He wants subgroup-level metadata in the data plane.
- **Totals**: moq-transport 3 merges (#1946, #1953, #1965), 1 new PR, 3 new issues, 2 closed (#841, #1937). Other moq-wg repos had no merges.

## Auth: the design team gets a channel, and DPoP folds into C4M

- **`#moq-auth-design-team`** (quicdev Slack) was created by [[mike-english|Mike English]] on **Sep-30**, right after a design-team call. He posted "Chris's detailed worked example from today's call" as a Mermaid sequence diagram.
  - The plan is to *"add a section to the MOQT draft that describes this new AUTH message and how it gets used"*, drafted first in English's [`englishm/moq-transport`](https://github.com/englishm/moq-transport) fork before a WG PR.
  - Chris, presumably C4M co-author Chris Lemmons, offered a matching [[moq-c4m|C4M]] PR to illustrate usage. English wondered whether DPoP *"would be a separate draft … or even the main thing we need?"*
  - [[aman-sharma|Aman Sharma]] suggested a skeleton draft with sections people claim. [[suhas-nandakumar|Suhas]] and [[cullen-jennings|Cullen Jennings]] have joined the channel.
- **DPoP into C4M**: Suhas's [CAT-4-MOQT PR #53](https://github.com/moq-wg/CAT-4-MOQT/pull/53) (Oct-1, +224/−251) *"folds generic-dpop-proof into this draft per Security AD guidance."* That would retire `draft-nandakumar-moq-generic-dpop-proof` as a separate document. No reviews yet.
- The design team has the Oct-15 10:00 slot on the Seattle agenda.

## Seattle: agenda rev-04, slides due Oct-8, and a request for more auth time

- **[[martin-duke|Duke]], "Seattle Agenda"** (Oct-1 17:30 UTC, [permalink](https://mailarchive.ietf.org/arch/msg/moq/XMC07kPpTvwNsGPzPleWWWpVDFk/)): *"Magnus and I have hammered out a Seattle Agenda."* This is the first list announcement; the Sep-28 upload was never announced. **Slides are due by Oct-8**, and the MOQT editors are asked to post a detailed issue/PR breakdown.
  - Rev-04 adds **"Deployment Results: SWITCH_FROM and Group metadata"** ([[steven-riedl|Riedl]], Wed 13:20) and doubles the **Auth Design Team** to 60 minutes (Thu 10:00).
  - Still no slot for MSF, CMSF, LOC or LOCMAF.
- **[[alan-frindell|afrind]] (19:23 UTC, [permalink](https://mailarchive.ietf.org/arch/msg/moq/ZuyN7KlUx3ZPCx3gZdUKA0w49G0/))**: an hour can't cover the **11 open auth-labelled MOQT issues**. He and Swett offer some of their issue time if the design team brings slides and leads. No chair reply yet.
- **Oct-26 confirmed as interim-30** (Duke 20:23 UTC: *"There are no comments. 26 October is the date"*). The IESG announced it at 21:11 UTC: 16:30–18:00 UTC, agenda "MoQT Issues", [session page](https://datatracker.ietf.org/meeting/interim-2026-moq-30/session/moq).
- **Other list traffic**: the *"I-D Action"* for transport-22 (21:36 UTC) and Swett's explanation of the wire change (Oct-2 01:48 UTC, [permalink](https://mailarchive.ietf.org/arch/msg/moq/Skq5AItURwj-Ja7K-dpD56lyYIc/)). *"Draftification"* (top-N / SSTS) has no replies yet, and its list-discussion deadline is Oct-13. The weekly GitHub digest bot has not posted since Sep-13.
- **Datatracker**: transport-22 was the only MoQ submission (140 total since Sep-29). All other WG documents are unchanged (loc-04, msf-01, cmsf-01, secure-objects-01, privacy-pass-auth-03, c4m-01). **Not renewed**: `draft-duke-moq-subscribe-rewind-02` (see [[joining-fetch]]) expires **Oct-4** and herz-moq-nmsf-01 **Oct-9**. No new liaisons; no new minutes. IETF 127's sessions are still unscheduled. See [[interim-meetings]].

## MSF: media timeline and the DVR window

[[gwendal-simon|Gwendal Simon]] filed [msf #213](https://github.com/moq-wg/msf/issues/213) (Sep-30). The Media Timeline requirements still refer to a `type` identifier, and he proposes `packaging: "mediatimeline"` instead.

On [msf #205](https://github.com/moq-wg/msf/issues/205) (DVR) he prefers a catalog field covering both timeline tracks, named `accessibleWindowTime` (ms) or `accessibleWindowGroup` rather than "DVR". He also points out that the first object of each timeline group grows without bound: about 43k records (~1.5 MB) for a 24 h stream with 2 s groups. His proposed fix: *"a publisher SHOULD omit records of Groups that are no longer accessible."* No MSF merges.

## Slack: imquic goes to v20/v21, and FETCH ordering bugs surface

- **[[lorenzo-miniero|Miniero]] (`#moq`, Oct-1 10:13 UTC)** updated [[imquic]] and his public relay (`lminiero.it:9000`) to **v20/v21**: `LOCATION_FILTER` and `FILL_PARAMETERS`. He expects it *"will break in a million pieces once it's tested with different endpoints"*. Fill FETCH works, but more than one FETCH per subscription (one in `SUBSCRIBE`, another in `REQUEST_UPDATE`) is probably broken. His runner client also now implements the new `rendezvous-timeout` case.
  - [[aman-sharma|Aman Sharma]] found a FETCH ordering bug within hours. With subgroup 0 holding objects 0 and 2 and subgroup 1 holding 1 and 3, the relay sent 0, 2, 1, 3. Miniero fixed ascending order at once; descending order was still broken after a quick second fix. Sharma's FETCHes were plain standalone requests, not triggered by `FILL_PARAMETERS`.
- **`#moq-interop-runner` (Sep-30)**: [[yu-you|Yu You]] ran moxygen's conformance Section 8 (PUBLISH) against the Nokia relay and everything passed. afrind said results differ over longer RTTs and that the tool has known bugs to be fixed soon.
- `#moq-rs`, `#moq-js`, `#libquicr`: silent.

## Interop: draft-14 starts leaving the matrix, and the pass rate hits a high

- **Oct-1 00:32 cut: 463 cells / 223 / 238 / 2.** [Runner #131](https://github.com/englishm/moq-interop-runner/pull/131) (moqx drops d14) merged Sep-30 15:27 UTC and removed **12 draft-14 cells**, all already failing. The behind band went 117 → 105, its first change since Sep-2.
- **Oct-2 00:28 cut: 463 / 227 / 235 / 1 (49.0%)**, the best pass rate of any cut with 50+ cells. Most of the +4 is the moqtail relay recovering from 4 → 7 passes with no moqtail commits in between.
- **Hidden failure**: all 18 docker cells against the moq-dev-rs relay have failed since Sep-24, because moq-relay 0.15 renamed `--server-bind` → `--listen`. [Runner #134](https://github.com/englishm/moq-interop-runner/pull/134) ([[steven-riedl|riedlse]]) fixes it and is the **first runner PR to declare draft-21/22**, for `stitcher-moq` via moq-tokio 0.19.20.
- **Other runner PRs**: libquicr → draft-18 ([#133](https://github.com/englishm/moq-interop-runner/pull/133)) and a namespace-lifecycle test ([#135](https://github.com/englishm/moq-interop-runner/pull/135)) are open. The nightly still targets draft-18. See [[interop-runner]].

## Implementations: imquic reaches v21, moq-dev ships a breaking relay, and the -22 retargeting begins

- **[[imquic]]** merged draft-20/21 to `main` ([#38](https://github.com/meetecho/imquic/pull/38), Oct-1, +2,110/−704) and runs it on the public relay. Same-day fixes corrected FETCH ordering (see Slack above).
- **[[moq-dev|moq-dev/moq]]** released **moq-relay 0.16.0** on Sep-30 (breaking auth parity, [#4319](https://github.com/moq-dev/moq/pull/4319); tag and crates.io only). 0.17.0 is already queued ([#4596](https://github.com/moq-dev/moq/pull/4596), which removes cluster gossip).
  - About 100 merged PRs, including a conformance push *"ahead of the Seattle interop"*. [#4610](https://github.com/moq-dev/moq/pull/4610) (+1,363/−330) decodes every legal request on drafts 14–22 and answers unsupported ones with `NOT_SUPPORTED` rather than closing. [#4253](https://github.com/moq-dev/moq/pull/4253) finishes the moxygen-compatibility line.
  - The wave ran through the night of Oct-1→2: five more net/mux merges by 03:41 UTC, among them [#4685](https://github.com/moq-dev/moq/pull/4685) (+268/−328) refusing a per-request `SUBSCRIBE_TRACKS` with `NOT_SUPPORTED` (the data-plane companion to #4610) and abandoned-FETCH / spliced-group fixes ([#4689](https://github.com/moq-dev/moq/pull/4689), [#4691](https://github.com/moq-dev/moq/pull/4691)). [#4702](https://github.com/moq-dev/moq/pull/4702) bumps moq-noq to 1.3.3 for the **RUSTSEC-2026-0185** advisory — a dependency fix, not a protocol change.
  - moq-lite-07 wire work continues behind a `-wip` flag ([#4455](https://github.com/moq-dev/moq/pull/4455)).
- **[[openmoq|OpenMOQ]]**:
  - moq-playa closed its draft-21 PR #20 in favour of a long-lived `feature/draft-21` branch, and is renaming its npm scope to `@openmoq/*` ([#21](https://github.com/openmoq/moq-playa/pull/21)).
  - moq2ts conforms its catalog and media timeline to MSFTS-02 / MSF-01 ([#4](https://github.com/openmoq/moq2ts/pull/4), [[gwendal-simon|Simon]]).
  - moqx: CI and release-tarball PRs (incl. [#782](https://github.com/openmoq/moqx/pull/782), gmarzot, making the stats stack private), plus afrind's pipelined joining-FETCH fix ([#783](https://github.com/openmoq/moqx/pull/783), open). It stays on drafts 16 + 18.
- **[[shaka-player]]** merged **SCTE-35 via MSF event timeline tracks** ([#10668](https://github.com/shaka-project/shaka-player/pull/10668), +1,428/−34). [#10670](https://github.com/shaka-project/shaka-player/pull/10670) (catalog join via `FILL_PARAMETERS` on draft-20/21) is open. v5.3.0 is still unreleased.
- **[[libquicr]]** merged 11 PRs on draft-18. One of them, [#953](https://github.com/Quicr/libquicr/pull/953), handles a peer SETUP that arrives before or after the local one, which fixes interop with moqx.
- **[[quiche-moq|google/quiche]]** (Duke): session-level draft-18 GOAWAY, and STOP_SENDING on every `Reset()`.
- **[[moxygen]]**: proxied-PUBLISH failover (Aman Sharma) and per-object moqtest deadlines. `kSupportedVersions` is still {14, 15, 16, 18}, which keeps runner #132 waiting.
- **[[moq-rs]]**: no merges. New PRs bring back draft-16 Joining FETCH as a standalone FETCH ([#237](https://github.com/cloudflare/moq-rs/pull/237)) and keep subscriptions alive when a superseded subgroup is cancelled ([#239](https://github.com/cloudflare/moq-rs/pull/239)). HenrySchlesinger also filed seven issues, including the draft-18 relay closing the session on a moq-dev `SUBSCRIBE_NAMESPACE` ([#243](https://github.com/cloudflare/moq-rs/issues/243)).
- **[[moqtail]]**: [#394](https://github.com/moqtail/moqtail/pull/394) (malformed upstream FETCH → `MALFORMED_TRACK`) and a thorough review of the SSTS PR #374. [[aiomoqt]]: 0.12.0 work continues on a branch (#40: priority, draft-20), and aiopquic 0.5.0 is in a release PR.
- **Quiet**: [[moq-js]], birneee/quiche_moq, and all Eyevinn repos (moqlivemock v0.16.1, warp-player v0.16.0, moqtransport v0.14.0 and locmaf remain the newest).
- **Not yet on -22**: no tracked implementation has announced the draft-22 Location Filter Type. moq-dev's shim and Paramount's relay already negotiate `moqt-22`; whether they use the new filter encoding was not checked.
- **Community**: [[moq-monthly|MoQ Monthly]] is still at #2. No wiki issues.
