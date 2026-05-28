---
title: "Interim Meetings Schedule"
tags: [meetings, schedule, ietf]
date: 2026-04-10
last_updated: 2026-05-28
status: current
---

> **2026-05-28 note**: **Two senior contributors push back on chair-side procedural framing within 24h**. **[[gwendal-simon|Gwendal Simon]] May 27 10:58 UTC [disputes Martin Duke's "Thoughts on SWITCH" framing](https://mailarchive.ietf.org/arch/msg/moq/bKiCDYOz10Be0f8nRkR4PNA71f8/) with 4 points**: (1) down-switch is actually **4 messages not 3** (REQUEST_UPDATE + SUBSCRIBE + Absolute Joining FETCH + REQUEST_UPDATE priority reset) with **break-before-make hard-freeze vulnerability**; (2) up-switch group N+k selection **requires relay-side info** subscribers cannot compute; (3) **SWITCH is additive not replacive**; (4) **4 independent teams** have implemented/explored SWITCH = real OTT Live TV demand. First strong technical rebuttal of the chair's May 26 framing — Martin Duke missed the 4-message hard-freeze risk and underweighted relay-side N+k computation. **[Cullen Fluffy Jennings May 27 19:26 UTC](https://mailarchive.ietf.org/arch/msg/moq/Fq2rsYiCNiEmGjMF-O7XWk9TkhY/)** rejects Magnus Westerlund's suggestion to move Track Filters + Top-N to a separate Internet-Draft extension: *"I disagree it should be done as a separate draft. I think it should be worked as a PR that can be discussed in context"* — references DTS experience as evidence off-base-spec extension drafts create unnecessary confusion. **Pattern**: with Martin Duke's *"I don't have strong opinions"* posture from May 26 leaving room for technical rebuttal, the **mailing list is now actively re-running the May 26 interim outcome before the formal June 4 close** — Gwendal's rebuttal effectively raises a *"current draft is broken for OTT Live TV"* signal alongside Will Law's Yes/Yes vote, while Cullen rejects the procedural escape hatch (separate draft) that the chairs may have wanted to keep available for managing London agenda load. **Carry-forward**: with the May 26 interim outcome yet to publish on list and June 4 / June 5 consensus closes ahead of London June 11-12, the chair-neutral posture is structurally becoming a venue for contributors to drive technical disposition through direct rebuttal rather than chair-tinted facilitation.
>
> **2026-05-27 note**: **[[martin-duke|Martin Duke]] posts first chair technical position on the May 21 SWITCH consensus call** — *"[Moq] Thoughts on SWITCH"* May 26 17:33 UTC ([archive](https://mailarchive.ietf.org/arch/msg/moq/DgZFn6lBJC8pnm4k-aN9wrxYP8U/)) + [self-reply](https://mailarchive.ietf.org/arch/msg/moq/XrRbydFVqcZatdwdAt9dzZsdvY4/) 18:08 UTC. Quoted summary: the current 3-step UNSUBSCRIBE+SUBSCRIBE+Absolute Joining FETCH approach is identical to SWITCH when the relay has cache, but **SWITCH continues delivering the high-bandwidth track until upstream content arrives** vs Absolute Joining FETCH which terminates the old track immediately; for up-switch suggests SUBSCRIBE+Absolute Joining FETCH with delayed-close of the low-bandwidth track as a make-before-break strategy. **Critically, the chair doesn't commit to a position** (*"I don't have strong opinions, but I do think the trade-off analysis here is correct"*) — leaves room for the May 26 show-of-hands to drive the disposition. **[[will-law|Will Law]] votes Yes/Yes/Yes/Yes** on DTS+SWITCH adoption + integration ([archive](https://mailarchive.ietf.org/arch/msg/moq/-hu1KQLMI3emEtpG6xoCbn_dUmA/) May 26 17:50 UTC) — first explicit on-list vote from a SWITCH co-author (Will Law co-authored SWITCH PR #1378 with [[gwendal-simon|Gwendal Simon]] + Ali Begen + Zafer Gürel). **[[mo-zanaty|Mo Zanaty]] endorses both filter consensus calls** May 27 00:31-01:00 UTC: *"I support Object Range Filters in MOQT"* ([archive](https://mailarchive.ietf.org/arch/msg/moq/BQU-RTLoJrZ775mtTByalnO7HSE/)) + *"I'm very keen to hear, discuss, and resolve any technical concerns... My primary concern is finalizing the desired behavior, regardless of whether this lands in MOQT or an extension"* on Track Filters/Top-N ([archive](https://mailarchive.ietf.org/arch/msg/moq/flfZgx5zQp4CM7YJq8WUI8YKH9k/)). **Continues the Cullen-Mo "more filters less of everything else" convergence pattern**. Combined with Will Law's same-day yes-vote and Martin Duke's chair analysis, the **May 26 interim window will have to resolve a "filters vs SWITCH/DTS vs make-before-break vs MSF/CMSF" agenda-priority tension** that the May 21 final agenda already had pre-baked. **Structural significance**: this is the chair (Martin Duke) doing **active substance contribution to consensus, not just procedural facilitation** — the moq-wg's chair-cadence has now matured from "schedule and moderate" (Apr-May 2026) to "scheduling + interim outcomes + technical position-taking" (late May 2026).
>
> **2026-05-26 note**: **[[martin-duke|Martin Duke]] schedules June 22 + July 6 virtual interims** in the [Upcoming Virtual Interims mailing-list message](https://mailarchive.ietf.org/arch/msg/moq/v9HTExYYS9GnP0nzmxAY3WQM3Qc/) May 25 17:44 UTC. **Both 16:30–18:00 UTC**, between London (June 9-12) and Vienna IETF. Feedback deadline **June 8** — *"the day before London begins"*. **First post-London interim cadence announcement**. The cascading consensus-call deadlines (May 26 Object Filters close + DTS/SWITCH show-of-hands → June 4 DTS/SWITCH close → June 5 Filters close → June 11-12 London formal) all close before June 22, making **June 22 the first interim after all four consensus calls** are resolved. The 6-week London → June 22 → July 6 → Vienna cadence mirrors the Apr 27 (interim-14) → May 26 (interim-16) two-interims-in-the-gap pacing.
>
> **2026-05-25 note**: **[[cullen-jennings|Cullen Jennings]] (Cisco)** publishes [the first agenda-skeptic letter](https://mailarchive.ietf.org/arch/msg/moq/-k2a8R7dGz0AhlwO2MsQfaZOz3c/) on the May 21 final London agenda May 24 14:27 UTC — *"I do not think we will make any progress with this agenda. Every topic on it does not have enough time for any meaningful discussion to resolve the issues."*; recommends *"pick a limited set of important topics that needs face to face time and finish them"*; identifies **filters / top N** as his London priority. Aligns with [[mo-zanaty|Mo Zanaty]]'s dominant Object Filters mailing-list voice (3-of-4 messages May 23-24). Two senior contributors converging on *"more filters, less of everything else"* within 48 hours of the final agenda publication. If [[martin-duke|Martin Duke]] concedes agenda repacking after the May 26 interim, the targets are afrind's 180-min MOQT-issues block and Will Law's 35-min MSF/CMSF slot.

# Upcoming Meetings

| Meeting | Date | Agenda Notes |
|---------|------|-------------|
| **interim-2026-moq-15** | **2026-05-11** | |
| **interim-2026-moq-16** | **2026-05-26** | **SWITCH/DTS show-of-hands meeting** — [[martin-duke\|Martin Duke]] May 21 17:19 UTC: *"almost the entire balance of Tuesday's meeting will be given to Gwendal and Will to discuss SWITCH and DTS"*; chairs will *"take the last 15 minutes for a series of Show of Hands to supplement [the SWITCH/DTS] consensus call"*. ([archive](https://mailarchive.ietf.org/arch/msg/moq/fTAIZlLWEU16uNOwDDZwxyPxY3w/)) |
| **Consensus call on Object filters** | **opens 2026-05-12, closes 2026-05-26** | Magnus Westerlund (MOQ chair) May 12 11:42 UTC ([archive](https://mailarchive.ietf.org/arch/msg/moq/0t2uLOX8tngykpe-L4DjeQH7fm0/)) — re: [PR #1518](https://github.com/moq-wg/moq-transport/pull/1518) Object Filters as optional-with-max-count-signalling in MOQT. **4-message afrind↔Mo Zanaty thread May 22-23** clarified PR text already says property filters apply to PUBLISH + Objects; Mo proposes releasing the London Day-1 1015-1020 Track Property Filters slot. |
| **Consensus Call: DTS and SWITCH** | **opens 2026-05-21, closes 2026-06-04** | Martin Duke May 21 17:29 UTC ([archive](https://mailarchive.ietf.org/arch/msg/moq/O0Nw9uiGpDv08ZDksPDvcYUreD0/)). 2 questions × 2 docs ([PR #1378 SWITCH](https://github.com/moq-wg/moq-transport/pull/1378) + [wilaw/dts4moq](https://github.com/wilaw/dts4moq)): (1) WG adopt in some form? (2) If yes, integrate into MOQT or as extension? **Deadline 1 week before London opens.** |
| **Consensus call on filters** | **opens 2026-05-22, closes 2026-06-05** | [[martin-duke\|Martin Duke]] May 22 12:22 UTC ([archive](https://mailarchive.ietf.org/arch/msg/moq/6g0WlQfghKJr4ufgjobT_1Dkrf0/)) — *"merge all the filters into the MOQT draft except for top N, where there were substantial concerns"*. **Layered with Magnus's May 12 call**: Magnus's deals with adoption-at-all (Object Filters optional in MOQT), Martin's deals with required-vs-extension. Cascading deadlines: May 26 (Object Filters close + DTS/SWITCH show-of-hands) → June 4 (DTS/SWITCH close) → June 5 (Filters close) → June 11-12 (London formal). |
| **London interim (in-person, hackathon/interop)** | **2026-06-09 to 2026-06-10** | Cloudflare London office (County Hall / The Riverside Building, Belvedere Road, SE1 7PB). Hackathon / interop days announced by [[mike-english]] on the IETF MoQ list **May 15, 2026** (*"[Moq] London interim June 9-12"*). 09:00–17:00 BST (08:00–16:00 UTC). |
| **interim-2026-moq-08** | **2026-06-11** | London interim, 2 sessions (formal session day 1). **MOQT core-issues track**: Filters (Mo, compressed 35 min), Request Blocking (Alan, 30 min), Concurrent Subscribe (Alan, 10 min), Joining FETCH (Alan, 20 min), Next Interim Planning (Martin, 15 min), Other MOQT Issues (Alan, 120 min). **Make-before-break / RRID design discussion deferred here per Apr 27 interim decision** — folded into Concurrent Subscribe (Issue #1633) slot. |
| **interim-2026-moq-09** | **2026-06-12** | London interim (formal session day 2). **CONDITIONAL on June 4 SWITCH/DTS consensus call outcome** — full Day-2 agenda assumes SWITCH and/or DTS are adopted. Otherwise compressed to Top-N (Mo+Cullen+Suhas) + MSF/CMSF (Will, 20 min) + Privacy Pass (Suhas, 10 min) + Secure Objects (Cullen, 10 min). |
| **interim-2026-moq-10** | **2026-06-12 08:30 UTC** | London interim (formal session day 2) |
| **interim-2026-moq-11** | **2026-06-12 12:30 UTC** | London interim (formal session day 2) |
| **Virtual interim (post-London #1)** | **2026-06-22 16:30–18:00 UTC** | Proposed by [[martin-duke\|Martin Duke]] May 25 ([archive](https://mailarchive.ietf.org/arch/msg/moq/v9HTExYYS9GnP0nzmxAY3WQM3Qc/)). Feedback / objections deadline **June 8** (day before London opens). First interim after the four May-26-to-June-5 consensus calls all close. |
| **Virtual interim (post-London #2)** | **2026-07-06 16:30–18:00 UTC** | Proposed by [[martin-duke\|Martin Duke]] May 25, same feedback deadline. Pre-Vienna IETF slot. |

**London interim registration deadline: Thursday 2026-06-04** — attendees must add name + affiliation to the GitHub wiki by that date so [[mike-english]] can pass names to Cloudflare building security. See [Mike English's May 15 mailing-list message](https://mailarchive.ietf.org/arch/msg/moq/iYxssMkuvIX68SHSZGnn9u3YnOQ/) for the full announcement. Follow-up message with arrival procedures, sign-in instructions, reception timing, and remote-participant details still to come.

## interim-2026-moq-14 Outcomes (held Apr 27 16:30 UTC)

The Apr 27 virtual interim ran the editor agenda. Decisions emerged on GitHub between Apr 27 18:36 UTC and Apr 28 03:43 UTC (mostly recorded by [[ian-swett]] as PR/issue comments):

1. **Required Request ID — REMOVE from draft-18.** [[ian-swett]] Apr 27 18:42 UTC on issue #1603: *"Conclusion was to remove required-request-id from draft 18 and fix Joining Fetch (if necessary?). Those who believe some functionality in this space is useful, such as for make-before-break, should explore those use cases in more detail and further describe what, if any, dependency structure between requests is needed in MoQ. Tentative plan is to discuss these at the London hybrid interim in June."* The three-way fork (status quo / PR #1604 structural / PR #1613 flow control) collapsed to a fourth, simplest option: **delete the field**. **PR #1615** ([[ian-swett]], +3/−52) opened Apr 27 19:48 UTC implements this; [[victor-vasiliev]] APPROVED. Make-before-break work deferred to **London June 11-12**.
2. **Subgroup ID = first Object ID (PR #1608) — needs more iteration.** WG agreement on knowing start Object ID; differing concerns about restriction at Original Publisher; confusion about out-of-order subgroup objects.
3. **PUBLISH_OK removal (PR #1611) — proceed with retarget.** [[ian-swett]] APPROVED with body *"Reminder to retarget this."*
4. **REDIRECT (PR #1534) — APPROVED by [[victor-vasiliev]]** Apr 27 23:01 UTC. Relay-behavior text the Cloudflare/Google alignment loop opened on hasn't yet been pushed.
5. **SUBSCRIBE_NAMESPACE split (PR #1542) — APPROVED, near merge.** Approvals from Suhas, Vasilvv pre-interim; afrind addressed the seven inline comments at Apr 27 05:07–05:13 UTC.
6. **0-RTT / startup latency (PR #1544) — Martin Thomson joins review** at Apr 28 01:46 UTC with substantive rewrite suggestion. Forward-secrecy text removed via Apr 28 01:28 UTC suggestion patch.
7. **REWIND consensus call (Magnus Westerlund's Apr 16 ballot, deadline May 1)** — discussion thread re-erupted on the list with 9 messages Apr 27–28, two camps emerging: **Luke + Ian favor CurrentGroupFill** (the simplest band-aid sketched by Alan Apr 17); **Martin defends best-effort REWIND** with a compromise framing (best-effort floor, allow more aggressive). See [[discussions-2026-04]].

Slack post by [[alan-frindell]] at meeting open: *"Interim starting now. Small number of participants so far..."*

## interim-2026-moq-14 Agenda (Apr 27 16:30 UTC, posted Apr 22)

Posted to datatracker and announced on the MoQ mailing list by [[martin-duke]] on 2026-04-22 19:41 PDT. "It's all editor time." Working items:

1. **PR #1542 / Issue #1458** — Split `SUBSCRIBE_NAMESPACE` and `SUBSCRIBE_TRACKS` with prefix-update capability ([[alan-frindell]]).
2. **PR #1586** — Delta-encode Object ID and Group ID in FETCH responses ([[ian-swett]]).
3. **Issue #1604 / Issue #1602** — Placement of Joining FETCH on the SUBSCRIBE stream (noted as having complications).
4. **PR #1605** — Split `DELIVERY_TIMEOUT` into `OBJECT_DELIVERY_TIMEOUT` and `SUBGROUP_DELIVERY_TIMEOUT` ([[victor-vasiliev|Victor Vasiliev]]); potentially resolves #1476.
5. **PR #1603 / Issue #1519** — Required request ID for draft-17. Now a **three-way fork** after Apr 23–24 activity: (a) keep status quo; (b) PR #1604 moves Joining FETCH onto SUBSCRIBE stream so RRID stops multiplying; (c) PR #1613 ([[alan-frindell]], Apr 23 23:10 UTC) keeps RRID but adds a `MAX_REQUEST_UPDATES` Setup Option for per-stream flow control on REQUEST_UPDATE. Martin Duke's Apr 24 00:42 UTC comment on #1613 accepts the bound argument but flags missing enforcement text.
6. **General discussion** — Whether removing Message Parameters was a mistake.

Remote: https://meetings.conf.meetecho.com/interim/?session=35394 · Alan to post issue slides.

**Apr 24 18:26 PDT (Apr 25 01:26 UTC) update**: [[alan-frindell]] replied to Martin's agenda thread on the mailing list with the slides folder link. Notable line: *"Some content is still pending. Victor will provide updated slides on delivery timeout proposals and request ID alternatives."* — confirms [[victor-vasiliev|Victor Vasiliev]] will present a **competing proposal to RRID** at the interim, complementing Martin's PR #1604 and Alan's PR #1613. Headline agenda items now have published slides for **#1608** (Subgroup ID = first Object ID), **#1519/#1603** (Required Request ID), **#1613** (MAX_REQUEST_UPDATES), **#1605** (delivery timeout split). Time permitting: Joining FETCH Dissent.

## London Interim (June 9-12)

### Final preliminary agenda (Martin Duke, May 21 18:08 UTC)

[**Mailing list archive**](https://mailarchive.ietf.org/arch/msg/moq/RTlJvR6VcT4LGGt2yLRwfgxRAQE/). Chair Martin Duke published the final preliminary agenda May 21 18:08 UTC. Opener: *"We have decided to prioritize core MOQT draft issues and did not have time to meet all the requests. The gaps in the schedule are discussion time for each issue. The agenda for Friday is dependent on the outcome of the SWITCH consensus call ... which just started and concludes on 4 June."*

**Day 1 (June 11 — MOQT core, NOT conditional)**:

| Slot (UTC offset of BST) | Topic | Lead | Min | Reference |
|---|---|---|---|---|
| 0930 | Administrivia | — | 15 | — |
| 0945–1000 | Object Range Filters | Mo | 15 | [PR #1518](https://github.com/moq-wg/moq-transport/pull/1518) |
| 1015–1020 | Track Property Filters | Mo | 5 | [PR #1518](https://github.com/moq-wg/moq-transport/pull/1518) |
| 1030–1045 | Subscription Location Filters | Mo | 15 | [PR #1401](https://github.com/moq-wg/moq-transport/pull/1401) |
| 1100–1130 | Request Blocking | Alan | 30 | [#1519](https://github.com/moq-wg/moq-transport/issues/1519) |
| 1200–1300 | Lunch | — | — | — |
| 1300–1310 | Concurrent Subscribe | Alan | 10 | [#1633](https://github.com/moq-wg/moq-transport/issues/1633) |
| 1330–1350 | Joining FETCH | Alan | 20 | [Joining Fetch Dissent label](https://github.com/moq-wg/moq-transport/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22Joining%20Fetch%20Dissent%22) |
| 1430–1445 | Break | — | — | — |
| 1445–1500 | Next Interim Planning | Martin | 15 | — |
| 1500–1700 | Other MOQT Issues | Alan | 120 | [All issues](https://github.com/moq-wg/moq-transport/issues) |

**Day 2 (June 12 — CONDITIONAL on SWITCH/DTS being incorporated)**:

| Slot | Topic | Lead | Min |
|---|---|---|---|
| 0930–0945 | Interop Report | Mike | 15 |
| 0945–1000 | DOS Design team readout | Mike | 15 |
| 1015–1045 | SWITCH Issues | Gwendal | 30 |
| 1115–1130 | DTS Issues | Will | 15 |
| 1200–1300 | Lunch | — | — |
| 1300–1310 | Top-N DDOS | Cullen | 10 |
| 1320–1335 | Top-N issues | Mo | 15 |
| 1405–1410 | Top-N Implementation | Suhas | 5 |
| 1415–1435 | MSF/CMSF | Will | 20 |
| 1505–1515 | Privacy Pass | Suhas | 10 |
| 1525–1535 | Secure Objects | Cullen | 10 |

**Net request-vs-agenda compression**:

| Requester | Asked | Got | Compression |
|---|---|---|---|
| Mo Zanaty | 135 min | **50 min** | **−63%** |
| Suhas | 55 min | 15 min | −73% |
| Cullen | 50 min | 20 min | −60% |
| Will Law | 105 min | 35 min | −67% |
| afrind | ~240 min | **180 min** | **−25%** |
| Tim Evens (May 21 late) | 15 min | **0 min** | **−100% (DENIED)** |

**Chair pattern**: prioritised **core-MOQT issues (afrind)** at smallest compression (−25%) and structurally compressed implementation/external-format requests (Mo / Suhas / Cullen / Will) at −60% to −73%. The Day-2 agenda is **conditional on June 4 SWITCH/DTS consensus call** — if both DTS+SWITCH go to `/dev/null`, Day 2 collapses to ~3h of Top-N + MSF/CMSF + Privacy Pass + Secure Objects.

### Agenda requests (deadline May 20 closed; extension implicitly declined)

As of 2026-05-21 06:00 UTC, **6 requesters have filed ~585 min total** against the moq-chairs inbox (Cullen's 2 rejected requests both re-filed compliantly):

| Sender | Request | Present | Discuss | Total | Status |
|---|---|---|---|---|---|
| [[suhas-nandakumar\|Suhas]] | Top-N Track Filter Impl Experiences + Privacy Pass Demo | 15+10 | 20+10 | **55min** | format-compliant ([archive](https://mailarchive.ietf.org/arch/msg/moq/KPUj0vVm9NVCu91zngRmOadN9iI/)) |
| [[alan-frindell\|afrind]] | **37 open non-editorial MOQT issues** (Joining FETCH Dissent 60min, Filter consensus, ABR/SWITCH 60min placeholder, **#1519 request blocking 60min**, **#1633 concurrent subs 30min**, remaining 22 issues 1-2h distributed) | varies | varies | **~240min (4h)** | format-compliant; **single largest ask** ([archive](https://mailarchive.ietf.org/arch/msg/moq/-3Fk9OWQR_ME33neQTzhUPMeKdI/)) |
| [[will-law\|Will Law]] (revised) | MSF/CMSF tech decisions + DTS (*"unless resolved May 26"*) | 20+15 | 40+30 | **105min** | format-compliant ([archive](https://mailarchive.ietf.org/arch/msg/moq/pvq02mvPo0gpdPCdd0SVWXooFs0/)) |
| **[[mo-zanaty\|Mo Zanaty]]** (May 21) | **Filter cluster**: Object Range Filters #1518 (30) + Track Property Filters #1518 (15) + **Top-N #1518 (45)** + Subscription Location Filters #1401 re-proposal (30) + LOC update (15) | varies | varies | **135min** | format-compliant; *"likely change after May 26"* ([archive](https://mailarchive.ietf.org/arch/msg/moq/EbuKL1V2DUF8LggkielDbzniuks/)) |
| Cullen Fluffy Jennings (May 20 re-file) | London Agenda - **track filter DDOS** *"DDOS problems with track filter with top N"* — *"major area of concerns"*, offers to consolidate other presenters' concerns into one deck | 10 | 20 | **30min** | NEW ([archive](https://mailarchive.ietf.org/arch/msg/moq/mLsvjUdAJ-VYkoXDId4xLX6TaWE/)) |
| Cullen Fluffy Jennings (May 20 re-file) | **Secure Object** updates + impl progress | 10 | 10 | **20min** | format-compliant re-file ([archive](https://mailarchive.ietf.org/arch/msg/moq/owPxzZ0M8GtnQMIlWrQWsMsnbn4/)) |
| Will Law (May 19 initial — superseded) | same as revised, no present/discuss split | — | — | — | **REJECTED** by Martin Duke ([archive](https://mailarchive.ietf.org/arch/msg/moq/2Vw05JdiSVWPWyRchKofYqCmBw8/)) |
| Cullen (May 19 initial — superseded) | Secure Object updates, no present/discuss split | — | — | — | **REJECTED** by Martin Duke ([archive](https://mailarchive.ietf.org/arch/msg/moq/HfvNHwQGeUU6icZ03QCCi6llZfI/)) |
| Mo Zanaty (May 19) | Deadline extension request May 20 → May 26 | — | — | — | **Implicitly declined** May 20 by Martin Duke: *"I would suggest proactively submitting requests... you can cancel later if needed"* ([archive](https://mailarchive.ietf.org/arch/msg/moq/yLFMnVngcN7vq5JvZerbHCVoQN8/)) |

**Net: ~585 min ≈ 9h45m of formally-requested time** against ~8 hours of formal-session capacity across June 11-12 (interim-2026-moq-08/09/10/11). **~22% oversubscribed** at the deadline; afrind's MOQT issue block alone is ~4h, and the Mo Zanaty + Cullen filter-design cluster adds another 230min directly addressing PR #1518 / PR #1401 / #1633. The chairs will need to compress per-issue time, defer items to follow-up interims (May 26 virtual is the obvious candidate), or rule a chunk out-of-scope.

**Format-strict precedent**: Martin Duke rejected 2 of the first 4 requests (Cullen, Will Law's initial) for not separating presentation vs discussion time. Both resubmitted compliantly within hours. **The May 20 deadline-extension question** (Mo Zanaty May 19) was resolved May 20 via Martin Duke's *"submit-and-cancel-later"* pragmatic compromise — **the May 20 deadline stays in force as policy**, with the chairs accommodating uncertainty by allowing post-deadline cancellation rather than post-deadline filing. **Net regulatory outcome**: format strictness is now the precedent (rejections), but deadline strictness is the *spirit* not the *letter* (cancel-later allowed).

**Filter-design cluster is the structurally top item by allocated time** (Mo Zanaty 135min + Cullen 30min + afrind ~60min in #1633 + Suhas 35min Top-N = **~260 min of London agenda time** dedicated to **PR #1518 / PR #1401 / #1633** consensus). This eclipses the Joining FETCH Dissent block (~60 min) as the WG's biggest single design battle going into London.

**Formal invitation by [[mike-english]] on the IETF MoQ list May 15, 2026** ([archive link](https://mailarchive.ietf.org/arch/msg/moq/iYxssMkuvIX68SHSZGnn9u3YnOQ/)). In-person hybrid interim at **County Hall / The Riverside Building, Belvedere Road, London SE1 7PB** (Cloudflare London office). Mike English's announcement reframes the meeting into a **4-day contiguous in-person window** rather than the previously-tracked "moq-08/09/10/11 across June 11–12" split.

**Schedule (per Mike's May 15 announcement)**:

- **June 9 (Tue)** — hackathon / interop day, 09:00–17:00 BST (08:00–16:00 UTC)
- **June 10 (Wed)** — hackathon / interop day, 09:00–17:00 BST (08:00–16:00 UTC)
- **June 11 (Thu)** — formal session day 1 (moq-08, 2 sessions)
- **June 12 (Fri)** — formal session day 2 (moq-09, moq-10, moq-11; moq-10 at 08:30 UTC, moq-11 at 12:30 UTC)

**Logistics**:

- **Registration deadline**: Thursday **June 4** — names + affiliations on the GitHub wiki for building security.
- **Daily timing**: 09:00–17:00 BST (08:00–16:00 UTC) with a midday break.
- **Follow-up announcement still pending** with arrival procedures, sign-in instructions, reception timing, and remote-participant details (Meetecho).
- **Format similar to** the [[discussions-2026-02|Boulder interim]] in February.

Note: moq-08 through moq-11 are numbered lower but scheduled later because they were registered on the datatracker before the virtual interims.

# Past 2026 Meetings

| Meeting | Date | Notes |
|---------|------|-------|
| **interim-2026-moq-14** | 2026-04-27 16:30 UTC | All-editor virtual interim. **Key decision**: **REMOVE Required Request ID** from draft-18 (PR #1615 by [[ian-swett]], approved by [[victor-vasiliev]]). Make-before-break work deferred to London June interim. Subgroup ID alignment (#1608) needs more iteration. PUBLISH_OK removal (#1611) proceeds. REDIRECT (#1534) approved by Vasilvv. 0-RTT (#1544) drew Martin Thomson into review. See above for full outcomes. |
| interim-2026-moq-13 | 2026-04-13 | REWIND presentation by [[martin-duke]]. **Key decision**: REWIND will NOT go into core v1; editors land minimal band-aids (FETCH timeouts, subgroup filters). Formal consensus call to follow on 3 options (do nothing / extension / PR). Minutes posted Apr 16. Debate on relay vs. client complexity (Cullen Jennings vs. Will Law); Luke Curley + Victor Vasiliev flagged relay complexity risk. |
| interim-2026-moq-12 | 2026-03-30 | Post-IETF 125. Minutes posted by Magnus Westerlund (Apr 9). Included SUBSCRIBE_NAMESPACE split discussion. |
| IETF 125 Shenzhen | 2026-03-14 | 2 WG sessions |
| interim-2026-moq-07 | 2026-02-23 | |
| interim-2026-moq-05/06 | 2026-02-10 | Boulder interim (2 sessions) |
| interim-2026-moq-03/04 | 2026-02-09 | Boulder interim (2 sessions) |
| interim-2026-moq-02 | 2026-01-26 | |
| interim-2026-moq-01 | 2026-01-12 | |

# Where to Find Notes

- **AI-generated minutes**: https://ietfminutes.org/minutes/wg/moq.html (all 2026 meetings through Mar 30)
- **Official notes**: Linked from each meeting page on datatracker, e.g., https://datatracker.ietf.org/meeting/interim-2026-moq-13/session/moq
- **Chat logs**: Zulip at https://zulip.ietf.org/#narrow/channel/304-moq/
- **Video recordings**: Via Meetecho player, linked from meeting pages
- **Meeting materials/slides**: Linked from datatracker meeting pages

# Datatracker Links

- All MOQ meetings: https://datatracker.ietf.org/group/moq/meetings/
- Specific meeting: `https://datatracker.ietf.org/meeting/interim-2026-moq-NN/session/moq`

# Related

- [[discussions-2026-04]] - April discussions
- [[discussions-2026-03]] - March discussions (IETF 125)
- [[discussions-2026-02]] - February discussions (Boulder)
- [[discussions-2026-01]] - January discussions
