import NevercodeWebhookResponse from '../nevercode/NevercodeWebhookResponse';
import { StoryHash } from '../pivotalTracker/Task';
import { NevercodeChange } from '../nevercode/NevercodeChange';
import { CommitMessage } from '../git/CommitMessage';
import { PivotalTrackerProcessable } from '../pivotalTracker/PivotalTrackerProcessable';

export class NevercodeBuild implements PivotalTrackerProcessable {
    private MISSING_PROPERTY_ERROR = 'Some required property is missing';

    constructor(private response: NevercodeWebhookResponse, private workflow: string, private shouldDeliver: boolean = false) {
    }

    shouldDeliverTasks() {
        return this.shouldDeliver;
    }

    getTasks(): Promise<StoryHash[]> {
        const tasks = this.response.build.changes
            .map((change: NevercodeChange) => {
                return new CommitMessage(
                    change.description
                ).getTaskHashes();
            })
            .reduce((prev: string[], tasks: StoryHash[]) => {
                prev = prev.concat(tasks);
                return prev;
            }, []);

        return new Promise((resolve) => {
            resolve(this.removeDuplicates(tasks))
        });
    }

    getBuildString(): string {
        if ((!this.response.build.build_number && this.response.build.build_number !== 0)|| !this.response.build.version) {
            throw this.MISSING_PROPERTY_ERROR;
        }

        return this.response.build.version + '-' + this.response.build.build_number;
    }

    getBranchString(): string {
        if (!this.response.build_config.branch) {
            throw this.MISSING_PROPERTY_ERROR;
        }
        return this.response.build_config.branch;
    }

    getWorkflow(): string {
        return this.workflow;
    }

    private removeDuplicates(tasks: StoryHash[]) {
        return [...new Set(tasks)];
    }
}