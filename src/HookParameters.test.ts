import { HookParameters } from './HookParameters';

describe('Hook parameters', () => {
    it('gets information if hook should deliver tasks on pivotal', () => {
        const hookParameters = new HookParameters({
            query: {
                shouldDeliver: '1'
            }
        } as any);

        expect(hookParameters.shouldDeliver()).toEqual(true);
    });

    it('gets workflow label', () => {
        const hookParameters = new HookParameters({
            query: {
                workflow: 'test'
            }
        } as any);

        expect(hookParameters.getWorkflow()).toEqual('test');
    });

    it('gets pivotal tracker id', () => {
        const hookParameters = new HookParameters({
            query: {
                pivotalProjectId: 12
            }
        } as any);

        expect(hookParameters.getPivotalProjectId()).toEqual(12);
    });

    it('gets workflow label', () => {
        const hookParameters = new HookParameters({
            query: {
                pivotalProjectId: undefined
            }
        } as any);

        expect(() => hookParameters.getPivotalProjectId()).toThrow();
    });
});