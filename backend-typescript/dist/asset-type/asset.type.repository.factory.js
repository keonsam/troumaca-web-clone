"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const Rx = __importStar(require("rxjs"));
const repository_kind_1 = require("../repository.kind");
const db_1 = require("../db");
const db_util_1 = require("../db.util");
const uuid_generator_1 = require("../uuid.generator");
class AssetTypeDBRepository {
    constructor() {
        this._defaultPageSize = 10;
    }
    findAssetTypes(searchStr, pageSize) {
        let searchStrLocal = new RegExp(searchStr);
        return Rx.Observable.create(function (observer) {
            db_1.assetTypes.find({ name: { $regex: searchStrLocal } }).limit(pageSize).exec(function (err, doc) {
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
    saveAssetType(assetType) {
        assetType.assetTypeId = uuid_generator_1.generateUUID();
        return Rx.Observable.create(function (observer) {
            db_1.assetTypes.insert(assetType, function (err, doc) {
                if (err) {
                    observer.error(err);
                }
                else {
                    observer.next(assetType);
                }
                observer.complete();
            });
        });
    }
    getAssetTypes(pageNumber, pageSize, order) {
        return Rx.Observable.create(function (observer) {
            let skip = db_util_1.calcSkip(pageNumber, pageSize, this.defaultPageSize);
            db_1.assetTypes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
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
    getAssetTypeCount() {
        return Rx.Observable.create(function (observer) {
            db_1.assetTypes.count({}, function (err, count) {
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
    getAssetTypeById(assetTypeId) {
        return Rx.Observable.create(function (observer) {
            let query = {
                "assetTypeId": assetTypeId
            };
            db_1.assetTypes.findOne(query, function (err, doc) {
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
    updateAssetType(assetTypeId, assetType) {
        return Rx.Observable.create(function (observer) {
            let query = {
                "assetTypeId": assetTypeId
            };
            db_1.assetTypes.update(query, assetType, {}, function (err, numReplaced) {
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
    deleteAssetType(assetTypeId) {
        return Rx.Observable.create(function (observer) {
            let query = {
                "assetTypeId": assetTypeId
            };
            db_1.assetTypes.remove(query, {}, function (err, numRemoved) {
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
    get defaultPageSize() {
        return this._defaultPageSize;
    }
    set defaultPageSize(value) {
        this._defaultPageSize = value;
    }
}
class AssetTypeRestRepository {
    findAssetTypes(searchStr, pageSize) {
        return undefined;
    }
    ;
    saveAssetType(assetType) {
        return null;
    }
    getAssetTypes(pageNumber, pageSize, order) {
        return null;
    }
    getAssetTypeCount() {
        return null;
    }
    ;
    getAssetTypeById(assetTypeId) {
        return null;
    }
    ;
    updateAssetType(assetTypeId, assetType) {
        return null;
    }
    ;
    deleteAssetType(assetTypeId) {
        return null;
    }
    ;
}
function createAssetTypeRepository(kind) {
    switch (kind) {
        case repository_kind_1.RepositoryKind.Nedb:
            return new AssetTypeDBRepository();
        case repository_kind_1.RepositoryKind.Rest:
            return new AssetTypeRestRepository();
        default:
            return new AssetTypeDBRepository();
    }
}
exports.createAssetTypeRepository = createAssetTypeRepository;
//# sourceMappingURL=asset.type.repository.factory.js.map