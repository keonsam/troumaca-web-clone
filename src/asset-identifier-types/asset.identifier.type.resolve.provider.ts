import {AssetIdentifierTypeService} from './asset.identifier.type.service';
import {AssetIdentifierTypeResolve} from './asset.identifier.type.resolve';

export function assetIdentifierTypeResolveProviderFactory (assetIdentifierTypeService: AssetIdentifierTypeService): AssetIdentifierTypeResolve {
  return new AssetIdentifierTypeResolve(assetIdentifierTypeService);
}

export let assetIdentifierTypeResolveProvider = {
  provide: AssetIdentifierTypeResolve,
  useFactory: assetIdentifierTypeResolveProviderFactory,
  deps: [AssetIdentifierTypeService]
};
