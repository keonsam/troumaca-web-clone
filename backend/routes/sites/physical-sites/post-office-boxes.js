let express = require('express');
let router = express.Router();

var postOfficeBoxes = {"postOfficeBoxes":[{
  siteId: "eeced7fe-66e5-4ee5-8ab9-fb923bf790a5",
  name: "Home",
  describe: "Home Address",
  city: "Los Angeles",
  state: "California",
  postalCode: "90064",
  country: "USA",
  postOfficeBoxNumber: "P.O. Box 931000",
}]};

router.get('/sites/physical-sites/post-office-boxes', function(req, res, next) {
  res.send(JSON.stringify(postOfficeBoxes));
});

module.exports = router;