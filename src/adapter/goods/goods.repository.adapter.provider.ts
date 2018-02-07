import {GoodsRepository} from "../../goods/goods.repository";
import {GoodsRepositoryAdapter} from "./goods.repository.adapter";
import {AssetTypesClient} from "../../client/asset-type/asset.types.client";

export function goodsRepositoryProviderFactory (assetTypeClient:AssetTypesClient):GoodsRepository {
  let goodsRepositoryAdapter: GoodsRepositoryAdapter;
  if (!goodsRepositoryAdapter) {
    goodsRepositoryAdapter = new GoodsRepositoryAdapter(assetTypeClient);
  }
  return goodsRepositoryAdapter;
}

export let goodsRepositoryProvider = {
  provide: GoodsRepository,
  useFactory: goodsRepositoryProviderFactory,
  deps: [AssetTypesClient]
};