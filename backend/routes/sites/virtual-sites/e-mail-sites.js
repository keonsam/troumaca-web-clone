let express = require('express');
let router = express.Router();

router.get('/email-sites', function(req, res, next) {
  res.send(JSON.stringify(undefined));
});

module.exports = router;
