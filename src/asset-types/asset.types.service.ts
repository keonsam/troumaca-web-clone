import {AssetTypesRepository} from "./asset.types.repository";
import {Observable} from "rxjs/Observable";
import {AssetTypeModel} from "./asset.types.model";

export class AssetTypesService {
  constructor(private assetTypesRepository: AssetTypesRepository) {
  }

  getAssetTypes():Observable<AssetTypeModel[]> {
    return this.assetTypesRepository.getAssetTypes();
  }
}