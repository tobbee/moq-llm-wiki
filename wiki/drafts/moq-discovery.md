---
title: "MoQ Discovery (DNS and mDNS Discovery for MOQT)"
tags: [draft, individual, discovery, dns, mdns, uri]
date: 2026-08-16
last_updated: 2026-08-16
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-jennings-moq-discovery/"
---

> **2026-08-16**: **First-look — a new individual I-D specifies how MOQT clients *find* a server, the first MoQ endpoint-discovery/bootstrapping draft the wiki has tracked.** **`draft-jennings-moq-discovery-00`** *"DNS and mDNS Discovery for MOQT"* was submitted **2026-08-14** (9 pages) by **[[cullen-jennings|Cullen Fluffy Jennings]]** and **[[suhas-nandakumar|Suhas Nandakumar]]** (both Cisco). Individual draft, not adopted; not yet reflected in the moq@ietf.org browse index at check time. It lands the same fortnight as the WG's URI-scoping work (the [[interim-meetings|Aug-10 interim]]'s "query component is out of MoQT scope" decision, [[alan-frindell|afrind]]'s [PR #1855](https://github.com/moq-wg/moq-transport/pull/1855), transport issues [#1835](https://github.com/moq-wg/moq-transport/issues/1835)/[#1839](https://github.com/moq-wg/moq-transport/issues/1839)). See [[discussions-2026-08]].

**draft-jennings-moq-discovery-00** | individual submission | submitted 2026-08-14, 9 pages | not yet announced to moq@ietf.org

# Authors
- Cullen Fluffy Jennings (Cisco)
- Suhas Nandakumar (Cisco)

# Abstract (summary)

Specifies how MOQT clients **locate server endpoints** through DNS and multicast-DNS mechanisms. The draft defines **SVCB and HTTPS record mappings for the `moqt` URI scheme**, **SRV records** as a backup discovery approach for load-balancing and failover, and **DNS-SD over mDNS** for discovery on local networks without a central DNS server. Together these cover the "how does a client find a relay?" layer that [[moq-transport|moq-transport]] itself leaves out of scope.

# Key Ideas

- **SVCB / HTTPS records for the `moqt` scheme.** Clients use the modern DNS service-binding record types to obtain connection parameters (endpoint, ALPN/supported protocols, ports) for an `moqt` URI in a single lookup, rather than hard-coding host/port.
- **SRV records as a backup path.** Traditional SRV records provide load balancing and failover for deployments/resolvers that do not yet support SVCB/HTTPS.
- **DNS-SD over mDNS for local networks.** Enables zero-configuration discovery of MoQT endpoints on a local link (e.g. LAN peers) without any central DNS infrastructure — complementing moq-dev's separate mDNS peer-mesh experiments in implementation code.
- **Interoperability across deployment scenarios.** The three mechanisms are complementary, covering both global (DNS) and local (mDNS) discovery while staying compatible with existing DNS infrastructure.

# Why it matters

- **First endpoint-discovery / bootstrapping draft** in the MoQ document space. The transport draft says how a session works once connected but is deliberately silent on how a client obtains an endpoint; this fills that gap with a DNS-native answer.
- **Timely against the URI-scoping thread.** It arrives while the WG is actively bounding what a `moqt` URI means — the interim's decision that the query component is out of MoQT scope, afrind's [PR #1855](https://github.com/moq-wg/moq-transport/pull/1855), and issues [#1835](https://github.com/moq-wg/moq-transport/issues/1835) (query-in-URI scoping) / [#1839](https://github.com/moq-wg/moq-transport/issues/1839) (URI resolution). A discovery draft that maps the `moqt` scheme onto SVCB/HTTPS is a natural companion to that scope work.
- **Continued Cisco individual-draft investment.** A third Jennings/Nandakumar MoQ individual draft after [[moq-mocha|MOCHA]] (the RTC suite) and [[moq-tempo|TEMPO]] (playout orchestration) — extending the "MoQ as a general real-time substrate" push toward the network-services/discovery layer.

# Status & Caveats

- **Individual draft at -00** (submitted 2026-08-14) — not adopted, no WG call for adoption, no list traffic yet.
- The wiki tracks individual drafts that are actively discussed or referenced; this is logged as a **first-look** because it opens a new *discovery/bootstrapping* category for MoQ. Watch for a moq@ietf.org announcement, WG-list reaction, or reference from an implementation.

# Related

- [[moq-transport]] — the transport whose endpoints this draft discovers; complements its (out-of-scope) URI handling
- [[moq-mocha]] / [[moq-tempo]] — the same Cisco authors' other MoQ individual drafts
- [[relays]] — relay/CDN endpoints are what discovery resolves to
- [[interop-endpoints]] — the manually-maintained list of public relay endpoints this would automate away

# External Links
- [Datatracker](https://datatracker.ietf.org/doc/draft-jennings-moq-discovery/)
