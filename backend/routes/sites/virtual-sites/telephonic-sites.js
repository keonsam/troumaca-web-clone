let express = require('express');
let router = express.Router();

var telephonicSites = {"telephonicSites":[{
  siteId: "06cd4e78-85b4-4a08-9650-3d3ecf6b12ef",
  name: "Mobile",
  describe: "Mobile Address",
  createdDate: "",
  removalDate: "",
  countryCode: "",
  areaCode: "",
  exchange: "",

}]};

router.get('/sites/physical-sites/post-office-boxes', function(req, res, next) {
  res.send(JSON.stringify(postOfficeBoxes));
});

module.exports = router;