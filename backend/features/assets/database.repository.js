let Rx = require("rxjs");
const Datastore = require('nedb');
// const db = new Datastore({filename: __dirname+'/assets.db', autoload: true});
let db = {};
db.assets = new Datastore('../nedb/assets.db');

db.assets.loadDatabase();

function calculateSkip(page, size) {
  if (page <= 1) {
    return 0;
  } else {
    return ((page -1) * size);
  }
}

function buildPagedAssetListResponse(page, sort, assets) {
  return {
    page:page,
    sort:sort,
    assets:assets
  }
}

module.exports =  function DatabaseAssetRepository() {

  this.saveAsset = function (asset) {
    let newAsset = {
      assetKindId: asset._assetKindId,
      assetType: asset._assetType.assetTypeId,
      person: asset._person,
      site: asset._site
    };

    if (newAsset.assetKindId == "65694257-0aa8-4fb6-abb7-e6c7b83cf4f2") {
      newAsset.quantity = asset._quantity;
      newAsset.unitOfMeasure = asset._unitOfMeasure._unitOfMeasureId;
    } else {
     newAsset.serialNumber = asset._serialNumber;
    }

    return Rx.Observable.create(function (observer) {
      db.assets.insert(newAsset, function (err, doc) {
        if (err) {
          observer.error(err);
        } else {
          observer.next();
        }
        console.log('Inserted', doc.name, 'with ID', doc._id);
      });
    });

  };

  this.getAssets = function (pagination) {
    return Rx.Observable.create(function (observer) {
      try {
        let paginationCopy = JSON.parse(JSON.stringify(pagination));

        let page = paginationCopy.page;
        page.number = parseInt(isNaN(pagination.page.number) ? 1 : pagination.page.number);
        page.size = parseInt(isNaN(pagination.page.size) ? 5 : pagination.page.size);
        //page.items = 20;

        let sort = paginationCopy.sort;
        sort.direction = (pagination.sort.direction ? pagination.sort.direction : "asc");
        sort.attributes = (pagination.sort.attributes ? pagination.sort.attributes : ["name"]);

        let sortAttribute = sort.attributes;
        let sortDirection = sort.direction;
        let calculateSkip2 = calculateSkip(page.number, page.size);

        db.assets.count({}, function (err, count) {
         page.items = count;
        });

        db.assets.find({}).skip(calculateSkip2).limit(page.size).exec(function (err, docs) {
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
};
