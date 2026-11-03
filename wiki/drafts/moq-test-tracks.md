---
title: "MOQT Media Test Tracks (moq-test-tracks)"
tags: [draft, individual, interop, testing, media, msf, loc, cmsf]
date: 2026-11-03
last_updated: 2026-11-03
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-marzot-moq-test-tracks/"
---

**draft-marzot-moq-test-tracks-00** | Individual submission | **-00 posted 2026-11-02** (IETF 127 deadline) | 18 pages | expires 2027-05-06 | [Datatracker](https://datatracker.ietf.org/doc/draft-marzot-moq-test-tracks/) · [Editor's copy](https://gmarzot.github.io/draft-marzot-moq-test-tracks/draft-marzot-moq-test-tracks.html)

# Authors
- [[giovanni-marzot|Giovanni Marzot]] (Vivoh)

# Abstract

moq-test-tracks is a **media** counterpart to [[alan-frindell|afrind]]'s `moq-test`. moq-test is the synthetic-payload conformance protocol behind [[moxygen]]'s section-by-section harness (see [[interop-runner]]). In moq-test-tracks, a tester puts the parameters of a set of media tracks into the **Track Namespace**: content, packaging, codecs, resolution, frame rate, catalog format, where the init data goes, group duration, audio delivery, duration and the number of video tracks. Any publisher that implements the protocol can then generate media of that shape without out-of-band coordination. Catalog parsers, packagers, players and relays can be tested against media of a known shape, and results from different publishers can be compared.

# Key Technical Details

- **Namespace = parameters.** An optional deployment prefix comes first, then the tuple field `mtt_00` (protocol and version), then the parameter fields. Fields 0–7 are required and 8–13 optional with defaults. Field values use only `a-z0-9_`, and `_` marks a field that does not apply. Each parameter set has **one shortest namespace**, which publishers must use, so subscribers that ask for the same media share one set of tracks. Example: `example/mtt_00/clock/loc/h264/720/30/aac/2`.
- **Fields**:
  - Content: `clock` (time and frame counter on screen, a 1 kHz beep plus a marker frame each second for A/V-sync checks), `bars`, `noise` (forces the target bitrate), or a deployment-defined clip ID.
  - Packaging: `loc` / `cmaf` (per [[moq-cmsf|CMSF]]) / `locmaf` (see [[moq-locmaf]]).
  - Video codec: `h264` High / `h264cb` Constrained Baseline / `h265` Main / `av1` Main / `none`, encoded without B-frames.
  - Height (180–2160), frame rate (1–120, plus 23_976/29_97/59_94), audio codec `aac` / `opus` (20 ms) / `none` at 48 kHz, and channel count.
  - Catalog: `msf` (with CMSF extensions for CMAF/LOCMAF) or `none`.
  - Init data placement: `catalog` (inline), `track` (VIDEO_CONFIG/AUDIO_CONFIG Track Property) or `object` (property on the first object of each group). CMAF must use `catalog`.
  - Group duration in ms (default 2000, or 2002 at the NTSC rates).
  - Audio delivery: N frames per group on one stream, or `dgram`, one frame per datagram.
  - Duration in seconds (0 = until unsubscribed).
  - Video tracks: `1`, an **`altN` ABR ladder** (each rung at most ¾ the height of the previous one, up to 7 renditions from 2160p), or **`viewN`** multi-view.
- **Tracks**: `catalog`, `video` (`video_1`, `video_2`… for ladders and views) and `audio`. Each video group starts with a key frame and goes on one stream as subgroup 0. Each frame is one object (with CMAF, one chunk). Catalog tracks are live with `targetLatency` 250 ms.

# Relationship to other work

- **Extends `moq-test` from transport to media.** afrind reviewed the draft and is credited in the acknowledgments. On Slack (#moq, Nov-2) he changed his own moq-test implementation so that a namespace can start at any field. Two publishers on one relay can then each announce a moq-test namespace behind a publisher-unique prefix, which mtt_00 already allows. Marzot said he would broaden the draft's distinct-prefix advice to match. afrind also asked how `SUBSCRIBE_NAMESPACE` should behave when the parameter space is effectively infinite. Marzot's view is that namespaces under the prefix don't exist until requested.
- **Exercises the media drafts directly**: [[moq-msf|MSF]] catalog and init-data list, [[moq-cmsf|CMSF]], [[moq-loc|LOC]] VIDEO_CONFIG/AUDIO_CONFIG properties, and [[moq-locmaf|LOCMAF]]. It sits alongside the CMSF test area proposed for the [[interop-runner]] (runner [#180](https://github.com/englishm/moq-interop-runner/pull/180)) and the media-interop work in [[moqlivemock]] and [[warp-player]].

# Notes

Individual submission; **not WG-adopted**. Marzot circulated the editor's copy on Slack on Nov-2 and asked for feedback before submitting the same day. The acknowledgments thank the OpenMOQ team for implementations and test deployments. See [[interop-runner]], [[discussions-2026-11]].

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-marzot-moq-test-tracks/
- **Editor's copy**: https://gmarzot.github.io/draft-marzot-moq-test-tracks/draft-marzot-moq-test-tracks.html
