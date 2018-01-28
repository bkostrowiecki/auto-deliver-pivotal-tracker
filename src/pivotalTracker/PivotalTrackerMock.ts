let MockAdapter = require('axios-mock-adapter');
import axios from 'axios';
import { PivotalTrackerStoryState } from './PivotalTrackerStoryState';

export default class PivotalTrackerMock {
    static mockRequests(tasks, projectId, status) {
        let axiosMockAdapter = new MockAdapter(axios, { delayResponse: 1000 });
        tasks.forEach((task: string) => {
            axiosMockAdapter
                .onAny(this.buildPivotalUrl('/projects/' + projectId + '/stories/' + task))
                .reply([status, {
                    current_state: PivotalTrackerStoryState.DELIVERED
                }, {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'X-TrackerToken': '1234567890'
                }]);
        });
    }

    public static buildPivotalUrl(url: string) {
        let pivotalUrl = 'https://wwww.pivotaltracker.com/services/v5';
        return pivotalUrl + url;
    }
}