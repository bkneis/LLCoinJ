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
}