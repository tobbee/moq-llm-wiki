---
title: "End-to-End Secure Objects for MOQT"
tags: [draft, security, encryption]
date: 2026-04-10
last_updated: 2026-05-01
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-secure-objects/"
---

**draft-ietf-moq-secure-objects-00** | 23 pages | Expires 2026-09-03

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

## AAD structural change (commit-only, no merged PR)

- **Commit `87a95f77`** ([[suhas-nandakumar]] May 1 03:17:34 UTC): *"Remove Track Namespace and Track Name from AAD structure"*. PR #81 (*"Simplify SECURE_OBJECT_AAD to contain only Serialized Immutable Properties"*) was closed without merge; the underlying simplification landed via direct commit. **Most consequential wire-format change of the wave.** AAD now authenticates **only the serialized immutable properties**, aligning with the Issue #74 option-#1 decision (track-level data is not authenticated).
- **Commit `56248619`** ([[suhas-nandakumar]] May 1 03:01:33 UTC): *"make object id 32 bits"* — finalizes the Object-ID nonce field width.

## Issues closed Apr 29 → May 1

- **#74** — Authentication of Track Properties (closed via consensus)
- **#70** — 32-bit Object ID nonce ok? (closed via PR #76)
- **#71** — Add publisher priority to e2e (closed via PR #80)
- **#58** — Varints in AAD (closed via PR #79)
- **#61** — Private extensions set-up (closed Apr 29)

## Open PRs (in flight as of May 1)

- **[PR #77](https://github.com/moq-wg/secure-objects/pull/77)** — *describe threat model* ([[fluffy]]); mostly fixes Issue #49 ("Describe achieved security properties").
- **[PR #78](https://github.com/moq-wg/secure-objects/pull/78)** — *Describe the fan out attack — DO NOT MERGE YET* ([[fluffy]]). Tracks the multi-subscriber AEAD-collision attack class.
- **[PR #82](https://github.com/moq-wg/secure-objects/pull/82)** — *Add padding property for byte boundary alignment* ([[suhas-nandakumar]]); fixes Issue #54.
- **[PR #83](https://github.com/moq-wg/secure-objects/pull/83)** — *Change the SFRAME ref to point at the RFC* ([[fluffy]]).
- **[PR #84](https://github.com/moq-wg/secure-objects/pull/84)** — *Add test vectors in appendix* ([[fluffy]]).
- **[PR #85](https://github.com/moq-wg/secure-objects/pull/85)** — *fix up inconsistent dash in end-to-end and hop-by-hop* ([[fluffy]]).

## Trajectory

The remaining open PRs are threat-model, test-vectors, and editorial polish work — secure-objects is converging on a publishable -01 release. The track-property scope decision (Issue #74 option #1) is the most likely point of WG list discussion before -01.

# Related

- [[moq-transport]] - Transport layer that carries secure objects
- [[moq-privacy-pass]] - Complementary authentication mechanism
- [[moq-loc]] - Container format that integrates with secure objects

# External Links
- [GitHub repo](https://github.com/moq-wg/secure-objects)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-secure-objects/)
