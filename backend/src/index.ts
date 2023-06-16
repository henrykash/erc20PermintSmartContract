import { Wallet, providers, utils, ethers } from "ethers"

const wallet_address = "0xc5B939E81bd70d3aD6EaE5Bd98003432a5393c19"
const provider: any = new providers.WebSocketProvider("wss://sepolia.infura.io/ws/v3/b3e60763ede44fb0a1a195cd5e2e37ab")
const signer = new Wallet("a8442074c0ef30ae83fa14e2c56de4be5b7d56fc8078f7f24c40570bb4c9da1e")
const account = signer.connect(provider)

export const getPermitSignature = async (signer: any, token: string, spender: string, value: any, deadline: any)=> {
    // const [nonce, name, version, chainId] = await Promise.all([
    //   token.nonces(signer.address),
    //   token.name(),
    //   "1",
    //   signer.getChainId(),
    // ])
    

    const chainId = 23
    const version = 1
    const token_name="KASHITP"

    const nonce = await provider.getTransactionCount(wallet_address)


    return ethers.utils.splitSignature(
        await signer._signTypedData(
            {
                name: token_name,
                version:version ,
                chainId: chainId,
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
                spender,
                value,
                nonce,
                deadline,
            }
        )
    )
}

const main = async()=> {

    const token = "0x6A3E9c86E89a2075Fc8F439c39C9aBC307808cD8" //erc20token
    const spender= "0x9d821e01eae73cad1a7f6aae9042933d81a16ea9" //smart contract
    const value = ethers.utils.parseUnits("10", 18)
    const deadline = ethers.constants.MaxInt256
    
const result = await getPermitSignature(account, token, spender, value, deadline )

console.log(result)

}

main()