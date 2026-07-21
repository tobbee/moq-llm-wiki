---
title: "Low Overhead Media Container (LOC)"
tags: [draft, media, container]
date: 2026-04-10
last_updated: 2026-07-21
status: current
draft_version: "04"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-loc/"
---

**draft-ietf-moq-loc-04** | published 2026-07-20 | 20 pages | [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-loc/)
**draft-ietf-moq-loc-03** | published 2026-07-06

# Authors
- Mo Zanaty (Cisco)
- [[suhas-nandakumar]] (Cisco)
- Peter Thatcher (Microsoft)

# Abstract

LOC presents a container format for encoded audio and video media intended primarily for interactive streaming over QUIC. It emphasizes minimal encapsulation overhead and compatibility with WebCodecs standards.

# Key Features

- **Minimal overhead**: Designed for low-latency interactive use cases
- **WebCodecs compatible**: Aligns with browser WebCodecs API
- **Codec agnostic**: Metadata properties for both audio and video
- **E2E encryption**: Supports [[moq-secure-objects]] integration
- **Extension mechanism**: Header extensions for timestamps, video frame marking, audio level

# Extensions (draft-02)

LOC uses numbered extensions in the object header:
- Timestamp
- Video Frame Marking (ID=4)
- Audio Level
- Note: **Issue #13** - Duplicate extension ID (0x06) for Timestamp and Audio Level

# Recent Highlights

Day-by-day WG/PR activity lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **draft-04 published (2026-07-20)** — the first revision after IANA's July-16 early review of loc-03. It **fixes the MoQ Properties IANA registry** ([loc #28](https://github.com/moq-wg/loc/pull/28), Mo Zanaty, +15/−17), coordinated with the twin [[moq-transport|moq-transport #1818]] *"Fix IANA Properties for LOC/SecureObjects"* fix — the six LOC properties are now registered at **IDs 0x08 / 0x09 / 0x0C / 0x0D / 0x0F / 0x10**, moving TIMESTAMP off the 0x06 value that collided with MoQ `SUBGROUP_DELIVERY_TIMEOUT` (building on [loc #27](https://github.com/moq-wg/loc/pull/27)'s July-19 TIMESTAMP-value bump). Resolves the registry name/reference mismatches IANA flagged (see [loc #26](https://github.com/moq-wg/loc/issues/26)). Landed the morning of the IETF-126 Monday session.
- **draft-03 published (2026-07-06)** — the first LOC revision since -02; adds an audio-configuration structure and revises all audio config (PR #24), resolving the June audio-config gap.

- **Cross-spec property-ID coordination dispute**: [[moq-transport]]-18 §15.8-2 and draft-ietf-moq-loc-02 diverge on Property Type IDs (MOQ-18 TIMESTAMP=0x06 / TIMESCALE=0x08 / AUDIO_LEVEL=0x0C / VIDEO_FRAME_MARKING=0x0A / VIDEO_CONFIG=0x0D vs LOC-02 TIMESTAMP=0x02 / AUDIO_LEVEL=0x06 / VIDEO_FRAME_MARKING=0x04) — the first post-draft-18 cross-spec coordination failure, with a twin moq-transport issue; the provisional IANA registry for LOC properties did not propagate into the draft-18 assignments. LOC is also moving its own TIMESTAMP off 0x06 because it collides with MoQ `SUBGROUP_DELIVERY_TIMEOUT`.
- **First LOC encoder/decoder library** shipped in the [[moq-dev|moq-dev/moq]] stack (`moq-loc` Rust crate + `@moq/loc` JS package, integrated into `moq-mux` + hang catalog + watch player). It chose the moq-transport-18 §15.8 property IDs (TIMESTAMP=0x06, TIMESCALE=0x08) over the conflicting historical loc-02 values (TIMESTAMP=0x02) — a vote-with-code making moq-dev/moq the *de facto* reference for post-draft-18 property assignments until a draft-ietf-moq-loc-03 aligns them. Catalog timescale defaults to 1,000,000 µs with per-frame override via the 0x08 property; LOC is prioritized after legacy, before CMAF, in audio source selection.
- **LOC private-properties encoding is underspecified**: the draft does not say how private properties behave when absent — omit the block entirely vs write a zero-count varint. Surfaced under live two-impl media interop; [[imquic]] resolved it implementation-side by writing an explicit payload prefix for LOC private objects.
- **No audio config property**: LOC defines a Video Config property for video decoder setup but has no audio equivalent, leaving codec-specific init data (e.g. AAC's AudioSpecificConfig) without a standard place and not fully captured by the codec string.
- **Other open design topics**: moving redundant properties in the catalog, delta-compressing timestamps, Unix epoch + Timescale, Video Frame Marking vi64 encoding ambiguity, WebCodecs avc3/hev1 formats, track-property authentication, and moving LOC header metadata from object-header extensions to the object payload.
- **Draft status**: the published text is now **`draft-ietf-moq-loc-04`** (2026-07-20); several of the design-tension items above (property-ID coordination, audio config, IANA registry names) were folded into the -03/-04 revisions, while the open topics (delta-compressed timestamps, VFM vi64 encoding, track-property authentication) remain design inputs. A new [loc issue](https://github.com/moq-wg/loc/issues) *"Frame durations and discontinuities"* was opened during IETF-126 week (per the July-19 weekly GitHub digest).

# Related

- [[moq-transport]] - Transport layer
- [[moq-msf]] - Streaming format that uses LOC
- [[moq-cmsf]] - CMAF variant that also supports LOC
- [[media-packaging]] - Comparison with CMAF approach

# Design Tension: LOC vs CMAF

LOC represents the "low overhead" approach optimized for interactive/real-time use cases, while [[moq-cmsf]] provides CMAF compatibility for traditional OTT streaming. [[luke-curley]] has proposed [CMAF compression](https://www.ietf.org/archive/id/draft-lcurley-compressed-mp4-00.html) as a potential bridge between the two approaches.

# Implementation tracking

- **[[moqtail]]** — full LOC encode/decode in `moqtail-rs` (sample app + draft-16 catalog plumbing).
- **[[moqlivemock]] / warp-player (Eyevinn)** — LOC pipeline added in v0.8.0 (May 5, 2026), including HEVC LOC and a WebCodecs LOC pipeline.
- **[[moq-dev]] (Luke Curley) — PR #1388 OPENED May 7 2026** (+799/−17, [link](https://github.com/moq-dev/moq/pull/1388)). New `moq-loc` Rust crate + `@moq/loc` JS package implementing encode/decode for the LOC wire format. Hang catalog gains `Container::Loc { timescale }` (default 1,000,000 µs); audio source selection prioritizes LOC after legacy, before CMAF. **First adoption of an IETF-spec media container format in moq-dev/moq alongside its native Hang stack.** Per-frame timescale (0x08 property) overrides catalog default.

# External Links
- [GitHub repo](https://github.com/moq-wg/loc)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-loc/)
