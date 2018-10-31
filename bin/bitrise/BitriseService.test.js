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
    it('gets commit message changes from build', () => __awaiter(this, void 0, void 0, function* () {
        let nockLocalhost = nock('http://localhost');
        nockLocalhost
            .get(`/apps/${fixture.appSlug}/builds/${fixture.buildSlug}/artifacts`)
            .reply(200, fixture.getArtifactsJson());
        const bitriseService = new BitriseService_1.BitriseService();
        const artifacts = yield bitriseService.getArtifactsFromBuild(new BitriseModels_1.BitriseBuildSlugs(fixture.appSlug, fixture.buildSlug));
        expect(artifacts.changelogSlug).toEqual(fixture.changelogArtifactSlug);
    }));
});
//# sourceMappingURL=BitriseService.test.js.map