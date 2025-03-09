// SPDX-License-Identifier: MIT

pragma solidity ^0.8.22;

import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";

contract GovernanceToken is ERC20, ERC20Votes, ERC20Permit {
  uint256 public s_maxSupply = 1000000;

  constructor()
  ERC20("GovernanceToken", "GT")
  ERC20Permit("GovernanceToken")
  {
    _mint(msg.sender, s_maxSupply);
  }

  // The functions below are overrides required by Solidity.

  function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }

}