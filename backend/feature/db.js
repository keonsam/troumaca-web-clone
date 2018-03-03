let path = require('path');
var Datastore = require('nedb');
var db = {};

let theAttributesDb = path.resolve(__dirname, '..',) + '/nedb/attributes.db';
let theDataTypesDb =  path.resolve(__dirname,'..',) + '/nedb/data-types.db';
let theAssetTypesDb = path.resolve(__dirname,'..',) + '/nedb/asset-types.db';
let theAssetTypeClassesDb = path.resolve(__dirname,'..',) + '/nedb/asset-type-classes.db';
let theValuesDb = path.resolve(__dirname, '..',) + '/nedb/values.db';
let theAssetsDb = path.resolve(__dirname, '..',) + '/nedb/assets.db';
let theSitesDb = path.resolve(__dirname, '..',) + '/nedb/sites.db';
let theMeasuresDb = path.resolve(__dirname, '..',) + '/nedb/unit-of-measures.db';
let thePersonsDb = path.resolve(__dirname, '..',) + '/nedb/persons.db';
let theAssetKindsDb = path.resolve(__dirname, '..',) + '/nedb/asset-kinds.db';
let theCredentialDb = path.resolve(__dirname, '..',) + '/nedb/credentials.db';
let theUsersPhotoDb = path.resolve(__dirname, '..',) + '/nedb/file_meta_data/users-photos.db';

db.usersPhotos = new Datastore(theUsersPhotoDb);
db.usersPhotos.loadDatabase(function (err) { console.log(err); });

db.credentials = new Datastore(theCredentialDb);
db.credentials.loadDatabase(function (err) { console.log(err); });

db.assetKinds = new Datastore(theAssetKindsDb);
db.assetKinds.loadDatabase(function (err) { console.log(err); });

db.sites = new Datastore(theSitesDb);
db.sites.loadDatabase(function (err) { console.log(err); });

db.unitOfMeasures = new Datastore(theMeasuresDb);
db.unitOfMeasures.loadDatabase(function (err) { console.log(err); });

db.persons = new Datastore(thePersonsDb);
db.persons.loadDatabase(function (err) { console.log(err); });

db.assets = new Datastore(theAssetsDb);
db.assets.loadDatabase(function (err) { console.log(err); });

db.values = new Datastore(theValuesDb);
db.values.loadDatabase(function (err) { console.log(err); });

db.assetTypeClasses = new Datastore(theAssetTypeClassesDb);
db.assetTypeClasses.loadDatabase(function (err) { console.log(err); });

db.assetTypes = new Datastore(theAssetTypesDb);
db.assetTypes.loadDatabase(function (err) { console.log(err); });

db.attributes = new Datastore(theAttributesDb);
db.attributes.loadDatabase(function (err) { console.log(err); });

db.dataTypes = new Datastore(theDataTypesDb);
db.dataTypes.loadDatabase(function (err) { console.log(err); });

module.exports = db;