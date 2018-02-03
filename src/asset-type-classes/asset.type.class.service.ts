import {AssetTypeClassRepository} from "./asset.type.class.repository";
import {Observable} from "rxjs/Observable";
import {AssetTypeClass} from "./asset.type.class";
import {AssetTypeClasses} from "./asset.type.classes";

export class AssetTypeClassService {

  constructor(private assetTypeClassRepository: AssetTypeClassRepository) {
  }

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.getAssetTypeClass(assetTypeClassId);
  }

  public getAssetTypeClasses(pageNumber: number, pageSize:number, sortOrder:string):Observable<AssetTypeClasses> {
    return this.assetTypeClassRepository.getAssetTypeClasses(pageNumber, pageSize, sortOrder);
  }

  public addAssetTypeClass(assetTypeClass: AssetTypeClass): Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.addAssetTypeClass(assetTypeClass);
  }

  public deleteAssetTypeClass(assetTypeClassId: string): Observable<number>{
    return this.assetTypeClassRepository.deleteAssetTypeClass(assetTypeClassId);
  }

  public updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass): Observable<number> {
    return this.assetTypeClassRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass);
  }
}
