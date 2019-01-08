import { AssetService} from './asset.service';
import {AssetCharacteristicsResolve} from "./asset.characteristics.resolve";

export function assetCharacteristicsResolveProviderFactory (assetService: AssetService): AssetCharacteristicsResolve {
  let assetCharacteristicsResolve: AssetCharacteristicsResolve;
  if (!assetCharacteristicsResolve) {
    assetCharacteristicsResolve = new AssetCharacteristicsResolve(assetService);
  }
  return assetCharacteristicsResolve;
}

export let assetCharacteristicsResolveProvider = {
  provide: AssetCharacteristicsResolve,
  useFactory: assetCharacteristicsResolveProviderFactory,
  deps: [AssetService]
};
