let uuidv5 = require('uuid/v5');
let Datastore = require('nedb');
let Rx = require("rxjs");
let path = require('path');
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");
let db = require("../db.js")
let hostname = 'troumaca.com';
var generatePassword = require('password-generator');

let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();
let defaultPhoto = "http://i0.wp.com/www.xcelerationfit.com/wp-content/plugins/elementor/assets/images/placeholder.png?w=825";

module.exports =  function DatabasePartyRepository() {

  let defaultPageSize = 10;

  this.getPersons = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.persons.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
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

  this.getPersonCount = function () {
    return Rx.Observable.create(function (observer) {
      db.persons.count({}, function (err, count) {
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

  this.getPerson = function(partyId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.persons.findOne(query, function (err, doc) {
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

  this.getUserPhoto = function (partyId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.usersPhotos.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc ? doc.imageStr: defaultPhoto);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getCompanyPhoto = function (partyId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.companyPhotos.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc ? doc.imageStr: defaultPhoto);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addPerson = function (person) {
    person.partyId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.persons.insert(person, function (err, doc) {
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

  this.addUserPhoto = function (partyId, imageStr) {
    let photo = {
      partyId,
      imageStr
    }
    return Rx.Observable.create(function (observer) {
      db.usersPhotos.insert(photo, function (err, doc) {
        if (!err) {
          observer.next(1);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addCompanyPhoto = function (partyId, imageStr) {
    let photo = {
      partyId,
      imageStr
    }
    return Rx.Observable.create(function (observer) {
      db.companyPhotos.insert(photo, function (err, doc) {
        if (!err) {
          observer.next(1);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addAccountPhoto = function (partyId, imageStr) {
    let photo = {
      partyId,
      imageStr
    }
    return Rx.Observable.create(function (observer) {
      db.accountsPhotos.insert(photo, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.createAccount = function (account) {
    return Rx.Observable.create(function (observer) {
      db.accountsInformation.insert(account, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.deletePerson = function(partyId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.persons.remove(query, {}, function (err, numRemoved) {
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

  this.updatePerson = function(partyId, person) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.persons.update(query, person, {}, function (err, numReplaced) {
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

  this.updateUserPhoto = function(partyId, imageStr) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      let photo = {};
      query["partyId"] = partyId;
      photo["imageStr"] = imageStr;
      db.usersPhotos.update(query, {$set : photo}, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.updateCompanyPhoto = function(partyId, imageStr) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      let photo = {};
      query["partyId"] = partyId;
      photo["imageStr"] = imageStr;
      db.companyPhotos.update(query, {$set : photo}, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.addPartyIdConfirmedAccount = function(partyId,credentialId) {
    return Rx.Observable.create(function (observer) {
      let doc = {}
      doc["partyId"] = partyId;
      let query = {};
      query["credentialId"] = credentialId;
      db.confirmedCredentials.update(query, {$set : doc}, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        }else{
          observer.error(err);
        }
        observer.complete();
      });
    });
  };


}
