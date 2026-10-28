# Brokers, data and tax for a Singapore-based trading bot

**Gathered 28 Oct 2026 by a research agent.** Broker websites could not be opened from the build environment, so every claim here comes from search-result summaries and counts as **not verified**. Check the official page before relying on any of it. "[bg]" marks background knowledge with no source.

## Comparison

| | Alpaca | IBKR (SG) | moomoo SG | Tiger SG | Saxo SG |
|---|---|---|---|---|---|
| SG resident, live account | Unclear. A third party says yes; Alpaca says not every country is supported. SG licence is in-principle only [1][2] | Yes, USD 0 minimum [6] | Yes | Yes | Yes (MAS-regulated) [17] |
| Paper trading via API | Yes, free, no funding needed [3] | Free, needs a live account first [7] | Yes ("SIMULATE"), free, no securities account needed [10] | Yes; activating it needs a funded account [12] | Free simulated account; 24-hour dev token or OAuth app [15] |
| How realistic paper fills are | Fills at the best market price, 10% random partial fills, no dividends [4] | Simulated against live data [bg] | Uses real market data [10] | n/a | n/a |
| Markets via API | US stocks/ETFs, options, crypto; fractional shares [bg] | Global incl. SGX/HK/US/options; fractional on Lite [8] | US yes; **SGX stocks not supported** [11] | Paper: US, HK, China A-shares (old doc) [12] | Multi-asset [bg] |
| Market data | Free: real-time IEX feed, full market feed 15 min delayed; full real-time USD 99/mo [3] | Paid subscriptions; 10 req/s [9] | Per-market quote rights; history quota 100 symbols / 30 days at base tier [11] | API quotes are a separate paid subscription [12] | Live data needs a separate agreement [15] |
| Needs a program running beside the bot? | No; REST and WebSocket [bg] | **Yes**: TWS or IB Gateway. The Web API uses a gateway too, or OAuth (documented for institutions) [5] | **Yes**: the OpenD program [10] | No; Python/Java SDKs, RSA key [bg] | No; REST, OAuth [bg] |
| US stock commission | n/a | Lite: USD 0 [8]; Pro: USD 0.005/share, min USD 1 [7] | USD 0 + USD 0.99 platform fee/order [13] | Sources conflict [14] | 0.08%, min USD 1 [16] |
| SGD to USD conversion | 0.20 bp, min USD 2 [18] | — | ~0.2% spread [13] | "No FX fee" claimed [14] | 0.25% [16] |
| Request limits | 200/min [4] | 10/s [9] | — | 10–120/min by tier [19] | 120/min [20] |

## What matters for a bot that runs unattended

- **IBKR:** the gateway program "does not support automated authentication" and resets daily [21]. With TWS or IB Gateway you still approve a two-factor login by hand about once a week [22].
- **moomoo:** the OpenD program must run on your server, and the paper account can only be reset in the app [10].
- **Saxo:** live API access needs a funded live account and an existing simulated-account app; approval is usually automatic [17].
- **Alpaca:** the USD 30k minimum for non-US individuals was dropped [23], but whether SG residents can open live accounts is unconfirmed.

## Crypto

- **Binance:** stopped serving SG residents (MAS, 2021–22) [24]. A testnet still exists [25].
- **Coinbase:** has a MAS licence [26]. Its "sandbox" only returns fixed mock responses, so it is not real paper trading [27].
- **Kraken:** no MAS licence found [28]. Its futures demo is free and needs no account [28].
- **OKX:** has demo trading [29]; SG licence status not found.
- SG's digital token service provider rules have applied since 30 Jun 2025 [30].

## Other facts

- **US day-trading rule:** the SEC approved replacing the Pattern Day Trader rule and its USD 25k minimum with an intraday-margin standard on 14 Apr 2026. It took effect on 4 Jun 2026, and brokers can phase it in until 20 Oct 2027 [31][32].
- **Daily price history for backtesting:**
  - Tiingo free tier: 500 symbols/month, end-of-day data back decades [33].
  - Massive (formerly Polygon) free tier: 5 calls/min, 2 years of history [34].
  - Alpaca free data [3].
  - Yahoo via yfinance: unofficial and heavily rate-limited since 2025 [35].
- **Singapore tax:** IRAS says gains from shares are generally not taxable as personal investment [36]. Frequent, systematic trading can be taxed as income under the "badges of trade" (secondary source) [37]. There is no US–SG tax treaty, so US dividends are taxed 30% at source, and a W-8BEN form is still needed [38].

## Still unknown

- Alpaca live-account eligibility for SG residents.
- Tiger's current US fees.
- Fractional shares via API at moomoo and Tiger.
- OKX SG licence.
- Whether Coinbase Advanced (as opposed to the retail app) is available in SG.

