"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Commit {
    constructor(hash, message) {
        this.hash = hash;
        this.message = message;
    }
    getTaskHashes() {
        const message = this.message.replace(/Merge pull request #[0-9]*/gi, '');
        let matches = message.match(/\#([0-9]*)/g);
        if (!matches) {
            return [];
        }
        return matches.map((hash) => {
            return hash.replace('#', '');
        });
    }
}
exports.default = Commit;
//# sourceMappingURL=Commit.js.map