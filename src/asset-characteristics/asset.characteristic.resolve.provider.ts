import {AssetCharacteristicService} from './asset.characteristic.service';
import {AssetCharacteristicResolve} from './asset.characteristic.resolve';

export function assetCharacteristicResolveProviderFactory (assetCharacteristicService: AssetCharacteristicService): AssetCharacteristicResolve {
  return new AssetCharacteristicResolve(assetCharacteristicService);
}

export let assetCharacteristicResolveProvider = {
  provide: AssetCharacteristicResolve,
  useFactory: assetCharacteristicResolveProviderFactory,
  deps: [AssetCharacteristicService]
};
