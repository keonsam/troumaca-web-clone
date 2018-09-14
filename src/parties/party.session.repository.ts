import {Observable} from 'rxjs';
import {PartySession} from './party.session';

export abstract class PartySessionRepository {

  abstract getSession(): Observable<PartySession>;

}
