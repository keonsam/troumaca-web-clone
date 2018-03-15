"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __importDefault(require("rxjs"));
const repository_kind_1 = require("../repository.kind");
const db_1 = require("../db");
class AssetTypeDBRepository {
    getAssetTypes(searchStr, pageSize) {
        let searchStrLocal = new RegExp(searchStr);
        return rxjs_1.default.Observable.create(function (observer) {
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
}
class AssetTypeRestRepository {
    getAssetTypes(searchStr, pageSize) {
        return undefined;
    }
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