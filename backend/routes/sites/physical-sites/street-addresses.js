let express = require('express');
let router = express.Router();

var streetAddresses = {"streetAddresses":[{
  siteId: "01615ccc-74a8-41da-b052-c590ea05f056",
  name: "Home",
  describe: "Home Address",
  city: "Los Angeles",
  state: "California",
  postalCode: "90064",
  country: "USA",
  street: "Purdue Ave",
  streetNumber: "2425",
  apartmentOrSuite:"303",
  floor:"3"
}, {
  siteId: "01615ccc-74a8-41da-b052-c590ea05f056",
  name: "Work",
  describe: "Work Address",
  city: "Los Angeles",
  state: "California",
  postalCode: "90036",
  country: "USA",
  street: "Wilshire Blvd",
  streetNumber: "5757",
  apartmentOrSuite:"204",
  floor:"2"
}]};

router.get('/sites/physical-sites/street-addresses', function(req, res, next) {
  res.send(JSON.stringify(streetAddresses));
});

module.exports = router;