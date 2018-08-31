import { AssetTypeClassResolve } from "./asset.type.class.resolve";
import { AssetTypeClassService} from "./asset.type.class.service";

export function assetTypeClassResolveProviderFactory (assetTypeClassService: AssetTypeClassService): AssetTypeClassResolve {
  let assetTypeClassResolve: AssetTypeClassResolve;
  if (!assetTypeClassResolve) {
    assetTypeClassResolve = new AssetTypeClassResolve(assetTypeClassService);
  }
  return assetTypeClassResolve;
}

export let assetTypeClassResolveProvider = {
  provide: AssetTypeClassResolve,
  useFactory: assetTypeClassResolveProviderFactory,
  deps: [AssetTypeClassService]
};
