import {OrganizationClient} from '../../client/party/organization.client';
import {OrganizationRepository} from '../../organizations/organization.repository';
import {OrganizationRepositoryAdapter} from './organization.repository.adapter';

import {PersonClient} from '../../client/party/person.client';
import {PartyRepository} from '../../parties/party.repository';
import {AssetPersonRepository} from '../../assets/asset.person.repository';
import {PartyRepositoryAdapter} from './party.repository.adapter';

export function organizationRepositoryProviderFactory (organizationClient: OrganizationClient): OrganizationRepository {
  let organizationRepositoryAdapter: OrganizationRepositoryAdapter;
  if (!organizationRepositoryAdapter) {
    organizationRepositoryAdapter = new OrganizationRepositoryAdapter(organizationClient);
  }
  return organizationRepositoryAdapter;
}

export function partyRepositoryProviderFactory (personClient: PersonClient): PartyRepository {
  let partyRepositoryAdapter: PartyRepositoryAdapter;
  if (!partyRepositoryAdapter) {
    partyRepositoryAdapter = new PartyRepositoryAdapter(personClient);
  }
  return partyRepositoryAdapter;
}

export let organizationRepositoryProvider = {
  provide: OrganizationRepository,
  useFactory: organizationRepositoryProviderFactory,
  deps: [OrganizationClient]
};

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
