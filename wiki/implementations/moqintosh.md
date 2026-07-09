---
title: "Moqintosh (t-gazzy)"
tags: [implementation, swift, ios, client]
date: 2026-05-21
last_updated: 2026-05-21
status: current
---

**Language**: Swift (pure Swift, no Objective-C)
**Maintainer**: gazzy / Toshiro Igarashi ([t-gazzy](https://github.com/t-gazzy))
**GitHub**: [t-gazzy/Moqintosh](https://github.com/t-gazzy/Moqintosh)
**Repo description**: *"Pure Swift Media over QUIC framework"*

# Overview

A pure-Swift Media over QUIC client library, **iOS-focused**, currently positioned as client-only (no relay/publisher functionality). It is the first MoQ implementation that natively targets Apple platforms via Swift rather than wrapping a C library through Objective-C interop — a structurally new platform-native path (pre-Moqintosh, Apple-platform MoQ went via [[moq-rs|cloudflare/moq-rs]]'s C FFI or [[shaka-player]] on the web).

# Draft Support

- **draft-14** (current, May 2026) — 2 revisions behind the [[moq-transport|draft-18]] watermark, positioning it as exploratory rather than an interop target
- Client-only: no relay or publisher functionality announced
- Not registered as an endpoint in [englishm/moq-interop-runner](https://github.com/englishm/moq-interop-runner)

# Recent Highlights

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **Announced 2026-05-20** on `#moq` Slack by gazzy — pure-Swift, client-only, draft-14. The 14th distinct open-source MoQ implementation the wiki tracks and the first iOS-targeted client (repo created 2026-04-10).

# Related

- [[shaka-player]] - Player-only implementation (different host platform)
- [[moq-rs]] - Prior Apple-platform path via C FFI
- [[interop-runner]] - Interop testing framework
