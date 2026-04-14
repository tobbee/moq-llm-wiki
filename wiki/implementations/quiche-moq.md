---
title: "quiche-moq"
tags: [implementation, rust]
date: 2026-04-10
last_updated: 2026-04-14
status: current
---

**Language**: Rust
**GitHub**: [birneee/quiche_moq](https://github.com/birneee/quiche_moq)
**Maintainer**: [[martin-duke]] runs a relay using this

# Overview

A Rust MOQ Transport implementation built on the quiche QUIC library. Note: this is NOT an official Google/Cloudflare project despite the quiche name.

# Draft Support

- **Multi-version**: drafts 07-13 and 16
- Draft 14 and 15 are **not** supported (gap in version coverage)
- Has `draft-16` and `draft-14` branches/tags

# Public Infrastructure

- [[martin-duke]] runs a relay at `quichemoq.dev:443` (draft-16)
- Passed 41/41 conformance tests from [[alan-frindell]] (Feb 2026)

# Interop

- Registered in [[interop-runner]] matrix
- Successfully tested with [[moxygen]], [[moq-rs]], and [[moqtail]] at Boulder hackathon

# Related

- [[martin-duke]] - Runs the public relay
- [[interop-endpoints]] - Public relay endpoints
