"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const PivotalTrackerStoryState_1 = require("./PivotalTrackerStoryState");
class PivotalTrackerService {
    constructor() {
        this.pivotalUrl = 'https://wwww.pivotaltracker.com/services/v5';
        this.token = process.env.PIVOTAL_TOKEN;
        this.projectId = process.env.PIVOTAL_PROJECT_ID;
    }
    markAsDeliver(tasks) {
        return new Promise((resolve, reject) => {
            let promises = tasks.map((task) => {
                console.log('request ' + task);
                return axios_1.default.put(this.buildPivotalUrl('/projects/' + this.projectId + '/stories/' + task), {
                    current_state: PivotalTrackerStoryState_1.PivotalTrackerStoryState.DELIVERED
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-TrackerToken': this.token
                    }
                });
            });
            axios_1.default.all(promises).then(() => {
                resolve(tasks);
            }).catch((reason) => {
                reject(reason);
            });
        });
    }
    buildPivotalUrl(url) {
        return this.pivotalUrl + url;
    }
}
exports.PivotalTrackerService = PivotalTrackerService;
//# sourceMappingURL=PivotalTrackerService.js.map