require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
      {
        version: "0.6.0",
      },
      {
        version: "0.8.0",
      },
    ],
  },
  networks: {
    bsctest: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [process.env.PRIV_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY
  }
};
