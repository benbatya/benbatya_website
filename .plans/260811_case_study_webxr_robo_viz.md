# Add WebXR Robo Viz as the first case study

## Goal

Prefix the Case Studies page with a new entry for
<https://benbatya.github.io/webxr-robo-viz/> — a link plus a description — so it appears
first, ahead of the OpenStreetMap GPU renderer.

## Approach

- Add a new `CaseStudy` object at the head of the `caseStudies` array in
  `src/pages/CaseStudies.tsx`.
- Source the content from the repo README (`benbatya/webxr-robo-viz`): a WebXR app for
  Meta Quest that plays back Foxglove MCAP recordings in-headset with scrubbing, and
  records headset/controller poses to MCAP.
- `demoUrl` → `https://benbatya.github.io/webxr-robo-viz/` (the live landing page),
  `repoUrl` → `https://github.com/benbatya/webxr-robo-viz`.
- Pick a `lucide-react` icon consistent with the existing entries.
- Update the page intro blurb if the existing "GPU rendering → arbitrary-precision math"
  framing no longer covers the set.

## Out of scope

- No screenshot/image for this entry (nothing in `public/case-studies/` for it yet); the
  `image` fields stay unset unless an asset is supplied.
- No changes to the Home page — it does not list individual case studies.

## Open questions

- Whether to add a screenshot later; the card renders fine without one.
