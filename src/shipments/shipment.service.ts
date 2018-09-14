import {Observable} from 'rxjs';
import {Shipment} from './shipment';
import {ShipmentRepository} from './shipment.repository';

export class ShipmentService {

  constructor(private shipmentRepository: ShipmentRepository) {
  }

  public getShipments(): Observable<Shipment> {
    return this.shipmentRepository.getShipments();
  }
}
