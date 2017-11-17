"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commit_1 = require("./Commit");
const fs = require("fs");
const mkdirp = require("mkdirp");
const moment = require("moment");
class NevercodeWebhookService {
    constructor() {
        this.nevercodeHooksLogsDirectory = 'nevercode-hook-logs/';
    }
    parseWebhookResponse(response) {
        return new Promise((resolve, reject) => {
            let tasks = response.build.changes.map((change) => {
                return new Commit_1.default(change.commit_hash, change.description).getTaskHashes();
            }).reduce((prev, tasks) => {
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
    saveCopyOfWebookResponse(response) {
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
    generateNameForLog() {
        return this.nevercodeHooksLogsDirectory + moment().format('YYYY-MM-DD-hh-mm-ss') + '.txt';
    }
}
exports.NevercodeWebhookService = NevercodeWebhookService;
//# sourceMappingURL=NevercodeWebhookService.js.map