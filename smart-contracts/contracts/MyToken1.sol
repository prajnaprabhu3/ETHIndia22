// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken1 is ERC20 {
    constructor() ERC20("MyToken1", "MTK1") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}
