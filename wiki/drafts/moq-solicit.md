---
title: "MoQ Solicit Extension (moq-solicit)"
tags: [draft, individual, transport, discovery]
date: 2026-09-27
last_updated: 2026-09-27
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-lcurley-moq-solicit/"
---

**draft-lcurley-moq-solicit-00** | Individual submission | submitted **2026-09-24** | Author: [[luke-curley|L. Curley]] | [Datatracker](https://datatracker.ietf.org/doc/draft-lcurley-moq-solicit/)

**First look.** This page records the draft's own abstract and scope as published; the text has not been reviewed in depth here yet.

# Abstract (as published)

> This document defines an extension for MoQ Transport [moqt] that lets an endpoint declare that advertisements to it must be solicited first. An endpoint that declares nothing receives unsolicited PUBLISH_NAMESPACE, which is what a peer unaware of this extension implicitly asks for. An endpoint that will instead ask for what it wants says so once during setup, and is spared the advertisements it would otherwise have to ignore.

# What it defines

A **`SOLICIT` setup option**. The semantics are deliberately backward-compatible by omission:

- **Declare nothing** → you keep receiving **unsolicited `PUBLISH_NAMESPACE`**, which is exactly what a peer that has never heard of this extension is implicitly asking for.
- **Declare it once during setup** → the peer **withholds advertisements** and answers only `SUBSCRIBE_NAMESPACE`. You ask for what you want.

The motivation is a relay or client that would otherwise have to receive and discard a large advertisement stream. It sits directly adjacent to the namespace-discovery restructuring in flight on the core draft as [#1946](https://github.com/moq-wg/moq-transport/pull/1946).

# Context

Submitted in [[luke-curley|Luke Curley]]'s **eight-document batch of 2026-09-24**, at the IETF-127 (Seattle) submission cutoff — four brand-new drafts ([[moq-e2ee]], [[moq-solicit]], [[moq-flate]], [[moq-mpegts]]) plus revisions of [[moq-hang|hang-03]], [[moq-lite|lite-06]], [[moq-msfts|msfts-01]] and [[moq-cluster|cluster-01]]. Individual submission, **not WG-adopted**. See [[moq-dev]], [[discussions-2026-09]].

# Related
- [[moq-transport]] — the extended protocol; see the namespace-discovery restructuring in [#1946](https://github.com/moq-wg/moq-transport/pull/1946)
- [[publish-subscribe]] — `PUBLISH_NAMESPACE` / `SUBSCRIBE_NAMESPACE` flow
- [[relays]] — the endpoints most likely to want this
