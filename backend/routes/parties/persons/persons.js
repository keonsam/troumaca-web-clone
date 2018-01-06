let express = require('express');
let router = express.Router();

let persons = { "persons": [{
  partyId: "c27f82c3-d441-46fe-900b-671716cdbc97",
  firstName: "Michael",
  middleName: "Frederick",
  lastName: "Williams",
  dateOfBirth: ""
}, {
  partyId: "093fbe85-fcbe-46a4-bed1-bc938f6ed96b",
  firstName: "Margurite",
  middleName: "Roberta",
  lastName: "Williams",
  dateOfBirth: ""
}, {
  partyId: "093fbe85-fcbe-46a4-bed1-bc938f6ed96b",
  firstName: "Kessel",
  middleName: "Marnell",
  lastName: "Abraham",
  dateOfBirth: ""
}]
};

router.get('/', function(req, res, next) {
  res.send(JSON.stringify(persons));
});

module.exports = router;