"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __importDefault(require("rxjs"));
const repository_kind_1 = require("../../repository.kind");
const db_1 = require("../../db");
class AssetKindDBRepository {
    getAssetKinds() {
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.assetKinds.find({}, function (err, doc) {
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
class AssetKindRestRepository {
    getAssetKinds() {
        return undefined;
    }
}
function createAssetKindRepository(kind) {
    switch (kind) {
        case repository_kind_1.RepositoryKind.Nedb:
            return new AssetKindDBRepository();
        case repository_kind_1.RepositoryKind.Rest:
            return new AssetKindRestRepository();
        default:
            return new AssetKindDBRepository();
    }
}
exports.createAssetKindRepository = createAssetKindRepository;
//# sourceMappingURL=asset.kind.repository.factory.js.map