---
title: "Relays"
tags: [concept, transport, infrastructure]
date: 2026-04-10
last_updated: 2026-04-14
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
Relays need to parse certain [[track-properties]] (e.g., Gap) but may skip others. The properties block has an explicit length field so relays can skip the entire block if needed. However, as of draft-17, some properties convey core MOQT info that all relays should parse.

## PUBLISH_DONE handling
Open question from [[alan-frindell]] (2026-03-31): When a relay receives PUBLISH_DONE but some subgroups haven't received FIN, what should downstream subscribers see? Options include RESET_STREAM_AT or waiting with a timer.

## Namespace forwarding
Relays forward PUBLISH_NAMESPACE from connected publishers. In draft-17, relays may send SUBSCRIBE_NAMESPACE back to clients, and PUBLISH_NAMESPACE for other available namespaces. Clients should handle these appropriately (see [[discussions-2026-03]] for Daiki Matsui's interop questions about this).

# Public Relay Endpoints

See [[interop-endpoints]] for current public relay infrastructure.

# Related

- [[moq-transport]] - Protocol spec
- [[publish-subscribe]] - Message flow through relays
- [[interop-status]] - Relay interop testing
