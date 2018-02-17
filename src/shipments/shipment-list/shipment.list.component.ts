import {Component} from "@angular/core";
import {Shipments} from "../shipments";

@Component({
  selector: 'shipment-list',
  templateUrl:'./shipment.list.component.html',
  styleUrls: ['./shipment.list.component.css']
})
export class ShipmentListComponent {

  private _shipments:Shipments;

  constructor() {
    this._shipments = new Shipments();
  }

  get shipments(): Shipments {
    return this._shipments;
  }

  set shipments(value: Shipments) {
    this._shipments = value;
  }

}