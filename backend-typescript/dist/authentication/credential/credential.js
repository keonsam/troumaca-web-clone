"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Credential {
    get credentialId() {
        return this._credentialId;
    }
    set credentialId(value) {
        this._credentialId = value;
    }
    get partyId() {
        return this._partyId;
    }
    set partyId(value) {
        this._partyId = value;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get credentialStatus() {
        return this._credentialStatus;
    }
    set credentialStatus(value) {
        this._credentialStatus = value;
    }
    get modifiedOn() {
        return this._modifiedOn;
    }
    set modifiedOn(value) {
        this._modifiedOn = value;
    }
    get createdOn() {
        return this._createdOn;
    }
    set createdOn(value) {
        this._createdOn = value;
    }
}
exports.Credential = Credential;
//# sourceMappingURL=credential.js.map