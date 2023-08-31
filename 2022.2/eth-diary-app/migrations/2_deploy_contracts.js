var DiaryApp = artifacts.require("./DiaryApp.sol");

module.exports = function(deployer) {
  deployer.deploy(DiaryApp);
};