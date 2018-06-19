import {Component, OnInit} from '@angular/core';
import {Party} from '../../party';
import {Parties} from '../../parties';

@Component({
  selector: 'employee-list',
  templateUrl: './employee.list.component.html',
  styleUrls: ['./employee.list.component.css']
})
export class EmployeeListComponent implements OnInit {

  private _routerLinkCreateEmployee: string;
  private _parties: Parties;

  constructor() {
    this.routerLinkCreateEmployee = '/parties/employees/create';;
    this.parties = new Parties();
  }

  ngOnInit(): void {
  }

  get routerLinkCreateEmployee(): string {
    return this._routerLinkCreateEmployee;
  }

  set routerLinkCreateEmployee(value: string) {
    this._routerLinkCreateEmployee = value;
  }

  get parties(): Parties {
    return this._parties;
  }

  set parties(value: Parties) {
    this._parties = value;
  }

  onRequestPage(event: any) {
    console.log('not implemented');
  }

}
