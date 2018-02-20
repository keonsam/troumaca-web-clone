let uuidv5 = require('uuid/v5');
let Datastore = require('nedb');
let Rx = require("rxjs");
let path = require('path');
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");
let db = require("../db.js")

let hostname = 'troumaca.com';

let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();

let defaultPageSize = 10;

module.exports =  function DatabaseAssetRepository() {

  this.saveAsset = function (asset) {
    asset.assetId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.assets.insert(asset, function (err, doc) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(asset);
        }
        observer.complete();
      });
    });
  };

  this.getAssets = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.assets.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
};

this.getAssetTypes = function (searchStr, pageSize) {
  searchStr = new RegExp(searchStr);
  return Rx.Observable.create(function (observer) {
    db.assetTypes.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
      if (!err) {
        observer.next(doc);
      } else {
        observer.error(err);
      }
      observer.complete();
    });
  });
};

this.getAssetKinds = function () {

      // use this to add to the database
      /*let toSave = [{
        "assetKindId":"4cf11077-c5e3-41f3-b40b-6e89dce6e9c8",
        "name":"Discrete Item"
      }, {
        "assetKindId":"65694257-0aa8-4fb6-abb7-e6c7b83cf4f2",
        "name":"Inventory"
      }];

      return Rx.Observable.create(function (observer) {
        db.assetKinds.insert(toSave, function (err, doc) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      }); */

  return Rx.Observable.create(function (observer) {
    db.assetKinds.find({}, function (err, doc) {
      if (!err) {
        console.log(doc)
        observer.next(doc);
      } else {
        observer.error(err);
      }
      observer.complete();
    });
  });
};

this.getUnionOfPhysicalSites = function (searchStr, pageSize) {

      // use this to add to the database
    /*  let toSave = [{
          siteId: "01615ccc-74a8-41da-b052-c590ea05f056",
          name: "Home",
          describe: "Home Address",
          city: "Los Angeles",
          stateOrProvince: "California",
          postalCode: "90064",
          country: "USA",
          streetNumber: "2425",
          street: "Purdue Ave",
          apartmentOrSuite: "303",
          floor: "3",
          postOfficeBoxNumber: "P.O. Box 1300"
        }, {
          siteId: "01615ccc-74a8-41da-b052-c590ea05f056",
          name: "Work",
          describe: "Work Address",
          city: "Los Angeles",
          stateOrProvince: "California",
          postalCode: "90036",
          country: "USA",
          street: "Wilshire Blvd",
          streetNumber: "5757",
          apartmentOrSuite: "204",
          floor: "2",
          postOfficeBoxNumber: "P.O. Box 7300"
        }];

      return Rx.Observable.create(function (observer) {
        db.sites.insert(toSave, function (err, doc) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      }); */

  searchStr = new RegExp(searchStr);
  return Rx.Observable.create(function (observer) {
    db.sites.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
      if (!err) {
        observer.next(doc);
      } else {
        observer.error(err);
      }
      observer.complete();
    });
  });
};

