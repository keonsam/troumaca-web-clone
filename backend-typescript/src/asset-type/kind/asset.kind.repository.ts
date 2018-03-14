import Rx from 'rxjs';
import {generateUUID} from '../uuid.generator';
import {calcSkip} from '../db.util';
import {assets} from '../db';
import {AssetTypeRepository} from "./asset.type.repository";
import {Asset} from "./asset";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {AssetType} from "../../../src/assets/asset.type";

let defaultPageSize = 10;

export class AssetTypeDbRepository implements AssetTypeRepository {

  saveAsset(asset:Asset) {
    asset.assetId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<Asset>) {
      assets.insert(asset, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(asset);
        }
        observer.complete();
      });
    });
  }

  getAssets(pageNumber:number, pageSize:number, order:string) {
    return Rx.Observable.create(function (observer:Observer<Asset[]>) {
      let skip = calcSkip(pageNumber, pageSize, defaultPageSize);
      assets.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssetTypes(searchStr:string, pageSize:number):Observable<AssetType> {
    searchStr = new RegExp(searchStr);
    return Rx.Observable.create(function (observer:Observer<AssetType>) {
      assetTypes.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
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
      assetKinds.find({}, function (err, doc) {
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
      sites.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
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
      unitOfMeasures.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
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
      persons.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
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
      assets.count({}, function (err, count) {
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
      assets.findOne(query, function (err, doc) {
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
      assets.update(query, asset, {}, function (err, numReplaced) {
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
      assets.remove(query, {}, function (err, numRemoved) {
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
