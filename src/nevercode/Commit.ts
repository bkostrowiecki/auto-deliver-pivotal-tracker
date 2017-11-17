
export default class Commit {
    constructor(private hash: string, private message: string) {
    }

    getTaskHashes(): string[] {
        let matches = this.message.match(/\#([0-9]*)/g);
        if (!matches) {
            return [];
        }

        return matches.map((hash: string) => {
            return hash.replace('#', '');
        });
    }
}