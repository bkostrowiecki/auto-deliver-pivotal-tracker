import * as parseXml from 'xml-parser';
import { XmlNodeFinder } from './XmlNodeFinder';

export class TeamcityChanges {
    private parsedXml: any;

    constructor(teamcityChangesXml: string) {
        this.parsedXml = parseXml(teamcityChangesXml);
    }

    getListOfIds() {
        console.log('Parsing list of ids xml...');
        const xmlNodeFinder = new XmlNodeFinder(this.parsedXml);
        console.log('XML parsed');

        const changeNodes = xmlNodeFinder.findChildrenInParent('change', this.parsedXml.root.children);

        return changeNodes.map((changeNode) => {
            return parseInt(changeNode.attributes.id);
        });
    }
}