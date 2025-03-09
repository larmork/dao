import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ADDRESS_ZERO } from "../helper-hardhat-config";

const setupContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments, ethers } = hre;
  const { log } = deployments;
  const { deployer } = await getNamedAccounts();

  const timeLockAddress = (await deployments.get("TimeLock")).address;
  const governorAddress = (await deployments.get("GovernorContract")).address;

  const timeLock = await ethers.getContractAt("TimeLock", timeLockAddress);
  const governor = await ethers.getContractAt("GovernorContract", governorAddress);

  log("----------------------------------------------------");
  log("Setting up contracts for roles...");

  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const adminRole = await timeLock.DEFAULT_ADMIN_ROLE();

  log("Granting proposer role to governor...");
  const proposerTx = await timeLock.grantRole(proposerRole, governorAddress);
  await proposerTx.wait();
  
  log("Granting executor role to address zero...");
  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO);
  await executorTx.wait();
  
  log("Revoking admin role from deployer...");
  const revokeTx = await timeLock.revokeRole(adminRole, deployer);
  await revokeTx.wait();
  
  log("Roles setup completed!");
};

export default setupContracts;
setupContracts.tags = ["all", "setup"];
