---
description: Run the full verification gate and report pass/fail per BUILD.md
---

Run the project's verification gate and report results clearly. Do not fix anything yet — just run and report, then propose fixes.

1. `npm run typecheck` — report errors verbatim.
2. `npm run lint` — report errors.
3. `npm run test` — report failures.
4. `npm run build` — confirm it succeeds and that `prerender` ran.
5. Prerender SEO check (BUILD.md §5): grep `build/client/index.html` for "Osei K. Prempeh", a practice area ("Immigration Law"), and "(813)". Report whether each is present. If the HTML is an empty shell, flag it as a launch blocker.
6. `npm audit --omit=dev` — report vulnerability count.
7. Scan the tree for launch blockers: any remaining `555` placeholder phone numbers, any `TODO(attorney)` markers, any Google Fonts CDN reference, any `@google/genai`/`express`/`dotenv`/`motion` in `package.json`, any `.aistudio`/`metadata.json`, and the old `app/welcome`/`content.tsx`.

Then output a checklist against `BUILD.md §9` (release checklist) showing ✅/❌ for each item, and list the specific files/lines to fix for every ❌. Do not claim a gate passed unless the command actually succeeded.
