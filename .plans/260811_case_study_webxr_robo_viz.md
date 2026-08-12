# Add WebXR Robo Viz as the first case study

## Goal

Prefix the Case Studies page with a new entry for
<https://benbatya.github.io/webxr-robo-viz/> — a link plus a description — so it appears
first, ahead of the OpenStreetMap GPU renderer.

## What shipped

All changes are in `src/pages/CaseStudies.tsx`; no other file needed touching.

- **New first entry, "Robot Recordings in the Headset"** (eyebrow *WebXR · Robotics ·
  Meta Quest*), prepended to the `caseStudies` array ahead of the OpenStreetMap renderer.
  It uses the existing `CaseStudy` shape: `summary` + `body` paragraphs, five
  `highlights`, `tech` tags, `repoUrl` → `https://github.com/benbatya/webxr-robo-viz`,
  `demoUrl` → `https://benbatya.github.io/webxr-robo-viz/`. The demo URL renders as the
  card's existing "Live demo" link, so no component changes were needed.
- **Content sourced from the `benbatya/webxr-robo-viz` README** rather than invented:
  in-headset AR playback of Foxglove MCAP with scrubbing and grab-to-move alignment, the
  Web Worker streaming reader with preload, the Cloudflare Worker relay that fetches only
  selected topics and caches on-device, ROS 1 + protobuf decoding with the Spot URDF posed
  from `/tf` and `/joint_states`, and IWER desktop emulation. Concrete numbers from the
  README (486 MB quadruped recording, 718 MB arm recording opening in ~0.5 s) were kept —
  they carry more weight than adjectives, and match the tone of the other entries.
- **Page intro blurb widened** from "GPU-driven rendering to arbitrary-precision math in
  Rust" to also cover streaming robot data into a headset, since the old framing no longer
  described the leading entry.

## Decisions

- **Icon: `Glasses`, not `Headset`.** lucide-react's `Headset` is the headphones-with-mic
  support icon, not a VR headset — `Glasses` is the conventional AR/XR stand-in and reads
  correctly at the card's 22 px size.
- **Only the case-studies page changed.** The Home page was checked and does not enumerate
  individual case studies, so it needed no parallel edit.
- **No screenshot.** `public/case-studies/` has no asset for this project; `image` and
  `bodyImage` are left unset and the card renders fine without them. Worth adding later.
- Existing entries were left in place and unreordered — the ask was to prefix, not to
  re-rank.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — succeeds (2096 modules, no warnings of note).
- Vite dev server run locally against `/case-studies` to view the new card.
