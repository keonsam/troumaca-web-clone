import {Observable} from "rxjs/Observable";
import {AssetType} from "./asset.type";

export interface AssetTypeRepository {

  getAssetTypes(searchStr:string, pageSize:number): Observable<AssetType[]>;

}