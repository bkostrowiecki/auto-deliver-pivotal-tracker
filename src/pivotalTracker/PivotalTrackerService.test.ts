import { PivotalTrackerService } from './PivotalTrackerService';
let MockAdapter = require('axios-mock-adapter');
import axios from 'axios';
import { PivotalTrackerStoryState } from './PivotalTrackerStoryState';
import PivotalTrackerMock from './PivotalTrackerMock';

describe('Pivotal tracker service', () => {
    let projectId = '2102192';

    it('Should send request to pivotal with delivered tasks', () => {
        let pivotalTrackerService = new PivotalTrackerService();

        let tasks = ['123456789', '223456789'];
        PivotalTrackerMock.mockRequests(tasks, '1', 200);

        expect(pivotalTrackerService.markAsDeliver(tasks)).resolves.toEqual(
            undefined
        );
    });

    it('Should failed because given ID does not exist', () => {
        let pivotalTrackerService = new PivotalTrackerService();

        let tasks = ['123456789', '223456789'];
        PivotalTrackerMock.mockRequests(tasks, '1', 404);

        expect(pivotalTrackerService.markAsDeliver(tasks)).rejects.not.toEqual(
            undefined
        );
    });
});
