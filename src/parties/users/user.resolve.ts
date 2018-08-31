import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {PartyService} from "../party.service";
import {UserResponse } from "../user.response";

@Injectable()
export class UserResolve implements Resolve<UserResponse> {
  constructor(private partyService: PartyService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.partyService.getUser(route.paramMap.get('partyId'));
  }

}
