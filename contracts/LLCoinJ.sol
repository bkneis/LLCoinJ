pragma solidity ^0.4.4;

contract LLCoinJ {
    address owner;

    // User address => loyaltyLine => balance
    mapping(address => mapping(string => uint)) userLoyaltyLineBalance;

    function LLCoinJ() {
        owner = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function getLineBalance(address user, string loyaltyLine) returns (uint) {
        return userLoyaltyLineBalance[user][loyaltyLine];
    }

    function updateLineBalance(address user, string loyaltyLine, uint newBalance) restricted {
        userLoyaltyLineBalance[user][loyaltyLine] = newBalance;
    }
}