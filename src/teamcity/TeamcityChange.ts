import * as parseXml from 'xml-parser';
import { XmlNodeFinder } from './XmlNodeFinder';

export class TeamcityChange {
    private parsedXml: any;

    constructor(changeXml: string) {
        this.parsedXml = parseXml(changeXml);
    }

    getCommitDescription() {
        const xmlNodeFinder = new XmlNodeFinder(this.parsedXml);

        const commentNode = xmlNodeFinder.findChildInParent('comment', this.parsedXml.root.children);
        
        return commentNode.content;
    }
}