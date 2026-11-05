# CONVENTIONS.md — Code Style & Patterns

> Short, enforceable conventions for this repo. `CLAUDE.md` is the authority; this is the quick reference for day-to-day coding. ESLint/Prettier enforce most of it.

## Files & naming
- **Components:** PascalCase files, one component per file (`Hero.tsx`, `ConsultationModal.tsx`). No lowercase component files.
- **Page sections** → `app/sections/`. **Reusable pieces & modals** → `app/components/`. **Hooks** → `app/hooks/` (`useThing.ts`). **Data** → `app/data/`. **Types** → `app/types/`.
- **Imports:** always the `~/*` alias for app code (`~/data/firm`, `~/components/Modal`). Never relative `../../..` chains across folders, never the `@/*` alias.

## TypeScript
- `strict` on. No `any` (use `unknown` + narrowing, or a real type). No non-null `!` except where provably safe.
- Props: explicit interfaces/types. Prefer `type` for unions, `interface` for object props — be consistent within a file.
- Model finite states as unions, not loose booleans where it reads better: e.g. consultation form `status: 'editing' | 'sent' | 'error'`, not three booleans.

## React
- Function components + hooks only. Keep components focused; extract a section if a component exceeds ~200 lines.
- **Keys:** stable domain keys (`key={area.id}`), never `key={index}` on lists that filter/reorder.
- **Effects:** every `useEffect` has a correct dependency array; clean up listeners/intervals/observers in the return.
- **No imperative style mutation** (`onMouseEnter={e => e.target.style...}`). Use Tailwind `hover:`/`focus-visible:` utilities or CSS. Hover affordances must also show on keyboard focus.
- **Data in, not hardcoded:** components read firm facts from `~/data/firm`. No inline phone numbers, addresses, stats, or practice-area strings.

## Styling (Tailwind v4)
- Utilities first. Reach for `theme.*`/CSS tokens for brand colors; keep raw hex only where a token genuinely doesn't exist and leave a comment.
- Define brand colors/fonts once (in `app.css` `@theme`/tokens) so utilities generate — don't scatter the same hex across components.
- Respect `prefers-reduced-motion` for any animation/transition flourish.

## Accessibility (required)
- Every interactive element: visible `focus-visible` style, accessible name (`aria-label` on icon-only buttons), ≥44px touch target on mobile.
- Dialogs/drawers go through the shared `~/components/Modal.tsx` (role=dialog, aria-modal, Escape, focus trap + restore, scroll-lock).
- Accordions: `aria-expanded` + `aria-controls`↔panel `id`. Tabs: `role=tablist/tab/tabpanel` + `aria-selected` + arrow keys.
- Color contrast ≥ 4.5:1 for normal text (gold accents are for large text/accents, not small body copy on white).

## Honesty & compliance (this is a law firm)
- Never ship invented contact info or statistics. Unknown real values → `TODO(attorney): ...` marker, and list it in `TASKS.md` "Client inputs needed."
- No claims the code can't back: the form says "press Send," not "received"; no "attorney-client privilege" on a public intake form; case results carry the Florida Bar disclaimer.

## Git
- One logical change per commit. Conventional prefixes: `feat:`, `fix:`, `refactor:`, `chore:`, `test:`, `docs:`.
- `npm run typecheck` green before every commit. No `console.log`, commented-out code, or dead files left behind.

## Don't (scope guard)
- No Redux/Zustand/Jotai, GraphQL/tRPC, server, database, CMS, XState, or a UI library used <5 times. This is a brochure site.
- Don't add a dependency without stating why in the commit. Don't re-add AI-Studio deps (`@google/genai`, `express`, `dotenv`, `motion`).
