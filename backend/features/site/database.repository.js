let uuidv5 = require('uuid/v5');
let Datastore = require('nedb');
let Rx = require("rxjs");
let path = require('path');
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");

let hostname = 'troumaca.com';

let theTelephoneDb = path.resolve(__dirname, '..','..',) + '/nedb/telephones.db';
let theEmailDb = path.resolve(__dirname, '..','..',) + '/nedb/emails.db';
let theWebSiteDb = path.resolve(__dirname, '..','..',) + '/nedb/web-sites.db';

let db = {};
db.telephones = new Datastore(theTelephoneDb);
db.telephones.loadDatabase(function (err) { console.log(err); });

db.emails = new Datastore(theEmailDb);
db.emails.loadDatabase(function (err) { console.log(err); });

db.websites = new Datastore(theWebSiteDb);
db.websites.loadDatabase(function (err) { console.log(err); });


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

let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();

module.exports =  function DatabaseSiteRepository() {

  let defaultPageSize = 10;

  this.saveTelephone = function (phone) {
    phone.siteId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.telephones.insert(phone, function (err, doc) {
        if (!err) {
          observer.next(phone);
        } else {
          observer.error(err);
        }
        console.log('Inserted', doc.name, 'with ID', doc._id);
        observer.complete();
      });
    });

  };

  this.getTelephones = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.telephones.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        console.log('Inserted', doc.name, 'with ID', doc._id);
        observer.complete();
      });
    });
  };

  function calcSkip(page, size) {
    return (number - 1) * size;
  }

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
