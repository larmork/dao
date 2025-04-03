# Simple DAO

## Overview
This repository contains the smart contract implementation of a Decentralized Autonomous Organization (DAO). The DAO allows users to propose, vote on, and execute governance decisions in a decentralized manner. The project is written in Solidity and follows best practices for security and efficiency.

## Features
- **Proposal Creation**: Users can submit governance proposals.
- **Voting System**: Members of the DAO can vote on proposals.
- **Execution of Decisions**: Approved proposals can be executed automatically.
- **Token-Based Governance**: Voting power is determined by token holdings.
- **Timelock Mechanism**: Ensures a delay before executing approved proposals.

## Installation
To set up and interact with the DAO smart contracts locally:

### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- Hardhat
- Solidity (via Hardhat or Remix)
- MetaMask (for interacting with the deployed contracts)

### Setup
Clone the repository:
```sh
git clone https://github.com/larmork/dao.git
cd dao
```

Install dependencies:
```sh
npm install
```

Compile the smart contracts:
```sh
npx hardhat compile
```

Run tests:
```sh
npx hardhat test
```

## Deployment
To deploy the DAO contracts on a local blockchain (e.g., Hardhat Network):
```sh
npx hardhat run scripts/deploy.js --network localhost
```

For deployment on testnets or mainnets, configure the network settings in `hardhat.config.js` and run:
```sh
npx hardhat run scripts/deploy.js --network <network-name>
```

## Usage
After deploying, you can interact with the DAO using:
- **Hardhat console**:
  ```sh
  npx hardhat console --network localhost
  ```
- **Web3.js or Ethers.js** in a frontend application.
- **Etherscan (if deployed on a public network)** to read/write contract data.

## Smart Contract Details
- **DAO.sol**: Main contract managing governance proposals and voting.
- **Token.sol**: ERC-20 token contract used for governance voting.
- **Timelock.sol**: Implements a time delay for executing proposals.

## Security Considerations
- Follows Solidity best practices.
- Implements checks for reentrancy attacks.
- Uses OpenZeppelin libraries for security enhancements.
- Properly handles proposal execution delays to prevent malicious governance attacks.

## Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any questions or issues, feel free to open an issue or reach out via GitHub.

---
**Maintainer:** [larmork](https://github.com/larmork)
