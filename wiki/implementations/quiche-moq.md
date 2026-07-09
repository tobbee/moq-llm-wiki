---
title: "Google QUICHE MoQT (quiche-moq)"
tags: [implementation, cpp, google]
date: 2026-04-15
last_updated: 2026-07-02
status: current
---

**Language**: C++
**Organization**: Google
**Primary developers**: [[martin-duke]], [[victor-vasiliev|Victor Vasiliev]], with contributions from asedeno, dschinazi
**GitHub**: [google/quiche](https://github.com/google/quiche/tree/main/quiche/quic/moqt) (MoQT module within Google's QUICHE library)

# Overview

A substantial C++ MoQT implementation inside Google's QUICHE library (part of Chromium). Includes ~74+ source files plus a tools directory with relay, server, client, chat, and simulator applications. This is one of the more actively developed implementations in the ecosystem, with commits continuing into mid-2026.

# Draft Support

- **draft-16** — current target for the public relay
- Passed 41/41 conformance tests from [[alan-frindell]] (Feb 2026)
- Protocol work lands on `main` ahead of the relay: newer draft-tracking refactors merge in the module while the public relay's registered interop target still lags at draft-16.

# Public Infrastructure

- **`quichemoq.dev:443`** — [[martin-duke]]'s relay (draft-16)
- Registered in [[interop-runner]] as **quiche-moq**

# Recent Highlights

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **PUBLISH moved to a bidirectional stream** (June 2026) — aligns Google's C++ impl with the draft direction of carrying PUBLISH on a bidi stream.
- **Control-stream architecture refactor** (June 2026) — control-message handlers were folded into the session and the control stream split in two; a dedicated WebTransport-only client class was split out of `MoqtClient`.
- **Session parameter control API** (April 2026) — `MoqtClient` and `MoqtServer` can control session parameters, groundwork for partial-object delivery on the relay.
- **Removed `moqt::SubscribeWindow`** (April 2026) — dropped legacy SUBSCRIBE window tracking as draft-17's PUBLISH/SUBSCRIBE model settled.
- **Joining FETCH work** (April 2026) — Joining FETCH limited to `largest_object` at time of SUBSCRIBE, with responsibility moved from `MoqtOutgoingQueue` to the session layer, preparing for REWIND's joining FETCH aspects.

# Interop

- Successfully tested with [[moxygen]], [[moq-rs]], and [[moqtail]] at Boulder hackathon (Feb 2026)
- Registered in the [[interop-runner]] matrix

# Disambiguation

There is also a separate **Rust** project called [birneee/quiche_moq](https://github.com/birneee/quiche_moq) by Leon Birne, built on Cloudflare's `quiche` crate (a Rust QUIC library). Created 2025-10-17. That project supports drafts 07-13 and 16 but is **not** in the interop runner. The naming collision is coincidental — both are named after QUIC libraries that happen to share the name "quiche."

# Related

- [[martin-duke]] - Primary developer, runs the public relay
- [[interop-endpoints]] - Public relay endpoints
- [[interop-runner]] - Automated test framework
