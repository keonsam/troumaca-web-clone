let express = require('express');
let router = express.Router();

var assetTypes = {"assetTypes":[{
  "assetTypeId": "a14a01cc-eee4-45f9-9db5-cfbaaf49c0b1",
  "name": "Car",
  "description": "Car",
  "assetTypeKindId": "fee8d105-938d-43d9-baa7-e5d9438c8468",
  "modelNumber": "",
  "materialCode": "",
  "unitOfMeasure": "",
  "assetTypeClass": {
  }
}, {
  "assetTypeId":"2b97e660-5c3c-4186-82a5-f8ec444251ac",
  "name": "Pencil",
  "description": "Pencil",
  "assetTypeKindId": "773464bd-d088-4dd2-b990-51ed64060f7e",
  "modelNumber": "",
  "materialCode": "",
  "unitOfMeasure": "",
  "assetTypeClass": {
  }
}]};

router.get('/', function(req, res, next) {
  // assetTypes.assetTypes.filter(t => {
  //   t.name.search()
  // });
  res.send(JSON.stringify(assetTypes));
});

module.exports = router;