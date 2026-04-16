---
title: Wiki Log
tags: [log, maintenance]
date: 2026-04-14
last_updated: 2026-04-16
status: current
---

Chronological record of all ingestions, queries, and maintenance operations.

# 2026-04-16 - Wiki update: NAB Show MoQ showcase, SWITCH redesign, implementation activity

**Operation**: Update
**Sources**:
- Slack #moq: No new messages (channel quiet since Feb 5). #moq-rs and #moq-js: only new member joins (Endel).
- GitHub: moq-transport — PR #1378 (SWITCH) major redesign Apr 15-16; PR #1604 new review comments; PR #1562 4th approval
- GitHub: moq-dev/moq — 4 PRs merged + 4 opened Apr 15-16 (browser compat, moq-lite negotiation, TLS config)
- GitHub: moqtail — 5 draft-16 PRs merged Apr 14-15 (unified message registry, SubgroupHeader, REQUEST_OK)
- GitHub: cloudflare/moq-rs — PR #163 qlog alignment work; v0.7.17 released
- GitHub: google/quiche — Joining FETCH fix (largest_object at SUBSCRIBE time) by Martin Duke
- GitHub: msf, loc, secure-objects, cmsf, catalog-format — no activity since Apr 15
- Mailing list: No new threads since April 13
- IETF Datatracker: No new draft versions
- Interop runner: Unchanged at 23/68/14 (105 tests, Apr 16)
- MoQ Monthly: Only #0 published (March 4). No #1 yet.
- tobbee/moq-llm-wiki: No new issues (all 3 existing issues closed)
- Web search: NAB Show 2026 MoQ demos from Wowza, Oracle, Bitmovin, Broadpeak, Synamedia

**Pages updated**: discussions-2026-04.md, moq-transport.md, switch-abr.md, moq-dev.md, moq-rs.md, moqtail.md, quiche-moq.md, interop-runner.md, index.md

**Key findings**:

### NAB Show 2026 (April 18-22)
Largest public display of MoQ technology to date with multiple live demonstrations:
- **Wowza + Cloudflare**: CMAF-to-MoQ relay demo (Java/Kwik stack → moq-rs relay) at Cloudflare booth W2300
- **Oracle Video @ Edge (OVE)**: MoQT relay network with partner demos — Ateme (ingest), Broadpeak (packaging), Bitmovin Player Web X (playback)
- **Bitmovin Player Web X**: Commercial MoQ player using WebTransport + WebCodecs, sub-second latency against Cloudflare's 330+ city relay network
- **Broadpeak**: "Half MoQ relay" for HAS/MoQ coexistence at booth W3034
- **Synamedia**: Quortex PowerVu & MEG with MoQ track-based affiliate distribution

### Spec activity
- **SWITCH PR #1378 redesigned**: Gwendal Simon replaced FETCH+SUBSCRIBE delivery with relay-initiated PUBLISH + inline catch-up (7 commits Apr 15-16)
- **Session-Level Tracks PR #1562**: 4th approval (Suhas Nandakumar), close to merge
- **Joining FETCH PR #1604**: Detailed feedback from Gwendal Simon on priority/parameter edge cases

### Implementation activity
- **moq-dev/moq**: Safari/Firefox compatibility fixes (avc3→avc1, AudioDecoder, WebTransport BiDi workaround), moq-lite ALPN fallback, releases moq-cli v0.7.18 + moq-relay v0.10.21
- **moqtail**: Major draft-16 push — unified message registry (+937/−1398), SubgroupHeader, REQUEST_OK/UPDATE refactoring, datagram compat. v0.9.1 pending.
- **cloudflare/moq-rs**: qlog alignment with draft-pardue-moq-qlog-moq-events-03 (+346/−242); v0.7.17 released
- **quiche-moq**: Joining FETCH limited to largest_object at SUBSCRIBE time (prepares for REWIND)
- **video-dev/moq-js**: No activity since mid-March

### Status watch
- **draft-cenzano-moq-media-interop-03** expires in 7 days (April 23) — still no renewal
- **Interop runner** stable at 23/68/14 with 11 implementations

---

# 2026-04-15 - Add people pages, fix editor/author roles

**Operation**: Expansion + Correction

