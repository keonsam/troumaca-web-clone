import {PartyService} from './party.service';
import {PartyRepository} from './party.repository';

export function partyServiceProviderFactory (partyRepository: PartyRepository): PartyService {
  let partyService: PartyService;
  if (!partyService) {
    partyService = new PartyService(partyRepository);
  }
  return partyService;
}

export let partyServiceProvider = {
  provide: PartyService,
  useFactory: partyServiceProviderFactory,
  useClass: PartyService,
  deps: [PartyRepository]
};
