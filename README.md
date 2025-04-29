# LoopTrust Finance 

> Prioritizing low fees, strong security, and building user trust for decentralized finance.

LoopTrust Finance is a smart contract system designed to deliver **cost-effective and transparent DeFi transactions** for everyone. Whether you're processing small or large transactions, LoopTrust dynamically adjusts fees to stay affordable and fair.

---

## Features

- **Dynamic Fee System**
  - Orders below $100 are charged a flat **$1 fee**.
  - Orders above $100 are charged a **2% transaction fee**.
  - Real-time ETH/USD price conversion using **Chainlink Price Feed**.
  

- **Chainlink Oracle Integration**
  - Securely fetches real-time ETH/USD prices.
  - Maintains accurate conversions for fee calculations.

- **Custom Errors & Events**
  - Clean error handling for transparency.
  - Emits events for every transaction and withdrawal.

- **Multi-Contract Deployment**
  - Deployed across 5 independent contract addresses for scalability and redundancy.
  - All verified and bytecode matched on Etherscan.

## Importance of Optimization

When compiling smart contracts, **optimization** is like recalibrating your bytecode for maximum efficiency.  
Yes — it's not changing your Solidity logic, but instead, it's improving how your contract behaves at the machine level.

The compiler will:

- **Rearrange instructions** for better execution flow
- **Remove redundant operations** to streamline performance
- **Simplify loops and variables** to reduce computation costs
- **Compress storage operations** for cheaper storage
- **Minimize the deployed contract size** to lower gas deployment costs

> **Result:**  
> Faster transactions, lower gas fees, and a more efficient contract for all users of **LoopTrust Finance**.


---

## 📜 Smart Contract Details

- **Solidity Version:** 0.8.26
- **License:** MIT
- **Optimized:** Yes, with 200 runs
- **Contract Name:** `LoopTrustV1`

### 🧩 Contract Functions

| Function | Description |
| -------- | ----------- |
| `payWithFlatFee()` | Flat $1 fee (converted to ETH) for orders ≤ $100. |
| `payWithPercent(uint256 transactionValue)` | 2% fee for orders > $100. |
| `withdraw()` | Owner-only withdrawal of accumulated contract balance. |
| `timeSinceLastCall()` | View time since last user transaction. |
| `updatePriceFeed(address newFeed)` | Update Chainlink price feed (owner only). |

---

## 🔐 Security

- ✅ Custom errors for safe revert handling.
- ✅ Only owner can withdraw funds or update price feed.
- ✅ Chainlink oracles prevent price manipulation.
- ✅ Contract bytecode verified across all deployed instances.

---

## 🔗 Deployed Contract Addresses

| Contract Number | Address |
|----------------|----------|
| Contract 1 | [`0x7801F9E69d012bb36eDC73DA716EaDb5086635F3`](https://etherscan.io/address/0x7801F9E69d012bb36eDC73DA716EaDb5086635F3) |
| Contract 2 | [`0x92fd9BE46d324c7F0c8be67C336c735Af8EF8d59`](https://etherscan.io/address/0x92fd9BE46d324c7F0c8be67C336c735Af8EF8d59) |
| Contract 3 | [`0x465B780Ec804EdC085B14901939111A13159AD5e`](https://etherscan.io/address/0x465B780Ec804EdC085B14901939111A13159AD5e) |
| Contract 4 | [`0x7A233a24f5C8F5703294b08aeB3AdFdBa15e704a`](https://etherscan.io/address/0x7A233a24f5C8F5703294b08aeB3AdFdBa15e704a) |
| Contract 5 | [`0x5cf73f7909CA15fC8F0Bcbd718E54A6f295a7A1e`](https://etherscan.io/address/0x5cf73f7909CA15fC8F0Bcbd718E54A6f295a7A1e) |

---

## Usage

1. Connect your wallet (MetaMask, Coinbase Wallet, etc.)
2. Send ETH using either:
   - `payWithFlatFee()` for orders ≤ $100
   - `payWithPercent()` for orders > $100
3. Fees are automatically calculated and logged on-chain.
4. Contract owner can securely withdraw at any time.

---

## Future Plans

- Add multi-chain support (Polygon, BSC, etc.)
- Add automatic fee tier adjustments.
- Frontend dApp integration (LoopTrust Dashboard).
- On-chain governance integration for fee changes.

---

## 🤝 Connect

**Developer:** [mohama56](https://github.com/mohama56)  
**Project Repository:** [LoopTrust Finance](https://github.com/mohama56/LoopTrust-Finance)

---

> LoopTrust Finance: Low fees, strong security, building trust for decentralized finance.

