import { TeamcityService } from './TeamcityService';

describe('Teamcity Service', () => {
    it('fires test', () => {
        expect(true).toEqual(true);
    });

    it('gets changes from build', async () => {
        const changesFromBuild = await TeamcityService.getChangesFromBuild(12345);
    });
});