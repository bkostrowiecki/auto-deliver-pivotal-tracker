"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BitriseVersions {
    constructor(version, buildNumber) {
        this.version = version;
        this.buildNumber = buildNumber;
    }
}
exports.BitriseVersions = BitriseVersions;
class BitriseArtifacts {
    constructor(changelogSlug, versionSlug) {
        this.changelogSlug = changelogSlug;
        this.versionSlug = versionSlug;
    }
}
exports.BitriseArtifacts = BitriseArtifacts;
class BitriseBuildSlugs {
    constructor(appSlug, buildSlug) {
        this.appSlug = appSlug;
        this.buildSlug = buildSlug;
    }
}
exports.BitriseBuildSlugs = BitriseBuildSlugs;
//# sourceMappingURL=BitriseModels.js.map