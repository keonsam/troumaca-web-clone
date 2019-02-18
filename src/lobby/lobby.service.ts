import {Observable, of} from 'rxjs';
import { LobbyRepository } from './lobby.repository';
import {ASSET} from '../app/routes';

export class LobbyService  {

  apps = [
    {
      name: 'Company',
      route: '/parties/organization/profile',
      iconClass: 'build'
    },
    {
      name: 'People',
      route: '/parties/users/listing',
      iconClass: 'supervised_user_circle'
    },
    {
      name: 'Me',
      route: '/parties/organizations/listing',
      iconClass: 'business'
    },
    {
      name: 'Assets',
      route: `/${ASSET}`,
      iconClass: 'store'
    },
  ];
  
  constructor(private lobbyRepository: LobbyRepository) {
  }

  getApps(): Observable<any[]> {
    return of(this.apps);
    // return this.lobbyRepository.getApps();
  }

}
