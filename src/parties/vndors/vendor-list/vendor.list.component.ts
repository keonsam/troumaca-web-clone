import {Component, OnInit} from "@angular/core";
import {Parties} from "../../parties";

@Component({
  selector: 'vendor-list',
  templateUrl:'./vendor.list.component.html',
  styleUrls: ['./vendor.list.component.css']
})
export class VendorListComponent implements OnInit {

  private _parties:Parties;

  constructor() {
    this.parties = new Parties();
  }

  ngOnInit(): void {
  }

  get parties(): Parties {
    return this._parties;
  }

  set parties(value: Parties) {
    this._parties = value;
  }

}