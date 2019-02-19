import {Observable, of} from 'rxjs';
import { LobbyRepository } from './lobby.repository';
import {ASSET, ORGANIZATION, PARTY, USER} from '../app/routes';

export class LobbyService {

  apps = [
    {
      name: 'Assets',
      route: `/${ASSET}`,
      iconClass: 'desktop_mac'
    },
    {
      name: 'Organization',
      route: `/${PARTY}/${ORGANIZATION}/listing`,
      iconClass: 'business'
    },
    {
      name: 'People',
      route: `/${PARTY}/${USER}/listing`,
      iconClass: 'group_add'
    },
    {
      name: 'Company',
      route: `/${PARTY}/${ORGANIZATION}/profile`,
      iconClass: 'business_center'
    },
  ];

  constructor(private lobbyRepository: LobbyRepository) {
  }

  getApps(): Observable<any[]> {
    return of(this.apps);
    // return this.lobbyRepository.getApps();
  }

}
