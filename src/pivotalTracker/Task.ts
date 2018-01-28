import { PivotalTrackerStoryState } from './PivotalTrackerStoryState';

export type StoryHash = string;
export type DateString = string;

export class Story {
    created_at: DateString;
    current_state: PivotalTrackerStoryState;
    description: string;
    estimate: number;
    id: number;
    kind: Kind.STORY;
    labels: StoryLabel[];
    name: string;
    owner_ids: number[];
    project_id: number;
    requested_by_id: number;
    story_type: StoryType;
    updated_at: DateString;
    url: string;
}

export class StoryLabel {
    kind: Kind.LABEL;
    id: number;
    projectId: number;
    name: string;
    created_at: DateString;
    updated_at: DateString;
}

export enum StoryType {
    FEATURE = 'feature',
    BUG = 'bug',
    CHORE = 'chore',
    RELEASE ='release'
}

export enum Kind {
    LABEL = 'label',
    STORY = 'story'
}