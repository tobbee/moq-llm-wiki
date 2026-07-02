---
title: "Privacy Pass Authentication for MOQ"
tags: [draft, security, authentication]
date: 2026-04-10
last_updated: 2026-06-19
status: current
draft_version: "02"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-privacy-pass-auth/"
last_updated: 2026-07-02
---

> **2026-07-02**: **The auth workstream surfaces on the tracker for the first time since London — [[suhas-nandakumar|Suhas]] runs a triage pass July 1 (~16:00–16:24 UTC).** Three weeks after [[thibault-meunier|Thibault Meunier]]'s June-12 issue burst, the [moq-wg/privacy-pass](https://github.com/moq-wg/privacy-pass) tracker gets its first activity — the concrete follow-through on [[martin-duke|Martin Duke]]'s **June-29 reactivation of the "AUTH design team"** list thread. Suhas opens **[#19](https://github.com/moq-wg/privacy-pass/issues/19)** *"Reverse Flow and MOQT Integration"* (NEW) — the **reverse-flow token-exchange** question: can new subscriptions get tokens from the **relay acting as issuer** (not the original PP issuer), and can it **reuse `REQUEST_UPDATE` / `REQUEST_OK` / `REQUEST_ERROR`** as carriers? — and comments on the standing thibmeu issues: on **[#18](https://github.com/moq-wg/privacy-pass/issues/18)** (token challenge/acquisition) a two-part plan — **replace the `ReasonPhrase` carrier with `MoQTokenChallenge`** (the long-tracked "no clean challenge carrier in a SETUP-closure reply" problem) and explore challenging **without closing the session**; on **[#16](https://github.com/moq-wg/privacy-pass/issues/16)** (retry-after-error) that it is *"similar to #18"* and should get supporting text once #18 lands in MoQT. No new revision (still -02). See [[moq-transport]], [[moq-c4m]], [[discussions-2026-07]].
>
> **2026-06-19**: **The *other* auth track ships a revision — [[moq-c4m|C4M]] (`draft-ietf-moq-c4m-01`, Common Access Tokens) is published June 18, and the AUTH design team thread stays active through June 19.** While privacy-pass itself sees no new revision, its sibling auth draft — **[[moq-c4m|`draft-ietf-moq-c4m`]]** *"Authorization scheme for MOQT using Common Access Tokens"* ([[will-law|Will Law]], Chris Lemmons, [[gwendal-simon|Gwendal Simon]], [[suhas-nandakumar|Suhas Nandakumar]]) — lands its **-01**, the first revision since WG adoption (c4m-00, 2025-09-19). C4M is the **signed-bearer-token** counterpart to privacy-pass's privacy-preserving model: the token (a CTA-5007-B Common Access Token / CWT) carries the authorized action scopes (PUBLISH_NAMESPACE/SUBSCRIBE/PUBLISH/FETCH, namespace/track-matched) and relays enforce them. **[[martin-duke|Martin Duke]]'s "AUTH design team"** mailing-list thread (open since June 12) is the coordination venue spanning both schemes; it draws fresh replies June 18–19 (Manu Gupta, Nemanja Djordjevic, Manish). Privacy-pass-over-MoQ remains the privacy-optimized half of a two-track WG auth workstream. See [[moq-c4m]], [[moq-transport]], [[discussions-2026-06]].
>
> **2026-06-13**: **A third thibmeu issue + auth folds into a new WG design team; the MOQT challenge-carrier PR is dropped.** Out of the June-12 London Privacy Pass slot, [[thibault-meunier|Thibault Meunier]] opens **[#18](https://github.com/moq-wg/privacy-pass/issues/18)** *"Specify token challenge and acquisition during regular operation"* (June 12 12:25 UTC) — extending his June-11 [#16](https://github.com/moq-wg/privacy-pass/issues/16) (retry-after-challenge-errors) / [#17](https://github.com/moq-wg/privacy-pass/issues/17) (issuer-interaction appendix) toward the steady-state token-acquisition flow. Meanwhile the candidate MOQT carrier for the challenge — suhasHere's [moq-transport PR #1659](https://github.com/moq-wg/moq-transport/pull/1659) (REQUEST_ERROR Error Payload) — is **CLOSED June 12 without merge**, and the broader auth question moves into [[martin-duke|Martin Duke]]'s new **"AUTH design team"** mailing-list thread (June 12; Mike English, Aman Sharma, Suhas, Cullen) rather than a point PR. Privacy-pass-over-MoQ is now part of a coordinated cross-draft auth workstream. See [[moq-transport]], [[interim-meetings]], [[discussions-2026-06]].
>
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
- [[moq-c4m]] - The other adopted MOQT auth scheme (CTA WAVE Common Access Tokens); see [CAT-4-MOQT repo](https://github.com/moq-wg/CAT-4-MOQT)

# External Links
- [GitHub repo](https://github.com/moq-wg/privacy-pass)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-privacy-pass-auth/)
