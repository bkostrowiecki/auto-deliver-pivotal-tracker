import { StoryHash } from './Task';

export interface PivotalTrackerProcessable {
    shouldDeliverTasks();
    getTasks(): Promise<StoryHash[]>;
    getBuildString(): string;
    getBranchString(): string;
    getWorkflow(): string;
}