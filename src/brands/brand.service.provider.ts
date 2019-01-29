import {BrandService} from './brand.service';
import {BrandRepository} from './brand.repository';

export function brandServiceProviderFactory (brandRepository: BrandRepository): BrandService {
  return new BrandService(brandRepository);
}

export let brandServiceProvider = {
  provide: BrandService,
  useFactory: brandServiceProviderFactory,
  useClass: BrandService,
  deps: [BrandRepository]
};
