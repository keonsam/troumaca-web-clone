let express = require('express');
let router = express.Router();

let unionOfPhysicalSites = { "unionOfPhysicalSites": [{
    siteId: "01615ccc-74a8-41da-b052-c590ea05f056",
    name: "Home",
    describe: "Home Address",
    city: "Los Angeles",
    stateOrProvince: "California",
    postalCode: "90064",
    country: "USA",
    streetNumber: "2425",
    street: "Purdue Ave",
    apartmentOrSuite: "303",
    floor: "3",
    postOfficeBoxNumber: "P.O. Box 1300"
  }, {
    siteId: "01615ccc-74a8-41da-b052-c590ea05f056",
    name: "Work",
    describe: "Work Address",
    city: "Los Angeles",
    stateOrProvince: "California",
    postalCode: "90036",
    country: "USA",
    street: "Wilshire Blvd",
    streetNumber: "5757",
    apartmentOrSuite: "204",
    floor: "2",
    postOfficeBoxNumber: "P.O. Box 7300"
  }]
};

router.get('/union-of-physical-sites', function(req, res, next) {
  res.send(JSON.stringify(unionOfPhysicalSites));
});

module.exports = router;