"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const nedb_1 = __importDefault(require("nedb"));
let db = {};
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
let accountsInformation = new nedb_1.default(theAccountsInformationDb);
accountsInformation.loadDatabase(handleError);
exports.default = accountsInformation;
db.accountsPhotos = new nedb_1.default(theAccountPhotoDb);
db.accountsPhotos.loadDatabase(handleError);
db.companyPhotos = new nedb_1.default(theCompanyPhotoDb);
db.companyPhotos.loadDatabase(handleError);
db.usersPhotos = new nedb_1.default(theUsersPhotoDb);
db.usersPhotos.loadDatabase(handleError);
db.persons = new nedb_1.default(thePersonsDb);
db.persons.loadDatabase(handleError);
db.persons.ensureIndex({ fieldName: 'personId', unique: true }, handleError);
db.organizations = new nedb_1.default(theOrganizationDb);
db.organizations.loadDatabase(handleError);
db.organizations.ensureIndex({ fieldName: 'organizationId', unique: true }, handleError);
// authentication
db.credentials = new nedb_1.default(theCredentialDb);
db.credentials.loadDatabase(handleError);
db.credentials.ensureIndex({ fieldName: 'credentialId', unique: true }, handleError);
db.credentialConfirmations = new nedb_1.default(theCredentialConfirmationsDb);
db.credentialConfirmations.loadDatabase(handleError);
db.credentialConfirmations.ensureIndex({ fieldName: 'credentialConfirmationId', unique: true }, handleError);
// sites
db.sites = new nedb_1.default(theSitesDb);
db.sites.loadDatabase(handleError);
db.sites.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);
db.streetAddresses = new nedb_1.default(theStreetAddressDb);
db.streetAddresses.loadDatabase(handleError);
db.streetAddresses.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);
db.postOfficeBoxes = new nedb_1.default(thePostOfficeBoxDb);
db.postOfficeBoxes.loadDatabase(handleError);
db.postOfficeBoxes.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);
db.telephones = new nedb_1.default(theTelephoneDb);
db.telephones.loadDatabase(handleError);
db.telephones.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);
db.emails = new nedb_1.default(theEmailDb);
db.emails.loadDatabase(handleError);
db.emails.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);
db.websites = new nedb_1.default(theWebSiteDb);
db.websites.loadDatabase(handleError);
db.websites.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);
// reference data
db.dataTypes = new nedb_1.default(theDataTypesDb);
db.dataTypes.loadDatabase(handleError);
db.dataTypes.ensureIndex({ fieldName: 'dataTypeId', unique: true }, handleError);
db.unitOfMeasures = new nedb_1.default(theMeasuresDb);
db.unitOfMeasures.loadDatabase(handleError);
db.unitOfMeasures.ensureIndex({ fieldName: 'unitOfMeasureId', unique: true }, handleError);
// asset type
exports.assets = new nedb_1.default(theAssetsDb);
exports.assets.loadDatabase(handleError);
exports.assets.ensureIndex({ fieldName: 'assetId', unique: true }, handleError);
db.values = new nedb_1.default(theValuesDb);
db.values.loadDatabase(handleError);
db.values.ensureIndex({ fieldName: 'valueId', unique: true }, handleError);
db.assetKinds = new nedb_1.default(theAssetKindsDb);
db.assetKinds.loadDatabase(handleError);
db.assetKinds.ensureIndex({ fieldName: 'assetKindId', unique: true }, handleError);
db.assetTypeClasses = new nedb_1.default(theAssetTypeClassesDb);
db.assetTypeClasses.loadDatabase(handleError);
db.assetTypeClasses.ensureIndex({ fieldName: 'assetTypeClassId', unique: true }, handleError);
db.assetTypes = new nedb_1.default(theAssetTypesDb);
db.assetTypes.loadDatabase(handleError);
db.assetTypes.ensureIndex({ fieldName: 'assetTypeId', unique: true }, handleError);
db.attributes = new nedb_1.default(theAttributesDb);
db.attributes.loadDatabase(handleError);
db.attributes.ensureIndex({ fieldName: 'attributeId', unique: true }, handleError);
db.sessions = new nedb_1.default(sessionDb);
db.sessions.loadDatabase(handleError);
db.shipments = new nedb_1.default(theShipmentsDb);
db.shipments.loadDatabase(function (err) { if (err) {
    console.log(err);
} });
function handleError(err) {
    if (err) {
        console.log(err);
    }
}
exports.default = db;
//# sourceMappingURL=db.js.map