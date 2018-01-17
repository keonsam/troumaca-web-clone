let Rx = require("rxjs");
const Datastore = require('nedb');
const db = new Datastore({filename: __dirname+'/assets.db', autoload: true});

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
    console.log(asset);
    db.insert(asset, function(err, doc){
      if(err) throw err;
      console.log('Inserted', doc.name, 'with ID', doc._id);
    });
    return Rx.Observable.of({
     assetId:"1231",
   });
  }

  this.getAssets = function (pagination) {
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
    // res.send('Express REST API');
    /*if (totalItems > calculateSkip2 ) {
      let end = calculateSkip2 + paginationCopy.page.size;
      let items;
      if (end >= totalItems) {
        items = assetList.slice(calculateSkip2);
      } else {
        items = assetList.slice(calculateSkip2, end);
      }

      let pagedAssetListResponse = buildPagedAssetListResponse(page, sort, items);
      //res.send(JSON.stringify(pagedAssetListResponse));
    } else {
      let pagedAssetListResponse = buildPagedAssetListResponse(page, sort, []);
      //res.send(JSON.stringify(pagedAssetListResponse));
    } */
    db.find({})/*.sort({ sortDirection: sortAttribute  })*/.skip(calculateSkip).limit(page.size).exec(function (err, docs){
    if(err) throw err;
    docsArr = docs;
    });
    return Rx.Observable.of({
    docs: docsArr
    });
  }
};
