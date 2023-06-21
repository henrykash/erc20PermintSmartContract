import { Wallet, providers, utils, ethers } from "ethers"
import { VaultABI } from "./constants/constants"

const value = ethers.utils.parseUnits("10", 18)
const deadline = ethers.constants.MaxInt256
const token = "0x6A7eC658bC337c03b5EC734D7010308c634B3501" //erc20token
const spender = "0x9d821E01eae73Cad1A7f6aAe9042933D81A16eA9" //smart contract
const wallet_address = "0xB46343b38F425fe40c7FB3e2a8Cdd22D4105B393"
const provider: any = new providers.WebSocketProvider("wss://sepolia.infura.io/ws/v3/b3e60763ede44fb0a1a195cd5e2e37ab")
const signer = new Wallet("cc44c6a035ec4bb1d425bf37b93a8598c8c3be6f7f2516aeff5da8a2a6606f5d")
const account = signer.connect(provider)

export const getPermitSignature = async (signer: any, token: string, spender: string, value: any, deadline: any) => {
    // const [nonce, name, version, chainId] = await Promise.all([
    //   token.nonces(signer.address),
    //   token.name(),
    //   "1",
    //   signer.getChainId(),
    // ])


    const chainId = 11155111;
    const version = "1"
    const token_name = "KASHITO"

    const nonce = await provider.getTransactionCount(wallet_address)

    console.log("Nonce", nonce)

    return ethers.utils.splitSignature(
        await signer._signTypedData(
            {
                name: token_name,
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
                owner: wallet_address,
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
        const contract = new ethers.Contract(spender, VaultABI, account)

        const { v, r, s} = await getPermitSignature(account, token, spender, value, deadline)

        console.log({
            r, s, v,
            deadline
        })


        // const depositTx = await contract.depositWithPermit(
        //     value,
        //     deadline,
        //     token,
        //     v,
        //     r,
        //     s,

        //     {
        //         gasLimit: 10000000
        //     }
        // )

        //console.log(`DEPOSIT TRANSACTION ${depositTx.hash}`)

    } catch (error) {
        console.log("Error", error)
    }
}

const main = async () => {

    
    await ExecTransaction(token, value)

}

main()