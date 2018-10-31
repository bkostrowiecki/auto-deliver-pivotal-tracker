"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BitriseServiceTestsFixture {
    constructor() {
        this.appSlug = "a7fa3a84395ef77d";
        this.buildSlug = "7743284e57sdf3db";
        this.changelogArtifactSlug = "sfj3lkj34f3kffce";
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
                    "title": "Changelog.md"
                },
                {
                    "slug": "03kh09k4d9f34f3f",
                    "title": "artifact-2.txt"
                }
            ]
        });
    }
}
exports.default = BitriseServiceTestsFixture;
//# sourceMappingURL=BitriseService.test-fixture.js.map