let SiteRepositoryFactory = require('./repository.factory')();
let SiteRepository = SiteRepositoryFactory.createSiteRepository();

module.exports = function SiteOrchestrator() {

  let that = this;
  this.saveSite = function (Site) {
    return SiteRepository.saveSite(Site);
  };

  this.getSites = function (pagination) {
   return SiteRepository.getSites(pagination);
  };

};
