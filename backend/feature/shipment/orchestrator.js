let ShipmentRepositoryFactory = require('./repository.factory')();
let shipmentRepository = ShipmentRepositoryFactory.createShipmentRepository();
let responseShaper = require("./response.shaper")();


module.exports = function ShipmentOrchestrator() {

  this.getShipments = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return shipmentRepository
    .getShipments(number, size, sort)
    .flatMap(value => {
      return shipmentRepository
        .getShipmentCount()
        .map(count => {
          return responseShaper.shapeShipmentsResponse(value, number, size, value.length, count, sort);
        });
    });

  };

  this.getDataTypes = function () {
    return shipmentRepository.getDataTypes();
  };

  this.getShipmentById = function (shipmentId) {
    return shipmentRepository.getShipmentById(shipmentId);
  };

  this.addShipment = function (shipment) {
    return shipmentRepository.addShipment(shipment);
  };

  this.updateShipment = function(shipmentId, shipment) {
    return shipmentRepository.updateShipment(shipmentId, shipment);
  };

  this.deleteShipment = function(shipmentId) {
    return shipmentRepository.deleteShipment(shipmentId);
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
