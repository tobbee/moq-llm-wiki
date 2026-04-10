---
title: "Joining Fetch"
tags: [concept, transport, live-streaming]
date: 2026-04-10
status: current
---

# Joining Fetch

Mechanism in [[moq-transport]] for subscribers to fetch historical data when joining a live session.

## Problem

When a subscriber joins a live stream, they need to "catch up" - for example, fetching the latest keyframe and subsequent data to start rendering immediately.

## Current Mechanism (draft-17)

A Joining Fetch can be initiated for any subscription at any time. It fetches data up to the "Joining Location" - the point where live subscription data begins. This was clarified in PR #1577.

Previously, there was a requirement that Joining Fetch only work with "largest object" subscribes, but this restriction was removed ([[alan-frindell]], 2026-04-09 Slack).

## Active Design Discussion

There is significant debate around the best approach for fetching historical data at join time:

### Competing Proposals (as of 2026-04-08)

1. **Joining Fetch** (current in draft-17) - Fetch historical data alongside a live subscription
2. **Subscribe Rewind** ([[martin-duke]]) - [draft-duke-moq-subscribe-rewind](https://martinduke.github.io/draft-duke-moq-subscribe-rewind/draft-duke-moq-subscribe-rewind.html) - Extend SUBSCRIBE to include a rewind window
3. **Join Subscription Filters** ([[alan-frindell]]) - [draft-frindell-moq-join-filters](https://afrind.github.io/draft-frindell-moq-join-filters/draft-frindell-moq-join-filters.html) - Filter-based approach for selecting join point

[[will-law]] asked about the status of these competing proposals (2026-04-08). [[alan-frindell]] indicated his approach is "more of an extension to Martin's."

A meeting of "Joining fetch dissenters" was organized by [[alan-frindell]] (2026-03-22) with Ian Swett, Mike English, [[luke-curley]], and [[martin-duke]] - generated 19 replies.

### Key Issue
- **#1602** - Joining Fetch should be on the SUBSCRIBE/PUBLISH stream (latest open issue)
- **#1601** (Closed) - Joining FETCH session errors are subject to a race condition

## Related

- [[moq-transport]] - Protocol spec
- [[publish-subscribe]] - Subscription model
- [[adaptive-bitrate]] - ABR implications of join point selection
