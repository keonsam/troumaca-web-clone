import {Apollo} from 'apollo-angular';
import {AssetTypeService} from './asset.type.service';

export function assetTypeServiceProviderFactory (apollo: Apollo): AssetTypeService {
  let assetTypeService: AssetTypeService;
  if (!assetTypeService) {
    assetTypeService = new AssetTypeService(apollo);
  }
  return assetTypeService;
}

export let assetTypeServiceProvider = {
  provide: AssetTypeService,
  useFactory: assetTypeServiceProviderFactory,
  useClass: AssetTypeService,
  deps: [Apollo]
};
