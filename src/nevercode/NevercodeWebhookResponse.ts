export default interface NevercodeWebhookResponse {
    build: {
        changes: [{
            author: string,
            commit_hash: string,
            datetime: string,
            description: string
        }]
    }
};