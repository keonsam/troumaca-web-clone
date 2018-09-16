import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-organization-company',
  templateUrl: './organization.company.component.html',
  styleUrls: ['./organization.company.component.css']
})
export class OrganizationCompanyComponent implements OnInit {

  public organizationName: string;
  @Input() stepper: boolean;
  @Output() organizationCreated = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
  }

  setOrganization( name: string) {
    this.organizationName = name;
  }

  emitOrganizationCratedEvent(created: boolean) {
    if (created) {
      this.organizationCreated.emit(created);
    }
  }

}
