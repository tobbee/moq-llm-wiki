---
title: "Catalog Format"
tags: [concept, media, metadata]
date: 2026-04-10
status: current
---

# Catalog Format

The catalog describes all tracks available within a MOQ broadcast.

## Overview

The catalog is a special track in [[moq-msf]] that contains a JSON description of all available media tracks, their properties, and relationships. It supports live updates via delta encoding.

## Structure

The catalog is delivered as a MOQT track where:
- **First object**: Base JSON blob with full catalog
- **Subsequent objects**: JSON patches for incremental updates

## Key Fields

- Track descriptions (codec, bitrate, resolution)
- `renderGroup` - Groups of tracks meant to be rendered together
- `isLive` / `isComplete` - Content availability flags
- `targetLatency` - Desired playback latency
- Variable substitution support (PR #123)

## Active Issues (moq-wg/msf)

The catalog has significant open design questions:
- **#149** - Catalog Mapping to MoQT
- **#146** - Clone and track name collisions
- **#145** - Ordering of delta updates
- **#144** - Compression for the catalog
- **#140** - JSON Merge Patch vs JSON Patch
- **#139** - Required/optional fields per role
- **#136** - No mechanism to delta update a track
- **#135** - Delta updates are not generic

## InitTracks

PR #141 (merged) added support for `initTracks` - separate tracks for initialization data. This replaced the prior `initData` approach (issue #138, closed).

## Legacy

The catalog format was previously in a separate repo (moq-wg/catalog-format) but has been folded into the MSF specification.

## Related

- [[moq-msf]] - Streaming format containing the catalog
- [[adaptive-bitrate]] - Catalog describes ABR track sets
- [[media-packaging]] - Catalog references container format per track
