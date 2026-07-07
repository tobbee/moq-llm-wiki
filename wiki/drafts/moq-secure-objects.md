---
title: "End-to-End Secure Objects for MOQT"
tags: [draft, security, encryption]
date: 2026-04-10
last_updated: 2026-07-07
status: current
draft_version: "01"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-secure-objects/"
---

> **2026-07-07**: **`draft-ietf-moq-secure-objects-01` is CUT (July 6) — the long-flagged first revision since -00, carrying the June-29 test-vectors appendix into published text.** The -01 folds in the editor's-copy work the page has tracked since May: the **worked AEAD test-vectors appendix** ([PR #88](https://github.com/moq-wg/secure-objects/pull/88), +326/−0, merged June 29) so implementations can verify their encryption/authentication against canonical inputs, plus the AAD-serialization precision work around afrind's [Issue #72](https://github.com/moq-wg/secure-objects/issues/72). No new secure-objects repo activity fell inside the July 6–7 window (the merges predate it). Published alongside transport-19 / loc-03 / privacy-pass-auth-03 in the July-6 [[interim-meetings|interim-2026-moq-18]] draft wave; authors unchanged (Cullen Jennings / [[suhas-nandakumar|Suhas]] / Richard Barnes, all Cisco). See [[discussions-2026-07]], [[moq-transport]].
>
> **2026-06-30**: **The test-vectors appendix finally lands — [PR #88](https://github.com/moq-wg/secure-objects/pull/88) MERGED June 29 16:07 UTC** ([[suhas-nandakumar|Suhas Nandakumar]], **+326/−0** to `draft-ietf-moq-secure-objects.md`). This is the **first content merge on the secure-objects repo since the May-1 cleanup wave** — the *"Add test vectors appendix"* PR the page has tracked **OPEN since May 30** (originally the informal-reference fallback if -01 didn't land before London) now lands, adding worked AEAD test vectors so implementations can verify their encryption/authentication against canonical inputs — a concrete **interop-readiness** step. Separately, afrind's standing **Issue [#72](https://github.com/moq-wg/secure-objects/issues/72)** *"Specify how integers are serialized in AAD"* (open since March 20: align the AAD `(i)` varint notation with `vi64` to match MOQT, and note Object ID is not transmitted) drew **new activity June 29 16:22 UTC** — the unresolved AAD-serialization precision item, still relevant as the spec moves toward -01. **Still no Datatracker -01 submission** (secure-objects remains at -00); the merge brings the editor's copy closer to the -01 release line the page has flagged since early May. See [[discussions-2026-06]], [[moq-transport]].
>
> **2026-05-31**: **[PR #88](https://github.com/moq-wg/secure-objects/pull/88) still OPEN no new commits May 30-31** (last updated May 30 13:56 UTC). No Datatracker submission for -01. Like [[moq-msf|MSF]], the editorial work for secure-objects -01 is staged but not yet cut on Datatracker — supports the **coordinated multi-draft London-cycle drop** hypothesis. **Carry-forward**: with London hackathon 9 days away, secure-objects -01 publication remains the structural prerequisite for any security-focused London discussion; if it doesn't land before London, the secure-objects spec slot uses -00 + the unmerged PR #88 test vectors appendix as informal reference.
>
> **2026-05-30**: **[[suhas-nandakumar|Suhas Nandakumar]] [PR #88](https://github.com/moq-wg/secure-objects/pull/88) OPEN May 30 03:26:23 UTC** *"Add test vectors appendix"* (+326/−0 to `draft-ietf-moq-secure-objects.md`, 1 file) — first content PR on the moq-wg/secure-objects repo in weeks; signals draft-01 preparation. Combined with the unfulfilled MSF -01 publication and the moq-wg/moq-transport Issue #1637 bidi-stream-credit design gap, suggests a **coordinated multi-draft London-cycle drop** rather than independent revision cadences.

**draft-ietf-moq-secure-objects-01** | 33 pages | published 2026-07-06 (supersedes -00)

# Authors
- Cullen Jennings (Cisco)
- [[suhas-nandakumar]] (Cisco)
- Richard Barnes (Cisco)

# Abstract

Defines an authenticated encryption scheme for objects transmitted via [[moq-transport]]. Publishers sharing symmetric keys with end subscribers can prevent [[relays]] from decrypting content. Subscribers can verify object integrity and authenticity.

# Key Properties

- **E2E encryption**: Relays cannot read object content
- **Integrity verification**: Subscribers verify objects came from the claimed publisher
- **Publisher control**: Publishers decide whether relays can access or modify MOQT parameters
- **Symmetric keys**: Key distribution is out of scope but key sharing between publisher and subscriber is required

# Replaces

This draft (draft-ietf-moq-secure-objects-00) replaces the individual draft draft-jennings-moq-secure-objects, now adopted as a WG document.

# Recent Editorial Wave (Apr 29 → May 1, 2026)

After being quiet since draft-00 was published Mar 2, secure-objects had a coordinated cleanup wave. **4 PRs MERGED, 5 issues CLOSED, 6 PRs OPENED in ~30 hours.** The wave aligns the spec with the working-group decision on track-property authentication and finalizes wire-format details for AAD construction and the Object-ID nonce.

## Track Properties Authentication — Issue #74 consensus: option #1

**Issue [#74](https://github.com/moq-wg/secure-objects/issues/74)** *"Authentication of Track Properties"* (fluffy, Apr 29 19:57 UTC) documents the WG decision after considering 4 options:
- Option #1: **Don't provide end to end security for track properties.** Apps add properties needing E2E to first object of group.
- Option #2: Authentication only when an object is received.
- Option #3: Authentication + encryption when an object is received.
- Option #4: Separate E2E protection for track properties in control messages.

**Consensus was Option #1.** This is the most consequential structural decision of the wave: track-level data flows over MOQT control messages and is **not protected end-to-end**; application-layer signaling moves to first-object-of-group property delivery instead.

## Merged PRs (May 1 03:02–03:24 UTC)

- **[PR #79](https://github.com/moq-wg/secure-objects/pull/79)** — *Use fixed-width integers for AAD and nonce formation to avoid varint ambiguity* ([[suhas-nandakumar]]). Closes Issue #58 (vasilvv, "Varints"). Eliminates the canonicalization ambiguity that two-valid-encodings would have introduced into AEAD inputs.
- **[PR #80](https://github.com/moq-wg/secure-objects/pull/80)** — *Add Publisher Priority to E2E authenticated data* ([[suhas-nandakumar]]). Closes Issue #71 ([[fluffy]] Mar 16). Brings publisher priority under the AEAD tag so relays cannot manipulate it.
- **[PR #75](https://github.com/moq-wg/secure-objects/pull/75)** — *guidance on track extentions* [sic] ([[fluffy]]). Adds guidance on how track extensions interact with secure-objects authentication.
- **[PR #76](https://github.com/moq-wg/secure-objects/pull/76)** — *Explain 32-bit object ID nonce limitation* ([[fluffy]]). Closes Issue #70 ([[alan-frindell]] Mar 15). Documents that publishers must rotate keys before exhausting the 32-bit Object-ID space within a key generation.

## Wave wraps May 1 21:05–21:33 UTC (PRs #82, #77, #86)

- **[PR #82](https://github.com/moq-wg/secure-objects/pull/82)** MERGED May 1 21:05:19 UTC by [[fluffy]] ([[suhas-nandakumar]] author, +66/0, *Add padding property for byte boundary alignment*). **Closes Issue #54** (fluffy Nov 2025 — *"add a private header extension for pad to N byte boundary"*).
- **[PR #77](https://github.com/moq-wg/secure-objects/pull/77)** MERGED May 1 21:06:12 UTC self-merged by [[fluffy]] (+50/0, *describe threat model*). Body: *"This most Fixes #49 but making a separate PR to describe the fan out attacks."* Mostly fixes Issue #49.
- **[PR #78](https://github.com/moq-wg/secure-objects/pull/78)** CLOSED unmerged May 1 21:29 UTC (the original *"DO NOT MERGE YET"* fan-out attack PR). **Superseded by PR #86.**
- **[PR #86](https://github.com/moq-wg/secure-objects/pull/86)** OPENED + MERGED in a 6-minute window May 1 21:27:42 → 21:33:18 UTC by [[fluffy]] (opened) → [[suhas-nandakumar]] (merged) (+27/0, *Explain Fan Out Attack*, *"This replaces PR#78 and is part of Fixes #49"*). Closes Issue #49.

## AAD structural change (commit-only, no merged PR)

- **Commit `87a95f77`** ([[suhas-nandakumar]] May 1 03:17:34 UTC): *"Remove Track Namespace and Track Name from AAD structure"*. PR #81 (*"Simplify SECURE_OBJECT_AAD to contain only Serialized Immutable Properties"*) was closed without merge; the underlying simplification landed via direct commit. **Most consequential wire-format change of the wave.** AAD now authenticates **only the serialized immutable properties**, aligning with the Issue #74 option-#1 decision (track-level data is not authenticated).
- **Commit `56248619`** ([[suhas-nandakumar]] May 1 03:01:33 UTC): *"make object id 32 bits"* — finalizes the Object-ID nonce field width.

## Issues closed Apr 29 → May 1

- **#74** — Authentication of Track Properties (closed via consensus)
- **#70** — 32-bit Object ID nonce ok? (closed via PR #76)
- **#71** — Add publisher priority to e2e (closed via PR #80)
- **#58** — Varints in AAD (closed via PR #79)
- **#61** — Private extensions set-up (closed Apr 29)
- **#54** — Padding for byte boundary alignment (closed via PR #82)
- **#49** — Describe achieved security properties (closed via PR #77 + PR #86)

## Open PRs (in flight as of May 2)

- **[PR #83](https://github.com/moq-wg/secure-objects/pull/83)** — *Change the SFRAME ref to point at the RFC* ([[fluffy]]).
- **[PR #84](https://github.com/moq-wg/secure-objects/pull/84)** — *Add test vectors in appendix* ([[fluffy]]).
- **[PR #85](https://github.com/moq-wg/secure-objects/pull/85)** — *fix up inconsistent dash in end-to-end and hop-by-hop* ([[fluffy]]).

## Trajectory

The remaining open PRs are SFRAME-ref + test-vectors + en-dash editorial polish — secure-objects is now substantively at the -01 release line. **draft-ietf-moq-secure-objects-01 has not yet been published on Datatracker** despite the merge wave; expected imminently. The track-property scope decision (Issue #74 option #1) is the most likely point of WG list discussion before -01.

# Related

- [[moq-transport]] - Transport layer that carries secure objects
- [[moq-privacy-pass]] - Complementary authentication mechanism
- [[moq-loc]] - Container format that integrates with secure objects

# External Links
- [GitHub repo](https://github.com/moq-wg/secure-objects)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-secure-objects/)
