import {AssetCharacteristicService} from './asset.characteristic.service';
import {AssetCharacteristicRepository} from './asset.characteristic.repository';

export function assetCharacteristicServiceProviderFactory (assetCharacteristicRepository: AssetCharacteristicRepository): AssetCharacteristicService {
  return new AssetCharacteristicService(assetCharacteristicRepository);
}

export let assetCharacteristicServiceProvider = {
  provide: AssetCharacteristicService,
  useFactory: assetCharacteristicServiceProviderFactory,
  useClass: AssetCharacteristicService,
  deps: [AssetCharacteristicRepository]
};
