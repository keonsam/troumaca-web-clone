import {AssetClient} from "../../client/asset/asset.client";
import {AssetRepository} from "../../assets/asset.repository";
import {AssetRepositoryAdapter} from "./asset.repository.adapter";

export function assetsRepositoryProviderFactory (assetClient:AssetClient):AssetRepository {
  let assetRepositoryAdapter: AssetRepositoryAdapter;
  if (!assetRepositoryAdapter) {
    assetRepositoryAdapter = new AssetRepositoryAdapter(assetClient);
  }
  return assetRepositoryAdapter;
}

export let assetRepositoryProvider = {
  provide: AssetRepository,
  useFactory: assetsRepositoryProviderFactory,
  deps: [AssetClient]
};