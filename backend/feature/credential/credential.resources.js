let express = require('express');
let router = express.Router();
let credentialOrchestrator = require('./credential.orchestrator');

router.post("/validate-username", function (req, res, next) {
  let usernameObj = req.body;
  credentialOrchestrator
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
  credentialOrchestrator
  .isValidEditUsername(partyId,usernameObj)
  .subscribe(next => {
    res.send(next.valid);
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/validate-current-password", function (req, res, next) {
  let passwordObj = req.body;
  credentialOrchestrator
  .isValidCurrentPassword(passwordObj)
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
  credentialOrchestrator
  .isValidPassword(passwordObj)
  .subscribe(next => {
    res.send(next.valid);
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/authenticate", function (req, res, next) {
  let credential = req.body;
  credentialOrchestrator
  .authenticate(credential)
  .subscribe(session => {
    res.setHeader('Content-Type', 'application/json');
    if (session.sessionId) {
      // { path: '/', httpOnly: true, secure: false, maxAge: null }
      res.cookie("sessionId", session.sessionId, { path: '/', maxAge: 20*60*1000, httpOnly: true });
    }
    res.send(session);
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/authenticate-sms-code/:phoneUUID", function (req, res, next) {
  let phoneUUID = req.params.phoneUUID;
  let smsCode = req.body.smsCode;
  credentialOrchestrator
  .authenticateSMSCode(phoneUUID,smsCode)
  .subscribe(next => {
    res.send(next);
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/authenticate-email-code/:emailUUID", function (req, res, next) {
  let emailUUID = req.params.emailUUID;
  let emailCode = req.body.emailCode;
  credentialOrchestrator
  .authenticateEmailCode(emailUUID,emailCode)
  .subscribe(next => {
    res.send(next);
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.post("/", function (req, res, next) {
  let credential = req.body;
  credentialOrchestrator
  .addCredential(credential)
  .subscribe(credential => {
    res.setHeader('Content-Type', 'application/json');
    res.send(credential);
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.get("/generate-email-uuid/:credentialId", function (req, res, next) {
  let credentialId = req.params.credentialId;
  credentialOrchestrator
  .generateEmailUUID(credentialId)
  .subscribe(emailUUID => {
    res.send(JSON.stringify(emailUUID));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.get("/generate-phone-uuid/:credentialId", function (req, res, next) {
  let credentialId = req.params.credentialId;
  credentialOrchestrator
  .generatePhoneUUID(credentialId)
  .subscribe(phoneUUID => {
    res.send(JSON.stringify(phoneUUID));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.get("/send-phone-code/:phoneUUID", function (req, res, next) {
  let phoneUUID = req.params.phoneUUID;
  credentialOrchestrator
  .sendPhoneCode(phoneUUID)
  .subscribe(numReplaced => {
    res.send(JSON.stringify(numReplaced));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.get("/new-phone-uuid/:phoneNumber", function (req, res, next) {
  let phoneNumber = req.params.phoneNumber;

  credentialOrchestrator
  .validateConfirmedUsername(phoneNumber)
  .subscribe(doc => {
    if(doc) {
      res.send(false);
    }else {
      credentialOrchestrator
      .newPhoneUUID(phoneNumber)
      .subscribe(phoneUUID => {
        console.log(phoneUUID);
        res.send(JSON.stringify(phoneUUID));
      }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
      });
    }
  });
});

router.get("/send-email-code/:emailUUID", function (req, res, next) {
  let emailUUID = req.params.emailUUID;
  credentialOrchestrator
  .sendEmailCode(emailUUID)
  .subscribe(numReplaced => {
    res.send(JSON.stringify(numReplaced));
  }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
});

router.get("/new-email-uuid/:emailAddress", function (req, res, next) {
  let emailAddress = req.params.emailAddress;

  credentialOrchestrator
  .validateConfirmedUsername(emailAddress)
  .subscribe(doc => {
    if(doc) {
      res.send(false);
    }else {
      credentialOrchestrator
      .newEmailUUID(emailAddress)
      .subscribe(emailUUID => {
        res.send(JSON.stringify(emailUUID));
      }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
      });
    }
  });
});



module.exports = router;
