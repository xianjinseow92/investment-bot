# Investing basics: Resources

Curated 28 Oct 2026. URLs were checked by web search, not opened directly. An entry marked "(URL not confirmed)" has an address that was inferred, not seen in search results.

## Knowledge

- [Website: Introduction to Investing by US SEC (Investor.gov)](https://www.investor.gov/introduction-investing)
  The US regulator's plain-English basics: what a stock is, how stock markets work (brokers, exchanges, executing an order), a glossary (P/E, compound interest) and a compound interest calculator. Use for: what a share is, how a trade reaches the market, P/E definition, compounding.

- [Bulletin: Understanding Order Types by US SEC (Investor.gov)](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-14)
  Market vs limit vs stop orders, why a market order can fill at a worse price than you saw, and time-in-force (day, GTC). Use for: how prices move between decision and fill, what the bot should send to the broker, slippage.

- [Bulletin: Index Funds by US SEC (Investor.gov)](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-26)
  What an index fund is, full vs sampled replication, tracking error, and why "index" does not always mean cheap (2018). Use for: index funds, the benchmark the bot has to beat.

- [Report: SPIVA U.S. Scorecard by S&P Dow Jones Indices](https://www.spglobal.com/spdji/en/spiva/article/spiva-us/)
  Twice-yearly count of how many active US funds trail their benchmark; Year-End 2025 shows most large-cap funds lagging the S&P 500 over 1, 3 and 5 years. S&P sells indexes, and a 2026 industry-funded study disputes the method, so read it as strong evidence, not gospel. Use for: benchmarks, why "beat the index after fees" is a hard bar.

- [Guide: Guide to shares: How to invest by MAS MoneySense (Singapore)](https://www.moneysense.gov.sg/guide-to-shares-how-to-invest/)
  Singapore government guide to the mechanics: brokerage and CDP accounts, board lots, order types, the fees on every trade (commission, clearing, GST) and the risks, including margin. The wider [MoneySense investing hub](https://www.moneysense.gov.sg/investing/) covers diversification and risk. Use for: costs per trade, Singapore context, risk basics.

- [Official page: Gains from sale of property, shares and financial instruments by IRAS](https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/what-is-taxable-what-is-not/gains-from-sale-of-property-shares-and-financial-instruments)
  Singapore's tax authority on when share gains are tax-free capital gains and when they count as taxable trading income (frequency, intention, holding period, borrowing). Use for: taxes for a Singapore investor, why an active bot's trading pattern can matter for tax.

- [Official page: Withholding on US-source income paid to nonresident aliens by IRS](https://www.irs.gov/individuals/international-taxpayers/federal-income-tax-withholding-and-reporting-on-other-kinds-of-us-source-income-paid-to-nonresident-aliens)
  Why US dividends paid to a non-US person usually lose 30% at source, and the W-8BEN form brokers ask for. Singapore is generally understood to have no income tax treaty with the US, so expect the full 30% (not verified in this search; confirm on the IRS treaty list). Use for: costs and taxes, why dividend yield shrinks for a Singapore holder.

- [Official FAQ: Estate taxes for nonresidents not citizens of the United States by IRS](https://www.irs.gov/businesses/small-businesses-self-employed/frequently-asked-questions-on-estate-taxes-for-nonresidents-not-citizens-of-the-united-states)
  US shares count as US assets for US estate tax wherever you live; a return is needed above US$60,000. Use for: taxes for a Singapore investor, account-size risk most beginners never hear about.

- [Wiki: Non-US investor's guide to navigating US tax traps by Bogleheads](https://www.bogleheads.org/wiki/Non-US_investor's_guide_to_navigating_US_tax_traps)
  Community-maintained, well-sourced explainer that ties together dividend withholding, US estate tax and the US-listed vs Ireland-listed ETF choice for non-US investors. Not official advice; check it against the IRS pages above. Use for: taxes for a Singapore investor, choosing which ETF to benchmark against.

- [Course: Stocks and bonds (Finance and capital markets) by Khan Academy](https://www.khanacademy.org/economics-finance-domain/core-finance/stock-and-bonds#stocks-intro-tutorial)
  Short videos with worked numbers: market cap, P/E, equity vs debt, and [why bond prices fall when interest rates rise](https://www.khanacademy.org/economics-finance-domain/core-finance/stock-and-bonds/bonds-tutorial/v/relationship-between-bond-prices-and-interest-rates) (the present-value idea behind it). Use for: P/E, valuation basics, interest rates and discounting.

- [Free course: Foundations of Finance (Online Classes) by Aswath Damodaran, NYU Stern](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/onlineclass.htm)
  A valuation professor's free nine-session starter: time value of money, risk, and how stocks and bonds are valued. Recommended by him as the first course for people with no finance background. Use for: valuation basics, why higher rates lower what future profits are worth today.

- [Explainer: Monetary Policy: What Are Its Goals? How Does It Work? by US Federal Reserve Board](https://www.federalreserve.gov/monetarypolicy/monetary-policy-what-are-its-goals-how-does-it-work.htm)
  The Fed's own account of how it sets short-term rates and how that flows into borrowing costs, spending and asset prices, stocks included. Use for: interest rates and why they move prices, reading rate-decision news.

- [Book: A Random Walk Down Wall Street (50th anniversary ed., 2023) by Burton Malkiel](https://en.wikipedia.org/wiki/A_Random_Walk_Down_Wall_Street)
  Readable, evidence-based tour of how prices move, bubbles, valuation theories, technical analysis and why index funds are hard to beat. Beginner level. Link is to an overview; buy or borrow any recent edition. Use for: how prices move, efficient markets, the case the bot must argue against.

- [Book: Systematic Trading (2015) by Robert Carver](https://www.harriman-house.com/systematic-trading)
  Former AHL hedge-fund manager on designing rules-based systems: trading rules, position sizing, volatility targeting, costs, and why over-fitted backtests disappoint. Intermediate; the closest book to what this bot is. Use for: risk and drawdown, position sizing, how trading rules are designed and tested.

- [Book: Quantitative Trading, 2nd ed. (2021) by Ernest P. Chan](https://au.mathworks.com/academia/books/quantitative-trading-chan.html)
  Practitioner's guide to building a small systematic trading operation, with code: backtesting step by step, look-ahead and survivorship bias, transaction costs. Intermediate; some strategies (pairs, shorting) are beyond v1's long-only scope. Link is the MathWorks book listing (Wiley, ISBN 9781119800064). Use for: how backtests are built and how they mislead, costs in a backtest.

- [Paper: Pseudo-Mathematics and Financial Charlatanism (Notices of the AMS, 2014) by Bailey, Borwein, López de Prado and Zhu](https://www.ams.org/notices/201405/rnoti-p458.pdf)
  Free, readable paper showing that trying even a modest number of strategy variants makes a great-looking backtest almost guaranteed, and why the count of variants tried must be reported. Their technical follow-up is [The Probability of Backtest Overfitting](https://papers.ssrn.com/abstract=2326253). Use for: how backtests mislead, overfitting.

- [Paper: Backtesting (Journal of Portfolio Management, 2015) by Campbell Harvey and Yan Liu](https://people.duke.edu/~charvey/Research/Published_Papers/P120_Backtesting.PDF)
  Duke professor's method for "haircutting" a backtest's Sharpe ratio for the number of strategies tested; mid-strength results get cut hardest. More mathematical; read after the AMS paper. Use for: how backtests mislead, judging whether a result is real.

- [Bulletin: Understanding Margin Accounts by US SEC (Investor.gov)](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-29)
  How borrowing from a broker works, margin calls, forced selling, interest, and a worked example of losing more than you put in; also how options accounts relate to margin (2021). Use for: later lessons on margin and options (not v1).

## Wisdom (Communities)

- [Bogleheads forum](https://www.bogleheads.org/)
  Long-running index-investing forum with strict, published [rules](https://www.bogleheads.org/forum/rules): no promotion or affiliate links, no crypto-as-strategy, AI-written replies must be labelled, and a moderator appeal process. Has an active non-US investing section with Singapore threads. Caveat: firmly passive, so expect scepticism toward active trading bots, which is useful pushback. Use for: index funds, benchmarks, Singapore/US tax setup questions.

- [r/singaporefi (Reddit)](https://www.reddit.com/r/singaporefi/) (URL not confirmed)
  Large Singapore personal-finance and financial-independence subreddit (200k+ members): CPF, local brokers, fees, tax. Rules and moderation quality could not be checked (Reddit is blocked to the search tool). Caveat: anonymous, uneven quality, some referral-code and product chatter; check claims against MoneySense and IRAS. Use for: Singapore broker and cost realities.

- [r/algotrading (Reddit)](https://www.reddit.com/r/algotrading/) (URL not confirmed)
  Large algorithmic-trading community; its sidebar asks newcomers to read the wiki/FAQ first. Caveat: very mixed signal, lots of unverified profit claims and vendor posts. Most useful for code and data-plumbing questions and for seeing common backtest mistakes, not for strategy ideas. Use for: bot infrastructure, backtest pitfalls in practice.

- [QuantConnect forum](https://www.quantconnect.com/forum/)
  Forum of an open-source backtesting platform (LEAN); staff answer questions, a code of conduct bans spam and promotion, and posting needs part of their bootcamp done first. Caveat: platform-centric, and shared backtests are often overfit. Use for: backtesting mechanics, data issues, testing rules.

- [Quantitative Finance Stack Exchange](https://quant.stackexchange.com/) (URL not confirmed)
  Voted Q&A for practitioners and academics; no chit-chat, so answers on statistics, backtest bias and risk measures tend to be precise. Caveat: assumes maths, and beginner questions may be closed; search before asking. Use for: precise answers on testing and risk metrics.

## Gaps

- **Drawdown and risk for beginners:** no regulator or education body found that explains maximum drawdown, volatility and position sizing with worked numbers. Carver's book covers it but is paid and intermediate. A short own-written lesson with a running example is probably needed.
- **Singapore tax line for active trading:** IRAS gives factors, not a bright-line test, for when frequent trading becomes taxable income. Nothing authoritative says how a scheduled bot's trading would be judged. Check with a Singapore tax adviser before real money.
- **Holding US stocks from Singapore:** no neutral, high-trust source found on how Singapore brokers hold US shares (custodian vs CDP), FX conversion costs, or US estate-tax exposure through a broker. Broker pages are product marketing; MoneySense covers SGX shares only.
- **Options (later):** not added yet to keep the list focused. When needed, start with the official [Characteristics and Risks of Standardized Options](https://www.theocc.com/company-information/documents-and-archives/options-disclosure-document) by the Options Clearing Corporation.
- **Paid material:** Malkiel, Carver and Chan are paid books (library copies may exist). Everything else is free.
- **Dates:** the SEC bulletins date from 2018 to 2021; rules (margin levels, order types) may have changed. Tax figures change; recheck IRS and IRAS pages before relying on numbers.
- **Considered and left out:** Graham's *The Intelligent Investor* (Zweig ed.), dense and focused on picking individual value stocks, better after the basics; Bogle's *Little Book of Common Sense Investing*, overlaps Malkiel and Bogleheads; Housel's *Psychology of Money*, anecdotal rather than mechanism-based; FINRA investor education, overlaps Investor.gov; SGX Academy, found material was dated and focused on SGX products, with some courses run by outside vendors; Seedly, a commercial platform with product promotion.
