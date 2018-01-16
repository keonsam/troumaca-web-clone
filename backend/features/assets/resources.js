let express = require('express');
let router = express.Router();
let AssetOrchestrator = require('./orchestrator');
let Pagination = require("../pagination");

let assetOrch = new AssetOrchestrator();

router.get("/", function(req, res, next) {

  var pagination = new Pagination();

  assetOrch.getAssets("")
  .subscribe(asset => {
    res.send(JSON.stringify(asset));
  });
}).post("/", function (req, res, ndex) {

  assetOrch.saveAsset("")
  .subscribe(asset => {
    res.send(JSON.stringify(asset));
  });

  console.log("post asset resource");
  res.send(JSON.stringify({}));
});


module.exports = router;