"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __importDefault(require("rxjs"));
const db_1 = require("../db");
const repository_kind_1 = require("../repository.kind");
class DataTypeDBRepository {
    getDataTypes() {
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.dataTypes.find({}, function (err, doc) {
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
}
class DataTypeRestRepository {
    getDataTypes() {
        return undefined;
    }
}
function createDataTypeRepository(kind) {
    switch (kind) {
        case repository_kind_1.RepositoryKind.Nedb:
            return new DataTypeDBRepository();
        case repository_kind_1.RepositoryKind.Rest:
            return new DataTypeRestRepository();
        default:
            return new DataTypeDBRepository();
    }
}
exports.createDataTypeRepository = createDataTypeRepository;
//# sourceMappingURL=data.type.repository.factory.js.map