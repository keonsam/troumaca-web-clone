"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnionOfPhysicalSite {
    constructor(siteId, name, describe, city, stateOrProvince, postalCode, country, streetNumber, street, apartmentOrSuite, floor, postOfficeBoxNumber) {
        this._siteId = siteId;
        this._name = name;
        this._describe = describe;
        this._city = city;
        this._stateOrProvince = stateOrProvince;
        this._postalCode = postalCode;
        this._country = country;
        this._streetNumber = streetNumber;
        this._street = street;
        this._apartmentOrSuite = apartmentOrSuite;
        this._floor = floor;
        this._postOfficeBoxNumber = postOfficeBoxNumber;
    }
    get siteId() {
        return this._siteId;
    }
    set siteId(value) {
        this._siteId = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get describe() {
        return this._describe;
    }
    set describe(value) {
        this._describe = value;
    }
    get city() {
        return this._city;
    }
    set city(value) {
        this._city = value;
    }
    get stateOrProvince() {
        return this._stateOrProvince;
    }
    set stateOrProvince(value) {
        this._stateOrProvince = value;
    }
    get postalCode() {
        return this._postalCode;
    }
    set postalCode(value) {
        this._postalCode = value;
    }
    get country() {
        return this._country;
    }
    set country(value) {
        this._country = value;
    }
    get streetNumber() {
        return this._streetNumber;
    }
    set streetNumber(value) {
        this._streetNumber = value;
    }
    get street() {
        return this._street;
    }
    set street(value) {
        this._street = value;
    }
    get apartmentOrSuite() {
        return this._apartmentOrSuite;
    }
    set apartmentOrSuite(value) {
        this._apartmentOrSuite = value;
    }
    get floor() {
        return this._floor;
    }
    set floor(value) {
        this._floor = value;
    }
    get postOfficeBoxNumber() {
        return this._postOfficeBoxNumber;
    }
    set postOfficeBoxNumber(value) {
        this._postOfficeBoxNumber = value;
    }
}
exports.UnionOfPhysicalSite = UnionOfPhysicalSite;
//# sourceMappingURL=union.of.physical.site.js.map