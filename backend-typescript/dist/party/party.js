"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Party {
    get partyId() {
        return this._partyId;
    }
    set partyId(value) {
        this._partyId = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
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
}
exports.Party = Party;
//# sourceMappingURL=party.js.map