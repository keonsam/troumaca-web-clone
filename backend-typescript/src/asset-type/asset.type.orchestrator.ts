import {createAssetTypeRepository} from './asset.type.repository.factory';
import {AssetTypeRepository} from "./asset.type.repository";
import {Observable} from "rxjs/Observable";
import {AssetType} from "./asset.type";


export class AssetOrchestrator {

  private assetTypeRepository:AssetTypeRepository;

  constructor() {
    this.assetTypeRepository = createAssetTypeRepository();
  }

  getAssetTypes(searchStr:string, pageSize:number):Observable<AssetType[]> {
    return this.assetTypeRepository.getAssetTypes(searchStr, pageSize);
  }

}