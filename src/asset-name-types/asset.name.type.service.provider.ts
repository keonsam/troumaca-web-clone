import {AssetNameTypeService} from './asset.name.type.service';
import {AssetNameTypeRepository} from './asset.name.type.repository';

export function assetNameTypeServiceProviderFactory (assetNameTypeRepository: AssetNameTypeRepository): AssetNameTypeService {
  return new AssetNameTypeService(assetNameTypeRepository);
}

export let assetNameTypeServiceProvider = {
  provide: AssetNameTypeService,
  useFactory: assetNameTypeServiceProviderFactory,
  useClass: AssetNameTypeService,
  deps: [AssetNameTypeRepository]
};
