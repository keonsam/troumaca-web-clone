"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssetTypeClass {
    constructor() {
        this._assignedAttributes = [];
    }
    get assetTypeClassId() {
        return this._assetTypeClassId;
    }
    set assetTypeClassId(value) {
        this._assetTypeClassId = value;
    }
    get tenantId() {
        return this._tenantId;
    }
    set tenantId(value) {
        this._tenantId = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get assignedAttributes() {
        return this._assignedAttributes;
    }
    set assignedAttributes(value) {
        this._assignedAttributes = value;
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
exports.AssetTypeClass = AssetTypeClass;
//# sourceMappingURL=asset.type.class.js.map