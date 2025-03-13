import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { ethers } from "hardhat"

const deployGovernedContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying GovernedContract and waiting for confirmations...")
  const governedContract = await deploy("GovernedContract", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`GovernedContract at ${governedContract.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(governedContract.address, [])
  }

  log("Transferring ownership to TimeLock...")
  const governedContractInstance = await ethers.getContractAt("GovernedContract", governedContract.address)
  const timeLockAddress = (await get("TimeLock")).address
  const transferTx = await governedContractInstance.transferOwnership(timeLockAddress)
  await transferTx.wait()
  log("Ownership transferred to TimeLock!")
}

export default deployGovernedContract
deployGovernedContract.tags = ["all", "gov"]