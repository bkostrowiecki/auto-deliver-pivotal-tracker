"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HookParameters {
    constructor(req) {
        this.req = req;
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
exports.HookParameters = HookParameters;
//# sourceMappingURL=HookParameters.js.map