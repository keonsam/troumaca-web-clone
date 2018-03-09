let Rx = require("rxjs");
let PartyRepositoryFactory = require('./repository.factory')();
let partyRepository = PartyRepositoryFactory.createPartyRepository();
let sessionRepositoryFactory = require('../session/session.repository.factory').SessionRepositoryFactory;
let sessionRepository = sessionRepositoryFactory.createRepository();
let responseShaper = require("./response.shaper")();
let UUIDGenerator = require("../uuid.generator");
let newUuidGenerator = new UUIDGenerator();

module.exports = function PartyOrchestrator() {

  this.getPersons = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return partyRepository
    .getPersons(number, size, sort)
    .flatMap(value => {
      return partyRepository
        .getPersonCount()
        .map(count => {
          return responseShaper.shapePartiesResponse("persons",value, number, size, value.length, count, sort);
        });
    });
  };

  this.getOrganizations = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return partyRepository
    .getOrganizations(number, size, sort)
    .flatMap(value => {
      return partyRepository
        .getOrganizationCount()
        .map(count => {
          return responseShaper.shapePartiesResponse("organizations",value, number, size, value.length, count, sort);
        });
    });
  };

  this.getPerson = function (partyId) {
    return partyRepository.getPerson(partyId);
  };

  this.getOrganization = function (partyId) {
    return partyRepository.getOrganization(partyId);
  };

  this.getUserPhoto = function (partyId) {
    return partyRepository.getUserPhoto(partyId);
  };

  this.getCompanyPhoto = function (partyId) {
    return partyRepository.getCompanyPhoto(partyId);
  };

  this.addPerson = function (person){
    return partyRepository.addPerson(person);
  };

  this.addOrganization = function (organization){
    return partyRepository.addOrganization(organization);
  };

  this.addCredential = function (credential){
    return partyRepository.addCredential(credential);
  };

  this.addAccountPhoto = function (partyId, imageStr) {
    return partyRepository.addAccountPhoto(partyId, imageStr);
  };


  this.createAccount = function (account, sessionId) {
     return sessionRepository
     .getSessionById(sessionId)
    .switchMap(session =>{
      let partyId = newUuidGenerator.generateUUID();
      session["partyId"] = partyId;
      account["partyId"] = partyId;
      return sessionRepository.updateSession(sessionId, session)
      .switchMap(numReplaced => {
        return partyRepository
        .addPartyIdConfirmedAccount(partyId, session.credentialId)
        .switchMap(numReplaced => {
          return partyRepository.createAccount(account);
        });
      });
    });
  };

  this.deletePerson = function (partyId) {
    return partyRepository.deletePerson(partyId)
    .flatMap(value => {
      return partyRepository.deleteCredential(partyId);
    });
  };

  this.deleteOrganization = function (partyId) {
    return partyRepository.deleteOrganization(partyId);
  };

  this.deleteCredential = function (partyId) {
    return partyRepository.deleteCredential(partyId);
  }

  this.updatePerson = function (partyId, person) {
    return partyRepository.updatePerson(partyId, person);
  }

  this.updateCredential = function (partyId, credential) {
    return partyRepository.updateCredential(partyId, credential);
  }

  this.updateOrganization = function (partyId, organization) {
    return partyRepository.updateOrganization(partyId, organization);
  }

  this.updateOrAddUserPhoto = function (partyId, imageStr) {
    return partyRepository
    .getUserPhoto(partyId)
    .flatMap(value => {
      if(value){
        return partyRepository.updateUserPhoto(partyId, imageStr);
      }else{
        return partyRepository.addUserPhoto(partyId, imageStr);
      }
    });
  }

  this.updateOrAddCompanyPhoto = function (partyId, imageStr) {
    return partyRepository
    .getCompanyPhoto(partyId)
    .flatMap(value => {
      if(value){
        return partyRepository.updateCompanyPhoto(partyId, imageStr);
      }else{
        return partyRepository.addCompanyPhoto(partyId, imageStr);
      }
    });
  }

  function getSortOrderOrDefault(field, direction) {
    let sort = {};
    if (field && direction) {
      sort[field] = direction;
      return sort;
    } else {
      return sort;
    }
  }

}
