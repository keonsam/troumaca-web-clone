import {createAssetTypeRepository} from './asset.type.repository.factory';
import {shapeAssetsResponse2} from "./response.shaper";
import {AssetTypeRestRepository} from "./asset.type.rest.repository";

let assetTypeRepository:AssetTypeRestRepository = createAssetTypeRepository();

export class AssetOrchestrator {

  constructor() {
  }

  getAssetTypes(searchStr, pageSize) {
    return assetTypeRepository
    .getAssetTypes(searchStr, pageSize)
    .map(value => {
      return shapeAssetsResponse2("assetTypes", value);
    });
  }

}