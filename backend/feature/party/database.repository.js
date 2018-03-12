let Rx = require("rxjs");
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");
let db = require("../db.js");
var generatePassword = require('password-generator');

let validator = require('validator');
let libphonenumberjs = require('libphonenumber-js');
var passwordValidator = require('password-validator');

let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();

module.exports =  function DatabasePartyRepository() {

  let defaultPageSize = 10;

  this.getUsers = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.users.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getOrganizations = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.organizations.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getUserCount = function () {
    return Rx.Observable.create(function (observer) {
      db.users.count({}, function (err, count) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getOrganizationCount = function () {
    return Rx.Observable.create(function (observer) {
      db.organizations.count({}, function (err, count) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getUser = function(partyId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.users.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getOrganization = function(partyId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.organizations.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getPhoto = function (partyId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.photos.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc ? doc.imageStr: "");
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addUser = function (user) {
    user.partyId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.users.insert(user, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addOrganization = function (organization) {
    organization.partyId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.organizations.insert(organization, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addCredential = function (credential) {
    credential.credentialId = newUuidGenerator.generateUUID();
    credential.password = generatePassword();
    return Rx.Observable.create(function (observer) {
      db.credentials.insert(credential, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addPersonalAccount = function (account) {
    // partyId done in the orchestrator
    return Rx.Observable.create(function (observer) {
      db.personalsInformation.insert(account, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addOrganizationAccount = function (account) {
    // partyId done in the orchestrator
    return Rx.Observable.create(function (observer) {
      db.organizationsInformation.insert(account, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addPhoto = function (partyId, imageStr) {
    let photo = {
      partyId,
      imageStr
    }
    return Rx.Observable.create(function (observer) {
      db.photos.insert(photo, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };



  this.deleteUser = function(partyId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.users.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
 };

 this.deleteOrganization = function(partyId) {
   return Rx.Observable.create(function (observer) {
     let query = {};
     query["partyId"] = partyId;
     db.organizations.remove(query, {}, function (err, numRemoved) {
       if (!err) {
         observer.next(numRemoved);
       } else {
         observer.error(err);
       }
       observer.complete();
     })
   });
};

 this.deleteCredential = function(partyId) {
   return Rx.Observable.create(function (observer) {
     let query = {};
     query["partyId"] = partyId;
     db.credentials.remove(query, {}, function (err, numRemoved) {
       if (!err) {
         observer.next(numRemoved);
       } else {
         observer.error(err);
       }
       observer.complete();
     })
   });
};

  this.updateUser = function(partyId, user) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.users.update(query, user, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.updateOrganization = function(partyId, organization) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.organizations.update(query, organization, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.updateCredential = function(partyId, credential) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.credentials.update(query, {$set : credential}, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.updatePhoto = function(partyId, imageStr) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      let photo = {};
      query["partyId"] = partyId;
      photo["imageStr"] = imageStr;
      db.photos.update(query, {$set : photo}, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.updateCredentialPartyId = function(partyId,credentialId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["credentialId"] = credentialId;
      db.credentials.update(query, {$set : {partyId}}, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        }else{
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

 // authentication part
 this.isValidUsername = function (usernameObj) {
   let username = usernameObj.username;
   if (!username) {
     return Rx.Observable.of(false);
   }


   // the user name is valid if:
   let validUsername = false;
   // 1. is username and email
   let validEmail = validator.isEmail(username);

   if (validEmail) {
     validUsername = true;
   } else {
     let parsedObj = libphonenumberjs.parse(username, 'US');
     if (parsedObj && parsedObj.phone) {
       // 2. or username is a phone number
       validUsername = libphonenumberjs.isValidNumber(parsedObj);
     }
   }

   if (!validUsername) {
     // 3. and is not taken
     return Rx.Observable.of(false);
   } else {
     return this.getCredentialByUsername(username)
       .map(credential => {
         if (!credential) {
           return true;
         } else if (!credential.username) {
           return true;
         } else {
           return false;
         }
       });
   }
 };

 this.isValidEditUsername = function (partyId, usernameObj) {

   let username = usernameObj.username;
   if (!username) {
     return Rx.Observable.of(false);
   }


   // the user name is valid if:
   let validUsername = false;
   // 1. is username and email
   let validEmail = validator.isEmail(username);

   if (validEmail) {
     validUsername = true;
   } else {
     let parsedObj = libphonenumberjs.parse(username, 'US');
     if (parsedObj && parsedObj.phone) {
       // 2. or username is a phone number
       validUsername = libphonenumberjs.isValidNumber(parsedObj);
     }
   }

   if (!validUsername) {
     // 3. and is not taken
     return Rx.Observable.of(false);
   }

   return this.checkUsernameValid(partyId,username)
   .switchMap(value => {
     if(value) {
       return Rx.Observable.of(true);
     }else {
       return this.getCredentialByUsername(username)
         .map(credential => {
           if (!credential) {
             return true;
           } else if (!credential.username) {
             return true;
           } else {
             return false;
           }
         });
     }
   });
 };

 this.getCredentialByUsername = function (username) {
   return Rx.Observable.create(function (observer) {
     let query = {};
     query["username"] = username;
     db.credentials.findOne(query, function (err, doc) {
       if (!err) {
         observer.next(doc);
       } else {
         observer.error(err);
       }
       observer.complete();
     });
   });
 };

 this.checkUsernameValid = function (partyId, username) {
   return Rx.Observable.create(function (observer) {
     let query1 = {};
     let query2 = {};
     query1["partyId"] = partyId;
     query2["username"] = username;
     db.credentials.findOne({$and : [query1,query2]}, function (err, doc) {
       if (!err) {
         observer.next(doc);
       } else {
         observer.error(err);
       }
       observer.complete();
     });
   });
 };

}
