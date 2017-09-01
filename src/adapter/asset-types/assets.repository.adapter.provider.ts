
import {AssetTypesClient} from "../../client/asset-types/asset.types.client";
import {AssetTypesRepository} from "../../asset-types/asset.types.repository";
import {AssetTypesRepositoryAdapter} from "./assets.repository.adapter";

export function assetTypesRepositoryProviderFactory (assetTypesClient:AssetTypesClient):AssetTypesRepository {
  let assetTypesRepositoryAdapter: AssetTypesRepositoryAdapter;
  if (!assetTypesRepositoryAdapter) {
    assetTypesRepositoryAdapter = new AssetTypesRepositoryAdapter(assetTypesClient);
  }
  return assetTypesRepositoryAdapter;
}

export let assetTypesRepositoryProvider = {
  provide: AssetTypesRepository,
  useFactory: assetTypesRepositoryProviderFactory,
  deps: [AssetTypesClient]
};