import {AssetNameTypeService} from './asset.name.type.service';
import {AssetNameTypeResolve} from './asset.name.type.resolve';

export function assetNameTypeResolveProviderFactory (assetNameTypeService: AssetNameTypeService): AssetNameTypeResolve {
  return new AssetNameTypeResolve(assetNameTypeService);
}

export let assetNameTypeResolveProvider = {
  provide: AssetNameTypeResolve,
  useFactory: assetNameTypeResolveProviderFactory,
  deps: [AssetNameTypeService]
};
