"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseXml = require("xml-parser");
const XmlNodeFinder_1 = require("./XmlNodeFinder");
class TeamcityChanges {
    constructor(teamcityChangesXml) {
        this.parsedXml = parseXml(teamcityChangesXml);
    }
    getListOfIds() {
        console.log('Parsing list of ids xml...');
        const xmlNodeFinder = new XmlNodeFinder_1.XmlNodeFinder(this.parsedXml);
        console.log('XML parsed');
        const changeNodes = xmlNodeFinder.findChildrenInParent('change', this.parsedXml.root.children);
        return changeNodes.map((changeNode) => {
            return parseInt(changeNode.attributes.id);
        });
    }
}
exports.TeamcityChanges = TeamcityChanges;
//# sourceMappingURL=TeamcityChanges.js.map