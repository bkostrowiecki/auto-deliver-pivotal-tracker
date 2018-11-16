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
const node_fetch_1 = require("node-fetch");
const CommitMessage_1 = require("../git/CommitMessage");
const BitriseModels_1 = require("./BitriseModels");
class BitriseService {
    constructor() {
        this.bitriseToken = process.env.BITRISE_TOKEN;
        this.baseUrl = process.env.SERVICE_URL || 'http://localhost';
    }
    getArtifactsFromBuild(slugs) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Getting artifacts from build...', slugs.buildSlug);
            const artifactsFromBuild = yield this.getArtifacts(slugs);
            console.log('Artifacts from build', artifactsFromBuild);
            return artifactsFromBuild;
        });
    }
    getNumberAndVersionFromBuild(slugs, artifactSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Get version data...', slugs.buildSlug);
            const versionFromBuild = yield this.getSingleArtifact(slugs, artifactSlug);
            console.log('Version from build', versionFromBuild);
            return versionFromBuild.text()
                .then(text => {
                var versionData = text.split(/[\r\n]+/);
                return new BitriseModels_1.BitriseVersions(versionData[0], versionData[1]);
            });
        });
    }
    getCommitMessagesFromBuild(slugs, artifactSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Get changes from build...', slugs.buildSlug);
            const changesFromBuild = yield this.getSingleArtifact(slugs, artifactSlug);
            console.log('Changes from build', changesFromBuild);
            return changesFromBuild.text()
                .then(text => {
                var changesData = text.split(/[\r\n]+/);
                return changesData.map(change => {
                    console.log('Change ', change);
                    return new CommitMessage_1.CommitMessage(change);
                }).filter(msg => {
                    return msg.getTaskHashes().length > 0;
                });
            });
        });
    }
    getArtifacts(slugs) {
        return __awaiter(this, void 0, void 0, function* () {
            const artifactsUrl = `/apps/${slugs.appSlug}/builds/${slugs.buildSlug}/artifacts`;
            return yield this.authorizedFetch(artifactsUrl)
                .then(data => {
                return data.json();
            })
                .then(artifacts => {
                let changelog = artifacts.data.find(x => x.title === 'CHANGELOG.md');
                console.log(changelog);
                let versionFile = artifacts.data.find(x => x.title === 'build_version.txt');
                console.log(versionFile);
                return new BitriseModels_1.BitriseArtifacts(changelog.slug, versionFile.slug);
            })
                .catch(e => {
                console.log(e);
                throw Error('Missing required artifacts!');
            });
        });
    }
    getSingleArtifact(slugs, artifactSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            const singleArtifactUrl = `/apps/${slugs.appSlug}/builds/${slugs.buildSlug}/artifacts/${artifactSlug}`;
            return yield this.authorizedFetch(singleArtifactUrl)
                .then(data => {
                return data.json();
            })
                .then(artifactUrl => {
                return node_fetch_1.default(artifactUrl.data.expiring_download_url);
            });
        });
    }
    authorizedFetch(url) {
        return node_fetch_1.default(`${this.baseUrl}${url}`, {
            headers: {
                Authorization: this.bitriseToken
            }
        });
    }
}
exports.BitriseService = BitriseService;
//# sourceMappingURL=BitriseService.js.map