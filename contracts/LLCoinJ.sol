pragma solidity ^0.4.4;

contract LLCoinJ {
    address owner;

    struct Balance {
        string loyaltyLine;
        int ptsBalance;
    }

    mapping(address => Balance) userBalance;

    function LLCoinJ() {
        owner = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }
}