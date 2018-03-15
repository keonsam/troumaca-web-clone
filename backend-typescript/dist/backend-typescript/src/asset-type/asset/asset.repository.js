"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __importDefault(require("rxjs"));
const uuid_generator_1 = require("../uuid.generator");
const db_util_1 = require("../db.util");
const db_1 = require("../db");
let defaultPageSize = 10;
class AssetTypeDbRepository {
    saveAsset(asset) {
        asset.assetId = uuid_generator_1.generateUUID();
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.assets.insert(asset, function (err, doc) {
                if (err) {
                    observer.error(err);
                }
                else {
                    observer.next(asset);
                }
                observer.complete();
            });
        });
    }
    getAssets(pageNumber, pageSize, order) {
        return rxjs_1.default.Observable.create(function (observer) {
            let skip = db_util_1.calcSkip(pageNumber, pageSize, defaultPageSize);
            db_1.assets.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
                if (!err) {
                    observer.next(doc);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    getAssetTypes(searchStr, pageSize) {
        searchStr = new RegExp(searchStr);
        return rxjs_1.default.Observable.create(function (observer) {
            assetTypes.find({ name: { $regex: searchStr } }).limit(pageSize).exec(function (err, doc) {
                if (!err) {
                    observer.next(doc);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    getAssetKinds() {
        return rxjs_1.default.Observable.create(function (observer) {
            assetKinds.find({}, function (err, doc) {
                if (!err) {
                    observer.next(doc);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    getUnionOfPhysicalSites(searchStr, pageSize) {
        searchStr = new RegExp(searchStr);
        return rxjs_1.default.Observable.create(function (observer) {
            sites.find({ name: { $regex: searchStr } }).limit(pageSize).exec(function (err, doc) {
                if (!err) {
                    observer.next(doc);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    getUnitOfMeasures(searchStr, pageSize) {
        searchStr = new RegExp(searchStr);
        return rxjs_1.default.Observable.create(function (observer) {
            unitOfMeasures.find({ name: { $regex: searchStr } }).limit(pageSize).exec(function (err, doc) {
                if (!err) {
                    observer.next(doc);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    //Todo: This does not belong here.
    getPersons(searchStr, pageSize) {
        searchStr = new RegExp(searchStr);
        return rxjs_1.default.Observable.create(function (observer) {
            persons.find({ name: { $regex: searchStr } }).limit(pageSize).exec(function (err, doc) {
                if (!err) {
                    observer.next(doc);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    getAssetCount() {
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.assets.count({}, function (err, count) {
                if (!err) {
                    observer.next(count);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    getAssetById(assetId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {};
            query["assetId"] = assetId;
            db_1.assets.findOne(query, function (err, doc) {
                if (!err) {
                    observer.next(doc);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    updateAsset(assetId, asset) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {};
            query["assetId"] = assetId;
            db_1.assets.update(query, asset, {}, function (err, numReplaced) {
                if (!err) {
                    observer.next(numReplaced);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    deleteAsset(assetId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {};
            query["assetId"] = assetId;
            db_1.assets.remove(query, {}, function (err, numRemoved) {
                if (!err) {
                    observer.next(numRemoved);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
}
exports.AssetTypeDbRepository = AssetTypeDbRepository;
//# sourceMappingURL=asset.repository.js.map