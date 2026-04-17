# Lucent Lab

An interactive AP Chemistry visual atlas — PhET-quality animations for every Unit 1–9 topic, built with React 19 + TypeScript + Vite.

Live: deploy your own (see below).

## Stack

- React 19 + TypeScript (strict)
- Vite (dev server + build)
- React Router (`/unit/:slug`)
- Pure CSS variables (no Tailwind / no shadcn) — theme tokens in `src/index.css`
- SVG-based animations with `requestAnimationFrame`

## Quick start

```bash
npm install
npm run dev      # local dev with HMR — http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
npm test         # run the math regression suite (Vitest)
```

## Repo layout

```
src/
  animations/     One .tsx per simulation (Titration, Galvanic, PhaseChange, …)
  components/ui/  Shared interaction primitives (Slider, SlideTabs, SpotlightCard, AnimatedCounter, DefinedTerm)
  pages/          LandingPage, UnitPage
  curriculum.ts   1:1 mapping to CollegeBoard CED (units, topics, weights)
  registry.tsx    Topic → animation binding + shared keyTerms
testing/
  TEST_PLAN.md            Manual checklist
  IMPROVEMENT_REPORT.md   Audit + status of fixes (look for **FIXED** markers)
  unit/chemistry.test.ts  Vitest math regressions
PROJECT_CONTEXT.md        Read this first if you are an AI assistant joining this project
```

## Deployment

The build output is a fully static SPA in `dist/`. Because the app uses **client-side routing** (`/unit/atomic-structure`), every host needs a SPA rewrite rule that serves `index.html` for unknown paths — otherwise a hard refresh on a unit URL returns 404.

### Option A — Vercel (recommended, zero config)

1. Push the repo to GitHub.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output dir: `dist`. Leave install command default.
4. Click **Deploy**. Vercel rewrites unknown routes to `index.html` automatically for Vite projects.

To deploy from CLI instead:

```bash
npm i -g vercel
vercel               # first run: link / create project
vercel --prod        # deploy to production
```

### Option B — Netlify

1. Push to GitHub, then import at https://app.netlify.com/start.
2. Build command: `npm run build`. Publish directory: `dist`.
3. Add a SPA rewrite — create `public/_redirects` containing:
   ```
   /*    /index.html   200
   ```
   (Vite copies everything in `public/` into `dist/` at build time.)

CLI alternative:

```bash
npm i -g netlify-cli
netlify deploy --build           # preview deploy
netlify deploy --build --prod    # production
```

### Option C — GitHub Pages

GitHub Pages serves from a subpath like `https://<user>.github.io/lucentLab/`, so the Vite `base` must match.

1. In `vite.config.ts`, set `base: '/lucentLab/'`.
2. In `src/main.tsx` (or wherever `<BrowserRouter>` is), pass `basename="/lucentLab"`.
3. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
4. Install once: `npm i -D gh-pages`.
5. Run: `npm run deploy`. Then in repo Settings → Pages, set source to the `gh-pages` branch.
6. For SPA routing, copy `dist/index.html` to `dist/404.html` after build (Pages serves `404.html` for unknown routes), or add it to the build script:
   ```json
   "deploy": "npm run build && cp dist/index.html dist/404.html && gh-pages -d dist"
   ```

### Option D — Cloudflare Pages

1. https://dash.cloudflare.com → Pages → Create → Connect to Git.
2. Build command: `npm run build`. Output dir: `dist`.
3. SPA rewrites: add `public/_redirects` with `/*  /index.html  200` (same as Netlify).

### Custom domain

All four hosts let you attach a custom domain through their dashboard — point a `CNAME` (or `ALIAS`/`ANAME` for apex) at the host's provided target. TLS is provisioned automatically.

## Contributing animations

Each animation is a self-contained `.tsx` in `src/animations/`. Bind it to a topic in `src/registry.tsx` by setting that topic's `animationKey` to the animation's key — the `UnitPage` will render it once per unit (subsequent topics that share the same key get a "↑ See …" pointer to the first occurrence).

Use the shared UI primitives from `src/components/ui/` for sliders, tabs, cards, and animated readouts so the look stays consistent.
