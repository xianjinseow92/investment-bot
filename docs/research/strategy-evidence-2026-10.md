# How do we know a trading rule works? Evidence for a daily, long-only bot

**Gathered 28 Oct 2026 by a research agent.** Papers, fund-manager sites and the IRS could not be opened from the build environment (SSRN, AQR, NBER and author pages were all blocked). Every claim therefore comes from search-result summaries of the cited source and counts as **not verified (snippet only)**. Check the paper before quoting a number. "(secondary)" means the figure came from a write-up of the paper, not its own abstract. "[bg]" marks background knowledge with no source.

## Words used here

- **Benchmark:** buying and holding an S&P 500 index fund (see `GLOSSARY.md`).
- **Backtest:** run a strategy on past prices as if you had traded it.
- **Moving average (MA):** the average closing price over the last N days or months. "Above the 200-day MA" means today's close is higher than the average of the last 200 closes.
- **Momentum:** what has gone up keeps going up for a while. *Time-series* momentum compares an asset with its own past ("is it up over 12 months?"). *Cross-sectional* momentum ranks assets against each other ("buy the top 10%").
- **Factor:** a shared trait, such as cheapness (value), that has historically been linked to higher returns.
- **Sharpe ratio:** return above cash divided by volatility (how much returns swing around). Higher means more return per unit of risk.
- **Drawdown:** the fall from a previous peak. *Max drawdown* is the worst such fall.
- **Out-of-sample:** data the rule never saw while it was being designed (the design data is *in-sample*). Only out-of-sample results are real evidence.
- **Whipsaw:** a buy signal quickly followed by a sell signal, which costs money for no gain.

## 1. How trading rules get evidence, and when to trust it

Evidence comes in grades, from weakest to strongest: a seller's backtest; a peer-reviewed study with statistical tests; re-tests on later data or other markets; a live track record after costs. "Above the 200-day MA" counts as "known" because it was published in 1992 and re-tested many times since. The re-tests are less flattering than the originals.

**Why backtests mislead:**

- **Data mining (p-hacking).** Try enough rules and some will look great by luck alone. Harvey, Liu & Zhu (2016) argue that because hundreds of factors have been tested, a new one should clear a t-statistic of 3.0 rather than 2.0, and that most claimed findings in finance are likely false [1]. Harvey & Liu (2015) say practitioners routinely cut backtested Sharpe ratios by about 50%. That is only a rule of thumb: the right cut depends on how many tests were run, and marginal results deserve bigger cuts [2].
- **Backtest overfitting.** A high backtest Sharpe ratio is easy to reach after trying only a small number of variants, and there is a minimum backtest length for a given number of trials [3]. The **Deflated Sharpe Ratio** corrects for the number of trials and for non-normal returns [4].
- **Publication decay.** McLean & Pontiff (2016) re-ran 97 published predictors. Returns were 26% lower out-of-sample and 58% lower after publication [5].
- **Survivorship bias.** A database that keeps only today's companies leaves out the ones that went bust. Shumway (1997) found that CRSP, the main academic US stock database, was missing large negative returns for stocks delisted for bad reasons [6].
- **Look-ahead bias.** The rule uses information it would not have had at the time, such as trading at the close that produced the signal [bg].
- **Transaction costs.** Most anomalies with monthly turnover below 50% survive costs; few higher-turnover ones do [7].
- **Regime change.** A rule can work for decades and then stop, as the next example shows.

**The 200-day-style rule, as a case study.** Brock, Lakonishok & LeBaron (1992) tested moving-average rules on the Dow Jones index over 1897–1986. Returns after buy signals beat those after sell signals, and sell-signal returns were negative [8]. Sullivan, Timmermann & White (1999) tested 7,846 rules and corrected for data snooping; the best rule still beat the benchmark over 1897–1986 before costs [9]. Fang, Jacobsen & Qin re-tested the 26 best rules on post-1986 data. The profits did not fade; they stopped. By March 2011, USD 1 had grown to USD 0.85 in the (1, 50) rule and USD 3.87 in buy-and-hold [10]. Bajgrowicz & Scaillet found that the future winning rules could not have been picked in advance, and that performance disappeared after costs [11].

## 2. Strategy families

