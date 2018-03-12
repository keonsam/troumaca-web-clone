let Rx = require("rxjs");
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");
let db = require("../db.js");

let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();

module.exports =  function DatabaseShipmentRepository() {

  let defaultPageSize = 10;

  this.getShipments = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.shipments.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getShipmentCount = function () {
    return Rx.Observable.create(function (observer) {
      db.shipments.count({}, function (err, count) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getShipmentById = function (shipmentId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["shipmentId"] = shipmentId;
      db.shipments.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addShipment = function (shipment) {
    shipment.shipmentId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.shipments.insert(shipment, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });

  };

  this.updateShipment = function (shipmentId, shipment) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["shipmentId"] = shipmentId;
      db.shipments.update(query, shipment, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.deleteShipment = function (shipmentId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["shipmentId"] = shipmentId;
      db.shipments.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

};
