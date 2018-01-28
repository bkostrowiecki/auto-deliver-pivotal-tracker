"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const App_1 = require("./App");
const NevercodeMock_1 = require("./nevercode/NevercodeMock");
const NevercodeChange_1 = require("./nevercode/NevercodeChange");
const PivotalTrackerMock_1 = require("./pivotalTracker/PivotalTrackerMock");
let MockAdapter = require('axios-mock-adapter');
describe('Routes', () => {
    it('Should respond with ok status when getting request from nevercode', () => {
        let mock = NevercodeMock_1.default.generate();
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#123456789] Commit message'));
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#223456789] Commit message'));
        let tasks = ['123456789', '223456789'];
        PivotalTrackerMock_1.default.mockRequests(tasks, 12, 200);
        expect(supertest(App_1.default).post('/nevercode-hook').send(mock)).resolves.toEqual(null);
    });
});
//# sourceMappingURL=App.test.js.map