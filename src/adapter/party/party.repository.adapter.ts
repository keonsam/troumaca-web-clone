import {PartyRepository} from '../../parties/party.repository';
import {PartyClient} from '../../client/party/party.client';
import {Observable} from 'rxjs';

export class PartyRepositoryAdapter extends PartyRepository {

  constructor(private partyClient: PartyClient) {
    super();
  }

  public logOutUser(): Observable<boolean> {
    return this.partyClient.logOutUser();
  }

  public getPartyId(): Observable<string> {
    return this.partyClient.getPartyId();
  }

}
