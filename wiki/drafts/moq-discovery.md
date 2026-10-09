---
title: "MoQ URI and Discovery (draft-jennings-moq-uri; was moq-discovery)"
tags: [draft, individual, discovery, dns, mdns, uri, cert-matching]
date: 2026-08-16
last_updated: 2026-10-09
status: current
draft_version: "moq-uri-00 (replaces moq-discovery-02)"
ietf_url: "https://datatracker.ietf.org/doc/draft-jennings-moq-uri/"
---

> **2026-10-07**: **Renamed and broadened — the discovery draft is now `draft-jennings-moq-uri` "MOQT URI and Discovery."** The datatracker marks **`draft-jennings-moq-discovery`** as *Replaced by* **[`draft-jennings-moq-uri-00`](https://datatracker.ietf.org/doc/draft-jennings-moq-uri/)** (rev-00 submitted 2026-10-07 by [[suhas-nandakumar|Suhas Nandakumar]], 14 pp, Standards Track, Cisco). The successor **folds the `moqt` URI scheme + resolution + X.509 certificate-matching content into the DNS/mDNS discovery draft**, realizing the consolidation this page anticipated below: it now defines the `moqt` URI syntax, fragment identifiers, dereferencing procedures, normalization rules, and SAN-only certificate matching **alongside** SVCB/SRV + DNS-SD/mDNS discovery. This is the external home that transport **[PR #1971](https://github.com/moq-wg/moq-transport/pull/1971)** *"move URI definition and dereferencing to external draft"* (opened Oct-7, [[cullen-jennings|Jennings]]) points at — the realized form of the earlier [PR #1909](https://github.com/moq-wg/moq-transport/pull/1909)/[#1901](https://github.com/moq-wg/moq-transport/pull/1901) design work. This wiki page keeps its `moq-discovery` filename (and existing backlinks) but now tracks the `moq-uri` successor. See [[discussions-2026-10]].

> **2026-08-16**: **First-look — a new individual I-D specifies how MOQT clients *find* a server, the first MoQ endpoint-discovery/bootstrapping draft the wiki has tracked.** **`draft-jennings-moq-discovery-00`** *"DNS and mDNS Discovery for MOQT"* was submitted **2026-08-14** (9 pages) by **[[cullen-jennings|Cullen Fluffy Jennings]]** and **[[suhas-nandakumar|Suhas Nandakumar]]** (both Cisco). Individual draft, not adopted; not yet reflected in the moq@ietf.org browse index at check time. It lands the same fortnight as the WG's URI-scoping work (the [[interim-meetings|Aug-10 interim]]'s "query component is out of MoQT scope" decision, [[alan-frindell|afrind]]'s [PR #1855](https://github.com/moq-wg/moq-transport/pull/1855), transport issues [#1835](https://github.com/moq-wg/moq-transport/issues/1835)/[#1839](https://github.com/moq-wg/moq-transport/issues/1839)). See [[discussions-2026-08]].

**draft-jennings-moq-uri-00** (replaces **draft-jennings-moq-discovery-02**) | individual submission | discovery lineage: rev-00 2026-08-14 → rev-02 2026-09-05; **renamed/consolidated into `draft-jennings-moq-uri-00` on 2026-10-07** | 14 pages | Standards Track | **actively discussed on moq@ietf.org** (now the external home for URI resolution + TLS cert matching + discovery — see Status below) | source: [suhasHere/draft-jennings-moq-discovery](https://github.com/suhasHere/draft-jennings-moq-discovery)

# Authors
- Cullen Fluffy Jennings (Cisco)
- Suhas Nandakumar (Cisco)

# Abstract (summary)

As of the **`draft-jennings-moq-uri-00`** consolidation, the draft specifies **both** the `moqt` **URI scheme** (syntax, fragment identifiers, dereferencing procedures, normalization rules, and X.509 certificate matching) **and** how MOQT clients **locate server endpoints** through DNS and multicast-DNS mechanisms. On the discovery side it defines **SVCB and HTTPS record mappings for the `moqt` URI scheme**, **SRV records** as a backup discovery approach for load-balancing and failover, and **DNS-SD over mDNS** for discovery on local networks without a central DNS server. Together these cover the "what does a `moqt` URI mean, and how does a client find the relay it names?" layer that [[moq-transport|moq-transport]] itself is moving out of scope (transport PR #1971).

# Key Ideas

- **The `moqt` URI scheme itself (new in -uri-00).** Defines URI syntax, **fragment identifiers**, **dereferencing procedures**, and **normalization rules** — the content being pulled out of [[moq-transport]] by [PR #1971](https://github.com/moq-wg/moq-transport/pull/1971).
- **X.509 certificate matching (new in -uri-00).** Specifies how a TLS certificate matches a `moqt` URI — SAN-only matching (DNS names, URIs, IPs), ignoring the legacy Common Name, per the interim-23 requirements Cullen presented (see Status).
- **SVCB / HTTPS records for the `moqt` scheme.** Clients use the modern DNS service-binding record types to obtain connection parameters (endpoint, ALPN/supported protocols, ports) for an `moqt` URI in a single lookup, rather than hard-coding host/port.
- **SRV records as a backup path.** Traditional SRV records provide load balancing and failover for deployments/resolvers that do not yet support SVCB/HTTPS.
- **DNS-SD over mDNS for local networks.** Enables zero-configuration discovery of MoQT endpoints on a local link (e.g. LAN peers) without any central DNS infrastructure — complementing moq-dev's separate mDNS peer-mesh experiments in implementation code.
- **Interoperability across deployment scenarios.** The mechanisms are complementary, covering both global (DNS) and local (mDNS) discovery while staying compatible with existing DNS infrastructure.

# Why it matters

- **First endpoint-discovery / bootstrapping draft** in the MoQ document space. The transport draft says how a session works once connected but is deliberately silent on how a client obtains an endpoint; this fills that gap with a DNS-native answer.
- **The WG's answer to the URI-resolution gap (Sep-5).** It arrives while the WG is actively bounding what a `moqt` URI means — the interim's decision that the query component is out of MoQT scope, afrind's [PR #1855](https://github.com/moq-wg/moq-transport/pull/1855), and issues [#1835](https://github.com/moq-wg/moq-transport/issues/1835) (query-in-URI scoping) / [#1839](https://github.com/moq-wg/moq-transport/issues/1839) (URI resolution). By **Sep-5** the WG had converged that URI resolution + TLS cert matching should leave the transport draft for a **separate spec**, and Jennings and Nandakumar are offering this draft as that home (see Status). A discovery draft that maps the `moqt` scheme onto SVCB/HTTPS is the natural place for "given a `moqt` URI, which endpoint and which certificate."
- **Continued Cisco individual-draft investment.** A third Jennings/Nandakumar MoQ individual draft after [[moq-mocha|MOCHA]] (the RTC suite) and [[moq-tempo|TEMPO]] (playout orchestration) — extending the "MoQ as a general real-time substrate" push toward the network-services/discovery layer.

# Status & Caveats

- **Renamed to `draft-jennings-moq-uri` and consolidated (2026-10-07).** The datatracker now marks `draft-jennings-moq-discovery` as **Replaced by `draft-jennings-moq-uri`**; **`draft-jennings-moq-uri-00`** (14 pp, Standards Track) was submitted 2026-10-07 and **folds in the URI-scheme + resolution + cert-matching content** that was previously only the *proposed expansion* (see the Sep-5/interim-23 bullets below). So the "separate spec for URI resolution + TLS cert matching" the WG agreed to carve out of [[moq-transport]] now exists as published text, not just a list proposal. Still an **individual draft, not WG-adopted**.
- **Individual draft** (discovery lineage rev-00 2026-08-14 → rev-02 2026-09-05; `moq-uri` rev-00 2026-10-07) — not adopted, no WG call for adoption.
- **Now the proposed home for URI resolution + TLS cert matching (Sep-5).** On **2026-09-05** [[cullen-jennings|Cullen Jennings]] posted **[Moq] *"URI Resolution for MOQT and TLS cert matching"*** to moq@ietf.org ([permalink](https://mailarchive.ietf.org/arch/msg/moq/UGHwMRV_4TFVhz329sfz13KLoao/), 16:22 UTC, verified real): the [[moq-transport]] draft is *"missing information on how to implement DNS resolution of URI and how the TLS certificate matches to the URI,"* and after discussion on **[transport issue #1839](https://github.com/moq-wg/moq-transport/issues/1839)** the WG's direction is that *"a separate spec is probably the best way to resolve this"* (it needs review from *"the DNS and Certificate people,"* which a standalone doc makes easier). Jennings and [[suhas-nandakumar|Suhas Nandakumar]] point to **this draft** as that spec. On the transport side the move is tracked by OPEN **[PR #1909](https://github.com/moq-wg/moq-transport/pull/1909)** *"Move URI resolution to a separate draft"* (Jennings, Sep-5) and its precursor **[PR #1901](https://github.com/moq-wg/moq-transport/pull/1901)** *"start design questions for URI resolution and cert matching"* (Sep-3). The **rev-02 abstract is still scoped to DNS/mDNS discovery** (SVCB/HTTPS, SRV, DNS-SD) — the URI-resolution/cert-matching content is the *proposed expansion* the list thread is organizing, not yet folded into the published text.
- **interim-23 endorsed the relocation and sharpened the requirements (Sep-8; minutes posted Sep-9).** Cullen presented the DNS/TLS requirements (tracked by **[PR #1901](https://github.com/moq-wg/moq-transport/pull/1901)**): **mandatory client support for SVCB records** (server-side load balancing); **TLS certificate validation restricted to Subject Alternative Name (SAN) fields** — DNS names, URIs (for narrow-scoped CDN routing), and IP addresses — **ignoring the legacy Common Name (CN)**; and a **ban on wildcard certificates** (`*.example.com`) to align with modern security practice. [[victor-vasiliev|Vasiliev]] asked about browser/WebTransport compatibility; Cullen said raw QUIC fully supports it and browser limits would resolve over time. **[[alan-frindell|afrind]] proposed moving the `moqt` URI-scheme definition out of [[moq-transport]] into this draft, and Cullen agreed** — so this draft becomes the home for both discovery *and* the URI scheme itself. (The AI minutes call the draft `draft-jennings-moq-resolution-00`, which does not exist — the real doc is this `draft-jennings-moq-discovery`.) See [[interim-meetings]], [[discussions-2026-09]].
- The wiki tracks individual drafts that are actively discussed or referenced; the draft has now graduated from **first-look** to **actively-discussed** — it is the WG's candidate answer to the URI-resolution gap moq-transport deliberately leaves open.

# Related

- [[moq-transport]] — the transport whose endpoints this draft discovers; complements its (out-of-scope) URI handling
- [[moq-mocha]] / [[moq-tempo]] — the same Cisco authors' other MoQ individual drafts
- [[relays]] — relay/CDN endpoints are what discovery resolves to
- [[interop-endpoints]] — the manually-maintained list of public relay endpoints this would automate away

# External Links
- [Datatracker — draft-jennings-moq-uri (current)](https://datatracker.ietf.org/doc/draft-jennings-moq-uri/)
- [Datatracker — draft-jennings-moq-discovery (replaced)](https://datatracker.ietf.org/doc/draft-jennings-moq-discovery/)
- [Source + issue tracker (suhasHere/draft-jennings-moq-discovery)](https://github.com/suhasHere/draft-jennings-moq-discovery)
- [moq@ietf.org — "URI Resolution for MOQT and TLS cert matching" (Sep-5)](https://mailarchive.ietf.org/arch/msg/moq/UGHwMRV_4TFVhz329sfz13KLoao/)
- [moq@ietf.org — "URI Resolution for MOQT and TLS cert matching" (Sep-5)](https://mailarchive.ietf.org/arch/msg/moq/UGHwMRV_4TFVhz329sfz13KLoao/)
