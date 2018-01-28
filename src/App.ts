import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { PivotalTrackerService } from './pivotalTracker/PivotalTrackerService';
import { NevercodeWebhookService } from './nevercode/NevercodeWebhookService';
import * as fs from 'fs';
import * as moment from 'moment';
import { StoryHash } from './pivotalTracker/task';

// Creates and configures an ExpressJS web server.
class App {
    // ref to Express instance
    public express: express.Application;

    private pivotalTrackerService: PivotalTrackerService;
    private nevercodeWebhookService: NevercodeWebhookService;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();

        this.nevercodeWebhookService = new NevercodeWebhookService();
        this.pivotalTrackerService = new PivotalTrackerService();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
        * working so far. This function will change when we start to add more
        * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });

        router.post(
            '/nevercode-hook',
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction
            ) => {
                const workflow = req.query.workflow;

                try {
                    const tasks = await this.nevercodeWebhookService.parseWebhookResponse(
                        req.body
                    );
                    console.log('Found tasks ', tasks);
                    const deliveredTasks = await this.pivotalTrackerService.markAsDeliver(
                        tasks,
                        workflow,
                        this.nevercodeWebhookService.getBuildString(req.body)
                    );
                    console.log(
                        'Tasks ',
                        deliveredTasks,
                        ' were successfully marked as delivered'
                    );
                    return res.json({
                        status: 'OK',
                        deliveredTasks,
                        workflow
                    });
                } catch (e) {
                    console.log(
                        JSON.stringify(e, null, 4),
                        JSON.stringify(req.body, null, 4),
                        JSON.stringify({
                            workflow
                        }, null, 4)
                    );
                }
            }
        );

        this.express.use('/', router);
    }
}

export default new App().express;
