import {Observable, of} from 'rxjs';
import { LobbyRepository } from './lobby.repository';
import {ASSET, ORGANIZATION, USER} from '../app/routes';

export class LobbyService {

  apps = [
    {
      name: 'Company',
      route: `/${ORGANIZATION}/profile`,
      iconClass: 'business_center'
    },
    {
      name: 'People',
      route: `/${USER}/listing`,
      iconClass: 'group_add'
    },
    {
      name: 'Me',
      route: `/${USER}/profile`,
      iconClass: 'business'
    },
    {
      name: 'Assets',
      route: `/${ASSET}`,
      iconClass: 'desktop_mac'
    },
  ];

  constructor(private lobbyRepository: LobbyRepository) {
  }

  getApps(): Observable<any[]> {
    return of(this.apps);
    // return this.lobbyRepository.getApps();
  }

}
