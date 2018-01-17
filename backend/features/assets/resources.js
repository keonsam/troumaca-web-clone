let express = require('express');
let router = express.Router();
let AssetOrchestrator = require('./orchestrator');
let Pagination = require("../pagination");

let assetOrch = new AssetOrchestrator();

router.get("/", function(req, res, next) {

  var page = {
    number: req.body.pageNumber,
    size: req.body.pageSize
  //  items: 1
  }

  var sort = {
    direction: req.query.sortDirection,
    attributes: req.query.sortAttributes
  }
  var pagination = new Pagination(page,sort);

  assetOrch.getAssets(pagination)
  .subscribe(asset => {
    res.send(JSON.stringify(asset));
  });
}).post("/", function (req, res, ndex) {

  assetOrch.saveAsset(req.body)
  .subscribe(asset => {
    res.send(JSON.stringify(asset));
  });

  console.log("post asset resource");
  res.send(JSON.stringify({}));
});


module.exports = router;
