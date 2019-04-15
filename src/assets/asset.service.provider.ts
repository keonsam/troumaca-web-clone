import {AssetService} from './asset.service';
import {Apollo} from 'apollo-angular';

export function assetServiceProviderFactory (apollo: Apollo): AssetService {
  let assetService: AssetService;
  if (!assetService) {
    assetService = new AssetService(apollo);
  }
  return assetService;
}

export let assetServiceProvider = {
  provide: AssetService,
  useFactory: assetServiceProviderFactory,
  useClass: AssetService,
  deps: [Apollo]
};
