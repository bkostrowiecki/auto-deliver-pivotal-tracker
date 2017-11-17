"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let MockAdapter = require('axios-mock-adapter');
const axios_1 = require("axios");
const PivotalTrackerStoryState_1 = require("./PivotalTrackerStoryState");
class PivotalTrackerMock {
    static mockRequests(tasks, projectId, status) {
        let axiosMockAdapter = new MockAdapter(axios_1.default);
        tasks.forEach((task) => {
            axiosMockAdapter
                .onPut(this.buildPivotalUrl('/projects/' + projectId + '/stories/' + task))
                .reply(status, {
                current_state: PivotalTrackerStoryState_1.PivotalTrackerStoryState.DELIVERED
            }, {
                'Content-Type': 'application/json;charset=utf-8',
                'X-TrackerToken': '1234567890'
            });
        });
    }
    static buildPivotalUrl(url) {
        let pivotalUrl = 'https://wwww.pivotaltracker.com/services/v5';
        return pivotalUrl + url;
    }
}
exports.default = PivotalTrackerMock;
//# sourceMappingURL=PivotalTrackerMock.js.map