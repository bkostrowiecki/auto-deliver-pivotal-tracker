"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseXml = require("xml-parser");
const XmlNodeFinder_1 = require("./XmlNodeFinder");
class TeamcityChange {
    constructor(changeXml) {
        this.parsedXml = parseXml(changeXml);
    }
    getCommitDescription() {
        const xmlNodeFinder = new XmlNodeFinder_1.XmlNodeFinder(this.parsedXml);
        const commentNode = xmlNodeFinder.findChildInParent('comment', this.parsedXml.root.children);
        return commentNode.content;
    }
}
exports.TeamcityChange = TeamcityChange;
//# sourceMappingURL=TeamcityChange.js.map