import {AssetIdentifierTypeService} from './asset.identifier.type.service';
import {AssetIdentifierTypeRepository} from './asset.identifier.type.repository';

export function assetIdentifierTypeServiceProviderFactory (assetIdentifierTypeRepository: AssetIdentifierTypeRepository): AssetIdentifierTypeService {
  return new AssetIdentifierTypeService(assetIdentifierTypeRepository);
}

export let assetIdentifierTypeServiceProvider = {
  provide: AssetIdentifierTypeService,
  useFactory: assetIdentifierTypeServiceProviderFactory,
  useClass: AssetIdentifierTypeService,
  deps: [AssetIdentifierTypeRepository]
};
