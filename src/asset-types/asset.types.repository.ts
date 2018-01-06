import {AssetType} from "../assets/asset.type";
import {Observable} from "rxjs/Observable";
import {AssetTypes} from "../assets/asset.types";

export abstract class AssetTypesRepository {
  abstract getAssetTypes():Observable<AssetType[]>;
  abstract findAssetTypes(searchStr: string, pageSize:number):Observable<AssetTypes>;
}