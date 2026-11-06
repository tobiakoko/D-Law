# TASKS.md — Ordered Work Breakdown

> The sequence to take the React Router 7 repo from "old site + separate redesign" to "redesign ported, hardened, launch-ready." Execute **in order** — each task leaves the app runnable and `typecheck`-green. Check boxes as you go. Full rationale: `IMPLEMENTATION-INSTRUCTIONS.md`. Rules: `CLAUDE.md`. Build/verify: `BUILD.md`.

**Legend:** 🔒 = hard constraint from CLAUDE.md §5 · ⚠️ = needs client/attorney input (blocker for launch, not for coding) · ✅ acceptance criteria.

---

## T0 — Clean the base & baseline the build
- [x] Delete `app/welcome/` (dead 3,948-line Kallyas scrape + stock RR splash).
- [x] Delete `app/components/content.tsx` (dead; breaks typecheck via missing `~/components/ui/*`).
- [x] `npm audit fix` (patch the undici criticals from `@react-router/node`).
- [x] Add `.nvmrc` (`20`).
- [x] Remove the server `Dockerfile`/`.dockerignore` (or replace with a static nginx/caddy image). The old one contradicts `ssr:false`.
- ✅ `npm run typecheck` is **green**; `npm audit --omit=dev` is clean; `npm run build` succeeds.

---

## T1 — Config: static + pre-rendered
- [x] Set `react-router.config.ts` → `{ ssr: false, prerender: ["/"] }`.
- [x] Confirm `tsconfig` keeps `~/*` → `app/*` (it does). Do not add the redesign's `@/*`.
- ✅ `npm run build` prints a prerender/SPA line and emits `build/client/index.html`.

---

## T2 — Port data & types (single source of truth) 🔒
- [x] Copy redesign `src/types/index.ts` → `app/types/index.ts` (unchanged).
- [x] Copy redesign `src/data/legalData.ts` → `app/data/firm.ts`. Update imports to `~/data/firm`.
- [x] ⚠️ Replace placeholder phones `(813) 555-0123/0124/0125` with `TODO(attorney)` markers + the one known real number `(813) 879-5919` as the office default candidate. Update `phoneTel`/`cellTel` to E.164 to match once confirmed.
- [x] Point FAQ answer `faq-2` at `CONTACT_INFO.phone` instead of a hardcoded number.
- [x] Leave `CASE_RESULTS` / verdict figures but tag each with `TODO(attorney): verify` (see T10).
- ✅ Nothing hardcodes contact facts; `typecheck` green; every `TODO(attorney)` is listed in "Client inputs needed" below.

---

## T3 — Theme: keep engine, freeze one theme, drop switcher 🔒
- [x] Copy `src/context/ThemeContext.tsx` → `app/context/ThemeContext.tsx`.
- [x] Default + freeze to `heritage-navy`. Keep `ThemeProvider`/`useTheme` so the 12 consumers keep working.
- [x] Do **not** port `ThemeSelectorBar.tsx`; do not render it.
- ✅ Site renders in the navy/gold theme; no public theme UI; `useTheme()` resolves everywhere.

---

## T4 — Port sections & components (with framework rewiring)
Port each redesign component into `app/sections/` or `app/components/` per CLAUDE.md §4, applying the Vite→RR7 rewiring (INSTRUCTIONS §10): change data imports to `~/data/firm`, move `<head>` meta into route `meta()`, keep `lucide-react` as-is.
- [x] `sections/`: Hero, VerdictsTicker, QuickAssessment, PracticeAreas, AboutAttorney, FeeTransparency, Testimonials, FaqSection, Navbar, Footer.
- [x] `components/`: ConsultationModal, PracticeAreaModal, MobileBottomBar, OfficialSeal.
- [x] Ensure PascalCase filenames everywhere.
- ✅ Each component compiles under RR7; no `@/*` imports; no references to `src/main.tsx`/`index.html`/AI-Studio files.

---

## T5 — Compose into RR7 routing
- [x] `routes/layout.tsx`: `<Navbar/>` + `<Outlet/>` + `<Footer/>` + `<MobileBottomBar/>` + modal host (lift modal open-state here or into a small context).
- [x] `routes/home.tsx`: compose the `<main>` sections in the redesign's order; export `meta()` with correct title/description/OG (fix "Counselot" → "Counselor").
- ✅ `/` renders the full redesigned page; one modal host drives ConsultationModal + PracticeAreaModal.

---

## T6 — Fix the consultation form → direct email 🔒 (most important behavior fix)
- [x] Rewrite `ConsultationModal.handleSubmit` to build a `mailto:${firm.email}` link with name/phone/email/practice/date/time/format/notes as subject+body and open it (INSTRUCTIONS §5.1).
- [x] Change success copy to "press **Send** in your mail app" — do **not** claim the firm received it (INSTRUCTIONS §5.2).
- [x] Remove the "Attorney-Client Privilege protects this form" line; replace with "Do not include sensitive case details until representation is established."
- [x] Add always-visible `tel:` and `mailto:` fallbacks in the modal (for visitors with no mail client).
- [x] Model state as `status: 'editing' | 'sent' | 'error'` instead of the lone `submitted` boolean.
- ✅ Submitting opens a pre-filled mail draft to the firm; copy is honest; fallbacks present; no false privilege claim.

---

## T7 — Shared accessible Modal + a11y 🔒
- [x] Build `app/components/Modal.tsx`: `role="dialog"` + `aria-modal` + `aria-labelledby`, Escape-to-close, focus trap, focus restore on close, body-scroll-lock, render-when-open.
- [x] Use it for ConsultationModal, PracticeAreaModal, and the Navbar mobile drawer.
- [x] Add `role="tablist"`/`role="tab"`/`aria-selected` + arrow keys to AboutAttorney tabs; `aria-controls`/panel `id` + visible focus ring to FaqSection.
- [x] Global `prefers-reduced-motion` guard on transitions/animations; verify accent-gold contrast ≥ 4.5:1 for any small body text.
- ✅ Keyboard-only user can open/close every modal and the mobile menu, never loses focus, and background doesn't scroll.

