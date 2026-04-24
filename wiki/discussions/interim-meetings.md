---
title: "Interim Meetings Schedule"
tags: [meetings, schedule, ietf]
date: 2026-04-10
last_updated: 2026-04-25
status: current
---

# Upcoming Meetings

| Meeting | Date | Agenda Notes |
|---------|------|-------------|
| **interim-2026-moq-14** | **2026-04-27** 16:30 UTC | [Agenda](https://datatracker.ietf.org/doc/agenda-interim-2026-moq-14-moq-01/) posted Apr 22 — "all editor time" ([[martin-duke]]). See below. |
| **interim-2026-moq-15** | **2026-05-11** | |
| **interim-2026-moq-16** | **2026-05-26** | |
| **interim-2026-moq-08** | **2026-06-11** | London interim, 2 sessions (hackathon day) |
| **interim-2026-moq-09** | **2026-06-12** | London interim |
| **interim-2026-moq-10** | **2026-06-12 08:30 UTC** | London interim |
| **interim-2026-moq-11** | **2026-06-12 12:30 UTC** | London interim |

## interim-2026-moq-14 Agenda (Apr 27 16:30 UTC)

Posted to datatracker and announced on the MoQ mailing list by [[martin-duke]] on 2026-04-22 19:41 PDT. "It's all editor time." Working items:

1. **PR #1542 / Issue #1458** — Split `SUBSCRIBE_NAMESPACE` and `SUBSCRIBE_TRACKS` with prefix-update capability ([[alan-frindell]]).
2. **PR #1586** — Delta-encode Object ID and Group ID in FETCH responses ([[ian-swett]]).
3. **Issue #1604 / Issue #1602** — Placement of Joining FETCH on the SUBSCRIBE stream (noted as having complications).
4. **PR #1605** — Split `DELIVERY_TIMEOUT` into `OBJECT_DELIVERY_TIMEOUT` and `SUBGROUP_DELIVERY_TIMEOUT` ([[victor-vasiliev|Victor Vasiliev]]); potentially resolves #1476.
5. **PR #1603 / Issue #1519** — Required request ID for draft-17. Now a **three-way fork** after Apr 23–24 activity: (a) keep status quo; (b) PR #1604 moves Joining FETCH onto SUBSCRIBE stream so RRID stops multiplying; (c) PR #1613 ([[alan-frindell]], Apr 23 23:10 UTC) keeps RRID but adds a `MAX_REQUEST_UPDATES` Setup Option for per-stream flow control on REQUEST_UPDATE. Martin Duke's Apr 24 00:42 UTC comment on #1613 accepts the bound argument but flags missing enforcement text.
6. **General discussion** — Whether removing Message Parameters was a mistake.

Remote: https://meetings.conf.meetecho.com/interim/?session=35394 · Alan to post issue slides.

## London Interim (June 11-12)

In-person interim at **County Hall / The Riverside Building, Belvedere Road, London SE1 7PB**. Four sessions across two days, similar in format to the [[discussions-2026-02|Boulder interim]] in February.

- **June 11** (moq-08): 2 sessions — likely hackathon/interop day
- **June 12** (moq-09, moq-10, moq-11): 3 working sessions (moq-10 at 08:30 UTC, moq-11 at 12:30 UTC)
- **Remote participation**: Meetecho (details TBD)
- Note: moq-08 through moq-11 are numbered lower but scheduled later because they were registered on the datatracker before the virtual interims.

# Past 2026 Meetings

| Meeting | Date | Notes |
|---------|------|-------|
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
