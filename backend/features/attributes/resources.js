let express = require('express');
let router = express.Router();
let siteOrchestrator = require('./orchestrator');
let Pagination = require("../pagination");

let orchestrator = new siteOrchestrator();

router.get("/", function (req, res, next){
  res.send("testing");
}).post("/", function (req, res, next){
  let attribute = req.body;
  orchestrator
  .addAttribute(attribute)
  .subscribe(attribute => {
    res.send(JSON.stringify(attribute));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  })
});

module.exports = router;
