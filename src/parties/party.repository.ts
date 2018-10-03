import {Observable} from 'rxjs';

export abstract class PartyRepository {

  abstract logOutUser(): Observable<boolean>;

  abstract getPartyId(): Observable<string>;
}
