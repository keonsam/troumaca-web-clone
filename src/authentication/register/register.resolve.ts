import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from "../authentication.service";
import {User} from "../../parties/user";

@Injectable()
export class RegisterResolve implements Resolve<User> {
  constructor(private authenticationService: AuthenticationService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.authenticationService.getCredential(route.paramMap.get('partyId'));
  }
}
