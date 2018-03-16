let express = require('express');
let router = express.Router();
let credentialOrchestrator = require('./credential.orchestrator');

// router.post("/validate-username", function (req, res, next) {
router.post("/validate-username", function (req, res, next) {
  let usernameObj = req.body;
  credentialOrchestrator
    .isValidUsername(usernameObj)
    .subscribe(next => {
      res.send(next.valid);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

// router.post("/validate-password", function (req, res, next) {
router.post("/validate-password", function (req, res, next) {
  let passwordObj = req.body;
  credentialOrchestrator
    .isValidPassword(passwordObj)
    .subscribe(next => {
      res.send(next.valid);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

// router.post("/forgot-password", function (req, res, next) {
router.post("/forgot-password", function (req, res, next) {
  let username = req.body.username;
  credentialOrchestrator
    .forgotPassword(username)
    .subscribe(next => {
      res.send(next.valid);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

// router.post("/authenticate", function (req, res, next) {
router.post("/authenticate", function (req, res, next) {
  let credential = req.body;
  credentialOrchestrator
    .authenticate(credential)
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
});

// router.post("/", function (req, res, next) {
router.post("/", function (req, res, next) {
  let credential = req.body;
  credentialOrchestrator
    .addCredential(credential)
    .subscribe(credentialConfirmation => {
      res.setHeader('Content-Type', 'application/json');
      res.send(credentialConfirmation);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

