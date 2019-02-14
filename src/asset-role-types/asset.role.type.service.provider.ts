import {AssetRoleTypeService} from './asset.role.type.service';
import {AssetRoleTypeRepository} from './asset.role.type.repository';

export function assetRoleTypeServiceProviderFactory (assetRoleTypeRepository: AssetRoleTypeRepository): AssetRoleTypeService {
  return new AssetRoleTypeService(assetRoleTypeRepository);
}

export let assetRoleTypeServiceProvider = {
  provide: AssetRoleTypeService,
  useFactory: assetRoleTypeServiceProviderFactory,
  useClass: AssetRoleTypeService,
  deps: [AssetRoleTypeRepository]
};
