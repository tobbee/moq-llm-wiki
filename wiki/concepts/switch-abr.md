---
title: "SWITCH and Client-Side ABR"
tags: [concept, transport, abr, media]
date: 2026-04-10
status: current
---

# SWITCH and Client-Side ABR

One of the most debated topics in MOQ - whether the transport layer needs a dedicated SWITCH message for adaptive bitrate track switching.

## Background

In traditional ABR streaming (HLS/DASH), the client decides which quality to fetch next. In MOQ's [[publish-subscribe]] model, switching quality means changing which track you subscribe to. The question is whether SUBSCRIBE/UNSUBSCRIBE is sufficient or a dedicated SWITCH message is needed.

## PR #1378 - SWITCH for Client-Side ABR

**Author**: Gwendal Simon (Nov 2025)
**Labels**: Needs Discussion, ABR, Design

Proposes a SWITCH message at the transport level to enable seamless client-side ABR. The PR adds a new control message that atomically transitions a subscription from one track to another.

## Issue #1354 - Why do we need a dedicated SWITCH message?

**Author**: Ali C. Begen
**Comments**: 39 (most discussed open issue)

The issue consolidates the history of ABR discussions in MOQ:
- **#259** - Sender-side ABR: publisher decides what to send based on congestion
- **#370** - Probing track approach for bandwidth estimation
- **#471** - Client-side upswitch causing excessive bandwidth

The core tension: should the publisher or subscriber make quality decisions?

## Related Open Issues

- **#1507** - Mechanism to get sender's bitrate (Luke Curley). Equivalent to CMSD for MOQ. Essential for client-side ABR to make informed decisions.
- **#1453** - Send Rate parameter (Will Law). Publisher-reported send rate.
- **#1365** - If you can't deliver an entire Group, should you send any Objects? Affects ABR drop behavior.
- **#1352** - SUBSCRIBE doesn't need a forward parameter if we have filters (Parked)

## Current Status (April 2026)

Unresolved. The PR is labeled "Needs Discussion" and hasn't been merged or closed. The community is split between:

1. **Transport-level SWITCH** - Atomic transition, relay-aware, can optimize delivery
2. **Application-level switching** - Just UNSUBSCRIBE old track + SUBSCRIBE new track, keep transport simple
3. **Sender-side ABR** - Publisher decides quality, subscriber specifies constraints

The April 13 interim meeting may address this.

## Related

- [[adaptive-bitrate]] - ABR overview in MOQ
- [[moq-transport]] - Protocol spec
- [[publish-subscribe]] - Subscription model
- [[moq-msf]] - Streaming format with ABR support
