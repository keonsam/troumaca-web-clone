let express = require('express');
let router = express.Router();
let sessionOrchestrator = require('./session.orchestrator');

router.post("/active", function (req, res, next) {
  let credential = req.body;
  sessionOrchestrator
  .addCredential(credential)
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