---
title: "DEFLATE Compressed Tracks for MoQ (moq-flate)"
tags: [draft, individual, compression, media]
date: 2026-09-27
last_updated: 2026-09-27
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-lcurley-moq-flate/"
---

**draft-lcurley-moq-flate-00** | Individual submission | submitted **2026-09-24** | Author: [[luke-curley|L. Curley]] | [Datatracker](https://datatracker.ietf.org/doc/draft-lcurley-moq-flate/)

**First look.** This page records the draft's own abstract and scope as published; the text has not been reviewed in depth here yet.

# Abstract (as published)

> This document specifies how a MoQ Transport track carries DEFLATE-compressed payloads. Each subgroup is one raw DEFLATE stream, sync flushed at each object boundary, so every object stays self-delimited while later objects compress against the earlier ones in the subgroup.

# What it defines

**One raw DEFLATE stream per subgroup**, sync-flushed at every object boundary. That single choice buys both properties that matter:

- **Objects stay self-delimited** — the sync flush at each boundary means an object can still be located and framed independently.
- **Later objects compress against earlier ones** in the same subgroup, so the compression window is not thrown away per object.
- **A dropped group cannot corrupt the rest**, because the compression history never crosses the subgroup boundary.

This is the third pass at compression in the moq-dev orbit: [[moq-dev]] previously shipped **per-frame compression and then removed it** ([PR #1962](https://github.com/moq-dev/moq/pull/1962), July 2026, +149/−614), and the *"where does compression belong — transport, streaming format, or full-track-name layer?"* question is a standing open item on [[moq-transport]]. Scoping it to the subgroup is the answer this draft proposes.

# Context

Submitted in [[luke-curley|Luke Curley]]'s **eight-document batch of 2026-09-24**, at the IETF-127 (Seattle) submission cutoff — four brand-new drafts ([[moq-e2ee]], [[moq-solicit]], [[moq-flate]], [[moq-mpegts]]) plus revisions of [[moq-hang|hang-03]], [[moq-lite|lite-06]], [[moq-msfts|msfts-01]] and [[moq-cluster|cluster-01]]. Individual submission, **not WG-adopted**. See [[moq-dev]], [[discussions-2026-09]].

# Related
- [[subgroups-and-objects]] — the subgroup boundary this design rests on
- [[moq-transport]] — the compression-layering open question
- [[moq-dev]] — where the earlier per-frame compression experiment was tried and reverted
