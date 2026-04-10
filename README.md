# MOQ LLM Wiki

An LLM-maintained wiki tracking the [Media over QUIC (MOQ)](https://datatracker.ietf.org/group/moq/about/)
protocol ecosystem, following the [Karpathy LLM wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

The wiki is a persistent, compounding knowledge artifact where an LLM maintains
structured knowledge about MOQ protocol development, synthesizing information from
IETF drafts, GitHub activity, and Slack discussions.

## Structure

```
sources/          # Raw immutable sources (IETF draft texts)
wiki/             # LLM-maintained markdown pages
  drafts/         # Summary pages for each IETF draft
  concepts/       # Protocol concept explainers
  people/         # Key contributors
  implementations/# Implementation tracking
  discussions/    # Discussion digests from Slack & GitHub
  interop/        # Interop testing status and endpoints
  index.md        # Content catalog
  log.md          # Chronological update log
CLAUDE.md         # Schema: conventions and workflows for LLM maintenance
```

## Obsidian

The `wiki/` folder is structured as an [Obsidian](https://obsidian.md/) vault
with `[[wikilinks]]` cross-references and YAML frontmatter. Open the repo root
in Obsidian to browse the wiki with full link navigation.

## Coverage

- **IETF Drafts**: moq-transport, MSF, LOC, CMSF, Secure Objects, Privacy Pass
- **Implementations**: moq-rs, moxygen, moq-js, libquicr, aiomoqt, xquic-moq, Eyevinn stack
- **Interop**: Public relay endpoints, interop runner results
- **Discussions**: Monthly digests from the #moq Slack channel (quicdev workspace)

## Data Sources

- [IETF MOQ WG documents](https://datatracker.ietf.org/group/moq/documents/)
- [moq-wg GitHub org](https://github.com/moq-wg/)
- [#moq Slack channel](https://quicdev.slack.com/archives/C046V0QF3CK) (quicdev workspace)
- [MOQ Interop Runner](https://englishm.github.io/moq-interop-runner/)
- [AI-generated meeting minutes](https://ietfminutes.org/minutes/wg/moq.html)
