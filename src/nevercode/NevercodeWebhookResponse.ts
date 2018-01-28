export default interface NevercodeWebhookResponse {
    project: {
        id: string,
        name: string,
        platform: string,
        repository: string,
        web_url: string
    },

    build_config: {
        id: string,
        branch: string,
        project_file: string,
        target: string
    },

    build: {
        id: string,
        artefacts: [{
            url: string,
            checksum: string,
            created_at: string,
            type: string,
            filename: string
        }],
        build_number: number,
        changes: [{
            author: string,
            commit_hash: string,
            datetime: string,
            description: string
        }],
        commit_hash: string,
        created_at: string,
        error_message: string,
        finished_at: string,
        started_at: string,
        status: string,
        tests: {
            errors: number,
            failed: number,
            passed: number,
            skipped: 0
        },
        version: string,
        web_url: string
    },
};