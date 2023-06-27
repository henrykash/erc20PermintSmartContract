import "dotenv/config";
import "dotenv/config";
import { ethers } from "ethers";
if (!process.env.NODE_URL && !process.env.PRIVATE_KEY) {
  throw new Error(
    "RPC_URL, PRIVATE_KEY is not defined and must be set in the .env file"
  );
}

export const config = {
  NODE_URL: process.env.NODE_URL!,
  SPHRI_STAKING_CONTRACT: "0xfd9E21AFbAb96eC91ca9c94C51894cdeBe9238eA",
  PRIVATE_KEY: process.env.PRIVATE_KEY!,
  value: ethers.utils.parseUnits("10", 18),
  deadline: ethers.constants.MaxInt256,
  token: "0x6A7eC658bC337c03b5EC734D7010308c634B3501", //erc20token
  spender: "0x2aa13515fc906e9e8b77938532bf6aecdf973fce", //smart contract
  wallet_address: "0xB46343b38F425fe40c7FB3e2a8Cdd22D4105B393",
};
