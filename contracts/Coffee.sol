pragma solidity ^0.4.4;

import "./LLCoinJ.sol";

contract Coffee {
    string loyaltyLine = "buy10Get1Free";
    uint threshold = 10;

    function Coffee() {}

    function purchase(address llCoinJAddr, address user) {
        var balance = LLCoinJ(llCoinJAddr).getLineBalance(user, loyaltyLine);
        balance++;
        LLCoinJ(llCoinJAddr).updateLineBalance(user, loyaltyLine, balance);
    }

    function canClaim(address llCoinJAddr, address user) returns (bool) {
        return LLCoinJ(llCoinJAddr).getLineBalance(user, loyaltyLine) >= threshold;
    }

    function claim(address llCoinJAddr, address user) returns (bool) {
        var balance = LLCoinJ(llCoinJAddr).getLineBalance(user, loyaltyLine);

        if (balance < threshold) {
            return false;
        }

        LLCoinJ(llCoinJAddr).updateLineBalance(user, loyaltyLine, balance - 10);

        return true;
    }
}
