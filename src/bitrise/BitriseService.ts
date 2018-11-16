import fetch from 'node-fetch';
import { CommitMessage } from '../git/CommitMessage';
import { BitriseArtifactsResponse, BitriseSingleArtifactDataResponse } from './BitriseArtifactsResponse';
import { BitriseArtifacts, BitriseVersions, BitriseBuildSlugs } from './BitriseModels';

export class BitriseService {
    private bitriseToken = process.env.BITRISE_TOKEN;
    private baseUrl = process.env.SERVICE_URL || 'http://localhost';

    constructor() {
    }

    async getArtifactsFromBuild(slugs: BitriseBuildSlugs) {
        console.log('Getting artifacts from build...', slugs.buildSlug);
        const artifactsFromBuild = await this.getArtifacts(slugs);
        console.log('Artifacts from build', artifactsFromBuild);

        return artifactsFromBuild;
    }

    async getNumberAndVersionFromBuild(slugs: BitriseBuildSlugs, artifactSlug: string) {
        console.log('Get version data...', slugs.buildSlug);
        const versionFromBuild = await this.getSingleArtifact(slugs, artifactSlug);
        console.log('Version from build', versionFromBuild);

        return versionFromBuild.text()
            .then(text => {
                var versionData = text.split(/[\r\n]+/);
                return new BitriseVersions(versionData[0], versionData[1]);
            });
    }

    async getCommitMessagesFromBuild(slugs: BitriseBuildSlugs, artifactSlug: string) {
        console.log('Get changes from build...', slugs.buildSlug);
        const changesFromBuild = await this.getSingleArtifact(slugs, artifactSlug);
        console.log('Changes from build', changesFromBuild);

        return changesFromBuild.text()
            .then(text => {
                var changesData = text.split(/[\r\n]+/);
                return changesData.map(change => {
                    console.log('Change ', change);
                    return new CommitMessage(change);
                }).filter(msg => {
                    return msg.getTaskHashes().length > 0;
                });
            });
    }

    private async getArtifacts(slugs: BitriseBuildSlugs) {
        const artifactsUrl = `/apps/${slugs.appSlug}/builds/${slugs.buildSlug}/artifacts`;

        return await this.authorizedFetch(artifactsUrl)
            .then(data => {
                return data.json<BitriseArtifactsResponse>();
            })
            .then(artifacts => {
                let changelog = artifacts.data.find(x => x.title === 'CHANGELOG.md');
                let versionFile = artifacts.data.find(x => x.title === 'build_version.txt');
                return new BitriseArtifacts(changelog.slug, versionFile.slug);
            })
            .catch(e => {
                console.log(e);
                throw Error('Missing required artifacts!');
            });
    }

    private async getSingleArtifact(slugs: BitriseBuildSlugs, artifactSlug: string) {
        const singleArtifactUrl = `/apps/${slugs.appSlug}/builds/${slugs.buildSlug}/artifacts/${artifactSlug}`;

        return await this.authorizedFetch(singleArtifactUrl)
            .then(data => {
                return data.json<BitriseSingleArtifactDataResponse>();
            })
            .then(artifactUrl => {
                return fetch(artifactUrl.data.expiring_download_url);
            });
    }

    private authorizedFetch(url: string) {
        return fetch(`${this.baseUrl}${url}`, {
            headers: {
                Authorization:
                    this.bitriseToken
            }
        });
    }
}