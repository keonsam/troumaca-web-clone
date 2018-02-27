let express = require('express');
let router = express.Router();
let shipmentOrchestrator = require('./orchestrator');

let orchestrator = new shipmentOrchestrator();

router.get("/", function (req, res, next){

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
  .getShipments(number, size, field, direction)
  .subscribe(shipments => {
    res.send(JSON.stringify(shipments));
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

router.get("/:shipmentId", function (req, res, next) {

  let shipmentId = req.params.shipmentId;

  orchestrator
  .getShipmentById(shipmentId)
  .subscribe(shipment => {
    let body = JSON.stringify(shipment);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

});

router.post("/", function (req, res, next){
  let shipment = req.body;
  orchestrator
  .addShipment(shipment)
  .subscribe(shipment => {
    res.send(JSON.stringify(shipment));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  })
});

router.put("/:shipmentId", function (req, res, next) {
  let shipmentId = req.params.shipmentId;
  let shipment = req.body;
  orchestrator
    .updateShipment(shipmentId, shipment)
    .subscribe(shipment => {
      res.send(JSON.stringify(shipment));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })

});

router.delete("/:shipmentId", function (req, res, next) {
  let shipmentId = req.params.shipmentId;
  orchestrator
    .deleteShipment(shipmentId)
    .subscribe(shipment => {
      res.send(JSON.stringify(shipment));
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
