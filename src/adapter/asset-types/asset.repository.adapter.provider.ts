
import {AssetTypesClient} from "../../client/asset-types/asset.types.client";
import {AssetTypeRepository} from "../../asset-types/asset.type.repository";
import {AssetTypeRepositoryAdapter} from "./asset.repository.adapter";

export function assetTypeRepositoryProviderFactory (assetTypesClient:AssetTypesClient):AssetTypeRepository {
  let assetTypeRepositoryAdapter: AssetTypeRepositoryAdapter;
  if (!assetTypeRepositoryAdapter) {
    assetTypeRepositoryAdapter = new AssetTypeRepositoryAdapter(assetTypesClient);
  }
  return assetTypeRepositoryAdapter;
}

export let assetTypeRepositoryProvider = {
  provide: AssetTypeRepository,
  useFactory: assetTypeRepositoryProviderFactory,
  deps: [AssetTypesClient]
};