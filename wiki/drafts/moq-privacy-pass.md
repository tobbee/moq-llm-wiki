---
title: "Privacy Pass Authentication for MOQ"
tags: [draft, security, authentication]
date: 2026-04-10
last_updated: 2026-11-03
status: current
draft_version: "04"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-privacy-pass-auth/"
---

**draft-ietf-moq-privacy-pass-auth-04** | published 2026-11-02 | [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-privacy-pass-auth/04/) — rebased on the AUTH design team's model and aligned with moq-transport-23
**draft-ietf-moq-privacy-pass-auth-03** | published 2026-07-06 | [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-privacy-pass-auth/)
**draft-ietf-moq-privacy-pass-auth-02** | 31 pages

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

# Recent Highlights

Day-by-day WG/PR activity lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **draft-04 published (2026-11-02), rebuilt on the AUTH design team's model.** [[thibault-meunier|Meunier]]'s [#26](https://github.com/moq-wg/privacy-pass/pull/26) and [[suhas-nandakumar|Suhas]]'s transport-alignment [#27](https://github.com/moq-wg/privacy-pass/pull/27) both merged Nov-2, and -04 was submitted at 07:47 UTC. The changelog:
  - **Reverse-flow issuance** moves to `AUTH REQUEST`/`AUTH RESPONSE` parameters, and a client can **acquire tokens over an established connection via REQUEST_UPDATE**.
  - The `TokenChallenge` travels in an **`AUTH CHALLENGE`** parameter instead of reason phrases, bound to REQUEST_ERROR **Error Details** (transport #2010). The PrivateTokenAuth structures and the auth-scheme registry are removed.
  - It aligns with **moq-transport-23** (a single SETUP message), adds a `SUBSCRIBE_TRACKS` action, and **requires `USE_VALUE`, treating alias reuse as replay**.
  - It reuses MoQT's `MALFORMED_AUTH_TOKEN`/`EXPIRED_AUTH_TOKEN` codes and registers a Privacy Pass codepoint in the MOQT Auth Token Type registry.
- **`-03` published (2026-07-06)** — a major rebuild of the MoQT integration, converting the July-1 triage and [[thibault-meunier|Thibault Meunier]]'s merged "Key considerations" text (PR #20) into published spec.

- Privacy-pass is the privacy-preserving half of a **two-track WG auth workstream**; [[moq-c4m|C4M]] (Common Access Tokens) is the signed-bearer-token counterpart, coordinated through [[martin-duke|Martin Duke]]'s "AUTH design team" mailing-list thread.
- **Challenge-carrier design problem**: draft-18 collapsed CLIENT_SETUP/SERVER_SETUP and uses a `ReasonPhrase` on session close, leaving no clean carrier for a structured (base64) `MoQTokenChallenge` in a SETUP-closure reply; the direction is to replace the `ReasonPhrase` carrier with `MoQTokenChallenge` and explore challenging without closing the session.
- **Reverse-flow token exchange**: new subscriptions may obtain tokens from the relay acting as issuer (not the original PP issuer), potentially reusing `REQUEST_UPDATE` / `REQUEST_OK` / `REQUEST_ERROR` as carriers.
- Co-author [[thibault-meunier|Thibault Meunier]] (Cloudflare) drives the draft's open design questions — issuer-interaction appendix, retry-after-challenge-error semantics, token challenge/acquisition during regular operation, and base64 encoding of `MoQTokenChallenge`.

# Related

- [[moq-transport]] - Transport layer being authenticated
- [[moq-secure-objects]] - Complementary E2E encryption
- [[moq-c4m]] - The other adopted MOQT auth scheme (CTA WAVE Common Access Tokens); see [CAT-4-MOQT repo](https://github.com/moq-wg/CAT-4-MOQT)

# External Links
- [GitHub repo](https://github.com/moq-wg/privacy-pass)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-privacy-pass-auth/)
