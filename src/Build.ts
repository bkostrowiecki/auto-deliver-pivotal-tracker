import NevercodeWebhookResponse from "./nevercode/NevercodeWebhookResponse";
import { StoryHash } from "./pivotalTracker/Task";
import { NevercodeChange } from "./nevercode/NevercodeChange";
import Commit from "./nevercode/Commit";

export class Build {
    private MISSING_PROPERTY_ERROR = 'Some required property is missing';

    constructor(private response: NevercodeWebhookResponse, private workflow: string, private shouldDeliver: boolean = false) {
    }

    shouldDeliverTasks() {
        return this.shouldDeliver;
    }

    getTasks(): StoryHash[] {
        const tasks = this.response.build.changes
            .map((change: NevercodeChange) => {
                return new Commit(
                    change.commit_hash,
                    change.description
                ).getTaskHashes();
            })
            .reduce((prev: string[], tasks: StoryHash[]) => {
                prev = prev.concat(tasks);
                return prev;
            }, []);
        return this.removeDuplicates(tasks);
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