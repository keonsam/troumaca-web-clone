"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __importDefault(require("rxjs"));
const uuid_generator_1 = require("../../uuid.generator");
const db_util_1 = require("../../db.util");
const db_1 = require("../../db");
const repository_kind_1 = require("../../repository.kind");
let defaultPageSize = 10;
/**
 * Database Repository
 */
class AssetDBRepository {
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
            let query = {
                "assetId": assetId
            };
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
            let query = {
                "assetId": assetId
            };
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
            let query = {
                "assetId": assetId
            };
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
/**
 * Rest Repository
 */
class AssetRestRepository {
    deleteAsset(assetId) {
        return undefined;
    }
    getAssetById(assetId) {
        return undefined;
    }
    getAssetCount() {
        return undefined;
    }
    getAssets(pageNumber, pageSize, order) {
        return undefined;
    }
    saveAsset(asset) {
        return undefined;
    }
    updateAsset(assetId, asset) {
        return undefined;
    }
}
function createAssetRepository(kind) {
    switch (kind) {
        case repository_kind_1.RepositoryKind.Nedb:
            return new AssetDBRepository();
        case repository_kind_1.RepositoryKind.Rest:
            return new AssetRestRepository();
        default:
            return new AssetDBRepository();
    }
}
exports.createAssetRepository = createAssetRepository;
//# sourceMappingURL=asset.repository.factory.js.map