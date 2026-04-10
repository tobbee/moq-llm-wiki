---
title: "Publish/Subscribe Model"
tags: [concept, transport, core]
date: 2026-04-10
status: current
---

# Publish/Subscribe Model

The core messaging pattern of [[moq-transport]].

## Overview

MOQT uses a publish/subscribe model where:
- **Publishers** produce media data and announce availability via PUBLISH_NAMESPACE
- **Subscribers** express interest via SUBSCRIBE (for live data) or FETCH (for historical data)
- **[[Relays]]** sit between publishers and subscribers, forwarding data and aggregating subscriptions

## Message Flow

### Publishing
1. Publisher opens session with relay
2. Publisher sends `PUBLISH_NAMESPACE` to announce available namespaces
3. Relay learns what content is available

### Subscribing
1. Subscriber opens session with relay
2. Subscriber sends `SUBSCRIBE` with track namespace + track name
3. Relay responds with `REQUEST_OK` (including [[track-properties]] as of draft-17)
4. Publisher begins sending objects on data streams

### Namespace Discovery (draft-17)
In draft-17, SUBSCRIBE_NAMESPACE was split into two distinct messages:
- **SUBSCRIBE_NAMESPACE** - Gets namespace information (NAMESPACE/DONE)
- **SUBSCRIBE_TRACKS** - Gets PUBLISH notifications

Overlaps are not permitted among requests of the same type but are permitted with different types.

## Key Messages

| Message | Direction | Purpose |
|---------|-----------|---------|
| PUBLISH_NAMESPACE | Publisher -> Relay | Announce available namespaces |
| SUBSCRIBE | Subscriber -> Relay | Request live data for a track |
| FETCH | Subscriber -> Relay | Request historical data |
| REQUEST_OK | Relay -> Subscriber | Confirm subscription with track properties |
| REQUEST_ERROR | Relay -> Subscriber | Deny subscription |
| PUBLISH_DONE | Publisher -> Relay | Signal end of publishing |
| SUBSCRIBE_NAMESPACE | Subscriber -> Relay | Discover available namespaces |
| SUBSCRIBE_TRACKS | Subscriber -> Relay | Get PUBLISH notifications |

## Active Design Questions

- **Flow control for subscriptions** (PR #1591) - Should there be limits on active subscriptions?
- **REQUEST_ERROR caching** (Issue #1582) - How should relays cache and propagate errors?
- **Self-exclusion** (Issue #1585) - Should SUBSCRIBE_NAMESPACE exclude your own tracks?

## Related

- [[moq-transport]] - Full protocol specification
- [[relays]] - Relay behavior in pub/sub
- [[joining-fetch]] - Special case: joining mid-stream
- [[subgroups-and-objects]] - What gets published/subscribed
