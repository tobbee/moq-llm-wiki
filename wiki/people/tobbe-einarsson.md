---
title: "Torbjörn Einarsson"
tags: [person, eyevinn, author, maintainer]
date: 2026-06-07
last_updated: 2026-06-07
status: current
---

**Organization**: Eyevinn Technology
**Slack**: @Tobbe
**GitHub**: [@tobbee](https://github.com/tobbee)
**Role**: Maintainer of this wiki; co-author of [[moq-locmaf|LOCMAF]] (`draft-einarsson-moq-locmaf`) with Hugo Björs; author of Eyevinn's MoQ implementations

# Contributions

- Co-author of **[[moq-locmaf|LOCMAF]]** — *Low Overhead CMAF for Media over QUIC* (`draft-einarsson-moq-locmaf-00`, submitted 2 June 2026), with Hugo Björs (KTH). First IETF MoQ artifact from the wiki maintainer.
- Author of **[[moqlivemock]]** — Go test app simulating a live MoQ video+audio publisher with a bundled subscriber; also the `mlmtest` interop client.
- Author of **[[warp-player|Eyevinn/warp-player]]** — TypeScript MSE/EME player for CMSF media over MoQ.
- Author of **Eyevinn/moqtransport** — Go MoQ Transport implementation.
- Built the **CUE-schema-based MSF/CMSF catalog validator** ([Eyevinn/msf-catalog-validator](https://github.com/Eyevinn/msf-catalog-validator)) — first machine-validation feedback loop into the MSF/CMSF specs, surfacing draft-01 bugs filed as [[moq-msf|MSF]] PR #177 and [[moq-cmsf|CMSF]] PR #23.
- Active in `#moq` design discussions, notably on MSE/EME-compatible MoQ playback and `initData` carriage.

# Focus Areas

- Low-overhead carriage of CMAF media over MoQ ([[moq-locmaf|LOCMAF]] vs [[moq-loc|LOC]] vs [[moq-cmsf|CMSF]])
- MSE/EME-compatible playback pipelines and DRM (cenc/cbcs) over MoQ
- Interop testing
