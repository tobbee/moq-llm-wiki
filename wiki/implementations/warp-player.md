---
title: "warp-player (Eyevinn)"
tags: [implementation, typescript, player, eyevinn, cmsf]
date: 2026-08-22
last_updated: 2026-09-30
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

**Latest: v0.16.0 (2026-09-29): subtitles.** [PR #198](https://github.com/Eyevinn/warp-player/pull/198) (+3,362/−78) plays the catalog's text subtitle tracks, CMAF **and** [[moq-locmaf|LOCMAF]], in step with the picture. TTML is laid out by imscJS (as in dash.js) and WebVTT by the player's own renderer. It also handles the experimental **paint-model** formats `stpc` and `wvtc`, chosen by the init segment's sample entry. There is a Subtitles/CC selector (Off, CC1, or one subtitle track), with the CC button now a shortcut to it, and a side-by-side table of per-track bitrate and parse cost. The MSF catalog `version` may now be `"1"` as well as `"draft-01"`, so a catalog that follows the draft's own examples is no longer rejected. Pair it with [[moqlivemock]] v0.16.0, which publishes the paint-model tracks and a `_locmaf` variant of every subtitle track.

**v0.15.0 (2026-09-16) — plays through a relay.** [PR #193](https://github.com/Eyevinn/warp-player/pull/193) *"discover namespaces with SUBSCRIBE_NAMESPACE and encode them as tuples"* (+486/−43) fixed the two reasons the player could not work behind a relay: it only ever *listened* for PUBLISH_NAMESPACE (which a publisher volunteers but a relay does not — draft-18 §6.1 makes **SUBSCRIBE_NAMESPACE** the in-band discovery mechanism), and it encoded namespaces as a *single* slash-joined field instead of a real tuple. The player now **sends SUBSCRIBE_NAMESPACE on connect** (keeping the passive listener as a fallback, and reporting on screen when nothing arrives within 5 s), adds a **"Namespace prefixes"** filter field (comma-separated, blank = all; one request per prefix, since §10.18 rejects overlapping prefixes with `PREFIX_OVERLAP`), splits namespaces at the wire boundary via `namespaceFields()`, and fixed a Request-ID collision (`TracksManager` had counted IDs separately from `Client`). Meant to be paired with **[[moqlivemock]] v0.15.0**, whose namespaces carry an `mlm` publisher prefix. Verified in Chromium against `mlmpub → mlmrel → player`. See [[moqlivemock]] for the combined-stack narrative.

# Related

- [[moqlivemock]], [[moqtransport]], [[moq-cmsf]], [[moq-locmaf]], [[tobbe-einarsson]]
- [[overview|Implementations Overview]]
