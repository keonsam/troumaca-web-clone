import path from 'path';
import Datastore from 'nedb';

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



export let accountsInformation = new Datastore(theAccountsInformationDb);
accountsInformation.loadDatabase(handleError);

export let accountsPhotos = new Datastore(theAccountPhotoDb);
accountsPhotos.loadDatabase(handleError);

let companyPhotos = new Datastore(theCompanyPhotoDb);
companyPhotos.loadDatabase(handleError);


export let usersPhotos = new Datastore(theUsersPhotoDb);
usersPhotos.loadDatabase(handleError);


export let persons = new Datastore(thePersonsDb);
persons.loadDatabase(handleError);
persons.ensureIndex({ fieldName: 'personId', unique: true }, handleError);

export let organizations = new Datastore(theOrganizationDb);
organizations.loadDatabase(handleError);
organizations.ensureIndex({ fieldName: 'organizationId', unique: true }, handleError);

// authentication
export let credentials = new Datastore(theCredentialDb);
credentials.loadDatabase(handleError);
credentials.ensureIndex({ fieldName: 'credentialId', unique: true }, handleError);

export let credentialConfirmations = new Datastore(theCredentialConfirmationsDb);
credentialConfirmations.loadDatabase(handleError);
credentialConfirmations.ensureIndex({ fieldName: 'credentialConfirmationId', unique: true }, handleError);


// sites
export let sites = new Datastore(theSitesDb);
sites.loadDatabase(handleError);
sites.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);

export let streetAddresses = new Datastore(theStreetAddressDb);
streetAddresses.loadDatabase(handleError);
streetAddresses.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);

export let postOfficeBoxes = new Datastore(thePostOfficeBoxDb);
postOfficeBoxes.loadDatabase(handleError);
postOfficeBoxes.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);

export let telephones = new Datastore(theTelephoneDb);
telephones.loadDatabase(handleError);
telephones.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);

export let emails = new Datastore(theEmailDb);
emails.loadDatabase(handleError);
emails.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);

export let websites = new Datastore(theWebSiteDb);
websites.loadDatabase(handleError);
websites.ensureIndex({ fieldName: 'siteId', unique: true }, handleError);


// reference data
export let dataTypes = new Datastore(theDataTypesDb);
dataTypes.loadDatabase(handleError);
dataTypes.ensureIndex({ fieldName: 'dataTypeId', unique: true }, handleError);

export let unitOfMeasures = new Datastore(theMeasuresDb);
unitOfMeasures.loadDatabase(handleError);
unitOfMeasures.ensureIndex({ fieldName: 'unitOfMeasureId', unique: true }, handleError);


// asset type
export let assets = new Datastore(theAssetsDb);
assets.loadDatabase(handleError);
assets.ensureIndex({ fieldName: 'assetId', unique: true }, handleError);

export let values = new Datastore(theValuesDb);
values.loadDatabase(handleError);
values.ensureIndex({ fieldName: 'valueId', unique: true }, handleError);

export let assetKinds = new Datastore(theAssetKindsDb);
assetKinds.loadDatabase(handleError);
assetKinds.ensureIndex({ fieldName: 'assetKindId', unique: true }, handleError);

export let assetTypeClasses = new Datastore(theAssetTypeClassesDb);
assetTypeClasses.loadDatabase(handleError);
assetTypeClasses.ensureIndex({ fieldName: 'assetTypeClassId', unique: true }, handleError);

export let assetTypes = new Datastore(theAssetTypesDb);
assetTypes.loadDatabase(handleError);
assetTypes.ensureIndex({ fieldName: 'assetTypeId', unique: true }, handleError);

export let attributes = new Datastore(theAttributesDb);
attributes.loadDatabase(handleError);
attributes.ensureIndex({ fieldName: 'attributeId', unique: true }, handleError);

export let sessions = new Datastore(sessionDb);
sessions.loadDatabase(handleError);

export let shipments = new Datastore(theShipmentsDb);
shipments.loadDatabase(function (err) { if (err) { console.log(err); }});

function handleError( err:any ) {
  if (err) {
    console.log(err);
  }
}
