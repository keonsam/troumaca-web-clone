let express = require('express');
let router = express.Router();
let AssetTypeClassesOrchestrator = require('./orchestrator');
let Pagination = require("../pagination");

let assetOrch = new AssetTypeClassesOrchestrator();

router.get("/", function(req, res, next) {

  let page = {
    number: req.query.pageNumber,
    size: req.query.pageSize,
   items: 1
  };

  let sort = {
    direction: req.query.sortDirection,
    attributes: req.query.sortAttributes
  };

  let pagination = new Pagination(page, sort);

  assetOrch.getAssetTypeClasses(pagination)
  .subscribe(assetTypeClasses => {
    res.send(JSON.stringify(assetTypeClasses));
  });

}).post("/", function (req, res, ndex) {
  assetOrch.saveAssetTypeClass(req.body)
  .subscribe(assetTypeClass => {
    res.send(JSON.stringify(assetTypeClass));
  });

}).get("/:assetTypeClassId", function (req, res, ndex){
  assetOrch.getAssetTypeClass(req.params.assetTypeClassId)
  .subscribe(assetTypeClass => {
    res.send(JSON.stringify(assetTypeClass));
  });

}).put("/", function (req, res, next) {
  assetOrch.updateAssetTypeClass(req.body)
  .subscribe(assetTypeClass => {
    res.send(JSON.stringify(assetTypeClass));
  });

}).delete("/:assetTypeClassId", function (req, res, next) {
  let assetTypeClassId = req.params.assetTypeClassId;
  assetOrch.deleteAssetTypeClass(assetTypeClassId)
  .subscribe(numRemoved => {
    res.send(JSON.stringify(numRemoved));
  });
});

module.exports = router;
