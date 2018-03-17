"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Session {
    constructor(sessionId, expirationDate, createdOn, modifiedOn, data) {
        this._sessionId = sessionId;
        this._expirationDate = expirationDate;
        this._createdOn = createdOn;
        this._modifiedOn = modifiedOn;
        if (data) {
            this._data = data;
        }
        else {
            this.data = new Map();
        }
    }
    get sessionId() {
        return this._sessionId;
    }
    set sessionId(value) {
        this._sessionId = value;
    }
    get partyId() {
        return this._partyId;
    }
    set partyId(value) {
        this._partyId = value;
    }
    get expirationDate() {
        return this._expirationDate;
    }
    set expirationDate(value) {
        this._expirationDate = value;
    }
    get createdOn() {
        return this._createdOn;
    }
    set createdOn(value) {
        this._createdOn = value;
    }
    get modifiedOn() {
        return this._modifiedOn;
    }
    set modifiedOn(value) {
        this._modifiedOn = value;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
}
exports.Session = Session;
//# sourceMappingURL=session.js.map