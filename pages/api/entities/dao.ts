import { Database } from "sqlite3";
import { UserEntity } from "./user";

export class DAO {
    db: Database;
    constructor(path: string) {
        this.db = new Database(path, (err) => {
            if (err) {
                // console.error(err.message);
            }
            // console.log('Connected to the database.');
        });
    }

    run(query: string, params: Array<string>) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, (err) => {
                if (err) {
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
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });        
    }
}
