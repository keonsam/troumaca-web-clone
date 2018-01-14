// import * as Rx from "rxjs";

let Rx = require("rxjs");

let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  Rx.Observable.of('hello world')
    .subscribe(function(x) {
      console.log(x);
      res.send(x);
    });
});

module.exports = router;