const { expect } = require("chai");
// const { SigningKey } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
// const truffleAssert = require('truffle-assertions'); install truffle assertion


describe("Test token variables", async function () {
  let Token, token, signer1, signer2, signer3, signer1B, signer2B, signer3B;
  before(async function () {
    const signers = await ethers.getSigners();
    signer1 = signers[0];
    signer2 = signers[1];
    signer3 = signers[3];
    Token = await ethers.getContractFactory("timidantoken");
    token = await Token.deploy();
    await token.deployed();
  });

  it("Should return the correct name and symbol", async function () {
    expect(await token.name()).to.equal("TIMI");
    expect(await token.symbol()).to.equal("TIM");
  });

  it("Should return the correct balance", async function () {
    const signers = await ethers.getSigners();
    const deployerAdd = signers[0].address;
    expect(await token.balanceOf(deployerAdd)).to.equal("1000000");
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
