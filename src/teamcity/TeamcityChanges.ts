import * as parseXml from 'xml-parser';
import { XmlNodeFinder } from './XmlNodeFinder';

export class TeamcityChanges {
    private parsedXml: any;

    constructor(teamcityChangesXml: string) {
        this.parsedXml = parseXml(teamcityChangesXml);
    }

    getListOfIds() {
        const xmlNodeFinder = new XmlNodeFinder(this.parsedXml);

        const changeNodes = xmlNodeFinder.findChildrenInParent('change', this.parsedXml.root.children);

        return changeNodes.map((changeNode) => {
            return parseInt(changeNode.attributes.id);
        });
    }
}