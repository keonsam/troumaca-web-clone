import {AssetCharacteristicService} from './asset.characteristic.service';
import {Apollo} from 'apollo-angular';

export function assetCharacteristicServiceProviderFactory (apollo: Apollo): AssetCharacteristicService {
  return new AssetCharacteristicService(apollo);
}

export let assetCharacteristicServiceProvider = {
  provide: AssetCharacteristicService,
  useFactory: assetCharacteristicServiceProviderFactory,
  useClass: AssetCharacteristicService,
  deps: [Apollo]
};
