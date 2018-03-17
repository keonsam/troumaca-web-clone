"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Value {
    constructor(attributeId, text) {
        this._attributeId = attributeId;
        this._text = text;
    }
    get valueId() {
        return this._valueId;
    }
    set valueId(value) {
        this._valueId = value;
    }
    get tenantId() {
        return this._tenantId;
    }
    set tenantId(value) {
        this._tenantId = value;
    }
    get assetTypeId() {
        return this._assetTypeId;
    }
    set assetTypeId(value) {
        this._assetTypeId = value;
    }
    get attributeId() {
        return this._attributeId;
    }
    set attributeId(value) {
        this._attributeId = value;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
    }
    get createOn() {
        return this._createOn;
    }
    set createOn(value) {
        this._createOn = value;
    }
    get modifiedOn() {
        return this._modifiedOn;
    }
    set modifiedOn(value) {
        this._modifiedOn = value;
    }
}
exports.Value = Value;
//# sourceMappingURL=value.js.map