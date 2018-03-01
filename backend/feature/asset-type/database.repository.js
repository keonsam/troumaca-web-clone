let Datastore = require('nedb');
let Rx = require("rxjs");
let path = require('path');
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");

let hostname = 'troumaca.com';

let theAssetTypesDb = path.resolve(__dirname, '..','..',) + '/nedb/asset-types.db';

let db = {};
db.assetTypes = new Datastore(theAssetTypesDb);
db.assetTypes.loadDatabase(function (err) { console.log(err); });

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

};
