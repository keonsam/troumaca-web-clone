let PartyRepositoryFactory = require('./repository.factory')();
let partyRepository = PartyRepositoryFactory.createPartyRepository();
let responseShaper = require("./response.shaper")();


module.exports = function PartyOrchestrator() {

  this.getPersons = function(number, size, field, direction) {
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

  this.getPerson = function (partyId) {
    return partyRepository.getPerson(partyId);
  };

  this.getUserPhoto = function (partyId) {
    return partyRepository.getUserPhoto(partyId);
  };

  this.addPerson = function(person){
    return partyRepository.addPerson(person);
  }

  this.addCredential = function(credential){
    return partyRepository.addCredential(credential);
  }

  this.deletePerson = function(partyId) {
    return partyRepository
    .deletePerson(partyId)
    .flatMap(value => {
      return partyRepository.deleteCredential(partyId);
    });
  }

  this.deleteCredential = function(partyId) {
    return partyRepository.deleteCredential(partyId);
  }

  this.updatePerson = function (partyId, person) {
    return partyRepository.updatePerson(partyId, person);
  }

  this.updateCredential = function (partyId, credential) {
    return partyRepository.updateCredential(partyId, credential);
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
