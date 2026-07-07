# benbatya.com

Personal consulting website for **Benjamin Batya** — a static React + Vite single-page app
hosted on **GitHub Pages** at [benbatya.com](https://benbatya.com).

## Stack

- **React 19** + **TypeScript**
- **Vite** (build + dev server)
- **Tailwind CSS v4**
- **React Router** (client-side routing, `BrowserRouter`)
- **FormSubmit** for the contact form (no backend required)

Site content (résumé, roles, projects, skills) lives in a single source of truth:
[`src/data/resume.ts`](src/data/resume.ts).

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint      # type-check with tsc --noEmit
```

## Assets

Profile assets live in [`public/`](public/) and are referenced from
[`src/data/resume.ts`](src/data/resume.ts):

- `public/head_shot.jpg` — profile photo (`headshotUrl`).
- `public/Ben_Batya_Resume.pdf` — the file the "Download résumé" button links to (`resumeUrl`).

To swap either one, replace the file and update the matching URL in `src/data/resume.ts`.

## Contact form (FormSubmit)

The contact form posts to the [FormSubmit](https://formsubmit.co/) AJAX endpoint
(`https://formsubmit.co/ajax/benjaminbatya@gmail.com`) — no server needed. The **first** real
submission triggers a one-time confirmation email to that address; click the link once to
activate. After that, submissions arrive by email.

## Deployment

Deployment is fully automated via **GitHub Actions** → **GitHub Pages**.

### How it works

- The workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every push
  to `main` (and can be triggered manually via **workflow_dispatch**).
- It installs dependencies, runs `npm run build`, uploads `dist/` as a Pages artifact, and
  deploys it with `actions/deploy-pages`.
- [`public/CNAME`](public/CNAME) contains `benbatya.com`; Vite copies it into `dist/` so Pages
  keeps the custom domain on every deploy.
- Because GitHub Pages has no server-side SPA rewrite, [`public/404.html`](public/404.html)
  redirects deep links (e.g. `/experience`) back to the app, and a small snippet in
  [`index.html`](index.html) restores the original path before React mounts
  ([spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique).

### One-time GitHub setup

1. **Settings → Pages → Build and deployment → Source = GitHub Actions.**
2. Push to `main` (or run the workflow manually). The first successful run publishes the site.
3. **Settings → Pages → Custom domain →** enter `benbatya.com` and save. Once the DNS check
   passes, tick **Enforce HTTPS**.

To deploy: **merge to `main`.** The Actions run builds and publishes automatically; check the
**Actions** tab for status.

## Domain: GoDaddy DNS configuration

`benbatya.com` is registered at **GoDaddy**. GitHub Pages serves the apex domain, with `www`
redirecting to it.

In GoDaddy: **My Products → benbatya.com → DNS → Manage DNS**, then:

1. **Remove** GoDaddy's default parked `A @` record and any domain forwarding.
2. Add four **A** records for the apex (`@`) pointing at GitHub Pages:

   | Type | Name | Value           |
   | ---- | ---- | --------------- |
   | A    | @    | 185.199.108.153 |
   | A    | @    | 185.199.109.153 |
   | A    | @    | 185.199.110.153 |
   | A    | @    | 185.199.111.153 |

3. (Recommended, for IPv6) add four **AAAA** records for `@`:

   | Type | Name | Value                |
   | ---- | ---- | -------------------- |
   | AAAA | @    | 2606:50c0:8000::153  |
   | AAAA | @    | 2606:50c0:8001::153  |
   | AAAA | @    | 2606:50c0:8002::153  |
   | AAAA | @    | 2606:50c0:8003::153  |

4. Add a **CNAME** record so `www` redirects to the Pages host:

   | Type  | Name | Value                |
   | ----- | ---- | -------------------- |
   | CNAME | www  | benbatya.github.io   |

### Verify

DNS changes can take up to an hour (occasionally longer) to propagate.

```bash
dig benbatya.com +short        # should list the four 185.199.108–111.153 addresses
dig www.benbatya.com +short    # should resolve via benbatya.github.io
```

Then visit <https://benbatya.com> (and <https://www.benbatya.com>, which should redirect to the
apex). If GitHub's Pages settings show a TLS/DNS warning right after changing records, wait for
propagation and re-run the domain check, then enable **Enforce HTTPS**.
