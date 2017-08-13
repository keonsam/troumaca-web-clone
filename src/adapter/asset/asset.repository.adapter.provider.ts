import {AssetRepositoryAdapter} from "./asset.repository.adapter";
import {AssetClient} from "../../client/asset/asset.client";
import {AssetRepository} from "../../asset/asset.repository";

export function assetRepositoryProviderFactory (assetClient:AssetClient):AssetRepository {
  let assetRepositoryAdapter: AssetRepositoryAdapter;
  if (!assetRepositoryAdapter) {
    assetRepositoryAdapter = new AssetRepositoryAdapter(assetClient);
  }
  return assetRepositoryAdapter;
}

export let assetRepositoryProvider = {
  provide: AssetRepository,
  useFactory: assetRepositoryProviderFactory,
  deps: [AssetClient]
};