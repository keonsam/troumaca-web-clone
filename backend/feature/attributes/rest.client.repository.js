module.exports =  function RestClientAttributesRepository() {
  this.saveAttributes = function (attributes) {
    throw new Error('Options.db is required');
  }
};
