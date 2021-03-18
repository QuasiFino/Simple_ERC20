import web3 from './web3';
import Crowdsale from './build/contracts/Crowdsale.json';

const instance = new web3.eth.Contract(Crowdsale.abi, '0x4B3Bf4Cb7D2e13E74Ecaa2Fce72abCce3b6F0765');

export default instance;