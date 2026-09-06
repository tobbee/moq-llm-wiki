---
title: "MoQ Discovery (DNS and mDNS Discovery for MOQT)"
tags: [draft, individual, discovery, dns, mdns, uri]
date: 2026-08-16
last_updated: 2026-09-06
status: current
draft_version: "02"
ietf_url: "https://datatracker.ietf.org/doc/draft-jennings-moq-discovery/"
---

> **2026-08-16**: **First-look — a new individual I-D specifies how MOQT clients *find* a server, the first MoQ endpoint-discovery/bootstrapping draft the wiki has tracked.** **`draft-jennings-moq-discovery-00`** *"DNS and mDNS Discovery for MOQT"* was submitted **2026-08-14** (9 pages) by **[[cullen-jennings|Cullen Fluffy Jennings]]** and **[[suhas-nandakumar|Suhas Nandakumar]]** (both Cisco). Individual draft, not adopted; not yet reflected in the moq@ietf.org browse index at check time. It lands the same fortnight as the WG's URI-scoping work (the [[interim-meetings|Aug-10 interim]]'s "query component is out of MoQT scope" decision, [[alan-frindell|afrind]]'s [PR #1855](https://github.com/moq-wg/moq-transport/pull/1855), transport issues [#1835](https://github.com/moq-wg/moq-transport/issues/1835)/[#1839](https://github.com/moq-wg/moq-transport/issues/1839)). See [[discussions-2026-08]].

**draft-jennings-moq-discovery-02** | individual submission | rev-00 2026-08-14 → rev-02 2026-09-05 | **now actively discussed on moq@ietf.org** (proposed as the separate spec for URI resolution + TLS cert matching — see Status below) | source: [suhasHere/draft-jennings-moq-discovery](https://github.com/suhasHere/draft-jennings-moq-discovery)

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
- **The WG's answer to the URI-resolution gap (Sep-5).** It arrives while the WG is actively bounding what a `moqt` URI means — the interim's decision that the query component is out of MoQT scope, afrind's [PR #1855](https://github.com/moq-wg/moq-transport/pull/1855), and issues [#1835](https://github.com/moq-wg/moq-transport/issues/1835) (query-in-URI scoping) / [#1839](https://github.com/moq-wg/moq-transport/issues/1839) (URI resolution). By **Sep-5** the WG had converged that URI resolution + TLS cert matching should leave the transport draft for a **separate spec**, and Jennings and Nandakumar are offering this draft as that home (see Status). A discovery draft that maps the `moqt` scheme onto SVCB/HTTPS is the natural place for "given a `moqt` URI, which endpoint and which certificate."
- **Continued Cisco individual-draft investment.** A third Jennings/Nandakumar MoQ individual draft after [[moq-mocha|MOCHA]] (the RTC suite) and [[moq-tempo|TEMPO]] (playout orchestration) — extending the "MoQ as a general real-time substrate" push toward the network-services/discovery layer.

# Status & Caveats

- **Individual draft at -02** (rev-00 2026-08-14 → rev-02 2026-09-05) — not adopted, no WG call for adoption.
- **Now the proposed home for URI resolution + TLS cert matching (Sep-5).** On **2026-09-05** [[cullen-jennings|Cullen Jennings]] posted **[Moq] *"URI Resolution for MOQT and TLS cert matching"*** to moq@ietf.org ([permalink](https://mailarchive.ietf.org/arch/msg/moq/UGHwMRV_4TFVhz329sfz13KLoao/), 16:22 UTC, verified real): the [[moq-transport]] draft is *"missing information on how to implement DNS resolution of URI and how the TLS certificate matches to the URI,"* and after discussion on **[transport issue #1839](https://github.com/moq-wg/moq-transport/issues/1839)** the WG's direction is that *"a separate spec is probably the best way to resolve this"* (it needs review from *"the DNS and Certificate people,"* which a standalone doc makes easier). Jennings and [[suhas-nandakumar|Suhas Nandakumar]] point to **this draft** as that spec. On the transport side the move is tracked by OPEN **[PR #1909](https://github.com/moq-wg/moq-transport/pull/1909)** *"Move URI resolution to a separate draft"* (Jennings, Sep-5) and its precursor **[PR #1901](https://github.com/moq-wg/moq-transport/pull/1901)** *"start design questions for URI resolution and cert matching"* (Sep-3). The **rev-02 abstract is still scoped to DNS/mDNS discovery** (SVCB/HTTPS, SRV, DNS-SD) — the URI-resolution/cert-matching content is the *proposed expansion* the list thread is organizing, not yet folded into the published text.
- The wiki tracks individual drafts that are actively discussed or referenced; the draft has now graduated from **first-look** to **actively-discussed** — it is the WG's candidate answer to the URI-resolution gap moq-transport deliberately leaves open.

# Related

- [[moq-transport]] — the transport whose endpoints this draft discovers; complements its (out-of-scope) URI handling
- [[moq-mocha]] / [[moq-tempo]] — the same Cisco authors' other MoQ individual drafts
- [[relays]] — relay/CDN endpoints are what discovery resolves to
- [[interop-endpoints]] — the manually-maintained list of public relay endpoints this would automate away

# External Links
- [Datatracker](https://datatracker.ietf.org/doc/draft-jennings-moq-discovery/)
- [Source + issue tracker (suhasHere/draft-jennings-moq-discovery)](https://github.com/suhasHere/draft-jennings-moq-discovery)
- [moq@ietf.org — "URI Resolution for MOQT and TLS cert matching" (Sep-5)](https://mailarchive.ietf.org/arch/msg/moq/UGHwMRV_4TFVhz329sfz13KLoao/)
