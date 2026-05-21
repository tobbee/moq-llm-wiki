---
title: "Moqintosh (t-gazzy)"
tags: [implementation, swift, ios, client]
date: 2026-05-21
last_updated: 2026-05-21
status: current
---

> **2026-05-21**: **Moqintosh announced on `#moq` Slack May 20 15:22 UTC** by [gazzy (Toshiro Igarashi)](https://github.com/t-gazzy) — *"Hi. I have released iOS client for MoQ. I hope iOS developers use. • Pure Swift • Client Only • draft-14 based • github.com/t-gazzy/Moqintosh"* (2× 👍 reactions). **14th distinct open-source MoQ implementation tracked by the wiki** and **first iOS-targeted client**. Repo created Apr 10 2026, last pushed May 20 15:27 UTC, 3 stars at announcement. Draft-14 baseline is 2 revisions behind the May 12 [[moq-transport|draft-18]] watermark.
>
> [[paul-gregoire|Paul Gregoire]] (OpenMOQ / mondain/moqxr) replied May 20 15:31 UTC: *"I made 'toy' I was messing around with over the weekend, I named mine nearly the same 'moqntosh'; I guess we thought of the same play on words."* — name-coincidence note; Paul has a private `moqntosh` toy not in the wiki.

**Language**: Swift (pure Swift, no Objective-C)
**Maintainer**: gazzy / Toshiro Igarashi ([t-gazzy](https://github.com/t-gazzy))
**GitHub**: [t-gazzy/Moqintosh](https://github.com/t-gazzy/Moqintosh)
**Repo description**: *"Pure Swift Media over QUIC framework"*

# Overview

A pure-Swift Media over QUIC client library, **iOS-focused**, currently positioned as a client-only implementation (no relay/publisher functionality at announcement). The project is the first MoQ implementation that natively targets Apple platforms via Swift rather than wrapping a C library through Objective-C interop.

# Draft Support

- **draft-14** (current, May 21 2026)
- No relay support announced
- No publisher functionality announced — *"Client Only"* per the announcement

The 2-draft-revision gap (current matrix and most peers are at draft-16+, with [[moq-dev]], [[imquic]], and [[openmoq|mondain/moqxr]] all on draft-18) positions Moqintosh as an **exploratory rather than interop-target** implementation. **No PR filed against [englishm/moq-interop-runner](https://github.com/englishm/moq-interop-runner)** to register Moqintosh as an interop endpoint.

# Maintainer history on the `#moq` Slack

gazzy is a recurring participant in `#moq`:
- **2026-05-20 15:22 UTC**: Moqintosh announcement.
- **2026-05-16 (May 16)**: OS-level audio bug question.
- **2026-03-03 07:24 UTC** + **2026-03-03 05:36 UTC**: questions about *"how to send big data like video I frame on the datagram"* — discussion with [[alan-frindell|afrind]] about whether to use streams (subgroups) instead.

# Carry-forward

- **No London hackathon participation announced** by gazzy. The 2-revision gap also means Moqintosh cannot participate in moqxr/imquic/moq-dev bilateral interop without a draft-bump.
- **Possible relay or publisher work** would significantly elevate Moqintosh's interop-target status; right now the *"Client Only"* scope is similar to [[shaka-player]] (player-only) but for a different host platform.
- **Apple/Swift ecosystem reach** is a structurally new audience for MoQ — pre-Moqintosh, all Apple-platform MoQ work was via [[moq-rs|cloudflare/moq-rs]] (C FFI) or shaka-player (web). The pure-Swift framework opens a new platform-native deployment path.
