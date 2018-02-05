"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BuildInfo {
    constructor(response) {
        this.response = response;
    }
    getBuildString() {
        if ((!this.response.build.build_number && this.response.build.build_number !== 0) || !this.response.build.version) {
            throw 'Some required property is missing';
        }
        return this.response.build.version + '-' + this.response.build.build_number;
    }
    getBranchString() {
        return this.response.build_config.branch;
    }
    removeDuplicates(tasks) {
        return [...new Set(tasks)];
    }
}
exports.BuildInfo = BuildInfo;
//# sourceMappingURL=BuildInfo.js.map