import { TeamcityChanges } from './TeamcityChanges';
import fetch from 'node-fetch';
import { CommitMessage } from '../git/CommitMessage';
import { TeamcityChange } from './TeamcityChange';

export class TeamcityService {
    private username = process.env.TEAMCITY_USERNAME;
    private password = process.env.TEAMCITY_PASSWORD;
    private baseUrl = process.env.TEAMCITY_URL || 'http://localhost';

    constructor() {
    }

    async getCommitMessagesFromBuild(buildId: number) {
        return (await this.getChangesFromBuild(buildId)).map((change) => {
            return new CommitMessage(change.getCommitDescription()); 
        });
    }

    private async getChangesFromBuild(buildId: number) {
        let changesResponse: any;
        let changesXml: string;
        
        try {
            changesResponse = await fetch(`${this.baseUrl}/changes?locator=build:id:${buildId}`);
            changesXml = await changesResponse.text();
        } catch (e) {
            console.log(e);
        }

        console.log(changesXml);

        const teamcityChanges = new TeamcityChanges(changesXml);

        const changesIds = teamcityChanges.getListOfIds();

        let changes: TeamcityChange[] = [];
        for (let i = 0; i < changesIds.length; i++) {
            changes.push(await this.getChange(changesIds[i]));
        }

        return changes;
    }

    private async getChange(changeId: number) {
        let changeResponse: any;
        let changeXml: string;
        
        try {
            changeResponse = await fetch(`${this.baseUrl}/changes/id:${changeId}`);
            changeXml = await changeResponse.text();
        } catch (e) {
            console.log(e);
        }

        console.log(changeXml);

        return new TeamcityChange(changeXml);
    }
}