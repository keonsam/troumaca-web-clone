let express = require('express');
let router = express.Router();
let AssetOrchestrator = require('./orchestrator');

let assetOrch = new AssetOrchestrator();

router.get("/", function(req, res, next) {
  assetOrch
    .saveAsset("")
    .subscribe(asset => {
      res.send(JSON.stringify(asset));
    });
}).post("/", function (req, res, ndex) {
  console.log("post asset resource");
  res.send(JSON.stringify({}));
});


module.exports = router;