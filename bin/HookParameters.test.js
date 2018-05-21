"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HookParameters_1 = require("./HookParameters");
describe('Hook parameters', () => {
    it('gets information if hook should deliver tasks on pivotal', () => {
        const hookParameters = new HookParameters_1.HookParameters({
            query: {
                shouldDeliver: '1'
            }
        });
        expect(hookParameters.shouldDeliver()).toEqual(true);
    });
    it('gets workflow label', () => {
        const hookParameters = new HookParameters_1.HookParameters({
            query: {
                workflow: 'test'
            }
        });
        expect(hookParameters.getWorkflow()).toEqual('test');
    });
    it('gets pivotal tracker id', () => {
        const hookParameters = new HookParameters_1.HookParameters({
            query: {
                pivotalProjectId: 12
            }
        });
        expect(hookParameters.getPivotalProjectId()).toEqual(12);
    });
    it('gets workflow label', () => {
        const hookParameters = new HookParameters_1.HookParameters({
            query: {
                pivotalProjectId: undefined
            }
        });
        expect(() => hookParameters.getPivotalProjectId()).toThrow();
    });
});
//# sourceMappingURL=HookParameters.test.js.map