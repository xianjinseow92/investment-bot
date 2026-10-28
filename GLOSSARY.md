# Investment bot

A personal bot that trades US stocks and ETFs by fixed rules and is judged against simply holding an index fund.

## Trading

**Order**:
An instruction to a broker to buy or sell a number of shares of one security.
_Avoid_: Trade (for an order that hasn't been filled)

**Fill**:
An order, or part of one, that the broker actually executed, at a known price and time.
_Avoid_: Trade, execution

**Position**:
How many shares of one security an account holds right now.
_Avoid_: Holding, stake

**Broker**:
The firm that holds the account and executes orders (Interactive Brokers for now).
_Avoid_: Exchange, platform

## Accounts and testing

**Paper account**:
A broker account with simulated money; orders are filled against real prices but no real money moves.
_Avoid_: Demo, sandbox, fake account

**Live account**:
A broker account with real money.
_Avoid_: Real account, production account

**Paper period**:
The at least three months of paper trading that must pass before any real money is used.

## Judging results

**Strategy**:
The fixed set of rules that decides which orders to place.
_Avoid_: Algorithm, AI, model, system

**Benchmark**:
What the money would have earned by simply buying and holding an index fund over the same period, after the same costs.
_Avoid_: Index (when the fund is meant), baseline

**Drawdown**:
The fall from the highest value an account has reached to a later low, as a percentage of that high.
_Avoid_: Loss (when measured from a peak)

## Reporting

**Daily message**:
The Telegram message sent once per trading day: orders, fills, profit and loss, and comparison with the benchmark.

**Weekly digest**:
The email sent once a week summarising every action so far, profit and loss, and every comparison with the benchmark.
