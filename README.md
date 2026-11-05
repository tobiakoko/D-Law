# The Law Offices of Osei K. Prempeh, P.A. — website

Single-page marketing site for a Tampa, FL law firm (oseiprempeh.com). It is a **static, pre-rendered** React Router 7 app: no server, no database, no secrets. The consultation form hands a pre-filled email to the visitor's own mail app (`mailto:`).

> **Before launch:** every `TODO(attorney)` in the code is an unverified fact (phone numbers, case results, stats, fees, testimonial consent). See [`TASKS.md` → Client inputs needed](TASKS.md#client-inputs-needed--blockers-for-launch-collected-here). Do not ship with any left.

## Stack

React Router 7 (framework mode, `ssr: false` + `prerender: ["/"]`) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Vite · `lucide-react` · self-hosted fonts (Cinzel, Playfair Display, Plus Jakarta Sans — OFL). Node 20+ (`.nvmrc`), npm.

## Run it

```bash
nvm use            # Node from .nvmrc
npm install
npm run dev        # http://localhost:5173
```

| Command                | What it does                                                             |
| ---------------------- | ------------------------------------------------------------------------ |
| `npm run typecheck`    | `react-router typegen && tsc` — must be green before every commit        |
| `npm run lint`         | ESLint (TypeScript + React Hooks)                                        |
| `npm run format`       | Prettier (CI runs `format:check`)                                        |
| `npm test`             | Vitest unit tests (state machines, mailto builder)                       |
| `npm run test:e2e`     | Playwright smoke test against the production build (desktop + mobile)    |
| `npm run build`        | Production build; pre-renders `/` into `build/client/index.html`         |
| `npm run preview`      | Serve `build/client/` locally                                            |

First time running e2e: `npx playwright install chromium`.

## Deploy

Static hosting only: upload **`build/client/`** (Vercel / Netlify / Cloudflare Pages: build `npm run build`, output `build/client`). Confirm the deployed page contains real content:

```bash
curl -s https://www.oseiprempeh.com/ | grep -o "Immigration Law"
```

Set security headers at the host (`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, a `'self'` CSP). Full checklist: [`BUILD.md`](BUILD.md) §7 and §9.

## Where things live

```
app/
├── root.tsx            html shell, font preload, theme CSS variables on <html>
├── routes/layout.tsx   Navbar + <main> + Footer + MobileBottomBar + the modal host
├── routes/home.tsx     composes the page sections; meta() + JSON-LD
├── sections/           page sections (Hero, PracticeAreas, FaqSection, …)
├── components/         Modal (shared accessible dialog), ConsultationModal, …
├── context/ThemeContext.tsx   frozen single theme
├── data/firm.ts        ALL firm content — the single source of truth
├── data/structuredData.ts     schema.org LegalService/Attorney from firm.ts
├── lib/navigate.ts     tiny browser navigation wrapper (mockable in tests)
└── app.css             Tailwind tokens, @font-face, reduced-motion guard
```

## Updating content (`app/data/firm.ts`)

Every phone number, address, stat, practice area, testimonial, case result, fee plan and FAQ lives in `app/data/firm.ts`. Components never hardcode facts.

- **Contact details:** edit `CONTACT_INFO`. `phoneTel`/`cellTel` must be E.164 (`+18138795919`). `cell`/`fax` are hidden while `null`.
- **Claims:** case results, counts and fee terms must be verifiable (Florida Bar advertising rules). Remove the `TODO(attorney)` marker only once the attorney confirms the value.
- **Disclaimers:** `LEGAL_NOTICES` (results, testimonials, advertising, form notice).

## Reusing this as a template

The codebase is meant to be re-skinned for other small businesses:

1. Replace the content in `app/data/firm.ts` (and `public/` icons + `og-image.png`).
2. Pick or add a palette in `THEME_CONFIGS` and set `ACTIVE_THEME_ID`. Colors flow to Tailwind tokens (`bg-brand`, `text-accent`, `text-accent-ink`, …) through CSS variables, so no component changes are needed. Keep `accentInk` at ≥ 4.5:1 contrast on white.
3. Swap fonts in `app/assets/fonts` + the `@font-face` block in `app/app.css`.

## The consultation form

`ConsultationModal` builds a `mailto:` link (`buildConsultationMailto`) with every field in the subject/body and opens it. The site never receives the data, so the confirmation screen tells the visitor to **press Send** in their mail app, and the phone/email fallbacks are always visible.

**Upgrade path (guaranteed delivery):** if the firm wants submissions even from visitors without a mail client, swap the body of `handleSubmit` for a POST to a hosted form service (Formspree / Web3Forms / Netlify Forms). Put its _public_ endpoint in `.env` as `VITE_CONTACT_FORM_ENDPOINT` (see `.env.example`), keep the `status` union (`editing | sent | error`), and update the confirmation copy to match what is actually guaranteed. Keep the "no attorney-client relationship" notice.

## Working on this repo

Project rules, constraints and the task plan are in [`CLAUDE.md`](CLAUDE.md), [`CONVENTIONS.md`](CONVENTIONS.md), [`TASKS.md`](TASKS.md) and [`BUILD.md`](BUILD.md). CI (`.github/workflows/ci.yml`) runs typecheck → lint → format → unit tests → build → prerender SEO grep → `npm audit` → Playwright on every PR.