**Pages created**: ian-swett.md, victor-vasiliev.md, mike-english.md
**Pages updated**: alan-frindell.md, suhas-nandakumar.md, moq-transport.md, index.md, discussions-2026-04.md, discussions-2026-03.md, discussions-2026-02.md, discussions-2026-01.md, open-issues-analysis.md, joining-fetch.md, joining-fetch-dissent.md, quiche-moq.md, moq-rs.md, moq-js.md, interop-runner.md

**Key changes**:
- **Three new people pages**: Ian Swett (Google, co-editor of moq-transport), Victor Vasiliev (Google, author of moq-transport, quiche-moq co-developer), Mike English (Cloudflare, maintainer of moq-rs/moq-js, interop runner operator, MoQ Monthly publisher).
- **Role corrections**: Alan Frindell and Ian Swett are the **editors** of draft-ietf-moq-transport. Suhas Nandakumar and Victor Vasiliev are **authors**. Previously the wiki listed Suhas as co-editor. Alan's page updated to "Co-editor", Suhas's page corrected from "Editor" to "Author".
- **moq-transport.md authors section** now lists all four authors with wikilinks.
- **Wikilinks added** across 11 wiki pages: all plain-text mentions of Ian Swett, Victor Vasiliev, and Mike English converted to `[[wikilink]]` format.
- People section in index.md expanded from 6 to 9 entries.

---

# 2026-04-15 - CMSF ContentProtection merged, Shaka Player DRM support

**Operation**: Update
**Sources**:
- GitHub: moq-wg/cmsf PR #18 (merged Apr 14 by Will Law)
- GitHub: shaka-project/shaka-player PR #9972 (merged Apr 14 by Álvaro Velad Galván)
- User (maintainer) confirmed both merges

**Pages updated**: moq-cmsf.md, shaka-player.md, moqlivemock.md, discussions-2026-04.md

