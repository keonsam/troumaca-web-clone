"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __importDefault(require("rxjs"));
const uuid_generator_1 = require("../../uuid.generator");
const db_util_1 = require("../../db.util");
const repository_kind_1 = require("../../repository.kind");
const db_1 = require("../../db");
let defaultPageSize = 10;
class AssetTypeClassDBRepository {
    getAssetTypeClasses(pageNumber, pageSize, order) {
        return rxjs_1.default.Observable.create(function (observer) {
            let skip = db_util_1.calcSkip(pageNumber, pageSize, defaultPageSize);
            db_1.assetTypeClasses.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
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
    getAssetTypeClassCount() {
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.assetTypeClasses.count({}, function (err, count) {
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
    getAssetTypeClass(assetTypeClassId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "assetTypeClassId": assetTypeClassId
            };
            db_1.assetTypeClasses.findOne(query, function (err, doc) {
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
    saveAssetTypeClass(assetTypeClass) {
        assetTypeClass.assetTypeClassId = uuid_generator_1.generateUUID();
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.assetTypeClasses.insert(assetTypeClass, function (err, doc) {
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
    deleteAssetTypeClass(assetTypeClassId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "assetTypeClassId": assetTypeClassId
            };
            db_1.assetTypeClasses.remove(query, {}, function (err, numRemoved) {
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
    updateAssetTypeClass(assetTypeClassId, assetTypeClass) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "assetTypeClassId": assetTypeClassId
            };
            db_1.assetTypeClasses.update(query, assetTypeClass, {}, function (err, numReplaced) {
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
}
class AssetTypeClassRestRepository {
    deleteAssetTypeClass(assetTypeClassId) {
        return undefined;
    }
    getAssetTypeClass(assetTypeClassId) {
        return undefined;
    }
    getAssetTypeClassCount() {
        return undefined;
    }
    getAssetTypeClasses(pageNumber, pageSize, order) {
        return undefined;
    }
    saveAssetTypeClass(assetTypeClass) {
        return undefined;
    }
    updateAssetTypeClass(assetTypeClassId, assetTypeClass) {
        return undefined;
    }
}
function createAssetTypeClassesRepositoryFactory(kind) {
    switch (kind) {
        case repository_kind_1.RepositoryKind.Nedb:
            return new AssetTypeClassDBRepository();
        case repository_kind_1.RepositoryKind.Rest:
            return new AssetTypeClassRestRepository();
        default:
            return new AssetTypeClassDBRepository();
    }
}
exports.createAssetTypeClassesRepositoryFactory = createAssetTypeClassesRepositoryFactory;
//# sourceMappingURL=asset.type.class.repository.factory.js.map