# Expand Experience page with full career history

## Goal

Flesh out the Experience page using the additional roles in Benjamin's LinkedIn
profile export (`~/Downloads/Profile-2.pdf`). The page currently surfaces only 6
roles; the profile lists the full ~20-year history. Integrate the missing roles
and enrich existing ones so the timeline reflects the depth of experience.

## Approach

All Experience-page content is driven by the `roles` array in
`src/data/resume.ts` (rendered by `src/pages/Experience.tsx` as a vertical
timeline). No component changes are needed — only data.

- Add the missing companies from the profile, in reverse-chronological order.
- Enrich existing roles with detail from the profile where it adds value.
- Keep older / short early-career roles concise (summary + minimal highlights)
  so the timeline stays readable while still showing the full arc.
- Preserve existing dates already sourced from the formal résumé where the
  profile disagrees, to avoid introducing conflicting dates.

## Changes intended

Existing roles enriched: Meta (75%+ code-coverage / XFN detail), Vytronus
(surgical-robotics summary), Velo3D (millions-of-polygons interactive perf).

New roles added: Medical Neural Stimulation (2018), Holo3D (2014–2016), Zynga
(2009–2010), Versamed (2005–2007), Optitex (2005), DPSI (2004–2005), CompuNet.Net
(2003–2004), NuvoStudios (2002), Midway Games (2001–2002).

Scope excludes non-experience profile data (certifications, languages, top
skills) — out of scope for the experience timeline.

## Revision (post-review feedback)

After adding the full history, the timeline was intentionally simplified for
readability:

- Reduced each role to `company` + a single concise summary line. Dropped the
  `title`, `start`, `end`, and `highlights` fields from the `Role` interface,
  the data, and the timeline rendering. Key metrics that only lived in bullets
  (e.g. Meta's 50% iteration cut) were folded into the summary line.
- Changed the Experience heading to "25 years of building impactful software".
- Education entry now reads "Graduated 2001" instead of the attendance range.
