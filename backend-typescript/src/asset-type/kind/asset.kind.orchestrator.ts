import {createAssetTypeRepository} from './asset.kind.repository.factory';
import {shapeAssetsResponse, shapeAssetsResponse2} from "./response.shaper";

let assetTypeRepository:AssetTypeRestRepository = createAssetTypeRepository();

export class AssetOrchestrator {

  that = this;

  getAssetKinds() {
    return assetTypeRepository
    .getAssetKinds()
    .map(value => {
      return shapeAssetsResponse2("assetKinds", value);
    });
  }


}