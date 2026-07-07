# CLAUDE.md

Guidance for working in this repository.

## Development workflow (required)

**Never commit directly to `main`.** `main` is the deployed branch — every push to it
triggers the GitHub Actions workflow that publishes to https://benbatya.com.

For all changes:

1. **Ensure commits land on a branch, not `main`.** Before committing, check the current
   branch with `git branch --show-current`; if it returns `main`, create a branch off it
   first (`git checkout -b <short-descriptive-name>`) so the commit is made there.
2. **Commit** the work on that branch.
3. **Push the branch upstream** (`git push -u origin HEAD`).
4. **Open a pull request** into `main` (`gh pr create --base main`).
5. Merge to `main` **only** via that PR — which is what deploys the site.

Do not push to `main` or fast-forward `main` locally to sneak changes in. If you find
yourself on `main` with uncommitted work, create a branch first and move the work there.
