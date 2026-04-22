---
title: "Google QUICHE MoQT (quiche-moq)"
tags: [implementation, cpp, google]
date: 2026-04-15
last_updated: 2026-04-22
status: current
---

**Language**: C++
**Organization**: Google
**Primary developers**: [[martin-duke]], [[victor-vasiliev|Victor Vasiliev]], with contributions from asedeno, dschinazi
**GitHub**: [google/quiche](https://github.com/google/quiche/tree/main/quiche/quic/moqt) (MoQT module within Google's QUICHE library)

# Overview

A substantial C++ MoQT implementation inside Google's QUICHE library (part of Chromium). Includes ~74+ source files plus a tools directory with relay, server, client, chat, and simulator applications. This is one of the more actively developed implementations in the ecosystem, with commits through April 2026.

# Draft Support

- **draft-16** — current target for the public relay
- Passed 41/41 conformance tests from [[alan-frindell]] (Feb 2026)

# Public Infrastructure

- **`quichemoq.dev:443`** — [[martin-duke]]'s relay (draft-16)
- Registered in [[interop-runner]] as **quiche-moq**

# Interop

- Successfully tested with [[moxygen]], [[moq-rs]], and [[moqtail]] at Boulder hackathon (Feb 2026)
- Registered in the [[interop-runner]] matrix

# Recent Activity (April 2026)

- **Session parameter control API** (Apr 22, [[martin-duke]]): Commit [`1004527761`](https://github.com/google/quiche/commit/1004527761) lets `MoqtClient` and `MoqtServer` control session parameters — groundwork for partial-object delivery on the relay.
- **`moqt_messages.h` split** (Apr 22, [[martin-duke]]): Commit [`c8ff6dc4`](https://github.com/google/quiche/commit/c8ff6dc4) moves non-message-related data structures out of the monolithic messages header — prep refactor before the session-parameter work above.
- **Remove `moqt::SubscribeWindow`** (Apr 20, [[martin-duke]]): Commit [`9843feb`](https://github.com/google/quiche/commit/9843feb) drops the `SubscribeWindow` class, continuing the cleanup of legacy SUBSCRIBE window tracking as draft-17's PUBLISH/SUBSCRIBE model settles.
- **Joining FETCH fix** (Apr 14, [[martin-duke]]): Limit Joining FETCH to `largest_object` at time of SUBSCRIBE rather than using current value. Moves responsibility from `MoqtOutgoingQueue` to the session layer with a new `established_` flag. Prepares for implementing REWIND's joining FETCH aspects.

# Disambiguation

There is also a separate **Rust** project called [birneee/quiche_moq](https://github.com/birneee/quiche_moq) by Leon Birne, built on Cloudflare's `quiche` crate (a Rust QUIC library). Created 2025-10-17. That project supports drafts 07-13 and 16 but is **not** in the interop runner. The naming collision is coincidental — both are named after QUIC libraries that happen to share the name "quiche."

# Related

- [[martin-duke]] - Primary developer, runs the public relay
- [[interop-endpoints]] - Public relay endpoints
- [[interop-runner]] - Automated test framework
