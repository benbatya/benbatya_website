# Update experience count to "20+ years"

## Goal
Make the stated years of experience consistent across the site at "20+ years"
instead of "25 years".

## Findings
A site-wide search for experience/years copy showed most locations already read
"20+ years":
- `index.html` (meta description, OG, Twitter cards) — already "20+ years"
- `src/data/resume.ts` — already "20+ years"

Only one location still read "25 years":
- `src/pages/Experience.tsx:13` — page hero headline

(Other "25" matches in the codebase are Tailwind opacity values like `border-white/25`,
not experience counts, and were left unchanged.)

## Changes shipped
- `src/pages/Experience.tsx`: hero headline changed from
  "25 years of building impactful software" to
  "20+ years of building impactful software".
