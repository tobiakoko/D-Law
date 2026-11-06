# BUILD.md — Build, Run, Verify & Deploy

> How to set up, run, build, and verify the Osei K. Prempeh, P.A. website (React Router 7, static + pre-rendered). Read `CLAUDE.md` first for project rules.

---

## 1. Prerequisites

- **Node.js 20 LTS** (pinned in `.nvmrc`). Use `nvm use` to match.
- **npm** (bundled with Node). Do not switch package managers.
- No database, no API keys, no `.env` secrets are required to run or build this site. (If a hosted form service is adopted *later*, one public form ID would go in `.env` — not now; the form uses `mailto:` with no secrets.)

```bash
node -v   # v20.x
nvm use   # reads .nvmrc
```

---

## 2. Install

```bash
npm install
```

After install, verify a clean baseline:

```bash
npm run typecheck   # must be GREEN (delete app/welcome & app/components/content.tsx first if migrating — see TASKS.md T0)
npm audit --omit=dev   # should report 0 vulnerabilities after the undici patch
```

---

## 3. Develop

```bash
npm run dev
```

- Serves at `http://localhost:5173` (React Router dev server) with HMR.
- Edit files under `app/`. Routes are defined in `app/routes.ts`.
- The one page is composed in `app/routes/home.tsx`; the shell (Navbar/Footer/modals) is in `app/routes/layout.tsx`.

---

## 4. Type-check, lint, test (run before every commit)

```bash
npm run typecheck   # react-router typegen && tsc  — ZERO errors required
npm run lint        # eslint .                     — ZERO errors required
npm run test        # vitest run                   — all pass
npm run test:e2e    # playwright test (smoke)      — passes
```

> If `typecheck` fails with `Cannot find module '~/components/ui/...'` you are still on the old dead `content.tsx` — delete it (TASKS.md T0).

---

## 5. Production build (static + pre-rendered)

```bash
npm run build
```

Expected behavior with `react-router.config.ts` set to `ssr: false` + `prerender: ["/"]`:

- Vite builds the client bundle into `build/client/`.
- React Router **pre-renders** route `/` to a **fully-populated** `build/client/index.html`.
- The console prints `SPA Mode: Generated build/client/index.html` (or the prerender equivalent).

**Verify the prerender actually worked (this is the SEO gate):**

```bash
# the built HTML must contain real content, not an empty shell:
grep -o "Osei K. Prempeh" build/client/index.html | head -1     # firm name present
grep -o "Immigration Law" build/client/index.html | head -1      # a practice area present
# the real phone number (once confirmed) should appear too:
grep -o "(813)" build/client/index.html | head -1
```

If those greps return nothing, the page is shipping an empty shell — the prerender is misconfigured. Do **not** deploy until it passes. (This was the #1 SEO problem in the audit.)

**Preview the production build locally:**

```bash
npm run preview   # or: npx serve build/client
```

Open the previewed URL and confirm: hero renders, practice areas render, the "Schedule Consultation" button opens the modal, the modal closes on Escape, and the phone/email links work.

---

## 6. `react-router.config.ts` (authoritative content)

```ts
import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: ["/"],   // emit fully-rendered static HTML for the one route (SEO)
} satisfies Config;
```

Do **not** re-enable the server start path. The old repo shipped a `Dockerfile` that ran `react-router-serve ./build/server/index.js`, which an `ssr:false` build deletes — it crashes on boot. If a `Dockerfile` exists, delete it or replace it with a static file server (nginx/caddy serving `build/client` with SPA fallback).

---

## 7. Deploy

This is a **static site**. Deploy the contents of `build/client/`.

- **Vercel / Netlify / Cloudflare Pages:** connect the repo; build command `npm run build`; output directory `build/client`. Add an SPA fallback (serve `index.html` for unknown routes) — though with one prerendered route this rarely matters.
- **Any static host / CDN / S3+CloudFront:** upload `build/client/`.
- **Security headers** (set at the host, since there's no server): add
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  and a conservative `Content-Security-Policy` allowing `'self'` + your self-hosted font/image origins. (With fonts self-hosted and no third-party scripts, CSP stays simple.)
  **On Vercel these are already in `vercel.json`.** The CSP allows `'unsafe-inline'` for scripts because React Router's prerendered hydration scripts are inline and change every build; nothing loads from other origins. Check after deploy: `curl -sI https://www.oseiprempeh.com/ | grep -i content-security-policy`.

**Post-deploy smoke check:**
```bash
curl -s https://www.oseiprempeh.com/ | grep -o "Immigration Law"   # real content served
```
If this is empty in production, the deployed build is not the prerendered one.

---

## 8. Common issues

| Symptom | Cause | Fix |
|---|---|---|
| `typecheck` fails on `~/components/ui/*` | old dead `content.tsx` still present | delete it (TASKS.md T0) |
| Built `index.html` is nearly empty | `prerender` not set | add `prerender: ["/"]` to config |
| Fonts flash/missing | Google CDN removed but no self-hosted `@font-face` | add `.woff2` + `@font-face` in `app.css`, preload in `root.tsx` |
| Container exits immediately | leftover server Dockerfile vs `ssr:false` | delete/replace Dockerfile (§6) |
| `npm audit` shows undici criticals | transitive via `@react-router/node` | `npm audit fix` / bump React Router |
| Form "submits" but firm gets nothing | still on the AI-Studio fake-confirm handler | wire `mailto:` (INSTRUCTIONS §5) |

---

## 9. Release checklist (gate before going live)

- [ ] `npm run typecheck` green
- [ ] `npm run lint` green
- [ ] `npm run test` + `npm run test:e2e` pass
- [ ] `npm run build` succeeds and prerendered `index.html` contains real content (§5 greps)
- [ ] `npm audit --omit=dev` clean
- [ ] No `TODO(attorney)` markers left for contact info or legal claims (phone numbers confirmed; stats/dollar figures verified or replaced; results disclaimer present)
- [ ] Consultation form opens the visitor's mail client pre-filled; confirmation copy is honest; tel/email fallbacks present; no false privilege claim
- [ ] Fonts self-hosted; no Google Fonts CDN
- [ ] No `@google/genai`/`express`/`dotenv`/`motion`; no `.aistudio`/`metadata.json`
- [ ] Modals + mobile nav: focus trap, Escape, `aria-modal`, scroll-lock, focus restore
- [ ] JSON-LD `LegalService` present; `meta()` title/description correct (no "Counselot" typo)
- [ ] Security headers configured at host
