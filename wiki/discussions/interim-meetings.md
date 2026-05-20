---
title: "Interim Meetings Schedule"
tags: [meetings, schedule, ietf]
date: 2026-04-10
last_updated: 2026-05-20
status: current
---

# Upcoming Meetings

| Meeting | Date | Agenda Notes |
|---------|------|-------------|
| **interim-2026-moq-15** | **2026-05-11** | |
| **interim-2026-moq-16** | **2026-05-26** | |
| **London interim (in-person, hackathon/interop)** | **2026-06-09 to 2026-06-10** | Cloudflare London office (County Hall / The Riverside Building, Belvedere Road, SE1 7PB). Hackathon / interop days announced by [[mike-english]] on the IETF MoQ list **May 15, 2026** (*"[Moq] London interim June 9-12"*). 09:00–17:00 BST (08:00–16:00 UTC). |
| **interim-2026-moq-08** | **2026-06-11** | London interim, 2 sessions (formal session day 1). **Make-before-break / RRID design discussion deferred here per Apr 27 interim decision.** |
| **interim-2026-moq-09** | **2026-06-12** | London interim (formal session day 2) |
| **interim-2026-moq-10** | **2026-06-12 08:30 UTC** | London interim (formal session day 2) |
| **interim-2026-moq-11** | **2026-06-12 12:30 UTC** | London interim (formal session day 2) |

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

### Agenda requests (deadline May 20 — Mo Zanaty asks for extension to May 26)

As of 2026-05-20 06:00 UTC, **6 distinct requests** have been filed against the moq-chairs inbox:

| Sender | Request | Present | Discuss | Total | Status |
|---|---|---|---|---|---|
| [[suhas-nandakumar\|Suhas]] | Top-N Track Filter Impl Experiences + Privacy Pass Demo | 15+10 | 20+10 | **55min** | format-compliant ([archive](https://mailarchive.ietf.org/arch/msg/moq/KPUj0vVm9NVCu91zngRmOadN9iI/)) |
| [[alan-frindell\|afrind]] | **37 open non-editorial MOQT issues** (Joining FETCH Dissent 60min, Filter consensus, ABR/SWITCH 60min placeholder, **#1519 request blocking 60min**, **#1633 concurrent subs 30min**, remaining 22 issues 1-2h distributed) | varies | varies | **~4+ hours** | format-compliant; **single largest ask** ([archive](https://mailarchive.ietf.org/arch/msg/moq/-3Fk9OWQR_ME33neQTzhUPMeKdI/)) |
| [[will-law\|Will Law]] (revised) | MSF/CMSF tech decisions + DTS (*"unless resolved May 26"*) | 20+15 | 40+30 | **105min** | format-compliant ([archive](https://mailarchive.ietf.org/arch/msg/moq/pvq02mvPo0gpdPCdd0SVWXooFs0/)) |
| [[will-law\|Will Law]] (initial) | same topics, no present/discuss split | — | — | — | **REJECTED** by Martin Duke ([archive](https://mailarchive.ietf.org/arch/msg/moq/2Vw05JdiSVWPWyRchKofYqCmBw8/)) |
| Cullen Fluffy Jennings | Secure Object updates + impl progress | — | — | 20min | **REJECTED** by Martin Duke ([archive](https://mailarchive.ietf.org/arch/msg/moq/HfvNHwQGeUU6icZ03QCCi6llZfI/)) |
| Mo Zanaty | **Deadline extension request** May 20 → May 26 (cites pending consensus calls) | — | — | — | procedural — awaiting chair decision ([archive](https://mailarchive.ietf.org/arch/msg/moq/1WRfzo5eJwmUWNU-bg-sH2eEHX0/)) |

**Net: ~6+ hours of formally-requested time** against ~8 hours of formal-session capacity across June 11-12 (interim-2026-moq-08/09/10/11). **Already over-subscribed**; afrind's MOQT issue block alone is the single largest sub-request and would consume a full day if granted. The chairs will need to compress per-issue time, defer issues to follow-up interims, or accept Mo Zanaty's deadline extension.

**Format-strict precedent**: Martin Duke rejected 2 of the first 4 requests (Cullen, Will Law's initial) for not separating presentation vs discussion time. Both resubmitted compliantly within hours; Will Law's revised request landed at 17:00 UTC. This **establishes a precedent for procedural rigor** that may bear on the May 26 IETF 126 agenda-submission window also.

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
