import {Request, Response} from "express";
import {CredentialOrchestrator} from './credential.orchestrator';
import {ValidateResponse} from "./validate.response";

let credentialOrchestrator:CredentialOrchestrator = new CredentialOrchestrator();

// router.post("/validate-username", function (req, res, next) {
export let isValidUsername = (req: Request, res: Response) => {
  credentialOrchestrator.isValidUsername(req.body)
    .subscribe((next:ValidateResponse) => {
      res.send(next.valid);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.post("/validate-password", function (req, res, next) {
export let isValidPassword = (req: Request, res: Response) => {
  credentialOrchestrator.isValidPassword(req.body)
    .subscribe((next:ValidateResponse) => {
      res.send(next.valid);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.post("/forgot-password", function (req, res, next) {
export let forgotPassword = (req: Request, res: Response) => {
  let username = req.body.username;
  credentialOrchestrator.forgotPassword(username)
    .subscribe((next:ValidateResponse) => {
      res.send(next.valid);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.post("/authenticate", function (req, res, next) {
export let authenticate = (req: Request, res: Response) => {
  let credential = req.body;
  credentialOrchestrator.authenticate(credential)
    .subscribe(session => {
      res.setHeader('Content-Type', 'application/json');
      if (session) {
        // { path: '/', httpOnly: true, secure: false, maxAge: null }
        res.cookie("sessionId", session.sessionId, { path: '/', maxAge: 20*60*1000, httpOnly: true });
      }
      res.send(session);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.post("/", function (req, res, next) {
export let addCredential = (req: Request, res: Response) => {
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

