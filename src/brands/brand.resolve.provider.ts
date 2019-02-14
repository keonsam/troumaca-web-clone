import {BrandService} from './brand.service';
import {BrandResolve} from './brand.resolve';

export function brandResolveProviderFactory (brandService: BrandService): BrandResolve {
  return new BrandResolve(brandService);
}

export let brandResolveProvider = {
  provide: BrandResolve,
  useFactory: brandResolveProviderFactory,
  deps: [BrandService]
};
