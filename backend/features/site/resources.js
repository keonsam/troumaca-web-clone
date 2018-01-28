let express = require('express');
let router = express.Router();
let siteOrchestrator = require('./orchestrator');
let Pagination = require("../pagination");

let orchestrator = new siteOrchestrator();

router
.post("/virtual-sites/phones", function (req, res, next) {
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

}).get("/virtual-sites/phones", function(req, res, next) {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let sort = getSortValueOrDefault(req.query.sortField, req.query.sortOrder);

  orchestrator
  .getTelephones(number, size, sort)
  .subscribe(telephones => {
    res.send(JSON.stringify(telephones));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });

}).post("/", function (req, res, ndex) {

  SiteOrch.saveSite(req.body)
  .subscribe(Site => {
    res.send(JSON.stringify(Site));
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

function getSortValueOrDefault(field, direction) {
  let sort = {};
  if (field && direction) {
    sort[field] = direction;
    return sort;
  } else {
    return sort;
  }

}

module.exports = router;
