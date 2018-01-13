let express = require('express');
let router = express.Router();

router.post('/', (req, res, next) => {
  console.log(req.body.data);
  res.send(true);
});

module.exports = router;
