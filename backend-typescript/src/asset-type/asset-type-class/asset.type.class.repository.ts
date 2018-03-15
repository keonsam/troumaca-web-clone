import {Observable} from "rxjs/Observable";
import {AssetTypeClass} from "./asset.type.class";

export interface AssetTypeClassRepository {

  getAssetTypeClasses(pageNumber:number, pageSize:number, order:string):Observable<AssetTypeClass[]>;

  getAssetTypeClassCount():Observable<number>;

  getAssetTypeClass(assetTypeClassId:string):Observable<AssetTypeClass>;

  saveAssetTypeClass(assetTypeClass:AssetTypeClass):Observable<AssetTypeClass>;

  deleteAssetTypeClass(assetTypeClassId:string):Observable<number>;

  updateAssetTypeClass(assetTypeClassId:string, assetTypeClass:AssetTypeClass):Observable<number>;

}
