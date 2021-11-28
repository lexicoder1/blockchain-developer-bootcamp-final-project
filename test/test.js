const { expect } = require("chai");
// const { SigningKey } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
// const truffleAssert = require('truffle-assertions'); install truffle assertion


describe("Test token variables", async function () {
  let Staking,token, staking, signer1, signer2, signer3;
  before(async function () {
    const signers = await ethers.getSigners();
    signer1 = signers[0];
    signer2 = signers[1];
    signer3 = signers[3];
    Staking = await ethers.getContractFactory("staking");
    staking = await  Staking.deploy();
    await staking.deployed();

    const Token = await ethers.getContractFactory("token");
    const num=ethers.utils.parseUnits('10000000000000000000', 18)
    token = await Token.deploy('stablecoin','usdt',num);
    await token.deployed();
    const usdtaddress=token.address
    await staking.connect(signer1).setTickerToTokenAddress('usdt',usdtaddress)
    await token.connect(signer1).transfer(staking.address,num);
    
  });

  it("Should return the correct name and symbol", async function () {
    expect(await token.name()).to.equal("stablecoin");
    expect(await token.symbol()).to.equal("usdt");
  });

  it("Should return the total supply", async function () {
    const num=ethers.utils.parseUnits('10000000000000000000', 18)
    expect(await token.totalSupply()).to.equal(num);
    
  });

  it("Should return the correct balance", async function () {
    const num=ethers.utils.parseUnits('10000000000000000000', 18)
    const signers = await ethers.getSigners();
    const deployerAdd = signers[0].address;

    expect(await token.balanceOf(deployerAdd)).to.equal(0);

  });

     it("Should return the correct balance", async function () {
  
     const num=ethers.utils.parseUnits('1000', 18)
     await staking.connect(signer2).gettoken('usdt')
     const signers = await ethers.getSigners();
     const tokengetter = signers[1].address;

     expect(await token.balanceOf(tokengetter)).to.equal(num);

   });

  it("Should return the correct balance after staking", async function () {
    const signers = await ethers.getSigners();
    const tokengetter = signers[3].address;
    const num=ethers.utils.parseUnits('1000', 18)
    await staking.connect(signer3).gettoken('usdt')
    await token.connect(signer3).approve(staking.address,num)
    
    await staking.connect(signer3).stake(num,'usdt')
    expect(await token.balanceOf(tokengetter)).to.equal(0);

  });

  

 
});