**Key changes**:
- **CMSF ContentProtection signaling** (PR #18): DRM signaling proposal by Torbjörn Einarsson (Eyevinn) merged into the CMSF spec. Defines `contentProtections` with `refID`s and per-track `contentProtectionRefIDs`. Supports Widevine, PlayReady, FairPlay, and ECCP (ClearKey). Based on DASH/DASH-IF attributes. Key rotation not yet covered.
- **moqlivemock/warp-player DRM**: DRM support implemented by Hugo Björs (Eyevinn). Supports Widevine, PlayReady, FairPlay, and ClearKey/ECCP.
- **Shaka Player DRM support** (PR #9972): Álvaro Velad Galván (Atème) added CMSF contentProtection support to Shaka Player. This makes Shaka Player the **second implementation** of CMSF ContentProtection, after moqlivemock/warp-player. Two independent implementations is a significant milestone for the feature.

---

# 2026-04-15 - Wiki update: issue #3 corrections, DELIVERY_TIMEOUT PR, interop improvement

**Operation**: Update + Corrections
**Sources**:
- Slack #moq: No new messages (channel quiet since Feb 11)
- GitHub: moq-transport — new PR #1605 (Split DELIVERY_TIMEOUT, Victor Vasiliev, Apr 14)
- GitHub: msf — no new activity since Apr 14; loc — no new activity
- Mailing list: No new threads since Apr 13
- IETF Datatracker: No new draft versions
- Interop runner: Improved to 23 pass / 68 fail / 14 skip (from 21/70/14 on Apr 14)
- tobbee/moq-llm-wiki: Issue #3 filed by Mike English (englishm) — detailed fact-check with corrections

**Pages updated**: moq-rs.md, moq-js.md, quiche-moq.md (rewritten), moq-transport.md, interop-runner.md, interop-status.md, interop-endpoints.md, discussions-2026-04.md, publish-subscribe.md (via moq-transport.md), martin-duke.md, index.md

**Key changes**:

### Issue #3 corrections (Mike English):
- **moq-rs history rewritten**: Corrected Mike English's role — he did not help with the Go→Rust translation (that was Luke Curley). Mike joined mid-2023 as a close collaborator, contributing relay deployments, moq-pub, C FFI exploration, and draft-04 support. Added detailed timeline and key contributors (Manish, Jacob, Scott Godin, Zafer Gurel).
- **quiche-moq disambiguation**: The wiki incorrectly described quiche-moq as a Rust implementation (birneee/quiche_moq). The interop runner's "quiche-moq" is actually **Google's QUICHE MoQT** — a C++ implementation inside Google's QUICHE library (part of Chromium), primarily developed by Martin Duke and Victor Vasiliev with ~74+ source files. Rewrote the page entirely. birneee/quiche_moq is a separate Rust project on Cloudflare's quiche crate, not in the interop runner.
- **moq-js Montevideo Tech context**: Added history about video-dev/moq-js development coming from the Montevideo Tech Summer Camp 2025, with Mike as technical sponsor and Qualabs community contributors. The 2026 Summer Camp features both Mike and Luke as co-sponsors.
- **moqpack label**: Changed status from "Active" to "Individual" in index to clarify it's not a WG document.
- **publish-subscribe fix**: Corrected "REQUEST" to "REQUEST_OK/REQUEST_ERROR" in the moq-transport Key Concepts list (there is no bare "REQUEST" message in the spec).
- **Community resources**: Added section to index with MoQ Monthly newsletter (Mike English), Demuxed MoQ Talks playlist, Montevideo Tech Summer Camp, moq.dev Discord, and link to IETF Datatracker for all 24+ individual drafts.
- **Individual drafts listing**: Added note about notable uncovered individual drafts (rewind, qlog, hang, cdn-provisioning, relay-dos).

### New findings:
- **Transport PR #1605** (Apr 14): Victor Vasiliev proposes splitting DELIVERY_TIMEOUT into two separate types of timeout.
- **Interop runner improvement**: 23/68/14 — best result since test count expanded to 105. Two additional tests passing compared to Apr 14.
- **draft-cenzano-moq-media-interop-03** expires in 8 days (Apr 23) — still no renewal.

---

# 2026-04-14 - Wiki update: GraphQL mailing list thread, MSF authz merge, CARP origin, interop recovery

**Operation**: Update
**Sources**:
- Slack #moq: New messages Apr 13-14 (visa question for London interim, Hugo Björs joined)
- GitHub: msf — PR #118 (authorization flows) merged Apr 13, issue #119 closed
- GitHub: moq-transport — no new issues/PRs since Apr 13; loc — no new activity
- Mailing list: New thread "Using MOQT for graphql subscriptions with draft-17 requires extensions" by Alan Frindell (Apr 13)
- IETF Datatracker: No new WG draft versions; noted draft-law-moq-carp-00 (Nov 2025) as CMSF origin
- Interop runner: Recovery to 21 pass / 70 fail / 14 skip (from 20/71/14 on Apr 13)
- tobbee/moq-llm-wiki: No open issues

**Pages updated**: discussions-2026-04.md, interop-runner.md, interop-status.md, moq-msf.md, moq-cmsf.md, will-law.md, alan-frindell.md, index.md

**Key findings**:
- **GraphQL subscriptions on MOQT** (mailing list, Apr 13): Alan Frindell argues draft-17's inflexible message parameters are a mistake. Key issues: 4KB track name limit forces query body into namespace/name; custom parameters require negotiation at every hop; 64KB control message size limit may be too small; no HTTP-like header forwarding for auth. Broader question about MOQT suitability for non-media use cases.
- **MSF PR #118 merged** (Apr 13): Authorization flows documentation added to MSF spec by Suhas Nandakumar.
- **CARP → CMSF lineage**: draft-law-moq-carp-00 ("CARP - a CMAF compliant implementation of WARP", Nov 2025) was adopted by the WG and became draft-ietf-moq-cmsf-00 (Dec 2025). Added history to CMSF page.
- **Interop runner**: Recovered from 20/71 (Apr 13) back to 21/70 (Apr 14). One test flipped back to pass.
- **draft-cenzano-moq-media-interop-03** expires in 9 days (Apr 23) — still no renewal.
- Slack activity minimal: Aman Sharma asked about visa invitation for London interim; Hugo Björs joined #moq.

---

# 2026-04-13 - Wiki update: add moq-lite and NMSF drafts, interop regression, #1405 resolution

**Operation**: Update
**Sources**:
- GitHub: moq-transport issues/PRs checked — #1405 updated Apr 12 (Ian Swett inclined to close)
- GitHub: msf — no new activity since Apr 10; loc — no new activity since Mar 23
- Mailing list: Only weekly GitHub digest on Apr 12, no new substantive threads
- IETF Datatracker: No new WG draft versions; two individual drafts added to wiki
- Interop runner: Slight regression (21→20 pass, 70→71 fail)
- tobbee/moq-llm-wiki: No open issues

**Pages created**: wiki/drafts/moq-lite.md, wiki/drafts/moq-nmsf.md
**Pages updated**: index.md, discussions-2026-04.md, interop-runner.md, interop-status.md, moq-transport.md, luke-curley.md, moq-dev.md

**Key findings**:
- **draft-lcurley-moq-lite-04** (Apr 9): Luke Curley's simplified transport protocol, now at version 04. Removes subgroups, object properties, datagrams, and 30+ message types from moq-transport. Pull-only, stream-based design. Individual submission, not WG-adopted. This is the spec behind moq-dev/moq.
- **draft-herz-moq-nmsf-01** (Apr 7): Erik Herz (Vivoh) proposes extending MSF with Neural Video Codec packaging. Dual-track model (hyperprior + latent) for priority-aware delivery. Supports DCVC-RT, SSF, FVC, and other learned codecs. 18 pages, individual submission.
- **Issue #1405** (Single Object Subgroup ID): Ian Swett commented Apr 12 that he's inclined to close with no action after PR #1593 saw no WG interest. Will put before WG to confirm.
- **Interop runner**: Slight regression from 21 pass / 70 fail to 20 pass / 71 fail (105 tests, 14 skip unchanged). One test flipped from pass to fail.
- **Virtual interim 13** happening today (Apr 13) with REWIND slides on agenda.
- **draft-cenzano-moq-media-interop-03** expires in 10 days (Apr 23) — still monitoring for renewal.
- Slack #moq: No new messages (channel quiet since Feb 11).

---

# 2026-04-12 - Add London interim details

**Operation**: Update
**Sources**: IETF Datatracker (interim-2026-moq-08 through moq-11 session pages)

**Pages updated**: interim-meetings.md, discussions-2026-04.md

**Key changes**:
- Added London interim details: County Hall / The Riverside Building, Belvedere Road, London SE1 7PB
- June 11 (moq-08): 2 sessions (hackathon/interop day)
- June 12 (moq-09, moq-10 at 08:30 UTC, moq-11 at 12:30 UTC): 3 working sessions
- Remote participation via Meetecho (details TBD)
- Explained numbering: moq-08 through moq-11 registered on datatracker before the virtual interims

---

# 2026-04-12 - Rename Eyevinn MOQ Stack to moqlivemock, major update

**Operation**: Update + Rename
**Sources**: User (maintainer) provided updated feature list; GitHub repos checked for versions.

**File renamed**: `wiki/implementations/eyevinn-moq.md` -> `wiki/implementations/moqlivemock.md`
**Pages updated**: moqlivemock.md (full rewrite), index.md (renamed + updated draft versions), interop-status.md (renamed + added draft-16), shaka-player.md (updated wikilinks), discussions-2026-01.md (updated wikilink)

**Key changes**:
- Renamed from "Eyevinn MOQ Stack" to "moqlivemock" (the central component)
- Draft support upgraded from draft-14 only to **draft-14 and draft-16** with ALPN negotiation
- Catalog now supports both **FETCH and SUBSCRIBE**
- Content protection documented with three namespace modes: clear (`cmsf/clear`), commercial DRM (`cmsf/drm-{scheme}`), and ClearKey/ECCP (`cmsf/eccp-{scheme}`)
- All repos at v0.7.0+ (moqtransport v0.7.0, moqlivemock v0.7.0, warp-player v0.7.1)
- All `[[eyevinn-moq]]` wikilinks updated to `[[moqlivemock]]`

---

# 2026-04-12 - Add draft-cenzano-moq-media-interop-03

**Operation**: Ingest
**Sources**:
- HTML: https://afrind.github.io/draft-cenzano-media-interop/draft-cenzano-moq-media-interop.html
- IETF Datatracker: https://datatracker.ietf.org/doc/draft-cenzano-moq-media-interop/

**Pages created**: wiki/drafts/moq-media-interop.md
**Pages updated**: index.md (added to drafts table), alan-frindell.md (added as co-author), media-packaging.md (added Media Interop section), interop-status.md (added media wire format interop section)

**Key findings**:
- Individual submission by Jorge Cenzano-Ferret and Alan Frindell (both Meta), currently at version 03
- Defines concrete media wire format over LOC for H.264 video, Opus audio, AAC-LC audio, and UTF-8 text
- Uses MOQT extension headers (0x0A, 0x15, 0x0D, 0x0F, 0x11, 0x13) for media metadata
- Supports mid-stream encoding parameter changes
- **Expires 2026-04-23** — needs monitoring for renewal. If not renewed, the draft lapses.
- Not adopted by the MOQ working group (individual submission)
- Documents the wire format used by moxygen and LOC-based media interop

---

# 2026-04-12 - Fix moq-rs production draft version, add doc.moq.dev

**Operation**: Correction + Enhancement
**Sources**:
- Slack #moq thread (2026-04-11): Mike English noted moq-rs wiki page incorrectly listed draft-07 as Cloudflare's current production deployment — it's actually draft-14
- Slack #moq thread (2026-04-11): Luke Curley pointed to [doc.moq.dev](https://doc.moq.dev/) as documentation for moq-dev/moq

**Pages updated**:
- moq-rs.md — Fixed draft support: production deployment is draft-14, not draft-07
- moq-dev.md — Added doc.moq.dev as documentation link

# 2026-04-12 - Wiki update: interop runner expansion, required-request-id debate, rewind-02

**Operation**: Update
**Sources**:
- Slack #moq: No new messages (channel quiet since Feb 11)
- GitHub: moq-transport issues/PRs checked — #1603 has new comments from Ian Swett (Apr 11)
- GitHub: msf, loc — no new activity since Apr 10
- Mailing list: No new threads since last update
- IETF Datatracker: No new WG draft versions; draft-duke-moq-subscribe-rewind-02 published Apr 2
- Interop runner: Test count expanded from 93 to 105; moqx (OpenMOQ relay) added as 11th implementation
- tobbee/moq-llm-wiki: No open issues

**Pages updated**: interop-status.md, interop-runner.md, discussions-2026-04.md, joining-fetch-dissent.md, martin-duke.md, openmoq.md

**Key findings**:
- Interop runner expanded to 105 tests (was 93) with 21 pass / 70 fail / 14 skip. The growth is from moqx (OpenMOQ's moxygen fork) joining the matrix as an 11th relay. moqx shows strong results: 6/6 with moq-dev-js, 5-6/6 with moq-rs-draft-16.
- Ian Swett commented on #1603 (Apr 11): required-request-id was added for "feature parity" with single control stream model but "it was never clear exactly what functionality this provided." Stream IDs in WebTransport aren't exposed to applications. He also expressed that Joining FETCH's dependency on another Request is a design concern.
- draft-duke-moq-subscribe-rewind-02 published Apr 2 — refines the "Rewind" subscription filter for best-effort past group retrieval. Key topic for interim-13 meeting (Apr 13).
- Virtual interim 13 is tomorrow (Apr 13) with REWIND slides on the agenda.

---

# 2026-04-11 - Split moq-rs/moq-js into separate implementation pages

**Operation**: Restructure
**Sources**:
- Slack #moq: Mike English's clarification (2026-04-11) about the relationship between cloudflare/moq-rs, moq-dev/moq, and video-dev/moq-js
- GitHub API: Repo metadata for all four projects

**Context**: Mike English explained that cloudflare/moq-rs (was englishm/moq-rs) and moq-dev/moq (was kixelated/moq-rs) are "sibling" implementations that both started from Luke Curley's original codebase but are now independent. Similarly, video-dev/moq-js and the JS in moq-dev/moq are separate codebases. The forks were born when Luke was not going to support the IETF WG specs directly. Luke's Hang player is a total rewrite, not derived from the old moq-js.

**Pages created**: wiki/implementations/moq-dev.md (moq-dev/moq — Luke Curley's Rust+TS monorepo with moq-lite + Hang)
**Pages updated**:
- moq-rs.md — Clarified as Cloudflare's IETF-aligned fork; added history section; updated maintainer to Mike English
- moq-js.md — Clarified as video-dev's IETF-aligned JS; added history section
- index.md — Added moq-dev/moq to implementations list and draft support table
- luke-curley.md — Updated references from [[moq-rs]] to [[moq-dev]]
- interop-endpoints.md — Fixed Luke Curley entry to reference [[moq-dev]]
- interop-status.md — Fixed v17 interop to reference [[moq-dev]] instead of [[moq-rs]]
- interop-runner.md — Updated wikilinks for moq-dev-rs and moq-dev-js entries
- imquic.md — Fixed v17 interop reference to [[moq-dev]]

**Timeline**:
- 2022-06-29: kixelated/moq-rs created (Luke Curley's original)
- 2023-05-24: kixelated/moq-js created (companion JS library)
- 2024-10-15: englishm/moq-rs and video-dev/moq-js created (IETF-aligned forks)
- 2025-06-20: kixelated/moq-js archived ("Moved to kixelated/moq")
- Now: kixelated/moq-rs → moq-dev/moq (monorepo), englishm/moq-rs → cloudflare/moq-rs

---

# 2026-04-11 - Fix broken interop-runner links (issue #2)

**Operation**: Maintenance
**Changes**:
- Removed duplicate `wiki/implementations/interop-runner.md` (content already covered by `wiki/interop/interop-runner.md`)
- Moved `[[interop-runner]]` listing from Implementations to Interop section in `wiki/index.md`
- All `[[interop-runner]]` wikilinks now resolve unambiguously

# 2026-04-11 - Wiki update: new transport issue/PR, MSF initTrack debate

**Operation**: Update
**Sources**:
- Slack #moq: No new messages since Feb 11 (channel quiet)
- Slack #moq-rs, #moq-js, #libquicr: No substantive new activity
- GitHub: moq-transport, msf, loc — checked for new issues/PRs since Apr 10
- Mailing list: No new threads since last update
- IETF Datatracker: No new draft versions (still at transport-17, msf-00, loc-02, etc.)
- Interop runner: Unchanged — 93 tests, 19 pass / 62 fail / 12 skip (draft-16 target)
- tobbee/moq-llm-wiki: No open issues

**Pages updated**: discussions-2026-04.md, moq-transport.md, joining-fetch-dissent.md, moq-msf.md

**Key findings**:
- New transport issue #1603 by Martin Duke: questions whether required-request-id is needed for all request types (suggests limiting to REQUEST_UPDATE and FETCH only)
- New transport PR #1604 by Martin Duke: implements #1602 proposal to move Joining FETCH onto SUBSCRIBE/PUBLISH stream; Alan Frindell reviewed noting shared parameter state constraints
- Transport PR #1540 (coalescing REQUEST_UPDATE processing, merged Apr 9) was missed in previous update, now captured
- Transport PR #1562 (Session-Level Tracks reserved namespace) updated Apr 10, now listed as open PR
- MSF PR #118 (authorization flows) updated Apr 10, now listed in MSF page
- MSF issue #153 (initTrack synchronization problem) expanded with Victor Vasiliev's analysis favoring removal of initTrack feature

---

# 2026-04-11 - Add draft-frindell-moq-moqpack-00

**Operation**: Ingest
**Sources**:
- IETF Datatracker: https://datatracker.ietf.org/doc/draft-frindell-moq-moqpack/
- Full text: draft-frindell-moq-moqpack-00.txt (1792 lines)

**Pages created**: wiki/drafts/moq-moqpack.md
**Pages updated**: index.md (added to drafts table), alan-frindell.md (added as author)

**Key findings**:
- New individual submission by Alan Frindell (Meta), published 2026-03-02
- Proposes QPACK-based compression for MOQT control messages to reduce overhead from repeated values (auth tokens, track names)
- Uses flag bit 0x40 on message types to signal compressed format
- Designed for compatibility with existing QPACK libraries
- Not yet adopted by the MOQ working group

---

# 2026-04-10 - Wiki update: OpenMOQ repos, MSF PR coverage

**Operation**: Update
**Sources**:
- Slack #moq: Messages through 2026-04-10 (no new activity since last update)
- GitHub: moq-transport, msf, loc — checked for new issues/PRs
- GitHub: tobbee/moq-llm-wiki issue #1 ("Add OpenMOQ")
- Mailing list: No new threads since last update
- IETF Datatracker: No new draft versions
- Interop runner: Unchanged — 93 tests, 19 pass / 62 fail / 12 skip (draft-16 target)

**Pages updated**: openmoq.md (added moqx relay context, playa player, moqxr description), moq-msf.md (added merged PR #124)

**Key findings**:
- Wiki issue #1 requested adding OpenMOQ repos: moqx (server/relay) not yet public — openmoq/moxygen fork serves as buffer repo; red5pro/moq-playa (player) not yet public; mondain/moqxr already listed but description enriched
- MSF had PR #124 (clarify first object in event/media timeline track) merged Apr 9, not previously captured
- No new IETF drafts, mailing list threads, or interop runner changes since last update

---

# 2026-04-10 - Wiki update: mailing list, interop runner, discussion enrichment

**Operation**: Update
**Sources**:
- Slack #moq: Messages through 2026-04-10
- GitHub: moq-transport (issues/PRs), msf (issues/PRs), loc (issues/PRs)
- Mailing list: https://mailarchive.ietf.org/arch/browse/moq/ (threads through Apr 10)
- IETF Datatracker: No new draft versions (still at transport-17, msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00)
- Interop runner: 93 tests, 19-22 pass / 59-62 fail / 12 skip (draft-16 target)

**Pages created**: interop-runner.md
**Pages updated**: discussions-2026-04.md, discussions-2026-03.md, interim-meetings.md, moq-transport.md

**Key findings**:
- Mailing list had active threads not previously captured: consensus call on draft-17 (Mar 24 → Apr 10), 7-byte varint debate (Mar 19 → Apr 7), MoQ charter and QMUX scope, Presence/Notifications proposal
- 7-byte varint debate resolved with PR #1595 (merged Apr 9)
- Virtual interim 12 (Mar 30) minutes posted, interim 13 (Apr 13) agenda posted with REWIND discussion
- PUBLISH_DONE / subgroup FIN handling question raised by Alan Frindell (Mar 31)
- New varint encoding example bug found and acknowledged (Mar 3)
- Luke Curley published security camera blog post (Mar 10)
- No new draft versions published since last update

---

# 2026-04-10 - GitHub issues/PRs analysis, SWITCH status, interim schedule

**Operation**: Analysis + Ingest
**Sources**:
- GitHub: All open issues across moq-transport (48), msf (49), loc (9), secure-objects (8), privacy-pass (2), cmsf (4)
- GitHub: All open PRs across moq-transport (17), msf (3)
- IETF datatracker API: Interim meeting schedule through June 2026
- AI minutes index: ietfminutes.org

**Pages created**: switch-abr.md, joining-fetch-dissent.md, open-issues-analysis.md, interim-meetings.md
**Pages updated**: index.md

**Key findings**:
- 48 open transport issues, 17 open PRs - Joining Fetch and SWITCH are biggest debates
- SWITCH (#1354) has 39 comments, most discussed open issue
- Next interim is April 13 with REWIND slides
- Properties Type collision (#1550) is a cross-draft bug needing coordinated fix
- Request ID validation (#1459) is an implementation blocker labeled BLOCKED

---

# 2026-04-10 - Ingest full Slack history (Jan 12 - Apr 10) and interop matrix

**Operation**: Ingest
**Sources**:
- Slack #moq: Complete history from 2026-01-12 through 2026-04-10
- Interop runner matrix: https://englishm.github.io/moq-interop-runner/

**Pages created**: discussions-2026-01.md, discussions-2026-02.md
**Pages updated**: index.md, interop-status.md (added matrix details), interop-endpoints.md (added quiche-moq, moqtail, akamai, imquic), eyevinn-moq.md (media support details)

**Key findings**:
- 10 implementations in the interop runner matrix
- Draft-16 published Jan 14, draft-17 published Mar 3
- Boulder interim hackathon (Feb 9-12) drove major interop progress
- Eyevinn moqlivemock announced with HEVC, Opus, AC-3, subtitles (Jan 27)
- Shaka Player v5.0.5 updated to draft-14 support

---

# 2026-04-10 - Add draft-14 and Eyevinn implementations

**Operation**: Ingest
**Sources**:
- Downloaded draft-ietf-moq-transport-14.txt (Sept 2025)
- Eyevinn GitHub repos: moqtransport, moqlivemock, warp-player

**Pages created**: wiki/implementations/eyevinn-moq.md
**Pages updated**: index.md, interop-status.md

---

# 2026-04-10 - Initial Wiki Creation

**Operation**: Full initial setup
**Sources ingested**:
- IETF drafts: moq-transport-17, moq-msf-00, moq-loc-02, moq-secure-objects-00, moq-privacy-pass-auth-02, moq-cmsf-00
- GitHub activity: moq-wg/moq-transport (issues up to #1602, PRs up to #1599), moq-wg/msf, moq-wg/loc
- Slack #moq channel: messages from 2026-03-12 through 2026-04-10
- IETF Datatracker: MOQ WG document listing

**Pages created**: 30+ pages covering drafts, concepts, people, implementations, discussions, and interop
**Cross-references**: Established between all pages using Obsidian wikilinks
