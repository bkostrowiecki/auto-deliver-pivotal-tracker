import { TeamcityChanges } from './TeamcityChanges';
import fetch from 'node-fetch';
import { CommitMessage } from '../git/CommitMessage';
import { TeamcityChange } from './TeamcityChange';
import * as base64 from 'base-64';

export class TeamcityService {
    private username = process.env.TEAMCITY_USERNAME;
    private password = process.env.TEAMCITY_PASSWORD;
    private baseUrl = process.env.TEAMCITY_URL || 'http://localhost';

    constructor() {
    }

    async getCommitMessagesFromBuild(buildId: number) {
        console.log('Changes from build are get...', buildId);
        const changesFromBuild = await this.getChangesFromBuild(buildId);
        console.log('Changes from build', changesFromBuild);

        return changesFromBuild.map(change => {
            console.log('Change ', change);
            return new CommitMessage(change.getCommitDescription());
        });
    }

    private async getChangesFromBuild(buildId: number) {
        let changesResponse: any;
        let changesXml: string;
        
        console.log('Parsing external XML for changes');
        try {
            changesResponse = await this.authorizedFetch(`${this.baseUrl}/changes?locator=build:id:${buildId}`);
            changesXml = await changesResponse.text();
        } catch (e) {
            console.log('Cannot parse XML');
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

        console.log('Parsing external XML for changes');
        try {
            changeResponse = await this.authorizedFetch(`${this.baseUrl}/changes/id:${changeId}`);
            changeXml = await changeResponse.text();
        } catch (e) {
            console.log('Cannot parse XML');
            console.log(e);
        }

        console.log(changeXml);

        return new TeamcityChange(changeXml);
    }

    private authorizedFetch(url: string) {
        return fetch(`${this.baseUrl}${url}`, {
            headers: {
                Authorization:
                    'Basic ' + base64.encode(this.username + ':' + this.password)
            }
        });
    }
}