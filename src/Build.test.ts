import { Build } from './Build';
import NevercodeWebhookResponse from './nevercode/NevercodeWebhookResponse';
import { NevercodeChange } from './nevercode/NevercodeChange';
import NevercodeMock from './nevercode/NevercodeMock';

describe('Build', () => {
    it('Should create build string', () => {
        const build = new Build({
            build: {
                version: '2.0.0',
                build_number: 1
            }
        } as any, 'master');

        expect(build.getBuildString()).toEqual('2.0.0-1');
    });

    it('Should throw error because lack of build number', () => {
        const build = new Build({
            build: {
                version: '2.0.0'
            }
        } as any, 'master');

        expect(() => build.getBuildString()).toThrow('Some required property is missing');
    });

    it('Should throw error because lack of version', () => {
        const build = new Build({
            build: {
                build_number: 1
            }
        } as any, 'master');

        expect(() =>
            build.getBuildString()
        ).toThrow('Some required property is missing');
    });

    it('Should not throw error because lack of build number if build number is equal 0', () => {
        const build = new Build({
            build: {
                build_number: 0,
                version: "2.0.0"
            }
        } as any, 'master');

        expect(() =>
            build.getBuildString()
        ).not.toThrow('Some required property is missing');
    });

    it('Should get branch string', () => {
        const build = new Build({
            build_config: {
                branch: 'master'
            }
        } as any, 'master');

        expect(build.getBranchString()).toEqual('master');
    });

    it('Should throw if branch string is not available', () => {
        const build = new Build({
            build_config: {
            }
        } as any, 'master');

        expect(() =>
            build.getBranchString()
        ).toThrow('Some required property is missing');
    });

    it('Should get list of tasks to deliver', async () => {
        let mock = NevercodeMock.generate();
        mock.build.changes.push(new NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message'));

        let build = new Build(mock, 'master');
        let tasksToDeliver = await build.getTasks();

        expect(tasksToDeliver.length).toEqual(1);
        expect(tasksToDeliver[0]).toEqual('12345678');
    });

    it('Should get list of tasks to deliver - more than 1 commit', async () => {
        let mock = NevercodeMock.generate();
        mock.build.changes.push(new NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message'));
        mock.build.changes.push(new NevercodeChange('Turkuć Podjadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd9', '2014-09-27T11:05:40Z', '[#987654321] Commit message'));

        let build = new Build(mock, 'master');
        let tasksToDeliver = await build.getTasks();

        expect(tasksToDeliver.length).toEqual(2);
        expect(tasksToDeliver[0]).toEqual('12345678');
        expect(tasksToDeliver[1]).toEqual('987654321');
    });

    it('Should get list of tasks to deliver - avoid duplicates', async () => {
        let mock = NevercodeMock.generate();
        mock.build.changes.push(new NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message'));
        mock.build.changes.push(new NevercodeChange('Turkuć Podjadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd9', '2014-09-27T11:05:40Z', '[#987654321] Commit message'));
        mock.build.changes.push(new NevercodeChange('Marek Niejadek', 'ad411374b8a7c38f70c3c42b0f2cd4e8363f3fd2', '2014-10-27T11:25:40Z', '[#12345678] Other commit message'));

        let build = new Build(mock, 'master');
        let tasksToDeliver = await build.getTasks();

        expect(tasksToDeliver.length).toEqual(2);
        expect(tasksToDeliver[0]).toEqual('12345678');
        expect(tasksToDeliver[1]).toEqual('987654321');
    });

    it('Should get a build string', () => {
        let mock = NevercodeMock.generate();
        mock.build.version = '2.0.0';
        mock.build.build_number = 42;

        let build = new Build(mock, 'master');
        let buildString = build.getBuildString();

        expect(buildString).toEqual('2.0.0-42');
    });

    it('Should get workflow name', () => {
        let mock = NevercodeMock.generate();
        
        let build = new Build(mock, 'master');
        let workflow = build.getWorkflow();

        expect(workflow).toEqual('master');
    });
});