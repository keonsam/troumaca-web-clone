import { DepreciationTaxResolve } from './depreciation.tax.resolve';
import { DepreciationService} from './depreciation.service';

export function depreciationTaxResolveProviderFactory (depreciationService: DepreciationService): DepreciationTaxResolve {
  let depreciationResolve: DepreciationTaxResolve;
  if (!depreciationResolve) {
    depreciationResolve = new DepreciationTaxResolve(depreciationService);
  }
  return depreciationResolve;
}

export let depreciationTaxResolveProvider = {
  provide: DepreciationTaxResolve,
  useFactory: depreciationTaxResolveProviderFactory,
  deps: [DepreciationService]
};
