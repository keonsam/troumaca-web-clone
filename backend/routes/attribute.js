let express = require('express');
let router = express.Router();

var dataTypes = {"dataTypes":[{
  "dataTypeId": "123",
  "name": "test1"
}, {
  "dataTypeId": "1234",
  "name": "test2"
}]};

router.get("/", function(req, res, ndex) {
  res.send(JSON.stringify(dataTypes));
})

module.exports = router;
