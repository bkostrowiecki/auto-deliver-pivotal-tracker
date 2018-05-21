"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class XmlNodeFinder {
    constructor(xmlObject) {
        this.xmlObject = xmlObject;
    }
    findChildInParent(nodeName, parentObject) {
        for (let node in parentObject) {
            if (parentObject[node].name === nodeName) {
                return parentObject[node];
            }
        }
    }
    findChildrenInParent(nodeName, parentObject) {
        const foundNodes = [];
        for (let node in parentObject) {
            if (parentObject[node].name === nodeName) {
                foundNodes.push(parentObject[node]);
            }
        }
        return foundNodes;
    }
}
exports.XmlNodeFinder = XmlNodeFinder;
//# sourceMappingURL=XmlNodeFinder.js.map