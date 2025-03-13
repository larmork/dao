import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import {
  networkConfig,
  developmentChains,
  QUORUM_PERCENTAGE,
  VOTING_PERIOD,
  VOTING_DELAY,
} from "../helper-hardhat-config"
import { ethers } from "ethers";

const deployGovernorContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();

  log("----------------------------------------------------");
  log("Getting dependency contracts...");
  const governanceToken = await get("GovernanceToken");
  const timeLock = await get("TimeLock");

  log("Deploying GovernorContract implementation...");
  const governorImplementation = await deploy("GovernorContract", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: networkConfig[network.name]?.blockConfirmations || 1,
  });

  log("Deploying GovernorContract proxy...");
  const iface = new ethers.Interface([
    "function initialize(address,address,uint256,uint256,uint256) external"
  ]);
  const initializeData = iface.encodeFunctionData("initialize", [
    governanceToken.address,
    timeLock.address,
    QUORUM_PERCENTAGE,
    VOTING_PERIOD,
    VOTING_DELAY,
  ]);

  const proxy = await deploy("GovernorContractProxy", {
    from: deployer,
    args: [governorImplementation.address, initializeData],
    log: true,
    waitConfirmations: networkConfig[network.name]?.blockConfirmations || 1,
  });

  log(`GovernorContract proxy deployed at ${proxy.address}`);

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Verifying on Etherscan...");
    await verify(governorImplementation.address, []);
    await verify(proxy.address, [governorImplementation.address, initializeData]);
  }
  log("Deployment completed!");
};

export default deployGovernorContract;
deployGovernorContract.tags = ["all", "governor"];