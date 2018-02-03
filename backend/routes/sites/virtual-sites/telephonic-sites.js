let express = require('express');
let router = express.Router();

// var telephonicSites = {"telephonicSites":[{
//   siteId: "06cd4e78-85b4-4a08-9650-3d3ecf6b12ef",
//   name: "Mobile",
//   describe: "Mobile Address",
//   createdDate: "",
//   removalDate: "",
//   countryCode: "",
//   areaCode: "",
//   exchange: "",
//
// }]};

router.post("/", function(req, res, next) {

  res.send(JSON.stringify(postOfficeBoxes));

}).get("/", function(req, res, next) {
  res.send(JSON.stringify({}));
});

module.exports = router;