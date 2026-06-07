---
title: "LOCMAF - Low Overhead CMAF for Media over QUIC"
tags: [draft, media, cmaf, low-overhead, individual]
date: 2026-06-03
last_updated: 2026-06-07
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-einarsson-moq-locmaf/"
---

> **2026-06-07**: **LOCMAF 0.2 ships in moqlivemock; MSF/CMSF catalog validator lands; LOCMAF absent from the London agenda**. [[tobbe-einarsson|Torbjörn Einarsson]] releases **[[moqlivemock]] v0.11.0** ([PR #91](https://github.com/Eyevinn/moqlivemock/pull/91), June 4) carrying MSF/CMSF **draft-01** catalogs with **LOCMAF 0.2 implemented alongside 0.1**, and **[[warp-player|Eyevinn/warp-player]] v0.11.0** for the MSE/EME playback side. The **0.2 redesign drops initData compression** — per Tobbe's June 5 Slack note, *"the complexity is reduced by leaving initData compression out. A big reason for that is that msf draft-01 added references to initData in the catalog which makes it possible to have two packaging formats like 'cmaf' and 'locmaf' refer to the same initData. Another reason is that msf draft-01 added catalog compression."* — i.e. the [[discussions-2026-06|June-3 initData-carriage thread]] (afrind/wilaw) resolved in favor of **catalog-referenced initData**, letting LOCMAF carry just the per-object delta-compressed CMAF metadata (down to ~2 bytes steady-state for fixed-framerate cases, *"even for the case with common encryption"*). Tobbe also ships a **MSF/CMSF catalog validator** ([Eyevinn/msf-catalog-validator](https://github.com/Eyevinn/msf-catalog-validator), [live demo](https://moqlivemock.demo.osaas.io/msf-catalog-validator/)) built on a CUE schema, which found draft-01 bugs → [moq-wg/msf PR #177](https://github.com/moq-wg/msf/pull/177) + [moq-wg/cmsf PR #23](https://github.com/moq-wg/cmsf/pull/23). **LOCMAF is not on the published [London interim agenda](https://datatracker.ietf.org/doc/agenda-interim-2026-moq-08-moq-01/)** (June 11-12) — the initData / low-overhead-CMAF discussion, if it surfaces, would do so under Will Law's MSF/CMSF Day-2 slot rather than as a dedicated LOCMAF item. See [[interim-meetings]].
>
> **2026-06-04**: **Slack #moq announcement and substantive design thread June 3** — [[tobbe-einarsson|Torbjörn Einarsson]] announces LOCMAF -00 on `#moq` 08:51 CEST (*"a way to delta-compress a MOQT group of CMAF objects to get down to overhead levels similar to LOC (a few bytes instead of 100 bytes per object), even for the case with common encryption… A big reason for [reduced complexity vs the original idea] is that msf draft-01 added references to initData in the catalog which makes it possible to have two packaging formats like 'cmaf' and 'locmaf' refer to the same initData. Another reason is that msf draft-01 added catalog compression… The new version of locmaf is called '0.2' and implemented alongside '0.1' in moqlivemock. I hope this is interesting for others having MSE/EME as the target player."*) — gets 5-reply thread with substantive design engagement from [[alan-frindell|Alan Frindell]] and [[will-law|Will Law]]: **afrind 18:13 CEST** *"Have we considered init data as a track property?"* → **Tobbe 19:14 CEST** replies that msf draft-01 introduces an `initData` type currently only `"inline"` but extensible to a track reference, points to [moq-msf Issue #153](https://github.com/moq-wg/msf/issues/153) ("initTrack does not work") on init-version sync → **afrind 20:06 CEST** *"InitData as a separate subgroup?"* → **wilaw 21:37 CEST** *"As Torbjorn mentioned, we have added the init structure in MSF as an extensible scheme. if the init is not going to change for the life of the track, then we could add indeed add it as a defined track property. Adding it as a subgroup would be wasteful, as you would have to continually re-send it. Currently we do not allow track init properties to change once publish has begun."* → **afrind 22:00 CEST** *"Only Publish the init subgroup in groups where it changed."*. The thread surfaces a substantive 3-way design space for MoQ `initData` carriage: **(a) catalog-referenced** (msf -01's `inline` type extended to a track reference), **(b) track property** (afrind suggestion, wilaw seconds for steady-state immutability), **(c) per-group subgroup** (afrind suggestion, only send when changed for key-rotation case). The conversation **promotes initData design from a stale [[moq-msf]] Issue #153 to active mailing-list/Slack engagement** within 12h of the LOCMAF announcement — first substantive cross-author engagement on LOCMAF design and a counter-signal to the typical "individual draft sits with no engagement" pattern. **Carry-forward**: with **London hackathon 5 days away**, expect LOCMAF + initData carriage to surface at the **London Day-2 35-min MSF/CMSF Will Law slot** as a structured discussion of where init goes in the wire — catalog vs property vs subgroup; the answer also affects [[moq-cmsf|CMSF]] (full CMAF chunks) and [[moq-loc|LOC]] (self-initializing per-object).
>
> **2026-06-03**: **NEW individual draft submitted June 2 2026** by **[[tobbe-einarsson|Torbjörn Einarsson]] (Eyevinn Technology) and Hugo Björs (KTH)** — *"Low Overhead CMAF for Media over QUIC (LOCMAF)"*. Per the abstract, LOCMAF defines a compact wire format that lets low-latency CMAF media be delivered over [[moq-transport]] with significantly reduced per-object overhead by carrying CMAF chunk metadata as tagged fields while preserving sample data unchanged. The receiver reconstructs functionally equivalent CMAF chunks suitable for MSE/EME playback pipelines. **Slots into the design space between [[moq-loc|LOC]] and [[moq-cmsf|CMSF]]**: LOC strips fMP4 overhead but loses MSE/EME compatibility; CMSF keeps full CMAF chunk semantics; **LOCMAF aims for the middle** — compact-fMP4 carrier the player reconstructs to a CMAF chunk before handing to MSE. **First IETF artifact from the wiki maintainer** (Tobbe), aligns with Eyevinn's longstanding interest in MSE/EME-compatible MoQ playback (see [[moqlivemock]] + [[warp-player|Eyevinn/warp-player]]). **Carry-forward**: LOCMAF may surface at the **London Day-2 35-min MSF/CMSF/MSFTS slot** as one of three competing low-overhead carriers for fMP4-style payloads alongside [[compressed-mp4]] (mzanaty, varint compression of fMP4 boxes) and [[moq-media-interop]] (LOC wire format for H.264/Opus/AAC, expired Apr 23).

**draft-einarsson-moq-locmaf-00** | Individual | Submitted 2 June 2026 | Expires 2 December 2026 (approx.) | [Datatracker](https://datatracker.ietf.org/doc/draft-einarsson-moq-locmaf/)

# Authors
- **[[tobbe-einarsson|Torbjörn Einarsson]]** (Eyevinn Technology) — wiki maintainer; author of [[moqlivemock]] + mlmtest interop client
- **Hugo Björs** (KTH) — first IETF MoQ-side artifact

# Abstract

LOCMAF defines a compact wire format that enables streaming low-latency CMAF media over MoQ Transport with significantly reduced per-object overhead. The format carries CMAF chunk metadata as tagged fields while preserving sample data unchanged, with the receiver reconstructing functionally equivalent CMAF chunks suitable for MSE/EME playback pipelines.

# Position in the design space

| Format | Wire shape | MSE/EME compatibility | Standardization |
|--------|-----------|------------------------|------------------|
| [[moq-cmsf\|CMSF]] | Full CMAF chunks (init + chunks per CMAF spec) | Direct passthrough to MSE | WG (draft-ietf-moq-cmsf-00) |
| **LOCMAF** | **Tagged fields + unchanged sample data; receiver reconstructs CMAF chunk** | **Reconstructed; MSE-compatible after receiver-side rebuild** | **Individual (draft-einarsson-moq-locmaf-00)** |
| [[moq-loc\|LOC]] | Codec-aware compact frame format | No (requires non-MSE pipeline) | WG (draft-ietf-moq-loc-02) |
| [[compressed-mp4]] | Varint-compressed fMP4 boxes (96 → ~21 bytes per fragment) | After decompression: MSE-compatible | Individual |
| [[moq-media-interop]] | LOC wire format for H.264/Opus/AAC | No | Individual, expired Apr 23 |

LOCMAF's distinguishing choice: **carry CMAF chunk metadata as tagged fields**, **preserve sample data unchanged**, **reconstruct the CMAF chunk receiver-side**. This makes it transparent to MSE/EME consumers (the player still sees standard CMAF chunks) while removing redundant box headers from the wire.

# Why this matters

- **Eyevinn's MoQ adoption path**: Eyevinn's existing CMAF-based pipeline (HLS/DASH origins + low-latency CMAF chunked encoding) needs a MoQ wire shape that doesn't force re-architecting the player-side MSE/EME glue. LOCMAF preserves that.
- **MSE/EME compatibility constraint**: Safari (notably for FairPlay DRM) requires `avc1`/`hvc1` sample entries with parameter sets in the decoder configuration record, not `avc3`/`hev1` with inline parameter sets (see Tobbe's [moq-wg/msf Issue #153](https://github.com/moq-wg/msf/issues/153) Point 4). LOC's self-initializing segments break this. LOCMAF can carry the parameter sets out-of-band as tagged fields and reconstruct an MSE-compatible CMAF chunk.
- **Streaming Tech Sweden + IETF prior work**: presented as a low-overhead extension to CMAF in pre-IETF venues; the -00 submission formalizes the proposal.

# Status

- **-00 submitted**: 2026-06-02
- **WG adoption call**: not yet
- **Implementation reports**: none yet

# Related drafts and concepts

- [[moq-loc]] — Low Overhead Media Container (WG, draft-02) — the LOC-family WG draft from which LOCMAF differentiates
- [[moq-cmsf]] — CMAF-compliant MSF (WG, draft-00) — the CMAF-equivalent reference point
- [[compressed-mp4]] — Varint compression of fMP4 boxes (Mo Zanaty individual)
- [[moq-media-interop]] — LOC media wire format for H.264/Opus/AAC
- [[moq-transport]] — base wire protocol
- [[moq-msf]] — MSF packaging umbrella draft

# Authors and stakeholders

- [[tobbe-einarsson|Torbjörn Einarsson]] — Eyevinn Technology, wiki maintainer
- Hugo Björs — KTH (Royal Institute of Technology), Stockholm

# References

- [draft-einarsson-moq-locmaf-00](https://datatracker.ietf.org/doc/draft-einarsson-moq-locmaf/) on Datatracker
- [[moqlivemock]] / mlmtest — Tobbe's interop client likely to be the first LOCMAF implementation
