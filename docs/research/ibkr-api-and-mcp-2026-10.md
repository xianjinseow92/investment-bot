# IBKR APIs, MCP connector and unattended running (Oct 2026)

**Gathered 28 Oct 2026 by a research agent.** IBKR's sites could not be opened from the build environment, so IBKR claims come from search snippets. Tags: **[V]** verified by reading the primary source (GitHub repo, README or code); **[S]** not verified, search snippet only; **[bg]** background knowledge, unsourced. Numbers point to the sources at the end.

## 1. MCP and AI connectors

**Yes, IBKR runs an official MCP server.** MCP (Model Context Protocol) is a standard way for AI apps to call outside tools.

- **Timeline [S]:** Claude connector 1 Jun 2026 [1]; ChatGPT and Grok 22 Jun [2]; any MCP client via `https://api.ibkr.com/v1/api/mcp-public` 28 Jul [3]; "Autonomous Trading" 21 Oct [4].
- **Singapore [S]:** IBKR Singapore has its own AI Integration page. Only India and Japan are listed as excluded [5][6].
- **What it can do:** read balances, positions, orders, trades, snapshots and **price history**; manage alerts and watchlists [V: tool names listed by a wrapper, 7]. By default the AI only drafts **order instructions** that you approve in an "AI Instructions" tab [2][3] [S].
- **Login:** OAuth 2.0 with your normal IBKR login [2] [S]. Scopes `mcp.read`, `mcp.write` and a separate `mcp.orders.submit`; refresh tokens issued [V: wrapper source, 7]. Users report ~1 h access tokens that some clients fail to refresh [8] [S].
- **Autonomous Trading [S] [4][9]:** the AI can place orders without a per-order approval, but only inside a separate "AI Partition".
  - Only individual **cash (non-margin)** accounts; **Lite**, joint and retirement excluded. First needs 10 approved trades of ≥USD 100 over two weeks.
  - Capped at 10% of equity and USD 25k. Market, limit, stop, stop-limit; Day or Overnight only. No fractional shares or shorting.
  - Depends on entity and country; nothing confirms Singapore.
- **Paper accounts:** a community wrapper's README says the official connector accepts a paper login [7] [V that it says so; untested]. A snippet quotes IBKR staff: access *cannot be limited* to a paper account, and authorising a second AI app disconnects the first [10] [S].

**Notable community MCP servers** (stars as of 28 Oct 2026; last commit from a shallow clone) [V]:

| Repo | Stars | Last commit | Wraps | Notes |
|---|---|---|---|---|
| code-rabi/interactive-brokers-mcp [11] | 227 | 2026-07-21 | Client Portal Gateway (bundled), browser login | "Alpha". Places orders. Optional TOTP auto-2FA, a code generated from a stored secret; the README warns this is risky. |
| rcontesti/IB_MCP [12] | 141 | 2025-10-23 | Client Portal Gateway in Docker | Manual browser login, `/tickle` keep-alive |
| seriallazer/ibkr-mcp-server | 65 | 2026-03-19 | TWS API | — |
| ArjunDivecha/ibkr-mcp-server | 35 | archived | TWS API | — |
| Hellek1/ib-mcp [13] | 19 | 2026-10-01 | ib_async → TWS/Gateway | Read-only |
| tivojn/ibkr-mcp-guard [7] | new | 2026-10-07 | IBKR's **official** MCP | Blocks order submission, except on paper accounts |

**Does any MCP route avoid the gateway and 2FA?**

- Community servers do not: they wrap TWS/IB Gateway or the Client Portal Gateway and inherit the same logins.
- The official MCP needs no gateway, but needs a browser OAuth login and working token refresh. Whether refresh tokens last weeks unattended is **unknown**. It is built for chat assistants, not scheduled bots.

## 2. APIs for a bot

- **TWS API:**
  - A socket (direct network connection) API to a running TWS desktop app or IB Gateway; near-full TWS features [14] [S].
  - Latest 10.49 (3 Aug 2026, GPL licence) [15] [S]. Requires **IBKR Pro** [16] [S].
- **Client Portal Web API (REST, "Web API 1.0"):**
  - Individuals must run the Java Client Portal Gateway and log in through a browser. Sessions last up to 24 h and reset at midnight. You must call `/tickle` about every minute.
  - IBKR says it "does not support an automated authentication process" and advises against third-party login tools [17] [S].
- **OAuth 1.0a (no gateway):**
  - Officially aimed at third-party and institutional users [18] [S].
  - But ibind's docs report many *individual* Pro users registering live **and paper** keys via the self-service portal; activation can take up to two weeks [19] [V that the docs say so].
  - No daily browser login: ibind generates the session token itself.
