---
title: "MOQT Streaming Format (MSF)"
tags: [draft, media, streaming-format]
date: 2026-04-10
last_updated: 2026-05-30
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-msf/"
---

> **2026-05-30**: **MSF -01 wilaw "Friday" promise unfulfilled on Datatracker May 29**. Will Law's May 27 Slack pledge to publish MSF -01 *"this Friday ahead of the London interop"* (May 29 UTC) did **NOT** result in a Datatracker submission by EOD May 29 UTC. Datatracker still shows **draft-ietf-moq-msf-00** (Jan 19 2026, **Day +131**) as the latest revision. What did happen May 29 on `moq-wg/msf`: **[PR #173](https://github.com/moq-wg/msf/pull/173) MERGED 08:52:14 UTC** *"Update normative references for MoQ drafts"* (+2/−2, fixes new [Issue #172](https://github.com/moq-wg/msf/issues/172) which CLOSED 1 second later); **[PR #174](https://github.com/moq-wg/msf/pull/174) MERGED 11:12:25 UTC** *"Update media presentation timestamp rounding description"* (+2/−2, fixes [Issue #108](https://github.com/moq-wg/msf/issues/108) — open since pre-2026, CLOSED 2 seconds later). **First announced-but-unmet draft cadence the wiki has tracked**. Plausible causes: (a) wilaw discovered last-minute issues that delayed submission; (b) "Friday" was meant as US-Pacific-evening cutoff which extends into May 30 UTC; (c) the draft was held to coincide with secure-objects PR #88 + transport Issue #1637 ripening for a coordinated London-cycle drop. **Carry-forward**: with London hackathon **10 days away** and MSF -01 now off-schedule, the **London Day-2 35-min MSF/CMSF slot** loses its anchor normative artifact unless -01 lands in the next ~5 business days. The downstream Lorenzo / Mike English / Mo Zanaty interest in MSF-vs-LOC media-format-level interop ([interop-runner Issue #32](https://github.com/englishm/moq-interop-runner/issues/32)) needs the -01 cut to anchor implementation choices.
>
> **2026-05-29**: **[[will-law|Will Law]] announces MSF -01 publishes today (Friday) ahead of London — first revision since -00 Jan 19 2026 (130-day gap)**. In Slack `#moq` May 27 12:30 CEST (10:30 UTC) Will Law replied to [[lorenzo-miniero|Lorenzo Miniero]]'s May 27 08:21 UTC "Is moq-mi still relevant?" thread: *"LOC is just a packaging format, so if you want to transmit media, then you should use MSF (MOQT Streaming Format). There is a -00 draft in the ID repo, however its old and we have a bunch of new features. **I plan to release a new draft this Friday ahead of the London interop.** For a preview, you can view https://moq-wg.github.io/msf/draft-ietf-moq-msf.html"* — **converts wilaw's 16-events-in-4-days editorial sprint May 24-27 into a normative artifact**. Cuts expected to land in -01: **PR #166** (typed-object initDataList based on Tobbe's design, MERGED May 27 08:35 UTC), **PR #167** (targetBuffer per-track property, MERGED May 27 20:22 UTC, fixes #150 wall-clock), **PR #168** (catalog object specifications and numbering, MERGED May 27 08:14 UTC, fixes #149), **PR #173** (normative reference update to draft-ietf-moq-loc-02, OPEN, fixes new #172). Open PRs that may or may not make -01: **#165** (bitrate properties, OPEN), **#171** (parent-namespace, OPEN), **#174** (timestamp rounding, OPEN). **Carry-forward**: with MSF -01 publication today providing the **first concrete spec artifact for the London Day-2 35-min MSF/CMSF slot**, plus Tobbe's three remaining Issue #153 points still open (per-language `lang` override + Safari/FairPlay AVC1-vs-AVC3 + mid-stream-init-change scheduling) shaping the post--01 backlog, wilaw establishes the **publication cadence as "draft-XX every ~4 months"** — slower than moq-transport (draft-17 → draft-18 in 49 days) but consistent with MSF's higher relative editorial stability as a packaging-format spec rather than a wire-protocol spec. Same-day downstream signal: **Mike English Slack reply May 27 16:01 UTC** asks for **streaming-format-level automated interop in the interop runner** ([Issue #32](https://github.com/englishm/moq-interop-runner/issues/32)) — currently matrix tests wire-protocol correctness only, not MSF/CMSF/LOC media-format-level interop; Mike signals this is desired for London but not yet built.
>
> **2026-05-28**: **[[will-law|wilaw]] sprint Day 3 May 27 — 3 PRs MERGED + 3 PRs OPEN + Issue #150 CLOSED (open 56 days) + Issue #172 NEW = 7 events**. **[PR #166](https://github.com/moq-wg/msf/pull/166)** (Tobbe's typed-object initDataList design) **MERGED 08:35 UTC** — the May 26 design adoption lands in `main`. **[PR #168](https://github.com/moq-wg/msf/pull/168)** *"Revise catalog object specifications and numbering"* **MERGED 08:14 UTC** (+19/−9, fixes #149). **[PR #167](https://github.com/moq-wg/msf/pull/167)** *"Introduce target buffer property in track object"* **MERGED 20:22 UTC** (+37/−0, fixes #150) adds per-track `targetBuffer` seconds property defining required end-to-end buffer for smooth playback — **closes [[luke-curley|kixelated]]'s Apr 1 [Issue #150 "Wall clock is problematic"](https://github.com/moq-wg/msf/issues/150)** (open 56 days). **wilaw's resolution sidesteps the wall-clock debate**: rather than removing the wall-clock or defining synchronization semantics, adds an explicit per-track buffer-depth property that gives subscribers actionable guidance independent of publisher-clock accuracy. **[PR #171](https://github.com/moq-wg/msf/pull/171)** *"Add optional parent namespace field to clone tracks"* still OPEN. **[PR #173](https://github.com/moq-wg/msf/pull/173)** OPEN 10:40 UTC *"Update normative references for MoQ drafts"* (+2/−2, fixes new [Issue #172](https://github.com/moq-wg/msf/issues/172)) — wilaw filed Issue #172 same day flagging that MSF still points to `draft-mzanaty-moq-loc-05` (individual, superseded) instead of `draft-ietf-moq-loc-02` (WG, current). **[PR #174](https://github.com/moq-wg/msf/pull/174)** OPEN 12:24 UTC *"Update media presentation timestamp rounding description"* (+3/−2, fixes #108). **wilaw 16 MSF events in 4 days (May 24-27)** = largest single-contributor MSF push since draft adopted; **closes kixelated's longest-open issue** via PR #167. **Carry-forward**: Tobbe's remaining 3 of 4 original Issue #153 points (per-language `lang` override, Safari/FairPlay AVC1-vs-AVC3, mid-stream-init-change scheduling) are still open on #153 even with PR #166's typed-object shape merged; the wilaw sprint has not yet touched those points.
>
> **2026-05-27**: **[[will-law|Will Law]] revises [PR #166](https://github.com/moq-wg/msf/pull/166) May 26 13:05 UTC to adopt [[tobbe-einarsson|Tobbe]]'s typed-object design** — bare base64 strings + numeric indices replaced by `{"id": "1", "type": "inline", "data": "AAAA…"}` with named string refs (`"initRef": "1"`). **Tobbe approves 12 minutes later** (*"That's perfect. I didn't wanted to introduce the init tracks now, but just make the format future extensible."*). The May 26 "partially absorbed" framing **flips to "design accepted"**: wilaw kept commit authorship but adopted the underlying design verbatim, including forward-extensibility hooks for non-`"inline"` types (separate MoQ track / HTTP URL / content-addressed) in a future PR. **1-day review-to-revision cycle is the fastest spec-side feedback loop on `moq-wg/msf` in May 2026**. Plus **4 more wilaw events same day**: **[PR #170](https://github.com/moq-wg/msf/pull/170) MERGED in 1 min** (revert accidental direct-to-main commit), **[PR #171](https://github.com/moq-wg/msf/pull/171) OPEN** *"Add optional parent namespace field to clone tracks"* (fixes #146), **[PR #169](https://github.com/moq-wg/msf/pull/169) OPEN** *"Update MOQT mapping details"* (fixes #148), and **[[victor-vasiliev|Vasil V]] rejection on [Issue #144](https://github.com/moq-wg/msf/issues/144)**: *"Accept-Encoding does not really work with MoQ model of fan-out (in general, data can flow from publisher to subscribers, but not back)"* — closes Tobbe's May 25 17:21 UTC negotiated-compression suggestion as architecturally incompatible (the MoQ fan-out tree means a SUBSCRIBE-side Accept-Encoding negotiation can't be honored differently per subscriber on a shared relay path). **wilaw 9 MSF events in 3 days (May 25-27)** — largest MSF spec-side push by a single contributor since the draft was adopted; sprinting toward the London Day-2 35-min MSF/CMSF slot. **Carry-forward**: Tobbe's remaining 3 of 4 original Issue #153 points (per-language `lang` override, Safari/FairPlay AVC1-vs-AVC3, mid-stream-init-change scheduling) are still open; the typed-object PR #166 shape **pre-positions a follow-on PR** for time-varying init via the same `initDataList` references (Tobbe's `"initSchedule": [{"fromGroup": 0, "ref": "v1"}]` sketch fits cleanly on top).
>
> **2026-05-26**: **[[will-law|Will Law]] (Akamai) ships 4 MSF PRs on May 25** between 12:55–16:24 UTC — **[PR #165](https://github.com/moq-wg/msf/pull/165)** *"Update bitrate and related properties"* (+49/−24, fixes [#164](https://github.com/moq-wg/msf/issues/164)) adds `maxGOPDuration`, `maxGroupDuration`, `averageBitrate` properties, **makes `sampleRate`+`channels` required for audio and `codec`+`width`+`height` required for video**, and redefines `bitrate` as maximum bitrate — direct response to [[luke-curley|kixelated]]'s May 22 *"it's reaally annoying that everything is optional"* ask; **[PR #166](https://github.com/moq-wg/msf/pull/166)** *"Enhance root catalog with Initialization Data List"* (+25/−12, **partial fix for [#153](https://github.com/moq-wg/msf/issues/153)**) adds a root-level `initDataList[]` and per-track `initData` references for catalog readability/dedup — **wilaw explicitly pings the wiki user [[tobbe-einarsson|Tobbe]]: *"please review #166 and see if it meets your needs"***; **[PR #167](https://github.com/moq-wg/msf/pull/167)** *"Introduce target buffer property"* (+21/−0, fixes #150); **[PR #168](https://github.com/moq-wg/msf/pull/168)** *"Revise catalog object specifications and numbering"* (+19/−9, fixes #149). Plus **[PR #157](https://github.com/moq-wg/msf/pull/157) by [[suhas-nandakumar|Suhas Nandakumar]] MERGED May 25 09:16 UTC** *"Clarify Group numbering requirements for restarts (#147)"* (10/−13). **Structural significance**: Tobbe's offered May 23 PR for `initDatas[]` + `initDataRefID` is **absorbed back into Akamai-authored form within 48 hours** — wilaw shipped his own version (PR #166) implementing Tobbe's Point (2) readability dedup, but **does NOT cover the Safari/FairPlay AVC1-vs-AVC3 Point (4) or per-language override Point (3)** which remain open on #153. Pattern read: editor (wilaw, MSF spec author) maintains editorial control by shipping the closest sub-feature himself; external design proposals get **partially absorbed** rather than directly merged via outside PR. Also: **[Issue #144 zlib catalog compression](https://github.com/moq-wg/msf/issues/144) updated by Tobbe May 25 17:21 UTC** — *"It would be nice to have some general way of signaling an 'Accept-Encoding' in a FETCH or SUBSCRIBE, and have the publisher signal back what compression it used if any."* — broadens the compression-negotiation question from publisher-decides to protocol-negotiated. **Carry-forward**: 4 active MSF PRs + 2 long-open issues (#144 compression, #153 partial-fix complete) mean **the London Day-2 35-min MSF/CMSF slot now has 4 concrete diffs to land** under wilaw's editorial control.
>
> **2026-05-24**: **[[tobbe-einarsson|Torbjorn Einarsson]] May 23 16:02 UTC substantive comment on [Issue #153](https://github.com/moq-wg/msf/issues/153)** — re-opens the catalog-bloat / mid-stream-init-change conversation just as suhasHere May 14 had asked to close. **4 numbered points**: (1) cross-packaging dedup is a different case from accidental duplicates — two MoQ tracks carrying same source media in different packagings could deliberately share one init segment; (2) readability is a benefit compression cannot deliver — root-level `initDatas[]` makes uncompressed catalogs skim-able, analogous to CMSF `contentProtection` referenceIDs (responsive to Vasiliev's #144 zlib proposal); (3) catalog override of some initData fields, with `lang` overriding `mdhd.language` as the clearest candidate (lets audio tracks with different languages encoded the same way share an init); (4) **AVC3 doesn't resolve the mid-stream-change question because Safari (notably for FairPlay DRM) requires `avc1`/`hvc1` sample entries with parameter sets in the decoder configuration record, not `avc3`/`hev1` with inline parameter sets** — self-initializing segments aren't an option for Safari/FairPlay pipelines. **Offers to write a focused PR** for `initDatas[]` + per-track `initDataRefID`. On the orthogonal mid-stream-change question: mentions kixelated's `trackID` proposal, Apple's `sampleDescriptor` (for switching between encrypted and unencrypted segments), and a DASH-style `emsg`-with-`publishTime` pattern (would map to catalog group + object ID in MoQ). **First material `moq-wg/msf` contribution by the wiki user**; would be the first MSF schema additive contribution from outside the Akamai/Cloudflare/Cisco/Google/AWS core.
>
> **2026-05-23**: **[Issue #164](https://github.com/moq-wg/msf/pull/164) OPENED May 22 20:17 UTC by [[luke-curley|kixelated]]** — *"Require sample rate and channels"*: *"These fields should be required for audio tracks. If they're optional, I have to parse the init segment (gross) just to figure out if I should subscribe to the given track. And yeah I already filed a few issues, but we should have more required fields in MSF. **It's reaally annoying that everything is optional.**"* Kixelated's third successive MSF schema strengthening ask (after track-level `bitrate` / `displayResolution`); the pattern is *"MSF as a subscribe-decision oracle, not a sub-spec of the init segment"*. **Carry-forward**: the Will Law (MSF/CMSF) 20-min London Day-2 slot now needs to land an editorial commitment on which MSF fields move from optional to required.

**draft-ietf-moq-msf-00** | 34 pages | Expires 2026-07-23

# Authors
- [[will-law]] (Akamai)

# Abstract

MSF defines the streaming format for delivering media over [[moq-transport]]. It enables delivery of [[moq-loc]]-compliant media through bitstream fragmentation into independently transmittable objects. Replaces the earlier draft-ietf-moq-warp.

# MSF Packaging Extensions (Individual Drafts)

MSF defines an umbrella for codec/container packaging. As of May 2026, two extension drafts have been proposed:

- **[[moq-cmsf|CMSF (`cmaf`)]]** (`draft-ietf-moq-cmsf-00`, WG) — CMAF-compliant packaging for MSF.
- **[[moq-msfts|MSFTS (`m2ts`)]]** (`draft-gregoire-moq-msfts-00`, individual, **submitted May 6 2026**, 21 pages) — *MPEG-2 Transport Stream Packaging for Media Over QUIC Transport*. Authors: **Paul Gregoire** (Red5) and **[[gwendal-simon]]** (Synamedia). Registers the **`m2ts`** packaging value alongside CMSF; defines 10 m2ts-specific catalog fields including `m2tsPacketSize` (188 or 192 octets), `m2tsProgramNumber`, `m2tsPmtPid`, `m2tsPcrPid`, `m2tsPsiInterval`, `m2tsRandomAccess`, `m2tsTimestampMode`, `m2tsScte35Pid`, and `initData` (Base64-encoded init packets). **First non-CMAF, non-LOC packaging extension** — extends MSF to broadcast/contribution workflows where MPEG-2 TS remains the dominant container.

# Key Features

- **Video and audio codec support**: Compatible with LOC packaging
- **Catalog track**: Describes content characteristics via [[catalog-format]]
- **Media and event timeline tracks**: Temporal mapping for synchronization
- **Latency modes**:
  - Real-time: <500ms
  - Interactive: 500-2500ms  
  - Standard: >2500ms
- **[[adaptive-bitrate]]**: ABR switching between time-synchronized tracks
- **Content encryption**: Integration with [[moq-secure-objects]]

# Structure

MSF defines how media is organized into MOQT tracks:
1. **Catalog track** - JSON-based description of all available tracks
2. **Media tracks** - Audio and video encoded with LOC
3. **Timeline tracks** - Wall clock to media time mapping
4. **Event tracks** - Timed metadata (SCTE-35, captions, etc.)

# Active Issues (moq-wg/msf)

- **#155** (opened Apr 22) — *Sequence aligned groups are too restrictive* ([[luke-curley]]). Argues §4.2 currently mandates group-aligned boundaries across tracks, which forces audio to buffer until video keyframe boundaries are known, breaks on-demand encoding of late-added renditions, prevents mixing GoP sizes across renditions (1s for 360p vs 4+s for 4K), and complicates transcoding non-source renditions. Proposes MSF require shared PTS but loosen group alignment; CMSF can keep alignment for HLS/DASH back-compat.
- **#153** — `initTrack` does not work. **RESOLVED Apr 22 via revert** — see PR #154 below. Catalog-bloat follow-up discussion: [[will-law]] proposes `initCopy` (point to another track's init) or more general `inherit` (all properties from a parent track); [[victor-vasiliev|Victor Vasiliev]] asks if [#144 zlib compression](https://github.com/moq-wg/msf/issues/144) could solve the repetition problem; [[luke-curley]] argues two tracks *shouldn't* have identical init data if the publisher is demuxing correctly, so `initCopy` is mostly useful for HLS→MoQ passthrough.
- **#150** - Wall clock is problematic
- **#149** - Catalog Mapping to MoQT
- **#148** - Media Mapping to MoQT
- **#147** - Confusing Media Transmission section
- **#146** - Clone and track name collisions
- **#145** - Ordering of delta updates
- **#144** - Compression for the catalog
- **#140** - JSON Merge Patch
- **#139** - Required/optional fields per role
- **#136** - No mechanism to delta update a track
- **#135** - Delta updates are not generic

# Recent PRs

- **PR #154** (Merged Apr 22) — **Revert "Add support for InitTracks"** ([[will-law]], −170 lines). Reverts PR #141 after Apr 14–22 debate in #153. MSF will stick with statically declared inits; mid-stream parameter re-initialization uses AVC3 self-initializing segments (ISO/IEC 14496-15). Will add language that if `initData` is not present, the track MUST be self-initializing.
- **PR #118** (Merged Apr 13) - Add details of authorization flows (suhasHere; closes issue #119)
- **PR #152** (Merged Apr 9) - Clarify MSF URL construction and fragment parameters
- **PR #143** (Merged) - Break the monolith table into separate tables and sections
- **PR #141** (Merged Apr 9, **reverted Apr 22**) - Add support for InitTracks (reverted by PR #154)
- **PR #133** (Open since Feb 27) - Add SCTE-35 support and CEA-608/708 accessibility fields. **As of May 8 2026, under spec-restructuring discussion**: avelad (Google, May 7) suggested splitting into 3 PRs; wilaw + gwendalsimon (May 8) escalated to suggest spinning all event-timeline format definitions out of MSF into separate individual drafts (SCTE-35, WebVTT, IMSC1 each as a separate Event-Timeline-format draft); suhasHere (May 8 18:30 UTC) revealed *"I do have initial drafts on..."* the separation. Direction: CEA-608/708 accessibility metadata stays in MSF; SCTE-35 / WebVTT / IMSC1 spin out as individual drafts under an MSF Event-Timeline-Extensions umbrella (parallel to the [[moq-msfts|MSF Packaging Extensions]] pattern).
- **PR #124** (Merged Apr 9) - Clarify first object in event and media timeline track
- **PR #122** (Open) - Initial text on zapping
- **PR #121** (Merged Apr 9) - Pub tracks, logs and metrics

# Incomplete Sections

The draft-00 marks several sections as ToDo:
- Content protection details
- Security considerations

# Related

- [[moq-transport]] - Underlying transport protocol
- [[moq-loc]] - Container format used by MSF
- [[moq-cmsf]] - CMAF-compliant variant of MSF
- [[catalog-format]] - Catalog specification
- [[media-packaging]] - Container format comparison

# External Links
- [GitHub repo](https://github.com/moq-wg/msf)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-msf/)
