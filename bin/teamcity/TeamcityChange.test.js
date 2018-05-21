"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeamcityChange_1 = require("./TeamcityChange");
describe('TeamcityChange', () => {
    const teamcityChangeMockXml = `
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<change id="150056" version="20afc22677641d1fd16cb65821539aee8e0761dd" username="j.m.szczepanik" date="20180510T101554+0000" href="/httpAuth/app/rest/changes/id:150056" webUrl="http://dev-ci.cloudapp.net:82/viewModification.html?modId=150056&amp;personal=false">
    <comment>Merge pull request #38 from Epicode/feature/poprawki-do-dodawania-zgody

[Finishes #155354528] Feature/poprawki do dodawania zgody</comment>
    <files/>
    <vcsRootInstance id="196" vcs-root-id="EmploReactWeb_HttpsGithubComEpicodeEmploReactWebRefsHeadsDevelop" name="https://github.com/Epicode/emplo-react-web" href="/httpAuth/app/rest/vcs-root-instances/id:196"/>
</change>
`;
    const teamcityExpectedChangeFromXml = `Merge pull request #38 from Epicode/feature/poprawki-do-dodawania-zgody

[Finishes #155354528] Feature/poprawki do dodawania zgody`;
    it('get commit description from XML', () => {
        let teamcityChange = new TeamcityChange_1.TeamcityChange(teamcityChangeMockXml);
        expect(teamcityChange.getCommitDescription()).toEqual(teamcityExpectedChangeFromXml);
    });
});
//# sourceMappingURL=TeamcityChange.test.js.map