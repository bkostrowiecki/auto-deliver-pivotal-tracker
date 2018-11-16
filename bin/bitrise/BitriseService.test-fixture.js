"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BitriseServiceTestsFixture {
    constructor() {
        this.appSlug = "a7fa3a84395ef77d";
        this.buildSlug = "7743284e57sdf3db";
        this.changelogArtifactSlug = "sfj3lkj34f3kffce";
        this.versionFileSlug = "b309vd9f0d93ffdf";
        this.versionString = "1.1.0";
        this.buildNumber = "234";
        this.versionsArtifactUrlEndpoint = "/artifacts/versions/2asfwfsf2323";
        this.versionsArtifactUrl = "http://localhost" + this.versionsArtifactUrlEndpoint;
        this.changelogArtifactUrlEndpoint = "/artifacts/changelog/2asfwfsf2323";
        this.changelogArtifactUrl = "http://localhost" + this.changelogArtifactUrlEndpoint;
        this.expectedStoryHashes = ["158722356", "158673953", "158280618"];
    }
    getArtifactsJson() {
        return JSON.stringify({
            "data": [
                {
                    "slug": "0d2277e50b8d32ce",
                    "title": "artifact-1.txt"
                },
                {
                    "slug": this.changelogArtifactSlug,
                    "title": "CHANGELOG.md"
                },
                {
                    "slug": "03kh09k4d9f34f3f",
                    "title": "artifact-2.txt"
                },
                {
                    "slug": this.versionFileSlug,
                    "title": "build_version.txt"
                }
            ]
        });
    }
    getBrokenArtifactsJson() {
        return JSON.stringify({
            "data": [
                {
                    "slug": "0d2277e50b8d32ce",
                    "title": "artifact-1.txt"
                },
                {
                    "slug": "03kh09k4d9f34f3f",
                    "title": "artifact-2.txt"
                }
            ]
        });
    }
    getVersionsArtifactJson() {
        return JSON.stringify({
            "data": {
                "expiring_download_url": this.versionsArtifactUrl
            }
        });
    }
    getChangelogArtifactJson() {
        return JSON.stringify({
            "data": {
                "expiring_download_url": this.changelogArtifactUrl
            }
        });
    }
    getVersionsFileContent() {
        return this.versionString + '\n' + this.buildNumber;
    }
    getChangelogFileContent() {
        return '* [ca6eda9] [#158722356] Fix walidacji dodwania elementów w sklepie\n' + '* [41d19a0] Migration fix\n' +
            "* [cbd2c0c] Merge branch 'develop' into feature/action-levels\n" +
            "* [9cf3348] Merge branch 'develop' of https://github.com/Epicode/thenextbigthing into develop\n" +
            '* [4ea77d9] [#158673953] Ograniczenia leveli v3 - ograniczenie donate\n' +
            '* [024c511] [#158280618] - Konfiguracja mikropłatności';
    }
}
exports.default = BitriseServiceTestsFixture;
//# sourceMappingURL=BitriseService.test-fixture.js.map