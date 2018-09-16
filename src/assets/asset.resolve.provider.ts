import { AssetResolve } from './asset.resolve';
import { AssetService} from './asset.service';

export function assetResolveProviderFactory (assetService: AssetService): AssetResolve {
  let assetResolve: AssetResolve;
  if (!assetResolve) {
    assetResolve = new AssetResolve(assetService);
  }
  return assetResolve;
}

export let assetResolveProvider = {
  provide: AssetResolve,
  useFactory: assetResolveProviderFactory,
  deps: [AssetService]
};
