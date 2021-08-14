"use strict";

require("@nomiclabs/hardhat-waffle");

var Infura_Key = "";
var PrivateKey = "";
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "".concat(Infura_Key),
      accounts: ["0x".concat(PrivateKey)]
    }
  }
};