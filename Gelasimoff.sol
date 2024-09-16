// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Gelasimoff is ERC20, Ownable {

    uint8 public constant MAX_ACCOUNTS = 10;
    uint public constant TOTAL_SUPPLY = 1000000 * 10 ** 18;


    constructor (address[] memory accounts) ERC20("GELASIMOFF", "GLMF") Ownable(msg.sender) {
        require(accounts.length > 0, "Address list is empty");
        require(accounts.length <= MAX_ACCOUNTS, "Too many addresses");

        for (uint i = 0; i < accounts.length; i++) {
            _mint(accounts[i], 100000 * 10 **18);
        }
    }

    function mint(uint amount, address addr) public onlyOwner {
        require(totalSupply() + amount <= TOTAL_SUPPLY, "Cannot mint");
        
        _mint(addr, amount);
    }
}

