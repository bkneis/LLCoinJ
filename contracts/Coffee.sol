pragma solidity ^0.4.4;

import "./LLCoinJ.sol";

contract Coffee {
    string loyaltyLine;
    address llCoinJAddr;

    function Coffee(address parentAddr) {
        llCoinJAddr = parentAddr;
        loyaltyLine = "buy10Get1Free";
    }

    function purchase(address user) {
        var balance = LLCoinJ(llCoinJAddr).getLineBalance(user, loyaltyLine);
        balance++;
        LLCoinJ(llCoinJAddr).updateLineBalance(user, loyaltyLine, balance);
    }
}
