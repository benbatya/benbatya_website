# Plan: Convert to a personal consulting site (benbatya.com) on GitHub Pages

## Context

The repo currently holds a Google AI-Studio–generated **lead-automation demo**: a single 1,315-line
`src/App.tsx` SPA backed by an Express + Gemini server (`server.ts`) exposing `/api/leads`,
`/api/leads/reset`, and `/api/generate-blueprint`. None of that can run on **GitHub Pages**, which is
static-only. The goal is a professional consulting site for **Benjamin Batya**, positioned as an
**AI + systems** engineer, in a **clean light professional** design, deployed to **benbatya.com** via
GitHub Pages with DNS at **GoDaddy**.

This is effectively a rewrite: remove the backend, add multi-page routing, rebuild the UI in a light
theme, wire the contact form to **FormSubmit** (no backend needed), and add the Pages + custom-domain
deployment plumbing. We reuse the existing Tailwind v4 setup and layout conventions (containers, cards,
badges, font pairing) but recolor from dark to light and fix the ~dozen invalid Tailwind tokens the
Explore pass found (`slate-305`, `rose-450`, `indigo-605/650`, `text-xxs`, undefined `animate-fade-in`,
font-weight `505`).

## Site structure (routes)

- `/` **Home** — hero with AI + systems positioning; **Services/offerings** section; **headshot**;
  selected-projects teaser; **Download résumé** button; CTA to Contact; footer with email/LinkedIn/GitHub.
- `/experience` **Experience** — résumé-based timeline of roles (data below).
- `/xr-simulator` **Meta XR Simulator** — dedicated case-study page (the flagship project).
- `/contact` **Contact** — FormSubmit-backed form with on-page success state.

Other projects (Velo3D, Tensil, Vytronus, LucasArts) appear as **case-study cards** in a "Selected
Projects" section on Home and/or Experience.

## Résumé content to encode (source of truth → `src/data/resume.ts`)

**Benjamin A. Batya** — Senior Software Engineer, 20+ years. Email benjaminbatya@gmail.com ·
LinkedIn linkedin.com/in/benjaminbatya · GitHub github.com/benbatya. BS EECS, UC Berkeley (1997–2001).

Skills — Languages: C/C++ (99–23), TypeScript, React, Rust, Python, C#, Kotlin, Java, Hack, SQL ·
UI/Graphics: Vulkan, OpenGL, WebGL, React, ImGui, Qt/QML, VTK · Platforms: Android, Windows, macOS,
Linux, QNX, Xbox360, PS3, nRF52 · Build/Source: Buck, Skylark, Soong, Make, CMake, Mercurial, Git, Perforce.

Roles:
- **Generation Alpha Transistor** — Technical Consultant (Apr 2026–Jul 2026): PR/AI-eval test infra (−90% duration); redesigned EDA-IC UI.
- **Meta Platforms** — Senior Software Engineer (Feb 2021–Jan 2026): led Meta XR Simulator (XrSim), −50% iteration time; integrated rendering across Metal, Vulkan, DX11, DX12; mentored 8+ engineers.
- **Tensil.io** — Senior Software Engineer (Jun 2020–Nov 2020): in-browser WebAssembly video editor; −50% clip load times via prefetch/cache.
- **Vytronus** — Senior Software Engineer (Sep 2018–Jan 2020): Biarc-algorithm position accuracy to 1 mm.
- **Velo3D** — Software Engineer (Jul 2016–Mar 2018): pre-print system (CAD import, part placement, support generation).
- **LucasArts** — Tools Engineer (Aug 2007–Dec 2009): cut desktop→console iteration from minutes to seconds.

## Implementation

### Dependencies & scripts (`package.json`)
- Rename `"react-example"` → `"benbatya-website"`.
- Add `react-router-dom`. Remove `express`, `dotenv`, `@google/genai`, `@types/express`, `tsx`, `esbuild`.
  Keep `lucide-react` (icons) and optionally `motion` (subtle transitions). Keep Tailwind v4 + Vite plugins.
- Scripts: `dev: vite`, `build: vite build`, `preview: vite preview`, `lint: tsc --noEmit`. Drop the
  esbuild/server bundling step and the `tsx server.ts` dev command.

### Remove backend
- Delete `server.ts` and `.env.example`. Drop all four `/api/*` fetch calls (App.tsx lines ~102, 160, 220, 243).
  The ROI calculator / CRM sandbox / blueprint generator demo sections are removed entirely.

### Routing & SPA fallback (GitHub Pages)
- `src/main.tsx`: mount a `BrowserRouter` (clean URLs). `vite.config.ts` `base: '/'` (custom apex domain
  serves from root) and remove the AI-Studio HMR/`DISABLE_HMR` block.
