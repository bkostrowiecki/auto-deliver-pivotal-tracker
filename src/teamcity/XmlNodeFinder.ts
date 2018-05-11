export class XmlNodeFinder {
    constructor(private xmlObject: any) {}

    findChildInParent(nodeName: string, parentObject: any) {
        for (let node in parentObject) {
            if (parentObject[node].name === nodeName) {
                return parentObject[node];
            }
        }
    }

    findChildrenInParent(nodeName: string, parentObject: any) {
        const foundNodes = [];
        for (let node in parentObject) {
            if (parentObject[node].name === nodeName) {
                foundNodes.push(parentObject[node]);
            }
        }
        return foundNodes;
    }
}
