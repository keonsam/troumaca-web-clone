import {Component, OnInit} from '@angular/core';
import {Organizations} from '../../organizations';
import {PartyEventService} from '../../party.event.service';
import {Page} from '../../../page/page';
import {Sort} from '../../../sort/sort';
import { OrganizationService } from "../organization.service";

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization.list.component.html',
  styleUrls: ['./organization.list.component.css']
})
export class OrganizationListComponent implements OnInit {

  private partyId: string;
  private _organizationName: string;
  private _organizations: Organizations;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private menuName = 'organizations-menu';
  private _routerLinkCreateUser = '/parties/organizations/create';

  constructor(private partyEventService: PartyEventService,
              private organizationService: OrganizationService) {

    const newOrganizations = new Organizations();
    newOrganizations.page = new Page(0, 0, 0);
    newOrganizations.sort = new Sort();
    this.organizations = newOrganizations;

  }


  ngOnInit(): void {
    this.partyEventService.menuChangeEvent.emit(this.menuName);
    this.getOrganizations();
  }

  get organizations(): Organizations {
    return this._organizations;
  }

  set organizations(value: Organizations) {
    this._organizations = value;
  }

  get organizationName(): string {
    return this._organizationName;
  }

  set organizationName(value: string) {
    this._organizationName = value;
  }

  get routerLinkCreateUser(): string {
    return this._routerLinkCreateUser;
  }

  set routerLinkCreateUser(value: string) {
    this._routerLinkCreateUser = value;
  }

  getOrganizations() {
    this.organizationService
    .getOrganizations(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      console.log(next);
      this.organizations = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  onOpenModal(partyId: string, organizationName: string) {
    this.partyId = partyId;
    this.organizationName = organizationName;
  }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.organizationService
        .deleteOrganization(this.partyId)
        .subscribe(value => {
          if (value) {
            this.getOrganizations();
          }
        }, error => {
          console.log(error);
        }, () => {
          console.log('complete');
        });
    }
  }

  onRequestPage(pageNumber: number) {
   this.defaultPage = pageNumber;
   this.getOrganizations();
  }


}
