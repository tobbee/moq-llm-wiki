---
title: "Authorization scheme for MOQT using Common Access Tokens (C4M)"
tags: [draft, security, authentication, wg-document]
date: 2026-06-19
last_updated: 2026-06-19
status: current
draft_version: "01"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-c4m/"
---

> **2026-06-19**: **C4M lands its first WG revision — `draft-ietf-moq-c4m-01` published June 18, the first new moq-wg draft revision the wiki has tracked since transport-18 (May 12).** [[will-law|Will Law]] (Akamai), Chris Lemmons (Comcast), [[gwendal-simon|Gwendal Simon]] (Synamedia), and [[suhas-nandakumar|Suhas Nandakumar]] (Cisco) publish **-01** (expires 2026-12-20), the first revision since the document was adopted as a WG item (**c4m-00**, 2025-09-19) from the individual `draft-law-moq-cat4moqt`. C4M is the **Common Access Token (CAT)** authorization scheme for [[moq-transport|MOQT]] — the **complementary/alternative auth track to [[moq-privacy-pass|Privacy Pass]]**: where Privacy Pass is privacy-preserving (the relay learns minimal information about the subscriber), C4M is a **signed-bearer-token** scheme where the token itself carries the authorized action scopes and the relay enforces them at session setup and per-operation. The -01 revision lands while [[martin-duke|Martin Duke]]'s **AUTH design team** mailing-list thread (open since June 12) is actively coordinating the WG's auth workstream across C4M, Privacy Pass, and the generic-AUTH-challenge gap. WG milestone targets **requesting publication December 2026**. See [[moq-privacy-pass]], [[moq-transport]], [[discussions-2026-06]].

**draft-ietf-moq-c4m-01** | Expires 2026-12-20 | adopted from `draft-law-moq-cat4moqt`

# Authors
- [[will-law|Will Law]] (Akamai)
- Chris Lemmons (Comcast)
- [[gwendal-simon|Gwendal Simon]] (Synamedia)
- [[suhas-nandakumar|Suhas Nandakumar]] (Cisco)

# Abstract

> "A token-based authorization scheme for use with Media Over QUIC Transport."

C4M defines how a **Common Access Token (CAT)** — the CTA WAVE **CTA-5007-B** token format, built on the IETF **CBOR Web Token (CWT)** — is presented in a [[moq-transport|MOQT]] session and enforced by relays to control client access and constrain the operations a client may perform.

# Key Mechanisms

- **Token format**: a CAT (CTA-5007-B), i.e. a signed **CWT** (CBOR Web Token). Validation uses pre-shared secrets between the token issuer (the distribution/origin service) and the enforcing relays.
- **`moqt` claim**: arrays of **action scopes** specifying which MOQT operations are authorized (PUBLISH_NAMESPACE / SUBSCRIBE / PUBLISH / FETCH), each optionally constrained to a **namespace and track** by **exact, prefix, or suffix** matching.
- **`moqt-reval` claim**: revalidation intervals for **ongoing streams**, so a relay can require periodic re-checking of long-lived subscriptions/publications.
- **DPoP integration**: optional proof-of-possession binding — a `cnf` confirmation claim carrying a **JWK thumbprint** plus `catdpop` processing settings, so a stolen bearer token can't be replayed by an unbound client.
- **Presentation points**: clients provide the token at **connection establishment** and with subsequent MOQT actions; tokens may be **Base64-encoded when added to a URL**.
- **Relay enforcement**: validate the signature, check expiration and claims, match each requested action against the authorized scopes, and — when DPoP is present — verify the proof-of-possession signature and key binding.

# Section structure (-01)

Introduction · Token Format · DPoP Integration with CAT for MOQT · Adding a Token to a URL · Conventions and Definitions · Security Considerations · IANA Considerations · Normative References · Appendices (Test Vectors).

# Relationship to other auth work

- **[[moq-privacy-pass|Privacy Pass]]** — the other adopted MOQT auth scheme. Privacy Pass optimizes for **subscriber privacy** (relays learn minimal information); C4M optimizes for **scoped, signed, server-issued authorization** (the token names exactly what its bearer may do). The two are tracked together by the **AUTH design team**.
- **[[moq-transport]]** — the transport whose operations (PUBLISH_NAMESPACE / SUBSCRIBE / PUBLISH / FETCH) the C4M scopes authorize. The transport draft's own auth-token-lifecycle and challenge-carriage questions (e.g. EXPIRES, REQUEST_ERROR challenge payloads) feed the same workstream.
- **[[moq-secure-objects]]** — complementary E2E object encryption (confidentiality), orthogonal to C4M's access control.

# Related
- [[moq-privacy-pass]] - Privacy-preserving authentication via Privacy Pass tokens
- [[moq-transport]] - Transport layer being authorized
- [[moq-secure-objects]] - Complementary E2E encryption
- [[suhas-nandakumar]], [[will-law]], [[gwendal-simon]] - co-authors

# External Links
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-c4m/)
- [draft-ietf-moq-c4m-01 (HTML)](https://www.ietf.org/archive/id/draft-ietf-moq-c4m-01.html)
- [GitHub repo (moq-wg/CAT-4-MOQT)](https://github.com/moq-wg/CAT-4-MOQT)
- [CTA-5007 Common Access Token](https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5007-final.pdf)
