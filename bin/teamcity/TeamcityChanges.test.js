"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeamcityChanges_1 = require("./TeamcityChanges");
describe('TeamcityChanges', () => {
    const teamcityChangesMockXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<changes count="3" href="/httpAuth/app/rest/changes?locator=build:id:35803">
    <change id="150056" version="20afc22677641d1fd16cb65821539aee8e0761dd" username="j.m.szczepanik" date="20180510T101554+0000" href="/httpAuth/app/rest/changes/id:150056" webUrl="http://dev-ci.cloudapp.net:82/viewModification.html?modId=150056&amp;personal=false"/>
    <change id="150055" version="9bce3b402cfd2e9aa7c5d1fcbd85a057a50f4d35" username="bartosz.dotryw" date="20180510T095556+0000" href="/httpAuth/app/rest/changes/id:150055" webUrl="http://dev-ci.cloudapp.net:82/viewModification.html?modId=150055&amp;personal=false"/>
    <change id="150054" version="acff9e43fbbaad8870fd1a99e30a43994dbb4629" username="bartosz.dotryw" date="20180509T160841+0000" href="/httpAuth/app/rest/changes/id:150054" webUrl="http://dev-ci.cloudapp.net:82/viewModification.html?modId=150054&amp;personal=false"/>
</changes>`;
    const teamcityChangesListIdsExpected = [150056, 150055, 150054];
    it('gets id of changes from changes response', () => {
        const teamcityChanges = new TeamcityChanges_1.TeamcityChanges(teamcityChangesMockXml);
        expect(teamcityChanges.getListOfIds()).toEqual(teamcityChangesListIdsExpected);
    });
});
//# sourceMappingURL=TeamcityChanges.test.js.map