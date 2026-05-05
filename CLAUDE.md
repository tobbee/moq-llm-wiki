# MOQ LLM Wiki - Schema

This is an LLM-maintained wiki tracking the **Media over QUIC (MOQ)** protocol ecosystem.
It follows the [Karpathy LLM wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f):
a persistent, compounding knowledge artifact maintained by an LLM.

## Three-Layer Architecture

### Layer 1: Raw Sources (`sources/`)
Immutable source documents. Never modified by the LLM.
- `sources/ietf-drafts/` - Downloaded IETF draft text files
- New sources are added here during ingestion

### Layer 2: Wiki (`wiki/`)
LLM-generated and maintained markdown pages with Obsidian-compatible formatting.
- `wiki/index.md` - Content-oriented catalog of all pages
- `wiki/log.md` - Chronological log of all ingestions and updates
- `wiki/drafts/` - Summary pages for each IETF draft
- `wiki/concepts/` - Protocol concept explainers
- `wiki/people/` - Key contributors and their roles
- `wiki/implementations/` - Implementation tracking
- `wiki/discussions/` - Active discussion summaries (Slack, GitHub, mailing list)
- `wiki/interop/` - Interop testing status and results

### Layer 3: This file (Schema)
Defines conventions, workflows, and structure.

## Conventions

### Obsidian Compatibility
- Use `[[wikilinks]]` for cross-references between wiki pages
- Use YAML frontmatter with `tags`, `date`, `status` fields
- Use `#tags` in body text sparingly
- Keep folder structure shallow (max 2 levels under `wiki/`)
- File names: lowercase, hyphens for spaces (e.g., `moq-transport.md`)

### Page Frontmatter Template
```yaml
---
title: Page Title
tags: [moq, transport, draft]
date: 2026-04-10
last_updated: 2026-04-14
status: current | outdated | archived
---
```

### Cross-References
- Link to drafts: `[[moq-transport]]`
- Link to people: `[[alan-frindell]]`
- Link to concepts: `[[publish-subscribe]]`
- Link to implementations: `[[moq-rs]]`

### Log Entry Format (`wiki/log.md`)
Each day entry MUST start with a short heading and a TL;DR block. Long, comma-separated headings that pack PR numbers / contributor names / interop scores into the heading line are an anti-pattern — those details belong in the TL;DR, not the heading.

```
# YYYY-MM-DD — short label

**TL;DR**:
- 1–2 narrative bullets on the most material spec/WG/community events of the day
- **Implementations**: short summary of which open-source repos saw activity and roughly how much (PR# + LOC delta when notable; "all quiet" if none).
- **Interop**: runner score as `pass/fail/skip`, plus brief delta vs prior day or baseline (e.g. "+1 vs Apr 26", "flat third day", "no new run").

**Operation**: Update | Ingest | User query
**Sources**: ...
**Pages updated**: ...
**Key findings**: ...
```

Rules:
- Heading: `# YYYY-MM-DD — <label>`. Use an em dash (`—`) between date and label. Keep the label under ~60 characters and free of PR numbers, contributor names, and interop scores — those go in the TL;DR.
- For multiple entries on the same date, suffix the date with a short parenthetical descriptor: `(supplemental)`, `(deep-dive)`, `(evening)`. Avoid `b` / `c` letter suffixes.
- TL;DR has **2–4 bullets total**. The last two MUST be the bold-prefixed `**Implementations**:` and `**Interop**:` bullets — these are the at-a-glance status snapshot. Skip neither: write "all quiet" / "no new run" rather than omitting.
- Implementations bullet covers the tracked impl repos: `cloudflare/moq-rs`, `video-dev/moq-js`, `moq-dev/moq`, `google/quiche` (moqt), `moqtail/moqtail`, `birneee/quiche_moq`, plus Eyevinn repos and any `moq-wg/*` impls. Use repo short names; cite PR numbers and `+X/−Y` LOC for material merges.
- Each bullet ≤120 characters where possible; PR numbers and concrete numbers (interop scores, LOC) are welcome.
- Keep the existing **Operation** / **Sources** / **Pages updated** / **Key findings** sections below the TL;DR — those are the detail layer.
- Newest entry goes at the top of `log.md` (chronological-reverse, as the file already is).

## Workflows

### Ingest New IETF Draft
1. Download the text file to `sources/ietf-drafts/`
2. Create or update the summary page in `wiki/drafts/`
3. Update entity/concept pages with new information
4. Update `wiki/index.md`
5. Append to `wiki/log.md`

### Ingest Slack Discussion
1. Read recent messages from `#moq` channel in quicdev Slack (channel ID: C046V0QF3CK)
2. Also check `#moq-rs` (C09CG9V7A2Y), `#moq-js` (C09BZ7KH0BZ), `#libquicr` (C08ER7J16BF)
3. Summarize key discussions in `wiki/discussions/`
4. Update relevant entity/concept/interop pages
5. Append to `wiki/log.md`

