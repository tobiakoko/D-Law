---
description: Pick up the next unchecked task from TASKS.md and execute it end to end
---

Work the next task in `TASKS.md`.

1. Read `TASKS.md`. Find the **first unchecked** task (T0 → T12 order; do not skip ahead — the order keeps the app runnable).
2. Read its full description, the referenced section of `IMPLEMENTATION-INSTRUCTIONS.md`, and the relevant rules in `CLAUDE.md`.
3. If the task is a ⚠️ client-input blocker (e.g. real phone numbers, verified stats), do the code scaffolding you can (markers, structure, disclaimer placeholders) and clearly list what you need from the attorney — do **not** invent real-looking values.
4. Implement the task. Keep changes scoped to it.
5. Run `npm run typecheck` (and `npm run test` if tests exist for the area). Fix until green.
6. Check the task's ✅ acceptance criteria are met. Tick the boxes in `TASKS.md`.
7. Make a focused commit (conventional-commit prefix) and give a 2–3 sentence summary of what changed and what's next.

Stop after one task so progress is reviewable. If the task is ambiguous or depends on a product/legal decision, ask before implementing rather than guessing.
