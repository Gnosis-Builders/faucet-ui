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
        return new Promise(async (resolve, reject) => {
            let query = `SELECT * FROM user where ipAddress = ? OR upper(lastWalletAddress) = ?`;
            const row = await this.dao.get(query, [
                ipAddress,
                walletAddress.toUpperCase(),
            ]);

            if (row) {
                const expiry = Number(row["expiry"]);
                const now = new Date().getTime();

                if (expiry > now) {
                    reject(
                        "You can request again by: " +
                            new Date(expiry).toString()
                    );
                    return false;
                }
                query =
                    "UPDATE user set expiry = ?, ipAddress = ?, networks = ?, walletAddresses = ?, lastWalletAddress = ? WHERE id = ?";
            } else {
                query =
                    "INSERT INTO user (expiry, ipAddress, networks, walletAddresses, lastWalletAddress, twitterToken, twitterSecret) VALUES (?, ?, ?, ?, ?, '', '')";
            }

            const expiry =
                new Date().getTime() + +(process.env.WAIT_TIME_MILLI as string);

            console.log("Running Query: ", query);

            await this.dao.run(query, [
                expiry.toString(),
                ipAddress,
                row?.networks ? `${row.networks}, ${network}` : network,
                row?.walletAddresses
                    ? `${row.walletAddresses}, ${walletAddress}`
                    : walletAddress,
                walletAddress,
                row?.id ? row.id : null,
            ]);

            resolve(true);
        });
    }
}
