import {AssetTypeRepository} from "./asset.type.repository";
import {Observable} from "rxjs/Observable";
import {AssetType} from "../assets/asset.type";

export class AssetTypeService {
  constructor(private assetTypeRepository: AssetTypeRepository) {
  }

  getAssetTypes():Observable<AssetType[]> {
    return this.assetTypeRepository.getAssetTypes();
  }
}