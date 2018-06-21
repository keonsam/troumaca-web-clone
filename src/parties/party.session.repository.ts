import {Observable} from 'rxjs/Observable';
import {PartySession} from './party.session';

export abstract class PartySessionRepository {

  abstract getSession(): Observable<PartySession>;

}
