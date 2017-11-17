"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const PivotalTrackerService_1 = require("./pivotalTracker/PivotalTrackerService");
const NevercodeWebhookService_1 = require("./nevercode/NevercodeWebhookService");
const fs = require("fs");
const moment = require("moment");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.nevercodeWebhookService = new NevercodeWebhookService_1.NevercodeWebhookService();
        this.pivotalTrackerService = new PivotalTrackerService_1.PivotalTrackerService();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
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
exports.default = new App().express;
//# sourceMappingURL=App.js.map