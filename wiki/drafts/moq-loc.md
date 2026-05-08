---
title: "Low Overhead Media Container (LOC)"
tags: [draft, media, container]
date: 2026-04-10
last_updated: 2026-05-08
status: current
draft_version: "02"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-loc/"
---

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

- **#18** - Moving redundant properties in the catalog?
- **#17** - Delta compress timestamps
- **#16** - Unix epoch + Timescale
- **#15** - Ambiguity in Video Frame Marking vi64 encoding
- **#14** - WebCodecs issue: fix new avc3/hev1 formats
- **#13** - Duplicate extension ID for Timestamp and Audio Level
- **#10** (Apr 16, yuanchao-chris) - Properties Type collision between moqt-draft17 and loc-01. Properties Type (Extensions Type) 0x02 and 0x04 are defined in both specs with different semantics. Cross-references transport issue #1550.
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
