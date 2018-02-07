import {Component, OnInit} from "@angular/core";
import {Party} from "../../party";
import {Parties} from "../../parties";

@Component({
  selector: 'customer-list',
  templateUrl:'./customer.list.component.html',
  styleUrls: ['./customer.list.component.css']
})
export class CustomerListComponent implements OnInit {

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