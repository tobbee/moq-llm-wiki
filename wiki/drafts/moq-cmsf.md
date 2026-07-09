---
title: "CMSF - CMAF Compliant MOQT Streaming Format"
tags: [draft, media, cmaf, streaming-format]
date: 2026-04-10
last_updated: 2026-07-08
status: current
draft_version: "01"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-cmsf/"
---

**draft-ietf-moq-cmsf-01** | 19 pages | Submitted 2026-06-03 | [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-cmsf/01/)

# Authors
- [[will-law]] (Akamai)

# Abstract

CMSF extends [[moq-msf]] by introducing CMAF-packaged media support. It describes the syntax and semantics for adding CMAF-packaged media to MSF, enabling delivery of CMAF and LOC-compliant content over [[moq-transport]] while maintaining all existing MSF capabilities.

# Relationship to MSF and LOC

- **[[moq-msf]]** is the base streaming format
- **[[moq-loc]]** is the low-overhead container for interactive use
- **CMSF** adds CMAF packaging for traditional OTT/broadcast workflows
- All three work together: CMSF inherits MSF's catalog, timeline, ABR, and LOC support

# Design Tension

The MOQ ecosystem has two container philosophies:
1. **LOC** - Minimal overhead, WebCodecs-native, optimized for real-time
2. **CMAF** - Industry standard for OTT, broad tooling support, higher overhead

CMSF bridges this by allowing CMAF content to flow through the same MSF infrastructure alongside LOC content. [[luke-curley]]'s [compressed-mp4 proposal](https://www.ietf.org/archive/id/draft-lcurley-compressed-mp4-00.html) is another approach to reduce CMAF overhead.

See [[media-packaging]] for a full comparison.

# History

CMSF originated as **draft-law-moq-carp-00** ("CARP - a CMAF compliant implementation of WARP") submitted by [[will-law]] in November 2025. The draft was adopted by the MOQ working group and published as draft-ietf-moq-cmsf-00 in December 2025. The first revision, **draft-ietf-moq-cmsf-01** — the first since -00 — was submitted to the Datatracker in June 2026.

# ContentProtection Signaling

[PR #18](https://github.com/moq-wg/cmsf/pull/18) (merged Apr 14 by [[will-law]]) added ContentProtection signaling to the CMSF spec. The design, proposed by Torbjörn Einarsson ([[moqlivemock|Eyevinn]]), is roughly based on DASH/DASH-IF content protection signaling:

- Defines `contentProtections` as a top-level array of protection descriptors with `refID`s in the catalog
- Each encrypted track references applicable protections via a `contentProtectionRefIDs` array
- Supports the same attributes as DASH/DASH-IF: Widevine, PlayReady, FairPlay, and ECCP (clear key)
- Addresses [issue #8](https://github.com/moq-wg/cmsf/issues/8)

**Implementations**:
- [[moqlivemock]] — Running implementation with Widevine, PlayReady, and FairPlay at [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io/warp-player/)
- [[shaka-player]] — [PR #9972](https://github.com/shaka-project/shaka-player/pull/9972) merged Apr 14, adding CMSF contentProtection support

Key rotation is not yet defined — future work can build on this for live catalogs with new `refID`s.

# Recent Highlights

Day-by-day WG/PR activity lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **LOCMAF adopted as a `locmaf` packaging — by reference**: CMSF PR #27 registers a third `locmaf` packaging mode (between `cmaf` full-chunk passthrough and `loc` codec-elementary frames) by *normative reference* to the standalone [[moq-locmaf|LOCMAF]] draft rather than folding the format text in — so CMSF now spans `cmaf` / `locmaf` / `loc` while LOCMAF stays a sovereign individual draft. The `locmaf` mode carries tagged fields plus unmodified samples so the receiver reconstructs the same CMAF chunk while dropping steady-state overhead to a couple of bytes.
- **Dual Track+Object initData**: [[will-law|Will Law]]'s design carries init data via both a stable Track property (steady-state init) and an Object property for synchronized mid-track changes such as DASH-period switches and DRM key rotation.
- **First working CMSF muxer/demuxer** in a tracked open-source MoQ implementation landed in [[moq-dev|moq-dev/moq]], under the principle *"CMSF is CMAF with a different catalog format"* — a `hang::Catalog` intermediate representation serializes to MSF or Hang catalog formats.
- **emsg signaling** design: catalog signaling of EMSG presence so players know to parse ISO boxes, a per-track `scheme_id_uri` indicating the payload, and multiple emsg tags per track.
- **Zapping / fast-switching**: a manifest parameter mimicking HESP, where one track carries more keyframes than others to enable fast switching.
- **Media-format landscape stratified by `initData` semantics**: CMSF carries full CMAF chunks, [[moq-locmaf|LOCMAF]] delta-compresses CMAF chunk metadata, [[moq-loc|LOC]] strips fMP4 entirely, and MSFTS carries MPEG-TS.

# Related

- [[moq-msf]] - Base streaming format
- [[moq-loc]] - Low overhead container
- [[media-packaging]] - Container format discussion

# External Links
- [GitHub repo](https://github.com/moq-wg/cmsf)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-cmsf/)
