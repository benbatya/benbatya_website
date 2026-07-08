# Refresh site copy, add About page & sharpen consulting positioning

## Goal
A batch of copy and content refinements to make the site read consistently, land the
"specialist deep-tech consultant" positioning, and feel more personable to visitors
(including non-technical ones) — culminating in a new About page.

## Changes shipped

### Experience count → "20+ years"
- `src/pages/Experience.tsx`: hero headline changed from "25 years of building impactful
  software" to "20+ years…", matching the "20+ years" copy already used in `index.html`
  meta tags and `src/data/resume.ts`.
- (Other "25" matches in the codebase are Tailwind opacity values like `border-white/25`
  and were left unchanged.)

### Experience page wording
- `src/pages/Experience.tsx`: header paragraph changed "…senior software engineer
  **specialized** in…" to "…**skilled** in…" (more general synonym, per request).

### Résumé button labels
- `src/pages/Experience.tsx` and `src/pages/Home.tsx`: résumé buttons relabeled from
  "Download résumé" to "View Resume" (Experience keeps the "(PDF)" suffix).

### Sharpened services / consulting positioning
- `src/data/resume.ts`: rewrote the three `services` descriptions to target specialist,
  deep-tech engagements ("the deep-systems work most teams can't staff in-house", etc.)
  rather than generic work.
- `src/pages/Home.tsx`: services section heading → "Specialist engagements across the
  AI–systems boundary"; subhead now names the target clients (deep-tech, hardware, and
  medical teams; "problems that are too specialized to hire for").

### New About page (personable positioning)
- `src/pages/About.tsx` (new): warm-but-professional first-person page — an intro that
  reframes 20+ years as a story, a "How I work" section (plain language / outcome-focused /
  easy partner) that addresses the "impersonal & daunting" feedback, an "Off the clock"
  personal section (Sausalito; family; biking the Golden Gate Bridge; improv contact
  dancing; Scrabble; solar-roof & plumbing tinkering; sci-fi and tech/Silicon-Valley
  history reading), and a closing CTA.
- `src/App.tsx`: added the `/about` route.
- `src/components/Layout.tsx`: added "About" to the nav.
- `src/pages/Home.tsx`: added a "Who I am" teaser band linking to `/about`.

## Verification
- `npm run lint` (tsc --noEmit) passes clean.
- Changes verified live via the Vite dev server.
