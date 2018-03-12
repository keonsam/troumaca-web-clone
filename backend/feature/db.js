let path = require('path');
const Datastore = require('nedb');
const db = {};

// reference data
let theDataTypesDb =  path.resolve(__dirname,'..') + '/nedb/data-types.db';
let theMeasuresDb = path.resolve(__dirname, '..') + '/nedb/unit-of-measures.db';

// asset type
let theAttributesDb = path.resolve(__dirname, '..') + '/nedb/asset_type/attributes.db';
let theAssetTypesDb = path.resolve(__dirname,'..') + '/nedb/asset_type/asset-types.db';
let theAssetTypeClassesDb = path.resolve(__dirname,'..') + '/nedb/asset_type/asset-type-classes.db';
let theValuesDb = path.resolve(__dirname, '..') + '/nedb/asset_type/values.db';
let theAssetsDb = path.resolve(__dirname, '..') + '/nedb/asset_type/assets.db';
let theAssetKindsDb = path.resolve(__dirname, '..') + '/nedb/asset_type/asset-kinds.db';

// sites
let theSitesDb = path.resolve(__dirname, '..') + '/nedb/site/sites.db';
let theStreetAddressDb = path.resolve(__dirname, '..') + '/nedb/site/street-addresses.db';
let theTelephoneDb = path.resolve(__dirname, '..') + '/nedb/site/telephones.db';
let theEmailDb = path.resolve(__dirname, '..') + '/nedb/site/emails.db';
let theWebSiteDb = path.resolve(__dirname, '..') + '/nedb/site/web-sites.db';
let thePostOfficeBoxDb = path.resolve(__dirname, '..') + '/nedb/site/post-office-boxes.db';

// party
let thePersonsDb = path.resolve(__dirname, '..') + '/nedb/party/persons.db';
let theOrganizationDb = path.resolve(__dirname, '..') + '/nedb/party/organizations.db';

// authentication
let theCredentialDb = path.resolve(__dirname, '..') + '/nedb/authentication/credentials.db';
let theCredentialConfirmationsDb = path.resolve(__dirname, '..') + '/nedb/authentication/credential_confirmations.db';

// file
let theUsersPhotoDb = path.resolve(__dirname, '..') + '/nedb/file_meta_data/users-photos.db';
let theCompanyPhotoDb = path.resolve(__dirname, '..') + '/nedb/file_meta_data/company-photos.db';
let theAccountPhotoDb = path.resolve(__dirname, '..') + '/nedb/file_meta_data/account-photos.db';

let sessionDb = path.resolve(__dirname, '..','..',) + '/nedb/session/sessions.db';

let theShipmentsDb = path.resolve(__dirname, '..','..',) + '/nedb/shipment/shipments.db';

// Todo: Fix remove
let theAccountsInformationDb = path.resolve(__dirname, '..') + '/nedb/accounts-information.db';

db.accountsInformation = new Datastore(theAccountsInformationDb);
db.accountsInformation.loadDatabase(handleError);


db.accountsPhotos = new Datastore(theAccountPhotoDb);
db.accountsPhotos.loadDatabase(handleError);

db.companyPhotos = new Datastore(theCompanyPhotoDb);
db.companyPhotos.loadDatabase(handleError);

db.usersPhotos = new Datastore(theUsersPhotoDb);
db.usersPhotos.loadDatabase(handleError);


db.persons = new Datastore(thePersonsDb);
db.persons.loadDatabase(handleError);
db.persons.ensureIndex({ fieldName: 'personId', unique: true }, handleError);

db.organizations = new Datastore(theOrganizationDb);
db.organizations.loadDatabase(handleError);
db.organizations.ensureIndex({ fieldName: 'organizationId', unique: true }, handleError);

// authentication
db.credentials = new Datastore(theCredentialDb);
db.credentials.loadDatabase(handleError);
db.credentials.ensureIndex({ fieldName: 'credentialId', unique: true }, handleError);

db.credentialConfirmations = new Datastore(theCredentialConfirmationsDb);
db.credentialConfirmations.loadDatabase(handleError);
db.credentialConfirmations.ensureIndex({ fieldName: 'credentialConfirmationId', unique: true }, handleError);


// sites
db.sites = new Datastore(theSitesDb);
db.sites.loadDatabase(handleError);
db.sites.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);

db.streetAddresses = new Datastore(theStreetAddressDb);
db.streetAddresses.loadDatabase(handleError);
db.streetAddresses.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);

db.postOfficeBoxes = new Datastore(thePostOfficeBoxDb);
db.postOfficeBoxes.loadDatabase(handleError);
db.postOfficeBoxes.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);

db.telephones = new Datastore(theTelephoneDb);
db.telephones.loadDatabase(handleError);
db.telephones.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);

db.emails = new Datastore(theEmailDb);
db.emails.loadDatabase(handleError);
db.emails.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);

db.websites = new Datastore(theWebSiteDb);
db.websites.loadDatabase(handleError);
db.websites.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);


// reference data
db.dataTypes = new Datastore(theDataTypesDb);
db.dataTypes.loadDatabase(handleError);
db.dataTypes.ensureIndex({ fieldName: 'dataTypeId', unique: true }, handleError);

db.unitOfMeasures = new Datastore(theMeasuresDb);
db.unitOfMeasures.loadDatabase(handleError);
db.unitOfMeasures.ensureIndex({ fieldName: 'unitOfMeasureId', unique: true }, handleError);


// asset type
db.assets = new Datastore(theAssetsDb);
db.assets.loadDatabase(handleError);
db.assets.ensureIndex({ fieldName: 'assetId', unique: true }, handleError);

db.values = new Datastore(theValuesDb);
db.values.loadDatabase(handleError);
db.values.ensureIndex({ fieldName: 'valueId', unique: true }, handleError);

db.assetKinds = new Datastore(theAssetKindsDb);
db.assetKinds.loadDatabase(handleError);
db.assetKinds.ensureIndex({ fieldName: 'assetKindId', unique: true }, handleError);

db.assetTypeClasses = new Datastore(theAssetTypeClassesDb);
db.assetTypeClasses.loadDatabase(handleError);
db.assetTypeClasses.ensureIndex({ fieldName: 'assetTypeClassId', unique: true }, handleError);

db.assetTypes = new Datastore(theAssetTypesDb);
db.assetTypes.loadDatabase(handleError);
db.assetTypes.ensureIndex({ fieldName: 'assetTypeId', unique: true }, handleError);

db.attributes = new Datastore(theAttributesDb);
db.attributes.loadDatabase(handleError);
db.attributes.ensureIndex({ fieldName: 'attributeId', unique: true }, handleError);

db.sessions = new Datastore(sessionDb);
db.sessions.loadDatabase(handleError);

db.shipments = new Datastore(theShipmentsDb);
db.shipments.loadDatabase(function (err) { if (err) { console.log(err); }});

function handleError( err ) {
  if (err) {
    console.log(err);
  }
}

module.exports = db;

