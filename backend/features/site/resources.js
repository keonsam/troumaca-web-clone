let express = require('express');
let router = express.Router();
let siteOrchestrator = require('./orchestrator');
let Pagination = require("../pagination");

let orchestrator = new siteOrchestrator();

router.post("/virtual-sites/phones/", function (req, res, next) {

  let phone = req.body;
  orchestrator
  .saveTelephone(phone)
  .subscribe(phone => {
    res.send(JSON.stringify(phone));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  })

});

router.get("/virtual-sites/phones/", function(req, res, next) {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
  .getTelephones(number, size, field, direction)
  .subscribe(telephones => {
    res.send(JSON.stringify(telephones));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });

});

router.get("/virtual-sites/phones/:siteId/", function (req, res, next) {

  let siteId = req.params.siteId;

  orchestrator
  .getTelephoneBySiteId(siteId)
  .subscribe(phone => {
    let body = JSON.stringify(phone);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

});

router.put("/virtual-sites/phones/:siteId/", function (req, res, next) {

  let siteId = req.params.siteId;
  let phone = req.body;
  orchestrator
    .updateTelephone(siteId, phone)
    .subscribe(phone => {
      res.send(JSON.stringify(phone));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })

});

router.delete("/virtual-sites/phones/:siteId/", function (req, res, next) {

  let siteId = req.params.siteId;
  orchestrator
    .deleteTelephone(siteId)
    .subscribe(phone => {
      res.send(JSON.stringify(phone));
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
