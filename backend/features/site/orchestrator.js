let SiteRepositoryFactory = require('./repository.factory')();
let siteRepository = SiteRepositoryFactory.createSiteRepository();

module.exports = function SiteOrchestrator() {

  let that = this;

  this.saveSite = function (site) {
    return siteRepository.saveSite(Site);
  };

  this.saveTelephone =  function(telephone) {
    return siteRepository.saveTelephone(telephone);
  };

  this.getTelephones = function (number, size, order) {
    return siteRepository.getTelephone(number, size, order);
  };

  this.getSites = function (pagination) {
   return siteRepository.getSites(pagination);
  };

};
