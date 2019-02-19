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
const BitriseModels_1 = require("./BitriseModels");
class BitriseBuild {
    constructor(response, bitriseService, workflow, shouldDeliver = false) {
        this.response = response;
        this.bitriseService = bitriseService;
        this.workflow = workflow;
        this.shouldDeliver = shouldDeliver;
        this.MISSING_PROPERTY_ERROR = 'Some required property is missing';
        this.BITRISE_FINISHED_BUILD_STATUS = 1;
    }
    shouldDeliverTasks() {
        return this.shouldDeliver;
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateBitriseService();
            const slugs = new BitriseModels_1.BitriseBuildSlugs(this.response.app_slug, this.response.build_slug);
            console.log('Get artifacts');
            const artifacts = yield this.bitriseService.getArtifactsFromBuild(slugs);
            console.log(artifacts);
            console.log('Get versions');
            this.bitriseVersions = yield this.bitriseService.getNumberAndVersionFromBuild(slugs, artifacts.versionSlug);
            console.log(this.bitriseVersions);
            console.log('Get tasks');
            const commitMessages = yield this.bitriseService.getCommitMessagesFromBuild(slugs, artifacts.changelogSlug);
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
        if (!this.bitriseVersions.buildNumber || !this.bitriseVersions.version) {
            throw this.MISSING_PROPERTY_ERROR;
        }
        return this.bitriseVersions.version + '-' + this.bitriseVersions.buildNumber;
    }
    getBranchString() {
        return this.response.git.src_branch;
    }
    getWorkflow() {
        return this.workflow;
    }
    isTriggeredByBuildFinish() {
        return this.response.build_status == this.BITRISE_FINISHED_BUILD_STATUS;
    }
    removeDuplicates(tasks) {
        return [...new Set(tasks)];
    }
    validateBitriseService() {
        if (!this.bitriseService) {
            console.log('No bitrise service available');
            throw 'No bitrise service available';
        }
        console.log('Bitrise service found');
    }
}
exports.BitriseBuild = BitriseBuild;
//# sourceMappingURL=BitriseBuild.js.map