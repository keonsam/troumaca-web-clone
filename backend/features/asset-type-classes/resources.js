let express = require('express');
let router = express.Router();
let assetTypeClassesOrchestrator = require('./orchestrator');
let Pagination = require("../pagination");

let orchestrator = new assetTypeClassesOrchestrator();

router.get("/", function(req, res, next) {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
  .getAssetTypeClasses(number, size, field, direction)
  .subscribe(assetTypeClasses => {
    console.log(assetTypeClasses);
    res.send(JSON.stringify(assetTypeClasses));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });


});

router.get("/:assetTypeClassId", function (req, res, ndex){

  let assetTypeClassId = req.params.assetTypeClassId;
  orchestrator
  .getAssetTypeClass(assetTypeClassId)
  .subscribe(assetTypeClass => {
    let body = JSON.stringify(assetTypeClass);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

});

router.post("/", function (req, res, ndex) {
  let assetTypeClass = req.body;
  orchestrator
  .saveAssetTypeClass(assetTypeClass)
  .subscribe(assetTypeClass => {
    res.send(JSON.stringify(assetTypeClass));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  })
});

router.put("/:assetTypeClassId", function (req, res, next) {
  let assetTypeClassId = req.params.assetTypeClassId;
  let assetTypeClass = req.body;
  orchestrator
    .updateAssetTypeClass(assetTypeClassId, assetTypeClass)
    .subscribe(assetTypeClass => {
      res.send(JSON.stringify(assetTypeClass));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })

})

router.delete("/:assetTypeClassId", function (req, res, next) {
  let assetTypeClassId = req.params.assetTypeClassId;
  orchestrator
    .deleteAssetTypeClass(assetTypeClassId)
    .subscribe(assetTypeClass => {
      res.send(JSON.stringify(assetTypeClass));
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
