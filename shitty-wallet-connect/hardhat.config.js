require('dotenv').config();
require('@nomicfoundation/hardhat-ethers');

const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: NEXT_PUBLIC_API_URL,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`]
    }
  },
};
