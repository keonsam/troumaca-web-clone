"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssetTypeClasses {
    constructor(assetTypeClassId, name, description, attributeAssignmentId, attributes) {
        this._assetTypeClassId = assetTypeClassId;
        this._name = name;
        this._description = description;
        this._attributeAssignmentId = attributeAssignmentId;
        this._attributes = attributes;
    }
    get assetTypeClassId() {
        return this._assetTypeClassId;
    }
    set assetTypeClassId(value) {
        this._assetTypeClassId = value;
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
    get attributeAssignmentId() {
        return this._attributeAssignmentId;
    }
    set attributeAssignmentId(value) {
        this._attributeAssignmentId = value;
    }
    get attributes() {
        return this._attributes;
    }
    set attributes(value) {
        this._attributes = value;
    }
}
exports.AssetTypeClasses = AssetTypeClasses;
//# sourceMappingURL=asset.type.classes.js.map