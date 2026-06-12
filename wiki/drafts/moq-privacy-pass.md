---
title: "Privacy Pass Authentication for MOQ"
tags: [draft, security, authentication]
date: 2026-04-10
last_updated: 2026-06-12
status: current
draft_version: "02"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-privacy-pass-auth/"
---

> **2026-06-12**: **Two more thibmeu issues June 11 + a candidate MOQT carrier for the challenge.** Ahead of the June-12 London Privacy Pass slot (Suhas), [[thibault-meunier|Thibault Meunier]] opens two more [moq-wg/privacy-pass](https://github.com/moq-wg/privacy-pass/issues) items: **[#16](https://github.com/moq-wg/privacy-pass/issues/16)** *"Specify retry behavior after auth challenge errors"* and **[#17](https://github.com/moq-wg/privacy-pass/issues/17)** *"Add an appendix as to how to retrieve key material and interact with the issuer"* (June 11 16:32/16:33 UTC). Both deepen the issuer-interaction + retry semantics the draft has been under-specifying. **On the MOQT side, the challenge-carrier problem thibmeu raised (#14/#15: no clean carrier for a structured challenge in a SETUP-closure reply) gets a candidate answer**: suhasHere's **[moq-transport PR #1659](https://github.com/moq-wg/moq-transport/pull/1659)** *"Add Error Payload field to REQUEST_ERROR for binary challenge data"* (+18/−2) — thibmeu reviews June 11 19:33 endorsing the binary Error Payload as a clean carrier for the `MoQTokenChallenge`, useful for privacy-pass-over-MoQ. See [[moq-transport]], [[interim-meetings]], [[discussions-2026-06]].
>
> **2026-06-07**: **[[thibault-meunier|Thibault Meunier]] (Cloudflare, co-author) opens 2 design issues June 5** on [moq-wg/privacy-pass](https://github.com/moq-wg/privacy-pass/issues) — **[#14](https://github.com/moq-wg/privacy-pass/issues/14)** *"MOqTokenChallenge should be base64 encoded"* and **[#15](https://github.com/moq-wg/privacy-pass/issues/15)** *"Find how to pass MoQTokenChallenge in reply to a SETUP closure without using ReasonPhrase"*. These move thibmeu's **issuer-aware challenge-reply** concerns — first raised in his [May 30 review of cloudflare/moq-rs PR #169](https://github.com/cloudflare/moq-rs/pull/169) (the AuthHook trait) — from cross-impl review into the draft's own issue tracker. The core wire question: a relay that wants to challenge a client must send a `MoQTokenChallenge` back, but with draft-18 collapsing CLIENT_SETUP/SERVER_SETUP and using a `ReasonPhrase` on session close, there is **no clean carrier for a structured (base64) challenge in a SETUP-closure reply**. Lands one week before the **June-12 London Privacy Pass slot (Suhas)**; see [[interim-meetings]] + [[discussions-2026-06]].

**draft-ietf-moq-privacy-pass-auth-02** | 31 pages | Expires 2026-03-02

# Authors
- [[suhas-nandakumar]] (Cisco)
- Cullen Jennings (Cisco)
- Thibault Meunier (Cloudflare)

# Abstract

Integrates Privacy Pass tokens with [[moq-transport]] to enable privacy-preserving authentication for subscriptions, fetches, publications, and relay operations. Supports fine-grained access control through prefix-based track namespace and track name matching rules.

# Key Features

- **Privacy-preserving**: Uses Privacy Pass tokens so relays learn minimal information about subscribers
- **Fine-grained ACL**: Prefix-based matching on track namespace and track name
- **Multiple operations**: Covers SUBSCRIBE, FETCH, PUBLISH, and relay forwarding
- **Token-based**: Leverages the IETF Privacy Pass architecture

# Related

- [[moq-transport]] - Transport layer being authenticated
- [[moq-secure-objects]] - Complementary E2E encryption
- [CAT-4-MOQT](https://github.com/moq-wg/CAT-4-MOQT) - Alternative auth approach using CTA WAVE Common Access Tokens

# External Links
- [GitHub repo](https://github.com/moq-wg/privacy-pass)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-privacy-pass-auth/)
