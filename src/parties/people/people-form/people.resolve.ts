import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PeopleService } from '../people.service';
import { Person } from './person';

export class PeopleResolve implements Resolve<Person> {
  constructor(private peopleService: PeopleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.peopleService.getPerson(route.paramMap.get('partyId'));
  }

}
