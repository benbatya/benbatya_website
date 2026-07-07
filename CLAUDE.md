# CLAUDE.md

Guidance for working in this repository.

## Development workflow (required)

**Never commit directly to `main`.** `main` is the deployed branch — every push to it
triggers the GitHub Actions workflow that publishes to https://benbatya.com.

For all changes:

1. **Create a branch** off `main` before making any edits
   (e.g. `git checkout -b <short-descriptive-name>`).
2. **Commit** the work on that branch.
3. **Push the branch upstream** (`git push -u origin HEAD`).
4. **Open a pull request** into `main` (`gh pr create --base main`).
5. Merge to `main` **only** via that PR — which is what deploys the site.

Do not push to `main` or fast-forward `main` locally to sneak changes in. If you find
yourself on `main` with uncommitted work, create a branch first and move the work there.
