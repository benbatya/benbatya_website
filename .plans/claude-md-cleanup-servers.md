# Add post-merge server cleanup to the workflow

## Goal

Document in `CLAUDE.md` that after a PR is merged, any demo/dev server processes
started during the work must be stopped, so they don't keep consuming compute
resources.

## Approach

Add a new numbered step to the "Development workflow (required)" list, after the
merge step, instructing that leftover demo servers (e.g. the Vite dev server) be
killed once the PR is merged.
