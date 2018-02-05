"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commit_1 = require("./Commit");
class NevercodeWebhookService {
    parseWebhookResponse(response) {
        return new Promise((resolve, reject) => {
            const tasks = response.build.changes
                .map((change) => {
                return new Commit_1.default(change.commit_hash, change.description).getTaskHashes();
            })
                .reduce((prev, tasks) => {
                prev = prev.concat(tasks);
                return prev;
            });
            const uniqueTasks = this.removeDuplicates(tasks);
            resolve(uniqueTasks);
        });
    }
    getBuildString(response) {
        return response.build.version + '-' + response.build.build_number;
    }
    getBranchString(response) {
        return response.build_config.branch;
    }
    removeDuplicates(tasks) {
        return [...new Set(tasks)];
    }
}
exports.NevercodeWebhookService = NevercodeWebhookService;
//# sourceMappingURL=NevercodeWebhookService.js.map