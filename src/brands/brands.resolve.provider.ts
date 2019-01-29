import {BrandService} from './brand.service';
import {BrandsResolve} from './brands.resolve';

export function brandsResolveProviderFactory (brandService: BrandService): BrandsResolve {
  return new BrandsResolve(brandService);
}

export let brandsResolveProvider = {
  provide: BrandsResolve,
  useFactory: brandsResolveProviderFactory,
  deps: [BrandService]
};
