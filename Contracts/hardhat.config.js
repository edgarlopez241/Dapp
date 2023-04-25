require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/7xsvRWPQ__T0ep2hiXkPMX9bkNp-9oEY',
      accounts:[
        '90568662b707137da59704009356c8aa503d9918cba9f48e5d9254f37ab0db4e'
      ]
    }
  }
};
