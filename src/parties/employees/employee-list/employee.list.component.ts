import {Component, OnInit} from "@angular/core";
import {Party} from "../../party";
import {Parties} from "../../parties";

@Component({
  selector: 'employee-list',
  templateUrl:'./employee.list.component.html',
  styleUrls: ['./employee.list.component.css']
})
export class EmployeeListComponent implements OnInit {

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