import web3 from './web3';
import ShiTokens from './build/contracts/ShiTokens.json';

const instance = new web3.eth.Contract(ShiTokens.abi, '0xa496F4E38FC6aC0Ba87c1a86DEfab3B90bfdA76B');

export default instance;