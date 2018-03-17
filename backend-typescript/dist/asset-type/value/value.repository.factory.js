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
const repository_kind_1 = require("../../repository.kind");
const db_util_1 = require("../../db.util");
const uuid_generator_1 = require("../../uuid.generator");
const db_1 = require("../../db");
class ValueDBRepository {
    constructor() {
        this.defaultPageSize = 10;
    }
    findValues(searchStr, pageSize) {
        let searchStrLocal = new RegExp(searchStr);
        return Rx.Observable.create(function (observer) {
            db_1.values.find({ name: { $regex: searchStrLocal } }).limit(pageSize).exec(function (err, doc) {
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
    saveValue(value) {
        value.valueId = uuid_generator_1.generateUUID();
        return Rx.Observable.create(function (observer) {
            db_1.values.insert(value, function (err, doc) {
                if (err) {
                    observer.error(err);
                }
                else {
                    observer.next(value);
                }
                observer.complete();
            });
        });
    }
    getValues(pageNumber, pageSize, order) {
        return Rx.Observable.create(function (observer) {
            let skip = db_util_1.calcSkip(pageNumber, pageSize, this.defaultPageSize);
            db_1.values.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
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
    getValueCount() {
        return Rx.Observable.create(function (observer) {
            db_1.values.count({}, function (err, count) {
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
    getValueById(valueId) {
        return Rx.Observable.create(function (observer) {
            let query = {
                "valueId": valueId
            };
            db_1.values.findOne(query, function (err, doc) {
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
    updateValue(valueId, value) {
        return Rx.Observable.create(function (observer) {
            let query = {
                "valueId": valueId
            };
            db_1.values.update(query, value, {}, function (err, numReplaced) {
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
    deleteValue(valueId) {
        return Rx.Observable.create(function (observer) {
            let query = {
                "valueId": valueId
            };
            db_1.values.remove(query, {}, function (err, numRemoved) {
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
class ValueRestRepository {
    findValues(searchStr, pageSize) {
        return undefined;
    }
    ;
    saveValue(value) {
        return null;
    }
    getValues(pageNumber, pageSize, order) {
        return null;
    }
    getValueCount() {
        return null;
    }
    ;
    getValueById(valueId) {
        return null;
    }
    ;
    updateValue(valueId, value) {
        return null;
    }
    ;
    deleteValue(valueId) {
        return null;
    }
    ;
}
function createValueRepository(kind) {
    switch (kind) {
        case repository_kind_1.RepositoryKind.Nedb:
            return new ValueDBRepository();
        case repository_kind_1.RepositoryKind.Rest:
            return new ValueRestRepository();
        default:
            return new ValueDBRepository();
    }
}
exports.createValueRepository = createValueRepository;
//# sourceMappingURL=value.repository.factory.js.map