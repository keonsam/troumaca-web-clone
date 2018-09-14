import {PersonClient} from '../../client/party/person.client';
import {PartyRepository} from '../../parties/party.repository';
import {AssetPersonRepository} from '../../assets/asset.person.repository';
import {PartyRepositoryAdapter} from './party.repository.adapter';


export function partyRepositoryProviderFactory (personClient: PersonClient): PartyRepository {
  let partyRepositoryAdapter: PartyRepositoryAdapter;
  if (!partyRepositoryAdapter) {
    partyRepositoryAdapter = new PartyRepositoryAdapter(personClient);
  }
  return partyRepositoryAdapter;
}

export let partyRepositoryProvider = {
  provide: PartyRepository,
  useFactory: partyRepositoryProviderFactory,
  deps: [PersonClient]
};

export let assetPersonRepositoryProvider = {
  provide: AssetPersonRepository,
  useFactory: partyRepositoryProviderFactory,
  deps: [PersonClient]
};
