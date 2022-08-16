import { NextApiRequest, NextApiResponse } from "next";
import { decrypt, Response, ResponseUtils } from "../common";
import { Network } from "../dtos";
import { DAO } from "../entities/dao";
import { UserDAO } from "../entities/user.dao";
import { ethers, Wallet } from "ethers";

const providers: Record<Network, string> = {
    "Gnosis Chain": "https://rpc.ankr.com/gnosis",
    "Chiado Testnet": "",
    "Optimism L2": "",
};

const sendDAI = (
    receiverAddress: string,
    amount: string,
    chain: Network
): Promise<string> => {
    const provider = new ethers.providers.JsonRpcProvider(providers[chain]);

    return new Promise(async (resolve, reject) => {
        try {
            const wallet = new Wallet(
                decrypt(process.env.PRIVATE_KEY as string),
                provider
            );
            const tx = {
                to: receiverAddress,
                value: ethers.utils.parseEther(amount),
            };

            const txObj = await wallet.sendTransaction(tx);
            resolve(txObj.hash);
        } catch (err) {
            reject(err);
        }
    });
};

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    const {
        body: { walletAddress, network, userId, tweetText, tweetUrl },
    } = req;

    let ipAddress = req.headers["x-forwarded-for"];
    if (ipAddress !== undefined) {
        if (typeof ipAddress === "string") {
            ipAddress = ipAddress.split(",")[0];
        } else {
            ipAddress = ipAddress[0];
        }
    } else {
        ipAddress = req.socket.remoteAddress;
    }

    const dao = new DAO("gnosis-faucet.db");
    const userDAO = new UserDAO(dao);

    try {
        const crt = await userDAO.canRequestToken(
            network,
            walletAddress,
            ipAddress as string
        );

        let amount = process.env.LOWER_AMOUNT;

        if (crt) {
            try {
                if (tweetUrl !== undefined && tweetUrl.length > 0) {
                    // validate the tweet and get the walletAddress from it
                    amount = process.env.HIGHER_AMOUNT;
                }
            } catch (err: any) {
                res.status(500).json(ResponseUtils.getErrorResponse(err, ""));
            }

            switch (network) {
                case "Gnosis Chain":
                    const hash = await sendDAI(
                        walletAddress,
                        amount as string,
                        network
                    );
                    res.status(200).json(
                        ResponseUtils.getSuccessResponse(hash, "")
                    );
                    return;
                default:
                    throw new Error("Unknown chain provided");
            }
        }
    } catch (err: any) {
        res.status(500).json(ResponseUtils.getErrorResponse(err.toString(), ""));
        return;
    }
};
