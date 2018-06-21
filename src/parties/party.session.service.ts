import {PartySessionRepository} from './party.session.repository';
import {Observable} from 'rxjs/Observable';
import {PartySession} from './party.session';

export class PartySessionService {

  private partySessionRepository: PartySessionRepository;

  constructor(partySessionRepository: PartySessionRepository) {
    this.partySessionRepository = partySessionRepository;
  }

  public getSession(): Observable<PartySession> {
    return this.partySessionRepository.getSession();
  }

}
