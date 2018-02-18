let path = require('path');
var Datastore = require('nedb');
var db = {};

let theAttributesDb = path.resolve(__dirname, '..',) + '/nedb/attributes.db';
let theDataTypesDb =  path.resolve(__dirname,'..',) + '/nedb/data-types.db';
let theAssetTypesDb = path.resolve(__dirname,'..',) + '/nedb/asset-types.db';
let theAssetTypeClassesDb = path.resolve(__dirname,'..',) + '/nedb/asset-type-classes.db';
let theValuesDb = path.resolve(__dirname, '..',) + '/nedb/values.db';

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
