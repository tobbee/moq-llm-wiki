---
title: "MoQ Cluster Extension"
tags: [draft, transport, extension, relay, clustering, individual]
date: 2026-08-05
last_updated: 2026-08-05
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-lcurley-moq-cluster/"
---

**draft-lcurley-moq-cluster-00** | Individual submission | Submitted 2026-08-04 | 10 pages | [Datatracker](https://datatracker.ietf.org/doc/draft-lcurley-moq-cluster/)

> **2026-08-05**: **New individual I-D — `draft-lcurley-moq-cluster-00` "MoQ Cluster Extension" posted 2026-08-04** by [[luke-curley|Luke Curley]], one of a **three-draft batch** he submitted the same ~02:08 UTC minute alongside [[moq-timestamp|`draft-lcurley-moq-timestamp-01`]] and `draft-lcurley-moq-hang-02`. It gives a **datatracker home to the relay-mesh / cost-based-routing work** that [[moq-dev|moq-dev/moq]] has been building in-code for weeks (Hop IDs, cumulative route cost, gossip peering) — and moq-dev is implementing this exact extension over IETF [[moq-transport]] in OPEN [PR #2629](https://github.com/moq-dev/moq/pull/2629) *"implement MoQ Cluster extension over moq-transport"* (+2418/−403). The in-repo draft-authoring pass that produced the text landed as [PR #2607](https://github.com/moq-dev/moq/pull/2607) *"drafts: render gate, Hop ID 0, cluster rename, and a simplification pass"* — the same in-code-before-Datatracker pattern the [[moq-lite]] -05/-06 wire followed. Individual submission, not WG-adopted; logged as a first-look. See [[moq-dev]], [[discussions-2026-08]].

# Author
- [[luke-curley|Luke Curley]] (kixelated@gmail.com)

# Abstract

This document defines a **clustering extension for [[moq-transport|MoQ Transport]]**, used to build a **mesh of relays**. Each namespace advertisement carries the **ordered list of Hop IDs** it has traversed, starting with the original publisher, plus the **accumulated cost of that path**. A receiver uses the list to **detect routing loops** and to **identify which advertisements come from the same publisher**, choosing the lowest-cost path among equivalent advertisements.

# Key Technical Details

- **Hop ID path vector**: every namespace advertisement (announce) carries the ordered sequence of relay Hop IDs it passed through, beginning with the origin publisher. This is a path-vector routing mechanism (analogous to BGP AS-path) built at the MoQ announcement layer.
- **Accumulated path cost**: alongside the Hop ID list, each advertisement carries the summed cost of the path, so a relay/receiver can pick the cheapest route among multiple advertisements for the same content.
- **Loop detection**: because the full hop list travels with the advertisement, a relay that finds its own Hop ID already in the list drops the advertisement — preventing routing loops in a gossip mesh without a separate control protocol.
- **Same-publisher identification**: advertisements that share an origin Hop ID are recognized as interchangeable routes to one publisher, which is what lets cost comparison be meaningful ([PR #2613](https://github.com/moq-dev/moq/pull/2613) scoped route cost to *interchangeable* advertisements).
- **Hop ID 0**: the origin/self hop is normalized to Hop ID 0 in the -00 text (part of [PR #2607](https://github.com/moq-dev/moq/pull/2607)'s "Hop ID 0" cleanup).

# Relationship to other work

- **moq-net implementation ([[moq-dev|moq-dev/moq]])**: the cluster extension is the standards form of the **cost-based cache-aware routing** moq-dev shipped July 20 ([PR #2424](https://github.com/moq-dev/moq/pull/2424) *route by cumulative cost on lite-06 announcements*) plus the earlier vendored route-cost Internet-Draft ([PR #2179](https://github.com/moq-dev/moq/pull/2179)). OPEN [PR #2629](https://github.com/moq-dev/moq/pull/2629) now implements the extension over IETF moq-transport (not just moq-lite), extending the mesh beyond configured routes — complementing the Aug-1 **mDNS local-network peer-mesh** front ([PR #2585](https://github.com/moq-dev/moq/pull/2585)).
- **moq-lite-06 relay-hops**: moq-dev has been aligning relay-hops with moq-lite-06 in code ([PR #2578](https://github.com/moq-dev/moq/pull/2578) / [PR #2581](https://github.com/moq-dev/moq/pull/2581)); the cluster draft is the transport-level, container-agnostic articulation of that hop/cost model.
- **Sibling drafts**: submitted together with [[moq-timestamp|`draft-lcurley-moq-timestamp-01`]] (age-based relay decisions) and `draft-lcurley-moq-hang-02` (conferencing profile) — the same "prototype in `moq-dev/moq`, then surface as a portable transport extension" workflow as [[moq-lite]] and [[compressed-mp4]].

# Notes

Individual submission by Luke Curley, not adopted by the MOQ working group. Posted 2026-08-04, 10 pages. It is the first MoQ *relay-clustering / routing* Internet-Draft the wiki tracks, and turns weeks of moq-dev in-repo mesh/route-cost code into a citable spec.

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-lcurley-moq-cluster/
- **Implementation**: [moq-dev/moq PR #2629](https://github.com/moq-dev/moq/pull/2629) (MoQ Cluster extension over moq-transport)

# Related
- [[moq-transport]] — the transport this extension clusters
- [[moq-lite]] — Luke Curley's simplified transport, where the hop/route-cost work first shipped
- [[moq-timestamp]] — sibling extension submitted the same day
- [[moq-dev]] — implementation
- [[luke-curley]] — author
- [[relays]] — relay/CDN architecture
