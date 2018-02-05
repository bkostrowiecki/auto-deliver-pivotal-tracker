import { PivotalTrackerService } from './PivotalTrackerService';
let MockAdapter = require('axios-mock-adapter');
import axios from 'axios';
import { PivotalTrackerStoryState } from './PivotalTrackerStoryState';
import PivotalTrackerMock from './PivotalTrackerMock';
import NevercodeMock from '../nevercode/NevercodeMock';
import { Build } from '../Build';
import NevercodeWebhookResponse from '../nevercode/NevercodeWebhookResponse';

describe('Pivotal tracker service', () => {
    let projectId = '2102192';

    it('Should send request to pivotal with delivered tasks', () => {
        let pivotalTrackerService = new PivotalTrackerService();

        let tasks = ['123456789', '223456789'];
        PivotalTrackerMock.mockRequests(tasks, '1', 200);

        const mock: NevercodeWebhookResponse = NevercodeMock.generate();
        const build = new Build(mock, 'master');

        expect(pivotalTrackerService.processTasks(build)).resolves.toEqual(
            undefined
        );
    });

    it('Should failed because given ID does not exist', () => {
        let pivotalTrackerService = new PivotalTrackerService();

        let tasks = ['123456789', '223456789'];
        PivotalTrackerMock.mockRequests(tasks, '1', 404);

        const mock: NevercodeWebhookResponse = NevercodeMock.generate();
        const build = new Build(mock, 'master');

        expect(pivotalTrackerService.processTasks(build)).rejects.not.toEqual(
            undefined
        );
    });
});
