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
    })
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
    })

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
    })

});

router.post("/users-photos/:partyId", function (req, res, next) {
  let partyId = req.params.partyId;
  let imageStr = req.body.string;
  orchestrator
    .updateOrAddUserPhoto(partyId, imageStr)
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