**a) Trend following / moving-average timing**
- *Rule:* hold the index while its price is above its N-month MA (or its 12-month return is positive); otherwise hold T-bills.
- *Evidence:* Faber (2007) uses a 10-month MA, checked monthly [12]. The 2013 update for the S&P 500 over 1901–2012 reports 10.18% a year compound against 9.32% for buy-and-hold, and a Sharpe ratio of 0.55 against 0.32. The model was invested about 70% of the time and traded less than once a year. The 1930s drawdown fell from 83.7% to 42.2% (secondary) [13]. Moskowitz, Ooi & Pedersen (2012) found that the 12-month trend paid in all 58 futures markets they studied, and paid best in extreme markets [14]. Hurst, Ooi & Pedersen found positive returns in every decade from 1880 to 2016 across 67 markets [15].
- *Weaknesses:* Zakamulin's out-of-sample test (1930–2012, with costs) found about 30% lower volatility, but outperformance came from a few short episodes (secondary) [16]. The futures studies are leveraged and long/short, which this bot cannot copy.
- *Decay:* AQR blames weak trend results over 2010–2018 on a shortage of large market moves [17]. A practitioner backtest over 2000–2022 found the plain 200-day cross returned 3.87% a year against 4.54% for buy-and-hold, with smaller drawdowns [18].

**b) Cross-sectional momentum, and dual momentum / ETF rotation**
- *Rule:* each month, buy the assets with the best 3–12-month returns. *Dual momentum* (Antonacci) holds the stronger of two assets, but only if it also beats T-bills; otherwise it holds bonds.
- *Evidence:* Jegadeesh & Titman (1993) found that past winners kept winning over 3–12 months on NYSE and AMEX stocks, 1965–1989 [19]. The effect continued in 1990–1998 (secondary) [20]. In Antonacci's 1974–2011 data, absolute momentum cut volatility and drawdown the most, and combining both kinds worked best [21].
- *Weaknesses:* momentum crashes in panic periods after market falls, at the moment the market rebounds [22]. The classic results are long/short; a long-only version keeps only part of the effect [bg].
- *Decay:* one later study finds that the original strategy failed over 1999–2012 (secondary) [20].

**c) Value, quality, low volatility (factors)**
- *Rules:* buy cheap stocks (value), profitable and safe ones (quality), or the least volatile ones.
- *Evidence:* Fama & French documented size and value premiums (1992–93), then added profitability and investment factors (2015) [23]. Quality Minus Junk paid in the US and 24 other countries [24]. Among developed-market large caps over 1986–2006, the lowest-volatility tenth had a Sharpe ratio of 0.72, against 0.40 for the market [25].
- *Weaknesses and decay:* AQR concedes that many systematic value strategies "have suffered recently" [26]. Live trading data suggest real trading costs are far below academic estimates [27]. These strategies need fundamental data and stock-level universes, a heavier build.

**d) Short-term reversal / mean reversion (RSI-style)**
- *Rule:* buy what fell over the last week or month (or has a low 2-day RSI); sell after the bounce.
- *Evidence:* weekly and monthly reversals were documented in 1990 [28]. Avramov, Chordia & Goyal (2006) found the profits sit in illiquid stocks and fall short of likely costs; later work finds net profits in large caps with limited trading [29]. Reversal is the strategy most limited by costs [27]. Connors' RSI(2) backtests (1995–2007) had no costs or data-mining checks, and no rigorous post-publication test was found [30].
- *Verdict:* the family most at risk from costs.

**e) Diversified allocation with rebalancing (a second benchmark)**
- *Rule:* hold fixed weights, such as 60% stocks and 40% bonds, and rebalance on a schedule.
- *Evidence:* one study reports an average max drawdown of −15.9% for 60/40 against −26.3% for stocks (period unclear) [31]. In 2022 stocks and bonds fell together and 60/40 lost about 17% (secondary) [31]. Risk parity's case rests on leverage [32]; without leverage it is a low-return, bond-heavy mix [bg].

**f) How retail active traders actually do**
- Barber & Odean (2000) studied 66,465 US households over 1991–1996. The most active earned 11.4% a year while the market returned 17.9% [33].
- Among Taiwanese day traders (1992–2006), fewer than 1% could predictably profit net of fees [34], and 97% are likely to lose money [35].
- Among Brazilians who day-traded futures for at least 300 days (2013–2015), 97% lost money and only 1.1% earned more than the minimum wage [36].

