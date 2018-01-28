import axios, { AxiosResponse } from 'axios';
import { PivotalTrackerStoryState } from './PivotalTrackerStoryState';
import { Story, StoryHash, StoryLabel } from './Task';

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
        }
    }

    markAsDeliver(tasks: StoryHash[], workflow: string, buildString: string) {
        return new Promise(async (resolve, reject) => {
            const buildLabelText = this.buildLabel(workflow, buildString);

            let buildLabelResponse = await this.postBuildLabel(buildLabelText);
            let buildLabel = buildLabelResponse.data;

            let promises = tasks.map((task: StoryHash) => {
                return this.getTask(task);
            }); 

            axios.all(promises).then(axios.spread((...responses) => {
                let updateTaskPromises = responses.map((response: AxiosResponse) => {
                    let story = response.data;
                    story.labels = story.labels.filter((label: StoryLabel) => label.name.indexOf(buildTag) === -1);

                    story.labels.push(buildLabel);

                    if (story.current_state === PivotalTrackerStoryState.FINISHED) {
                        story.current_state = PivotalTrackerStoryState.DELIVERED;
                    }

                    return this.updateTask(story).then((response: AxiosResponse) => {
                        return this.postComment(story.id, buildLabel);
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

        return axios.post(postLabelUrl, {
            name: label
        }, this.headers);
    }

    private buildLabel(workflow: string, buildString: string) {
        return buildTag + workflow + '-' + buildString;
    }

    private postComment(storyHash: StoryHash, buildLabel: string) {
        return axios.post(this.buildStoryUrl(`/projects/${this.projectId}/stories/${storyHash}/comments`), {
            text: '#' + buildLabel
        }, this.headers);
    }

    private getTask(storyHash: StoryHash) {
        return axios.get(this.buildStoryUrl(storyHash), this.headers);
    }

    private updateTask(story: Story) {
        return axios.put(this.buildStoryUrl('/projects/' + this.projectId + '/stories/' + story.id), {
            current_state: story.current_state,
            labels: story.labels
        }, this.headers); 
    }

    private buildStoryUrl(storyHash: StoryHash) {
        return this.buildPivotalUrl('/projects/' + this.projectId + '/stories/' + storyHash);
    }

    private buildPivotalUrl(url: string) {
        return this.pivotalUrl + url;
    }
}