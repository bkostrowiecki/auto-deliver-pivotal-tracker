import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { PivotalTrackerService } from './pivotalTracker/PivotalTrackerService';
import { Routes } from './Routes';
import { TeamcityService } from './teamcity/TeamcityService';
import { BitriseService } from './bitrise/BitriseService';

// Creates and configures an ExpressJS web server.
class App {
    // ref to Express instance
    public express: express.Application;

    private teamcityService: TeamcityService;
    private bitriseService: BitriseService;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();

        this.teamcityService = new TeamcityService();
        this.bitriseService = new BitriseService();

        this.routes();
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
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            });
        });

        const routes = new Routes(
            router,
            this.teamcityService,
            this.bitriseService
        );

        this.express.use('/', router);
    }
}

export default new App().express;
