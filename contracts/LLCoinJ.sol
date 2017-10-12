pragma solidity ^0.4.4;

contract LLCoinJ {
    address owner;

    // User address => loyaltyLine => balance
    mapping(address => mapping(string => uint)) private userLoyaltyLineBalance;

    function LLCoinJ() {
        owner = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function getLineBalance(address user, string loyaltyLine) public returns (uint) {
        return userLoyaltyLineBalance[user][loyaltyLine];
    }

    function updateLineBalance(address user, string loyaltyLine, uint newBalance) public restricted {
        userLoyaltyLineBalance[user][loyaltyLine] = newBalance;
    }
}