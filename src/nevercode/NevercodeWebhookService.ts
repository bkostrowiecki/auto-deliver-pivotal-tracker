import NevercodeWebhookResponse from './NevercodeWebhookResponse';
import { NevercodeChange } from './NevercodeChange';
import Commit from './Commit';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as moment from 'moment';
import { TaskHash } from '../pivotalTracker/Task';

export class NevercodeWebhookService {
    parseWebhookResponse(response: NevercodeWebhookResponse): Promise<TaskHash[]> {
        return new Promise((resolve, reject) => {
            const tasks = response.build.changes
                .map((change: NevercodeChange) => {
                    return new Commit(
                        change.commit_hash,
                        change.description
                    ).getTaskHashes();
                })
                .reduce((prev: string[], tasks: TaskHash[]) => {
                    prev = prev.concat(tasks);
                    return prev;
                });

            const uniqueTasks = this.removeDuplicates(tasks);

            resolve(uniqueTasks);
        });
    }

    private removeDuplicates(tasks: TaskHash[]) {
        return [...new Set(tasks)];
    }
}
