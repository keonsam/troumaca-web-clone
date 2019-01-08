import { AssetService} from './asset.service';
import {AssetBrandResolve} from "./asset.brand.resolve";

export function assetBrandResolveProviderFactory (assetService: AssetService): AssetBrandResolve {
  let assetBrandResolve: AssetBrandResolve;
  if (!assetBrandResolve) {
    assetBrandResolve = new AssetBrandResolve(assetService);
  }
  return assetBrandResolve;
}

export let assetBrandResolveProvider = {
  provide: AssetBrandResolve,
  useFactory: assetBrandResolveProviderFactory,
  deps: [AssetService]
};
