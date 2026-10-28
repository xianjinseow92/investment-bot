# Evaluation: "autonomous bot + watcher bot" experiment design

**Written 28 Oct 2026 by an independent review agent.** Direct fetches of source sites were blocked from the build environment. Every source below was read through search-result summaries only, so treat each citation as **(not verified: snippet only)**. "[calc]" marks my own arithmetic; "[bg]" marks background knowledge with no source.

**State: proposed.** This evaluates decision D12 in `docs/status.md`. It also recommends changing the gate in [ADR 0002](../adr/0002-paper-first.md) (section 8). Nothing here is agreed until the owner says so.

## Terms used

- **Benchmark:** the index fund you compare against (e.g. an S&P 500 ETF such as SPY or VOO, held with no trading).
- **Drawdown:** the fall from a portfolio's previous peak to a later low. **Max drawdown** is the worst one in the period.
- **Sharpe ratio:** average yearly return above cash, divided by its yearly volatility. It measures return per unit of bumpiness. **Information ratio** is the same idea for return *above the benchmark*. That is the number that matters for "did we beat the index fund".
- **Backtest:** running the rules on past price data. **Paper trading:** running them live, with fake money, at today's prices.

## 1. The proposal, restated

1. **Bot A (autonomous):** trades a paper account on fixed rules, once a day, with no human input.
2. **Bot B (watcher):** watches Bot A, picks out "good moves", and sends the user a well-argued suggestion to make a similar trade.
3. **The user** decides yes or no. Their live account will drift away from Bot A's paper portfolio.

### Ambiguities to resolve first

| # | Question | Why it matters |
|---|---|---|
| 1 | Does Bot B suggest **real-money** trades, or trades in a second paper account? | Real money means safety rules (section 7) and a real cost to mistakes. |
| 2 | When is a move judged "good": **before** its outcome is known, or after? | After = hindsight; useless for the next trade (section 3). Before = Bot B needs its own rule, so it is a second strategy. |
| 3 | Judged **how**? By a fixed rule, by an LLM, or by "it went up"? | The project agreed that rules, not LLMs, decide trades. An LLM choosing which trades to recommend is an LLM deciding trades. |
| 4 | Does Bot B also send the **exits** (sells, stop-losses)? | Entries without exits are a different strategy, with no tested risk control. |
| 5 | **Position size** in the live account: copied from Bot A, scaled, or chosen by the user? | Size drives both return and drawdown. |
| 6 | Is the live account meant to **follow** Bot A or **diverge** from it on purpose? | If it diverges, you need a separate ledger to know whether diverging helped. |
| 7 | What are the pass and fail results, decided **before** the experiment starts? | Without them, any result can be read as "promising". |

## 2. What each part can and cannot tell you

### Three months cannot separate skill from luck

The standard error of a measured Sharpe ratio is about √((1 + SR²/2) / T), with T in years [1]. Over 63 trading days (T = 0.25) that is about **2.0**, so a measured annual Sharpe of +1.5 is still consistent with zero skill [calc]. Applying the same formula to the information ratio (return above the index):

| True edge over the index (information ratio) | Years of track record to be 95% sure (one-sided) | Chance that 3 months shows *any* outperformance |
|---|---|---|
| 0.25 | ~45 | 55% |
| 0.5 (good professional) | ~12 | 59% |
| 1.0 (excellent) | ~4 | 66% |
| 2.0 (rare) | ~2 | 72% |

[calc], assuming independent, normally distributed daily returns. Fat tails and negative skew make the required length **longer** [2][3]. A coin flip "beats the index" over 3 months close to 50% of the time.

Context: about 79% of US large-cap active funds lagged the S&P 500 in 2025, and about 90% did over the 15 years to end-2024 [4].

**So:** the 3-month paper period is an **operations test**: does the bot run every day, place the orders it meant to, and pay the costs it assumed? It is **not a skill test**. Say this in the success criteria, or a lucky quarter will push you into real money.

The drawdown half of the goal is just as noisy. In a calm quarter the index may fall only a few percent, so "smaller max drawdown" is easy to meet by chance [bg].

### Backtest versus paper trading

| | Backtest | Paper trading |
|---|---|---|
| Sample size | Decades, including crashes (2008, 2020, 2022) | 3 months, one market mood |
| Overfitting risk | High. The more rule variants you try, the likelier the best one is a fluke [5][6][7] | None for the rules themselves; the data is truly unseen |
| Tests the plumbing (data, broker API, scheduling, fills, fees) | No | Yes |
| Realistic fills | Only as good as your cost model | Better, but still optimistic: there is no real money and no market impact [bg] |
| Teaches emotional discipline | No | A little. Fake losses don't hurt like real ones [bg] |

