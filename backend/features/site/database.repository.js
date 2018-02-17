let uuidv5 = require('uuid/v5');
let Datastore = require('nedb');
let Rx = require("rxjs");
let path = require('path');
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");

let theStreetAddressDb = path.resolve(__dirname, '..','..',) + '/nedb/street-addresses.db';
let theTelephoneDb = path.resolve(__dirname, '..','..',) + '/nedb/telephones.db';
let theEmailDb = path.resolve(__dirname, '..','..',) + '/nedb/emails.db';
let theWebSiteDb = path.resolve(__dirname, '..','..',) + '/nedb/web-sites.db';
let thePostOfficeBoxDb = path.resolve(__dirname, '..','..',) + '/nedb/post-office-boxes.db';

let db = {};

db.streetAddresses = new Datastore(theStreetAddressDb);
db.streetAddresses.loadDatabase(function (err) { console.log(err); });

db.postOfficeBoxes = new Datastore(thePostOfficeBoxDb);
db.postOfficeBoxes.loadDatabase(function (err) { console.log(err); });

db.telephones = new Datastore(theTelephoneDb);
db.telephones.loadDatabase(function (err) { console.log(err); });

db.emails = new Datastore(theEmailDb);
db.emails.loadDatabase(function (err) { console.log(err); });

db.websites = new Datastore(theWebSiteDb);
db.websites.loadDatabase(function (err) { console.log(err); });


let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();

module.exports =  function DatabaseSiteRepository() {

  let defaultPageSize = 10;

  this.saveStreetAddress = function (streetAddress) {
    streetAddress.siteId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.streetAddresses.insert(streetAddress, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.savePostOfficeBox = function (postOfficeBox) {
    postOfficeBox.siteId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.postOfficeBoxes.insert(postOfficeBox, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.saveEmail = function (email) {
    email.siteId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.emails.insert(email, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });

  };

  this.saveWebSite = function (webSite) {
    webSite.siteId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.websites.insert(webSite, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });

  };

  this.saveTelephone = function (phone) {
    phone.siteId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.telephones.insert(phone, function (err, doc) {
        if (!err) {
          observer.next(phone);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });

  };

  this.getStreetAddress = function (siteId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.streetAddresses.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getPostOfficeBox = function (siteId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.postOfficeBoxes.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getEmail = function (siteId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.emails.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getWebSite = function (siteId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.websites.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getTelephoneBySiteId = function (siteId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.telephones.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getStreetAddresses = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.streetAddresses.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getPostOfficeBoxes = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.postOfficeBoxes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getEmails = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.emails.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getWebSites = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.websites.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
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
        observer.complete();
      });
    });
  };

  this.getStreetAddressCount = function () {
    return Rx.Observable.create(function (observer) {
      db.streetAddresses.count({}, function (err, count) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getPostOfficeBoxCount = function () {
    return Rx.Observable.create(function (observer) {
      db.postOfficeBoxes.count({}, function (err, count) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getEmailCount = function () {
    return Rx.Observable.create(function (observer) {
      db.emails.count({}, function (err, count) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getWebSiteCount = function () {
    return Rx.Observable.create(function (observer) {
      db.websites.count({}, function (err, count) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getTelephoneCount = function () {
    return Rx.Observable.create(function (observer) {
      db.telephones.count({}, function (err, count) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.updateStreetAddress = function (siteId, streetAddress) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.streetAddresses.update(query, streetAddress, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.updatePostOfficeBox = function (siteId, postOfficeBox) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.postOfficeBoxes.update(query, postOfficeBox, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.updateEmail = function (siteId, email) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.emails.update(query, email, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.updateWebSite = function (siteId, webSite) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.websites.update(query, webSite, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.updateTelephone = function (siteId, phone) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.telephones.update(query, phone, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.deleteStreetAddress = function (siteId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.streetAddresses.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.deletePostOfficeBox = function (siteId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.postOfficeBoxes.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.deleteEmail = function (siteId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.emails.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.deleteWebSite = function (siteId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.websites.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.deleteTelephone = function (siteId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["siteId"] = siteId;
      db.telephones.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.saveSite = function (Site) {
    Site.siteId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.sites.insert(Site, function (err, doc) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(Site);
        }
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
