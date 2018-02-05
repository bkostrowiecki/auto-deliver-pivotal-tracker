"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildInfo_1 = require("./BuildInfo");
describe('BuildInfo', () => {
    it('Should create build string', () => {
        const buildInfo = new BuildInfo_1.BuildInfo({
            build: {
                version: '2.0.0',
                build_number: 1
            }
        });
        expect(buildInfo.getBuildString()).toEqual('2.0.0-1');
    });
    it('Should throw error because lack of build number', () => {
        const buildInfo = new BuildInfo_1.BuildInfo({
            build: {
                version: '2.0.0'
            }
        });
        expect(() => buildInfo.getBuildString()).toThrow('Some required property is missing');
    });
    it('Should throw error because lack of version', () => {
        const buildInfo = new BuildInfo_1.BuildInfo({
            build: {
                build_number: 1
            }
        });
        expect(() => buildInfo.getBuildString()).toThrow('Some required property is missing');
    });
    it('Should not throw error because lack of build number if build number is equal 0', () => {
        const buildInfo = new BuildInfo_1.BuildInfo({
            build: {
                build_number: 0
            }
        });
        expect(() => buildInfo.getBuildString()).not.toThrow('Some required property is missing');
    });
});
//# sourceMappingURL=BuildInfo.test.js.map