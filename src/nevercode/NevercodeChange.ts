export class NevercodeChange {
    constructor(
        public author: string,
        public commit_hash: string,
        public datetime: string,
        public description: string
    ) {}
}