You need both: a backtest to estimate the edge, and paper trading to check that live behaviour matches the backtest. Treat "paper results fall inside the backtest's normal range for a quarter" as the real test. Use Deflated Sharpe [7] or a haircut [6] to correct the backtest for the number of variants you tried.

## 3. The watcher idea ("pick the good moves")

**Hindsight bias.** If "good" means the trade made money, Bot B learns nothing usable. Outcome bias is well documented: people rate the same decision as better when it happened to turn out well [8]. Trades that turned out well cannot be copied in time. By the time the outcome is known, the opportunity is gone.

**Look-ahead.** If Bot B picks trades "before" outcomes but uses information Bot A didn't have at the time (later news, later prices), the paper record of Bot B's picks will look better than any live result.

**Cherry-picking breaks the strategy.** A rule-based strategy's backtested numbers describe the **whole set** of its trades:

- **Diversification:** if Bot A holds 10 positions and the user takes 3, the portfolio is far more volatile than tested.
- **Sizing:** Bot A's sizes assume the other positions exist. A subset holds too much in each name or too much cash.
- **Base rate:** swing strategies often win on fewer than half of trades and earn their profit from a few large winners [bg]. Skip the "unconvincing" ones and you may skip exactly those.

Any filter that picks a subset is a **new strategy** that needs its own backtest. Once it has one, it no longer needs a watcher: it is just Bot A with an extra rule.

**Entries without exits.** If the user approves buys but manages sells by feel, the live account loses the exit rules, which usually hold most of the risk control. Retail investors tend to sell winners too early and hold losers too long (the **disposition effect**) [9]. Approval has to cover exits too, ideally on standing approval ("exits always execute").

**LLM "well-backed justifications".** An LLM can write a confident, well-sourced case for almost any trade, including the opposite one [bg]. This adds persuasion, not accuracy, and the project already agreed that AI must not decide trades. Use the LLM only to **explain the rule that fired**, never to argue for it.

## 4. What the evidence says about humans approving a strategy's orders

- **Active retail trading costs money.** Of 66,465 US households (1991–96), the most active traders earned 11.4%/yr against 17.9% for the market [10]. In Taiwan, the vast majority of day traders lost money, and fewer than about 1% were reliably profitable after fees [11]. Costs are lower today, and the study's representativeness is disputed [10].
- **Formulas beat judgment.** Across many fields, mechanical prediction is on average about 10% more accurate than expert judgment, and judgment is clearly better in only 6–16% of studies [12].
- **People abandon algorithms after seeing them err.** They do so even when the algorithm beats them overall (**algorithm aversion**) [13]. A daily message showing every losing trade invites exactly this.
- **But people stick with an algorithm if they can tweak it a little.** Even a tiny allowed change keeps them using it, and they do better as a result [14]. This argues for a narrow, logged veto, not free-form overrides.
- **Lay people often over-trust algorithmic advice** (**algorithm appreciation**) [15]. Rubber-stamping is a risk too, and then the approval step adds nothing.
- **Small manual tweaks tend to hurt.** In supply-chain forecasting, large adjustments helped and small ones often hurt; upward (optimistic) adjustments were worst [16].
- **Too many alerts get ignored.** Clinicians override 46–96% of decision-support alerts [17]. A daily "consider this trade?" message will drift towards automatic yes or automatic ignore.
- **Automation can reduce bias.** Robo-advice adopters showed less disposition effect and trend-chasing [18]. Discretionary and systematic hedge funds performed about the same after risk adjustment [19].

**Net:** expect a human veto on a daily strategy to add noise and bias on average. It can add value in rare, large, clear cases (e.g. "this company is being acquired"). So log every override and measure its value; don't assume it.

## 5. The drift problem: measure it, don't avoid it

Keep **four ledgers**, all marked to the same daily closing prices:

