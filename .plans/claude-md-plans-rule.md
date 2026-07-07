# Plan: Add planning + papertrail rule to CLAUDE.md

## Goal

Ensure every feature or task has a durable papertrail so each change going into the repo
can be tracked from intent through to what was actually merged.

## Approach

Extend the required development workflow in `CLAUDE.md` to require a plan file per feature:

- Before starting a new feature or task, create a plan in `.plans/`.
- Before the PR is merged, update the plan file to document all of the submitted changes.
- Update the PR summary to summarize the change and reference the plan file.

## Submitted changes

- `CLAUDE.md`: added step 1 ("Plan first") and step 6 ("Finalize the plan before merging")
  to the numbered workflow, renumbering the existing branch/commit/push/PR/merge steps
  accordingly, and added a **Why** note explaining the papertrail intent.
- `.plans/claude-md-plans-rule.md`: this plan file, seeding the `.plans/` directory and
  demonstrating the new practice.
