import NevercodeWebhookResponse from "./NevercodeWebhookResponse";
import { NevercodeChange } from "./NevercodeChange";
import Commit from "./Commit";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as moment from "moment";

export class NevercodeWebhookService {
    parseWebhookResponse(response: NevercodeWebhookResponse): Promise<string[]> {
        return new Promise((resolve, reject) => {
            let tasks = response.build.changes.map((change: NevercodeChange) => {
                return new Commit(change.commit_hash, change.description).getTaskHashes();
            }).reduce((prev: string[], tasks: string[]) => {
                prev = prev.concat(tasks);
                return prev;
            });

            this.saveCopyOfWebookResponse(response).then(() => {
                resolve(tasks);
            }).catch(e => {
                reject(e);
            });
        });
    }

    private nevercodeHooksLogsDirectory = 'nevercode-hook-logs/';

    private saveCopyOfWebookResponse(response: NevercodeWebhookResponse): Promise<void> {
        return new Promise((resolve, reject) => {
            mkdirp(this.nevercodeHooksLogsDirectory, () => {
                fs.writeFileSync(this.generateNameForLog(), JSON.stringify(response, null, 4));
                resolve();
            }, (err) => {
                console.log('Error while saving file:', err);
                reject(err);
            });
        });
    }

    private generateNameForLog() {
        return this.nevercodeHooksLogsDirectory + moment().format('YYYY-MM-DD-hh-mm-ss') + '.txt';
    }
}