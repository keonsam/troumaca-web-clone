let uuidv5 = require('uuid/v5');
let Datastore = require('nedb');
let Rx = require("rxjs");
let path = require('path');
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");

let theAssetDb = path.resolve(__dirname, '..','..',) + '/nedb/assets.db';

let hostname = 'troumaca.com';

let db = {};
db.assets = new Datastore(theAssetDb);
db.assets.loadDatabase(function (err) { console.log(err); });

let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();

let defaultPageSize = 10;

module.exports =  function DatabaseAssetRepository() {

  this.saveAsset = function (asset) {
    asset.assetId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.assets.insert(asset, function (err, doc) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(asset);
        }
        observer.complete();
      });
    });
  };

  this.getAssets = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.assets.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
};

this.getAssetCount = function () {
  return Rx.Observable.create(function (observer) {
    db.assets.count({}, function (err, count) {
      if (!err) {
        observer.next(count);
      } else {
        observer.error(err);
      }
      observer.complete();
    });
  });
};

this.getAssetById = function (assetId) {
  return Rx.Observable.create(function (observer) {
    let query = {};
    query["assetId"] = assetId;
    db.assets.findOne(query, function (err, doc) {
      if (!err) {
        observer.next(doc);
      } else {
        observer.error(err);
      }
      observer.complete();
    });
  });
};

this.updateAsset = function (assetId, asset) {
  return Rx.Observable.create(function (observer) {
    let query = {};
    query["assetId"] = assetId;
    db.assets.update(query, asset, {}, function (err, numReplaced) {
      if (!err) {
        observer.next(numReplaced);
      } else {
        observer.error(err);
      }
      observer.complete();
    })
  });
};

this.deleteAsset = function (assetId) {
  return Rx.Observable.create(function (observer) {
    let query = {};
    query["assetId"] = assetId;
    db.assets.remove(query, {}, function (err, numRemoved) {
      if (!err) {
        observer.next(numRemoved);
      } else {
        observer.error(err);
      }
      observer.complete();
    })
  });
};
}
