---
title: "MoQ MPEG-TS Catalog Extension (moq-mpegts)"
tags: [draft, individual, media, mpeg-ts, catalog]
date: 2026-09-27
last_updated: 2026-09-27
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-lcurley-moq-mpegts/"
---

**draft-lcurley-moq-mpegts-00** | Individual submission | submitted **2026-09-24** | Author: [[luke-curley|L. Curley]] | [Datatracker](https://datatracker.ietf.org/doc/draft-lcurley-moq-mpegts/)

**First look.** This page records the draft's own abstract and scope as published; the text has not been reviewed in depth here yet.

# Abstract (as published)

> This document defines the mpegts catalog section, which records what demultiplexing an MPEG-2 Transport Stream [mpeg2] into a MoQ broadcast would otherwise lose: each track's PID and PMT descriptors, the program identity, the service information tables, and a carriage record for every elementary stream the publisher did not decode.

# What it defines

An **`mpegts` catalog section** whose whole purpose is loss-prevention across the demux boundary. It records:

- each track's **PID and PMT descriptors**,
- the **program identity**,
- the **service information (SI) tables**, and
- a **carriage record for every elementary stream the publisher did not decode**.

Together these are enough to **reconstruct the original multiplex** rather than only the decoded media — the difference between transporting a TS and merely transporting what you understood of it.

**Note the overlap**: [[moq-msfts|`draft-gregoire-moq-msfts`]] was revised to **-01 on the same day**. The two are not duplicates — msfts defines *packaging* an MPEG-2 TS into MOQT, while this draft defines a *catalog section* preserving demux-lost metadata — but they occupy adjacent ground and are worth tracking together.

# Context

Submitted in [[luke-curley|Luke Curley]]'s **eight-document batch of 2026-09-24**, at the IETF-127 (Seattle) submission cutoff — four brand-new drafts ([[moq-e2ee]], [[moq-solicit]], [[moq-flate]], [[moq-mpegts]]) plus revisions of [[moq-hang|hang-03]], [[moq-lite|lite-06]], [[moq-msfts|msfts-01]] and [[moq-cluster|cluster-01]]. Individual submission, **not WG-adopted**. See [[moq-dev]], [[discussions-2026-09]].

# Related
- [[moq-msfts]] — the other MPEG-TS-over-MoQ draft, revised the same day
- [[moq-cmsf]] / [[moq-msf]] — catalog and streaming-format context
- [[moq-dev]] — moq-mux carries MPEG-TS import/export
