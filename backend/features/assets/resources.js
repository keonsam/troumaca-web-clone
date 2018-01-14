let express = require('express');
let router = express.Router();
let AssetOrchestrator = require('./asset.orchestrator');

let assetOrch = new AssetOrchestrator();

router.get("/", function(req, res, next) {
  assetOrch
    .saveAsset("")
    .subscribe(asset => {
      res.send(JSON.stringify(asset));
    });
});


module.exports = router;