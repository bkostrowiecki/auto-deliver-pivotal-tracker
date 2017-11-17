import NevercodeWebhookResponse from "./NevercodeWebhookResponse";

export default class NevercodeMock {
    static generate() {
        return {
            build: {
                changes: []
            }
        } as NevercodeWebhookResponse;
    }
}