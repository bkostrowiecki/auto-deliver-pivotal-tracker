import { TeamcityService } from './TeamcityService';
import * as nock from 'nock';
import { CommitMessage } from '../git/CommitMessage';

describe('Teamcity Service', () => {
    it('fires test', () => {
        expect(true).toEqual(true);
    });

    const teamcityChangesMockXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<changes count="3" href="/httpAuth/app/rest/changes?locator=build:id:35803">
    <change id="150056" version="20afc22677641d1fd16cb65821539aee8e0761dd" username="j.m.szczepanik" date="20180510T101554+0000" href="/httpAuth/app/rest/changes/id:150056" webUrl="http://dev-ci.cloudapp.net:82/viewModification.html?modId=150056&amp;personal=false"/>
    <change id="150055" version="9bce3b402cfd2e9aa7c5d1fcbd85a057a50f4d35" username="bartosz.dotryw" date="20180510T095556+0000" href="/httpAuth/app/rest/changes/id:150055" webUrl="http://dev-ci.cloudapp.net:82/viewModification.html?modId=150055&amp;personal=false"/>
    <change id="150054" version="acff9e43fbbaad8870fd1a99e30a43994dbb4629" username="bartosz.dotryw" date="20180509T160841+0000" href="/httpAuth/app/rest/changes/id:150054" webUrl="http://dev-ci.cloudapp.net:82/viewModification.html?modId=150054&amp;personal=false"/>
</changes>`;

    const teamcityChangesListIdsExpected = [150056, 150055, 150054];

    const mockChangeXml = (changeId: number) => `
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<change id="150056" version="20afc22677641d1fd16cb65821539aee8e0761dd" username="j.m.szczepanik" date="20180510T101554+0000" href="/httpAuth/app/rest/changes/id:150056" webUrl="http://dev-ci.cloudapp.net:82/viewModification.html?modId=150056&amp;personal=false">
    <comment>Merge pull request #38 from Epicode/feature/poprawki-do-dodawania-zgody

[Finishes #155354528] Feature/poprawki do dodawania zgody</comment>
    <files/>
    <vcsRootInstance id="196" vcs-root-id="EmploReactWeb_HttpsGithubComEpicodeEmploReactWebRefsHeadsDevelop" name="https://github.com/Epicode/emplo-react-web" href="/httpAuth/app/rest/vcs-root-instances/id:196"/>
</change>
`;

    const expectedCommitMessage = `Merge pull request #38 from Epicode/feature/poprawki-do-dodawania-zgody

[Finishes #155354528] Feature/poprawki do dodawania zgody`;

    it('gets commit message changes from build', async () => {
        let nockLocalhost = nock('http://localhost');

        nockLocalhost
            .get('/changes?locator=build:id:12345')
            .reply(200, teamcityChangesMockXml);

        teamcityChangesListIdsExpected.forEach((expectedId: number) => {
            nockLocalhost
                .get('/changes/id:' + expectedId.toString())
                .reply(200, mockChangeXml(expectedId));
        });

        const teamcityService = new TeamcityService();
        const changesFromBuild = await teamcityService.getCommitMessagesFromBuild(12345);

        expect(changesFromBuild).toEqual([
            new CommitMessage(expectedCommitMessage),
            new CommitMessage(expectedCommitMessage),
            new CommitMessage(expectedCommitMessage)
        ]);
    });
});