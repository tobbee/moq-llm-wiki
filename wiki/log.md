---
title: Wiki Log
tags: [log, maintenance]
date: 2026-04-10
status: current
---

# Wiki Log

Chronological record of all ingestions, queries, and maintenance operations.

## 2026-04-10 - GitHub issues/PRs analysis, SWITCH status, interim schedule

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

## 2026-04-10 - Ingest full Slack history (Jan 12 - Apr 10) and interop matrix

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

## 2026-04-10 - Add draft-14 and Eyevinn implementations

**Operation**: Ingest
**Sources**:
- Downloaded draft-ietf-moq-transport-14.txt (Sept 2025)
- Eyevinn GitHub repos: moqtransport, moqlivemock, warp-player

**Pages created**: wiki/implementations/eyevinn-moq.md
**Pages updated**: index.md, interop-status.md

---

## 2026-04-10 - Initial Wiki Creation

**Operation**: Full initial setup
**Sources ingested**:
- IETF drafts: moq-transport-17, moq-msf-00, moq-loc-02, moq-secure-objects-00, moq-privacy-pass-auth-02, moq-cmsf-00
- GitHub activity: moq-wg/moq-transport (issues up to #1602, PRs up to #1599), moq-wg/msf, moq-wg/loc
- Slack #moq channel: messages from 2026-03-12 through 2026-04-10
- IETF Datatracker: MOQ WG document listing

**Pages created**: 30+ pages covering drafts, concepts, people, implementations, discussions, and interop
**Cross-references**: Established between all pages using Obsidian wikilinks
