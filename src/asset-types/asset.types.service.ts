import {AssetTypesRepository} from "./asset.types.repository";
import {Observable} from "rxjs/Observable";
import {AssetType} from "../assets/asset.type";

export class AssetTypesService {
  constructor(private assetTypesRepository: AssetTypesRepository) {
  }

  getAssetTypes():Observable<AssetType[]> {
    return this.assetTypesRepository.getAssetTypes();
  }
}