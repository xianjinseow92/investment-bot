# Investment bot: rules for AI agents

A personal bot that trades US stocks and ETFs on a schedule, aiming to beat simply holding an index fund after fees. It is in **paper trading only** (simulated money). The owner is also learning to trade through it. Start with `docs/status.md`, then `GLOSSARY.md` and `docs/adr/`.

The process follows the owner's build playbook (`xianjinseow92/reusable-components`, `playbooks/build-sop.md`, with the owner as the client) and Matt Pocock's skills in `.claude/skills/` (`/grill-with-docs` → `/to-spec` → `/to-tickets` → `/tdd` / `/implement` → `/code-review`).

## Where things live

- `docs/status.md`: phase, decisions agreed or proposed, next steps, open questions. Update it when work lands.
- `GLOSSARY.md`: the project's words for things. Use them in code, tests, issues and messages.
- `docs/adr/`: decisions that are hard to reverse. Don't contradict one silently.
- `docs/research/`: cited research notes. Claims marked "not verified" must be checked before code relies on them.

## Working rules

- **No real money.** Nothing may place, change or cancel an order on a live (real-money) broker account. Moving to real money needs the conditions in `docs/adr/0002-paper-first.md` and a written yes from the owner.
- Never commit credentials, API keys, account numbers, or broker statements. Use `.env` (git-ignored) and keep `.env.example` with placeholders.
- Fixed, tested code decides every trade (`docs/adr/0001-rules-decide-trades.md`). AI may summarise, explain or flag; it never decides an order.
- Mark material as proposed, agreed, built or verified. Never silently decide scope, risk limits or recovery behaviour.
- A separate reviewer agent checks each build round and each gate; the author never passes its own gate.
- Never force-push or rewrite git history.

## Agent skills

### Issue tracker

GitHub Issues on `xianjinseow92/investment-bot` (GitHub MCP tools in cloud sessions). See `docs/agents/issue-tracker.md`.

### Triage labels

The five default labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
