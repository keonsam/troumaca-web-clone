"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const nedb_1 = __importDefault(require("nedb"));
// reference data
let theDataTypesDb = path_1.default.resolve(__dirname, '..') + '/nedb/data-types.db';
let theMeasuresDb = path_1.default.resolve(__dirname, '..') + '/nedb/unit-of-measures.db';
// asset type
let theAttributesDb = path_1.default.resolve(__dirname, '..') + '/nedb/asset_type/attributes.db';
let theAssetTypesDb = path_1.default.resolve(__dirname, '..') + '/nedb/asset_type/asset-types.db';
let theAssetTypeClassesDb = path_1.default.resolve(__dirname, '..') + '/nedb/asset_type/asset-type-classes.db';
let theValuesDb = path_1.default.resolve(__dirname, '..') + '/nedb/asset_type/values.db';
let theAssetsDb = path_1.default.resolve(__dirname, '..') + '/nedb/asset_type/assets.db';
let theAssetKindsDb = path_1.default.resolve(__dirname, '..') + '/nedb/asset_type/asset-kinds.db';
// sites
let theSitesDb = path_1.default.resolve(__dirname, '..') + '/nedb/site/sites.db';
let theStreetAddressDb = path_1.default.resolve(__dirname, '..') + '/nedb/site/street-addresses.db';
let theTelephoneDb = path_1.default.resolve(__dirname, '..') + '/nedb/site/telephones.db';
let theEmailDb = path_1.default.resolve(__dirname, '..') + '/nedb/site/emails.db';
let theWebSiteDb = path_1.default.resolve(__dirname, '..') + '/nedb/site/web-sites.db';
let thePostOfficeBoxDb = path_1.default.resolve(__dirname, '..') + '/nedb/site/post-office-boxes.db';
// party
let thePersonsDb = path_1.default.resolve(__dirname, '..') + '/nedb/party/persons.db';
let theOrganizationDb = path_1.default.resolve(__dirname, '..') + '/nedb/party/organizations.db';
// authentication
let theCredentialDb = path_1.default.resolve(__dirname, '..') + '/nedb/authentication/credentials.db';
let theCredentialConfirmationsDb = path_1.default.resolve(__dirname, '..') + '/nedb/authentication/credential_confirmations.db';
// file
let theUsersPhotoDb = path_1.default.resolve(__dirname, '..') + '/nedb/file_meta_data/users-photos.db';
let theCompanyPhotoDb = path_1.default.resolve(__dirname, '..') + '/nedb/file_meta_data/company-photos.db';
let theAccountPhotoDb = path_1.default.resolve(__dirname, '..') + '/nedb/file_meta_data/account-photos.db';
let sessionDb = path_1.default.resolve(__dirname, '..', '..') + '/nedb/session/sessions.db';
let theShipmentsDb = path_1.default.resolve(__dirname, '..', '..') + '/nedb/shipment/shipments.db';
// Todo: Fix remove
let theAccountsInformationDb = path_1.default.resolve(__dirname, '..') + '/nedb/accounts-information.db';
exports.accountsInformation = new nedb_1.default(theAccountsInformationDb);
exports.accountsInformation.loadDatabase(handleError);
exports.accountsPhotos = new nedb_1.default(theAccountPhotoDb);
exports.accountsPhotos.loadDatabase(handleError);
let companyPhotos = new nedb_1.default(theCompanyPhotoDb);
companyPhotos.loadDatabase(handleError);
exports.usersPhotos = new nedb_1.default(theUsersPhotoDb);
exports.usersPhotos.loadDatabase(handleError);
exports.persons = new nedb_1.default(thePersonsDb);
exports.persons.loadDatabase(handleError);
exports.persons.ensureIndex({ fieldName: 'personId', unique: true }, handleError);
exports.organizations = new nedb_1.default(theOrganizationDb);
exports.organizations.loadDatabase(handleError);
exports.organizations.ensureIndex({ fieldName: 'organizationId', unique: true }, handleError);
// authentication
exports.credentials = new nedb_1.default(theCredentialDb);
exports.credentials.loadDatabase(handleError);
exports.credentials.ensureIndex({ fieldName: 'credentialId', unique: true }, handleError);
exports.credentialConfirmations = new nedb_1.default(theCredentialConfirmationsDb);
exports.credentialConfirmations.loadDatabase(handleError);
exports.credentialConfirmations.ensureIndex({ fieldName: 'credentialConfirmationId', unique: true }, handleError);
// sites
exports.sites = new nedb_1.default(theSitesDb);
exports.sites.loadDatabase(handleError);
exports.sites.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);
exports.streetAddresses = new nedb_1.default(theStreetAddressDb);
exports.streetAddresses.loadDatabase(handleError);
exports.streetAddresses.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);
exports.postOfficeBoxes = new nedb_1.default(thePostOfficeBoxDb);
exports.postOfficeBoxes.loadDatabase(handleError);
exports.postOfficeBoxes.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);
exports.telephones = new nedb_1.default(theTelephoneDb);
exports.telephones.loadDatabase(handleError);
exports.telephones.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);
exports.emails = new nedb_1.default(theEmailDb);
exports.emails.loadDatabase(handleError);
exports.emails.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);
exports.websites = new nedb_1.default(theWebSiteDb);
exports.websites.loadDatabase(handleError);
exports.websites.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);
// reference data
exports.dataTypes = new nedb_1.default(theDataTypesDb);
exports.dataTypes.loadDatabase(handleError);
exports.dataTypes.ensureIndex({ fieldName: 'dataTypeId', unique: true }, handleError);
exports.unitOfMeasures = new nedb_1.default(theMeasuresDb);
exports.unitOfMeasures.loadDatabase(handleError);
exports.unitOfMeasures.ensureIndex({ fieldName: 'unitOfMeasureId', unique: true }, handleError);
// asset type
exports.assets = new nedb_1.default(theAssetsDb);
exports.assets.loadDatabase(handleError);
exports.assets.ensureIndex({ fieldName: 'assetId', unique: true }, handleError);
exports.values = new nedb_1.default(theValuesDb);
exports.values.loadDatabase(handleError);
exports.values.ensureIndex({ fieldName: 'valueId', unique: true }, handleError);
exports.assetKinds = new nedb_1.default(theAssetKindsDb);
exports.assetKinds.loadDatabase(handleError);
exports.assetKinds.ensureIndex({ fieldName: 'assetKindId', unique: true }, handleError);
exports.assetTypeClasses = new nedb_1.default(theAssetTypeClassesDb);
exports.assetTypeClasses.loadDatabase(handleError);
exports.assetTypeClasses.ensureIndex({ fieldName: 'assetTypeClassId', unique: true }, handleError);
exports.assetTypes = new nedb_1.default(theAssetTypesDb);
exports.assetTypes.loadDatabase(handleError);
exports.assetTypes.ensureIndex({ fieldName: 'assetTypeId', unique: true }, handleError);
exports.attributes = new nedb_1.default(theAttributesDb);
exports.attributes.loadDatabase(handleError);
exports.attributes.ensureIndex({ fieldName: 'attributeId', unique: true }, handleError);
exports.sessions = new nedb_1.default(sessionDb);
exports.sessions.loadDatabase(handleError);
exports.shipments = new nedb_1.default(theShipmentsDb);
exports.shipments.loadDatabase(function (err) { if (err) {
    console.log(err);
} });
function handleError(err) {
    if (err) {
        console.log(err);
    }
}
//# sourceMappingURL=db.js.map