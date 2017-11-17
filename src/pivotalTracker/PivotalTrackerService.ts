import axios from 'axios';
import { PivotalTrackerStoryState } from './PivotalTrackerStoryState';

export class PivotalTrackerService {
    private pivotalUrl = 'https://wwww.pivotaltracker.com/services/v5';
    private token = process.env.PIVOTAL_TOKEN;
    private projectId = process.env.PIVOTAL_PROJECT_ID;

    markAsDeliver(tasks: string[]) {
        return new Promise((resolve, reject) => {
            let promises = tasks.map((task: string) => {
                console.log('request ' + task);
                return axios.put(this.buildPivotalUrl('/projects/' + this.projectId + '/stories/' + task), {
                    current_state: PivotalTrackerStoryState.DELIVERED
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-TrackerToken': this.token
                    } 
                });
            });


            axios.all(promises).then(() => {
                resolve(tasks);
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }

    private buildPivotalUrl(url: string) {
        return this.pivotalUrl + url;
    }
}