## 3. What to expect, honestly

- **Trend rules on one equity index mainly cut volatility and drawdown; they do not reliably raise return.** Faber's timing slightly beat buy-and-hold only over samples that include the 1930s [13]. Out-of-sample, the gains sat in a few crashes [16], and over 2000–2022 the plain 200-day cross lagged [18].
- In any 5–10-year window, expect to trail the benchmark when there is no crash, and to lose some upside when the market falls and recovers fast [bg].
- The bot's success test (beat the benchmark after fees *and* have a smaller drawdown) has historically been met mainly over periods that include a deep bear market. A realistic target is a similar long-run return with a much smaller max drawdown, below the published figures after costs, tax and decay [2][5].

## 4. Backtesting rules the bot must follow

1. **Point-in-time data:** signals use data available at day t's close; trades happen no earlier than day t+1's open.
2. **Survivorship-free universe** for anything that picks stocks [6]. For ETFs, check fund start dates.
3. **Costs:** commission, half the bid-ask spread, slippage, and SGD→USD conversion. Also report results with costs doubled.
4. **Total return:** dividends after 30% US withholding, plus interest while in cash.
5. **Split the data:** design on the early years, walk forward, and keep the last several years locked until the end.
6. **Log every variant tried**, report the count, and discount the Sharpe ratio for it [2][4]. Prefer 1–2 parameters.
7. **Report each regime separately:** 2000–02, 2008, 2020, 2022 and the 2010s.
8. **Keep turnover low**, ideally a monthly check [7].
9. **Compare with the benchmark** you would really buy (section 5), after its fee and withholding.
10. **Complete the paper period** before any real money.

## 5. Tax note for a Singapore investor

- The US withholds 30% on dividends paid to non-residents unless a treaty lowers it [37]. Singapore has no US income-tax treaty, so US-listed funds such as VOO or SPY lose 30% [38][39].
- The US–Ireland treaty caps portfolio dividends at 15% (Article 10(2)) [40]. Ireland-domiciled S&P 500 UCITS ETFs (for example CSPX or VUAA, listed in London) therefore lose 15% at fund level, and broker guides say Ireland adds nothing on payouts to non-Irish investors [39][41].
- **Gap:** about 15% of the yield. One example puts it at about S$156 a year on S$100,000 at a 1.04% yield, roughly 0.16% a year [41].
- **US estate tax:** broker guides say non-residents' US-situs assets over US$60,000 can attract US estate tax, and Irish funds are not US-situs [41]. Not checked against IRS sources.
- **Implication:** the realistic benchmark is an Ireland-domiciled S&P 500 ETF. A bot trading US-listed ETFs starts about 0.15% a year behind on dividends alone. Frequent systematic trading may also be taxed as income in Singapore; see `brokers-and-data-2026-10.md`.

## Candidate strategies to backtest first

1. **10-month MA timing on the S&P 500** (Faber): monthly check, T-bill ETF when out. One parameter, the longest re-test record, very low turnover, and it answers the 200-day question directly. Also run a daily 200-day version to measure the extra whipsaw cost.
2. **Dual momentum:** US vs. international stocks on a 12-month lookback, with bonds when neither beats T-bills, checked monthly. It tests rotation while keeping the drawdown filter.
3. **Multi-asset trend:** about 5 asset-class ETFs, equally weighted, each held only above its 10-month MA. This is the long-only, unlevered version closest to the diversified trend evidence [12][15].
4. **Benchmarks to beat (not candidates):** an Ireland-domiciled S&P 500 ETF, and 60/40 rebalanced yearly.

Leave reversal and stock-picking factor models for later: their costs, data needs and decay risk are higher.

## Open questions

- Faber's full table, Sullivan–Timmermann–White's post-sample result (a secondary source says the edge vanished) and Hurst et al.'s net figures need the PDFs. Reading them requires allowing ssrn.com, aqr.com and nber.org in the network settings.
- How much worse is a daily 200-day signal than a monthly 10-month one after costs? The bot's own backtest must answer this.
- Is there a free, survivorship-free daily ETF and T-bill data source that goes back past 2000?
- US estate tax and Singapore's "badges of trade" test need IRS and IRAS confirmation or an adviser.
- Which total-return series matches the Irish ETF's 15% withholding? Not checked.