### Ingest Mailing List
1. Fetch recent threads from https://mailarchive.ietf.org/arch/browse/moq/
2. Look for consensus calls, new proposals, meeting agendas, and weekly GitHub digests
3. Summarize key threads in `wiki/discussions/`
4. Update relevant pages
5. Append to `wiki/log.md`

### Ingest GitHub Activity
1. Check repos under `moq-wg/` org: moq-transport, msf, loc, secure-objects, privacy-pass, cmsf, catalog-format
2. Check key implementation repos: cloudflare/moq-rs, video-dev/moq-js, moq-dev/moq, google/quiche (quiche/quic/moqt), moqtail/moqtail, birneee/quiche_moq, Eyevinn/moqlivemock, Eyevinn/warp-player, Eyevinn/moqtransport
3. Review open issues and recent PRs
4. Update draft summary pages with active issues
5. Append to `wiki/log.md`

### Lint / Maintenance
1. Check for stale pages (status: outdated)
2. Verify cross-references still valid
3. Look for contradictions between pages
4. Identify gaps in coverage

## Key Data Sources

### IETF & Specifications
- **IETF Datatracker (WG + individual drafts)**: https://datatracker.ietf.org/group/moq/documents/
- **Mailing List**: https://mailarchive.ietf.org/arch/browse/moq/ (moq@ietf.org)
- **AI Minutes**: https://ietfminutes.org/minutes/wg/moq.html

### GitHub
- **WG org**: https://github.com/moq-wg/ (moq-transport, msf, loc, secure-objects, privacy-pass, cmsf, catalog-format)
- **cloudflare/moq-rs**: https://github.com/cloudflare/moq-rs — Rust relay (IETF-aligned fork)
- **video-dev/moq-js**: https://github.com/video-dev/moq-js — JS client (community project)
- **moq-dev/moq**: https://github.com/moq-dev/moq — Luke Curley's moq-lite / Transfork
- **google/quiche MoQT**: https://github.com/google/quiche/tree/main/quiche/quic/moqt — C++ impl (Martin Duke, Victor Vasiliev)
- **moqtail/moqtail**: https://github.com/moqtail/moqtail — MoQT implementation by Zafer Gurel
- **birneee/quiche_moq**: https://github.com/birneee/quiche_moq — Rust impl on Cloudflare quiche crate (Leon Birne)
- **Eyevinn/moqlivemock**: https://github.com/Eyevinn/moqlivemock — Go test app simulating a live MoQ video+audio publisher with bundled subscriber (Tobbe / Eyevinn; mlmtest interop client)
- **Eyevinn/warp-player**: https://github.com/Eyevinn/warp-player — TypeScript player for CMSF media over MoQ using MSE playback (Eyevinn)
- **Eyevinn/moqtransport**: https://github.com/Eyevinn/moqtransport — Go MoQ Transport implementation (Eyevinn)

### Chat & Community
- **Slack**: `#moq` channel in quicdev workspace (C046V0QF3CK)
- **moq.dev Discord**: https://discord.gg/FCYF3p99mr — community chat run by Luke Curley
- **Interop Runner**: https://englishm.github.io/moq-interop-runner/
- **Interop Guide**: https://doc.moq.dev/concept/standard/interop.html

### Community Resources
- **MoQ Monthly newsletter**: https://buttondown.com/moqmonthly — periodic ecosystem summary by Mike English
- **Demuxed MoQ talks playlist**: https://www.youtube.com/playlist?list=PLiF9acz7G1ppuCCYHjke1p-GSpWNJOdOl
- **Montevideo Tech Summer Camp**: https://montevideotech.dev/ — annual open-source collab including MoQ projects

## Update Workflow

To update the wiki, run Claude Code in this repo and say "update the wiki".
This will trigger a check of all sources:

1. **Slack** - Read latest messages from #moq (and related channels)
2. **GitHub** - Check new issues, PRs, and commits on moq-wg repos
3. **Mailing List** - Fetch recent threads from the IETF archive
4. **IETF Drafts** - Check datatracker for new draft versions
5. **Interop Runner** - Check latest test results

The update should:
- Add new discussion entries for the current month
- Update draft pages if new versions are published (check both WG and notable individual drafts)
- Update implementation pages if version support changed
- Update interop status if new results are available
- Append all changes to `wiki/log.md`

**Note on drafts**: The Datatracker page lists both adopted WG documents and related individual Internet-Drafts. Track WG documents closely. For individual drafts, focus on those actively discussed or referenced in implementations (e.g., subscribe-rewind, qlog-moq-events, moq-lite, cdn-provisioning, relay-dos, nmsf). Always distinguish WG documents from individual drafts in wiki pages.

## Focus Areas
- Media-related aspects (codecs, containers, streaming formats)
- Interop between implementations
- Protocol evolution and design decisions
- Active discussions and open questions
