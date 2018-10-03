import {Observable} from 'rxjs';

export abstract class PartyClient {

  public abstract logOutUser(): Observable<boolean>;
  public abstract getPartyId(): Observable<string>;

}
