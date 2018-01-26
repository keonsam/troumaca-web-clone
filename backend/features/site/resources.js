let express = require('express');
let router = express.Router();
let SiteOrchestrator = require('./orchestrator');
let Pagination = require("../pagination");

let SiteOrch = new SiteOrchestrator();

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

  let pagination = new Pagination(page,sort);

  SiteOrch.getSite(pagination)
  .subscribe(Site => {
    res.send(JSON.stringify(Site));
  });

}).post("/", function (req, res, ndex) {

  SiteOrch.saveSite(req.body)
  .subscribe(Site => {
    res.send(JSON.stringify(Site));
  });

});


module.exports = router;
