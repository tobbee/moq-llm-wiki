---
title: "Publish/Subscribe Model"
tags: [concept, transport, core]
date: 2026-04-10
last_updated: 2026-06-22
status: current
---

The core messaging pattern of [[moq-transport]].

# Overview

MOQT uses a publish/subscribe model where:
- **Publishers** produce media data and announce availability via PUBLISH_NAMESPACE
- **Subscribers** express interest via SUBSCRIBE (for live data) or FETCH (for historical data)
- **[[Relays]]** sit between publishers and subscribers, forwarding data and aggregating subscriptions

# Message Flow

## Publishing
1. Publisher opens session with relay
2. Publisher sends `PUBLISH_NAMESPACE` to announce available namespaces
3. Relay learns what content is available

## Subscribing
1. Subscriber opens session with relay
2. Subscriber sends `SUBSCRIBE` with track namespace + track name
3. Relay responds with `REQUEST_OK` (including [[track-properties]], since draft-17)
4. Publisher begins sending objects on data streams

In **draft-18**, **Required Request ID was removed** (#1615) — a Request ID is now carried only for Joining FETCH and GOAWAY; and **`PUBLISH_OK` is no longer a distinct message type** — it is a textual alias of `REQUEST_OK` (#1611), alongside new aliases `REQUEST_UPDATE_OK` / `TRACK_STATUS_OK` / `SUBSCRIBE_NAMESPACE_OK` / `PUBLISH_NAMESPACE_OK` (#1610).

## Namespace Discovery (draft-18)
draft-17 had a single `SUBSCRIBE_NAMESPACE` (0x11) covering both discovery and subscription (with a BOTH mode + OPTIONS). **draft-18 split it** (PR #1542, merged May 1) into two distinct messages and dropped the BOTH mode / OPTIONS:
- **`SUBSCRIBE_NAMESPACE` (0x50)** - Namespace discovery; the response is a `NAMESPACE` message (corrected from PUBLISH_NAMESPACE in #1619), with self-tracks excluded (#1596).
- **`SUBSCRIBE_TRACKS` (0x51)** - Track subscription / PUBLISH notifications.
- New **`TRACK_NAMESPACE_PREFIX` (0x34)** field.

Overlaps are not permitted among requests of the same type but are permitted with different types.

# Key Messages

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

# Active Design Questions

- **Subscription filters / Range Filters** ([PR #1765](https://github.com/moq-wg/moq-transport/pull/1765), [[mo-zanaty|Mo Zanaty]], OPEN) - the live post-18 design thrust: adds `SUBGROUP_FILTER` / `OBJECTID_FILTER` / `PRIORITY_FILTER` / `PROPERTY_FILTER` on `SUBSCRIBE_TRACKS` and renames "Subscription Filters" → "Subscription Location Filters". Pairs with **fill fetch** ([PR #1673](https://github.com/moq-wg/moq-transport/pull/1673)) for past-group retrieval. See [[joining-fetch-dissent]].
- **Flow control for subscriptions** (PR #1591) - limits on active subscriptions; **OPEN, stale** (no activity since May 11). Sibling #1613 (MAX_REQUEST_UPDATES) was approved default-infinity at the London interim.
- **REQUEST_ERROR caching** (Issue #1582) - how relays cache/propagate errors; **still OPEN** (last touched June 11).
- **Self-exclusion** (Issue #1585) - should SUBSCRIBE_NAMESPACE exclude your own tracks? **CLOSED Apr 16** via PR #1596 (yes, they are excluded).

# Related

- [[moq-transport]] - Full protocol specification
- [[relays]] - Relay behavior in pub/sub
- [[joining-fetch]] - Special case: joining mid-stream
- [[subgroups-and-objects]] - What gets published/subscribed
