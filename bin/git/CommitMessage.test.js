"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommitMessage_1 = require("./CommitMessage");
describe('Commit', () => {
    it('Should get right commit model - usual commit in system', () => {
        let commit = new CommitMessage_1.CommitMessage('[#12345678] Commit message');
        expect(commit.getTaskHashes().length).toEqual(1);
        expect(commit.getTaskHashes()[0]).toEqual('12345678');
    });
    it('Should get right commit model - commit with word in square brackets', () => {
        let finishesCommit = new CommitMessage_1.CommitMessage('[Finishes #12345678] Commit message');
        expect(finishesCommit.getTaskHashes().length).toEqual(1);
        expect(finishesCommit.getTaskHashes()[0]).toEqual('12345678');
        let fixesCommit = new CommitMessage_1.CommitMessage('[Fixes #12345678] Commit message');
        expect(fixesCommit.getTaskHashes().length).toEqual(1);
        expect(fixesCommit.getTaskHashes()[0]).toEqual('12345678');
    });
    it('Should get right commit model - commit with word in square brackets', () => {
        let commit = new CommitMessage_1.CommitMessage('[#12345678 #22345678] Commit message');
        expect(commit.getTaskHashes().length).toEqual(2);
        expect(commit.getTaskHashes()[0]).toEqual('12345678');
        expect(commit.getTaskHashes()[1]).toEqual('22345678');
    });
    it('Should get right commit model - commit with word in square brackets', () => {
        let commit = new CommitMessage_1.CommitMessage('[#12345678][#22345678] Commit message');
        expect(commit.getTaskHashes().length).toEqual(2);
        expect(commit.getTaskHashes()[0]).toEqual('12345678');
        expect(commit.getTaskHashes()[1]).toEqual('22345678');
    });
    it('Should get right commit model - commit with word in square brackets', () => {
        let commit = new CommitMessage_1.CommitMessage('[Finishes #12345678][Finishes #22345678] Commit message');
        expect(commit.getTaskHashes().length).toEqual(2);
        expect(commit.getTaskHashes()[0]).toEqual('12345678');
        expect(commit.getTaskHashes()[1]).toEqual('22345678');
    });
    it('Should get empty array if there are no tasks in commit description', () => {
        let commit = new CommitMessage_1.CommitMessage('Some commit without task hash');
        expect(commit.getTaskHashes().length).toEqual(0);
    });
    it('Test it', () => {
        let commit = new CommitMessage_1.CommitMessage('[#150711864] Filtrowanie grup');
        expect(commit.getTaskHashes()[0]).toEqual('150711864');
    });
    it('Should ignore pull request hash', () => {
        let commit = new CommitMessage_1.CommitMessage('Merge pull request #176 from Epicode/feature/zmiana-komunikatu-o-niewspieranych-typach-pytan-w-ankiecie');
        expect(commit.getTaskHashes().length).toEqual(0);
        expect(commit.getTaskHashes()[0]).not.toEqual('#176');
    });
    it('Should ignore pull request hash and get feature hash', () => {
        let commit = new CommitMessage_1.CommitMessage('Merge pull request #176 from Epicode/feature/zmiana-komunikatu-o-niewspieranych-typach-pytan-w-ankiecie [Finishes #1234567]');
        expect(commit.getTaskHashes().length).toEqual(1);
        expect(commit.getTaskHashes()[0]).not.toEqual('#176');
        expect(commit.getTaskHashes()[0]).toEqual('1234567');
    });
});
//# sourceMappingURL=CommitMessage.test.js.map