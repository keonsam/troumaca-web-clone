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

}).put("/:assetTypeClassId", function (req, res, ndex) {

  res.send("Not Implemented.");

}).delete("/:assetTypeClassId", function (req, res, next) {
  let assetTypeClassId = req.params.assetTypeClassId;
  assetOrch.deleteAssetTypeClass(assetTypeClassId)
  .subscribe(string => {
    res.send(string);
  });
});

module.exports = router;
