import {ShipmentRepository} from "../../shipments/shipment.repository";
import {Observable} from "rxjs/Observable";
import {Shipment} from "../../shipments/shipment";
import {ShipmentClient} from "../../client/shipment/shipment.client";

export class ShipmentRepositoryAdapter implements ShipmentRepository {

  constructor(private shipmentClient:ShipmentClient) {
  }

  getShipments(): Observable<Shipment> {
    return undefined;
  }

}