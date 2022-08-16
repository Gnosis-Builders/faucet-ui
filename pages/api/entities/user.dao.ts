import { Network } from "../dtos";
import { DAO } from "./dao";

export class UserDAO {
    dao: DAO;
    constructor(dao: DAO) {
        this.dao = dao;
    }

    createTable() {
        const query = `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "walletAddresses" text NOT NULL, "ipAddress" varchar NOT NULL, "networks" text NOT NULL, "expiry" varchar NOT NULL, "twitterToken" varchar NOT NULL, "twitterSecret" varchar NOT NULL, "lastWalletAddress" varchar NOT NULL DEFAULT (''), "twitterId" varchar NOT NULL DEFAULT (''))`;
        this.dao.run(query, []);
    }

    async canRequestToken(
        network: Network,
        walletAddress: string,
        ipAddress: string
    ) {
        let query = `SELECT * FROM user where ipAddress = ? OR upper(lastWalletAddress) = ?`;
        const row = await this.dao.get(query, [
            ipAddress,
            walletAddress.toUpperCase(),
        ]);

        if (row !== null && row !== undefined) {
            const expiry = Number(row["expiry"]);
            const now = new Date().getTime();

            if (expiry > now) {
                throw Error(
                    "You have already requested tokens. You can request again by: " +
                        new Date(expiry).toString()
                );
            }
            query =
                "UPDATE user set expiry = ?, ipAddress = ?, networks = ?, walletAddresses = ?, lastWalletAddress = ? WHERE id = ?";
        } else {
            query =
                "INSERT INTO user (expiry, ipAddress, networks, walletAddresses, lastWalletAddress, twitterToken, twitterSecret) VALUES (?, ?, ?, ?, ?, '', '')";
        }

        const expiry =
            new Date().getTime() + +(process.env.WAIT_TIME_MILLI as string);

        await this.dao.run(query, [
            expiry.toString(),
            ipAddress,
            row.networks.length > 0 ? `${row.networks}, ${network}` : network,
            row.walletAddresses.length > 0
                ? `${row.walletAddresses}, ${walletAddress}`
                : walletAddress,
            walletAddress,
            (row.id as number).toString(),
        ]);

        return true;
    }
}
