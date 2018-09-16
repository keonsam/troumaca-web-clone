import {AssetService} from './asset.service';
import {AssetRepository} from './asset.repository';

export function assetServiceProviderFactory (assetRepository: AssetRepository): AssetService {
  let assetService: AssetService;
  if (!assetService) {
    assetService = new AssetService(assetRepository);
  }
  return assetService;
}

export let assetServiceProvider = {
  provide: AssetService,
  useFactory: assetServiceProviderFactory,
  useClass: AssetService,
  deps: [AssetRepository]
};
