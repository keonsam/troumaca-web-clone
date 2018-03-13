let express = require('express');
let router = express.Router();
let sessionOrchestrator = require('./session.orchestrator');

router.post("/active", function (req, res, next) {
  let credential = req.body;
  sessionOrchestrator
  .isValidSession(credential)
  .subscribe(next => {
    res.setHeader('Content-Type', 'application/json');
    res.send(next);
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/sessions/current-user-session", function (req, res, next) {
  let credential = req.body;
  sessionOrchestrator
    .getSimpleSession(credential)
    .subscribe(next => {
      res.setHeader('Content-Type', 'application/json');
      res.send(next);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

module.exports = router;