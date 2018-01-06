import {AssetClient} from "../../client/assets/asset.client";
import {AssetRepository} from "../../assets/asset.repository";
import {AssetRepositoryAdapter} from "./assets.repository.adapter";

export function assetsRepositoryProviderFactory (assetClient:AssetClient):AssetRepository {
  let assetRepositoryAdapter: AssetRepositoryAdapter;
  if (!assetRepositoryAdapter) {
    assetRepositoryAdapter = new AssetRepositoryAdapter(assetClient);
  }
  return assetRepositoryAdapter;
}

export let assetsRepositoryProvider = {
  provide: AssetRepository,
  useFactory: assetsRepositoryProviderFactory,
  deps: [AssetClient]
};