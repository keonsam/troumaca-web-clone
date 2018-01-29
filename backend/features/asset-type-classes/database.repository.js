let Datastore = require('nedb');
let Rx = require("rxjs");
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require('../db.util');
let path = require('path');
let theAssetTypeClassesDb = path.resolve(__dirname, '..','..',) + '/nedb/asset-type-classes.db';


let db = {};
db.assetTypeClasses = new Datastore(theAssetTypeClassesDb);
db.assetTypeClasses.loadDatabase(function (err) { console.log(err); });

// function calculateSkip(page, size) {
//   if (page <= 1) {
//     return 0;
//   } else {
//     return ((page -1) * size);
//   }
// }

function buildPagedAssetListResponse(page, sort, assetTypeClasses) {
  return {
    page:page,
    sort:sort,
    assetTypeClasses:assetTypeClasses
  }
}

let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();

module.exports =  function DatabaseAssetRepository() {
  this.saveAssetTypeClass = function (assetTypeClass) {
    assetTypeClass.assetTypeClassId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.assetTypeClasses.insert(assetTypeClass, function (err, doc) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(assetTypeClass);
        }
        console.log('Inserted', doc.name, 'with ID', doc._id);
      });
    });
  };

  this.getAssetTypeClass = function(assetTypeClassId) {
    return Rx.Observable.create(function (observer) {
      try {
        db.assetTypeClasses.findOne({assetTypeClassId}, function (err, docs) {
          if (err) {
            observer.error(err);
          } else {
            console.log(docs);
            observer.next(docs);
          }
        });
      } catch (error) {
        observer.error(error);
      }
    });
  };

  this.getAssetTypeClasses = function (pagination) {
    return Rx.Observable.create(function (observer) {
      try {
        let paginationCopy = JSON.parse(JSON.stringify(pagination));

        let page = paginationCopy.page;
        page.number = parseInt(isNaN(pagination.page.number) ? 1 : pagination.page.number);
        page.size = parseInt(isNaN(pagination.page.size) ? 5 : pagination.page.size);

        let sort = paginationCopy.sort;
        sort.direction = (pagination.sort.direction ? pagination.sort.direction : "asc");
        sort.attributes = (pagination.sort.attributes ? pagination.sort.attributes : ["name"]);

        let sortAttribute = sort.attributes;
        let sortDirection = sort.direction;
        let calculateSkip2 = calculateSkip(page.number, page.size);

        db.assetTypeClasses.count({}, function (err, count) {
         page.items = count;
        });

        let skip = dbUtil.calcSkip(page.number, page.size, 10);

        db.assetTypeClasses.find({}).skip(skip).limit(page.size).exec(function (err, docs) {
          if (err) {
            observer.error(err);
          } else {
            const pagedAssetListResponse = buildPagedAssetListResponse(page, sort, docs);
            observer.next(pagedAssetListResponse);
          }
        });
      } catch (error) {
        observer.error(error);
      }
    });
  }

  this.deleteAssetTypeClass= function(assetTypeClassId) {
    return Rx.Observable.create(function (observer) {
      db.assetTypeClasses.remove({assetTypeClassId}, function (err, doc) {
        if (err) {
          observer.error(err);
        } else {
          observer.next("ok");
        }
      });
    });
 };

 this.updateAssetTypeClass = function(assetTypeClass) {
   return Rx.Observable.create(function (observer) {
     db.assetTypeClasses.update({assetTypeClassId: assetTypeClass.assetTypeClassId},{$set: assetTypeClass},{}, function (err, numAffected, affectedDocuments, upsert) {
       if (err) {
         observer.error(err);
       } else {
         observer.next(numAffected);
       }
     });
   });
 }
};
