import NevercodeWebhookResponse from './NevercodeWebhookResponse';
import { NevercodeChange } from './NevercodeChange';
import Commit from './Commit';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as moment from 'moment';
import { StoryHash } from '../pivotalTracker/Task';

export class NevercodeWebhookService {
    parseWebhookResponse(response: NevercodeWebhookResponse): Promise<StoryHash[]> {
        return new Promise((resolve, reject) => {
            const tasks = response.build.changes
                .map((change: NevercodeChange) => {
                    return new Commit(
                        change.commit_hash,
                        change.description
                    ).getTaskHashes();
                })
                .reduce((prev: string[], tasks: StoryHash[]) => {
                    prev = prev.concat(tasks);
                    return prev;
                });

            const uniqueTasks = this.removeDuplicates(tasks);

            resolve(uniqueTasks);
        });
    }

    getBuildString(response: NevercodeWebhookResponse): string {
        return response.build.version + '-' + response.build.build_number;
    }

    private removeDuplicates(tasks: StoryHash[]) {
        return [...new Set(tasks)];
    }
}
