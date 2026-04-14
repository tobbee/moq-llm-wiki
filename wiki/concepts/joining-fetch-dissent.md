---
title: "Joining Fetch Dissent"
tags: [concept, transport, design-debate]
date: 2026-04-12
last_updated: 2026-04-14
status: current
---

A cluster of open issues and competing proposals around how subscribers join a live stream mid-session. Tagged "Joining Fetch Dissent" on GitHub.

# The Problem

When joining a live stream, a subscriber needs historical data (e.g., the latest keyframe) to start rendering. The current [[joining-fetch]] mechanism has been contentious, generating multiple alternative proposals.

# Open Issues (tagged "Joining Fetch Dissent")

- **#1313** - Joining FETCH as separate control message creates edge cases and feature gaps (ianswett, Past Deadline)
- **#1391** - Unclear how to use Joining FETCH with New Group Request (ianswett)
- **#1386** - Can a publisher 'lie' about what Largest Object is? (ianswett)
- **#1358** - Subscribing to start of current Group could be optimized (ianswett)
- **#1039** - Simplifying joining at the latest available join point (wilaw)
- **#1023** - Subgroups + DELIVERY_TIMEOUT = pathological FETCH (afrind, Past Deadline)

# Competing Proposals

1. **Current Joining Fetch** (in draft-17) - Separate FETCH alongside live SUBSCRIBE
2. **PR #1362** - Prior Group Subscription Filter (ianswett) - Filter-based approach
3. **Subscribe Rewind** ([[martin-duke]]) - Extend SUBSCRIBE with a Rewind subscription filter for best-effort past group retrieval ([draft-02 published Apr 2](https://datatracker.ietf.org/doc/draft-duke-moq-subscribe-rewind/))
4. **Join Subscription Filters** ([[alan-frindell]]) - Filter-based join point selection. Alan says his is "more of an extension to Martin's."

# Latest Developments

- **draft-duke-moq-subscribe-rewind-02** (Apr 2) - Updated Rewind draft published with refined subscription filter semantics
- **PR #1604** (Apr 10) - [[martin-duke]] implements the #1602 proposal to move Joining FETCH onto the SUBSCRIBE/PUBLISH stream. [[alan-frindell]] reviewed, noting subscriber priority cannot differ between fetch and subscription.
- **#1603** (Apr 10-11) - [[martin-duke]] questions required-request-id. Ian Swett supports simplification, calling it unclear what functionality it provides. He also notes Joining FETCH's dependency on another Request as a design concern.
- **#1602** (Apr 9) - [[martin-duke]] proposes moving Joining Fetch to SUBSCRIBE/PUBLISH stream, eliminating race conditions
- **#1601** (Closed) - Race condition in current design
- Restriction requiring "largest object" subscribes was removed
- **Interim moq-13** (Apr 13) has REWIND slides on the agenda

# Related

- [[joining-fetch]] - Current mechanism
- [[moq-transport]] - Protocol spec
- [[martin-duke]] - Rewind proposal author
- [[alan-frindell]] - Join Filters proposal author
