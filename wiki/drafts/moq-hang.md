---
title: "Media over QUIC - Hang"
tags: [draft, conferencing, media, moq-lite, individual]
date: 2026-08-05
last_updated: 2026-08-05
status: current
draft_version: "02"
ietf_url: "https://datatracker.ietf.org/doc/draft-lcurley-moq-hang/"
---

**draft-lcurley-moq-hang-02** | Individual submission | -02 submitted 2026-08-04 | 11 pages | [Datatracker](https://datatracker.ietf.org/doc/draft-lcurley-moq-hang/)

> **2026-08-05**: **`draft-lcurley-moq-hang` bumped to -02 (2026-08-04)** by [[luke-curley|Luke Curley]] — submitted in the same ~02:08 UTC batch as the new [[moq-cluster|`draft-lcurley-moq-cluster-00`]] and [[moq-timestamp|`draft-lcurley-moq-timestamp-01`]]. Hang is the **media/conferencing layer** of the moq-dev stack (the `hang` Rust crate and `js/hang` TypeScript package), long referenced in the wiki but not previously given its own page. This is its **first wiki page**, created as the -02 revision lands. Individual submission, not WG-adopted. See [[moq-dev]], [[moq-lite]].

# Author
- [[luke-curley|Luke Curley]] (kixelated@gmail.com)

# Abstract

**Hang** is a **real-time conferencing protocol built on top of [[moq-lite]]**. A room consists of multiple participants who publish media tracks. All updates are live — such as a change in participants or media tracks.

# What it is

Hang sits **above [[moq-lite]]** the way HLS/DASH sit above HTTP: moq-lite (and the IETF [[moq-transport]] it derives from) moves opaque tracks/groups/frames; Hang defines the **media-specific conventions** on top — the catalog of participants and their tracks, codec/container handling, and the live room model where participant/track membership changes are themselves published as updates. It is the protocol behind moq-dev's `moq.pub` / `moq.watch` browser clients and the `cdn.moq.pro` Hang CDN.

# Implementation

Implemented in [[moq-dev|moq-dev/moq]] as:
- **`hang`** — the Rust crate (media layer / catalog)
- **`js/hang`** — the TypeScript package (a total rewrite, not derived from the old `kixelated/moq-js`)

The monorepo's media gateways (RTMP/SRT/WHIP-WHEP/HLS/DASH), `moq-transcode`, and `moq-mux` all feed Hang broadcasts.

# Relationship to moq-archive / recording

The separately-floated **`moq-archive`** chunked-recording format was **not** submitted as a standalone I-D; moq-dev [PR #2574](https://github.com/moq-dev/moq/pull/2574) proposed **folding archival/recording into Hang as a "Recording" section** instead. So Hang is also the intended home for MoQ's DVR/recording semantics rather than a separate archive draft.

# Notes

Individual submission by Luke Curley, not adopted by the MOQ working group. Prior revisions: draft-01 (referenced in the wiki index as the "Hang media layer"), now **-02** (2026-08-04, 11 pages). One of several Luke Curley individual drafts ([[moq-lite]], [[moq-timestamp]], [[moq-cluster]], [[compressed-mp4]]) that formalize mechanisms first prototyped in the `moq-dev/moq` stack.

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-lcurley-moq-hang/
- **Implementation**: [moq-dev/moq](https://github.com/moq-dev/moq) (`hang` crate + `js/hang`)
- **Docs**: [doc.moq.dev](https://doc.moq.dev/)

# Related
- [[moq-lite]] — the transport Hang is built on
- [[moq-cluster]] / [[moq-timestamp]] — sibling drafts submitted the same day
- [[moq-dev]] — implementation
- [[luke-curley]] — author
