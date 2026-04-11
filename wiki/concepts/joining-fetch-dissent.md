---
title: "Joining Fetch Dissent"
tags: [concept, transport, design-debate]
date: 2026-04-10
status: current
---

# Joining Fetch Dissent

A cluster of open issues and competing proposals around how subscribers join a live stream mid-session. Tagged "Joining Fetch Dissent" on GitHub.

## The Problem

When joining a live stream, a subscriber needs historical data (e.g., the latest keyframe) to start rendering. The current [[joining-fetch]] mechanism has been contentious, generating multiple alternative proposals.

## Open Issues (tagged "Joining Fetch Dissent")

- **#1313** - Joining FETCH as separate control message creates edge cases and feature gaps (ianswett, Past Deadline)
- **#1391** - Unclear how to use Joining FETCH with New Group Request (ianswett)
- **#1386** - Can a publisher 'lie' about what Largest Object is? (ianswett)
- **#1358** - Subscribing to start of current Group could be optimized (ianswett)
- **#1039** - Simplifying joining at the latest available join point (wilaw)
- **#1023** - Subgroups + DELIVERY_TIMEOUT = pathological FETCH (afrind, Past Deadline)

## Competing Proposals

1. **Current Joining Fetch** (in draft-17) - Separate FETCH alongside live SUBSCRIBE
2. **PR #1362** - Prior Group Subscription Filter (ianswett) - Filter-based approach
3. **Subscribe Rewind** ([[martin-duke]]) - Extend SUBSCRIBE with rewind window
4. **Join Subscription Filters** ([[alan-frindell]]) - Filter-based join point selection. Alan says his is "more of an extension to Martin's."

## Latest Developments

- **PR #1604** (Apr 10) - [[martin-duke]] implements the #1602 proposal to move Joining FETCH onto the SUBSCRIBE/PUBLISH stream. [[alan-frindell]] reviewed, noting subscriber priority cannot differ between fetch and subscription.
- **#1602** (Apr 9) - [[martin-duke]] proposes moving Joining Fetch to SUBSCRIBE/PUBLISH stream, eliminating race conditions
- **#1601** (Closed) - Race condition in current design
- Restriction requiring "largest object" subscribes was removed
- **Interim moq-13** (Apr 13) has REWIND slides on the agenda

## Related

- [[joining-fetch]] - Current mechanism
- [[moq-transport]] - Protocol spec
- [[martin-duke]] - Rewind proposal author
- [[alan-frindell]] - Join Filters proposal author
