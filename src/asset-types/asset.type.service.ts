import {AssetTypeRepository} from "./asset.type.repository";
import {Observable} from "rxjs/Observable";
import {AssetType} from "../assets/asset.type";
import {AssetTypes} from "../assets/asset.types";

export class AssetTypeService {
  constructor(private assetTypeRepository: AssetTypeRepository) {
  }

  public getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetTypes> {
    return this.assetTypeRepository.getAssetTypes(pageNumber, pageSize, sortOrder);
  }

  public getAssetType(assetTypeId: string):Observable<AssetType> {
    return this.assetTypeRepository.getAssetType(assetTypeId);
  }

  public addAssetType(assetType: AssetType): Observable<AssetType> {
    return this.assetTypeRepository.addAssetType(assetType);
  }

  public deleteAssetType(assetTypeId: string): Observable<number> {
    return this.assetTypeRepository.deleteAssetType(assetTypeId);
  }

  public updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
    return this.assetTypeRepository.updateAssetType(assetTypeId, assetType);
  }
}
