"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommitMessage_1 = require("../git/CommitMessage");
class NevercodeBuild {
    constructor(response, workflow, shouldDeliver = false) {
        this.response = response;
        this.workflow = workflow;
        this.shouldDeliver = shouldDeliver;
        this.MISSING_PROPERTY_ERROR = 'Some required property is missing';
    }
    shouldDeliverTasks() {
        return this.shouldDeliver;
    }
    getTasks() {
        const tasks = this.response.build.changes
            .map((change) => {
            return new CommitMessage_1.CommitMessage(change.description).getTaskHashes();
        })
            .reduce((prev, tasks) => {
            prev = prev.concat(tasks);
            return prev;
        }, []);
        return new Promise((resolve) => {
            resolve(this.removeDuplicates(tasks));
        });
    }
    getBuildString() {
        if ((!this.response.build.build_number && this.response.build.build_number !== 0) || !this.response.build.version) {
            throw this.MISSING_PROPERTY_ERROR;
        }
        return this.response.build.version + '-' + this.response.build.build_number;
    }
    getBranchString() {
        if (!this.response.build_config.branch) {
            throw this.MISSING_PROPERTY_ERROR;
        }
        return this.response.build_config.branch;
    }
    getWorkflow() {
        return this.workflow;
    }
    removeDuplicates(tasks) {
        return [...new Set(tasks)];
    }
}
exports.NevercodeBuild = NevercodeBuild;
//# sourceMappingURL=NevercodeBuild.js.map