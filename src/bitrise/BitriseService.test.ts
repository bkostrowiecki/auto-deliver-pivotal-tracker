import { BitriseService } from './BitriseService';
import * as nock from 'nock';
import { CommitMessage } from '../git/CommitMessage';
import { BitriseBuildSlugs, BitriseArtifacts } from './BitriseModels';
import BitriseServiceTestsFixture from './BitriseService.test-fixture';

describe('Bitrise Service', () => {

    const fixture: BitriseServiceTestsFixture = new BitriseServiceTestsFixture();

    it('When artifacts are loaded then valid changelog and version slugs are provided', async () => {
        let nockLocalhost = nock('http://localhost');

        nockLocalhost
            .get(`/apps/${fixture.appSlug}/builds/${fixture.buildSlug}/artifacts`)
            .reply(200, fixture.getArtifactsJson());

        const bitriseService = new BitriseService();
        const artifacts = await bitriseService.getArtifactsFromBuild(
            new BitriseBuildSlugs(fixture.appSlug, fixture.buildSlug)
        );

        expect(artifacts.changelogSlug).toEqual(fixture.changelogArtifactSlug);
        expect(artifacts.versionSlug).toEqual(fixture.versionFileSlug);
    });

    it('When file with version is loaded then version string and build number are parsed', async () => {
        let nockLocalhost = nock('http://localhost');

        nockLocalhost
            .get(`/apps/${fixture.appSlug}/builds/${fixture.buildSlug}/artifacts/${fixture.versionFileSlug}`)
            .reply(200, fixture.getVersionsArtifactJson());

        nockLocalhost
            .get(fixture.versionsArtifactUrlEndpoint)
            .reply(200, fixture.getVersionsFileContent());

        const bitriseService = new BitriseService();
        const versions = await bitriseService.getNumberAndVersionFromBuild(
            new BitriseBuildSlugs(fixture.appSlug, fixture.buildSlug),
            fixture.versionFileSlug
        );

        expect(versions.version).toEqual(fixture.versionString);
        expect(versions.buildNumber).toEqual(fixture.buildNumber);
    });

    it('When file with changes is loaded then commit messages are parsed', async () => {
        let nockLocalhost = nock('http://localhost');

        nockLocalhost
            .get(`/apps/${fixture.appSlug}/builds/${fixture.buildSlug}/artifacts/${fixture.changelogArtifactSlug}`)
            .reply(200, fixture.getChangelogArtifactJson());

        nockLocalhost
            .get(fixture.changelogArtifactUrlEndpoint)
            .reply(200, fixture.getChangelogFileContent());

        const bitriseService = new BitriseService();
        const commits = await bitriseService.getCommitMessagesFromBuild(
            new BitriseBuildSlugs(fixture.appSlug, fixture.buildSlug),
            fixture.changelogArtifactSlug
        );

        expect(commits[0].getTaskHashes()[0]).toEqual(fixture.expectedStoryHashes[0]);
        expect(commits[1].getTaskHashes()[0]).toEqual(fixture.expectedStoryHashes[1]);
        expect(commits[2].getTaskHashes()[0]).toEqual(fixture.expectedStoryHashes[2]);
    });

    // it('When artifacts are loaded and required values are missing then exception is thrown', async () => {
    //     let nockLocalhost = nock('http://localhost');

    //     nockLocalhost
    //         .get(`/apps/${fixture.appSlug}/builds/${fixture.buildSlug}/artifacts`)
    //         .reply(200, fixture.getBrokenArtifactsJson());

    //     const f = async () => {
    //         const bitriseService = new BitriseService();
    //         bitriseService.getArtifactsFromBuild(
    //             new BitriseBuildSlugs(fixture.appSlug, fixture.buildSlug)
    //         );
    //     };

    //     await expect(f()).toThrow(Error);
    // });
});