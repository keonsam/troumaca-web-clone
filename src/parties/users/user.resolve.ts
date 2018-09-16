import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {UserResponse } from '../user.response';
import { UserService} from './user.service';

@Injectable()
export class UserResolve implements Resolve<UserResponse> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getUser(route.paramMap.get('partyId') || 'me');
  }

}
