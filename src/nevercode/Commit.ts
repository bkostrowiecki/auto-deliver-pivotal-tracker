
export default class Commit {
    constructor(private hash: string, private message: string) {
    }

    getTaskHashes(): string[] {
        let pullRequestsMerge = this.message.match(/Merge pull request ([0-9]*)/gi);
        if (pullRequestsMerge != null) {
            return [];
        }

        let matches = this.message.match(/\#([0-9]*)/g);
        if (!matches) {
            return [];
        }

        return matches.map((hash: string) => {
            return hash.replace('#', '');
        });
    }
}