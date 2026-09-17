---
title: "warp-player (Eyevinn)"
tags: [implementation, typescript, player, eyevinn, cmsf]
date: 2026-08-22
last_updated: 2026-09-17
status: current
---

**Language**: TypeScript
**Maintainer**: Eyevinn ([[tobbe-einarsson|Torbjörn Einarsson]])
**GitHub**: [Eyevinn/warp-player](https://github.com/Eyevinn/warp-player)
**Role**: Browser player for **[[moq-cmsf|CMSF]]** media over MoQ, using **MSE** playback

# Overview

Eyevinn's TypeScript player for CMAF-packaged media delivered over MoQ. It consumes the **[[moq-cmsf|CMSF]]** streaming format and plays back through **Media Source Extensions**, which makes it the natural client-side counterpart to [[moqlivemock]] (the Go publisher and `mlmtest` interop client) and to the [[moq-locmaf|LOCMAF]] work Eyevinn co-authors.

It is one of the tracked repositories listed in this wiki's schema, alongside [[moqlivemock]] and [[moqtransport]].

# Position in the Eyevinn MoQ stack

| Component | Language | Role |
|---|---|---|
| [[moqlivemock]] | Go | Live MoQ video+audio publisher + bundled subscriber; `mlmtest` interop client |
| **warp-player** | TypeScript | Browser CMSF player (MSE) |
| [[moqtransport]] | Go | MoQ Transport library (fork of mengelbart's) |
| [[moq-locmaf|LOCMAF]] | — | Low Overhead CMAF draft ([[tobbe-einarsson]] + Hugo Björs) |

# Status

**Draft support: draft-18 only** since **v0.14.0 "draft-18 rewrite"** (2026-08-31) — the breaking [PR #190](https://github.com/Eyevinn/warp-player/pull/190) *"speak MoQ Transport draft-18 only"* (+2,554/−4,245) dropped the legacy draft-14/16 paths, moving warp-player onto [[moq-transport]] draft-18 in lockstep with the rest of the Eyevinn stack ([[moqlivemock]] v0.14.0, [[moqtransport]] v0.11.1) ahead of the **Sep-2 draft-18 interop hackathon**. Prior tag: v0.13.1 (2026-08-29). Not separately registered in the [[interop-runner]]; Eyevinn's runner presence is the `moqlivemock` / `mlmtest` **client** endpoint.

**Latest: v0.15.0 (2026-09-16) — plays through a relay.** [PR #193](https://github.com/Eyevinn/warp-player/pull/193) *"discover namespaces with SUBSCRIBE_NAMESPACE and encode them as tuples"* (+486/−43) fixed the two reasons the player could not work behind a relay: it only ever *listened* for PUBLISH_NAMESPACE (which a publisher volunteers but a relay does not — draft-18 §6.1 makes **SUBSCRIBE_NAMESPACE** the in-band discovery mechanism), and it encoded namespaces as a *single* slash-joined field instead of a real tuple. The player now **sends SUBSCRIBE_NAMESPACE on connect** (keeping the passive listener as a fallback, and reporting on screen when nothing arrives within 5 s), adds a **"Namespace prefixes"** filter field (comma-separated, blank = all; one request per prefix, since §10.18 rejects overlapping prefixes with `PREFIX_OVERLAP`), splits namespaces at the wire boundary via `namespaceFields()`, and fixed a Request-ID collision (`TracksManager` had counted IDs separately from `Client`). Meant to be paired with **[[moqlivemock]] v0.15.0**, whose namespaces carry an `mlm` publisher prefix. Verified in Chromium against `mlmpub → mlmrel → player`. See [[moqlivemock]] for the combined-stack narrative.

# Related

- [[moqlivemock]], [[moqtransport]], [[moq-cmsf]], [[moq-locmaf]], [[tobbe-einarsson]]
- [[overview|Implementations Overview]]
