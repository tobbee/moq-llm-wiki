---
title: "MOQT Streaming Format (MSF)"
tags: [draft, media, streaming-format]
date: 2026-04-10
last_updated: 2026-04-23
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-msf/"
---

**draft-ietf-moq-msf-00** | 34 pages | Expires 2026-07-23

# Authors
- [[will-law]] (Akamai)

# Abstract

MSF defines the streaming format for delivering media over [[moq-transport]]. It enables delivery of [[moq-loc]]-compliant media through bitstream fragmentation into independently transmittable objects. Replaces the earlier draft-ietf-moq-warp.

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
- **PR #133** (Open) - Add SCTE-35 support and CEA-608/708 accessibility fields
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
