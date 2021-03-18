var Crowdsale = artifacts.require("Crowdsale");

module.exports = function(deployer) {
    deployer.deploy(Crowdsale, 1, '0xE40815188BE5D45f78362CFC0e0c9f06a7f91Cf2', '0xa496F4E38FC6aC0Ba87c1a86DEfab3B90bfdA76B');
};

// contract address: 0x4B3Bf4Cb7D2e13E74Ecaa2Fce72abCce3b6F0765