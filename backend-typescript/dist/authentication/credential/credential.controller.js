"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const credential_orchestrator_1 = require("./credential.orchestrator");
let credentialOrchestrator = new credential_orchestrator_1.CredentialOrchestrator();
// router.post("/validate-username", function (req, res, next) {
exports.isValidUsername = (req, res) => {
    credentialOrchestrator.isValidUsername(req.body)
        .subscribe((next) => {
        res.send(next.valid);
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.post("/validate-password", function (req, res, next) {
exports.isValidPassword = (req, res) => {
    credentialOrchestrator.isValidPassword(req.body)
        .subscribe((next) => {
        res.send(next.valid);
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.post("/forgot-password", function (req, res, next) {
exports.forgotPassword = (req, res) => {
    let username = req.body.username;
    credentialOrchestrator.forgotPassword(username)
        .subscribe((next) => {
        res.send(next.valid);
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.post("/authenticate", function (req, res, next) {
exports.authenticate = (req, res) => {
    let credential = req.body;
    credentialOrchestrator.authenticate(credential)
        .subscribe(session => {
        res.setHeader('Content-Type', 'application/json');
        if (session) {
            // { path: '/', httpOnly: true, secure: false, maxAge: null }
            res.cookie("sessionId", session.sessionId, { path: '/', maxAge: 20 * 60 * 1000, httpOnly: true });
        }
        res.send(session);
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.post("/", function (req, res, next) {
exports.addCredential = (req, res) => {
    let credential = req.body;
    credentialOrchestrator.addCredential(credential)
        .subscribe(credentialConfirmation => {
        res.setHeader('Content-Type', 'application/json');
        res.send(credentialConfirmation);
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
//# sourceMappingURL=credential.controller.js.map