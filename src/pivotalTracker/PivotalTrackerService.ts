import axios, { AxiosResponse } from 'axios';
import { PivotalTrackerStoryState } from './PivotalTrackerStoryState';
import { Story, StoryHash, StoryLabel } from './Task';
import { Build } from '../Build';

const buildTag = 'build-';

export class PivotalTrackerService {
    private pivotalUrl = 'https://wwww.pivotaltracker.com/services/v5';
    private token = process.env.PIVOTAL_TOKEN;
    private projectId = process.env.PIVOTAL_PROJECT_ID;

    private headers;
    private workflow: string;
    private buildString: string;

    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            'X-TrackerToken': this.token
        };

        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['X-TrackerToken'] = this.token;
    }

    async processTasks(build: Build) {
        const tasks = build.getTasks();
        const workflow = build.getWorkflow();
        const buildString = build.getBuildString();
        const shouldDeliver = build.shouldDeliverTasks();

        return new Promise(async (resolve, reject) => {
            const buildLabelText = this.buildLabel(workflow, buildString);

            let buildLabelResponse = await this.postBuildLabel(buildLabelText);

            let buildLabel = buildLabelText;

            let promises = [];

            for (let i = 0; i < tasks.length; i++) {
                try {
                    promises.push(await this.getTask(tasks[i]));
                } catch (e) {
                }
            }

            axios.all(promises).then(axios.spread((...responses) => {
                console.log(responses.length);
                let updateTaskPromises = responses.map((response: AxiosResponse) => {
                    console.log('TASK');

                    let story = response.data;
                    console.log(JSON.stringify(response.data, null, 4));

                    story.labels = story.labels.filter((label: StoryLabel) => label.name.indexOf(buildTag + workflow) === -1);

                    story.labels.push(buildLabel);

                    if (story.current_state === PivotalTrackerStoryState.FINISHED && shouldDeliver) {
                        console.log('Current state changed to: ' + story.current_state);
                        story.current_state = PivotalTrackerStoryState.DELIVERED;
                    }

                    return this.updateTask(story).then((response: AxiosResponse) => {
                        console.log(JSON.stringify(response.data, null, 4));
                        return this.postComment(story.id, buildLabel);
                    }, () => {
                        return new Promise((resolve) => resolve());
                    });
                });

                return axios.all(updateTaskPromises);
            }))
            .then(() => {
                resolve();
            })
            .catch((reason: any) => {
                reject(reason);
            });
        });
    }

    private async postBuildLabel(label: string) {
        let postLabelUrl = this.buildPivotalUrl('/projects/' + this.projectId + '/labels');

        console.log('Request ' + postLabelUrl, JSON.stringify({ name: label }), JSON.stringify(this.headers, null, 4));
        try {
            const response = await axios.post(postLabelUrl, { name: label }, this.headers);

            console.log(JSON.stringify(response, null, 4));

            return response;
        } catch (e) {
            console.log(JSON.stringify(e, null, 4));
            return undefined;
        }
    }

    private buildLabel(workflow: string, buildString: string) {
        return buildTag + workflow + '-' + buildString;
    }

    private postComment(storyHash: StoryHash, buildLabel: string) {
        return axios.post(this.buildStoryUrl(storyHash) + `/comments`, {
            text: '# ' + buildLabel
        });
    }

    private async getTask(storyHash: StoryHash) {
        try {
            console.log('Request ', this.buildStoryUrl(storyHash));
            const response = await axios.get(this.buildStoryUrl(storyHash));
            console.log(console.log(JSON.stringify(response.data, null, 4)));
            return response;
        } catch (e) {
            console.log('Response error');
            console.log(JSON.stringify(e, null, 4));
            return undefined;
        }
    }

    private async updateTask(story: Story) {
        try {
            const storyResponse = await axios.put(this.buildStoryUrl(story.id.toString()), {
                current_state: story.current_state,
                labels: story.labels
            });
            return storyResponse;
        } catch (e) {
            console.log(e, null, 4);
            return undefined;
        }

    }

    private buildStoryUrl(storyHash: StoryHash) {
        return this.buildPivotalUrl('/projects/' + this.projectId + '/stories/' + storyHash);
    }

    private buildPivotalUrl(url: string) {
        return this.pivotalUrl + url;
    }
}