import * as express from 'express';

export class HookParameters {
    private workflow: string;
    private shouldBeDelivered: boolean;
    private pivotalProjectId: number;

    constructor(private req: express.Request) {
        this.workflow = req.query.workflow;
        this.shouldBeDelivered = req.query.shouldDeliver === '1';
        this.pivotalProjectId = req.query.pivotalProjectId;
    }

    getWorkflow() {
        return this.workflow;
    }

    shouldDeliver() {
        return this.shouldBeDelivered;
    }

    getPivotalProjectId() {
        if (!this.pivotalProjectId) {
            throw 'PivotalProjectId has to be set, no value was given';
        }
        return this.pivotalProjectId;
    }
}