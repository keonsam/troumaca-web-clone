let Rx = require("rxjs");
let PartyRepositoryFactory = require('./repository.factory')();
let partyRepository = PartyRepositoryFactory.createPartyRepository();
let sessionRepositoryFactory = require('../session/session.repository.factory').SessionRepositoryFactory;
let sessionRepository = sessionRepositoryFactory.createRepository();
let responseShaper = require("./response.shaper")();
let UUIDGenerator = require("../uuid.generator");
let newUuidGenerator = new UUIDGenerator();

module.exports = function PartyOrchestrator() {

  this.getUsers = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return partyRepository
    .getUsers(number, size, sort)
    .flatMap(value => {
      return partyRepository
        .getUserCount()
        .map(count => {
          return responseShaper.shapePartiesResponse("users",value, number, size, value.length, count, sort);
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

  this.getUser = function (partyId) {
    return partyRepository.getUser(partyId);
  };

  this.getOrganization = function (partyId) {
    return partyRepository.getOrganization(partyId);
  };

  this.getPhoto = function (partyId) {
    return partyRepository.getPhoto(partyId);
  };

  this.addUser = function (user){
    return partyRepository.addUser(user);
  };

  this.addOrganization = function (organization){
    return partyRepository.saveOrganization(organization);
  };

  this.addCredential = function (credential){
    return partyRepository.addCredential(credential);
  };

  this.addPhoto = function (partyId, imageStr) {
    return partyRepository.addPhoto(partyId, imageStr);
  };


  this.addAccount = function (account, sessionId) {
     return sessionRepository
     .getSessionById(sessionId)
    .switchMap(session =>{
      let partyId = newUuidGenerator.generateUUID();
      session["partyId"] = partyId;
      account["partyId"] = partyId;
      return sessionRepository.updateSession(sessionId, session)
      .switchMap(numReplaced => {
        return partyRepository
        .updateCredentialPartyId(partyId, session.credentialId)
        .switchMap(numReplaced => {
          if(account.accountType === "personal") {
            return partyRepository.addPersonalAccount(account);
          }else if(account.accountType === "organization") {
            return partyRepository.addOrganizationAccount(account);
          }else {
            return partyRepository.addPersonalAccount(account)
            .switchMap(doc => {
              if (doc) {
                return partyRepository.addOrganizationAccount(account);
              }else {
                return Rx.Observable.of(doc);
              }
            });
          }
        });
      });
    });
  };

  this.deleteUser = function (partyId) {
    return partyRepository.deleteUser(partyId)
    .flatMap(value => {
      return partyRepository.deleteCredential(partyId);
    });
  };

  this.deleteOrganization = function (partyId) {
    return partyRepository.deleteOrganization(partyId);
  };

  this.deleteCredential = function (partyId) {
    return partyRepository.deleteCredential(partyId);
  };

  this.updateUser = function (partyId, user) {
    return partyRepository.updateUser(partyId, user);
  };

  this.updateCredential = function (partyId, credential) {
    return partyRepository.updateCredential(partyId, credential);
  };

  this.updateOrganization = function (partyId, organization) {
    return partyRepository.updateOrganization(partyId, organization);
  };

  this.updatePhoto = function (partyId, imageStr) {
      return partyRepository.updatePhoto(partyId, imageStr);
  };

  // authentication part
  this.isValidUsername = function (usernameObj) {
    return partyRepository
    .isValidUsername(usernameObj)
    .map(valid => {
      return responseShaper.shapeValidResponse(valid)
    });
  };

  this.isValidEditUsername = function (partyId,usernameObj) {
    return partyRepository
    .isValidEditUsername(partyId,usernameObj)
    .map(valid => {
      return responseShaper.shapeValidResponse(valid)
    });
  };

  this.isValidPassword = function (passwordObj) {
    return partyRepository
    .isValidPassword(passwordObj)
    .map(valid => {
      return responseShaper.shapeValidResponse(valid)
    });
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

}
