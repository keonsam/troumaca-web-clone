let uuidv5 = require('uuid/v5');
let Datastore = require('nedb');
let Rx = require("rxjs");
var path = require('path'),
    __parentDir = path.resolve(__dirname, '..','..',) + '/nedb/Sites.db';

let hostname = 'troumaca.com';

let db = {};
db.Sites = new Datastore(__parentDir);
db.Sites.loadDatabase(function (err) {    // Callback is optional
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

function buildPagedSiteListResponse(page, sort, Sites) {
  return {
    page:page,
    sort:sort,
    Sites:Sites
  }
}

module.exports =  function DatabaseSiteRepository() {

  this.saveSite = function (Site) {
    Site.SiteId = uuidv5(hostname, uuidv5.DNS);
    return Rx.Observable.create(function (observer) {
      db.Sites.insert(Site, function (err, doc) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(Site);
        }
        console.log('Inserted', doc.name, 'with ID', doc._id);
      });
    });

  };

  this.getSites = function (pagination) {
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

        db.Sites.count({}, function (err, count) {
         page.items = count;
        });

        db.Sites.find({}).skip(calculateSkip2).limit(page.size).exec(function (err, docs) {
          if (err) {
            observer.error(err);
          } else {
            const pagedSiteListResponse = buildPagedSiteListResponse(page, sort, docs);
            observer.next(pagedSiteListResponse);
          }
        });
      } catch (error) {
        observer.error(error);
      }
    });
  }
};
