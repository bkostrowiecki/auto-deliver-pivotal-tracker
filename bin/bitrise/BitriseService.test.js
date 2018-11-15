"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BitriseService_1 = require("./BitriseService");
const nock = require("nock");
const BitriseModels_1 = require("./BitriseModels");
const BitriseService_test_fixture_1 = require("./BitriseService.test-fixture");
describe('Bitrise Service', () => {
    const fixture = new BitriseService_test_fixture_1.default();
    it('When artifacts are loaded then valid changelog and version slugs are provided', () => __awaiter(this, void 0, void 0, function* () {
        let nockLocalhost = nock('http://localhost');
        nockLocalhost
            .get(`/apps/${fixture.appSlug}/builds/${fixture.buildSlug}/artifacts`)
            .reply(200, fixture.getArtifactsJson());
        const bitriseService = new BitriseService_1.BitriseService();
        const artifacts = yield bitriseService.getArtifactsFromBuild(new BitriseModels_1.BitriseBuildSlugs(fixture.appSlug, fixture.buildSlug));
        expect(artifacts.changelogSlug).toEqual(fixture.changelogArtifactSlug);
        expect(artifacts.versionSlug).toEqual(fixture.versionFileSlug);
    }));
    it('When file with version is loaded then version string and build number are parsed', () => __awaiter(this, void 0, void 0, function* () {
        let nockLocalhost = nock('http://localhost');
        nockLocalhost
            .get(`/apps/${fixture.appSlug}/builds/${fixture.buildSlug}/artifacts/${fixture.versionFileSlug}`)
            .reply(200, fixture.getVersionsArtifactJson());
        nockLocalhost
            .get(fixture.versionsArtifactUrlEndpoint)
            .reply(200, fixture.getVersionsFileContent());
        const bitriseService = new BitriseService_1.BitriseService();
        const versions = yield bitriseService.getNumberAndVersionFromBuild(new BitriseModels_1.BitriseBuildSlugs(fixture.appSlug, fixture.buildSlug), fixture.versionFileSlug);
        expect(versions.version).toEqual(fixture.versionString);
        expect(versions.buildNumber).toEqual(fixture.buildNumber);
    }));
    it('When file with changes is loaded then commit messages are parsed', () => __awaiter(this, void 0, void 0, function* () {
        let nockLocalhost = nock('http://localhost');
        nockLocalhost
            .get(`/apps/${fixture.appSlug}/builds/${fixture.buildSlug}/artifacts/${fixture.changelogArtifactSlug}`)
            .reply(200, fixture.getChangelogArtifactJson());
        nockLocalhost
            .get(fixture.changelogArtifactUrlEndpoint)
            .reply(200, fixture.getChangelogFileContent());
        const bitriseService = new BitriseService_1.BitriseService();
        const commits = yield bitriseService.getCommitMessagesFromBuild(new BitriseModels_1.BitriseBuildSlugs(fixture.appSlug, fixture.buildSlug), fixture.changelogArtifactSlug);
        expect(commits[0].getTaskHashes()[0]).toEqual(fixture.expectedStoryHashes[0]);
        expect(commits[1].getTaskHashes()[0]).toEqual(fixture.expectedStoryHashes[1]);
        expect(commits[2].getTaskHashes()[0]).toEqual(fixture.expectedStoryHashes[2]);
    }));
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
//# sourceMappingURL=BitriseService.test.js.map