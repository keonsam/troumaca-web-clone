let express = require('express');
let router = express.Router();
let partyOrchestrator = require('./orchestrator');

let orchestrator = new partyOrchestrator();

router.get("/users", function (req, res, next) {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
  .getUsers(number, size, field, direction)
  .subscribe(users => {
    res.send(JSON.stringify(users));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.get("/organizations", function (req, res, next) {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
  .getOrganizations(number, size, field, direction)
  .subscribe(organizations => {
    res.send(JSON.stringify(organizations));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.get("/photos/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  orchestrator
  .getPhoto(partyId)
  .subscribe(imageStr => {
    res.send(JSON.stringify(imageStr));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.get("/users/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  orchestrator
  .getUser(partyId)
  .subscribe(user => {
    let body = JSON.stringify(user);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });
});

router.get("/organizations/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;

  orchestrator
  .getOrganization(partyId)
  .subscribe(organization => {
    let body = JSON.stringify(organization);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });
});

router.post("/users", function(req, res, next) {
  let user = req.body;
  orchestrator
  .addUser(user)
  .subscribe(user => {
    res.send(JSON.stringify(user));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/organizations", function(req, res, next) {
  let organization = req.body;
  orchestrator
  .addOrganization(organization)
  .subscribe(user => {
    res.send(JSON.stringify(organization));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/credentials", function (req, res, next) {
  let credential = req.body;
  orchestrator
  .addCredential(credential)
  .subscribe(credential => {
    res.send(JSON.stringify(credential));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/add-accounts", function (req, res, next) {
  // TODO: // fix the cookie no entry
  let account = req.body;
  console.log(req.cookies);
  let cookie = req.cookies["sessionId"];
  console.log(cookie);
  let sessionId = "d845ced1-9990-4692-b2fe-6b62999a669f";
  orchestrator
  .addAccount(account, sessionId)
  .subscribe(account => {
    res.send(JSON.stringify(account));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/photos/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  let imageStr = req.body.croppedImage;
  orchestrator
    .addPhoto(partyId, imageStr)
    .subscribe(doc => {
      res.send(JSON.stringify(doc));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

router.delete("/users/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;

  orchestrator
    .deleteUser(partyId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

router.delete("/organizations/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;

  orchestrator
    .deleteOrganization(partyId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })
});

router.delete("/credentials/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;

  orchestrator
    .deleteCredentials(partyId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

router.put("/users/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  let user = req.body;
  orchestrator
    .updateUser(partyId, user)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

router.put("/organizations/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  let organization = req.body;
  orchestrator
    .updateOrganization(partyId, organization)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

router.put("/credentials/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  let credential = req.body;
  orchestrator
    .updateCredential(partyId, credential)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

router.put("/photos/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  let imageStr = req.body.croppedImage;
  orchestrator
    .updatePhoto(partyId, imageStr)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});
// authentication part

router.post("/validate-username", function (req, res, next) {
  let usernameObj = req.body;
  orchestrator
  .isValidUsername(usernameObj)
  .subscribe(next => {
    res.send(next.valid);
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/validate-edit-username/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  let usernameObj = req.body;
  orchestrator
  .isValidEditUsername(partyId,usernameObj)
  .subscribe(next => {
    res.send(next.valid);
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/validate-password", function (req, res, next) {
  let passwordObj = req.body;
  orchestrator
  .isValidPassword(passwordObj)
  .subscribe(next => {
    res.send(next.valid);
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
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
