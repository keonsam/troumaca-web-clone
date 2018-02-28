let uuidv5 = require('uuid/v5');
let Datastore = require('nedb');
let Rx = require("rxjs");
let path = require('path');
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");
let db = require("../db.js");
let hostname = 'troumaca.com';

//let theAttributesDb = path.resolve(__dirname, '..','..',) + '/nedb/attributes.db';
//let theAssetTypeClassesDb = path.resolve(__dirname, '..','..',) + '/nedb/asset-type-classes.db';
//let theDataTypesDb =  path.resolve(__dirname, '..','..',) + '/nedb/data-types.db';

//let db = {};
//db.assetTypeClasses = new Datastore(theAssetTypeClassesDb);
//db.assetTypeClasses.loadDatabase(function (err) { console.log(err); });

//db.attributes = new Datastore(theAttributesDb);
//db.attributes.loadDatabase(function (err) { console.log(err); });

//db.dataTypes = new Datastore(theDataTypesDb);
//db.dataTypes.loadDatabase(function (err) { console.log(err); });

let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();

module.exports =  function DatabaseAssetRepository() {

  let defaultPageSize = 10;

  this.getDataTypes = function () {
    return Rx.Observable.create(function (observer) {
      db.dataTypes.find({}, function (err, docs) {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };
  this.getAssetTypeClasses = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.assetTypeClasses.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getAvailableAttributes = function (pageNumber, pageSize, order, assignedArray) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.attributes.find({ attributeId: { $nin: assignedArray }}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getAssignedAttributes = function (pageNumber, pageSize, order, assignedArray) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.attributes.find({ attributeId: { $in: assignedArray }}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getAssetTypeClassCount = function () {
    return Rx.Observable.create(function (observer) {
      db.assetTypeClasses.count({}, function (err, count) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getAvailableAttributeCount = function () {
    return Rx.Observable.create(function (observer) {
      db.attributes.count({}, function (err, count) {
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

  this.getAvailableAttribute = function(attributeId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["attributeId"] = attributeId;
      db.attributes.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.saveAssetTypeClass = function (assetTypeClass) {
    assetTypeClass.assetTypeClassId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.assetTypeClasses.insert(assetTypeClass, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.saveAvailableAttribute = function (availableAttribute) {
    availableAttribute.attributeId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.attributes.insert(availableAttribute, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.deleteAssetTypeClass= function(assetTypeClassId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["assetTypeClassId"] = assetTypeClassId;
      db.assetTypeClasses.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
 };

 this.deleteAvailableAttribute = function(attributeId) {
   return Rx.Observable.create(function (observer) {
     let query = {};
     query["attributeId"] = attributeId;
     db.attributes.remove(query, {}, function (err, numRemoved) {
       if (!err) {
         observer.next(numRemoved);
       } else {
         observer.error(err);
       }
       observer.complete();
     })
   });
};

 this.updateAssetTypeClass = function(assetTypeClassId, assetTypeClass) {
   return Rx.Observable.create(function (observer) {
     let query = {};
     query["assetTypeClassId"] = assetTypeClassId;
     db.assetTypeClasses.update(query, assetTypeClass, {}, function (err, numReplaced) {
       if (!err) {
         observer.next(numReplaced);
       } else {
         observer.error(err);
       }
       observer.complete();
     })
   });
 };

 this.updateAvailableAttribute = function(attributeId, attribute) {
   return Rx.Observable.create(function (observer) {
     let query = {};
     query["attributeId"] = attributeId;
     db.attributes.update(query, attribute, {}, function (err, numReplaced) {
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
