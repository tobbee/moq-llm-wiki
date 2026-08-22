---
title: "warp-player (Eyevinn)"
tags: [implementation, typescript, player, eyevinn, cmsf]
date: 2026-08-22
last_updated: 2026-08-22
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

Last repository activity 2026-08-17; the wider Eyevinn MoQ stack sits post-**v0.13.0** (moqlivemock, 2026-08-06 — the caption wave). Not separately registered in the [[interop-runner]]; Eyevinn's runner presence is the `moqlivemock` / `mlmtest` **client** endpoint.

# Related

- [[moqlivemock]], [[moqtransport]], [[moq-cmsf]], [[moq-locmaf]], [[tobbe-einarsson]]
- [[overview|Implementations Overview]]
