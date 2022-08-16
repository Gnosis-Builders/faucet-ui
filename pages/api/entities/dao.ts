import { Database } from "sqlite3";
import { UserEntity } from "./user";

export class DAO {
    db: Database;
    constructor(path: string) {
        this.db = new Database(path, (err) => {
            if (err) {
                console.log("Could not connect to database", err);
            } else {
                console.log("Connected to database");
            }
        });
    }

    run(query: string, params: Array<string>) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, (err) => {
                if (err) {
                    console.log("Error running sql " + query);
                    console.log(err);
                    reject(err);
                } else {
                    resolve('success');
                }
            });
        });
    }

    get(query: string, params: Array<string>): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, (err, rows) => {
                if (err) {
                    console.log("Error running sql " + query);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });        
    }
}
