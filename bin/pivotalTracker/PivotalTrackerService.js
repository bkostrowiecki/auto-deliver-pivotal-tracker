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
const axios_1 = require("axios");
const PivotalTrackerStoryState_1 = require("./PivotalTrackerStoryState");
const buildTag = 'build-';
class PivotalTrackerService {
    constructor() {
        this.pivotalUrl = 'https://wwww.pivotaltracker.com/services/v5';
        this.token = process.env.PIVOTAL_TOKEN;
        this.projectId = process.env.PIVOTAL_PROJECT_ID;
        this.headers = {
            'Content-Type': 'application/json',
            'X-TrackerToken': this.token
        };
    }
    processTasks(build) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = build.getTasks();
            const workflow = build.getWorkflow();
            const buildString = build.getBuildString();
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const buildLabelText = this.buildLabel(workflow, buildString);
                let buildLabelResponse = yield this.postBuildLabel(buildLabelText);
                let buildLabel = buildLabelResponse.data;
                let promises = tasks.map((task) => {
                    return this.getTask(task);
                });
                axios_1.default.all(promises).then(axios_1.default.spread((...responses) => {
                    let updateTaskPromises = responses.map((response) => {
                        let story = response.data;
                        console.log(JSON.stringify(response.data, null, 4));
                        console.log(story.labels);
                        story.labels = story.labels.filter((label) => label.name.indexOf(buildTag) === -1);
                        console.log(story.labels);
                        story.labels.push(buildLabel);
                        console.log(story.labels);
                        console.log(story.current_state);
                        if (story.current_state === PivotalTrackerStoryState_1.PivotalTrackerStoryState.FINISHED) {
                            console.log('Current state changed to: ' + story.current_state);
                            story.current_state = PivotalTrackerStoryState_1.PivotalTrackerStoryState.DELIVERED;
                        }
                        return this.updateTask(story).then((response) => {
                            console.log(JSON.stringify(response.data, null, 4));
                            return this.postComment(story.id, buildLabel);
                        });
                    });
                    return axios_1.default.all(updateTaskPromises);
                }))
                    .then(() => {
                    resolve();
                })
                    .catch((reason) => {
                    reject(reason);
                });
            }));
        });
    }
    postBuildLabel(label) {
        return __awaiter(this, void 0, void 0, function* () {
            let postLabelUrl = this.buildPivotalUrl('/projects/' + this.projectId + '/labels');
            return axios_1.default.post(postLabelUrl, {
                name: label
            }, this.headers);
        });
    }
    buildLabel(workflow, buildString) {
        return buildTag + workflow + '-' + buildString;
    }
    postComment(storyHash, buildLabel) {
        return axios_1.default.post(this.buildStoryUrl(`/projects/${this.projectId}/stories/${storyHash}/comments`), {
            text: '#' + buildLabel
        }, this.headers);
    }
    getTask(storyHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(this.buildStoryUrl(storyHash), this.headers);
            console.log(console.log(JSON.stringify(response.data, null, 4)));
            return response;
        });
    }
    updateTask(story) {
        return axios_1.default.put(this.buildStoryUrl(story.id.toString()), {
            current_state: story.current_state,
            labels: story.labels
        }, this.headers);
    }
    buildStoryUrl(storyHash) {
        return this.buildPivotalUrl('/projects/' + this.projectId + '/stories/' + storyHash);
    }
    buildPivotalUrl(url) {
        return this.pivotalUrl + url;
    }
}
exports.PivotalTrackerService = PivotalTrackerService;
//# sourceMappingURL=PivotalTrackerService.js.map