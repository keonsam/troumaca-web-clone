"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __importDefault(require("rxjs"));
const confirmation_repository_factory_1 = require("./confirmation.repository.factory");
const Observable_1 = require("rxjs/Observable");
const credential_repository_factory_1 = require("../credential.repository.factory");
const credential_status_1 = require("../credential.status");
const result_success_1 = require("../../../result.success");
class ConfirmationOrchestrator {
    constructor() {
        this.confirmationRepository = confirmation_repository_factory_1.createCredentialConfirmationRepositoryFactory();
        this.credentialRepository = credential_repository_factory_1.createCredentialRepositoryFactory();
    }
    verifyCredentialConfirmation(credentialConfirmation) {
        let credentialConfirmationId = credentialConfirmation.credentialConfirmationId;
        let confirmationCode = credentialConfirmation.confirmationCode;
        return this.confirmationRepository
            .getCredentialConfirmationByCode(credentialConfirmationId, confirmationCode)
            .switchMap((credentialConfirmation) => {
            if (!credentialConfirmation) {
                // return an error if the credential confirmation is not found.
                return rxjs_1.default.Observable.throw(this.createNotFoundError("CredentialConfirmation"));
            }
            // we have a credential confirmation so let's get the status as it will be used multiple times.
            let credentialConfirmationStatus = credentialConfirmation.credentialStatus;
            // if the credential is confirmed
            if (credentialConfirmationStatus === credential_status_1.CredentialStatus.CONFIRMED) {
                return rxjs_1.default.Observable.of(new result_success_1.Result(true, "Already Confirmed.", credentialConfirmation));
            }
            // if the credential confirmation is expired then return the credential confirmation
            if (credentialConfirmationStatus === credential_status_1.CredentialStatus.EXPIRED) {
                return rxjs_1.default.Observable.of(new result_success_1.Result(true, "Expired", credentialConfirmation));
            }
            // if the confirmation time has expired
            if (this.confirmationCodeTimeHasExpired(credentialConfirmation)) {
                credentialConfirmation.credentialStatus = credential_status_1.CredentialStatus.EXPIRED;
                // update the credential confirmation status to expired
                return this.confirmationRepository
                    .updateCredentialConfirmation(credentialConfirmation)
                    .map(numReplaced => {
                    if (numReplaced > 0) {
                        return new result_success_1.Result(true, "Expired", credentialConfirmation);
                    }
                    else {
                        return rxjs_1.default.Observable.throw(this.createNotFoundError("CredentialConfirmation"));
                    }
                });
            }
            return this.credentialRepository
                .updateCredentialStatusById(credentialConfirmation.credentialId, credential_status_1.CredentialStatus.ACTIVE)
                .switchMap(numReplaced => {
                if (numReplaced > 0) {
                    credentialConfirmation.credentialStatus = credential_status_1.CredentialStatus.CONFIRMED;
                    return this.confirmationRepository
                        .updateCredentialConfirmation(credentialConfirmation)
                        .map(numReplaced => {
                        if (numReplaced > 0) {
                            return new result_success_1.Result(false, "Confirmed", credentialConfirmation);
                        }
                        else {
                            return new result_success_1.Result(true, "Confirmation update failed.", credentialConfirmation);
                        }
                    });
                }
                else {
                    return Observable_1.Observable.of(new result_success_1.Result(true, "Credential update failed.", credentialConfirmation));
                }
            });
        });
    }
    ;
    confirmationCodeTimeHasExpired(credentialConfirmation) {
        // 1 second * 60 = 1 minute * 20 = 20 minutes
        let createdOnTime = 0;
        if (credentialConfirmation.createdOn) {
            createdOnTime = credentialConfirmation.createdOn.getTime();
        }
        return createdOnTime + (20 * 60 * 1000) <= new Date().getTime();
    }
    sendPhoneVerificationCode(credentialConfirmationId) {
        return this.confirmationRepository
            .getCredentialConfirmationById(credentialConfirmationId)
            .switchMap((credentialConfirmation) => {
            if (credentialConfirmation && credentialConfirmation.credentialStatus === credential_status_1.CredentialStatus.CONFIRMED) {
                return rxjs_1.default.Observable.of(new result_success_1.Result(false, "Confirmed previously", credentialConfirmation));
            }
            else if (this.confirmationCodeTimeHasExpired(credentialConfirmation)) {
                credentialConfirmation.credentialStatus = credential_status_1.CredentialStatus.EXPIRED;
                return this.confirmationRepository
                    .updateCredentialConfirmation(credentialConfirmation)
                    .switchMap(numReplaced => {
                    if (numReplaced > 0) {
                        credentialConfirmation.createdOn = new Date();
                        credentialConfirmation.modifiedOn = new Date();
                        return this.confirmationRepository
                            .addCredentialConfirmation(credentialConfirmation)
                            .map((credentialConfirmation) => {
                            return new result_success_1.Result(false, "Updated", credentialConfirmation);
                        });
                    }
                    else {
                        return rxjs_1.default.Observable.of(new result_success_1.Result(true, "Failed update", credentialConfirmation));
                    }
                });
            }
            else {
                return rxjs_1.default.Observable.of(new result_success_1.Result(true, "Invalid Status", credentialConfirmation));
            }
        });
    }
    sendEmailVerificationCode(credentialConfirmationId) {
        return this.confirmationRepository
            .getCredentialConfirmationById(credentialConfirmationId)
            .switchMap((credentialConfirmation) => {
            if (credentialConfirmation) {
                if (credentialConfirmation.credentialStatus === credential_status_1.CredentialStatus.CONFIRMED) {
                    return rxjs_1.default.Observable.of(new result_success_1.Result(false, "Confirmed previously", credentialConfirmation));
                }
                else if (this.confirmationCodeTimeHasExpired(credentialConfirmation)) {
                    credentialConfirmation.credentialStatus = credential_status_1.CredentialStatus.EXPIRED;
                    return this.confirmationRepository
                        .updateCredentialConfirmation(credentialConfirmation)
                        .switchMap((numReplaced) => {
                        if (numReplaced > 0) {
                            credentialConfirmation.createdOn = new Date();
                            credentialConfirmation.modifiedOn = new Date();
                            return this.confirmationRepository
                                .addCredentialConfirmation(credentialConfirmation)
                                .map((credentialConfirmation) => {
                                return new result_success_1.Result(false, "Updated", credentialConfirmation);
                            });
                        }
                        else {
                            return rxjs_1.default.Observable.of(new result_success_1.Result(true, "Failed update", credentialConfirmation));
                        }
                    });
                }
                else {
                    return rxjs_1.default.Observable.of(new result_success_1.Result(true, "Invalid Status", credentialConfirmation));
                }
            }
            else {
                return rxjs_1.default.Observable.of(new result_success_1.Result(true, "Unknown confirmation", credentialConfirmation));
            }
        });
    }
    ;
    createNotFoundError(name) {
        return new Error(JSON.stringify({
            "statusCode": 404,
            "message": name + " not found."
        }));
    }
}
exports.ConfirmationOrchestrator = ConfirmationOrchestrator;
//# sourceMappingURL=confirmation.orchestrator.js.map