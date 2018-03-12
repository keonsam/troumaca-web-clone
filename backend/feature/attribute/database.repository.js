let Rx = require("rxjs");
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");
let db = require("../db.js");

let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();

module.exports =  function DatabaseAttributeRepository() {

  let defaultPageSize = 10;

  this.getAttributes = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.attributes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getDataTypes = function () {

    // use this to add to the database
    /*let toSave = {
      "dataTypeId": "",
      "name": "boolean"
    }
    toSave.dataTypeId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.dataTypes.insert(toSave, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    }); */
    return Rx.Observable.create(function (observer) {
      db.dataTypes.find({}, function (err, docs) {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getAttributeCount = function () {
    return Rx.Observable.create(function (observer) {
      db.attributes.count({}, function (err, count) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getAttributeById = function (attributeId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["attributeId"] = attributeId;
      db.attributes.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addAttribute = function (attribute) {
    attribute.attributeId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.attributes.insert(attribute, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });

  };

  this.updateAttribute = function (attributeId, attribute) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["attributeId"] = attributeId;
      db.attributes.update(query, attribute, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.deleteAttribute = function (attributeId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["attributeId"] = attributeId;
      db.attributes.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

}
