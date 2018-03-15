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
class AttributeDBRepository {
    getAvailableAttributes(pageNumber, pageSize, order, availableAttributes) {
        return rxjs_1.default.Observable.create(function (observer) {
            let skip = db_util_1.calcSkip(pageNumber, pageSize, defaultPageSize);
            db_1.attributes.find({ attributeId: { $nin: availableAttributes } }).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
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
    getAssignedAttributes(pageNumber, pageSize, order, assignedAttributes) {
        return rxjs_1.default.Observable.create(function (observer) {
            let skip = db_util_1.calcSkip(pageNumber, pageSize, defaultPageSize);
            db_1.attributes.find({ attributeId: { $in: assignedAttributes } }).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
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
    getAvailableAttributeCount() {
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.attributes.count({}, function (err, count) {
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
    getAvailableAttribute(attributeId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "attributeId": attributeId
            };
            db_1.attributes.findOne(query, function (err, doc) {
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
    saveAvailableAttribute(availableAttribute) {
        availableAttribute.attributeId = uuid_generator_1.generateUUID();
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.attributes.insert(availableAttribute, function (err, doc) {
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
    deleteAvailableAttribute(attributeId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "attributeId": attributeId
            };
            db_1.attributes.remove(query, {}, function (err, numRemoved) {
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
    updateAvailableAttribute(attributeId, attribute) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "attributeId": attributeId
            };
            db_1.attributes.update(query, attribute, {}, function (err, numReplaced) {
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
    addAttribute(attribute) {
        attribute.attributeId = uuid_generator_1.generateUUID();
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.attributes.insert(attribute, function (err, doc) {
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
    deleteAttribute(attributeId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "attributeId": attributeId
            };
            db_1.attributes.remove(query, {}, function (err, numRemoved) {
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
    getAttributeById(attributeId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "attributeId": attributeId
            };
            db_1.attributes.findOne(query, function (err, doc) {
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
    getAttributeCount() {
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.attributes.count({}, function (err, count) {
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
    getAttributes(pageNumber, pageSize, order) {
        return rxjs_1.default.Observable.create(function (observer) {
            let skip = db_util_1.calcSkip(pageNumber, pageSize, defaultPageSize);
            db_1.attributes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
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
    updateAttribute(attributeId, attribute) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "attributeId": attributeId
            };
            db_1.attributes.update(query, attribute, {}, function (err, numReplaced) {
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
class AttributeRestRepository {
    deleteAvailableAttribute(attributeId) {
        return undefined;
    }
    getAssignedAttributes(pageNumber, pageSize, order, assignedAttributes) {
        return undefined;
    }
    getAvailableAttribute(attributeId) {
        return undefined;
    }
    getAvailableAttributeCount() {
        return undefined;
    }
    getAvailableAttributes(pageNumber, pageSize, order, availableAttributes) {
        return undefined;
    }
    saveAvailableAttribute(availableAttribute) {
        return undefined;
    }
    updateAvailableAttribute(attributeId, attribute) {
        return undefined;
    }
    addAttribute(attribute) {
        return undefined;
    }
    deleteAttribute(attributeId) {
        return undefined;
    }
    getAttributeById(attributeId) {
        return undefined;
    }
    getAttributeCount() {
        return undefined;
    }
    getAttributes(pageNumber, pageSize, order) {
        return undefined;
    }
    updateAttribute(attributeId, attribute) {
        return undefined;
    }
}
function createAttributeRepositoryFactory(kind) {
    switch (kind) {
        case repository_kind_1.RepositoryKind.Nedb:
            return new AttributeDBRepository();
        case repository_kind_1.RepositoryKind.Rest:
            return new AttributeRestRepository();
        default:
            return new AttributeDBRepository();
    }
}
exports.createAttributeRepositoryFactory = createAttributeRepositoryFactory;
//# sourceMappingURL=attribute.repository.factory.js.map