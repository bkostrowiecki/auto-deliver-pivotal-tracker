"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Build_1 = require("./Build");
const NevercodeChange_1 = require("./nevercode/NevercodeChange");
const NevercodeMock_1 = require("./nevercode/NevercodeMock");
describe('Build', () => {
    it('Should create build string', () => {
        const build = new Build_1.Build({
            build: {
                version: '2.0.0',
                build_number: 1
            }
        }, 'master');
        expect(build.getBuildString()).toEqual('2.0.0-1');
    });
    it('Should throw error because lack of build number', () => {
        const build = new Build_1.Build({
            build: {
                version: '2.0.0'
            }
        }, 'master');
        expect(() => build.getBuildString()).toThrow('Some required property is missing');
    });
    it('Should throw error because lack of version', () => {
        const build = new Build_1.Build({
            build: {
                build_number: 1
            }
        }, 'master');
        expect(() => build.getBuildString()).toThrow('Some required property is missing');
    });
    it('Should not throw error because lack of build number if build number is equal 0', () => {
        const build = new Build_1.Build({
            build: {
                build_number: 0,
                version: "2.0.0"
            }
        }, 'master');
        expect(() => build.getBuildString()).not.toThrow('Some required property is missing');
    });
    it('Should get branch string', () => {
        const build = new Build_1.Build({
            build_config: {
                branch: 'master'
            }
        }, 'master');
        expect(build.getBranchString()).toEqual('master');
    });
    it('Should throw if branch string is not available', () => {
        const build = new Build_1.Build({
            build_config: {}
        }, 'master');
        expect(() => build.getBranchString()).toThrow('Some required property is missing');
    });
    it('Should get list of tasks to deliver', () => __awaiter(this, void 0, void 0, function* () {
        let mock = NevercodeMock_1.default.generate();
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message'));
        let build = new Build_1.Build(mock, 'master');
        let tasksToDeliver = yield build.getTasks();
        expect(tasksToDeliver.length).toEqual(1);
        expect(tasksToDeliver[0]).toEqual('12345678');
    }));
    it('Should get list of tasks to deliver - more than 1 commit', () => __awaiter(this, void 0, void 0, function* () {
        let mock = NevercodeMock_1.default.generate();
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message'));
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Turkuć Podjadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd9', '2014-09-27T11:05:40Z', '[#987654321] Commit message'));
        let build = new Build_1.Build(mock, 'master');
        let tasksToDeliver = yield build.getTasks();
        expect(tasksToDeliver.length).toEqual(2);
        expect(tasksToDeliver[0]).toEqual('12345678');
        expect(tasksToDeliver[1]).toEqual('987654321');
    }));
    it('Should get list of tasks to deliver - avoid duplicates', () => __awaiter(this, void 0, void 0, function* () {
        let mock = NevercodeMock_1.default.generate();
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message'));
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Turkuć Podjadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd9', '2014-09-27T11:05:40Z', '[#987654321] Commit message'));
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Marek Niejadek', 'ad411374b8a7c38f70c3c42b0f2cd4e8363f3fd2', '2014-10-27T11:25:40Z', '[#12345678] Other commit message'));
        let build = new Build_1.Build(mock, 'master');
        let tasksToDeliver = yield build.getTasks();
        expect(tasksToDeliver.length).toEqual(2);
        expect(tasksToDeliver[0]).toEqual('12345678');
        expect(tasksToDeliver[1]).toEqual('987654321');
    }));
    it('Should get a build string', () => {
        let mock = NevercodeMock_1.default.generate();
        mock.build.version = '2.0.0';
        mock.build.build_number = 42;
        let build = new Build_1.Build(mock, 'master');
        let buildString = build.getBuildString();
        expect(buildString).toEqual('2.0.0-42');
    });
    it('Should get workflow name', () => {
        let mock = NevercodeMock_1.default.generate();
        let build = new Build_1.Build(mock, 'master');
        let workflow = build.getWorkflow();
        expect(workflow).toEqual('master');
    });
});
//# sourceMappingURL=Build.test.js.map