---
title: "Privacy Pass Authentication for MOQ"
tags: [draft, security, authentication]
date: 2026-04-10
status: current
draft_version: "02"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-privacy-pass-auth/"
---

# Privacy Pass Authentication for MOQ

**draft-ietf-moq-privacy-pass-auth-02** | 31 pages | Expires 2026-03-02

## Authors
- [[suhas-nandakumar]] (Cisco)
- Cullen Jennings (Cisco)
- Thibault Meunier (Cloudflare)

## Abstract

Integrates Privacy Pass tokens with [[moq-transport]] to enable privacy-preserving authentication for subscriptions, fetches, publications, and relay operations. Supports fine-grained access control through prefix-based track namespace and track name matching rules.

## Key Features

- **Privacy-preserving**: Uses Privacy Pass tokens so relays learn minimal information about subscribers
- **Fine-grained ACL**: Prefix-based matching on track namespace and track name
- **Multiple operations**: Covers SUBSCRIBE, FETCH, PUBLISH, and relay forwarding
- **Token-based**: Leverages the IETF Privacy Pass architecture

## Related

- [[moq-transport]] - Transport layer being authenticated
- [[moq-secure-objects]] - Complementary E2E encryption
- [CAT-4-MOQT](https://github.com/moq-wg/CAT-4-MOQT) - Alternative auth approach using CTA WAVE Common Access Tokens

## External Links
- [GitHub repo](https://github.com/moq-wg/privacy-pass)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-privacy-pass-auth/)
