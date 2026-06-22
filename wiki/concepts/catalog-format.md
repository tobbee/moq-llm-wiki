---
title: "Catalog Format"
tags: [concept, media, metadata]
date: 2026-04-10
last_updated: 2026-06-22
status: current
---

The catalog describes all tracks available within a MOQ broadcast.

# Overview

The catalog is a special track in [[moq-msf]] that carries a JSON description of all available media tracks, their properties, and relationships. It supports live updates via delta encoding. The format now tracks **[[moq-msf|MSF draft-01]]** (published June 2 2026); the field set below reflects the -01 schema and the editorial sprint (PRs #157–#177) that fed into it.

# Structure

The catalog is delivered as a MOQT track where:
- **First object**: Base JSON blob with the full catalog
- **Subsequent objects**: Delta updates (add / remove / clone track operations) applied in document order

By convention the catalog track is named `catalog` (see open issue #130 below, which proposes making this a default rather than a required name).

# Key Fields

- **Track descriptions** — `codec`, `width`/`height`, `bitrate`. As of MSF-01 (PR #165), `codec`+`width`+`height` are **required for video** and `sampleRate`+`channels` are **required for audio** — kixelated's "it's reaally annoying that everything is optional" ask (#164). `bitrate` is redefined as *maximum* bitrate, with new `averageBitrate`, `maxGOPDuration` (Maximum GOP Duration) and `maxGroupDuration` (Maximum Group Duration) properties.
- **`renderGroup`** — Groups of tracks meant to be rendered together
- **`isLive` / `isComplete`** — Content availability flags
- **`targetLatency`** — Desired playback latency
- **`targetBuffer`** — Per-track required end-to-end buffer (seconds) for smooth playback (PR #167). Added to sidestep the wall-clock debate (closes #150) by giving subscribers actionable buffer-depth guidance independent of publisher-clock accuracy.
- **`version`** — A **string** as of MSF-01 (PR #175, closes #163), carrying draft info for interop until the format is released; previously a number.
- **Variable substitution** — Template-style field substitution (PR #123, addresses part of #106).

# Initialization Data

This is the most-revised area of the catalog. The current MSF-01 design uses a **typed-object init list**, not separate init tracks:

- **`initDataList[]`** — A root-level array of init-data objects, each shaped `{"id": "1", "type": "inline", "data": "<base64>"}`, with per-track `initRef` references pointing at an entry by `id`. Added in **PR #166** (May 27), which adopted [[tobbe-einarsson|Torbjörn Einarsson]]'s typed-object proposal verbatim. The `type` field leaves room for future non-`inline` sources (separate MoQ track / HTTP URL / content-addressed) without a schema break.
- **Self-initializing fallback** — If a track has no `initData`/`initRef`, it MUST be self-initializing (AVC3/HEV1-style inline parameter sets, ISO/IEC 14496-15).
- **History** — An earlier approach added separate **`initTracks`** (PR #141, Apr 9) but it was **reverted by PR #154 (Apr 22)** after the #153 debate; MSF returned to statically-declared inits before settling on the typed-object list above. (The prior `initData`-via-separate-tracks idea, #138, was also closed.)
- **Open follow-ups** — #178 *"update of initData"* (London: allow `initData` to appear in an Object); #153 still tracks Tobbe's remaining points (per-language `lang` override of `mdhd.language`; Safari/FairPlay needing `avc1`/`hvc1` sample entries rather than self-initializing `avc3`/`hev1`; mid-stream init-change scheduling).

# Compression

Issue **#144** (catalog compression) closed June 1 via **PR #159**: compression is signaled per **Track/Object Property** and is **publisher-decided**, *not* negotiated by subscribers. [[victor-vasiliev|Victor Vasiliev]] rejected Tobbe's `Accept-Encoding`-style proposal as incompatible with MoQ's fan-out model — a subscriber-side negotiation can't be honored differently per subscriber on a shared relay path.

# Delta Updates

The catalog supports incremental updates through add / remove / clone operations. Design questions largely resolved for -01:
- **Ordering** (#145, closed) — operations must be expressed as a JSON **array**, since object-key ordering is undefined across JSON implementations.
- **JSON Merge Patch** (#140, closed) — considered but not adopted as the generic mechanism.
- **Per-track delta** (#136, closed) — mechanism to delta-update a single track.
- **Clone collisions** (#146, closed via PR #171) — clone tracks gained an optional `parent` namespace field to disambiguate same-named tracks across namespaces.

Still open: **#135** *"Delta updates are not generic"* (re-touched at the June London interim).

# Active Issues (moq-wg/msf)

Open catalog-relevant issues as of late June 2026:
- **#183** — *Can track properties in the catalog be modified after creation?* (London; favours a lightweight `op: "update"` over full JSON-patch). Challenges the draft's "track properties are fixed for a track's lifetime" assumption — cf. Tobbe's [[moq-locmaf|LOCMAF]] mid-track-init concern.
- **#178** — *update of initData* (London: allow `initData` in an Object).
- **#153** — *`initTrack` does not work* (Tobbe's three remaining points, above).
- **#139** — Required/optional fields per role.
- **#135** — Delta updates are not generic.
- **#130** — *`catalog` by convention* — make `catalog` the default track name rather than required (enables multiple catalogs per namespace, and `.json` content-type signalling over HTTP).
- **#129** — FORWARD parameter and catalog-publishing racing.

Recently **closed** for MSF-01: #149 (Catalog Mapping to MoQT, PR #168), #146 (clone collisions, PR #171), #145 (ordering), #144 (compression, PR #159), #140 (JSON Merge Patch), #136 (delta-update a track).

# Validation

[[tobbe-einarsson|Torbjörn Einarsson]] built a **CUE-schema catalog validator** ([Eyevinn/msf-catalog-validator](https://github.com/Eyevinn/msf-catalog-validator), [live demo](https://moqlivemock.demo.osaas.io/msf-catalog-validator/)) that checks MSF/CMSF catalogs **strictly against the draft-01 definitions** rather than the spec's examples. It surfaced wrong `version` values and typos in the examples — filed as **PR #177** (MSF) and companion **PR #23** (CMSF) — the first machine-validation feedback loop into the MSF/CMSF specs.

# Implementation Status

**[[moq-dev|moq-dev/moq]]** landed MSF draft-01 support in code on **June 22 2026** ([PR #1834](https://github.com/moq-dev/moq/pull/1834), +743/−181) behind a version-agnostic snapshot — the first *runtime* exercise of the MSF catalog format outside the validator. Note that moq-dev's native moq-lite path uses its own catalog (e.g. B-frame reorder depth carried as catalog jitter, PR #1857) distinct from the MSF catalog described here.

# Legacy

The catalog format was previously a separate document in the `moq-wg/catalog-format` repo, but has been folded into the [[moq-msf|MSF]] specification.

# Related

- [[moq-msf]] - Streaming format containing the catalog
- [[moq-cmsf]] - CMAF packaging variant referencing the same catalog
- [[adaptive-bitrate]] - Catalog describes ABR track sets
- [[media-packaging]] - Catalog references container format per track
- [[tobbe-einarsson]] - Catalog validator + typed-object init design
