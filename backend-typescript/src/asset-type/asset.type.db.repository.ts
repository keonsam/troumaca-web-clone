import Rx from 'rxjs';
import {generateUUID} from '../uuid.generator';
import {calcSkip} from '../db.util';
import db from '../db.js';
import {AssetTypeRepository} from "./asset.type.repository";

let defaultPageSize = 10;

export class AssetTypeDbRepository implements AssetTypeRepository {

  saveAsset(asset) {
    asset.assetId = generateUUID();
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
  }

  getAssets(pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = calcSkip(pageNumber, pageSize, defaultPageSize);
      db.assets.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssetTypes(searchStr, pageSize) {
    searchStr = new RegExp(searchStr);
    return Rx.Observable.create(function (observer) {
      db.assetTypes.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssetKinds() {
    return Rx.Observable.create(function (observer) {
      db.assetKinds.find({}, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getUnionOfPhysicalSites(searchStr, pageSize) {
    searchStr = new RegExp(searchStr);
    return Rx.Observable.create(function (observer) {
      db.sites.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getUnitOfMeasures(searchStr, pageSize) {
    searchStr = new RegExp(searchStr);
    return Rx.Observable.create(function (observer) {
      db.unitOfMeasures.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  //Todo: This does not belong here.
  getPersons(searchStr, pageSize) {
    searchStr = new RegExp(searchStr);
    return Rx.Observable.create(function (observer) {
      db.persons.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getAssetCount() {
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

  getAssetById(assetId) {
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

  updateAsset(assetId, asset) {
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

  deleteAsset(assetId) {
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
