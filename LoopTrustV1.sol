// 🔒 LoopTrust Finance Smart Contract
// Built for transparency, security, and cost efficiency.
// Visit: https://github.com/mohama56/LoopTrust-Finance


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/// @title LoopTrust Finance Smart Contract
/// @notice Provides two payment methods: flat fee (USD equivalent in ETH) or percentage-based fee.
/// @dev Uses Chainlink ETH/USD price feed for accurate fee calculation.

/// @notice Chainlink Price Feed Interface (ETH/USD)
interface AggregatorV3Interface {
    function decimals() external view returns (uint8);
    function description() external view returns (string memory);
    function version() external view returns (uint256);
    function getRoundData(uint80 _roundId)
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

contract LoopTrustV1 {
    // Owner of the contract
    address public owner;

    // Chainlink price feed for ETH/USD
    AggregatorV3Interface internal priceFeed;

    // Timestamp of the last fee payment
    uint256 public lastCallTimestamp;

    // ===== Constants =====
    uint256 public constant INACTIVITY_THRESHOLD = 2 hours; // Duration to consider inactivity
    uint256 public constant FEE_PERCENT_BPS = 700; // Fee percentage in basis points (700 = 7%)
    uint256 public constant USD_FLAT_FEE = 50; // Flat fee in cents (50 cents)

    // ===== Custom Errors =====
    error NotOwner();
    error FeeTooLow();
    error InvalidPriceFeed();
    error FeeTransferFailed();
    error WithdrawFailed();
    error InvalidPriceData();

    // ===== Events =====
    event FeePaid(address indexed user, uint256 amountETH, uint256 timestamp);
    event Withdraw(address indexed by, uint256 amount);

    /// @notice Constructor sets the contract owner and Chainlink price feed address
    constructor() {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(
            0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419 // Mainnet ETH/USD Price Feed
        );
    }

    /// @notice Restricts function execution to only the owner
    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    /// @notice Pay using a fixed USD amount, converted to ETH at the current rate
    function payWithFlatFee() external payable {
        uint256 ethFee = getFlatFeeInETH();
        if (msg.value < ethFee) revert FeeTooLow();

        lastCallTimestamp = block.timestamp;
        emit FeePaid(msg.sender, msg.value, block.timestamp);
    }

    /// @notice Calculate the flat fee in ETH based on Chainlink price feed
    /// @return Returns the fee required in ETH
    function getFlatFeeInETH() public view returns (uint256) {
        (, int256 price,,,) = priceFeed.latestRoundData();
        if (price <= 0) revert InvalidPriceData();

        uint256 ethPrice = uint256(price); // Price feed returns 8 decimals
        uint256 usdAmount = USD_FLAT_FEE * 1e8; // Convert USD cents to price feed decimals
        return (usdAmount * 1e18) / ethPrice; // Convert to wei
    }

    /// @notice Pay a fee as a percentage of a given transaction value
    /// @param transactionValue The value of the transaction to calculate the fee from
    function payWithPercent(uint256 transactionValue) external payable {
        uint256 requiredFee = (transactionValue * FEE_PERCENT_BPS) / 10000; // Calculate 7% fee
        if (msg.value < requiredFee) revert FeeTooLow();

        lastCallTimestamp = block.timestamp;
        emit FeePaid(msg.sender, msg.value, block.timestamp);
    }

    /// @notice Allows the owner to withdraw all ETH from the contract
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool sent, ) = payable(owner).call{value: balance}("");
        if (!sent) revert WithdrawFailed();
        emit Withdraw(owner, balance);
    }

    /// @notice Returns the time passed since the last fee payment
    /// @return Time in seconds since last payment
    function timeSinceLastCall() external view returns (uint256) {
        return block.timestamp - lastCallTimestamp;
    }

    /// @notice Updates the Chainlink price feed address
    /// @param newFeed The address of the new Chainlink price feed
    function updatePriceFeed(address newFeed) external onlyOwner {
        if (newFeed == address(0)) revert InvalidPriceFeed();
        require(newFeed.code.length > 0, "Address must be a contract");
        priceFeed = AggregatorV3Interface(newFeed);
    }
}

