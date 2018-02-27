let express = require('express');
let router = express.Router();
let assetTypesOrchestrator = require('./orchestrator');

let orchestrator = new assetTypesOrchestrator();

router.get("/", function (req, res, next) {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
  .getAssetTypes(number, size, field, direction)
  .subscribe(assetTypes => {
    res.send(JSON.stringify(assetTypes));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });

});

router.get("/:assetTypeId", function (req, res, next) {

  let assetTypeId = req.params.assetTypeId;

  orchestrator
  .getAssetType(assetTypeId)
  .subscribe(assetType => {
    let body = JSON.stringify(assetType);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

});

router.post("/", function (req, res, next){
  let assetType = req.body;
  orchestrator
  .saveAssetType(assetType)
  .subscribe(assetType => {
    res.send(JSON.stringify(assetType));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  })
});

router.put("/:assetTypeId", function (req, res, next) {
  let assetTypeId = req.params.assetTypeId;
  let assetType = req.body;
  orchestrator
    .updateAssetType(assetTypeId, assetType)
    .subscribe(assetType => {
      res.send(JSON.stringify(assetType));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })

});

router.delete("/:assetTypeId", function (req, res, next) {
  let assetTypeId = req.params.assetTypeId;
  orchestrator
    .deleteAssetType(assetTypeId)
    .subscribe(assetType => {
      res.send(JSON.stringify(assetType));
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
