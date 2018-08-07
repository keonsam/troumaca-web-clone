import {DepreciationService} from './depreciation.service';
import {DepreciationRepository} from './depreciation.repository';

export function depreciationServiceProviderFactory (depreciationRepository: DepreciationRepository): DepreciationService {
  let depreciationService: DepreciationService;
  if (!depreciationService) {
    depreciationService = new DepreciationService(depreciationRepository);
  }
  return depreciationService;
}

export let depreciationServiceProvider = {
  provide: DepreciationService,
  useFactory: depreciationServiceProviderFactory,
  useClass: DepreciationService,
  deps: [DepreciationRepository]
};
