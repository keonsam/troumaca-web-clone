let express = require('express');
let router = express.Router();

var assetKinds = {"assetKinds":[{
  "assetKindId":"4cf11077-c5e3-41f3-b40b-6e89dce6e9c8",
  "name":"Discrete Item"
}, {
  "assetKindId":"65694257-0aa8-4fb6-abb7-e6c7b83cf4f2",
  "name":"Inventory"
}]};

router.get('/kinds', function(req, res, next) {
  res.send(JSON.stringify(assetKinds));
});

module.exports = router;