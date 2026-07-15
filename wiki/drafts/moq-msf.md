---
title: "MOQT Streaming Format (MSF)"
tags: [draft, media, streaming-format]
date: 2026-04-10
last_updated: 2026-07-15
status: current
draft_version: "01"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-msf/"
---

**draft-ietf-moq-msf-01** | Submitted 2026-06-02 | [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-msf/)
**draft-ietf-moq-msf-00** | 34 pages | Submitted 2026-01-19 | Expires 2026-07-23

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

# Incomplete Sections

The draft-00 marks several sections as ToDo:
- Content protection details
- Security considerations

# Recent Highlights

Day-by-day WG/PR activity lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **MSF draft-01 published** — the first revision since -00, authored by [[will-law|Will Law]] (Akamai) and [[suhas-nandakumar|Suhas Nandakumar]] (Cisco); it absorbed Will Law's large May 2026 editorial sprint. MSF's revision cadence runs at roughly four months, consistent with it being a packaging-format rather than a wire-protocol spec.
- **Init-data design settled toward static inits with a typed, extensible representation — and landed in the draft text 2026-07-14.** Experimental `initTrack` support was reverted (Issue #153): MSF keeps statically declared inits, a track with no `initData` MUST be self-initializing, and mid-stream parameter re-init relies on AVC3 self-initializing segments — which do not work for Safari/FairPlay pipelines that require `avc1`/`hvc1` parameter sets in the sample entry. Init data then moved to a typed `initDataList` (named `{id, type, data}` references) and on to a dual **Track + Object** initData design: a stable Track property for steady-state init plus an Object property for synchronized mid-track changes (period switches, DRM key rotation) — the machinery [[moq-locmaf|LOCMAF]] and the LOCMAF→[[moq-cmsf|CMSF]] packaging plan rely on. [[will-law|Will Law]] merged this into the repo on **2026-07-14** as a three-PR cluster — [PR #186](https://github.com/moq-wg/msf/pull/186) adds the Track + Object init-data properties (retiring `initTrack`, closing #153), [PR #187](https://github.com/moq-wg/msf/pull/187) clarifies track cloning + delta-update rules (closing #183), [PR #189](https://github.com/moq-wg/msf/pull/189) fixes typos — closing #153/#178/#183 just before MSF's IETF-126 (Vienna, Friday) slot.
- **Mandatory baseline fields added.** Responding to [[luke-curley|kixelated]]'s objection that "everything is optional," MSF made `sampleRate`+`channels` required for audio and `codec`+`width`+`height` required for video, added Maximum GOP Duration / Maximum Group Duration / Average Bitrate properties, and redefined `bitrate` as a maximum — moving MSF from an optional-hints catalog toward a subscribe-decision oracle with a mandatory baseline.
- **Wall-clock concern resolved via `targetBuffer`.** kixelated's long-open "wall clock is problematic" issue (#150) was closed not by removing the wall clock but by adding a per-track `targetBuffer` property that gives subscribers explicit end-to-end buffer-depth guidance independent of publisher-clock accuracy.
- **Catalog compression resolved as publisher-decides.** Compression is signaled via Track/Object Properties chosen by the publisher rather than a subscriber-negotiated Accept-Encoding; [[victor-vasiliev|Vasiliev]] ruled Accept-Encoding incompatible with MoQ's publisher-to-subscriber fan-out (data cannot flow subscriber→publisher on a shared relay path).
- **Two open design questions from [[luke-curley|kixelated]]** remain -02 backlog inputs: sequence-aligned groups across tracks are seen as too restrictive (Issue #155) — proposal is to require shared PTS but loosen group alignment, letting [[moq-cmsf|CMSF]] keep alignment for HLS/DASH back-compat; and static-vs-dynamic catalogs (Issue #188) — static-track container formats (fMP4/FLV/MPEG-TS/HLS) cannot add or remove tracks mid-stream while MSF lets tracks change at any time, causing a consumer race condition, so kixelated asks MSF for a way to signal that no more tracks will be added/removed/modified.
- **Event-timeline formats have been spun out of MSF as three individual drafts.** The direction predicted from the May 2026 PR #133 discussion — SCTE-35, WebVTT, and IMSC1 each becoming separate individual drafts under an MSF Event-Timeline-Extensions umbrella (parallel to the [[moq-msfts|MSF Packaging Extensions]] pattern), with CEA-608/708 accessibility metadata staying in MSF — was realized on **2026-07-06** when [[will-law|Will Law]] (Akamai) + [[suhas-nandakumar|Suhas Nandakumar]] (Cisco) submitted all three as `-00` individual drafts: **`draft-wilaw-moq-scte35-event-timeline-00`** ("SCTE35 transmission over MSF Event Timeline", 9 pp — binary + XML SCTE-35 ad/event signals over MSF Event Timeline tracks), **`draft-wilaw-moq-webvtt-msf-00`** ("WebVTT Packaging for MOQT Streaming Format", 8 pp — WebVTT cues packaged as JSON records on the event timeline), and **`draft-law-moq-imsc1-msf-00`** ("IMSC1 Packaging for MOQT Streaming Format", 8 pp — IMSC1 captions with a simplified JSON cue mode and a full XML document mode). These surfaced quietly in the July-6 draft wave alongside transport-19 and the Cisco MOCHA/TEMPO suite.
- **First runtime and validation exercises.** [[moq-dev|moq-dev/moq]] became the first implementation to land MSF-01 support in code (behind a version-agnostic snapshot); [[tobbe-einarsson|Tobbe]]'s CUE-schema catalog validator ([Eyevinn/msf-catalog-validator](https://github.com/Eyevinn/msf-catalog-validator)) is the first machine-validation feedback loop into the MSF/CMSF specs, and surfaced example/version bugs since fixed.

# Related

- [[moq-transport]] - Underlying transport protocol
- [[moq-loc]] - Container format used by MSF
- [[moq-cmsf]] - CMAF-compliant variant of MSF
- [[catalog-format]] - Catalog specification
- [[media-packaging]] - Container format comparison

# External Links
- [GitHub repo](https://github.com/moq-wg/msf)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-msf/)
