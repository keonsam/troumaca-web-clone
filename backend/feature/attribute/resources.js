let express = require('express');
let router = express.Router();
let attributeOrchestrator = require('./orchestrator');

let orchestrator = new attributeOrchestrator();

router.get("/", function (req, res, next){

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
  .getAttributes(number, size, field, direction)
  .subscribe(attributes => {
    res.send(JSON.stringify(attributes));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });

});

router.get("/data-types", function (req, res, next) {
  orchestrator
  .getDataTypes()
  .subscribe(dataTypes => {
    res.send(JSON.stringify(dataTypes));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.get("/:attributeId", function (req, res, next) {

  let attributeId = req.params.attributeId;

  orchestrator
  .getAttributeById(attributeId)
  .subscribe(attribute => {
    let body = JSON.stringify(attribute);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

});

router.post("/", function (req, res, next){
  let attribute = req.body;
  orchestrator
  .addAttribute(attribute)
  .subscribe(attribute => {
    res.send(JSON.stringify(attribute));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  })
});

router.put("/:attributeId", function (req, res, next) {
  let attributeId = req.params.attributeId;
  let attribute = req.body;
  orchestrator
    .updateAttribute(attributeId, attribute)
    .subscribe(attribute => {
      res.send(JSON.stringify(attribute));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })

});

router.delete("/:attributeId", function (req, res, next) {
  let attributeId = req.params.attributeId;
  orchestrator
    .deleteAttribute(attributeId)
    .subscribe(attribute => {
      res.send(JSON.stringify(attribute));
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