- GitHub Pages has no SPA rewrite, so add the **404.html fallback**: `public/404.html` + a tiny redirect
  script in `index.html` (the standard `rafgraph/spa-github-pages` snippet) so deep links like
  `/experience` resolve. (Simpler alternative if preferred: `HashRouter`, no 404 file — URLs become `/#/…`.)

### New file layout
- `src/components/Layout.tsx` — sticky light-theme nav (name/logo + links Home · Experience · XR Simulator
  · Contact) and footer (email, LinkedIn, GitHub, year).
- `src/pages/Home.tsx`, `Experience.tsx`, `XrSimulator.tsx`, `Contact.tsx`.
- `src/data/resume.ts` — typed résumé data above; pages render from it.
- `src/App.tsx` — becomes the `<Routes>` table wrapping pages in `Layout`.
- `public/CNAME` (`benbatya.com`), `public/404.html`, `public/resume.pdf` (**user provides**),
  `public/headshot.jpg` (**user provides**), `public/favicon` (optional).

### Styling (light professional)
- `src/index.css`: keep Tailwind v4 `@import "tailwindcss"` + `@theme` font mapping (fix weight typo).
  Define light palette (white/near-white bg, slate ink text, one restrained accent e.g. indigo-600).
  Reuse existing container (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`), card (`rounded-2xl border shadow`),
  and badge/eyebrow (`font-mono uppercase tracking-wider`) conventions, recolored for light.
- `index.html`: real `<title>` ("Benjamin Batya — AI & Systems Engineering Consultant"), meta description,
  Open Graph/Twitter tags, favicon link.

### Contact form (FormSubmit)
- `Contact.tsx` posts to the AJAX endpoint `https://formsubmit.co/ajax/benjaminbatya@gmail.com` via
  `fetch` so the user stays on-page; render a success state (reuse the existing success-card pattern).
  Hidden fields: `_subject`, `_captcha: true`, `_honeypot` (spam trap), `_template: table`.
- Note the **first real submission triggers a FormSubmit activation email** that must be confirmed once.
  Optionally switch to FormSubmit's random **alias** endpoint afterward to keep the raw email out of the HTML.

### Deployment — GitHub Actions (`.github/workflows/deploy.yml`)
- Trigger on push to the working branch (later `main`). Steps: checkout → setup-node → `npm ci` →
  `npm run build` → `actions/upload-pages-artifact` (path `dist`) → `actions/deploy-pages`. Grant
  `permissions: pages: write, id-token: write`.
- One-time repo config: **Settings → Pages → Source = GitHub Actions**; then set **Custom domain =
  benbatya.com** (writes/uses `public/CNAME`) and enable **Enforce HTTPS** once the cert is issued.

## GoDaddy DNS + go-live steps (instructions for the user)

1. GoDaddy → **My Products → Domain (benbatya.com) → DNS → Manage DNS**.
2. Delete GoDaddy's default parked `A @ → 3rd-party IP` record and any forwarding.
3. Add four **A** records, host `@`, pointing to GitHub Pages:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
4. (Recommended) Add four **AAAA** records, host `@`:
   `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
5. Add a **CNAME** record, host `www` → `benbatya.github.io`.
6. In GitHub **Settings → Pages**, set custom domain `benbatya.com`, wait for the DNS check to pass, then
   tick **Enforce HTTPS** (cert issuance can take up to ~24 h; usually much faster).
7. Verify: `dig benbatya.com +short` shows the four GitHub IPs; `https://benbatya.com` loads the site;
   `https://www.benbatya.com` redirects to the apex.

## Verification

- Local: `npm run dev`, click through `/`, `/experience`, `/xr-simulator`, `/contact`; hard-refresh a deep
  route to confirm the 404 fallback; submit the contact form (expect the FormSubmit activation email first).
- `npm run lint` (`tsc --noEmit`) clean; `npm run build` succeeds; `npm run preview` serves `dist` and
  `dist/CNAME` + `dist/404.html` exist.
- After deploy: confirm the Actions run is green, the Pages URL renders, then the custom domain resolves
  over HTTPS.

## Needs from the user
- **Headshot** image and **résumé PDF** (drop into `public/`), optional favicon.
- Confirm the contact email (default benjaminbatya@gmail.com) and complete the FormSubmit activation click.
- GoDaddy DNS access to apply the records above; GitHub repo admin to set Pages source + custom domain.

## Open choice
- Clean URLs via **404.html fallback** (recommended, prettier) vs **HashRouter** (`/#/…`, zero fallback
  config). Plan assumes the 404.html approach; trivial to switch.
