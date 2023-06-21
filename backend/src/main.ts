import { signERC2612Permit } from "eth-permit";
import { ethers } from "ethers";
import { config } from "./config/config";
import { TokenABI } from "./constants/constants";

const main = async () => {
  const wallet = new ethers.Wallet(config.PRIVATE_KEY);
  const senderAddress = await wallet.getAddress();
 const _value: any = ethers.utils.parseUnits("10", 18)

  const result = await signERC2612Permit(
    wallet,
    config.token,
    senderAddress,
    config.spender,
    _value
  );

  const tokenContract = new ethers.Contract(config.token,TokenABI , wallet);


  await tokenContract.methods
    .permit(
      senderAddress,
      config.spender,
      config.value,
      result.deadline,
      result.v,
      result.r,
      result.s
    )
    .send({
      from: senderAddress,
    });
};
