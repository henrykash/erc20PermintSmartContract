import { ethers, providers } from 'ethers';
import { TokenABI } from './constants/constants';

const provider: any = new providers.WebSocketProvider("wss://sepolia.infura.io/ws/v3/b3e60763ede44fb0a1a195cd5e2e37ab")


async function signPermit(
  tokenContractAddress: string,
  privateKey: string,
  spenderAddress: string,
  nonce: number,
  deadline: number,
  chainId: number
): Promise<string> {
  // Connect to the Ethereum provider
//   const provider = new ethers.providers.JsonRpcProvider('<YOUR_PROVIDER_URL>');

  // Load the signer using the private key
  const signer = new ethers.Wallet(privateKey, provider);

  // Get the token contract instance
  const tokenContract = new ethers.Contract(tokenContractAddress, TokenABI, signer);

  // Get the EIP2612 permit data
  const permitData: any = {
    owner: signer.address,
    spender: spenderAddress,
    value: ethers.constants.MaxUint256, // Approve maximum amount
    nonce: nonce,
    deadline: deadline,
  };

  // Sign the permit
  const signature = await signer._signTypedData(permitData.domain, permitData.types, permitData.message);

  return signature;
}

// Example usage
const tokenContractAddress = "0x6A7eC658bC337c03b5EC734D7010308c634B3501";
const privateKey = "cc44c6a035ec4bb1d425bf37b93a8598c8c3be6f7f2516aeff5da8a2a6606f5d";
const spenderAddress = "0x9d821E01eae73Cad1A7f6aAe9042933D81A16eA9";
const nonce = 9  // Retrieve the nonce from the contract or maintain it externally
const deadline: any = ethers.constants.MaxInt256 // 1 hour from now
const chainId = 11155111; // serpolia testnet

signPermit(tokenContractAddress, privateKey, spenderAddress, nonce, deadline, chainId)
  .then((signature) => {
    console.log('Signature:', signature);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
