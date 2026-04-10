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
status: current | outdated | archived
---
```

### Cross-References
- Link to drafts: `[[moq-transport]]`
- Link to people: `[[alan-frindell]]`
- Link to concepts: `[[publish-subscribe]]`
- Link to implementations: `[[moq-rs]]`

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

### Ingest GitHub Activity
1. Check repos under `moq-wg/` org: moq-transport, msf, loc, secure-objects, privacy-pass, cmsf, catalog-format
2. Review open issues and recent PRs
3. Update draft summary pages with active issues
4. Append to `wiki/log.md`

### Lint / Maintenance
1. Check for stale pages (status: outdated)
2. Verify cross-references still valid
3. Look for contradictions between pages
4. Identify gaps in coverage

## Key Data Sources

- **IETF Datatracker**: https://datatracker.ietf.org/group/moq/documents/
- **GitHub org**: https://github.com/moq-wg/
- **Slack**: `#moq` channel in quicdev workspace
- **AI Minutes**: https://ietfminutes.org/minutes/wg/moq.html
- **Interop Runner**: https://englishm.github.io/moq-interop-runner/
- **Interop Guide**: https://doc.moq.dev/concept/standard/interop.html

## Focus Areas
- Media-related aspects (codecs, containers, streaming formats)
- Interop between implementations
- Protocol evolution and design decisions
- Active discussions and open questions
