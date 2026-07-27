---
title: "Media over QUIC Transport (MOQT)"
tags: [draft, transport, core]
date: 2026-04-13
last_updated: 2026-07-27
status: current
draft_version: 19
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-transport/"
---

**draft-ietf-moq-transport-19** | published 2026-07-06 | [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-transport/19/)
**draft-ietf-moq-transport-18** | published 2026-05-12

# Authors
- [[alan-frindell]] (Meta)
- [[ian-swett]] (Google)
- [[suhas-nandakumar]] (Cisco)
- [[victor-vasiliev]] (Google)

# Abstract

MOQT is a publish/subscribe protocol that runs over QUIC and WebTransport. It leverages transport capabilities including streams, datagrams, priorities, and partial reliability. MOQT enables content delivery both directly between endpoints and through intermediate [[relays]], achieving scalable low-latency distribution. **Despite its name referencing media, the specification emphasizes that MOQT remains content-agnostic and applicable across various use cases** (abstract reframing in draft-18 — see [[discussions-2026-05]] for Will Law's parallel May 12 recharter proposal).

# Key Concepts

- **[[publish-subscribe]]**: Core messaging pattern - PUBLISH, SUBSCRIBE, FETCH, REQUEST_OK/REQUEST_ERROR, PUBLISH_DONE
- **[[subgroups-and-objects]]**: Data hierarchy: Track > Group > Subgroup > Object
- **[[relays]]**: First-class relay support for CDN-style distribution
- **[[track-properties]]**: Metadata attached to tracks and objects via Key-Value Pairs
- **[[joining-fetch]]**: Mechanism to fetch historical data when joining a live session
- **[[qmux]]**: TCP fallback via QUIC multiplexing over TLS+TCP
- **URI Scheme**: `moqt://` URI scheme with fragment identifier support (PR #1571)

# Version history

## draft-19 (published 2026-07-06)

Cut at the [[interim-meetings|interim-2026-moq-18]] (approved by [[ian-swett|Ian Swett]]); primarily an editorial clarification and validation-rule pass — the product of the post-draft-18 issue read-through and phased Design-PR review, with no major new wire mechanisms. Changes since draft-18:
- FIRST_OBJECT bit clarified to indicate the first object *ever* published in that subgroup.
- Malformed-Track conditions extended with explicit Object-ID-ordering checks within Groups.
- Property-handling rules clarified for relay forwarding of unknown properties.
- Location Filter behavior specified for when no content has been delivered yet.
- Session-termination error codes expanded for more protocol-violation scenarios.
- Track Namespace field constraints / validation rules documented.
- Subscription-state destruction timing clarified.

## draft-18 (published 2026-05-12)

Key wire/spec changes from draft-17:
- **Remove Required Request ID** (PR #1615, materialises the Apr 27 interim consensus) — Required Request IDs are removed; Request IDs remain for individual requests (used by Joining FETCH and GOAWAY).
- **Add FIRST_OBJECT bit to SUBGROUP_HEADER type** (PR #1618) — bit 6 (0x40) signals the subgroup contains the first object published by the original publisher; type byte expands `0b00X1XXXX` → `0b0XX1XXXX` (still 1-byte varint).
- **Forbid relays from lying about LARGEST_OBJECT** (PR #1621).
- **Split DELIVERY_TIMEOUT into two timeouts** (PR #1605) — `OBJECT_DELIVERY_TIMEOUT` (a more precise replacement for `DELIVERY_TIMEOUT`) plus a new `SUBGROUP_DELIVERY_TIMEOUT` (covers subgroups fully queued but not fully delivered). Closes the "DELIVERY_TIMEOUT is unimplementable" issue.
- **Improve Startup Latency and 0-RTT** (PR #1544) — new sections on reducing startup latency / 0-RTT flow with WebTransport.
- **Per-request GOAWAY** (PR #1617) — GOAWAY on request streams migrates individual requests; a zero-length URI causes the endpoint to re-issue the request on the specified URI session.
- **Improve Security Considerations** (PR #1625) — rebases and extends [[magnus-westerlund]]'s long-parked PR #1455.
- **Clarify definition of scope** (PR #1629).
- Abstract reframed to emphasise that MOQT is content-agnostic despite the "media" name.

## draft-17 (published 2026-03-02)

Significant changes from draft-16:
- Unidirectional control streams for 0-RTT subscribe capability
- SUBSCRIBE_NAMESPACE split into two messages: SUBSCRIBE_NAMESPACE (namespace info) and SUBSCRIBE_TRACKS (PUBLISH notifications)
- Subscription filters moved to be a Param (PR #1590)
- Track Properties added to REQUEST_OK (PR #1576)
- Allow 7-byte varint and non-minimal encodings (PR #1595)
- Editorial: consistent use of "MOQT" for protocol references (PR #1597); "message" instead of "frame" (PR #1587)

# Recent Highlights

Day-by-day WG/PR activity lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **Fast first-impl turnaround for draft-18**: within ~6 days of the May 12 publication, three distinct codebases had shipped it ([[moq-dev|moq-dev/moq]], [[imquic|meetecho/imquic]], mondain/moqxr) — the fastest spec → first-impl turnaround the wiki has tracked.
- **London interim (June 11–12, `interim-08`/`interim-10`)** confirmed several directions: keep the object-ID filter; fill-fetch replaces joining-fetch; `SWITCH_FROM` hard mode; remove Request ID from GOAWAY; PUBLISH_DONE precedes FIN on response streams; track properties stay immutable (priority updates via the data plane); **draft-18 is the Vienna interop target**.
- **DTS/SWITCH consensus (June 11)**: base-spec integration lacked rough consensus, so Dynamic Track Switching is adopted as a separate WG extension, `draft-ietf-moq-dts4moq` ([[will-law|Will Law]]), with the door left open to later merge into MOQT. See [[switch-abr]].
- **June 22 interim (`interim-17`)** renamed DTS → **Sender-Side Track Switching (SSTS)**, made the switching algorithm an extensible IANA-registered numeric ID with a mandatory "Algorithm Zero", and removed the per-set DDoS-protection negotiation properties (rely on auth tokens + existing relay protections). See [[interim-meetings]].
- **draft-19 published (2026-07-06)**: an editorial clarification pass following [[cullen-jennings|Cullen Jennings]]'s ~59-issue read-through of draft-18 (June 15); issues were converted into PRs under a phased review, with "Design" PRs needing two weeks open + four-editor stamps to make the July-6 cut.
- **IANA early review of draft-19 (2026-07-16)**: IANA (Amanda Baber, ticket #1456083) reviewed the draft ahead of IETF 126 and returned a pre-Last-Call punch-list — the IANA Considerations section is incomplete; the new registries need a named group ("Media over QUIC Transport"), RFC 8126 designated-expert guidance, protocol-differentiated names, and explicit numeric bounds; and the allocations must be reconciled against **inconsistent/duplicate registry values requested by [[moq-loc|loc]], [[moq-secure-objects|secure-objects]], and [[moq-msf|msf]]**. This was **one of five reviews Baber filed the same morning** — companion early reviews landed for [[moq-loc|loc-03]] (#1456079), [[moq-msf|msf-01]] (#1456080), [[moq-privacy-pass|privacy-pass-auth-03]] (#1456081), and [[moq-secure-objects|secure-objects-01]] (#1456082), all flagging the same defect class (registry name/reference mismatches vs the registries transport-19 establishes + missing RFC 8126 boilerplate) — i.e. IANA's cross-document verdict on the whole MoQ set. Tracked in [issue #1814](https://github.com/moq-wg/moq-transport/issues/1814) (afrind); the msf side is [msf #191](https://github.com/moq-wg/msf/issues/191) (Will Law), with [[will-law|Will Law]]'s cleanup PRs [msf #192–#195](https://github.com/moq-wg/msf/pull/192) opened July 17. Reframes the "Path to WGLC" work as enumerated registry/IANA items rather than open protocol design.
- **WGLC-prep security/editorial cluster (2026-07-21)**: during IETF 126 week the editors merged a six-PR hardening pass on the editor's copy — **no new published revision (transport-19 stands)** — closing security-considerations and registry-hygiene gaps: impersonation-prevention detail ([#1789](https://github.com/moq-wg/moq-transport/pull/1789), [[suhas-nandakumar|Suhas]]), `moqt://` URI-scheme security per **RFC 7595 §3.7** ([#1772](https://github.com/moq-wg/moq-transport/pull/1772)), a hex-enumeration→**bitfield code-point syntax** rewrite ([#1774](https://github.com/moq-wg/moq-transport/pull/1774)), expanded **mutual-TLS** security considerations ([#1786](https://github.com/moq-wg/moq-transport/pull/1786), [[alan-frindell|afrind]]), a **REDIRECT retry-interval-0** clarification ([#1785](https://github.com/moq-wg/moq-transport/pull/1785)), and **FORWARD on a REQUEST_UPDATE for SUBSCRIBE_TRACKS** ([#1812](https://github.com/moq-wg/moq-transport/pull/1812), sharmafb).
- **IETF-126 Monday session — chairs shape the Path to WGLC by trimming the core (2026-07-20; minutes posted 2026-07-22)**: the WG's headline decisions were about *scope reduction* to reach Last Call, not new design. (1) **Chairs called consensus to move range filters *and* Sender-Side Track Switching (SSTS) into separate drafts**, out of the core transport document — [[cullen-jennings|Cullen Jennings]] **formally objected**, citing a roughly 50/50 room split, and the Area Director affirmed the chairs' right to call consensus (a contested but standing determination). (2) **Management, metrics, and diagnostics considerations spun off into a new applicability/manageability document in its own repo** — Alperen Temel volunteered to write the initial diagnostics/relay-management draft. (3) The chairs framed transport stabilization as the critical blocker — *"if transport does not ship, none of the other WG drafts can progress"* — with [[moq-secure-objects|secure-objects]] queued for WGLC once the shared IANA registries settle. Editorial WGLC-prep also continued on the editor's copy July 22: afrind opened [#1824](https://github.com/moq-wg/moq-transport/pull/1824) (REDIRECT empty-namespace/name ambiguity), [#1823](https://github.com/moq-wg/moq-transport/pull/1823) (security consideration for logging untrusted string fields), [#1822](https://github.com/moq-wg/moq-transport/pull/1822) (Timed-Out gap status for expired Fill Timeout), and Suhas opened [#1825](https://github.com/moq-wg/moq-transport/pull/1825) (replace the FORWARD parameter with Range-Filter-based pausing) — all OPEN; transport-19 stands.
- **Consensus call on the draft-18 content closed (opened 2026-07-06, concluded 2026-07-24)**: co-chair [[martin-duke|Martin Duke]] ran a formal consensus call on the [draft-17 → draft-18 diff](https://author-tools.ietf.org/iddiff?url1=draft-ietf-moq-transport-17&url2=draft-ietf-moq-transport-18&difftype=--html), asking the WG to file any resulting issues *"no later than 20 July"* with *"subsequent objections [facing] a higher bar."* He **closed it out on-list July 24 14:14 UTC** — *"This concludes the consensus call on draft-18. Any issues with the -17/-18 diff should be in Github by now."* — formally settling the -18 baseline as the WG works the Path to WGLC. *(This on-list thread was mistakenly dismissed as a fetch artifact in two prior wiki updates; it is verifiably real — [message](https://mailarchive.ietf.org/arch/msg/moq/lA3ySxXpyLGiNu_KpI0gUH9A9QI/), corrected here.)*
- **MOQT-over-QMux ruled out of the WG's current charter** (chairs + AD, June 17): the TLS+TCP fallback proceeds as an individual draft until a recharter, scoping the QMux-framing work out of the transport draft. See [[qmux]].
- **AUTH design team** (formed June 12) produced the WG's first new draft since transport-18 — [[moq-c4m|`draft-ietf-moq-c4m-01`]] (Common Access Token authorization).

# Open design questions

Substantive topics still being worked as this page is written:

- **Fill-fetch vs Joining FETCH**: whether to replace Joining FETCH with unidirectional fill-fetch streams (PR #1673, revising Subscription-Fill #1642) — Cullen Jennings would keep Joining FETCH pending operational experience, and flags error-delivery, duplicate-object, and nested-`FILL_PARAMETERS` concerns. See [[joining-fetch]].
- **SSTS (Sender-Side Track Switching)**: the "Algorithm Zero + IANA registry" extension design (PR #1638), meant to be validated by more than one algorithm before draft-19. **At IETF 126 (July 20) the chairs called consensus to move SSTS into a *separate draft*, out of core transport** (contested by Cullen Jennings; AD affirmed the chairs) — so it is now slated to leave the transport document. See [[switch-abr]].
- **Range filters**: re-adding location-based subscription filters ([[mo-zanaty|Mo Zanaty]]'s PR #1765). **Also slated to move into a separate draft** per the same contested IETF-126 consensus call — the least-wanted part of the draft-18→19 delta (Luke Curley won't implement them; imquic ignores the property filters). Suhas's [#1825](https://github.com/moq-wg/moq-transport/pull/1825) (July 22) even proposes replacing the FORWARD parameter with Range-Filter-based pausing.
- **Subgroup-start signalling**: draft-18 shipped the FIRST_OBJECT bit (PR #1618), but the list debated alternatives (Subgroup ID == first Object ID; Luke Curley's per-subgroup counter for cache-gap detection).
- **Compression layering**: whether compression belongs at the transport, [[moq-msf|MSF]]/streaming-format, or Full-Track-Name layer, and hop-by-hop vs end-to-end semantics. See [[moq-dev]].
- **7-byte varint / non-minimal encodings**: allowed since draft-17 (PR #1595), but flagged as a footgun in the draft-19 read-through.
- **SUBSCRIPTION_STATE_UPDATE**: [[alan-frindell|afrind]]'s proposal (July 21) for a new control message to update subscription state ([PR #1820](https://github.com/moq-wg/moq-transport/pull/1820), OPEN). Related: [issue #1821](https://github.com/moq-wg/moq-transport/issues/1821) (Otto Hermann) asks *what a subscriber is entitled to observe after an Object becomes unavailable* — both touch draft-19's clarified subscription-state destruction timing.

# ALPN Negotiation

MOQT negotiates the draft revision via the QUIC/WebTransport ALPN. Each revision maps to `moqt-NN` with wire version `0xff0000NN`; the QUIC-multiplexed ([[qmux]]) transport prefixes the same token as `qmux-00.moqt-NN`. (The final RFC will use the bare `moqt` token.)

- `moqt-19` — draft-19 (`0xff000013`), the current published revision
- `moqt-18` — draft-18 (`0xff000012`); the Vienna interop target
- `moqt-17` — draft-17 (`0xff000011`)
- `moqt-16` — draft-16 (`0xff000010`)
- `moq-00` — draft-14 (legacy); the bare `qmux-00` token (no suffix) likewise implies draft-14

# Related Drafts
- [[moq-msf]] - Streaming format built on MOQT
- [[moq-loc]] - Low overhead container for MOQT objects
- [[moq-secure-objects]] - E2E encryption for MOQT
- [[moq-privacy-pass]] - Authentication for MOQT

# External Links
- [GitHub repo](https://github.com/moq-wg/moq-transport)
- [Latest HTML](https://moq-wg.github.io/moq-transport/draft-ietf-moq-transport.html)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-transport/)
- [moq-wg wiki](https://github.com/moq-wg/moq-transport/wiki)
