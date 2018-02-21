let uuidv5 = require('uuid/v5');
let Datastore = require('nedb');
let Rx = require("rxjs");
let path = require('path');
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");
let db = require("../db.js");
let hostname = 'troumaca.com';


let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();

module.exports =  function DatabaseAssetTypesRepository() {

  let defaultPageSize = 10;

  this.getAssetTypes = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.assetTypes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getAssignedAttributes = function (assetTypeClassId) {
    return Rx.Observable.create(function (observer) {
      db.assetTypeClasses.findOne({assetTypeClassId}, function (err, doc) {
        if (!err) {
          let assignedAttributes = [];
          doc.assignedAttributes.forEach(value => assignedAttributes.push(value.attributeId));
          observer.next(assignedAttributes);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getAttributes = function (assignedArray) {
    return Rx.Observable.create(function (observer) {
      db.attributes.find({attributeId: {$in: assignedArray}}, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getAssetTypeClassId = function (searchStr, pageSize) {
    searchStr = new RegExp(searchStr);
    return Rx.Observable.create(function (observer) {
      db.assetTypeClasses.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getValues = function (assetTypeId) {
    return Rx.Observable.create(function (observer) {
      db.values.find({assetTypeId}, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getAssetTypeCount = function () {
    return Rx.Observable.create(function (observer) {
      db.assetTypes.count({}, function (err, count) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getAssetTypeClass = function(assetTypeClassId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["assetTypeClassId"] = assetTypeClassId;
      db.assetTypeClasses.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getAssetType = function(assetTypeId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["assetTypeId"] = assetTypeId;
      db.assetTypes.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.saveAssetType = function (assetType) {
    assetType.assetTypeId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.assetTypes.insert(assetType, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.saveValue = function (value) {
    value.valueId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.values.insert(value, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.deleteAssetType= function(assetTypeId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["assetTypeId"] = assetTypeId;
      db.assetTypes.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
 };

 this.deleteValue = function(valueId) {
   return Rx.Observable.create(function (observer) {
     let query = {};
     query["valueId"] = valueId;
     db.values.remove(query, {}, function (err, numRemoved) {
       if (!err) {
         observer.next(numRemoved);
       } else {
         observer.error(err);
       }
       observer.complete();
     })
   });
};

this.deleteValues = function(assetTypeId) {
  return Rx.Observable.create(function (observer) {
    let query = {};
    query["assetTypeId"] = assetTypeId;
    db.values.remove(query, {multi: true }, function (err, numRemoved) {
      if (!err) {
        observer.next(numRemoved);
      } else {
        observer.error(err);
      }
      observer.complete();
    })
  });
};

 this.updateAssetType = function(assetTypeId, assetType) {
   return Rx.Observable.create(function (observer) {
     let query = {};
     query["assetTypeId"] = assetTypeId;
     db.assetTypes.update(query, assetType, {}, function (err, numReplaced) {
       if (!err) {
         observer.next(numReplaced);
       } else {
         observer.error(err);
       }
       observer.complete();
     })
   });
 };

 this.updateValue = function(valueId, value) {
   return Rx.Observable.create(function (observer) {
     let query = {};
     query["valueId"] = valueId;
     db.values.update(query, value, {}, function (err, numReplaced) {
       if (!err) {
         observer.next(numReplaced);
       } else {
         observer.error(err);
       }
       observer.complete();
     })
   });
 };

};
