let express = require('express');
let router = express.Router();

var siteTypes = {siteTypes:[{
  siteTypeId: "2a65b653-0ab9-49d5-a8b5-363c5756f4d5",
  name: "Phone",
  description:""
}, {
  siteTypeId: "2a65b653-0ab9-49d5-a8b5-363c5756f4d5",
  name: "Email",
  description:""
}]};

router.get('/', function(req, res, next) {
  res.send(JSON.stringify(siteTypes));
});

module.exports = router;