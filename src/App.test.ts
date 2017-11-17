import * as supertest from 'supertest';
import App from './App';
import NevercodeMock from './nevercode/NevercodeMock';
import { NevercodeChange } from './nevercode/NevercodeChange';
import PivotalTrackerMock from './pivotalTracker/PivotalTrackerMock';
let MockAdapter = require('axios-mock-adapter');
import axios from 'axios';

describe('Routes', () => {
    it('Should respond with ok status when getting request from nevercode', () => {
        let mock = NevercodeMock.generate();
        mock.build.changes.push(new NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#123456789] Commit message'));
        mock.build.changes.push(new NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#223456789] Commit message'));

        let tasks = ['123456789', '223456789'];

        PivotalTrackerMock.mockRequests(tasks, 'OK', 200);
        
        expect(supertest(App).post('/nevercode-hook').send(mock)).resolves.toEqual(null);
    });
});