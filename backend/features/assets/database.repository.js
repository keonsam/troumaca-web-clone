let uuidv5 = require('uuid/v5');
let Datastore = require('nedb');
let Rx = require("rxjs");

let hostname = 'troumaca.com';

//{filename:'/Users/michael/IdeaProjects/troumaca-web/backend/nedb/assets.db',autoload: true,inMemoryOnly: false}

let db = {};
db.assets = new Datastore('/Users/michael/IdeaProjects/troumaca-web/backend/nedb/assets.db');
// db.assets = new Datastore(__dirname + '/../nedb/assets.db');
db.assets.loadDatabase(function (err) {    // Callback is optional
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

function buildPagedAssetListResponse(page, sort, assets) {
  return {
    page:page,
    sort:sort,
    assets:assets
  }
}

module.exports =  function DatabaseAssetRepository() {

  this.saveAsset = function (asset) {
    asset.assetId = uuidv5(hostname, uuidv5.DNS);
    return Rx.Observable.create(function (observer) {
      db.assets.insert(asset, function (err, doc) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(asset);
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
