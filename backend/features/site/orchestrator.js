let SiteRepositoryFactory = require('./repository.factory')();
let siteRepository = SiteRepositoryFactory.createSiteRepository();
let responseShaper = require("./response.shaper")();


module.exports = function SiteOrchestrator() {

  this.saveSite = function (site) {
    return siteRepository.saveSite(Site);
  };

  this.saveTelephone =  function(telephone) {
    return siteRepository.saveTelephone(telephone);
  };

  this.getTelephoneBySiteId = function (siteId) {
    return siteRepository.getTelephoneBySiteId(siteId);
  };

  this.getTelephones = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return siteRepository
    .getTelephones(number, size, sort)
    .flatMap(value => {
      return siteRepository
        .getTelephoneCount()
        .map(count => {
          return responseShaper.shapePhonesResponse(value, number, size, value.length, count, sort);
        });
    });
  };

  this.updateTelephone = function (siteId, phone) {
    return siteRepository.updateTelephone(siteId, phone);
  };

  this.deleteTelephone = function (siteId) {
    return siteRepository.deleteTelephone(siteId);
  };

  this.getSites = function (pagination) {
   return siteRepository.getSites(pagination);
  };

  function getSortOrderOrDefault(field, direction) {
    let sort = {};
    if (field && direction) {
      sort[field] = direction;
      return sort;
    } else {
      return sort;
    }
  }

};
