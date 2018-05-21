
export class CommitMessage {
    constructor(private message: string) {
    }

    getTaskHashes(): string[] {
        const message = this.message.replace(/Merge pull request #[0-9]*/gi, '');

        let matches = message.match(/\#([0-9]*)/g);
        if (!matches) {
            return [];
        }

        return matches.map((hash: string) => {
            return hash.replace('#', '');
        });
    }
}