import { NextApiRequest, NextApiResponse } from "next";
import { Response, ResponseUtils } from "../common";
import { DAO } from "../entities/dao";
import { UserDAO } from "../entities/user.dao";

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
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
            {
                network: "Chiado Testnet",
                tweetText: "Hello World",
                walletAddress: "wallet address 1",
                userId: "1",
            },
            ipAddress as string
        );
        res.status(200).json(ResponseUtils.getSuccessResponse("", ""));
    } catch (err) {
        console.log("crt: ", err);
        res.status(500).json(ResponseUtils.getErrorResponse(err, ""));
    }    
};
