"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session_orchestrator_1 = require("./session.orchestrator");
let sessionOrchestrator = new session_orchestrator_1.SessionOrchestrator();
// router.post("/active", function (req, res, next) {
exports.isValidSession = (req, res) => {
    let credential = req.body;
    sessionOrchestrator.isValidSession(credential)
        .subscribe(next => {
        res.setHeader('Content-Type', 'application/json');
        res.send(next);
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.post("/sessions/current-user-session", function (req, res, next) {
exports.getSimpleSession = (req, res) => {
    let credential = req.body;
    sessionOrchestrator.getSimpleSession(credential)
        .subscribe(next => {
        res.setHeader('Content-Type', 'application/json');
        res.send(next);
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
module.exports = router;
//# sourceMappingURL=session.resources.js.map