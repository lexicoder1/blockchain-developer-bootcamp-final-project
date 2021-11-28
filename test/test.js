const { expect } = require("chai");
// const { SigningKey } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
// const truffleAssert = require('truffle-assertions'); install truffle assertion


describe("Test token variables", async function () {
  let Staking,token, staking, signer1, signer2, signer3, signer1B, signer2B, signer3B;
  before(async function () {
    const signers = await ethers.getSigners();
    signer1 = signers[0];
    signer2 = signers[1];
    signer3 = signers[3];
    Staking = await ethers.getContractFactory("staking");
    staking = await Token.deploy();
    await staking.deployed();

    const Token = await ethers.getContractFactory("token");
    token = await Token.deploy('token','usdt',10000000000000000000000000000000000000);
    await token.deployed();
    const usdtaddress=token.address
    await staking.connect(signer1).setTickerToTokenAddress('usdt',usdtaddress)
    const tx2 = await token.connect(signer1).transfer(token.address,10000000000000000000000000000000000000 );
    
  });

  it("Should return the correct name and symbol", async function () {
    expect(await token.name()).to.equal("stablecoin");
    expect(await token.symbol()).to.equal("usdt");
  });

  it("Should return the correct balance", async function () {
    const signers = await ethers.getSigners();
    const deployerAdd = signers[0].address;

    expect(await token.balanceOf(deployerAdd)).to.equal(10000000000000000000000000000000000000);

  });

  it("Should return the correct balance", async function () {
   
    await staking.connect(signer2).gettoken('usdt')
    const tokengetter = signers[1].address;

    expect(await token.balanceOf(tokengetter)).to.equal(1000*10**18);

  });

  it("Should return the correct balance after staking", async function () {
    
    await staking.connect(signer2).gettoken('usdt')
    const tokengetter = signers[1].address;
    await staking.connect(signer2).stake(1000*10**18,'usdt')
    expect(await token.balanceOf(tokengetter)).to.equal(0);

  });

  

  it("Should send multiple tokens and bla bla bla", async function () {
    signer1B = await token.balanceOf(signer1.address);
    const tx = await token.transfer(signer2.address, signer1B / 2);
    await tx.wait();
    signer1B = await token.balanceOf(signer1.address);
    signer2B = await token.balanceOf(signer2.address);
    const tx2 = await token
      .connect(signer2)
      .transfer(signer3.address, signer2B / 2);
    const tx22 = await tx2.wait();
    console.log(tx22.events[0].args.toString());
    signer2B = await token.balanceOf(signer2.address);
    signer3B = await token.balanceOf(signer3.address);
    console.log("User 1 Balance is:", signer1B.toString());
    console.log("User 2 Balance is:", signer2B.toString());
    console.log("User 3 Balance is:", signer3B.toString());
    expect(signer1B).to.equal(100000000 / 2);
    expect(signer2B).to.equal(100000000 / 4);
    expect(signer3B).to.equal(100000000 / 4);
    // await assert.reverts(
    //   token.connect(signer3).transfer(signer2.address, 78584348473),
    //   "ERC20: transfer amount exceeds balance"
    // );
  });
});
