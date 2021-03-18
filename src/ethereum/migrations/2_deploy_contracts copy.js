var ShiTokens = artifacts.require("ShiTokens");

module.exports = function(deployer) {
    deployer.deploy(ShiTokens, 1000000, 100000000, 500000);
};

// contract address:    0xa496F4E38FC6aC0Ba87c1a86DEfab3B90bfdA76B
