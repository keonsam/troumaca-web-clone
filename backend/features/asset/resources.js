let express = require('express');
let router = express.Router();
let AssetOrchestrator = require('./orchestrator');

let assetOrch = new AssetOrchestrator();

router.get("/", function (req, res, next) {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  assetOrch.getAssets(number, size, field, direction)
  .subscribe(assets => {
    res.send(JSON.stringify(assets));
  });

});

router.get("/:assetId", function  (req, res, next) {
  let assetId = req.params.assetId;

  assetOrch
  .getAssetById(assetId)
  .subscribe(asset => {
    let body = JSON.stringify(asset);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
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

router.put("/:assetId", function (req, res, ndex) {
  let assetId = req.params.assetId;
  let asset = req.body;
  assetOrch
    .updateAsset(assetId, asset)
    .subscribe(asset => {
      res.send(JSON.stringify(asset));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })

});

router.delete("/:assetId", function (req, res, ndex) {
  let assetId = req.params.assetId;
  assetOrch
    .deleteAsset(assetId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })
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
