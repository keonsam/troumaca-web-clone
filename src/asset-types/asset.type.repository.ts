import {AssetType} from "../assets/asset.type";
import {Observable} from "rxjs/Observable";
import {AssetTypes} from "../assets/asset.types";

export abstract class AssetTypeRepository {
  abstract getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetTypes>;
  abstract getAssetType(assetTypeId: string): Observable<AssetType>;
  abstract findAssetTypes(searchStr: string, pageSize:number):Observable<AssetTypes>;
  abstract addAssetType(assetType: AssetType): Observable<AssetType>;
  abstract deleteAssetType(assetTypeId: string): Observable<number>;
  abstract updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number>;
}