- **OAuth 2.0:** a restricted beta for special Financial Advisor cases, per an IBKR agent quoted in ibind's docs [19] [V that the docs say so]. Not open to retail.
- **FIX:** no evidence that it is offered to small individual accounts [bg].
- **IBKR's recommendation for individuals:** no explicit 2026 statement found. Its docs present TWS API or Client Portal Gateway as the paths for individuals [14][18] [S].

**Libraries [V]:**

| Library | Stars | State |
|---|---|---|
| ib_async [20] | 1,773 | Successor to ib_insync. v2.1.0 released Dec 2025; `next` branch active (Jul 2026). IBKR's docs point ib_insync users to it [21] [S]. |
| ibind [19] | 448 | Web API client with REST, WebSocket and OAuth 1.0a. v0.2.2; last commit 6 Oct 2026. |
| IBeam [22] | 863 | Automates Client Portal Gateway login using a scripted browser |
| **IBC** [23] | 1,607 | Auto-login and restarts for TWS/Gateway. **Retired 1 Sep 2026 and archived.** Bug fixes only; a final release is planned. Latest tag 3.24.2. |
| gnzsnz/ib-gateway-docker [24] | 1,282 | IB Gateway plus IBC in Docker. Updated 27 Oct 2026; can run paper, live or both. Depends on IBC. |

## 3. Running unattended

- **IBC guide [23] [V]:** after **one** 2FA login, Gateway auto-restarts daily without 2FA. Credentials expire **weekly** (full login after 01:00 ET Sunday). 2FA is an IBKR Mobile push you must tap within ~3 min; IBC can re-send it until you respond. The Docker image exposes this as `AUTO_RESTART_TIME` and `TWOFA_TIMEOUT_ACTION=restart` [24] [V].
- **Paper and 2FA:** reports conflict [25] [S]. Some users say paper logins need no 2FA, and others say they do. Test it yourself.
- **Weekly effort with Gateway:** one phone approval around Monday (SG time), plus the occasional failed restart, maintenance disconnect or Gateway update [bg].
- **Cloud servers:** Gateway has a Trusted IPs setting. Client Portal sessions are tied to the IP that logged in [26] [S].

## 4. Paper trading

- **Getting one:** go to Settings → Account Configuration → Paper Trading Account. It needs a funded, approved live account and is ready by the next business day [27] [S]. API logins use the separate **paper username** [27] [S].
- **Fills [28] [S]:** simulated from top-of-book only; the rest of a partly filled market order is rejected; VWAP, auction and pegged orders unsupported. A secondary source says splits and dividends are not processed. Expect cleaner fills than live, especially at the open/close auctions.
- **Market data:** live subscriptions can be shared with paper (same device; not both at once). Otherwise paper gets delayed data [29] [S].
- **Reset:** simulated cash can be reset (to USD 1M or another amount) in Client Portal [28] [S].

## 5. Market data cost (daily US bars)

- Free delayed **streaming** quotes work via the API (`reqMarketDataType(3)`), but **"historical data still requires market data subscriptions"** [30] [S]; otherwise error 162 [31] [S].
- The base bundle is "US Securities Snapshot and Futures Value Bundle": USD 10/month, waived in months with USD 30 of commissions. Streaming adds about USD 1.50 per exchange network [32] [S].
- Placing orders doesn't strictly need data subscriptions [bg].
- **Pacing (request rate limits):** 60 historical requests per 10 minutes for small bars [30] [S]. Limits on daily bars are softer [bg].
- An outside daily-bar source avoids IBKR data fees (see `brokers-and-data-2026-10.md`).

## 6. Costs (Singapore)

- **IBKR Lite** launched in Singapore on 12 Aug 2025: USD 0 commission on US stocks and ETFs [33] [S]. **Lite has no API access** [16] [S], and it is excluded from Autonomous Trading [9] [S].
- **IBKR Pro:** fixed USD 0.005/share (min USD 1, max 1%) or tiered USD 0.0005–0.0035/share plus exchange fees [34] [S]. Switch Lite↔Pro any time [33] [S].
- **SGD → USD:** 0.20 bp, min USD 2 per conversion [35] [S, IBKR Japan page], plus 9% GST on fees [bg]. Convert in large, rare batches.

## 7. Other relevant points

- **"Next open" orders:** market-on-open is `orderType=MKT` with `tif=OPG`; limit-on-open is LMT + OPG [36] [S]. These suit a decide-after-close bot. Exchange cutoffs are about 09:28 ET [bg].
- **Fractional shares via API:** sources conflict. An IBKR FAQ says FIX/CTCI only, not the API [37] [S]. Plan on whole shares.
- **Third-party wrappers:** IBKR states it does not support them and calls credential-storing tools a risk [17] [S].

## Implications for an unattended daily bot

