let path = require('path');
var Datastore = require('nedb');
var db = {};
let theAttributesDb = path.resolve(__dirname, '..',) + '/nedb/attributes.db';

let theDataTypesDb =  path.resolve(__dirname, '..','..',) + '/nedb/data-types.db';

db.attributes = new Datastore(theAttributesDb);
db.attributes.loadDatabase(function (err) { console.log(err); });

db.dataTypes = new Datastore(theDataTypesDb);
db.dataTypes.loadDatabase(function (err) { console.log(err); });

module.exports = db;