## Sources

[1] https://brokerchooser.com/broker-reviews/alpaca-trading-review/alpaca-trading-singapore · https://alpaca.markets/support/is-alpaca-available-outside-the-us
[2] https://alpaca.markets/blog/alpaca-secures-mas-in-principle-approval-to-launch-brokerage-services-in-singapore/
[3] https://apis.io/plans/alpaca-markets/alpaca-markets-plans-pricing/
[4] https://forum.alpaca.markets/t/is-there-a-way-to-increase-the-200-min-api-call-limit-for-the-trading-endpoint/18110 · https://blog.traderspost.io/article/alpaca-paper-trading
[5] https://www.interactivebrokers.com/docs/web-api/authentication/oauth-1a/introduction · https://github.com/Voyz/ibind/wiki/OAuth-1.0a
[6] https://www.interactivebrokers.com.sg/en/index.php?f=47341
[7] https://www.benzinga.com/money/interactive-brokers-for-paper-trading · https://www.interactivebrokers.com.sg/en/trading/impact/pricing.php
[8] https://www.businesswire.com/news/home/20250812055965/en/Interactive-Brokers-Launches-Zero-Commission-US-Stock-Trading-in-Singapore
[9] https://www.interactivebrokers.com/docs/web-api/trading/usage-and-availability/pacing-limitations.md
[10] https://open.moomoo.com/ · https://openapi.moomoo.com/futu-api-doc/en/qa/trade.html · https://moomoo.com/support/topic3_436
[11] https://openapi.moomoo.com/futu-api-doc/en/intro/authority.html
[12] https://docs-en.itigerup.com/docs/account-type · https://quant.itigerup.com/openapi/en/cpp/overview/introduction.html
[13] https://www.moomoo.com/sg/learn/moomoo-vs-webull-singapore · https://thekopinotes.com/articles/etfs/moomoo-brokerage-singapore-review-2026/
[14] https://growbeansprout.com/tiger-brokers-review · https://seedly.sg/posts/tiger-brokers-discount-code-cg149g-plus-a-breakdown-of-what-you-actually-pay-in-fees/
[15] https://www.developer.saxo/openapi/learn/environments
[16] https://www.moneysmart.sg/online-brokerage/saxo · https://home.saxo/en-sg/content/commentaries/pr/press-release/saxo-introduces-better-pricing-lowering-overall-trading-costs-for-investors-04032024
[17] https://developer.saxo/openapi/learn/direct-clients-request-for-openapi-application-credentials-for-the-live-environ
[18] https://ndcdyn.interactivebrokers.com/en/index.php?f=49654
[19] https://docs-en.itigerup.com/docs/ratelimit
[20] https://developer.saxo/openapi/learn/rate-limiting
[21] https://www.interactivebrokers.com/docs/web-api/authentication/cpgw/client-portal-gateway-faq.md
[22] https://www.interactivebrokers.com/docs/tws-api/doc/tws-settings/daily-weekly-reauthentication
[23] https://alpaca.markets/support/alpaca-minimum-deposit
[24] https://www.blockworks.com/news/binance-asia-will-end-service-in-singapore · https://www.theblock.co/post/116409/binance-singapore-investor-alert-list-mas
[25] https://developers.binance.com/docs/binance-spot-api-docs/testnet/general-info
[26] https://www.theblock.co/amp/post/253755/coinbase-granted-full-license-in-singapore
[27] https://docs.cdp.coinbase.com/advanced-trade/docs/sandbox
[28] https://web3.career/web3-companies/kraken+singapore · https://docs.kraken.com/api/docs/guides/futures-introduction
[29] https://docs.rs/crate/rust-okx/0.3.0
[30] https://wublock.substack.com/p/singapores-new-crypto-regulations
[31] https://www.wilmerhale.com/en/insights/client-alerts/20260423-sec-approves-amendments-to-finra-rule-4210-replacing-day-trading-margin-requirements-with-a-modernized-intraday-margin-standard
[32] https://www.schwab.com/learn/story/sec-approves-scrapping-25000-day-trader-minimum
[33] https://www.quantstart.com/articles/evaluating-data-coverage-with-tiingo/
[34] https://qveris.ai/guides/stock-api-free-comparison/?lang=en
[35] https://github.com/ranaroussi/yfinance/discussions/2431
[36] https://iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/what-is-taxable-what-is-not/gains-from-sale-of-property-shares-and-financial-instruments
[37] https://wiki.private.law/en/singapore-capital-gains-vs-trading
[38] https://www.syfe.com/magazine/us-withholding-tax-dividends-singapore-investor-guide/
