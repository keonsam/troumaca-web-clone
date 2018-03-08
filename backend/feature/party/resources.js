let express = require('express');
let router = express.Router();
let partyOrchestrator = require('./orchestrator');

let orchestrator = new partyOrchestrator();

router.get("/persons", function (req, res, next) {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
  .getPersons(number, size, field, direction)
  .subscribe(persons => {
    res.send(JSON.stringify(persons));
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

router.get("/users-photos/:partyId", function (req, res, next) {

  let partyId = req.params.partyId;

  orchestrator
  .getUserPhoto(partyId)
  .subscribe(imageStr => {
    res.send(JSON.stringify(imageStr));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.get("/company-photos/:partyId", function (req, res, next) {

  let partyId = req.params.partyId;

  orchestrator
  .getCompanyPhoto(partyId)
  .subscribe(imageStr => {
    res.send(JSON.stringify(imageStr));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.get("/persons/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;

  orchestrator
  .getPerson(partyId)
  .subscribe(person => {
    let body = JSON.stringify(person);
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

router.post("/persons", function(req, res, next) {
  let person = req.body;
  orchestrator
  .addPerson(person)
  .subscribe(person => {
    res.send(JSON.stringify(person));
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
  .subscribe(person => {
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

router.post("/create-accounts", function (req, res, next) {
  let account = req.body;
  let cookie = req.cookies["sessionId"];
  console.log(cookie);
  let sessionId = "e6890c3f-c729-40fc-8153-32bc85e46db2";
  orchestrator
  .createAccount(account, sessionId)
  .subscribe(account => {
    console.log(account);
    res.send(JSON.stringify(account));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/account-photos/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  let imageStr = req.body.croppedImage;
  orchestrator
    .addAccountPhoto(partyId, imageStr)
    .subscribe(doc => {
      res.send(JSON.stringify(doc));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

router.delete("/persons/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;

  orchestrator
    .deletePerson(partyId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    })
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

router.put("/persons/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  let person = req.body;
  orchestrator
    .updatePerson(partyId, person)
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

router.put("/users-photos/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  let imageStr = req.body.croppedImage;
  orchestrator
    .updateOrAddUserPhoto(partyId, imageStr)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
});

router.put("/company-photos/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  let imageStr = req.body.croppedImage;
  orchestrator
    .updateOrAddCompanyPhoto(partyId, imageStr)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
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
