import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PeopleService } from '../people.service';
import {Persons} from './persons';

export class PeoplesResolve implements Resolve<Persons> {
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  constructor(private userService: PeopleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getPersons(this.defaultPage, this.defaultPageSize, this.defaultSortOrder);
  }

}
