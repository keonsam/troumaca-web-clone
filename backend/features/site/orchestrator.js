let SiteRepositoryFactory = require('./repository.factory')();
let siteRepository = SiteRepositoryFactory.createSiteRepository();
let responseShaper = require("./response.shaper")();


module.exports = function SiteOrchestrator() {

  this.saveSite = function (site) {
    return siteRepository.saveSite(Site);
  };
  this.saveStreetAddress = function (streetAddress) {
    return siteRepository.saveStreetAddress(streetAddress);
  }

  this.saveTelephone =  function(telephone) {
    return siteRepository.saveTelephone(telephone);
  };

  this.getStreetAddress = function (siteId) {
    return siteRepository.getStreetAddress(siteId);
  };
  
  this.getTelephoneBySiteId = function (siteId) {
    return siteRepository.getTelephoneBySiteId(siteId);
  };

  this.getStreetAddresses = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return siteRepository
    .getStreetAddresses(number, size, sort)
    .flatMap(value => {
      return siteRepository
        .getStreetAddressCount()
        .map(count => {
          return responseShaper.shapePhonesResponse("streetAddresses", value, number, size, value.length, count, sort);
        });
    });
  }

  this.getTelephones = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return siteRepository
    .getTelephones(number, size, sort)
    .flatMap(value => {
      return siteRepository
        .getTelephoneCount()
        .map(count => {
          return responseShaper.shapePhonesResponse("phones", value, number, size, value.length, count, sort);
        });
    });
  };
  this.updateStreetAddress = function (siteId, streetAddress) {
    return siteRepository.updateStreetAddress(siteId, streetAddress);
  };

  this.updateTelephone = function (siteId, phone) {
    return siteRepository.updateTelephone(siteId, phone);
  };

  this.deleteStreetAddress = function (siteId) {
    return siteRepository.deleteStreetAddress(siteId);
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
