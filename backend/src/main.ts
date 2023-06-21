
import { signERC2612Permit } from 'eth-permit';
import { ethers } from 'ethers';
const value = ethers.utils.parseUnits('10', 18);

// const wallet = new ethers.Wallet(, new ethers.providers.JsonRpcProvider(rpcUrl));
// const senderAddress = await wallet.getAddress();

// const result = await signERC2612Permit(wallet, tokenAddress, senderAddress, spender, value);

// await token.methods.permit(senderAddress, spender, value, result.deadline, result.v, result.r, result.s).send({
//   from: senderAddress,
// });