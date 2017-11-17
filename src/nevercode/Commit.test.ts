import Commit from './Commit';

describe('Commit', () => {
    it('Should get right commit model - usual commit in system', () => {
        let commit = new Commit('SHA1HASH', '[#12345678] Commit message');

        expect(commit.getTaskHashes().length).toEqual(1);
        expect(commit.getTaskHashes()[0]).toEqual('12345678');
    });

    it('Should get right commit model - commit with word in square brackets', () => {
        let finishesCommit = new Commit('SHA1HASH', '[Finishes #12345678] Commit message');

        expect(finishesCommit.getTaskHashes().length).toEqual(1);
        expect(finishesCommit.getTaskHashes()[0]).toEqual('12345678');

        let fixesCommit = new Commit('SHA1HASH', '[Fixes #12345678] Commit message');

        expect(fixesCommit.getTaskHashes().length).toEqual(1);
        expect(fixesCommit.getTaskHashes()[0]).toEqual('12345678');
    });

    it('Should get right commit model - commit with word in square brackets', () => {
        let commit = new Commit('SHA1HASH', '[#12345678 #22345678] Commit message');
        
        expect(commit.getTaskHashes().length).toEqual(2);
        expect(commit.getTaskHashes()[0]).toEqual('12345678');
        expect(commit.getTaskHashes()[1]).toEqual('22345678');
    });

    it('Should get right commit model - commit with word in square brackets', () => {
        let commit = new Commit('SHA1HASH', '[#12345678][#22345678] Commit message');
        
        expect(commit.getTaskHashes().length).toEqual(2);
        expect(commit.getTaskHashes()[0]).toEqual('12345678');
        expect(commit.getTaskHashes()[1]).toEqual('22345678');
    });

    it('Should get right commit model - commit with word in square brackets', () => {
        let commit = new Commit('SHA1HASH', '[Finishes #12345678][Finishes #22345678] Commit message');
        
        expect(commit.getTaskHashes().length).toEqual(2);
        expect(commit.getTaskHashes()[0]).toEqual('12345678');
        expect(commit.getTaskHashes()[1]).toEqual('22345678');
    });

    it('Should get empty array if there are no tasks in commit description', () => {
        let commit = new Commit('SHA1HASH', 'Some commit without task hash');

        expect(commit.getTaskHashes().length).toEqual(0);
    });

    it('Test it', () => {
        let commit = new Commit('SHA1HASH', '[#150711864] Filtrowanie grup');
        
        expect(commit.getTaskHashes()[0]).toEqual('150711864');
    });
});