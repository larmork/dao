// SPDX-License-Identifier: MIT

pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GovernedContract is Ownable {
  uint256 private value;

  event ValueChanged(uint256 newValue);

  constructor() Ownable(msg.sender) {}

  function store(uint256 newValue) public onlyOwner {
    value = newValue;
    emit ValueChanged(newValue);
  }

  function retrieve() public view returns (uint256) {
    return value;
  }
}