"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __importDefault(require("rxjs"));
const validator_1 = __importDefault(require("validator"));
const credential_status_1 = require("./credential.status");
const validate_response_1 = require("./validate.response");
const credential_repository_factory_1 = require("./credential.repository.factory");
const session_1 = require("../../session/session");
const session_repository_factory_1 = require("../../session/session.repository.factory");
const confirmation_repository_factory_1 = require("./confirmation/confirmation.repository.factory");
const credential_confirmation_1 = require("./confirmation/credential.confirmation");
class CredentialOrchestrator {
    constructor() {
        this.sessionRepository = session_repository_factory_1.createSessionRepositoryFactory();
        this.credentialRepository = credential_repository_factory_1.createCredentialRepositoryFactory();
        this.confirmationRepository = confirmation_repository_factory_1.createCredentialConfirmationRepositoryFactory();
    }
    isValidUsername(credential) {
        return this.credentialRepository
            .isValidUsername(credential)
            .map(valid => {
            return new validate_response_1.ValidateResponse(valid);
        });
    }
    ;
    isValidPassword(credential) {
        return this.credentialRepository
            .isValidPassword(credential)
            .map(valid => {
            return new validate_response_1.ValidateResponse(valid);
        });
    }
    ;
    forgotPassword(username) {
        return this.credentialRepository
            .getCredentialByUsername(username)
            .map(credential => {
            if (!credential) {
                return new validate_response_1.ValidateResponse(false);
            }
            else {
                return new validate_response_1.ValidateResponse(true);
            }
        });
    }
    ;
    addCredential(credential) {
        return this.credentialRepository
            .addCredential(credential)
            .switchMap(credential => {
            let credentialConfirmation = new credential_confirmation_1.CredentialConfirmation();
            credentialConfirmation.credentialId = credential.credentialId;
            credentialConfirmation.createdOn = new Date();
            credentialConfirmation.modifiedOn = new Date();
            return this.confirmationRepository
                .addCredentialConfirmation(credentialConfirmation);
        });
    }
    ;
    authenticate(credential) {
        // A person can access the application under the following conditions:
        // 1. He/she provides a valid set of credentials
        // 2. He/she has confirmed their username (email, or phone)
        // 3. He/she has completed the quick profile, person, account type, and possible organization name.
        return this.credentialRepository
            .getSanitizeCredentialByUsername(credential.username)
            .switchMap((readCredential) => {
            // unable to find the credential specified
            if (!readCredential) {
                return rxjs_1.default.Observable.throw(this.createNotFoundError("Credential"));
            }
            let readCredentialStatus = readCredential.credentialStatus;
            // do not continue if the status is not active
            if (readCredentialStatus === credential_status_1.CredentialStatus.DISABLED) {
                return rxjs_1.default.Observable.of(readCredential);
            }
            let session = new session_1.Session();
            session.partyId = readCredential.partyId ? readCredential.partyId : "";
            session.data.set("credentialId", readCredential.credentialId);
            session.data.set("credentialStatus", readCredential.credentialStatus);
            if (!validator_1.default.isEmail(readCredential.username)) {
                session.data.set("phone", readCredential.username);
            }
            if (session.partyId || session.accountStatus === credential_status_1.CredentialStatus.ACTIVE) {
                return this.sessionRepository.addSession(session);
            }
            return this.confirmationRepository
                .getCredentialConfirmationByCredentialId(readCredential.credentialId)
                .switchMap(credentialConfirmation => {
                // TODO: needs to account for more than one value
                if (credentialConfirmation && credentialConfirmation.credentialConfirmationId) {
                    session.data.set("credentialConfirmationId", credentialConfirmation.credentialConfirmationId);
                }
                return this.sessionRepository.addSession(session);
            });
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
exports.CredentialOrchestrator = CredentialOrchestrator;
//# sourceMappingURL=credential.orchestrator.js.map