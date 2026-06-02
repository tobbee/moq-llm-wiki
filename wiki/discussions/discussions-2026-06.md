---
title: "Discussions - June 2026"
tags: [discussions, slack, github]
date: 2026-06-01
last_updated: 2026-06-02
status: current
---

Summary of active discussions in the MOQ ecosystem during June 2026.

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
