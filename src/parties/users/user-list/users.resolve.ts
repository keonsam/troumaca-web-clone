import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../user.service';
import {Users} from '../../users';

export class UsersResolve implements Resolve<Users> {
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getUsers(this.defaultPage, this.defaultPageSize, this.defaultSortOrder);
  }

}
