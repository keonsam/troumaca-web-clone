let express = require('express');
let router = express.Router();
let assetTypesOrchestrator = require('./orchestrator');

let orchestrator = new assetTypesOrchestrator();

router.get("/", function (req, res, next){

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

router.get("/attributes", function (req, res, next) {
  let assignedArray = req.query.assignedArray.split(",");

  orchestrator
  .getAttributes(assignedArray)
  .subscribe(attributes => {
    res.send(JSON.stringify(attributes));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });

});

router.get("/asset-type-classes", function (req, res, next) {
  let searchStr =  req.query.q;
  let pageSize = req.query.pageSize;

  orchestrator
  .getAssetTypeClassId(searchStr, pageSize)
  .subscribe(assetTypeClasses => {
    let body = JSON.stringify(assetTypeClasses);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

});


router.get("/values", function (req, res, next) {
  let assetTypeId =  req.query.assetTypeId;

  orchestrator
  .getValues(assetTypeId)
  .subscribe(values => {
    let body = JSON.stringify(values);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
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

router.post("/values", function (req, res, next) {
  let value = req.body;

  orchestrator
  .saveValue(value)
  .subscribe(value => {
    res.send(JSON.stringify(value));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  })
});

router.put("/values/:valueId", function (req, res, next) {
  let valueId = req.params.valueId;
  let value = req.body;
  orchestrator
    .updateValue(valueId, value)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
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

router.delete("/values/:valueId", function (req, res, next) {
  let valueId = req.params.valueId;

  orchestrator
    .deleteValue(valueId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
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
