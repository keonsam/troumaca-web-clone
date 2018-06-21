import {Observable} from 'rxjs/Observable';
import {ShipmentState} from './shipment.state';

export abstract class ShipmentClient {
  public abstract getShipments(): Observable<ShipmentState>;
}
