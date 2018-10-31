
export class BitriseVersions {
    constructor(public version: string, public buildNumber: string) { }
}

export class BitriseArtifacts {
    constructor(public changelogSlug: string, public versionSlug: string) { }
}

export class BitriseBuildSlugs {
    constructor(public appSlug: string, public buildSlug: string) { }
}