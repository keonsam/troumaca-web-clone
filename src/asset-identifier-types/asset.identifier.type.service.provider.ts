import {AssetIdentifierTypeService} from './asset.identifier.type.service';
import {Apollo} from 'apollo-angular';

export function assetIdentifierTypeServiceProviderFactory (apollo: Apollo): AssetIdentifierTypeService {
  return new AssetIdentifierTypeService(apollo);
}

export let assetIdentifierTypeServiceProvider = {
  provide: AssetIdentifierTypeService,
  useFactory: assetIdentifierTypeServiceProviderFactory,
  useClass: AssetIdentifierTypeService,
  deps: [Apollo]
};
