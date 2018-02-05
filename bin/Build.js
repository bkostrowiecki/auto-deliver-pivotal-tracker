"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commit_1 = require("./nevercode/Commit");
class Build {
    constructor(response, workflow) {
        this.response = response;
        this.workflow = workflow;
        this.MISSING_PROPERTY_ERROR = 'Some required property is missing';
    }
    getTasks() {
        const tasks = this.response.build.changes
            .map((change) => {
            return new Commit_1.default(change.commit_hash, change.description).getTaskHashes();
        })
            .reduce((prev, tasks) => {
            prev = prev.concat(tasks);
            return prev;
        }, []);
        return this.removeDuplicates(tasks);
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
exports.Build = Build;
//# sourceMappingURL=Build.js.map