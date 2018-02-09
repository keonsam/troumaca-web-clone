import {AssetTypeState} from "./asset.type.state";
import {Observable} from "rxjs/Observable";
import {AssetTypeStates} from "./asset.type.states";

export abstract class AssetTypesClient {
  abstract getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetTypeStates>;
  abstract getAssetTypeState(assetTypeId: string): Observable<AssetTypeState>;
  abstract findAssetTypes(searchStr: string, pageSize:number):Observable<AssetTypeStates>;
  abstract addAssetTypeState(assetTypeState: AssetTypeState): Observable<AssetTypeState>;
  abstract deleteAssetType(assetTypeId: string): Observable<number>;
  abstract updateAssetType(assetTypeId: string, assetTypeState: AssetTypeState): Observable<number>;
}
