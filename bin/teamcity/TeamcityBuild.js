"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class TeamcityBuild {
    constructor(response, teamcityService, workflow, shouldDeliver = false) {
        this.response = response;
        this.teamcityService = teamcityService;
        this.workflow = workflow;
        this.shouldDeliver = shouldDeliver;
        this.MISSING_PROPERTY_ERROR = 'Some required property is missing';
    }
    shouldDeliverTasks() {
        return this.shouldDeliver;
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateTeamcityService();
            console.log('Get tasks');
            console.log(this.response.buildId);
            const commitMessages = yield this.teamcityService.getCommitMessagesFromBuild(this.response.buildId);
            console.log(commitMessages);
            console.log('Map commit messages');
            const tasks = commitMessages
                .map((commit) => {
                return commit.getTaskHashes();
            })
                .reduce((prev, tasks) => {
                prev = prev.concat(tasks);
                return prev;
            }, []);
            return this.removeDuplicates(tasks);
        });
    }
    getBuildString() {
        if ((!this.response.buildId && this.response.buildVersion !== 0) || !this.response.buildVersion) {
            throw this.MISSING_PROPERTY_ERROR;
        }
        return '1.' + this.response.buildVersion;
    }
    getBranchString() {
        if (!this.response.buildId) {
            throw this.MISSING_PROPERTY_ERROR;
        }
        return this.response.branch;
    }
    getWorkflow() {
        return this.workflow;
    }
    removeDuplicates(tasks) {
        return [...new Set(tasks)];
    }
    validateTeamcityService() {
        if (!this.validateTeamcityService) {
            console.log('No teamcity service available');
            throw 'No teamcity service available';
        }
    }
}
exports.TeamcityBuild = TeamcityBuild;
//# sourceMappingURL=TeamcityBuild.js.map