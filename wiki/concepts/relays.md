---
title: "Relays"
tags: [concept, transport, infrastructure]
date: 2026-04-10
last_updated: 2026-06-22
status: current
---

Relays are first-class citizens of [[moq-transport]], enabling CDN-style content distribution.

# Role

Relays sit between publishers and subscribers:
- **Aggregate subscriptions**: Multiple subscribers for the same track share upstream bandwidth
- **Cache content**: Store objects for late-joining subscribers
- **Forward data**: Route objects from publishers to subscribers
- **Namespace routing**: Match SUBSCRIBE requests to PUBLISH_NAMESPACE announcements

# Relay Behavior

## Object Properties
Relays need to parse certain [[track-properties]] (e.g., Gap) but may skip others. The properties block has an explicit length field so relays can skip the entire block if needed. However, since draft-17 some properties convey core MOQT info that all relays should parse. (Properties are unchanged in draft-18; the post-18 `PROPERTY_FILTER` in Range Filters PR #1765 would make relays match on Object Properties — see [[track-properties]].)

## PUBLISH_DONE handling
Open question from [[alan-frindell]] (2026-03-31): When a relay receives PUBLISH_DONE but some subgroups haven't received FIN, what should downstream subscribers see? Options include RESET_STREAM_AT or waiting with a timer.

## Namespace forwarding
Relays forward PUBLISH_NAMESPACE from connected publishers. In draft-18 (PR #1542) namespace discovery is the split `SUBSCRIBE_NAMESPACE` (0x50) whose response is a `NAMESPACE` message (#1619), separate from `SUBSCRIBE_TRACKS` (0x51) for subscriptions — see [[publish-subscribe#Namespace Discovery (draft-18)|publish-subscribe]]. Clients should handle these appropriately (see [[discussions-2026-03]] for Daiki Matsui's draft-17-era interop questions about this).

## Fill fetch
The draft-18 **fill fetch** redesign ([PR #1673](https://github.com/moq-wg/moq-transport/pull/1673)) lets a relay satisfy a subscription's request for past groups by serving them on a dedicated unidirectional FETCH-format stream, rather than the separate Joining FETCH request the relay previously had to correlate. [[victor-vasiliev]] noted this removes Joining FETCH's correlation hazards for relays. See [[joining-fetch]].

# Public Relay Endpoints

See [[interop-endpoints]] for current public relay infrastructure.

# Related

- [[moq-transport]] - Protocol spec
- [[publish-subscribe]] - Message flow through relays
- [[interop-status]] - Relay interop testing
