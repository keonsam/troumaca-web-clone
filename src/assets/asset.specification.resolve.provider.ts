import { AssetService} from './asset.service';
import {AssetSpecificationResolve} from "./asset.specification.resolve";

export function assetSpecificationResolveProviderFactory (assetService: AssetService): AssetSpecificationResolve {
  let assetSpecificationResolve: AssetSpecificationResolve;
  if (!assetSpecificationResolve) {
    assetSpecificationResolve = new AssetSpecificationResolve(assetService);
  }
  return assetSpecificationResolve;
}

export let assetSpecificationResolveProvider = {
  provide: AssetSpecificationResolve,
  useFactory: assetSpecificationResolveProviderFactory,
  deps: [AssetService]
};
