# CLAUDE.md — Osei K. Prempeh, P.A. Law Firm Website

> This file is read by Claude Code at the start of every session. It is the standing contract for how to work in this repo. Read it fully before making changes. When something here conflicts with a request, surface the conflict instead of silently overriding it.

---

## 1. What this project is

A **single-page marketing website** for a solo law firm — **The Law Offices of Osei K. Prempeh, P.A.** (Tampa, FL). Attorney, Mediator & Counselor at Law. Practice areas: Immigration, Personal Injury, International Business, Family Law, Contract Disputes, Criminal Defense.

It is a **brochure site**: its job is to establish trust and convert visitors into consultation requests. It is **not** an application — no auth, no database, no user accounts, no server-rendered-per-request logic. Treat scope creep as a bug.

**Business context:** this is a freelance build and also a reusable template (the same codebase is meant to be re-skinned for other small businesses). Keep content in data files and theming in one place so a re-skin is a data swap, not a rewrite.

---

## 2. Current state & the task

There are **two codebases** in play:

1. **The live/target repo** — `github.com/tobiakoko/D-Law` — **React Router 7** (framework mode), React 19, TypeScript, Tailwind v4, Vite. This is what deploys to `oseiprempeh.com`. It is the **home we are keeping.**
2. **A redesign** — delivered as a separate **Vite + React 19 SPA** (Google AI Studio export). Cleaner structure and better UX, but wrong framework and carries several unfixed problems.

**The task:** port the redesign's UI/data/theme **into the React Router 7 repo**, keeping RR7's framework (for pre-rendered HTML / SEO) and the folder layout below, while fixing the issues listed in §6. Full narrative is in `IMPLEMENTATION-INSTRUCTIONS.md`; the ordered work breakdown is in `TASKS.md`; how to build/verify is in `BUILD.md`.

> The audit set (`AUDIT.md`, `REFACTOR-GUIDE.md`, `STATE-MACHINES.md`) is the quality bar. Don't re-derive it — follow it.

---

## 3. Stack & commands (authoritative)

