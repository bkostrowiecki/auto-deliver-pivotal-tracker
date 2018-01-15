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
const NevercodeWebhookService_1 = require("./NevercodeWebhookService");
const NevercodeChange_1 = require("./NevercodeChange");
const NevercodeMock_1 = require("./NevercodeMock");
describe('Nevercode Webhook Service', () => {
    it('Should get list of tasks to deliver', () => __awaiter(this, void 0, void 0, function* () {
        let mock = NevercodeMock_1.default.generate();
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message'));
        let nevercodeWebhookService = new NevercodeWebhookService_1.NevercodeWebhookService();
        let tasksToDeliver = yield nevercodeWebhookService.parseWebhookResponse(mock);
        expect(tasksToDeliver.length).toEqual(1);
        expect(tasksToDeliver[0]).toEqual('12345678');
    }));
    it('Should get list of tasks to deliver - more than 1 commit', () => __awaiter(this, void 0, void 0, function* () {
        let mock = NevercodeMock_1.default.generate();
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message'));
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Turkuć Podjadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd9', '2014-09-27T11:05:40Z', '[#987654321] Commit message'));
        let nevercodeWebhookService = new NevercodeWebhookService_1.NevercodeWebhookService();
        let tasksToDeliver = yield nevercodeWebhookService.parseWebhookResponse(mock);
        expect(tasksToDeliver.length).toEqual(2);
        expect(tasksToDeliver[0]).toEqual('12345678');
        expect(tasksToDeliver[1]).toEqual('987654321');
    }));
    it('Should get list of tasks to deliver - avoid duplicates', () => __awaiter(this, void 0, void 0, function* () {
        let mock = NevercodeMock_1.default.generate();
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message'));
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Turkuć Podjadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd9', '2014-09-27T11:05:40Z', '[#987654321] Commit message'));
        mock.build.changes.push(new NevercodeChange_1.NevercodeChange('Marek Niejadek', 'ad411374b8a7c38f70c3c42b0f2cd4e8363f3fd2', '2014-10-27T11:25:40Z', '[#12345678] Other commit message'));
        let nevercodeWebhookService = new NevercodeWebhookService_1.NevercodeWebhookService();
        let tasksToDeliver = yield nevercodeWebhookService.parseWebhookResponse(mock);
        expect(tasksToDeliver.length).toEqual(2);
        expect(tasksToDeliver[0]).toEqual('12345678');
        expect(tasksToDeliver[1]).toEqual('987654321');
    }));
});
//# sourceMappingURL=NevercodeWebhookService.test.js.map