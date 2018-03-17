"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __importDefault(require("rxjs"));
const validator_1 = __importDefault(require("validator"));
const libphonenumber_js_1 = __importDefault(require("libphonenumber-js"));
const password_validator_1 = __importDefault(require("password-validator"));
const uuid_generator_1 = require("../../uuid.generator");
const credential_status_1 = require("./credential.status");
const db_1 = require("../../db");
const repository_kind_1 = require("../../repository.kind");
class CredentialDBRepository {
    isValidUsername(credential) {
        let username = credential.username;
        if (!username) {
            return rxjs_1.default.Observable.of(false);
        }
        // the user name is valid if:
        let validUsername = false;
        // 1. is username and email
        let validEmail = validator_1.default.isEmail(username);
        if (validEmail) {
            validUsername = true;
        }
        else {
            let parsedObj = libphonenumber_js_1.default.parse(username, 'US');
            if (parsedObj && parsedObj.phone) {
                // 2. or username is a phone number
                validUsername = libphonenumber_js_1.default.isValidNumber(parsedObj);
            }
        }
        if (!validUsername) {
            // 3. and is not taken
            return rxjs_1.default.Observable.of(false);
        }
        else {
            return this.getCredentialByUsername(username)
                .map(credential => {
                if (!credential) {
                    return true;
                }
                else if (!credential.username) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
    }
    ;
    isValidPassword(credential) {
        let password = credential.password;
        if (!password) {
            return rxjs_1.default.Observable.of(false);
        }
        else {
            // Create a schema
            let schema = new password_validator_1.default();
            // Add properties to it
            schema
                .is().min(8) // Minimum length 8
                .is().max(100) // Maximum length 100
                .has().uppercase() // Must have uppercase letters
                .has().lowercase() // Must have lowercase letters
                .has().digits() // Must have digits
                .has().not().spaces() // Should not have spaces
                .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
            return rxjs_1.default.Observable.of(schema.validate(password));
        }
    }
    ;
    getCredentialByUsername(username) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "username": username
            };
            db_1.credentials.findOne(query, function (err, doc) {
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
    getSanitizeCredentialByUsername(username) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "username": username
            };
            db_1.credentials.findOne(query, function (err, doc) {
                if (!err) {
                    delete doc.password;
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
    getCredentialByCredentialId(credentialId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "credentialId": credentialId
            };
            db_1.credentials.findOne(query, function (err, doc) {
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
    checkUsernameValid(partyId, username) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query1 = {
                "partyId": partyId
            };
            let query2 = {
                "username": username
            };
            db_1.credentials.findOne({ $and: [query1, query2] }, function (err, doc) {
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
    addCredential(credential) {
        credential.credentialId = uuid_generator_1.generateUUID();
        credential.status = credential_status_1.CredentialStatus.NEW;
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.credentials.insert(credential, function (err, doc) {
                if (!err) {
                    observer.next(credential);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    authenticateCredential(credential) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query1 = {
                "username": credential.username
            };
            let query2 = {
                "password": credential.password
            };
            db_1.credentials.findOne({ $and: [query1, query2] }, function (err, doc) {
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
    updateCredentialStatusById(credentialId, status) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "credentialId": credentialId
            };
            db_1.credentials.update(query, { $set: { status } }, {}, function (err, numReplaced) {
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
class CredentialRestRepository {
    addCredential(credential) {
        return undefined;
    }
    authenticateCredential(credential) {
        return undefined;
    }
    checkUsernameValid(partyId, username) {
        return undefined;
    }
    getCredentialByCredentialId(credentialId) {
        return undefined;
    }
    getCredentialByUsername(username) {
        return undefined;
    }
    isValidPassword(credential) {
        return undefined;
    }
    isValidUsername(credential) {
        return undefined;
    }
    updateCredentialStatusById(credentialId, status) {
        return undefined;
    }
    getSanitizeCredentialByUsername(credentialId) {
        return undefined;
    }
}
function createCredentialRepositoryFactory(kind) {
    switch (kind) {
        case repository_kind_1.RepositoryKind.Nedb:
            return new CredentialDBRepository();
        case repository_kind_1.RepositoryKind.Rest:
            return new CredentialRestRepository();
        default:
            return new CredentialDBRepository();
    }
}
exports.createCredentialRepositoryFactory = createCredentialRepositoryFactory;
//# sourceMappingURL=credential.repository.factory.js.map