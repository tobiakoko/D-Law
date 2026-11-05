# Claude Code Instruction Bundle — how these files fit together

This bundle is the complete set of instruction/context files to drive the **Osei K. Prempeh, P.A.** website to completion with Claude Code. It assumes the plan from `IMPLEMENTATION-INSTRUCTIONS.md`: **port the AI-Studio redesign into the React Router 7 repo (`tobiakoko/D-Law`)** and harden it.

## Where each file goes (place at the repo root unless noted)

| File | Put it at | Purpose |
|---|---|---|
| `CLAUDE.md` | repo root | Standing context Claude Code reads every session: project, stack, folder rules, hard constraints, do/don't, state machines, verification bar. **The authority.** |
| `BUILD.md` | repo root | Install / dev / typecheck / build / **prerender SEO check** / deploy / troubleshooting / release checklist. |
| `TASKS.md` | repo root | Ordered work breakdown T0→T12 with ✅ acceptance criteria and ⚠️ client-input blockers. The execution plan. |
| `CONVENTIONS.md` | repo root | Quick code-style/pattern reference (naming, TS, React, a11y, honesty, git). |
| `.env.example` | repo root | Documents that **no secrets are needed** (static site, `mailto:` form); lists optional future env vars. |
| `.claude/commands/port-component.md` | `.claude/commands/` | Slash command `/port-component <Name>` — port one redesign component with all fixes. |
| `.claude/commands/next-task.md` | `.claude/commands/` | Slash command `/next-task` — pick up and finish the next unchecked `TASKS.md` item. |
| `.claude/commands/verify.md` | `.claude/commands/` | Slash command `/verify` — run the full gate and report ✅/❌ vs the release checklist. |
| `IMPLEMENTATION-INSTRUCTIONS.md` | repo root | (From the prior step.) The detailed port-and-harden guide the above files reference. |
| `AUDIT.md`, `REFACTOR-GUIDE.md`, `STATE-MACHINES.md` | repo root (or `/docs`) | (From the audit.) The quality bar + rationale. |

> If you keep the audit docs in a `/docs` folder, update the relative links in `CLAUDE.md §9` accordingly.

## How to use it (recommended flow in Claude Code)

1. Drop all files into the **D-Law React Router 7 repo** at the locations above. Commit them (`docs: add Claude Code instruction set`).
2. Open Claude Code in the repo. It reads `CLAUDE.md` automatically.
3. Run `/verify` once to baseline (it will flag the old dead code + failing typecheck = task T0).
4. Run `/next-task` repeatedly. It walks `TASKS.md` in order (T0 clean base → T12 docs), one reviewable commit at a time, keeping the app green.
5. Use `/port-component <Name>` when you want to move a specific redesign component directly.
6. Before launch, run `/verify` and confirm every box in `BUILD.md §9` is ✅ and no `TODO(attorney)` remain.

## The non-negotiables (also in CLAUDE.md §5)
- Consultation form → **`mailto:` direct to the firm**, honest "press Send" copy, no false privilege claim, with `tel:`/email fallbacks.
- **One theme** (keep the engine, drop the public switcher).
- **No AI-Studio deps** (`@google/genai`, `express`, `dotenv`, `motion`) and no `.aistudio`/`metadata.json`.
- **Real contact info & verified claims only** — placeholders and unverified stats/dollar-figures are launch blockers (`TODO(attorney)`).
- **Static + prerendered** for SEO; **self-hosted fonts**; **accessible** modals/nav.

## Client inputs still required (gate for go-live)
Real phone/fax/cell numbers, verified case results & statistics (bar compliance), confirmed email, final theme choice, testimonial consent, and a self-hosted OG image. Tracked in `TASKS.md` → "Client inputs needed."