- **Framework:** React Router 7 (framework mode), `ssr: false` + `prerender: ["/"]` (static, but fully-rendered HTML).
- **Language:** TypeScript (strict). **UI:** React 19. **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`). **Icons:** `lucide-react`. **Build:** Vite.
- **Node:** 20 LTS (pin via `.nvmrc`). **Package manager:** npm.
- **Path alias:** `~/*` → `app/*` (RR7 convention). Do **not** introduce the redesign's `@/*` alias.

| Command | What it does |
|---|---|
| `npm install` | install deps |
| `npm run dev` | dev server (HMR) |
| `npm run typecheck` | `react-router typegen && tsc` — **must be green before every commit** |
| `npm run lint` | ESLint (add in the tooling task) |
| `npm run build` | production build; with `prerender` it emits populated `build/client/index.html` |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright smoke test |

**Definition of a passing change:** `typecheck` ✓, `lint` ✓, `test` ✓, `build` ✓, `npm audit --omit=dev` clean.

---

## 4. Target folder layout — put code here

```
app/
├── root.tsx                 # html shell; fonts preload/link live here
├── routes.ts                # route table: layout → index
├── routes/
│   ├── layout.tsx           # <Navbar/> + <Outlet/> + <Footer/> + <MobileBottomBar/> + modal host
│   └── home.tsx             # composes the page sections; exports meta()
├── sections/                # one-off page sections (PascalCase.tsx)
│   ├── Hero.tsx  VerdictsTicker.tsx  QuickAssessment.tsx  PracticeAreas.tsx
│   ├── AboutAttorney.tsx  FeeTransparency.tsx  Testimonials.tsx  FaqSection.tsx
│   ├── Navbar.tsx  Footer.tsx
├── components/              # reusable pieces + modals
│   ├── Modal.tsx            # shared accessible dialog shell (focus trap/Escape/aria)
│   ├── ConsultationModal.tsx  PracticeAreaModal.tsx  MobileBottomBar.tsx  OfficialSeal.tsx
├── context/
│   └── ThemeContext.tsx     # keep infra; frozen to ONE theme
├── data/
│   └── firm.ts              # SINGLE SOURCE OF TRUTH for all firm content
├── types/
│   └── index.ts
├── hooks/
│   └── useScrolled.ts       # rAF-throttled scroll boolean (if Navbar needs it)
└── app.css                  # tokens + @font-face
```

**Conventions:**
- Component files: **PascalCase** (`Hero.tsx`, not `hero.tsx`). Enforce consistently — mixed casing breaks on Linux/CI.
- One component per file; page sections in `sections/`, reusable in `components/`.
- All firm facts come from `app/data/firm.ts`. **Never hardcode** a phone number, address, stat, or practice-area string in a component.
- Same-page navigation: `<a href="#id">` or RR `<Link to="#id">` are both fine; pick one and be consistent.

---

## 5. Hard constraints (do NOT violate — these are decisions already made)

1. **Consultation form sends directly to the firm's email via `mailto:`.** No backend, no hosted form service, no database. On submit, build a `mailto:${firm.email}` link with the form fields as subject/body and open it. The confirmation UI must say the visitor needs to **press Send** in their mail app — never claim the firm already received it. See `IMPLEMENTATION-INSTRUCTIONS.md §5`.
2. **No false legal assurances.** Remove any "Attorney-Client Privilege protects this form" copy. A website intake form is not privileged.
3. **One theme only.** Keep `ThemeContext`/`useTheme` infrastructure (12 components depend on it) but **remove the public `ThemeSelectorBar`** and freeze the theme to `heritage-navy` (Executive Navy & Gold).
4. **No AI-Studio scaffolding.** Do **not** add `@google/genai`, `express`, `dotenv`, or `motion` to `package.json` (all were unused). Do not port `metadata.json`, `.aistudio/`, the AI-Studio `README`, `src/main.tsx`, or the root `index.html`.
5. **Real contact info only.** The data still contains placeholder `(813) 555-0123/0124/0125`. These are **blockers** — do not ship them. Use the `TODO(attorney)` markers (§7) until the real numbers are confirmed.
6. **No unverified marketing claims.** Dollar case-results ("$750,000", "$1.8M"), case counts, and success figures must be attorney-confirmed or replaced, and a results disclaimer must be shown. Mark them `TODO(attorney)` until confirmed.
7. **Keep it static + pre-rendered.** `ssr: false` + `prerender: ["/"]`. Do not add a runtime server, SSR data loaders that need a server, or per-request logic.
8. **Self-host fonts.** No Google Fonts CDN `<link>`/`preconnect`. Download `.woff2`, add `@font-face`, preload the primary body font.
9. **Accessibility is non-negotiable** (it's a law firm — ADA exposure is real). Modals and the mobile nav need focus trap, `Escape`, `role="dialog"`/`aria-modal`, scroll-lock, focus restore. All interactive elements need visible `focus-visible` styles.
10. **Don't reintroduce the old repo's dead code.** The RR7 repo currently contains `app/welcome/` (3,948-line dead file) and `app/components/content.tsx` (breaks typecheck). Delete them first.

---

## 6. What to fix during the port (from the audit)

These problems are **present in the redesign** and must be fixed as you port (they are not already handled):

| Problem | Fix | Ref |
|---|---|---|
| Form submits nowhere (fakes success) | `mailto:` to firm + honest confirmation + tel/email fallbacks | §5, INSTR §5 |
| Fake `555` phone numbers | real numbers in `firm.ts` (`TODO(attorney)` until confirmed) | INSTR §3 |
| Modals/nav lack focus mgmt | shared accessible `Modal.tsx` | INSTR §8 |
| Google Fonts CDN dependency | self-host woff2 | INSTR §6 |
| No prerender → empty-shell SEO | `prerender: ["/"]` + JSON-LD | INSTR §10 |
| Unsubstantiated $ claims (more prominent now) | attorney-confirm or disclaim | INSTR §9 |
| Public theme switcher | remove, freeze one theme | INSTR §4 |
| Unused AI-Studio deps | don't port them | INSTR §7 |
| Heavy hardcoded hex despite theme system | prefer `theme.*`/tokens; keep hex only where intentional | AUDIT §5.1 |

What the redesign **already fixed** (preserve): centralized data, working CTA→modal flow, multi-step consultation UX, mobile sticky bar, PascalCase components, no fake stock-photo clients, no runaway testimonial auto-rotate.

---

## 7. Working agreements for Claude Code

**Markers & blockers.** When a value needs the attorney (phone numbers, verified stats, dollar figures), use a visible marker and keep the build green:
```ts
phone: 'TODO(attorney): confirm real office number', // was placeholder (813) 555-0123
```
Collect every `TODO(attorney)` in `TASKS.md` under "Client inputs needed." Never invent a real-looking phone number or statistic to fill a gap.

**Make small, verifiable commits.** One logical change per commit. Run `npm run typecheck` before each. Conventional-commit style: `feat:`, `fix:`, `refactor:`, `chore:`, `test:`, `docs:`.

**Follow the task order in `TASKS.md`** — it's sequenced so the app stays runnable at every step (clean base → data/types → theme → components → compose → form → fonts → config → a11y → compliance → tests/CI).

**Do not:**
- Add dependencies without checking they're actually needed (the old repo had 6 unused; the redesign had 4). If you add one, say why in the commit.
- Overengineer. No Redux/Zustand, no GraphQL/tRPC, no server, no CMS, no XState, no component library you'd use <5 times. This is a brochure site. See the audit's "did I overengineer?" checklist.
- Leave `console.log`, commented-out blocks, or dead code behind.
- Use `key={index}` on lists that can reorder/filter — use stable domain keys.
- Reproduce the imperative `onMouseEnter/onMouseLeave` DOM-mutation styling from the old repo — use CSS `:hover`/`:focus-visible`.
- Weaken accessibility or honesty to ship faster.

**When unsure about scope or a product decision, ask** rather than guessing — especially anything touching the attorney's claims, contact info, or legal copy.

**Testing bar (proportionate):** unit-test the state machines (consultation wizard, FAQ accordion, nav toggle, practice filter, about tabs); one Playwright smoke test asserting the real-phone/`TODO` text renders, the consultation CTA opens the modal, and the modal closes on Escape. Don't chase coverage on static JSX.

---

## 8. State machines in this codebase (see STATE-MACHINES.md)

Handle these per the companion doc; none needs a reducer/XState:
- **ConsultationModal** — `step: 1|2|3` + `submitted`. Fix the submit transition (§5). Consider a `status: 'editing'|'sent'|'error'` union instead of the lone boolean.
- **FaqSection** — `openId: string|null` (single-open; keep) + `activeCategory` filter. Add `aria-controls`.
- **AboutAttorney** — `activeTab` → add `role="tablist"` + arrow-key support.
- **PracticeAreas** — `activeFilter` → stable keys.
- **Testimonials** — `activeIndex` (manual-only; if you add auto-advance, pause-on-hover + reduced-motion).
- **Navbar** — `mobileMenuOpen` → Escape/focus-trap/scroll-lock via shared Modal.
- **ThemeContext** — `currentThemeId` frozen to one value.

---

## 9. Reference docs in this repo
- `IMPLEMENTATION-INSTRUCTIONS.md` — the detailed port guide (read for any "how do I port X" question).
- `TASKS.md` — ordered, checkable work breakdown with acceptance criteria + client-input blockers.
- `BUILD.md` — install/run/build/prerender/verify + deploy.
- `AUDIT.md` / `REFACTOR-GUIDE.md` / `STATE-MACHINES.md` — the original audit (the quality bar + rationale).

If any of these are missing from the working tree, say so; don't proceed from memory.
