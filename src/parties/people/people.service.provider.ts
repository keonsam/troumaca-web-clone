import { PeopleService } from './people.service';
import {Apollo} from 'apollo-angular';

export function peopleServiceProviderFactory (apollo: Apollo): PeopleService {
  let userService: PeopleService;
  if (!userService) {
    userService = new PeopleService(apollo);
  }
  return userService;
}

export let peopleServiceProvider = {
  provide: PeopleService,
  useFactory: peopleServiceProviderFactory,
  useClass: PeopleService,
  deps: [Apollo]
};
