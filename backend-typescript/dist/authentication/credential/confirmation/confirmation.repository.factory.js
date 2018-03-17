"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __importDefault(require("rxjs"));
const uuid_generator_1 = require("../../../uuid.generator");
const generate_sms_verification_code_1 = __importDefault(require("generate-sms-verification-code"));
const db_1 = require("../../../db");
const credential_status_1 = require("../credential.status");
const repository_kind_1 = require("../../../repository.kind");
class ConfirmationDBRepository {
    addCredentialConfirmation(credentialConfirmation) {
        credentialConfirmation.credentialConfirmationId = uuid_generator_1.generateUUID();
        credentialConfirmation.confirmationCode = generate_sms_verification_code_1.default(6, { type: 'string' });
        credentialConfirmation.credentialStatus = credential_status_1.CredentialStatus.NEW;
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.credentialConfirmations.insert(credentialConfirmation, function (err, doc) {
                if (!err) {
                    delete doc._id;
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
    getCredentialConfirmationByCode(credentialConfirmationId, confirmationCode) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query1 = {
                "credentialConfirmationId": credentialConfirmationId
            };
            let query2 = {
                "confirmationCode": confirmationCode
            };
            db_1.credentialConfirmations.findOne({ $and: [query1, query2] }, function (err, doc) {
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
    getCredentialConfirmationById(credentialConfirmationId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "credentialConfirmationId": credentialConfirmationId
            };
            db_1.credentialConfirmations.findOne(query, function (err, doc) {
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
    updateCredentialConfirmation(credentialConfirmation) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "credentialConfirmationId": credentialConfirmation.credentialConfirmationId
            };
            credentialConfirmation.modifiedOn = new Date();
            db_1.credentialConfirmations.update(query, credentialConfirmation, {}, function (err, numReplaced) {
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
    getCredentialConfirmationByCredentialId(credentialId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "credentialId": credentialId
            };
            db_1.credentialConfirmations
                .find(query)
                .sort({ status: 1 })
                .exec(function (err, doc) {
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
class ConfirmationRestRepository {
    addCredentialConfirmation(credentialConfirmation) {
        return undefined;
    }
    getCredentialConfirmationByCode(credentialConfirmationId, confirmationCode) {
        return undefined;
    }
    getCredentialConfirmationByCredentialId(credentialId) {
        return undefined;
    }
    getCredentialConfirmationById(credentialConfirmationId) {
        return undefined;
    }
    updateCredentialConfirmation(credentialConfirmation) {
        return undefined;
    }
}
function createCredentialConfirmationRepositoryFactory(kind) {
    switch (kind) {
        case repository_kind_1.RepositoryKind.Nedb:
            return new ConfirmationDBRepository();
        case repository_kind_1.RepositoryKind.Rest:
            return new ConfirmationRestRepository();
        default:
            return new ConfirmationDBRepository();
    }
}
exports.createCredentialConfirmationRepositoryFactory = createCredentialConfirmationRepositoryFactory;
//# sourceMappingURL=confirmation.repository.factory.js.map