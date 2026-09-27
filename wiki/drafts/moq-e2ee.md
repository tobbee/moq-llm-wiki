---
title: "MoQ End-to-End Encryption Profile (moq-e2ee)"
tags: [draft, individual, security, encryption]
date: 2026-09-27
last_updated: 2026-09-27
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-lcurley-moq-e2ee/"
---

**draft-lcurley-moq-e2ee-00** | Individual submission | submitted **2026-09-24** | Author: [[luke-curley|L. Curley]] | [Datatracker](https://datatracker.ietf.org/doc/draft-lcurley-moq-e2ee/)

**First look.** This page records the draft's own abstract and scope as published; the text has not been reviewed in depth here yet.

# Abstract (as published)

> This document specifies moq-e2ee-00, a versioned profile for end-to-end encryption of MoQ application payloads. Authorized publishers and subscribers share a 32-byte broadcast secret out of band. Each publisher instance mints an epoch and publishes under an opaque broadcast path ending in it. HKDF-SHA-256 derives opaque physical track names and per-track AES-128-GCM keys from the secret and the epoch; grouped frames and datagrams use separate key domains.

# What it defines

A **versioned profile**, not a general key-management framework. The design trades flexibility for simplicity:

- **Key material**: a single **32-byte broadcast secret**, shared out of band between authorized publishers and subscribers. There is no in-band key distribution.
- **Epochs**: each publisher instance **mints an epoch** and publishes under an **opaque broadcast path ending in it** — so a relay sees an opaque path, not a track identity.
- **Derivation**: **HKDF-SHA-256** derives both the **opaque physical track names** and the **per-track AES-128-GCM keys** from the secret plus the epoch.
- **Separate key domains** for grouped frames and for datagrams.

**How it differs from [[moq-secure-objects]]** (the WG document covering the same problem space): encryption binds to **epochs rather than Key IDs**; there are **no in-band headers**; the **nonce doubles as an identity counter**; and the datagram and grouped-frame key domains are split. The stated aim is relay-opaque content protection that is simpler to deploy, compatible with both [[moq-lite]] and [[moq-transport|MoQ Transport]].

**Implementation preceded publication**: [[moq-dev|moq-dev/moq]] had been landing this profile in-tree since roughly 2026-09-13 — the same code-before-draft pattern as [[moq-cluster]] and the moq-lite wire revisions.

# Context

Submitted in [[luke-curley|Luke Curley]]'s **eight-document batch of 2026-09-24**, at the IETF-127 (Seattle) submission cutoff — four brand-new drafts ([[moq-e2ee]], [[moq-solicit]], [[moq-flate]], [[moq-mpegts]]) plus revisions of [[moq-hang|hang-03]], [[moq-lite|lite-06]], [[moq-msfts|msfts-01]] and [[moq-cluster|cluster-01]]. Individual submission, **not WG-adopted**. See [[moq-dev]], [[discussions-2026-09]].

# Related
- [[moq-secure-objects]] — the WG's object-encryption document, which this profile deliberately diverges from
- [[moq-lite]] — one of the two transports this profile targets
- [[moq-transport]] — the other
- [[moq-dev]] — reference implementation (shipped before the draft)
