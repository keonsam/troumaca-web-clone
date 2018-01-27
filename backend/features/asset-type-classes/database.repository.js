let uuidv5 = require('uuid/v5');
let Datastore = require('nedb');
let Rx = require("rxjs");
var path = require('path'),
    __parentDir = path.resolve(__dirname, '..','..',) + '/nedb/asset-type-classes.db';

let hostname = 'troumaca.com';

let db = {};
db.assetTypeClasses = new Datastore(__parentDir);
db.assetTypeClasses.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
  console.log(err);
});

function calculateSkip(page, size) {
  if (page <= 1) {
    return 0;
  } else {
    return ((page -1) * size);
  }
}

function buildPagedAssetListResponse(page, sort, assetTypeClasses) {
  return {
    page:page,
    sort:sort,
    assetTypeClasses:assetTypeClasses
  }
}


module.exports =  function DatabaseAssetRepository() {
  this.saveAssetTypeClass = function (assetTypeClass) {
    assetTypeClass.assetTypeClassId = uuidv5(hostname, uuidv5.DNS);
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
    console.log("this was called");
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
  }

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

        db.assetTypeClasses.find({}).skip(calculateSkip2).limit(page.size).exec(function (err, docs) {
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
 }
};
