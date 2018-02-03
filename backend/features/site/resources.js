let express = require('express');
let router = express.Router();
let siteOrchestrator = require('./orchestrator');
let Pagination = require("../pagination");

let orchestrator = new siteOrchestrator();

router.post("/physical-sites/street-addresses", function (req, res, next) {
  let streetAddress = req.body;
  orchestrator
  .saveStreetAddress(streetAddress)
  .subscribe(streetAddress => {
    res.send(JSON.stringify(streetAddress));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  })
});

router.post("/physical-sites/post-office-boxes", function (req, res, next) {
  let postOfficeBox = req.body;
  orchestrator
  .savePostOfficeBox(postOfficeBox)
  .subscribe(postOfficeBox => {
    res.send(JSON.stringify(postOfficeBox));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  })
});

router.post("/virtual-sites/phones/", function (req, res, next) {

  let phone = req.body;
  orchestrator
  .saveTelephone(phone)
  .subscribe(phone => {
    res.send(JSON.stringify(phone));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  })

});


router.get("/physical-sites/street-addresses", function (req, res, next) {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
  .getStreetAddresses(number, size, field, direction)
  .subscribe(streetAddresses => {
    console.log(streetAddresses);
    res.send(JSON.stringify(streetAddresses));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });

});

router.get("/physical-sites/post-office-boxes", function (req, res, next) {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
  .getPostOfficeBoxes(number, size, field, direction)
  .subscribe(PostOfficeBoxes => {
    console.log(PostOfficeBoxes);
    res.send(JSON.stringify(PostOfficeBoxes));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });

});

router.get("/virtual-sites/phones/", function(req, res, next) {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
  .getTelephones(number, size, field, direction)
  .subscribe(telephones => {
    res.send(JSON.stringify(telephones));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });

});

router.get("/physical-sites/street-addresses/:siteId", function (req, res, next) {
  let siteId = req.params.siteId;

  orchestrator
  .getStreetAddress(siteId)
  .subscribe(streetAddress => {
    let body = JSON.stringify(streetAddress);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });
});

router.get("/physical-sites/post-office-boxes/:siteId", function (req, res, next) {
  let siteId = req.params.siteId;

  orchestrator
  .getPostOfficeBox(siteId)
  .subscribe(postOfficeBox => {
    let body = JSON.stringify(postOfficeBox);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });
});

router.get("/virtual-sites/phones/:siteId/", function (req, res, next) {

  let siteId = req.params.siteId;

  orchestrator
  .getTelephoneBySiteId(siteId)
  .subscribe(phone => {
    let body = JSON.stringify(phone);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

});

router.put("/physical-sites/street-addresses/:siteId", function (req, res, next) {
  let siteId = req.params.siteId;
  let streetAddress = req.body;
  orchestrator
    .updateStreetAddress(siteId, streetAddress)
    .subscribe(streetAddress => {
      res.send(JSON.stringify(streetAddress));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })

});

router.put("/physical-sites/post-office-boxes/:siteId", function (req, res, next) {
  let siteId = req.params.siteId;
  let postOfficeBox = req.body;
  orchestrator
    .updatePostOfficeBox(siteId, postOfficeBox)
    .subscribe(postOfficeBox => {
      res.send(JSON.stringify(postOfficeBox));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })

});

router.put("/virtual-sites/phones/:siteId/", function (req, res, next) {

  let siteId = req.params.siteId;
  let phone = req.body;
  orchestrator
    .updateTelephone(siteId, phone)
    .subscribe(phone => {
      res.send(JSON.stringify(phone));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })

});

router.delete("/physical-sites/street-addresses/:siteId", function (req, res, next) {
  let siteId = req.params.siteId;
  orchestrator
    .deleteStreetAddress(siteId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })
});

router.delete("/physical-sites/post-office-boxes/:siteId", function (req, res, next) {
  let siteId = req.params.siteId;
  orchestrator
    .deletePostOfficeBox(siteId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })
});

router.delete("/virtual-sites/phones/:siteId/", function (req, res, next) {

  let siteId = req.params.siteId;
  orchestrator
    .deleteTelephone(siteId)
    .subscribe(phone => {
      res.send(JSON.stringify(phone));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })
});

function getNumericValueOrDefault(value, defaultValue) {
  if (!value) {
    return defaultValue;
  }

  if (isNaN(parseFloat(value))) {
    return defaultValue;
  }

  if (!isFinite(value)) {
    return defaultValue;
  }

  return value
}

function getStringValueOrDefault(strValue, defaultValue) {
  if (!strValue && !defaultValue) {
    return "";
  }

  if (!strValue && defaultValue) {
    return defaultValue;
  }

  return strValue;
}

module.exports = router;
