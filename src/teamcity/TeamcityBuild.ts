import { StoryHash } from '../pivotalTracker/Task';
import { CommitMessage } from '../git/CommitMessage';
import TeamcityWebhookReponse from './TeamcityWebhookResponse';
import { PivotalTrackerProcessable } from '../pivotalTracker/PivotalTrackerProcessable';
import { TeamcityService } from './TeamcityService';

export class TeamcityBuild implements PivotalTrackerProcessable {
    private MISSING_PROPERTY_ERROR = 'Some required property is missing';

    constructor(private response: TeamcityWebhookReponse, private teamcityService: TeamcityService, private workflow: string, private shouldDeliver: boolean = false) {
    }

    shouldDeliverTasks() {
        return this.shouldDeliver;
    }

    async getTasks(): Promise<StoryHash[]> {
        this.validateTeamcityService();

        console.log('Get tasks');
        console.log(this.response.buildId);
        const commitMessages = await this.teamcityService.getCommitMessagesFromBuild(this.response.buildId);
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
        if ((!this.response.buildId && this.response.buildVersion !== 0) || !this.response.buildVersion) {
            throw this.MISSING_PROPERTY_ERROR;
        }

        return '1.' + this.response.buildVersion;
    }

    getBranchString(): string {
        if (!this.response.buildId) {
            throw this.MISSING_PROPERTY_ERROR;
        }
        return this.response.branch;
    }

    getWorkflow(): string {
        return this.workflow;
    }

    private removeDuplicates(tasks: StoryHash[]) {
        return [...new Set(tasks)];
    }

    private validateTeamcityService() {
        if (!this.teamcityService) {
            console.log('No teamcity service available');
            throw 'No teamcity service available';
        }
        console.log('Teamcity service found');
    }
}