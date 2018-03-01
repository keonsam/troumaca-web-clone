let SiteRepositoryFactory = require('./repository.factory')();
let siteRepository = SiteRepositoryFactory.createSiteRepository();
let responseShaper = require("./response.shaper")();


module.exports = function SiteOrchestrator() {

  this.saveSite = function (site) {
    return siteRepository.saveSite(Site);
  };

  this.saveStreetAddress = function (streetAddress) {
    return siteRepository.saveStreetAddress(streetAddress);
  };

  this.savePostOfficeBox = function (postOfficeBox) {
    return siteRepository.savePostOfficeBox(postOfficeBox);
  };

  this.saveEmail = function (email) {
    return siteRepository.saveEmail(email);
  };

  this.saveWebSite = function (webSite) {
    return siteRepository.saveWebSite(webSite);
  };

  this.saveTelephone =  function(telephone) {
    return siteRepository.saveTelephone(telephone);
  };

  this.getStreetAddress = function (siteId) {
    return siteRepository.getStreetAddress(siteId);
  };

  this.getPostOfficeBox = function (siteId) {
    return siteRepository.getPostOfficeBox(siteId);
  }

  this.getEmail = function (siteId) {
    return siteRepository.getEmail(siteId);
  }

  this.getWebSite = function (siteId) {
    return siteRepository.getWebSite(siteId);
  }

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

  this.getPostOfficeBoxes = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return siteRepository
    .getPostOfficeBoxes(number, size, sort)
    .flatMap(value => {
      return siteRepository
        .getPostOfficeBoxCount()
        .map(count => {
          return responseShaper.shapePhonesResponse("postOfficeBoxes", value, number, size, value.length, count, sort);
        });
    });
  };

  this.getEmails = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return siteRepository
    .getEmails(number, size, sort)
    .flatMap(value => {
      return siteRepository
        .getEmailCount()
        .map(count => {
          return responseShaper.shapePhonesResponse("emails", value, number, size, value.length, count, sort);
        });
    });
  };

  this.getWebSites = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return siteRepository
    .getWebSites(number, size, sort)
    .flatMap(value => {
      return siteRepository
        .getWebSiteCount()
        .map(count => {
          return responseShaper.shapePhonesResponse("webSites", value, number, size, value.length, count, sort);
        });
    });
  };

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

  this.updatePostOfficeBox = function (siteId, postOfficeBox) {
    return siteRepository.updatePostOfficeBox(siteId, postOfficeBox);
  }

  this.updateEmail = function (siteId, email) {
    return siteRepository.updateEmail(siteId, email);
  }

  this.updateWebSite = function (siteId, webSite) {
    return siteRepository.updateWebSite(siteId, webSite);
  }

  this.updateTelephone = function (siteId, phone) {
    return siteRepository.updateTelephone(siteId, phone);
  };

  this.deleteStreetAddress = function (siteId) {
    return siteRepository.deleteStreetAddress(siteId);
  };

  this.deletePostOfficeBox = function (siteId) {
    return siteRepository.deletePostOfficeBox(siteId);
  };

  this.deleteEmail = function (siteId) {
    return siteRepository.deleteEmail(siteId);
  };

  this.deleteWebSite = function (siteId) {
    return siteRepository.deleteWebSite(siteId);
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