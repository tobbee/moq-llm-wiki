---
title: "End-to-End Secure Objects for MOQT"
tags: [draft, security, encryption]
date: 2026-04-10
last_updated: 2026-07-23
status: current
draft_version: "01"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-secure-objects/"
---

**draft-ietf-moq-secure-objects-01** | published 2026-07-06 | [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-secure-objects/)
**draft-ietf-moq-secure-objects-00** | 23 pages

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

# Recent Highlights

Day-by-day WG/PR activity lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **Path to WGLC (IETF-126 Monday session, 2026-07-20; minutes posted 2026-07-22)**: the WG agreed to advance secure-objects toward **Working Group Last Call**. [[cullen-jennings|Cullen Jennings]] proposed moving the draft to WGLC and **parking it until the core [[moq-transport|transport]] registry stabilizes** (the shared IANA registries transport-19 establishes must settle first); [[suhas-nandakumar|Suhas Nandakumar]] supported. So secure-objects is queued as one of the first WG documents to reach Last Call once transport's IANA Considerations are closed out — but it is explicitly gated on the transport registry, not independent. WG consensus is to *not* provide end-to-end security for track properties. Track-level data flowing over MOQT control messages is not protected E2E; apps needing E2E signaling add those properties to the first object of a group. This is the most consequential structural decision.
- **AAD structural change**: the AAD now authenticates only the serialized immutable properties — Track Namespace and Track Name were removed from the AAD structure, aligning with the Issue #74 option-#1 decision.
- **Fixed-width integers for AAD and nonce**: switched from varints to fixed-width integers to remove canonicalization ambiguity in AEAD inputs. Object ID is finalized at 32 bits, so publishers must rotate keys before exhausting the 32-bit Object-ID space within a key generation.
- **Publisher priority brought under AEAD authentication** so relays cannot manipulate it; a padding property was added for byte-boundary alignment.
- **Threat model documented**, including fan-out attacks.
- **Test-vectors appendix + `-01` published (2026-07-06)** — worked AEAD test vectors so implementations can verify encryption/authentication against canonical inputs (interop-readiness); the long-flagged first revision since -00 carries this appendix into published text.

# Related

- [[moq-transport]] - Transport layer that carries secure objects
- [[moq-privacy-pass]] - Complementary authentication mechanism
- [[moq-loc]] - Container format that integrates with secure objects

# External Links
- [GitHub repo](https://github.com/moq-wg/secure-objects)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-secure-objects/)
