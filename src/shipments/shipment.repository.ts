import {Observable} from 'rxjs';
import {Shipment} from './shipment';

export abstract class ShipmentRepository {
  public abstract getShipments(): Observable<Shipment>;
}
