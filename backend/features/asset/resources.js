let express = require('express');
let router = express.Router();
let AssetOrchestrator = require('./orchestrator');

let assetOrch = new AssetOrchestrator();

router.get("/", function(req, res, next) {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  assetOrch.getAssets(number, size, field, direction)
  .subscribe(assets => {
    res.send(JSON.stringify(assets));
  });

});

router.post("/", function (req, res, ndex) {
  let asset = req.body;
  assetOrch
  .saveAsset(asset)
  .subscribe(asset => {
    res.send(JSON.stringify(asset));
  });

});

function getNumericValueOrDefault(value, defaultValue) {
  if (!value) {
    return defaultValue;
  }

  if (isNaN(parseFloat(value))) {
    return defaultValue;
  }

  if (!isFinite(value)) {
    return defaultValue;
  }

  return value
}

function getStringValueOrDefault(strValue, defaultValue) {
  if (!strValue && !defaultValue) {
    return "";
  }

  if (!strValue && defaultValue) {
    return defaultValue;
  }

  return strValue;
}


module.exports = router;
