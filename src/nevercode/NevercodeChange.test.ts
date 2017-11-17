import { NevercodeChange } from "./NevercodeChange";

describe('Nevercode change', () => {
    it('Should initial object', () => {
        let nevercodeChange = new NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message');

        expect(nevercodeChange.author).toEqual('Marek Niejadek');
        expect(nevercodeChange.commit_hash).toEqual('6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8');
        expect(nevercodeChange.description).toEqual('[#12345678] Commit message');
        expect(nevercodeChange.datetime).toEqual('2014-10-27T11:05:40Z');
    });
});