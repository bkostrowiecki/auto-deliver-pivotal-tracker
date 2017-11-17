import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { PivotalTrackerService } from './pivotalTracker/PivotalTrackerService';
import { NevercodeWebhookService } from './nevercode/NevercodeWebhookService';
import * as fs from "fs";
import * as moment from "moment";

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
        
        router.post('/nevercode-hook', (req, res, next) => {
            console.log('Nevercode body', JSON.stringify(req.body, null, 4));
            
            this.nevercodeWebhookService.parseWebhookResponse(req.body).then(tasks => {
                console.log('Found tasks', tasks);
                return this.pivotalTrackerService.markAsDeliver(tasks);
            }).then((deliveredTasks) => {
                console.log('Tasks ', deliveredTasks, ' were successfully marked as delivered');
                return res.json({
                    status: 'OK',
                    tasks: deliveredTasks
                });
            }).catch(e => {
                fs.writeFileSync(moment().format('YYYY-MM-DD-hh-mm-ss') + '.txt', e);
                console.log(JSON.stringify(e));
            });
        });

        this.express.use('/', router);
    }
}

export default new App().express;
