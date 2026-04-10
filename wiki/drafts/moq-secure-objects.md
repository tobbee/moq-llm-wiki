---
title: "End-to-End Secure Objects for MOQT"
tags: [draft, security, encryption]
date: 2026-04-10
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-secure-objects/"
---

# End-to-End Secure Objects for MOQT

**draft-ietf-moq-secure-objects-00** | 23 pages | Expires 2026-09-03

## Authors
- Cullen Jennings (Cisco)
- [[suhas-nandakumar]] (Cisco)
- Richard Barnes (Cisco)

## Abstract

Defines an authenticated encryption scheme for objects transmitted via [[moq-transport]]. Publishers sharing symmetric keys with end subscribers can prevent [[relays]] from decrypting content. Subscribers can verify object integrity and authenticity.

## Key Properties

- **E2E encryption**: Relays cannot read object content
- **Integrity verification**: Subscribers verify objects came from the claimed publisher
- **Publisher control**: Publishers decide whether relays can access or modify MOQT parameters
- **Symmetric keys**: Key distribution is out of scope but key sharing between publisher and subscriber is required

## Replaces

This draft (draft-ietf-moq-secure-objects-00) replaces the individual draft draft-jennings-moq-secure-objects, now adopted as a WG document.

## Related

- [[moq-transport]] - Transport layer that carries secure objects
- [[moq-privacy-pass]] - Complementary authentication mechanism
- [[moq-loc]] - Container format that integrates with secure objects

## External Links
- [GitHub repo](https://github.com/moq-wg/secure-objects)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-secure-objects/)
