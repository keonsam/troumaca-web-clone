import {AssetTypeService} from './asset.type.service';
import {AssetTypeRepository} from './asset.type.repository';

export function assetTypeServiceProviderFactory (assetTypeRepository: AssetTypeRepository): AssetTypeService {
  let assetTypeService: AssetTypeService;
  if (!assetTypeService) {
    assetTypeService = new AssetTypeService(assetTypeRepository);
  }
  return assetTypeService;
}

export let assetTypeServiceProvider = {
  provide: AssetTypeService,
  useFactory: assetTypeServiceProviderFactory,
  useClass: AssetTypeService,
  deps: [AssetTypeRepository]
};
