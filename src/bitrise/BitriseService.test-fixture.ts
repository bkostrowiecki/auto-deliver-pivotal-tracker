
export default class BitriseServiceTestsFixture {

    public appSlug: string = "a7fa3a84395ef77d";
    public buildSlug: string = "7743284e57sdf3db";

    public changelogArtifactSlug: string = "sfj3lkj34f3kffce";
    public versionFileSlug: string = "b309vd9f0d93ffdf";

    public versionString: string = "1.1.0";
    public buildNumber: string = "234";

    public versionsArtifactUrlEndpoint: string = "/artifacts/versions/2asfwfsf2323";
    public versionsArtifactUrl: string = "http://localhost" + this.versionsArtifactUrlEndpoint;

    public changelogArtifactUrlEndpoint: string = "/artifacts/changelog/2asfwfsf2323";
    public changelogArtifactUrl: string = "http://localhost" + this.changelogArtifactUrlEndpoint;

    public getArtifactsJson(): string {
        return JSON.stringify(
            {
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
            }
        );
    }

    public getBrokenArtifactsJson(): string {
        return JSON.stringify(
            {
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
            }
        );
    }

    public getVersionsArtifactJson(): string {
        return JSON.stringify(
            {
                "data": {
                    "expiring_download_url": this.versionsArtifactUrl
                }
            }
        );
    }

    public getChangelogArtifactJson(): string {
        return JSON.stringify(
            {
                "data": {
                    "expiring_download_url": this.changelogArtifactUrl
                }
            }
        );
    }

    public getVersionsFileContent(): string {
        return this.versionString + '\n' + this.buildNumber;
    }

    public getChangelogFileContent(): string {
        return '* [ca6eda9] [#158722356] Fix walidacji dodwania elementów w sklepie\n' + '* [41d19a0] Migration fix\n' +
        "* [cbd2c0c] Merge branch 'develop' into feature/action-levels\n" +
        "* [9cf3348] Merge branch 'develop' of https://github.com/Epicode/thenextbigthing into develop\n" +
        '* [4ea77d9] [#158673953] Ograniczenia leveli v3 - ograniczenie donate\n' +
        '* [024c511] [#158280618] - Konfiguracja mikropłatności';
    }

    public expectedStoryHashes: string[] = ["158722356", "158673953", "158280618"];
}