## Sources

[1] Harvey, Liu & Zhu, RFS 29(1) 2016 · https://papers.ssrn.com/abstract=2513152 · https://www.nber.org/papers/w20592
[2] Harvey & Liu, "Backtesting", JPM 2015 · https://people.duke.edu/~charvey/Research/Published_Papers/P120_Backtesting.PDF
[3] Bailey, Borwein, López de Prado & Zhu, "Pseudo-Mathematics and Financial Charlatanism" · https://carmamaths.org/jon/backtest.pdf · https://papers.ssrn.com/abstract=2326253
[4] Bailey & López de Prado, "The Deflated Sharpe Ratio", JPM 40(5) 2014 · https://papers.ssrn.com/abstract=2460551
[5] McLean & Pontiff, JF 2016 · https://Www.Gwern.net/doc/economics/2016-mclean.pdf · https://ivey.uwo.ca/media/3775549/pontiff.pdf
[6] Shumway, "The Delisting Bias in CRSP Data", JF 1997 · https://ideas.repec.org/a/bla/jfinan/v52y1997i1p327-40.html
[7] Novy-Marx & Velikov, RFS 2016 · https://www.nber.org/papers/w20721.pdf
[8] Brock, Lakonishok & LeBaron, JF 1992 · https://ideas.repec.org/a/bla/jfinan/v47y1992i5p1731-64.html
[9] Sullivan, Timmermann & White, JF 1999 · https://researchonline.lse.ac.uk/id/eprint/119144 · https://www.efmaefm.org/0EFMAMEETINGS/EFMA%20ANNUAL%20MEETINGS/2008-Athens/papers/Bajgrowicz.pdf
[10] Fang, Jacobsen & Qin (out-of-sample retest), plus a secondary summary of STW's post-sample result · https://cxoadvisory.com/?p=20970 · https://www.efmaefm.org/0EFMAMEETINGS/EFMA%20ANNUAL%20MEETINGS/2008-Athens/papers/Bajgrowicz.pdf
[11] Bajgrowicz & Scaillet · https://archive-ouverte.unige.ch/unige:79889
[12] Faber, "A Quantitative Approach to Tactical Asset Allocation", 2007 · https://papers.ssrn.com/sol3/papers.cfm?abstract_id=962461
[13] Faber 2013 update · https://gallery.mailchimp.com/6750faf5c6091bc898da154ff/files/Faber_Quant_2013_Update.pdf · figures via https://the7circles.uk/tactical-asset-allocation-meb-faber/
[14] Moskowitz, Ooi & Pedersen, JFE 2012 · https://papers.ssrn.com/abstract=2089463 · Kim–Tse–Wald critique via https://quantpedia.com/deconstructing-the-time-series-momentum-strategy/
[15] Hurst, Ooi & Pedersen, "A Century of Evidence on Trend-Following Investing", JPM 2017 · https://www.aqr.com/Insights/Research/Journal-Article/A-Century-of-Evidence-on-Trend-Following-Investing · https://alphaarchitect.com/trend-following-is-everywhere/
[16] Zakamulin, J. Asset Management 2014 · https://ideas.repec.org/a/pal/assmgt/v15y2014i4d10.1057_jam.2014.25.html · https://www.etf.com/sections/index-investor-corner/swedroe-beware-lure-market-timing
[17] Babu et al., "You Can't Always Trend When You Want", JPM 2020 · https://www.aqr.com/Insights/Research/Journal-Article/You-Cant-Always-Trend-When-You-Want
[18] StockCharts / TrendInvestorPro 200-day backtest 2000–2022 (practitioner) · https://articles.stockcharts.com/article/articles-arthurhill-2022-12-sp-500-crosses-above-200day-sm-360/
[19] Jegadeesh & Titman, JF 1993 · https://ideas.repec.org/a/bla/jfinan/v48y1993i1p65-91.html
[20] Jegadeesh & Titman, JF 2001 · https://www.nber.org/papers/w7159 · figures via https://www.efmaefm.org/0EFMAMEETINGS/EFMA%20ANNUAL%20MEETINGS/2007-Austria/papers/0179.pdf · later failure via https://quantpedia.com/has-momentum-lost-its-momentum/
[21] Antonacci, "Risk Premia Harvesting Through Dual Momentum" · https://gnanaganga.inflibnet.ac.in:8443/jspui/handle/123456789/14295 · https://alphaarchitect.com/risk-premia-harvesting-through-momentum/
[22] Daniel & Moskowitz, "Momentum Crashes", JFE 2016 · https://www.nber.org/papers/w20439
[23] Fama–French summaries · https://ifa.com/articles/papers_that_changed_investing_forever · https://www.robeco.com/files/docm/docu-five-concerns-with-the-five-factor-model-2018.pdf
[24] Asness, Frazzini & Pedersen, "Quality Minus Junk", RAS 2019 · https://papers.ssrn.com/abstract=2312432
[25] Blitz & van Vliet 2007; Frazzini & Pedersen 2014 (secondary) · https://alphaarchitect.com/betting-against-beta-new-insights/ · https://www.etf.com/sections/index-investor-corner/swedroe-betting-against-beta
[26] Israel, Laursen & Richardson, "Is (Systematic) Value Investing Dead?" · https://www.aqr.com/insights/research/journal-article/is-systematic-value-investing-dead
[27] Frazzini, Israel & Moskowitz, "Trading Costs of Asset Pricing Anomalies" · https://conference.nber.org/conf_papers/f68262/f68262.pdf
[28] Lehmann, QJE 1990 · https://www.nber.org/papers/w2533 · Jegadeesh 1990 via https://alphaarchitect.com/quantitative-momentum-research-short-term-return-reversal/
[29] Avramov, Chordia & Goyal, JF 2006 · https://ideas.repec.org/a/bla/jfinan/v61y2006i5p2365-2394.html · later evidence https://efmaefm.org/0EFMAMEETINGS/EFMA%20ANNUAL%20MEETINGS/2011-Braga/papers/0259_update.pdf
[30] Connors RSI(2) summary · https://www.cxoadvisory.com/technical-trading/a-few-notes-on-short-term-trading-strategies-that-work/
[31] 60/40 drawdowns · https://caia.org/node/5965 · https://dimensional.com/us-en/insights/the-60-40-portfolio-down-but-not-out
[32] Asness, Frazzini & Pedersen, "Leverage Aversion and Risk Parity", FAJ 2012 · https://ideas.repec.org/a/taf/ufajxx/v68y2012i1p47-59.html
[33] Barber & Odean, "Trading Is Hazardous to Your Wealth", JF 2000 · https://faculty.haas.berkeley.edu/odean/papers/returns/returns.html
[34] Barber, Lee, Liu & Odean, J. Financial Markets 2014 · https://ideas.repec.org/a/eee/finmar/v18y2014icp1-24.html
[35] Barber, Lee, Liu, Odean & Zhang, "Learning, Fast or Slow", RAPS 2020 · https://ideas.repec.org/a/oup/rasset/v10y2020i1p61-93..html
[36] Chague, De-Losso & Giovannetti, "Day Trading for a Living?" · https://econpapers.repec.org/RePEc:fgv:eesptd:525 · https://repositorio.fgv.br/items/e87d04fc-4b4c-4a56-ab5a-1c84c1afde1b/full
[37] IRS, withholding on US-source income of nonresident aliens · https://www.irs.gov/individuals/international-taxpayers/federal-income-tax-withholding-and-reporting-on-other-kinds-of-us-source-income-paid-to-nonresident-aliens · https://www.irs.gov/pub/irs-pdf/p515.pdf
[38] Sibling note, source [38] there · https://www.syfe.com/magazine/us-withholding-tax-dividends-singapore-investor-guide/
[39] https://www.stashaway.sg/r/guide-ireland-domiciled-etfs-singapore · https://www.syfe.com/magazine/cspx-vs-vwra-vs-iwda-vs-spyl-vs-vuaa-ucits-etfs-invest
[40] US–Ireland tax convention · https://www.irs.gov/pub/irs-trty/ireland.pdf · IRS treaty Table 1 https://www.irs.gov/pub/irs-lbi/tax-treaty-table-1.pdf
[41] https://www.stashaway.sg/r/dividend-withholding-tax-estate-tax-us-equities-singapore · https://paasa.com/blog/dividend-withholding-tax-on-irish-ucits
