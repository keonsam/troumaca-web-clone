module.exports =  function RestClientShipmentsRepository() {
  this.saveShipments = function (shipments) {
    throw new Error('Options.db is required');
  }
};
