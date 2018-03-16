let express = require('express');
let router = express.Router();
let credentialOrchestrator = require('./credential.orchestrator');


// router.post("/verify-credentials-confirmations", function (req, res, next) {
router.post("/verify-credentials-confirmations", function (req, res, next) {
  let credentialConfirmation = req.body;
  credentialOrchestrator
    .verifyCredentialConfirmation(credentialConfirmation)
    .subscribe(next => {
      console.log(next);
      res.send(next);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

// router.get("/send-confirmation-codes/phone/:credentialId", function (req, res, next) {
router.get("/send-confirmation-codes/phone/:credentialId", function (req, res, next) {
  let credentialId = req.params.credentialId;
  credentialOrchestrator
    .sendPhoneVerificationCode(credentialId)
    .subscribe(credentialConfirmation => {
      res.send(JSON.stringify(credentialConfirmation));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

// router.get("/send-confirmation-codes/email/:credentialId", function (req, res, next) {
router.get("/send-confirmation-codes/email/:credentialId", function (req, res, next) {
  let credentialId = req.params.credentialId;
  credentialOrchestrator
    .sendEmailVerificationCode(credentialId)
    .subscribe(credentialConfirmation => {
      res.send(JSON.stringify(credentialConfirmation));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});


module.exports = router;
