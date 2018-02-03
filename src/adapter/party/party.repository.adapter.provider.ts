import {OrganizationClient} from "../../client/parties/organization.client";
import {OrganizationRepository} from "../../organizations/organization.repository";
import {OrganizationRepositoryAdapter} from "./organization.repository.adapter";

import {PersonClient} from "../../client/parties/person.client";
import {PersonRepository} from "../../parties/party.repository";
import {PersonRepositoryAdapter} from "./person.repository.adapter";
import {AssetPersonRepository} from "../../assets/asset.person.repository";

export function organizationRepositoryProviderFactory (organizationClient:OrganizationClient):OrganizationRepository {
  let organizationRepositoryAdapter: OrganizationRepositoryAdapter;
  if (!organizationRepositoryAdapter) {
    organizationRepositoryAdapter = new OrganizationRepositoryAdapter(organizationClient);
  }
  return organizationRepositoryAdapter;
}

export function personRepositoryProviderFactory (personClient:PersonClient):PersonRepository {
  let personRepositoryAdapter: PersonRepositoryAdapter;
  if (!personRepositoryAdapter) {
    personRepositoryAdapter = new PersonRepositoryAdapter(personClient);
  }
  return personRepositoryAdapter;
}

export let organizationRepositoryProvider = {
  provide: OrganizationRepository,
  useFactory: organizationRepositoryProviderFactory,
  deps: [OrganizationClient]
};

export let personRepositoryProvider = {
  provide: PersonRepository,
  useFactory: personRepositoryProviderFactory,
  deps: [PersonClient]
};

export let assetPersonRepositoryProvider = {
  provide: AssetPersonRepository,
  useFactory: personRepositoryProviderFactory,
  deps: [PersonClient]
};