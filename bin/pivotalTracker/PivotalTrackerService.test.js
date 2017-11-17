"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PivotalTrackerService_1 = require("./PivotalTrackerService");
let MockAdapter = require('axios-mock-adapter');
const PivotalTrackerMock_1 = require("./PivotalTrackerMock");
describe('Pivotal tracker service', () => {
    let projectId = '2102192';
    it('Should send request to pivotal with delivered tasks', () => {
        let pivotalTrackerService = new PivotalTrackerService_1.PivotalTrackerService();
        let tasks = ['123456789', '223456789'];
        PivotalTrackerMock_1.default.mockRequests(tasks, '1', 200);
        expect(pivotalTrackerService.markAsDeliver(tasks)).resolves.toEqual(undefined);
    });
    it('Should failed because given ID does not exist', () => {
        let pivotalTrackerService = new PivotalTrackerService_1.PivotalTrackerService();
        let tasks = ['123456789', '223456789'];
        PivotalTrackerMock_1.default.mockRequests(tasks, '1', 404);
        expect(pivotalTrackerService.markAsDeliver(tasks)).rejects.not.toEqual(undefined);
    });
});
//# sourceMappingURL=PivotalTrackerService.test.js.map