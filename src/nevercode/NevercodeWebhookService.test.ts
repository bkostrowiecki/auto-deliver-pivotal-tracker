import { NevercodeWebhookService } from "./NevercodeWebhookService";
import NevercodeWebhookResponse from "./NevercodeWebhookResponse";
import { NevercodeChange } from "./NevercodeChange";
import NevercodeMock from "./NevercodeMock";

describe('Nevercode Webhook Service', () => {
    it('Should get list of tasks to deliver', async () => {
        let mock = NevercodeMock.generate();
        mock.build.changes.push(new NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message'));

        let nevercodeWebhookService = new NevercodeWebhookService();
        let tasksToDeliver = await nevercodeWebhookService.parseWebhookResponse(mock);

        expect(tasksToDeliver.length).toEqual(1);
        expect(tasksToDeliver[0]).toEqual('12345678');
    });

    it('Should get list of tasks to deliver - more than 1 commit', async () => {
        let mock = NevercodeMock.generate();
        mock.build.changes.push(new NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message'));
        mock.build.changes.push(new NevercodeChange('Turkuć Podjadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd9', '2014-09-27T11:05:40Z', '[#987654321] Commit message'));

        let nevercodeWebhookService = new NevercodeWebhookService();
        let tasksToDeliver = await nevercodeWebhookService.parseWebhookResponse(mock);

        expect(tasksToDeliver.length).toEqual(2);
        expect(tasksToDeliver[0]).toEqual('12345678');
        expect(tasksToDeliver[1]).toEqual('987654321');
    });

    it('Should get list of tasks to deliver - avoid duplicates', async () => {
        let mock = NevercodeMock.generate();
        mock.build.changes.push(new NevercodeChange('Marek Niejadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd8', '2014-10-27T11:05:40Z', '[#12345678] Commit message'));
        mock.build.changes.push(new NevercodeChange('Turkuć Podjadek', '6d411374b8a7c38f70c3c42b0f2cd4e8363f3fd9', '2014-09-27T11:05:40Z', '[#987654321] Commit message'));
        mock.build.changes.push(new NevercodeChange('Marek Niejadek', 'ad411374b8a7c38f70c3c42b0f2cd4e8363f3fd2', '2014-10-27T11:25:40Z', '[#12345678] Other commit message'));

        let nevercodeWebhookService = new NevercodeWebhookService();
        let tasksToDeliver = await nevercodeWebhookService.parseWebhookResponse(mock);

        expect(tasksToDeliver.length).toEqual(2);
        expect(tasksToDeliver[0]).toEqual('12345678');
        expect(tasksToDeliver[1]).toEqual('987654321');
    });
});
