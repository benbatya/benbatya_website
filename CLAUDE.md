# CLAUDE.md

Guidance for working in this repository.

## Development workflow (required)

**Never commit directly to `main`.** `main` is the deployed branch — every push to it
triggers the GitHub Actions workflow that publishes to https://benbatya.com.

For all changes:

1. **Plan first.** Before starting a new feature or task, create a plan file in `.plans/`
   (e.g. `.plans/<short-descriptive-name>.md`) describing the goal, approach, and the
   changes you intend to make. This is the start of the papertrail for the work.
2. **Ensure commits land on a branch, not `main`.** Before committing, check the current
   branch with `git branch --show-current`; if it returns `main`, create a branch off it
   first (`git checkout -b <short-descriptive-name>`) so the commit is made there.
3. **Commit** the work on that branch.
4. **Push the branch upstream** (`git push -u origin HEAD`).
5. **Open a pull request** into `main` (`gh pr create --base main`).
6. **Finalize the plan before merging.** Before the PR is merged, update the plan file in
   `.plans/` to document all of the submitted changes (what actually shipped, not just
   what was intended). Then update the PR summary to summarize the change and reference
   the plan file, so every merged PR points back to its plan.
7. Merge to `main` **only** via that PR — which is what deploys the site.

Do not push to `main` or fast-forward `main` locally to sneak changes in. If you find
yourself on `main` with uncommitted work, create a branch first and move the work there.

**Why:** Every feature gets a plan file in `.plans/` and a PR that references it, creating
a durable papertrail so each change going into the repo can be tracked from intent through
to what was actually merged.
