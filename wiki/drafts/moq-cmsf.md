---
title: "CMSF - CMAF Compliant MOQT Streaming Format"
tags: [draft, media, cmaf, streaming-format]
date: 2026-04-10
last_updated: 2026-06-07
status: current
draft_version: "01"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-cmsf/"
---

> **2026-06-07**: **Tobbe's CUE catalog validator finds CMSF draft-01 bugs → [PR #23](https://github.com/moq-wg/cmsf/pull/23) OPEN June 4** *"Fix version examples and minor typos in draft-01"* (+5/−5). Companion to [moq-wg/msf PR #177](https://github.com/moq-wg/msf/pull/177): [[tobbe-einarsson|Tobbe]]'s [MSF/CMSF catalog validator](https://github.com/Eyevinn/msf-catalog-validator) (announced on `#moq` June 5, validates *strictly against draft-01 definitions*) surfaced wrong `version` example values + typos in CMSF -01. Pure editorial fixes for a future -02; the validator additionally covers [[moq-locmaf|LOCMAF]] packaging, exercising the CMSF/LOCMAF init-reference split that came out of the [[discussions-2026-06|June-3 initData thread]]. See [[moq-msf]] for the validator detail and [[interim-meetings]] — CMSF stays on the London Day-2 Will Law slot.
>
> **2026-06-04**: **[[will-law|Will Law]] submits [draft-ietf-moq-cmsf-01](https://datatracker.ietf.org/doc/draft-ietf-moq-cmsf/01/) to Datatracker June 3** — **first CMSF revision since -00 (Dec 2025)**, ~187 days since adoption. Final pre-submission clean-up was [moq-wg/cmsf PR #22](https://github.com/moq-wg/cmsf/pull/22) MERGED 11:32 UTC by wilaw *"Fix I-D nits"* (+7/−6, 1f, *"Add LOC reference and update abstract for clarity"*) following yesterday's [PR #21](https://github.com/moq-wg/cmsf/pull/21) MSF-01 reference bump. **2nd MoQ WG draft revision to land in 2 days** alongside [[moq-msf|MSF -01]] (June 2); structurally pairs the MSF/CMSF anchors for the **London Day-2 35-min MSF/CMSF Will Law slot**. wilaw also posts companion **"MSF updates"** + **"CMSF updates"** announcements to the IETF MoQ mailing list June 3 — first per-spec author-led mailing-list update the wiki has tracked from wilaw. Submitted same week as [[moq-locmaf|LOCMAF -00]] (June 2 by Tobbe + Hugo Björs) — the LOC/CMSF/LOCMAF/MSFTS individual-draft landscape is now stratified by `initData` semantics: CMSF carries full CMAF chunks, LOCMAF delta-compresses CMAF chunk metadata, LOC strips fMP4 entirely, MSFTS carries MPEG-TS. **Carry-forward**: with CMSF -01 + MSF -01 both on Datatracker, the [moq-msf Issue #153](https://github.com/moq-wg/msf/issues/153) initTrack design problem (re-surfaced June 3 in Tobbe's LOCMAF Slack thread) becomes the lead open editorial item — afrind suggests *"init data as a track property"* / *"only publish the init subgroup in groups where it changed"*, wilaw replies *"currently we do not allow track init properties to change once publish has begun"* (Slack June 3 thread under Tobbe's LOCMAF announcement, see [[discussions-2026-06]]).
>
> **2026-06-03**: **[PR #21](https://github.com/moq-wg/cmsf/pull/21) MERGED June 2 13:54 UTC** by [[will-law|wilaw]] *"Update CMSF document with new references and JSON format"* (+69/−20, 1f, **closes [Issue #20](https://github.com/moq-wg/cmsf/issues/20) "Update CMSF to reference the new MSF ID draft-01"**). Updates CMSF's MSF normative reference from **draft-ietf-moq-msf-00 → draft-ietf-moq-msf-01** (published same day on Datatracker) and adjusts the JSON structure for CMSF versioning + initialization data. **Companion editorial work to MSF -01 submission**: with MSF -01 finally published June 2 after 134-day cadence, CMSF main is brought into reference alignment within ~2 hours so any reader of either spec finds a coherent cross-reference. **No new CMSF revision submitted** — Datatracker still shows draft-ietf-moq-cmsf-00 (Dec 2025, expired status). The reference-bump-on-main pattern matches MSF's pre-submit work and the SHA on the `main` branch now reflects the MSF-01-aware reference set, awaiting the next CMSF -01 cycle to land on Datatracker. **Carry-forward**: with MSF -01 published + CMSF main reference-bumped, **London Day-2 35-min MSF/CMSF Will Law slot now has both anchor docs in current state**; the next CMSF cycle will need to absorb the May 30 Gwendal-vs-Suhas zapping debate (Issue #122) + the May 25 emsg signaling thread (Issue #16) + the new JSON structure adjustments from PR #21.
>
> **2026-05-31**: **[[gwendal-simon|Gwendal Simon]] vs [[suhas-nandakumar|Suhas Nandakumar]] editorial debate on [Issue #122](https://github.com/moq-wg/cmsf/issues/122) "initial text on zapping"** May 30. **Gwendal May 30 13:23 UTC**: *"I find this PR over-explaining something that is quite simple in theory. Do we need so many examples for such a basic thing? The issue #110 was raised during the Boulder meeting (i was only the notetaker). The idea was to mimic a mechanism such as HESP, where one track has much more keyframes than other tracks, to enable fast switching/zapping. In this regard, the parameter in the manifest helps…"* — challenges the example-heavy approach as **over-engineering**. **Suhas May 30 21:43 UTC**: *"we can simplify text if needed, but on how do we use aspect, i wonder how much of that should be in this spec? may be an appendix section?"* — proposes a structural split (normative spec text vs informative appendix). **Significance**: first cmsf editor-vs-contributor design pushback the wiki has tracked — normally cmsf editorial work has been suhasHere monologue + late wilaw review. Gwendal's "this is simple in theory" framing is structurally analogous to his May 27 chair-rebuttal on SWITCH — challenges a published artifact's framing rather than waiting for show-of-hands at interim. **Carry-forward**: zapping/fast-switching is one of the two open CMSF schema threads alongside emsg signaling (Issue #16 reactivated May 25 wilaw asks Gwendal 3 follow-up questions on catalog EMSG signaling); both are slot candidates for the London Day-2 35-min MSF/CMSF Will Law slot.
>
> **2026-05-26**: **[[will-law|Will Law]] CMSF spec edits May 25**: **[PR #19](https://github.com/moq-wg/cmsf/pull/19) MERGED May 25 09:19 UTC** *"Clarify media content and group packaging requirements"* (+2/−3, fixes [Issue #12](https://github.com/moq-wg/cmsf/issues/12) by **yekuiwang**) — drops the §3.3 *"MUST contain media content encoded in decode order"* line (redundant — ISOBMFF already guarantees decode-order) and changes §3.4 from *"one or more contiguous Groups of Pictures (GOPs)"* to *"one or more contiguous independently coded sequences of media samples"*. **Rationale**: GOP is a loose term and moq-transport already replaced GOP with "independently coded sequence" per [moq-wg/moq-transport#951](https://github.com/moq-wg/moq-transport/issues/951); the type of media could be other than video (audio sequences also need the same treatment). **[Issue #16 reactivated May 25 09:41 UTC](https://github.com/moq-wg/cmsf/issues/16)** by wilaw — original Feb 5 Denver MSF meeting agenda issue from [[gwendal-simon|Gwendal Simon]] covering `emsg` boxes in CMAF in CMSF + init segment per track for key rotation + Extension parameters for DRM key rotation; wilaw now asks Gwendal 3 follow-up questions about emsg signaling: (1) catalog signaling of EMSG presence so players know to parse ISO boxes, (2) per-track `scheme_id_uri` indicating payload (example: `"emsg": "urn:scte:scte35:2013:xml"`), (3) multiple emsg tags per track. **Carry-forward**: emsg signaling is the third active CMSF schema thread alongside #12 (now closed) and the May 22-23 [[moq-dev|moq-dev/moq]] CMSF pipeline implementation (PR #1444); Gwendal's emsg response likely lands as a follow-on PR before London Day-2 Will Law slot.
>
> **2026-05-23**: **CMSF unified pipeline lands in [[moq-dev|moq-dev/moq]] via [PR #1444](https://github.com/moq-dev/moq/pull/1444) MERGED May 22 21:12 UTC** (+1278/−14, [[luke-curley|kixelated]]) — kixelated forks AWS's #1429 (which had superseded #1408), strips out-of-scope C API + caller-driven group boundaries, ships the MSF-catalog core. **Third AWS-vs-kixelated design-cycle resolution in 9 days** (#1413 close → #1408→#1429 50% shrink → #1429→#1444 33% shrink); total AWS net code in merged result is ~25-30% of original #1408 scope. **Architectural principle**: *"CMSF is CMAF with a different catalog format"* — `hang::Catalog` serves as intermediate representation, single import pipeline serializes to MSF or Hang catalog formats. **First fully-working CMSF muxer/demuxer in any tracked open-source MoQ implementation**.

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

CMSF originated as **draft-law-moq-carp-00** ("CARP - a CMAF compliant implementation of WARP") submitted by [[will-law]] in November 2025. The draft was adopted by the MOQ working group and published as draft-ietf-moq-cmsf-00 in December 2025.

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

# Open Issues & PRs

- **Issue #17** (Apr 14, DenizUgur) - Explicit signalling of DRM/C2PA key-rotation or init segment updates. Proposals discussed at MSF Feb 5 meeting: (a) separate init-segment track with sync concerns, or (b) inline update signaling. Links to the broader [[moq-msf]] `initTrack` debate.
- **PR #19** (Apr 14, wilaw) - Clarify media content and group packaging requirements (fixes #12)

# Related

- [[moq-msf]] - Base streaming format
- [[moq-loc]] - Low overhead container
- [[media-packaging]] - Container format discussion

# External Links
- [GitHub repo](https://github.com/moq-wg/cmsf)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-cmsf/)
