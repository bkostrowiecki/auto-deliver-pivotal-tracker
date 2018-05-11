import { TeamcityChanges } from "./TeamcityChanges";

export class TeamcityService {
    private username = process.env.TEAMCITY_USERNAME;
    private password = process.env.TEAMCITY_PASSWORD;
    private baseUrl = process.env.TEAMCITY_URL;

    constructor() {
    }

    async getChangesFromBuild(buildId: number) {
        const changesResponse = await fetch(`${this.baseUrl}/changes?locator=build:id:${buildId}`);
        const changesXml = await changesResponse.text();

        const teamcityChanges = new TeamcityChanges(changesXml);

        const changesIds = teamcityChanges.getListOfIds();

        for (let i = 0; i < changesIds.length; i++) {

        }

        return changesIds;
    }
}