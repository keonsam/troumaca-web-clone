"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_kind_1 = require("../kind/asset.kind");
const asset_type_1 = require("../asset.type");
class Asset {
    constructor() {
        this._assetKind = new asset_kind_1.AssetKind();
        this._assetType = new asset_type_1.AssetType();
    }
    get assetId() {
        return this._assetId;
    }
    set assetId(value) {
        this._assetId = value;
    }
    get tenantId() {
        return this._tenantId;
    }
    set tenantId(value) {
        this._tenantId = value;
    }
    get assetKind() {
        return this._assetKind;
    }
    set assetKind(value) {
        this._assetKind = value;
    }
    get assetType() {
        return this._assetType;
    }
    set assetType(value) {
        this._assetType = value;
    }
    get serialNumber() {
        return this._serialNumber;
    }
    set serialNumber(value) {
        this._serialNumber = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(value) {
        this._quantity = value;
    }
    get unitOfMeasureId() {
        return this._unitOfMeasureId;
    }
    set unitOfMeasureId(value) {
        this._unitOfMeasureId = value;
    }
    get personId() {
        return this._personId;
    }
    set personId(value) {
        this._personId = value;
    }
    get siteId() {
        return this._siteId;
    }
    set siteId(value) {
        this._siteId = value;
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
exports.Asset = Asset;
//# sourceMappingURL=asset.js.map