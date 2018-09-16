import {AssetTypeClassService} from './asset.type.class.service';
import {AssetTypeClassRepository} from './asset.type.class.repository';

export function assetTypeClassServiceProviderFactory (assetTypeClassRepository: AssetTypeClassRepository): AssetTypeClassService {
  let assetTypeClassService: AssetTypeClassService;
  if (!assetTypeClassService) {
    assetTypeClassService = new AssetTypeClassService(assetTypeClassRepository);
  }
  return assetTypeClassService;
}

export let assetTypeClassServiceProvider = {
  provide: AssetTypeClassService,
  useFactory: assetTypeClassServiceProviderFactory,
  useClass: AssetTypeClassService,
  deps: [AssetTypeClassRepository]
};
