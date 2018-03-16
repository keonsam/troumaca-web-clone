import {Response, Request, NextFunction} from 'express';
import {ConfirmationOrchestrator} from "./confirmation.orchestrator";

let confirmationOrchestrator:ConfirmationOrchestrator = new ConfirmationOrchestrator();

// router.post("/verify-credentials-confirmations", function (req, res, next) {
export let verifyCredentialConfirmation = (req: Request, res: Response) => {
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
export let sendPhoneVerificationCode = (req: Request, res: Response) => {
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
export let sendEmailVerificationCode = (req: Request, res: Response) => {
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