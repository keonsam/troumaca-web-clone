import "rxjs/add/operator/map";
import {AssetTypesClient} from "../../client/asset-type/asset.types.client";
import {GoodsRepository} from "../../goods/goods.repository";

export class GoodsRepositoryAdapter extends GoodsRepository {

  constructor(private assetTypeClient: AssetTypesClient) {
    super();
  }

}