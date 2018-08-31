import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Organization } from '../organization';
import {PartyService} from "../party.service";

@Injectable()
export class OrganizationResolve implements Resolve<Organization> {
  constructor(private partyService: PartyService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.partyService.getOrganization(route.paramMap.get('partyId'));
  }

}
