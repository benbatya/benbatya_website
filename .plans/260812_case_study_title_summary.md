# Retitle and rewrite the summary of the WebXR case study

## Goal

Reword the first case study entry in `src/pages/CaseStudies.tsx` (the WebXR Robo Viz
one, landed in PR #13):

- **Title** → `Robotics Data Replay in Augmented Reality`
- **Summary** → "A WebXR app for Meta Quest that plays back Foxglove robot recordings in
  AR passthrough — walk around the robot, scrub the timeline, and reposition the scene in
  your room. It is a direct overlay of robotic data on top of reality."

## Approach

Two string edits to the first `CaseStudy` object. Nothing structural.

## Notes on the request

- The prompt referred to the current title as "Robot Recordings in the Glasses"; the
  shipped title is **"Robot Recordings in the Headset"** (`Glasses` is the lucide icon
  name, not the title). Same entry either way — retitling as asked.
- The requested summary text is used verbatim except for `ontop` → `on top of`.

## Out of scope

- The technical `body` paragraph, highlights, tech tags, and links stay as they are.
- The other two case studies are untouched.
