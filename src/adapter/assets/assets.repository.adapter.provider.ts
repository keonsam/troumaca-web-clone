import {AssetClient} from "../../client/asset/asset.client";
import {AssetsRepository} from "../../assets/assets.repository";
import {AssetsRepositoryAdapter} from "./assets.repository.adapter";

export function assetsRepositoryProviderFactory (assetClient:AssetClient):AssetsRepository {
  let assetRepositoryAdapter: AssetsRepositoryAdapter;
  if (!assetRepositoryAdapter) {
    assetRepositoryAdapter = new AssetsRepositoryAdapter(assetClient);
  }
  return assetRepositoryAdapter;
}

export let assetsRepositoryProvider = {
  provide: AssetsRepository,
  useFactory: assetsRepositoryProviderFactory,
  deps: [AssetClient]
};