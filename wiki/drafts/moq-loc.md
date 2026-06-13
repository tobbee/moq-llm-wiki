---
title: "Low Overhead Media Container (LOC)"
tags: [draft, media, container]
date: 2026-04-10
last_updated: 2026-06-13
status: current
draft_version: "02"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-loc/"
---

> **2026-06-13**: **imquic ships an implementation answer to the June-9 LOC private-properties ambiguity.** **[[imquic]] [PR #29](https://github.com/meetecho/imquic/pull/29) MERGED** June 12 08:54 UTC (lminiero, *"Add mechanism for adding payload prefix (for LOC private objects)"*, +151/−52) — imquic now writes an explicit **payload prefix for LOC private objects**, resolving (on the implementation side) the omit-the-block-vs-write-a-zero-count question Lorenzo Miniero raised June 9 while building his LOC live-media demos. The spec text itself is unchanged; the June-12 Day-2 LOC-update slot (Mo Zanaty) remains the venue for codifying the wire convention. See [[imquic]], [[discussions-2026-06]].
>
> **2026-06-10**: **Live London-hackathon interop exposes a LOC private-properties encoding ambiguity.** Building LOC+catalog live A/V publish/subscribe demos ([[imquic]] [PR #27](https://github.com/meetecho/imquic/pull/27) `imquic-moq-loc-send`/`-recv`), **Lorenzo Miniero** raises June 9 12:38 CEST that the LOC draft *"mentions public properties and private properties, but doesn't say much about how those private properties work. Are they always there, with just a `00` when there are none, or is the whole MoQ payload the media frame when there are none?"* — currently he writes **no private-properties block at all** (whole payload = media frame). **Suhas Nandakumar** (from his C++ impl): *"if there are no private properties, then you basically write nothing… same as how you encode other properties."* **Lorenzo presses**: *"but writing nothing still means writing at least `00` to say 'no parameters', right? Since you need the number of parameters first."* The unresolved choice — **omit the block entirely** vs **write a zero-count varint** — is a wire-format gap that only surfaces under two-impl media interop, and joins the LOC property-ID coordination dispute ([moq-wg/loc Issue #20](https://github.com/moq-wg/loc/issues/20)) as a London-floor item. The June-12 Day-2 LOC-update slot (Mo Zanaty) is the natural venue. See [[discussions-2026-06]].
>
> **2026-05-23**: **First LOC encoder/decoder library merged in the [[moq-dev|moq-dev/moq]] stack** — [PR #1388](https://github.com/moq-dev/moq/pull/1388) MERGED May 22 22:53 UTC by [[luke-curley|kixelated]] (+844/−16, 30 files). New `moq-loc` Rust crate + `@moq/loc` JS package providing `encode()` / `decode()` for the LOC frame wire format, integrated into `moq-mux` + hang catalog + watch player. **Implementation chooses [[moq-transport]]-18 §15.8-2 property type IDs (TIMESTAMP=0x06, TIMESCALE=0x08) over the conflicting historical draft-ietf-moq-loc-02 values (TIMESTAMP=0x02)** — kixelated effectively votes-with-code for the moq-transport-18 assignments to win the cross-spec coordination dispute surfaced by Issue [#20](https://github.com/moq-wg/loc/issues/20). Catalog timescale defaults to 1,000,000 microseconds; per-frame timescale override supported via 0x08 property. LOC preference in audio source selection: prioritized after legacy, before CMAF. **Carry-forward**: until LOC spec PR #1624 (provisional IANA registry) propagates into a draft-ietf-moq-loc-03 with aligned values, the moq-dev/moq LOC implementation is the *de facto* reference for post-draft-18 property type assignments.

**draft-ietf-moq-loc-02** | 19 pages | Expires 2026-03-15

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

# Active Issues (moq-wg/loc)

- **#20** (May 14 03:18 UTC, **yuanchao-chris**) - *LOC-02: Properties Type collision*. Reports that **draft-ietf-moq-transport-18 §15.8-2 and draft-ietf-moq-loc-02 commit history diverge on assigned Property Type IDs**: MOQ-18 has TIMESTAMP=0x06 / TIMESCALE=0x08 / AUDIO_LEVEL=0x0C / VIDEO_FRAME_MARKING=0x0A / VIDEO_CONFIG=0x0D, while LOC-02 records TIMESTAMP=0x02 / AUDIO_LEVEL=0x06 / VIDEO_FRAME_MARKING=0x04. Twin issue [moq-transport #1632](https://github.com/moq-wg/moq-transport/issues/1632) filed simultaneously 6 minutes later. **First post-draft-18 cross-spec coordination failure** — PR #1624 (Apr 30, *"provisional IANA registry for LOC properties"*) was supposed to prevent this but did not propagate into the draft-18 §15.8-2 assignment. See [[discussions-2026-05]].
- **#19** (May 5, Luke Curley) - How do you encode LOC Private Properties?
- **#18** - Moving redundant properties in the catalog?
- **#17** - Delta compress timestamps
- **#16** - Unix epoch + Timescale
- **#15** - Ambiguity in Video Frame Marking vi64 encoding
- **#14** - WebCodecs issue: fix new avc3/hev1 formats
- **#13** - Duplicate extension ID for Timestamp and Audio Level
- **#10** (Apr 16, yuanchao-chris) - Properties Type collision between moqt-draft17 and loc-01. Properties Type (Extensions Type) 0x02 and 0x04 are defined in both specs with different semantics. Cross-references transport issue #1550. Now superseded by **#20** as collisions persist between LOC-02 and MOQ-18.
- **#9** - Track Property can't be authenticated
- **#5** - Move LOC header metadata from object header extensions to object payload

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