this.getUnitOfMeasures = function (searchStr, pageSize) {
  /*let toSave = [{
    unitOfMeasureId: "46ecc167-d372-431a-aa62-df43e990c8e0",
    quantity: "length",
    name: "meter",
    symbol: "m",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "c32278a6-86a6-41c1-bbef-7095a1e63f38",
    quantity: "mass",
    name: "kilogram",
    symbol: "kg",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "4eea084c-d7fc-11e7-9296-cec278b6b50a",
    quantity: "time",
    name: "second",
    symbol: "A",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "68eec2f0-d7fc-11e7-9296-cec278b6b50a",
    quantity: "electric current",
    name: "ampere",
    symbol: "s",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "a7fcd7e8-d7fc-11e7-9296-cec278b6b50a",
    quantity: "thermodynamic temperature",
    name: "kelvin",
    symbol: "K",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "b655f252-d7fc-11e7-9296-cec278b6b50a",
    quantity: "amount of substance",
    name: "mole",
    symbol: "mol",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "bea45f0c-d7fc-11e7-9296-cec278b6b50a",
    quantity: "luminous intensity",
    name: "candela",
    symbol: "cd",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "c532fd56-d7fc-11e7-9296-cec278b6b50a",
    quantity: "area",
    name: "square meter",
    symbol: "m²",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "f1364362-d7fd-11e7-9296-cec278b6b50a",
    quantity: "volume",
    name: "cubic meter",
    symbol: "m³",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "fd54220e-d7fd-11e7-9296-cec278b6b50a",
    quantity: "volume",
    name: "cubic meter",
    symbol: "m³",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "ba0608cc-d7fe-11e7-9296-cec278b6b50a",
    quantity: "speed, velocity",
    name: "meter per second",
    symbol: "m/s²",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "c605eeb2-d7fe-11e7-9296-cec278b6b50a",
    quantity: "wave number",
    name: "reciprocal meter",
    symbol: "m⁻¹",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "d1acfefe-d7fe-11e7-9296-cec278b6b50a",
    quantity: "mass density",
    name: "kilogram per cubic meter",
    symbol: "kg/m³",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "da9e69da-d7fe-11e7-9296-cec278b6b50a",
    quantity: "specific volume",
    name: "cubic meter per kilogram",
    symbol: "m³/kg",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "e29ca200-d7fe-11e7-9296-cec278b6b50a",
    quantity: "specific volume",
    name: "cubic meter per kilogram",
    symbol: "m³/kg",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "780d9ace-d7ff-11e7-9296-cec278b6b50a",
    quantity: "current density",
    name: "ampere per square meter",
    symbol: "A/m²",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "8369a05c-d7ff-11e7-9296-cec278b6b50a",
    quantity: "magnetic field strength  ",
    name: "ampere per meter",
    symbol: "A/m",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "8eeceeca-d7ff-11e7-9296-cec278b6b50a",
    quantity: "amount-of-substance concentration",
    name: "mole per cubic meter",
    symbol: "mol/m³",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "9617bf2c-d7ff-11e7-9296-cec278b6b50a",
    quantity: "luminance",
    name: "candela per square meter",
    symbol: "cd/m²",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "a1b84afe-d7ff-11e7-9296-cec278b6b50a",
    quantity: "mass fraction",
    name: "kilogram per kilogram, which may be represented by the number 1",
    symbol: "kg/kg = 1",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }];

  return Rx.Observable.create(function (observer) {
    db.unitOfMeasures.insert(toSave, function (err, doc) {
      if (!err) {
        observer.next(doc);
      } else {
        observer.error(err);
      }
      observer.complete();
    });
  }); */

  searchStr = new RegExp(searchStr);
  return Rx.Observable.create(function (observer) {
    db.unitOfMeasures.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
      if (!err) {
        observer.next(doc);
      } else {
        observer.error(err);
      }
      observer.complete();
    });
  });
};

this.getPersons = function (searchStr, pageSize) {
  /*let toSave = [{
    partyId: "c27f82c3-d441-46fe-900b-671716cdbc97",
    firstName: "Michael",
    middleName: "Frederick",
    lastName: "Williams",
    dateOfBirth: ""
  }, {
    partyId: "093fbe85-fcbe-46a4-bed1-bc938f6ed96b",
    firstName: "Margurite",
    middleName: "Roberta",
    lastName: "Williams",
    dateOfBirth: ""
  }, {
    partyId: "093fbe85-fcbe-46a4-bed1-bc938f6ed96b",
    firstName: "Kessel",
    middleName: "Marnell",
    lastName: "Abraham",
    dateOfBirth: ""
  }];

  return Rx.Observable.create(function (observer) {
    db.persons.insert(toSave, function (err, doc) {
      if (!err) {
        observer.next(doc);
      } else {
        observer.error(err);
      }
      observer.complete();
    });
  }); */

  searchStr = new RegExp(searchStr);
  return Rx.Observable.create(function (observer) {
    db.persons.find({name: {$regex: searchStr}}).limit(pageSize).exec(function (err, doc) {
      if (!err) {
        observer.next(doc);
      } else {
        observer.error(err);
      }
      observer.complete();
    });
  });
};

this.getAssetCount = function () {
  return Rx.Observable.create(function (observer) {
    db.assets.count({}, function (err, count) {
      if (!err) {
        observer.next(count);
      } else {
        observer.error(err);
      }
      observer.complete();
    });
  });
};

this.getAssetById = function (assetId) {
  return Rx.Observable.create(function (observer) {
    let query = {};
    query["assetId"] = assetId;
    db.assets.findOne(query, function (err, doc) {
      if (!err) {
        observer.next(doc);
      } else {
        observer.error(err);
      }
      observer.complete();
    });
  });
};

this.updateAsset = function (assetId, asset) {
  return Rx.Observable.create(function (observer) {
    let query = {};
    query["assetId"] = assetId;
    db.assets.update(query, asset, {}, function (err, numReplaced) {
      if (!err) {
        observer.next(numReplaced);
      } else {
        observer.error(err);
      }
      observer.complete();
    })
  });
};

this.deleteAsset = function (assetId) {
  return Rx.Observable.create(function (observer) {
    let query = {};
    query["assetId"] = assetId;
    db.assets.remove(query, {}, function (err, numRemoved) {
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
