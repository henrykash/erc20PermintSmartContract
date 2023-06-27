import { Wallet, providers, utils, ethers } from "ethers"
import { EscrowABI, TokenABI, VaultABI } from "./constants/constants"
import { config } from "./config/config"


const provider: any = new providers.WebSocketProvider(config.NODE_URL)
const signer = new Wallet(config.PRIVATE_KEY)
const account = signer.connect(provider)

 //create a token contract instance
 const tokenContract = new ethers.Contract(config.token,TokenABI , account);

export const getPermitSignature = async (signer: any, token: string, spender: string, value: any, deadline: any) => {
    const [nonce, name, version, chainId] = await Promise.all([
        tokenContract.nonces(signer.address),
        tokenContract.name(),
      "1",
    account.getChainId(),
    ])


    // const chainId = 11155111;
    // const version = "1"
    // const token_name = "KASHITO"

    // const nonce = await provider.getTransactionCount(config.wallet_address)

    console.log("Nonce", nonce)

    return ethers.utils.splitSignature(
        await signer._signTypedData(
            {
                name: name,
                version,
                chainId,
                verifyingContract: token,
            },
            {
                Permit: [
                    {
                        name: "owner",
                        type: "address",
                    },
                    {
                        name: "spender",
                        type: "address",
                    },
                    {
                        name: "value",
                        type: "uint256",
                    },
                    {
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        name: "deadline",
                        type: "uint256",
                    },
                ],
            },
            {
                owner: config.wallet_address,
                spender: spender,
                value: value,
                nonce: nonce,
                deadline: deadline,
            }
        )
    )
}

export const ExecTransaction = async (token: string, value: any,) => {
    try {
        //await vault.depositWithPermit(amount, token,  deadline, v, r, s)
        const contract = new ethers.Contract(config.spender, EscrowABI, account)

        const { v, r, s} = await getPermitSignature(account, token, config.spender, value, config.deadline)

        console.log({
            r, s, v,
            
        })
  
    
        const depositTx = await contract.depositWithPermit(
            token,
            value,
            config.deadline,
            v,
            r,
            s,

            {
                gasLimit: 10000000
            }
        )

        console.log(`DEPOSIT TRANSACTION ${depositTx.hash}`)

    } catch (error) {
        console.log("Error", error)
    }
}

const main = async () => {

    
    await ExecTransaction(config.token, config. value)

}

main()