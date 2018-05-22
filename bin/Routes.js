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
const NevercodeBuild_1 = require("./nevercode/NevercodeBuild");
const PivotalTrackerService_1 = require("./pivotalTracker/PivotalTrackerService");
const HookParameters_1 = require("./HookParameters");
const TeamcityBuild_1 = require("./teamcity/TeamcityBuild");
class Routes {
    constructor(router, teamcityService) {
        this.teamcityService = teamcityService;
        router.post('/nevercode-hook', this.neverCodeHook.bind(this));
        router.post('/teamcity-hook', this.teamcityHook.bind(this));
    }
    neverCodeHook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const hookParameters = new HookParameters_1.HookParameters(req);
            const workflow = hookParameters.getWorkflow();
            const pivotalTrackerService = new PivotalTrackerService_1.PivotalTrackerService(hookParameters.getPivotalProjectId());
            try {
                const build = new NevercodeBuild_1.NevercodeBuild(req.body, hookParameters.getWorkflow(), hookParameters.shouldDeliver());
                const tasks = yield build.getTasks();
                this.logFoundTasks(tasks);
                const deliveredTasks = yield pivotalTrackerService.processTasks(build);
                this.logDeliveredTasks(deliveredTasks);
                return res.json({
                    status: 'OK',
                    deliveredTasks,
                    workflow
                });
            }
            catch (e) {
                this.logError(e, req.body, workflow);
                res.status(500).json({
                    error: JSON.stringify(e, null, 4),
                    body: JSON.stringify(req.body, null, 4),
                    workflow: workflow
                });
            }
        });
    }
    teamcityHook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const hookParameters = new HookParameters_1.HookParameters(req);
            const workflow = hookParameters.getWorkflow();
            console.log('Body: ' + JSON.stringify(req.body));
            const pivotalTrackerService = new PivotalTrackerService_1.PivotalTrackerService(hookParameters.getPivotalProjectId());
            try {
                const build = new TeamcityBuild_1.TeamcityBuild(req.body, this.teamcityService, hookParameters.getWorkflow(), hookParameters.shouldDeliver());
                const deliveredTasks = yield pivotalTrackerService.processTasks(build);
                this.logDeliveredTasks(deliveredTasks);
                return res.json({
                    status: 'OK',
                    deliveredTasks,
                    workflow
                });
            }
            catch (e) {
                this.logError(e, req.body, workflow);
                res.status(500).json({
                    error: JSON.stringify(e, null, 4),
                    body: JSON.stringify(req.body, null, 4),
                    workflow: workflow
                });
            }
        });
    }
    logFoundTasks(tasks) {
        console.log('Found tasks ', tasks);
    }
    logDeliveredTasks(deliveredTasks) {
        console.log('Tasks ', deliveredTasks, ' were successfully marked as delivered');
    }
    logError(e, request, workflow) {
        console.log('ERROR', JSON.stringify(e), 'REQ.BODY', JSON.stringify(request.body), 'WORKFLOW', JSON.stringify({
            workflow
        }));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map