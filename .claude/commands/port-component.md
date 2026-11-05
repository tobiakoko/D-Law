---
description: Port one redesign component into the React Router 7 app with all required fixes
---

Port the redesign component **$ARGUMENTS** from the AI-Studio source into this React Router 7 repo.

Follow these steps and the rules in `CLAUDE.md` + `IMPLEMENTATION-INSTRUCTIONS.md`:

1. Read the source component from the redesign (`src/components/$ARGUMENTS.tsx` in the redesign tree, or ask for the file if it isn't in the working tree).
2. Decide its destination: a page **section** → `app/sections/$ARGUMENTS.tsx`; a reusable piece or modal → `app/components/$ARGUMENTS.tsx`. Use PascalCase.
3. Apply the Vite→RR7 rewiring (INSTRUCTIONS §10):
   - Change data imports to `~/data/firm`, theme imports to `~/context/ThemeContext`.
   - Replace any `@/*` import with `~/*`.
   - Do not pull in `@google/genai`, `express`, `dotenv`, or `motion`.
4. Apply the fixes that apply to this component:
   - If it renders a modal/drawer → use the shared accessible `~/components/Modal.tsx` (focus trap, Escape, `aria-modal`, scroll-lock).
   - If it has lists → stable keys, not `key={index}`.
   - If it has hover-only affordances → CSS `:hover`/`:focus-visible`, never `onMouseEnter` DOM mutation.
   - Prefer `theme.*`/tokens over hardcoded hex where practical.
   - Any contact fact → read from `~/data/firm`, never hardcode.
5. Run `npm run typecheck`. Fix until green.
6. Report: where you put it, what you rewired, and any `TODO(attorney)` you introduced. Make a single `feat:` commit.

Do not change unrelated files. If the component collects user data (a form), stop and confirm the submission path (`mailto:` per CLAUDE.md §5) before implementing.
