import { AssetTypeResolve } from "./asset.type.resolve";
import { AssetTypeService} from "./asset.type.service";

export function assetTypeResolveProviderFactory (assetTypeService: AssetTypeService): AssetTypeResolve {
  let assetTypeResolve: AssetTypeResolve;
  if (!assetTypeResolve) {
    assetTypeResolve = new AssetTypeResolve(assetTypeService);
  }
  return assetTypeResolve;
}

export let assetTypeResolveProvider = {
  provide: AssetTypeResolve,
  useFactory: assetTypeResolveProviderFactory,
  deps: [AssetTypeService]
};