1. **Bot A (paper):** every rule trade, filled at the next open plus modelled costs.
2. **Human-shadow (paper):** only the trades the user accepted, filled at the price available **when they clicked yes**. Rejected trades are not taken. Exits follow the same accept/reject log.
3. **Benchmark:** the lump sum in the index ETF on day 1, dividends reinvested.
4. **Live account:** what actually happened at IBKR, cash flows recorded separately (use time-weighted return so deposits don't count as gains).

From these:

- **Value of human judgment** = (2) − (1). Also track the P&L of *rejected* trades: if they made money, vetoes cost you.
- **Execution gap** = (4) − (2): fills, fees, FX and partial positions.
- **Edge** = (1) − (3), always after fees.
- **Discipline metrics:** acceptance rate, median time to answer, and exits accepted versus entries accepted.

The daily Telegram message should show all four lines; the weekly email adds the breakdown.

## 6. Alternative designs

| Design | What it teaches | Cost / complexity | Risks |
|---|---|---|---|
| **A. Bake-off:** 3–5 autonomous paper strategies on the same engine, against the benchmark (e.g. buy-and-hold, 200-day moving-average trend filter, momentum rotation, mean reversion) | How different strategy families behave in the same market; that most don't beat the index | Low marginal cost once the engine exists | Picking the 3-month winner is luck. Choose with backtest plus paper, and fix the selection rule in advance |
| **B. Advisor mode:** one bot sends the **exact orders** it would place in the live account (entries and exits, sized for the real balance); user replies yes/no; all logged | Whether *you* add or remove value; real execution | Medium: approval flow, expiry, broker orders | Alert fatigue; partial acceptance. Mitigate with standing approval for exits |
| **C. Learning-first:** every paper trade comes with a plain-English note (which rule fired, the stop level, what would prove it wrong), plus a weekly review of closed trades against the rule, not against the outcome | Trading concepts, quickly and safely | Low: templated text; an LLM may rephrase, never decide | You may enjoy it and start fiddling with the rules after every bad week. Freeze rules for each test period |
| **D. Staged autonomy:** paper → small real with per-trade approval → standing approval within limits (max position, max daily loss, kill switch) | Trust built on evidence | Grows over time | Moving to the next stage too early. Gates must be written down in advance |
| **E. Do the boring thing:** start the agreed fallback (an automatic monthly index-fund purchase, D4) with real money now; run the bot on paper only, for learning | Everything above, with no real-money risk | Lowest | None financially. You may decide the bot isn't worth it, which is a valid result |

## 7. Safety rules for any bot that messages you about real money

- **Never execute a real trade without an explicit "yes"** for that order, or a written standing approval with limits. No silence-means-yes.
- **Approvals expire.** Example: a yes is valid only for that US session, or within 30 minutes of the message. Then re-price before sending.
- **No stale prices.** Send limit orders priced off a fresh quote, with a maximum slippage band. Reject the order if the quote has moved beyond the band since the message.
- **Idempotent orders.** Each suggestion has an ID, so a double tap or retry can't buy twice.
- **Hard limits in code:** max position size, max number of positions, max daily loss, cash-only (no margin, no shorting, no options in v1), plus a kill switch command.
- **Authenticated channel.** The Telegram bot answers only your user ID. Approve through the bot's own buttons, not free text.
- **Timezone:** US market hours are about 21:30–04:00 Singapore time (22:30–05:00 when the US is not on daylight time). Daily decisions on closing bars mean messages around 05:00–08:00 SGT, with orders for the next US open. Plan for answering in the SGT morning [bg].
- **Regulatory:** in Singapore, advising *others* on investment products generally needs a financial adviser's licence from MAS [20]. Keep the bot personal use only. Don't share its suggestions, sell signals, or run it for friends' money. Frequent systematic trading may also change the tax treatment of gains (see brokers-and-data-2026-10.md).

## 8. Verdict

**Don't build the watcher bot as proposed.** If it judges moves by outcome, it is hindsight. If it judges them before, it is just a second, untested strategy. Recommending a subset of trades breaks the sizing and diversification the strategy was tested with, and entry-only approvals drop the exits. An LLM writing "well-backed justifications" would make weak trades more persuasive, not better. Keep your instinct that a human should stay in the loop, but put the human where the evidence says they help: approving exact, complete orders with a logged veto, and learning from explanations.

### Recommended design (ranked)

1. **v1 = C + A + E together.** One rule engine runs 3 paper strategies, one of them plain buy-and-hold, each trade with a plain-English note. Real money goes into the index ETF meanwhile. Backtest each strategy over 15+ years with costs, and record how many variants you tried.
2. **v2 = B on a small real slice.** Advisor mode sends exact orders (entries **and** exits) for a small, fixed slice of real money (e.g. ≤10% of investable money; your call), with the four ledgers from section 5.
3. **v3 = D.** Standing approval within hard limits, only if v2 earns it.

### Gates, written down before starting

- **Paper → v2:** at least 63 trading days with no missed runs and no unexplained differences between intended and filled orders. Live costs within ~20% of modelled costs. The strategy's paper return and drawdown fall inside the range the backtest shows for a typical quarter. And the backtest, after the multiple-testing haircut, still beats the benchmark after fees with a smaller max drawdown. **Do not require the paper quarter itself to beat the index**: that is a coin flip (section 2).
- **Conflict with ADR 0002:** ADR 0002 currently makes "beat the benchmark with a smaller max drawdown over at least 3 months of paper" the condition for real money. On its own, that condition rewards a lucky quarter and punishes an unlucky good strategy. I recommend the owner amend ADR 0002 so the bar for real money is the backtest-plus-paper test above. Keep "beat the benchmark after fees with a smaller drawdown" as the goal, but judge it on the backtest and the full live record, not on one quarter.
- **v2 → v3:** at least 6 months on real money with the execution gap small. Human-shadow not worse than Bot A; if your vetoes cost money, stop vetoing. No hard limits breached.
- **Stop or shrink:** a drawdown beyond the backtest's worst case, or 12 months of lagging the benchmark after fees. Then fall back to design E. That outcome is likely, and it is a success for the learning goal.

### Measure

Return after fees, max drawdown, Sharpe, and information ratio against the benchmark, for all four ledgers. Also turnover, costs, acceptance rate, value of vetoes, and time to answer.

### Deliberately NOT in v1

The watcher bot; LLM-written trade cases; any real-money auto-execution; trading during the day; options, margin, shorting or crypto (this matches the proposed D13); automatic parameter tuning or "self-improving" rules; changing rules mid-test; more than ~5 strategies (more variants means more overfitting [5]).

## Sources

All **(not verified: snippet only)**.

[1] Lo, "The Statistics of Sharpe Ratios", FAJ 2002 — https://rpc.cfainstitute.org/research/financial-analysts-journal/2002/the-statistics-of-sharpe-ratios ; SE formula as restated in https://arxiv.org/pdf/1906.01427
[2] Bailey & López de Prado, "The Sharpe Ratio Efficient Frontier" (minimum track record length), J. Risk 2012 — https://www.risk.net/journal-risk/2223785/sharpe-ratio-efficient-frontier
[3] SLCG practice note on Sharpe ratio / MinTRL — https://www.slcg.com/files/practice-notes/sharpe-ratio.pdf
[4] S&P SPIVA US Year-End 2025 — https://www.spglobal.com/spdji/en/spiva/article/spiva-us-year-end-2025/ ; 15-year figure via https://ritholtz.com/2025/05/the-data-on-active-large-cap-underperformance
[5] Bailey, Borwein, López de Prado & Zhu, "The Probability of Backtest Overfitting" — https://papers.ssrn.com/abstract=2326253
[6] Harvey & Liu, "Backtesting", JPM 2015 — https://people.duke.edu/~charvey/Research/Published_Papers/P120_Backtesting.PDF
[7] Bailey & López de Prado, "The Deflated Sharpe Ratio", JPM 2014 — https://papers.ssrn.com/abstract=2460551
[8] Baron & Hershey, "Outcome bias in decision evaluation", JPSP 1988 — https://bear.warrington.ufl.edu/brenner/mar7588/Papers/baron-hershey-jpsp1988.pdf ; replication: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12372742/
[9] Odean, "Are Investors Reluctant to Realize Their Losses?", JF 1998 — https://faculty.haas.berkeley.edu/odean/papers/disposition/disposition.html
[10] Barber & Odean, "Trading Is Hazardous to Your Wealth", JF 2000 — https://ideas.repec.org/a/bla/jfinan/v55y2000i2p773-806.html ; critique: https://sec.gov/comments/s7-12-23/s71223-361219-887502.pdf
[11] Barber, Lee, Liu, Odean & Zhang, "Learning Fast or Slow" (Taiwan day traders) — https://faculty.haas.berkeley.edu/odean/papers/day%20traders/day%20trading%20and%20learning%20110217.pdf ; the "~1%" figure is from secondary summaries only
[12] Grove et al., "Clinical versus mechanical prediction: A meta-analysis", 2000 — https://experts.umn.edu/en/publications/clinical-versus-mechanical-prediction-a-meta-analysis/
[13] Dietvorst, Simmons & Massey, "Algorithm Aversion", JEP:General 2015 — https://knowledge.wharton.upenn.edu/article/how-to-convince-people-to-trust-algorithms/
[14] Dietvorst, Simmons & Massey, "Overcoming Algorithm Aversion", Mgmt Sci 2018 — https://marketing.wharton.upenn.edu/wp-content/uploads/2020/07/Dietvorst-Overcoming-Algorithm-Aversion.pdf
[15] Logg, Minson & Moore, "Algorithm Appreciation", OBHDP 2019 — https://www.hks.harvard.edu/publications/algorithm-appreciation-people-prefer-algorithmic-human-judgment
[16] Fildes et al., "Effective forecasting and judgmental adjustments", IJF 2009 — https://eprints.lancs.ac.uk/id/eprint/45487/
[17] Li et al., alert override review, JMIR Med Inform 2020 — https://medinform.jmir.org/2020/7/e15653
[18] D'Acunto, Prabhala & Rossi, "The Promises and Pitfalls of Robo-Advising", RFS 2019 — https://www.cesifo.org/DocDL/cesifo1_wp6907.pdf
[19] Harvey et al., "Man vs. Machine", JPM 2017 — https://papers.ssrn.com/abstract=2880641
[20] MAS, Financial advisers (licensing) — https://www.mas.gov.sg/regulation/capital-markets/understand-the-types-of-capital-market-entities/financial-advisers
