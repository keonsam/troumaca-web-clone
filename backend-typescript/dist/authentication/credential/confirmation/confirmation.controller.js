"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const confirmation_orchestrator_1 = require("./confirmation.orchestrator");
let confirmationOrchestrator = new confirmation_orchestrator_1.ConfirmationOrchestrator();
// router.post("/verify-credentials-confirmations", function (req, res, next) {
exports.verifyCredentialConfirmation = (req, res) => {
    let credentialConfirmation = req.body;
    confirmationOrchestrator.verifyCredentialConfirmation(credentialConfirmation)
        .subscribe(next => {
        console.log(next);
        res.send(next);
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.get("/send-confirmation-codes/phone/:credentialId", function (req, res, next) {
exports.sendPhoneVerificationCode = (req, res) => {
    let credentialId = req.params.credentialId;
    confirmationOrchestrator.sendPhoneVerificationCode(credentialId)
        .subscribe(credentialConfirmation => {
        res.send(JSON.stringify(credentialConfirmation));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.get("/send-confirmation-codes/email/:credentialId", function (req, res, next) {
exports.sendEmailVerificationCode = (req, res) => {
    let credentialId = req.params.credentialId;
    confirmationOrchestrator.sendEmailVerificationCode(credentialId)
        .subscribe(credentialConfirmation => {
        res.send(JSON.stringify(credentialConfirmation));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
//# sourceMappingURL=confirmation.controller.js.map