import {AssetTypeClassRepositoryAdapter} from "./asset.type.classes.adapter";
import {AssetTypeClassClient} from "../../client/asset-type-class/asset.type.class.client";
import {AssetTypeClassRepository} from "../../asset-type-classes/asset.type.class.repository";

export function assetTypeClassRepositoryProviderFactory (assetTypeClassClient:AssetTypeClassClient):AssetTypeClassRepository {
  let assetTypeClassRepositoryAdapter: AssetTypeClassRepositoryAdapter;
  if (!assetTypeClassRepositoryAdapter) {
    assetTypeClassRepositoryAdapter = new AssetTypeClassRepositoryAdapter(assetTypeClassClient);
  }
  return assetTypeClassRepositoryAdapter;
}

export let assetTypeClassRepositoryProvider = {
  provide: AssetTypeClassRepository,
  useFactory: assetTypeClassRepositoryProviderFactory,
  deps: [AssetTypeClassClient]
};