let uuidv5 = require('uuid/v5');
let Datastore = require('nedb');
let Rx = require("rxjs");
let path = require('path');
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");

let hostname = 'troumaca.com';

let theAttributesDb = path.resolve(__dirname, '..','..',) + '/nedb/attributes.db';

let db = {};
db.attributes = new Datastore(theAttributesDb);
db.attributes.loadDatabase(function (err) { console.log(err); });

function calculateSkip(page, size) {
  if (page <= 1) {
    return 0;
  } else {
    return ((page -1) * size);
  }
}

function buildPagedAttributeListResponse(page, sort, attributes) {
  return {
    page:page,
    sort:sort,
    attributes: attributes
  }
}

let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();

module.exports =  function DatabaseAttributeRepository() {

  let defaultPageSize = 10;

  this.saveAttributes = function (attribute) {
    attribute.attributeId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.attributes.insert(attribute, function (err, doc) {
        if (!err) {
          observer.next(attribute);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });

  };

}