---

## T8 — Fonts: self-host, drop CDN 🔒
- [x] Decide type system (recommended: adopt the redesign's Cinzel/Playfair/Plus Jakarta Sans, self-hosted) — see INSTRUCTIONS §6.
- [x] Add `.woff2` (Latin-subset, only used weights) to `app/assets/fonts/`; `@font-face` in `app.css` with `font-display: swap`.
- [x] `preload` the primary body font in `root.tsx`; **remove** any Google Fonts `<link>`/`preconnect`.
- [x] Define `font-serif`/`font-sans`/`font-brand` so the ported classes resolve.
- ✅ No network request to fonts.googleapis.com / gstatic.com; text renders with `swap`.

---

## T9 — SEO & structured data
- [x] Add JSON-LD `LegalService`/`Attorney` (name, address, phone, hours, areaServed) in `root.tsx` or `home.tsx`.
- [x] Confirm `meta()` title/description/OG are correct and the OG image is a **self-hosted** asset under `/public` (not an expiring CDN token URL).
- ✅ Built `index.html` contains the JSON-LD and correct meta; `BUILD.md §5` greps pass.

---

## T10 — Content & compliance ⚠️ (launch blocker)
- [ ] ⚠️ Attorney confirms every dollar figure, case count, and outcome in `CASE_RESULTS`/`VerdictsTicker`/`Testimonials` — or replace/remove. *(Unverified results are now hidden via `verified: false` and invented counts removed, so nothing unverified renders; attorney sign-off still needed to publish any.)*
- [x] Add Florida Bar results disclaimer ("Prior results do not guarantee a similar outcome") near verdicts/testimonials. *(VerdictsTicker footnote, Testimonials note, footer advertising notice — text in `LEGAL_NOTICES`.)*
- [ ] ⚠️ Confirm testimonials are real/consented (text-only unless real client photos with consent). *(Code: text-only; redesign's invented quotes replaced with the previous site's reviews verbatim — consent still needed.)*
- ✅ No unverified figures ship; disclaimer present.

---

## T11 — Tooling, tests, CI
- [x] ESLint (React Hooks + TS recommended) + Prettier; add `lint`/`format` scripts; fix flagged issues (index keys, hook deps, unused vars).
- [x] Vitest + RTL unit tests for the state machines: consultation wizard (step transitions + mailto fires), FAQ accordion (single-open), Navbar toggle (+Escape closes), PracticeAreas filter, AboutAttorney tabs.
- [x] One Playwright smoke test: load `/`, assert hero + a practice area + the phone text render, the "Schedule Consultation" CTA opens the modal, and Escape closes it.
- [x] GitHub Actions CI: `npm ci → typecheck → lint → test → build` (+ `npm audit --omit=dev`) on PR. Add Dependabot/Renovate.
- ✅ CI is green on a PR; `main` can't regress silently. *(Every CI step passes locally; workflow not yet run on GitHub — first PR will confirm. Enable branch protection requiring the `verify` check.)*

---

## T12 — Docs & cleanup
- [x] Rewrite `README.md` for this project (what it is, run/build/deploy, how to update `firm.ts`, the one-theme-swap template reuse note, the hosted-form upgrade path).
- [x] Remove any leftover dead code, `console.log`, commented blocks.
- ✅ A new dev can clone, read README, run, and deploy without guessing.

---

## Client inputs needed (⚠️ blockers for launch, collected here)
Fill these before go-live; each is a `TODO(attorney)` in code (`grep -rn "TODO(attorney)" app`):
1. **Phone numbers** — confirm `(813) 879-5919` is the main office line (now live in `CONTACT_INFO.phone`); provide real **cell** and **fax** (currently `null` → hidden). `app/data/firm.ts` `CONTACT_INFO`.
2. **Case results** — the six drafted results in `CASE_RESULTS` (`$750,000`, `$1,800,000`, dismissals, asylum, EOIR, mediation) came from the AI-generated redesign and are **hidden** (`verified: false`). The section and its nav/footer links appear once any result is set to `verified: true` after the attorney confirms it against a real closed matter.
3. **Counts & stats** — confirm "800+ Satisfied Clients" (`FIRM_STATS`; taken from the firm's previous site). The invented "1,000+" claims and per-area `casesCount` / `clientOutcomes` were removed; supply verified ones if wanted (they render only when present).
4. **Court admissions** — confirm federal district court admission(s) before re-adding that claim (removed from hero, credentials, stats and criminal-defense copy for now).
5. **Fee arrangements** — confirm contingency terms, flat fees, payment plans and free evaluations in `FEE_PLANS` / FAQ match firm practice.
6. **Email** — confirm `info@oseiprempeh.com` receives consultation requests (the form's `mailto:` target).
7. **Office hours** — confirm `Mon - Sat: 8:00 AM - 8:00 PM` (also in JSON-LD `openingHours`).
8. **Testimonial consent** — the four reviews (Christabel A., Georgetta B., Tmk W., Kym H.) are from the previous site; confirm they're real and consented. No photos used.
9. **Theme** — final choice (default `heritage-navy`, `ACTIVE_THEME_ID`).
10. **OG/share image** — currently the self-hosted 500×500 logo (`public/og-image.png`); supply a 1200×630 image to use `summary_large_image`.

## Done = `BUILD.md §9` release checklist fully ticked.