| Option | Pros | Cons |
|---|---|---|
| IB Gateway + IBC in Docker (gnzsnz) + ib_async | Most used path; full order types (MOO/OPG); simple paper/live switch | Weekly phone approval; a heavy Java app; **IBC is retired** |
| Client Portal Web API + gateway (ibind, IBeam) | REST/JSON; easy to hide behind an interface for broker swaps | Daily 24 h session reset; IBKR says no automated login; IBeam scripts a browser |
| Web API via OAuth 1.0a (ibind) | No gateway and no daily login; works for paper too, reportedly | Official eligibility for individuals unclear; slow activation; old crypto library (pyCrypto) |
| Official MCP | Official; OAuth; no gateway | Built for chat; per-order approval unless Autonomous Trading (cash accounts only, capped, SG unclear); token refresh untested for unattended use |

## Open questions

1. Does the user's paper login require 2FA? (Test it.)
2. Is the user on Lite or Pro? Is the live account funded?
3. Will IBKR Singapore enable OAuth 1.0a self-service for this account, for paper and live?
4. Do official MCP refresh tokens last weeks? Is non-chat bot use of `mcp-public` allowed by IBKR's terms?
5. Is Autonomous Trading open to IBKR Singapore clients?
6. Who maintains IBC from here: will a fork appear, and will gnzsnz switch to it?

## Sources

1. https://www.interactivebrokers.com.sg/en/general/about/mediaRelations/6-1-26.php
2. https://www.interactivebrokers.com/en/general/about/mediaRelations/6-22-26.php
3. https://www.interactivebrokers.com/en/general/about/mediaRelations/7-28-26.php
4. https://www.interactivebrokers.com/en/general/about/mediaRelations/10-21-26.php
5. https://www.interactivebrokers.com.sg/en/trading/ai-integrations.php
6. https://www.interactivebrokers.com/campus/traders-insight/ibkr-toolbox/how-to-connect-claude-ai-and-chatgpt-to-your-ibkr-account/
7. https://github.com/tivojn/ibkr-mcp-guard (README, server/lib/oauth.mjs, test/helpers.mjs)
8. https://github.com/anthropics/claude-ai-mcp/issues/405 ; https://github.com/anomalyco/opencode/issues/49773
9. https://www.interactivebrokers.com/en/trading/ai-integrations.php ; https://financefeeds.com/interactive-brokers-launches-autonomous-ai-trading-with-25000-capital-limit/
10. https://agentman.ai/agentskills/connections/mcp-server/interactive-brokers
11. https://github.com/code-rabi/interactive-brokers-mcp
12. https://github.com/rcontesti/IB_MCP
13. https://github.com/Hellek1/ib-mcp
14. https://www.quantvps.com/blog/interactive-brokers-automated-trading-bots ; https://www.interactivebrokers.com/campus/ibkr-api-page/getting-started/
15. https://www.interactivebrokers.com/docs/tws-api/changelog/2026/8/3
16. https://www.interactivebrokers.com/docs/tws-api/doc/quick-start/installation
17. https://www.interactivebrokers.com/docs/web-api/web-api-v-1-0-documentation/client-portal-gateway/client-portal-gateway-faq
18. https://www.interactivebrokers.com/campus/ibkr-api-page/web-api-trading/
19. https://github.com/Voyz/ibind (docs/oauth/oauth_1a.md, advanced_oauth_1a.md)
20. https://github.com/ib-api-reloaded/ib_async
21. https://www.interactivebrokers.com/docs/tws-api/doc/third-party-api-platforms/non-standard-tws-api-languages-and-packages/ib-insync-and-ib-async
22. https://github.com/Voyz/ibeam
23. https://github.com/IbcAlpha/IBC (README, userguide.md)
24. https://github.com/gnzsnz/ib-gateway-docker
25. https://github.com/gnzsnz/ib-gateway-docker/discussions/126
26. https://quotaguard.com/blog/interactive-brokers-api-static-ip-cloud
27. https://www.interactivebrokers.com/docs/web-api/trading/getting-started/trading-access-for-individuals
28. https://www.ibkrguides.com/clientportal/aboutpapertradingaccounts.htm ; https://www.interactivebrokers.com/campus/trading-lessons/using-ibkrs-paper-trading-account/
29. https://www.ibkrguides.com/kb/article-1719.htm
30. https://interactivebrokers.github.io/tws-api/delayed_data.html
31. https://support.quantrocket.com/t/error-code-162-historical-market-data-service-error-message-no-market-data-permissions/366
32. https://www.interactivebrokers.com/en/pricing/market-data-pricing.php
33. https://www.businesswire.com/news/home/20250812055965/en/Interactive-Brokers-Launches-Zero-Commission-US-Stock-Trading-in-Singapore
34. https://www.interactivebrokers.com.sg/en/pricing/commissions-home.php
35. https://www.interactivebrokers.co.jp/en/pricing/commissions-spot-currencies.php
36. https://interactivebrokers.github.io/tws-api/basic_orders.html
37. https://www.ibkrguides.com/kb/en-us/fractional-share-trading.htm
