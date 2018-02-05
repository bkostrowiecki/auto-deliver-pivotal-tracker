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
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const PivotalTrackerService_1 = require("./pivotalTracker/PivotalTrackerService");
const Build_1 = require("./Build");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
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
        router.post('/nevercode-hook', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const workflow = req.query.workflow;
            try {
                const build = new Build_1.Build(req.body, workflow);
                const tasks = build.getTasks();
                console.log('Found tasks ', tasks);
                const deliveredTasks = yield this.pivotalTrackerService.processTasks(build);
                console.log('Tasks ', deliveredTasks, ' were successfully marked as delivered');
                return res.json({
                    status: 'OK',
                    deliveredTasks,
                    workflow
                });
            }
            catch (e) {
                console.log(JSON.stringify(e, null, 4), JSON.stringify(req.body, null, 4), JSON.stringify({
                    workflow
                }, null, 4));
                res.status(400).json({
                    error: JSON.stringify(e, null, 4),
                    body: JSON.stringify(req.body, null, 4),
                    workflow: workflow
                });
            }
        }));
        this.express.use('/', router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map