# Spatial Simulator copy edit

## Goal

Replace the Spatial Simulator section copy on the Simulators case-study page
with the user-supplied revision.

## Approach

Content-only change to `src/pages/XrSimulator.tsx`: swap the three Spatial
Simulator paragraphs for the four new ones. Split the public-release note into
its own paragraph, add the sentence about shared input/forwarding/synthetic-
environment/perf tech, and fix an obvious "as the did" → grammar cleanup.

## Also in this branch: header cleanup

Remove the duplicate "Contact" link from the header nav (`Layout.tsx`) — it
pointed to the same place as the "Get in touch" CTA button. Because that button
is desktop-only (`hidden md:flex`), also add a "Get in touch" button to the
mobile menu so mobile users keep a path to /contact.
