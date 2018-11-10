import {PartyClient} from '../../client/party/party.client';
import {PartyRepository} from '../../parties/party.repository';
import {PartyRepositoryAdapter} from './party.repository.adapter';


export function partyRepositoryProviderFactory (partyClient: PartyClient): PartyRepository {
  let partyRepositoryAdapter: PartyRepositoryAdapter;
  if (!partyRepositoryAdapter) {
    partyRepositoryAdapter = new PartyRepositoryAdapter(partyClient);
  }
  return partyRepositoryAdapter;
}

export let partyRepositoryProvider = {
  provide: PartyRepository,
  useFactory: partyRepositoryProviderFactory,
  deps: [PartyClient]
};
