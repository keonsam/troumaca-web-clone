import {PartyRepository} from './party.repository';
import {Observable} from 'rxjs';

export class PartyService {


  constructor(private partyRepository: PartyRepository) {
  }

  logOutUser(): Observable<boolean> {
    return this.partyRepository.logOutUser();
  }

  getPartyId(): Observable<string> {
    return this.partyRepository.getPartyId();
  }

}
