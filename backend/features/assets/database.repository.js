let Rx = require("rxjs");
const Datastore = require('nedb');
// const db = new Datastore({filename: __dirname+'/assets.db', autoload: true});
let db = {};
db.users = new Datastore('../../nedb/assets.db');

function calculateSkip(page, size) {
  if (page <= 1) {
    return 0;
  } else {
    return ((page -1) * size);
  }
}

function calculatePageStart(page, size) {
  if (page <= 1) {
    return 1;
  } else {
    return ((page -1) * size) + 1;
  }
}

function buildPagedAssetListResponse(page, sort, assets) {
  return {
    page:page,
    sort:sort,
    assets:assets
  }
}

/*var   pagination = {
  page: {
    number: 1,
    size: 3,
    items: 1
  },
  sort: {
    direction: "asc",
    attributes: [{
      name:"name"
    }]
  }
};*/

module.exports =  function DatabaseAssetRepository() {

  this.saveAsset = function (asset) {
    var newAsset = {
      "assetKindId": asset._assetKindId
    };
    return Rx.Observable.create(function (observer) {
      console.log(asset);
      db.insert(newAsset, function (err, doc) {
        if (err) {
          observer.onError(err);
        } else {
          observer.onNext(doc);
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

        let sort = paginationCopy.sort;
        sort.direction = (pagination.sort.direction ? pagination.sort.direction : "asc");
        sort.attributes = (pagination.sort.attributes ? pagination.sort.attributes : ["name"]);

        let sortAttribute = sort.attributes;
        let sortDirection = sort.direction;
        let calculateSkip2 = calculateSkip(paginationCopy.page.number, paginationCopy.page.size);

        let docsArr = [];
        db.find({}).skip(calculateSkip).limit(page.size).exec(function (err, docs){
          if(err) {
            observer.onError(err);
          } else {
            observer.onNext(docs);
          }
        });
      } catch (error) {
        observer.onError(error);
      }
    });
  }
};
