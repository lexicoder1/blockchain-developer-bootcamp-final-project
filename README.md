# Final project - erc20 staking platform

# Deployed version url:

https://stakingerc20token.netlify.app/

# How to run this project locally:

Prerequisites

Node.js >= v14

hardhat 

npm

# Contracts

Run npm install in project root to install hardhat build and smart contract dependencies

Run npx hardhat node

npx hardhat run scripts/deploy.js --network localhost          ------   to deploy on localhost

npx hardhat run scripts/deploy.js --network rinkeby            ------   to deploy on rinkeby testnet

npx hardhat test

Frontend

cd client

npm install

npm start

Open http://localhost:3000


# Screencast link
https://www.loom.com/share/a107fcd3928542348c8e8959ec2c2c08

# Public Ethereum wallet for certification:

0x9817C311F6897D30e372C119a888028baC879d1c

# Project description

Users can stake any of the erc20 token whitelisted on the staking platform and get reward of 8% interest perday and  can  only withdraw after one munite of staking  only admin can whitelist token to be staked
and users can stake more than one token on the platform .

# whitelisted erc20 token

usdt

shibatoken

dai

busd

#
client: Project's React frontend.

contracts: Smart contracts that are deployed in the Rinkeby testnet.

scripts: scrprits for deploying smartcontract.

test: Tests for smart contracts.
