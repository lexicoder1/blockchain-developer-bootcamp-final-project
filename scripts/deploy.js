// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Staking = await hre.ethers.getContractFactory("staking");
  const staking = await Staking.deploy();

  await staking.deployed();

  const Usdttoken = await hre.ethers.getContractFactory("token",usdt,10000000000000000000000000000000000000);
  const usdttoken = await Usdttoken.deploy();

  await  usdttoken.deployed();

  const Shibatoken = await hre.ethers.getContractFactory("token",shiba,10000000000000000000000000000000000000);
  const shibatoken = await Shibatoken.deploy();

  await shibatoken.deployed();
  

  const Dai = await hre.ethers.getContractFactory("token",dai,10000000000000000000000000000000000000);
  const dai= await Dai.deploy();

  await  dai.deployed();

  const Busd = await hre.ethers.getContractFactory("token",busd,10000000000000000000000000000000000000);
  const busd= await Busd.deploy();

  await  busd.deployed();

  const usdtaddress=usdttoken.address
  const shibaaddress=shibatoken.address
  const daiaddress=dai.address
  const busdaddress=busd.address

  await staking.setTickerToTokenAddress('usdt',usdtaddress)
  await staking.setTickerToTokenAddress('shibtoken',shibaaddress)
  await staking.setTickerToTokenAddress('dai',daiaddress)
  await staking.setTickerToTokenAddress('busd',usdtaddress)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
