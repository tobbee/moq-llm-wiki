---
title: "MOQT Streaming Format (MSF)"
tags: [draft, media, streaming-format]
date: 2026-04-10
last_updated: 2026-05-24
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-msf/"
---

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
