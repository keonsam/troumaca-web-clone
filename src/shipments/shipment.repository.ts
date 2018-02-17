import {Observable} from "rxjs/Observable";
import {Shipment} from "./shipment";

export abstract class ShipmentRepository {
  public abstract getShipments():Observable<Shipment>;
}