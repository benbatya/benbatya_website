# Add the Spatial Simulator to the XR Simulator case study

## Goal

Expand the XR Simulator case-study page to cover the Spatial Simulator, a
companion platform Benjamin led at Meta, using the details from his résumé and
notes.

## Key facts to convey

- An Android system image for iterating on Spatial SDK and Platform SDK apps on
  the desktop.
- Ran the real Android native application inside a QEMU VM container, at native
  speed.
- Designed to support development at the API layer.
- Reused the tools and concepts from the XR Simulator.
- A highly stripped-down version (without Spatial SDK API support) was released
  publicly:
  https://developers.meta.com/horizon/documentation/android-apps/spatial-sim-overview/

## Approach

Content-only change to `src/pages/XrSimulator.tsx`:

- Add a dedicated "Spatial Simulator" section (card) between Impact and the
  closing CTA, with two explanatory paragraphs, tech tags, and a link to the
  public overview.
- Trim the existing "Meets developers in their engine" highlight so it no longer
  duplicates the Spatial Simulator mention now covered in depth by the new
  section.
- Import the `ExternalLink` icon for the outbound link.

## Shipped (final)

The Simulators case-study page (`src/pages/XrSimulator.tsx`) was substantially
reworked in this branch:

- Retitled "Meta XR Simulator" → "Meta Simulators"; hero intro now covers both
  simulators, with a dedicated "XR Simulator" subsection (iteration cut, ~9,000
  MAU, Unity/Unreal/Godot) and a link to the XR Sim intro docs under it.
- Route slug `/xr-simulator` → `/simulators`; nav label → "Simulators"; all
  internal links (App, Layout, Home, Experience) repointed.
- Added a "Spatial Simulator" section (problem + QEMU/Android-system-image
  design + Android Studio push/debug + public-release link).
- Added "What I built" items: Input Forwarding (#5) and Synthetic Environment
  Server (#6). SES is a text-only bullet — the hero-room screenshots were
  intentionally omitted (they appear to be Meta's assets), with the room names
  folded into the prose instead.
- Reordered Impact above "What I built"; wrapped "The problem" and "What I built"
  in bordered cards; converted the "What I built" numbered list to bullets;
  added Monitor/HandFist/Hammer icon badges; aligned the Impact paragraph with
  "The problem".

## Follow-on changes (same branch)

Since the page now covers both simulators, it was reframed:

- Page title changed from "Meta XR Simulator" to "Meta Simulators"; the intro
  paragraph now introduces both the XR Simulator and the Spatial Simulator as
  desktop tools for iterating on and debugging XR apps.
- Route slug changed from `/xr-simulator` to `/simulators`, with the nav label
  updated to "Simulators" and all internal links (Home, Experience, nav)
  repointed. The internal `project.slug` data key is left as `xr-simulator`
  (not user-facing). The component file remains `XrSimulator.tsx`.
