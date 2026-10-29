# Investment bot: status

**Owner (client and sponsor):** xianjinseow92  **Size:** M  **Stack:** to be decided  **Started:** 28 Oct 2026

## Where things stand

Phase 4, grilling with docs (phases 0–3 folded into it, owner as the client). Rounds 1–3 asked; round 1 answered; project reframed as a paper-only lab (D14). Research done (`docs/research/`). Nothing built yet.

## Phases

- [x] 0 Fit check: personal project, owner is client (28 Oct 2026)
- [ ] 1–3 Problem, brief, success criteria: folded into the grilling
- [ ] 4 Grill me: no proposed decision affects the spec; process reviewer confirmed
- [ ] 5 Agreement: skipped (personal project)
- [ ] 6 Spec (`/to-spec`) passed by reviewer
- [ ] 7 Setup: paper account API access, data, Telegram bot, email, alerts, server
- [ ] 8 Build rounds (`/to-tickets`, `/tdd`), each reviewed
- [ ] 9 Paper period: at least 3 months running, daily messages and weekly digests
- [ ] 10 Real-money decision (ADR 0002)
- [ ] 11 Handover: skipped (owner maintains)
- [ ] 12 Retro; playbooks updated

## Decisions

| # | Decision | State |
| --- | --- | --- |
| D1 | Work tracked in GitHub Issues with the default triage labels | agreed |
| D2 | Domain docs: `GLOSSARY.md` and `docs/adr/`; this status file; a premortem in phase 4 | agreed |
| D3 | Owner treated as the client; playbook phases 0–3 folded into the grilling; reviewer and dev-before-production kept | agreed |
| D4 | Success: after fees, beat buying and holding an index fund, with a smaller maximum drawdown, over at least 3 months of paper trading before real money ([ADR 0002](adr/0002-paper-first.md)). Fallback: automatic monthly index fund purchase | agreed |
| D5 | US stocks and ETFs first; other markets possible later | agreed |
| D6 | The broker must be easy to swap; the owner has Interactive Brokers now | agreed |
| D7 | Decides once a day after the US close on daily prices (swing) | agreed |
| D8 | Fixed rules decide every trade; AI only explains, summarises or flags ([ADR 0001](adr/0001-rules-decide-trades.md)) | agreed |
| D9 | The owner wants to learn trading through the project: a `/teach` workspace in `learn/` (lessons, question parking lot) | agreed |
| D10 | Paper account gets a lump sum of paper money | agreed; amount open |
| D11 | Daily Telegram message (vs benchmark) and weekly email digest (every action, P&L, every comparison) | agreed |
| D12 | Autonomy: one fully autonomous paper bot plus a second bot that suggests trades to the owner with reasons | proposed; being evaluated |
| D13 | Buy only; no margin, short selling or options in version 1 | proposed |
| D14 | Project reframed (29 Oct): the owner already invests automatically each month in a global index fund, so the bot is **not** the autopilot. It is a small, paper-only lab: a few strategies run on paper against that index fund, a daily Telegram message, and guardrails for the owner's small individual-stock slice. Also a portfolio project for the owner | agreed |
| D15 | Time box: version 1 by 7 Dec 2026 (the owner starts a new job then) | proposed |
| D16 | Work split: the owner writes the core logic test-first with coaching (strategy rules, comparison with the benchmark, risk checks); Claude builds the plumbing (project skeleton, data, broker, messages, deployment) and the owner reviews it. Shifts toward the owner as confidence grows. About 5 hours a week from the owner | agreed |
| D17 | Language: C# on .NET, because the owner's new job uses .NET | agreed |

## Open questions

See the latest grilling round in the session; answers are recorded above as they land.

## Risks

- A strategy that only looks good by luck over 3 months. Being researched (how long a track record is needed).
- Interactive Brokers needs a manual login about once a week, which breaks unattended running. Being researched.
