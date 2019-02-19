import { StoryHash } from '../pivotalTracker/Task';
import { CommitMessage } from '../git/CommitMessage';
import { PivotalTrackerProcessable } from '../pivotalTracker/PivotalTrackerProcessable';
import BitriseWebhookReponse from './BitriseWebhookResponse';
import { BitriseService } from './BitriseService';
import { BitriseBuildSlugs, BitriseVersions } from './BitriseModels';

export class BitriseBuild implements PivotalTrackerProcessable {
    private MISSING_PROPERTY_ERROR = 'Some required property is missing';
    private BITRISE_FINISHED_BUILD_STATUS = 1;

    private bitriseVersions: BitriseVersions;

    constructor(private response: BitriseWebhookReponse, private bitriseService: BitriseService, private workflow: string, private shouldDeliver: boolean = false) {
    }

    shouldDeliverTasks() {
        return this.shouldDeliver;
    }

    async getTasks(): Promise<StoryHash[]> {
        this.validateBitriseService();

        const slugs = new BitriseBuildSlugs(this.response.app_slug, this.response.build_slug);

        console.log('Get artifacts');
        const artifacts = await this.bitriseService.getArtifactsFromBuild(slugs);
        console.log(artifacts);

        console.log('Get versions');
        this.bitriseVersions = await this.bitriseService.getNumberAndVersionFromBuild(slugs, artifacts.versionSlug);
        console.log(this.bitriseVersions);

        console.log('Get tasks');
        const commitMessages = await this.bitriseService.getCommitMessagesFromBuild(slugs, artifacts.changelogSlug);
        console.log(commitMessages);

        console.log('Map commit messages');

        const tasks = commitMessages
            .map((commit: CommitMessage) => {
                return commit.getTaskHashes();
            })
            .reduce((prev: string[], tasks: StoryHash[]) => {
                prev = prev.concat(tasks);
                return prev;
            }, []);
        return this.removeDuplicates(tasks);
    }

    getBuildString(): string {
        if (!this.bitriseVersions.buildNumber || !this.bitriseVersions.version) {
            throw this.MISSING_PROPERTY_ERROR;
        }

        return this.bitriseVersions.version + '-' + this.bitriseVersions.buildNumber;
    }

    getBranchString(): string {
        return this.response.git.src_branch;
    }

    getWorkflow(): string {
        return this.workflow;
    }

    isTriggeredByBuildFinish(): boolean {
        return this.response.build_status == this.BITRISE_FINISHED_BUILD_STATUS;
    }

    private removeDuplicates(tasks: StoryHash[]) {
        return [...new Set(tasks)];
    }

    private validateBitriseService() {
        if (!this.bitriseService) {
            console.log('No bitrise service available');
            throw 'No bitrise service available';
        }
        console.log('Bitrise service found');
    }
}